var Imap = require('imap'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    MailParser = require("mailparser").MailParser,
    fs = require("fs"),
    path = require('path'),
    async = require('async');

module.exports = MailListener;

function MailListener(options) {
    this.markSeen = !!options.markSeen;
    this.mailbox = options.mailbox || "INBOX";
    if ('string' === typeof options.searchFilter) {
        this.searchFilter = [options.searchFilter];
    } else {
        this.searchFilter = options.searchFilter || ["UNSEEN"];
    }
    this.fetchUnreadOnStart = !!options.fetchUnreadOnStart;
    this.mailParserOptions = options.mailParserOptions || {};
    if (options.attachments && options.attachmentOptions && options.attachmentOptions.stream) {
        this.mailParserOptions.streamAttachments = true;
    }
    this.attachmentOptions = options.attachmentOptions || {};
    this.attachments = options.attachments || false;
    this.attachmentOptions.directory = (this.attachmentOptions.directory ? this.attachmentOptions.directory : '');
    this.imap = new Imap({
        xoauth2: options.xoauth2,
        user: options.username,
        password: options.password,
        host: options.host,
        port: options.port,
        tls: options.tls,
        tlsOptions: options.tlsOptions || {}
    });

//console.log("Username:",options.username);
//console.log("Password:",options.password);
    this.imap.once('ready', imapReady.bind(this));
    this.imap.once('close', imapClose.bind(this));
    this.imap.on('error', imapError.bind(this));
}

util.inherits(MailListener, EventEmitter);

MailListener.prototype.start = function () {
    this.imap.connect();
};

MailListener.prototype.stop = function () {
    this.imap.end();
};

function imapReady() {
    var self = this;
    this.imap.openBox(this.mailbox, false, function (err, mailbox) {
        if (err) {
            self.emit('error', err);
        } else {
            self.emit('server:connected');
            if (self.fetchUnreadOnStart) {
                parseUnread.call(self);
            }
            self.imap.on('mail', imapMail.bind(self));
        }
        
    });
   
}

function imapClose() {
    this.emit('server:disconnected');
}

function imapError(err) {
    this.emit('error', err);
}

function imapMail() {
    parseUnread.call(this);
}

function parseUnread() {
    var self = this;
    this.imap.search(self.searchFilter, function (err, results) {
        if (err) {
            self.emit('error', err);
        } else if (results.length > 0) {
            var remaining = results.length;
            async.each(results, function (result, callback) {
                var f = self.imap.fetch(result, {
                    bodies: '',
                    markSeen: self.markSeen
                });
                f.on('message', function (msg, seqno) {
                    var parser = new MailParser(self.mailParserOptions);
                    var attributes = null;

                    parser.on("end", function (mail) {
                        if (!self.mailParserOptions.streamAttachments && mail.attachments && self.attachments) {
                            async.each(mail.attachments, function (attachment, callback) {
                                fs.writeFile(self.attachmentOptions.directory + attachment.generatedFileName, attachment.content, function (err) {
                                    if (err) {
                                        self.emit('error', err);
                                        callback();
                                    } else {
                                        attachment.path = path.resolve(self.attachmentOptions.directory + attachment.generatedFileName);
                                        self.emit('attachment', attachment, mail);              
                                        callback();
                                    }
                                });
                            }, function (err) {
                                self.emit('mail', mail, seqno, attributes);
                                callback()
                            });
                        } else {
                            self.emit('mail', mail, seqno, attributes);
                        }
                        remaining = remaining - 1;
                        if (remaining == 0) {
                            self.emit('done');
                        }
                    });
                    parser.on("attachment", function (attachment) {
                        var args = Array.prototype.slice.call(arguments);
                        args.unshift('attachment');
                        self.emit.apply(self, args);
                    });
                    msg.on('body', function (stream, info) {
                        stream.pipe(parser);
                    });
                    msg.on('attributes', function (attrs) {
                        attributes = attrs;
                    });
                });
                f.once('error', function (err) {
                    self.emit('error', err);
                });
            }, function (err) {
                if (err) {
                    self.emit('error', err);
                }
            });
        } else {
            self.emit('done');
        }
    });
}