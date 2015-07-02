log4js-appenders-message-filter

config format:

    pattern: {String}|{Array}}|{RegExp}
    onMatch: 'accept'|'deny'
    appender: {}

accept example:

    {
        type: "log4js-appenders-message-filter"
        pattern: 'Error'
        appender:
          type: "console"
    }

deny example:

    {
        type: "log4js-appenders-message-filter"
        pattern: [
            'no log message',
            'no log text'
        ]
        onMatch: 'deny'
        appender:
          type: "console"
    }

