/**
 *
 * @param {function} func function to be throttled
 * @param {number} wait duration to throttle
 * @param {function} keyFunction function to return the key. pass all the arguments given to the function call
 * @returns {function}
 */
function throttleByKey(func, wait, keyFunction = defaultKeyFunction) {
  const keys = {};
  return function throttled() {
    const key = keyFunction(arguments);
    if (!keys[key]) {
      keys[key] = {
        last: 0,
        timeoutID: null,
        rtn: null,
        ctx: null,
      };
    }
    keys[key].delta = new Date().getTime() - keys[key].last;
    keys[key].args = arguments;
    keys[key].ctx = this;
    if (!keys[key].timeoutID) {
      if (keys[key].delta >= wait) {
        call(key);
      } else {
        keys[key].timeoutID = setTimeout(
          () => call(key),
          wait - keys[key].delta
        );
      }
    }
    return keys[key].rtn;
  };

  function call(key) {
    keys[key].timeoutID = 0;
    keys[key].last = (key[key]?.last | 0) + new Date().getTime();
    keys[key].rtn = func.apply(keys[key].ctx, keys[key].args);
    keys[key].ctx = null;
  }
}

/**
 *
 * @param {function} func function to debounce
 * @param {number} wait duration for debounce
 * @param {boolean} immediate should the function execute at the start or end. (default false)
 * @param {function} keyFunction function to return the key. pass all the arguments given to the function call
 * @returns {function}
 */
function debounceByKey(
  func,
  wait,
  immediate = false,
  keyFunction = defaultKeyFunction
) {
  const keys = {};

  return function debounce() {
    const key = keyFunction(arguments);
    if (!keys[key]) {
      keys[key] = {
        timeoutID: 0,
        args: arguments,
        ctx: this,
      };
    }
    keys[key].args = arguments;
    keys[key].ctx = this;

    if (keys[key].timeoutID) {
      clearTimeout(keys[key].timeoutID);
    }

    if (immediate && !keys[key].timeoutID) {
      func.apply(keys[key].ctx, keys[key].args);
    }
    call(key, immediate);
  };

  function call(key, immediate = false) {
    keys[key].timeoutID = setTimeout(() => {
      !immediate && func.apply(keys[key].ctx, keys[key].args);
      keys[key].timeoutID = 0;
    }, wait);
  }
}

function defaultKeyFunction(arg) {
  return arg[0] || 0;
}

module.exports = {
  throttleByKey,
  debounceByKey,
};
