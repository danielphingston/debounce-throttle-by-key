const { debounceByKey, throttleByKey } = require("./index");

jest.useFakeTimers();

describe("debounce by key", () => {
  let func;
  let debouncedFunc;
  let keyCount;

  beforeEach(() => {
    func = jest.fn();
    keyCount = Math.max(1, Math.ceil(Math.random() * 100));
    debouncedFunc = debounceByKey(func, 1000);
  });

  it("should execute just once per key", () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc(i % keyCount);
    }
    jest.runAllTimers();

    for (let i = 0; i < keyCount; i++) {
      expect(func).toBeCalledWith(i);
    }

    expect(func).toBeCalledTimes(keyCount);
  });

  it("should execute after wait just once per key", () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc(i % keyCount);
    }

    expect(func).toBeCalledTimes(0);

    jest.runAllTimers();

    for (let i = 0; i < keyCount; i++) {
      expect(func).toBeCalledWith(i);
    }

    expect(func).toBeCalledTimes(keyCount);
  });

  it("should executes immediately once per key", () => {
    debouncedFunc = debounceByKey(func, 1000, true);
    for (let i = 0; i < 100; i++) {
      debouncedFunc(i % keyCount);
    }

    expect(func).toBeCalledTimes(keyCount);

    jest.runAllTimers();

    expect(func).toBeCalledTimes(keyCount);
  });

  it("should use the passed key function", () => {
    const keyFunction = (args) => args[1];
    debouncedFunc = debounceByKey(func, 1000, false, keyFunction);
    for (let i = 0; i < 100; i++) {
      debouncedFunc(i % keyCount, 200);
    }

    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });
});

describe("throttle by key", () => {
  let func;
  let throttleFun;
  let keyCount;

  beforeEach(() => {
    func = jest.fn();
    keyCount = Math.max(1, Math.ceil(Math.random() * 20));
    throttleFun = throttleByKey(func, 1000);
  });

  it("should execute at throttled rate for key", () => {
    for (let i = 0; i < 100; i++) {
      throttleFun(i % keyCount);
    }

    expect(func).toBeCalledTimes(keyCount);

    jest.advanceTimersByTime(1000);

    expect(func).toBeCalledTimes(keyCount * 2);
  });

  it("should use the passed key function", () => {
    const keyFunction = (args) => args[1];
    throttleFun = throttleByKey(func, 1000, keyFunction);

    for (let i = 0; i < 100; i++) {
      throttleFun(i % keyCount, 100);
    }

    expect(func).toBeCalledTimes(1);

    jest.advanceTimersByTime(1000);

    expect(func).toBeCalledTimes(2);
  });
});
