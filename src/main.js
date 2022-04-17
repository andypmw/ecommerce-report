const fs = require('fs');
const eventStream = require('event-stream');
const { processSingleLine } = require('./logic');

fs
  .createReadStream('./test.jsonl')
  .pipe(eventStream.split())
  .pipe(
    eventStream
      .mapSync(processSingleLine)
      .on('error', (err) => {
        console.error('Error while reading file: ', err); // eslint-disable-line no-console
      })
      .on('end', () => {
        console.log('Done.'); // eslint-disable-line no-console
      }),
  )
  .pipe(fs.createWriteStream('./output.csv'));
