type CallbackFunction = (...args: any[]) => void;

export function debounce(f: CallbackFunction, delay = 1000) {
  let timerId: ReturnType<typeof setTimeout>;

  return function debouncedFunction(...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      f(...args);
    }, delay);
  };
}
