let EventEmitter = require('events').EventEmitter;

class EventDispatcher extends EventEmitter {
  constructor() {
    super();
  }
}

module.exports = new EventDispatcher();
