export const SysLogLevels = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
  },
  colors: {
    emerg: "red",
    alert: "yellow",
    crit: "red",
    error: "red",
    warning: "yellow",
    notice: "yellow",
    info: "green",
    debug: "blue"
  }
};

export const CommonLogLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    verbose: "cyan",
    debug: "blue",
    silly: "magenta"
  }
};

Object.freeze(SysLogLevels);
Object.freeze(CommonLogLevels);
