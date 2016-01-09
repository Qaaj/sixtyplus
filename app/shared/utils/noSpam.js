let lastTimeout = 0;

export default (fx,timeout) => {
  clearTimeout(lastTimeout);
  lastTimeout = setTimeout(()=> {
    fx();
  }, timeout);
}

