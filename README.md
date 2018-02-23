# archdevlogger

Logging Service and Extensible Logger

## Overview

## Concepts

#### Defined Loggers

They loggers are defined.

```javascript
const defined = {
  logger: string,
  module: string,
  description: string
};
```

+ **logger**: _string_ - defines the _name_ of logger
+ **module**: _string_ - defines the _module_ by module name or path (e.g., _"samplelogger_module"_ or _"./path/to/samplelogger"_)
+ **description**: _string_ (optional) - describes the logger

```javascript
const examples = [
  { logger: "m_logger", module: "module-logger", description: "module logger" },
  { logger: "f_logger", module: "./file.logger", description: "file logger" },
];
```

In the example, the logger, named **m\_logger**, is a module logger. It's expected in node\_modules.

On the other hand, the logger, named **f\_logger**, is a file logger. It's expected in [application\_path]/file.logger.

#### Logger Setups

They define how loggers are setup.

```javascript
const setup = {
  name: string,
  logger: string,
  properties: any
};
```

+ **name**: _string_ - defines the _name_ of <u>logger instance</u>
+ **logger**: _string_ - identifies the _defined logger_ to be used
+ **properties**: _any_ (optional) - provides the properties to the logger

```javascript
const examples = [
  {
    name: "mainLogger",
    logger: "f_logger",
    properties: {
      transports: [{ name: "file", level: "info" }]
    }
  },
  {
    name: "errorLogger",
    logger: "f_logger",
    properties: {
      transports: [{ name: "file", level: "error" }]
    }
  },
  {
    name: "debugLogger",
    logger: "m_logger",
    properties: {
      transports: [{ name: "console", level: "debug" }]
    }
  },
];
```