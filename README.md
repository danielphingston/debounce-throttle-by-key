# Debounce Throttle By Key

A library for debouncing and throttling events based the parameters passed to the function.
When u want to debounce or throttle a function but not always.

## How to use

```javascript
const { debounceByKey, throttleByKey } = require("debounce-throttle-by-key");

const keyFunction = (args) => args[1]; // a function used to determine the key it will be passed all the arguments passed to the function

const print = console.log;

const throttlePrint = throttleByKey(print, 1000, keyFunction);

throttlePrint("hello", "world");
throttlePrint("hello", "world");
throttlePrint("hello", "world");
throttlePrint("hello", "world");
throttlePrint("world", "hello");
throttlePrint("world", "hello");
throttlePrint("world", "hello");
// this will throttle the print function to be called once every 1000ms the value of the 2nd parameter will be used as the key to determine if the function should be called
// it will print hello and world once then after the throttle time of 1000ms will print hello and world again.

const debouncePrint = debounceByKey(print, 1000, false, keyFunction);

debouncePrint("hello", "world");
debouncePrint("hello", "world");
debouncePrint("hello", "world");
debouncePrint("hello", "world");
throttlePrint("world", "hello");
throttlePrint("world", "hello");
throttlePrint("world", "hello");

// this will debounce the print function.the value of the 2nd parameter will be used as the key to determine if the function should be called
// this will print hello and world once after 1000ms
```
