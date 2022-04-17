# ecommerce report

A Node.js CLI app to process e-commerce transactions list from JSONL format to be a summary output.

### Development

Make sure you have Node.js installed on your operating system (the developer used Node.js LTS `v16.14.2`).

First, install dependencies:

```
npm install
```

Then run the test-suite:

```
npm test
```

To run linter:

```
npx eslint src/*.js
```

### How to Use

Make sure you have Node.js installed on your operating system (the developer used Node.js LTS `v16.14.2`).

First, install dependencies:

```
npm install
```

Then, run the CLI app:

```
node main.js
```

### Handling Big Files

This project is using `event-stream` Node.js library to handle big files processing.
RAM is a limited resource, so we need to write this project carefully.
I used to think that by using stream processing, the RAM usage will be low.
But the assumption is wrong, the JavaScript engine will be out of heap memory.
Please check the following references:

- [Using Node.js to Read Really Large Files - Part 1](https://itnext.io/using-node-js-to-read-really-really-large-files-pt-1-d2057fe76b33)
- [A Performance Comparison of Node.js Methods for Reading Large Datasets - Part 2](https://itnext.io/streams-for-the-win-a-performance-comparison-of-nodejs-methods-for-reading-large-datasets-pt-2-bcfa732fa40e)

### Contact Detail

- Andy Primawan
- [LinkedIn](https://www.linkedin.com/in/andy-primawan/)
- [Twitter](https://twitter.com/andypmw)
