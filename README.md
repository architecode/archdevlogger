# ArchDevLogger [![Build Status](https://travis-ci.org/architecode/archdevlogger.svg?branch=master)](https://travis-ci.org/architecode/archdevlogger) [![Coverage Status](https://coveralls.io/repos/github/architecode/archdevlogger/badge.svg?branch=master&bust=1)](https://coveralls.io/github/architecode/archdevlogger?branch=master)

Logging Service with Extensible Logger Library

## Overview

The library provides **Logging Service** with **Extensible Logger** using **Defineds-Setups Pattern** and **Configurations**.

## Concepts

The library uses **Defineds-Setups Pattern** which **_defines a logger_** and **_provides a logger setup_**.

#### Defined Loggers

It defines Loggers.

```javascript
const defined = {
  logger: string;
  module: string;
  description?: string;
};
```

+ **logger**: _string_ - defines **the _name_ of logger**
+ **module**: _string_ - defines **the _module_ by module name or path** [e.g., "*logger\_module*" or "*./path/to/logger.file*"]
+ **description**: _string_ (optional) - describes **the logger**

```javascript
const examples = [
  { logger: "m_logger", module: "logger_module", description: "module logger" },
  { logger: "f_logger", module: "./path/to/logger.file", description: "file logger" },
];
```

In the example, the logger, _named_ **m\_logger**, is a module logger. It's expected in **node\_modules**.

On the other hand, the logger, _named_ **f\_logger**, is a file logger. It's expected in **[application\_path]/path/to/logger.file**.

#### Loggers Setups

It provides Loggers Setups.

```javascript
const setup = {
  name: string;
  type: string;
  logger: string;
  properties?: any;
};
```

+ **name**: _string_ - defines the **name** of <u>_logger instance_</u>
+ **type**: _string_ - defines the **type** of <u>_logger instance_</u>
+ **logger**: _string_ - identifies the _defined_ **logger** to be used
+ **properties**: _any_ (optional) - provides the **properties** to the logger

```javascript
const examples = [
  {
    name: "mainLogger",
    type: "module",
    logger: "f_logger",
    properties: {
      any: { val: "value" }
    }
  },
  {
    name: "errorLogger",
    type: "module",
    logger: "f_logger",
    properties: {
      any: { val: "value" }
    }
  },
  {
    name: "debugLogger",
    type: "module",
    logger: "m_logger",
    properties: {
      any: { val: "value" }
    }
  },
];
```

#### Default Logger

It provides the Default Logger.

```javascript
const defaultLogger = {
  logger: string;
  properties?: any;
};
```

+ **logger**: _string_ - identifies the _defined_ **logger** to be used
+ **properties**: _any_ (optional) - provides the **properties** to the logger
