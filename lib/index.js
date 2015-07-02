"use strict";
var log4js = require('log4js');

function messageFilter (matcher, action, appender) {
  return function (logEvent) {
    if (logEvent && logEvent.data && Array.isArray(logEvent.data)) {
      var match = logEvent.data.some(matcher);
      if ((match && action === 'accept') || (!match && action === 'deny')){
        appender(logEvent);
      }
    }
  };
}

function configure(config, options) {
  log4js.loadAppender(config.appender.type);

  var appender = log4js.appenderMakers[config.appender.type](config.appender, options);

  var action = config.onMatch || 'accept';
  var matcher, regex;

  if (config.pattern){
    if (typeof config.pattern === 'string') {
      regex = new RegExp(config.pattern);

    }else if (Array.isArray(config.pattern)){
      regex = new RegExp(config.pattern.join('|'));

    }else{
      regex = config.pattern;

    }
    matcher = function(d){
      return regex.test(d);
    };
  }

  return messageFilter(matcher, action, appender);
}

exports.appender = messageFilter;
exports.configure = configure;

