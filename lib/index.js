"use strict";
var log4js = require('log4js');

function messageFilter (matcher, appender) {
  return function(logEvent) {
    if (logEvent && logEvent.data && matcher){
      logEvent.data = logEvent.data.filter(matcher);
    }
    if (logEvent.data && logEvent.data.length){
      appender(logEvent);
    }
  };
}

function configure(config, options) {
  log4js.loadAppender(config.appender.type);
  var appender = log4js.appenderMakers[config.appender.type](config.appender, options);

  var matcher, regex;

  if (config.pattern){
    if (typeof config.pattern === 'string'){
      regex = new RegExp(config.pattern);
    }else{
      regex = config.pattern;
    }
    matcher = function(d){
      return regex.test(d);
    };
  }else if (config.exclude){
    var exclude;
    if (!Array.isArray(config.exclude)){
      exclude = [config.exclude];
    }else{
      exclude = config.exclude;
    }
    regex = new RegExp(config.exclude.join('|'));
    matcher = function(d){
      return !regex.test(d);
    };
  }

  return messageFilter(matcher, appender);
}

exports.appender = messageFilter;
exports.configure = configure;

