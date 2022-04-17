const fs = require('fs');
const eventStream = require('event-stream');
const { processSingleLine } = require('./logic')

const s = fs
    .createReadStream('./test.jsonl')
    .pipe(eventStream.split())
    .pipe(
        eventStream
            .mapSync(processSingleLine)
            .on('error', err => {
                console.error('Error while reading file: ', err);
            })
            .on('end', () => {
                console.log('Done.');
            })
    );
