const EventEmitter = require('events');

const event = new EventEmitter();

event.on('your name', () => {
    console.log('Om')
})

event.emit('your name');