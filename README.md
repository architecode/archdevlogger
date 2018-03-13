# ArchDevLogger [![Build Status](https://travis-ci.org/architecode/archdevlogger.svg?branch=master)](https://travis-ci.org/architecode/archdevlogger) [![Coverage Status](https://coveralls.io/repos/github/architecode/archdevlogger/badge.svg?branch=master&bust=1)](https://coveralls.io/github/architecode/archdevlogger?branch=master)

Logging Service with Extensible Logger Library for Developers

## Overview

The library provides _logging service with Extensible Logger_. The **Extensible Logger** provides general functions _used to extend a logger module_. 

## Logger Service

The library provides **LoggerService** class. The **LoggerService** is used to create _logger instances_.

There are **_two_ ways** to create logger instances.

1. Use instance function, **configure()**
1. Use class function, **LoggerService.fromFile()**

#### Constructing an instance of Logger Service

In **JavaScript**:
```javascript
const ArchDevLogger = require('archdevlogger').ArchDevLogger;

const service = new ArchDevLogger.Services.LoggerService();
```

In **TypeScript**:
```typescript
import { ArchDevLogger } from "archdevlogger";

const service = new ArchDevLogger.Services.LoggerService();
```

#### Constructor Options

+ **useInstanceCache** (_default_: **true**) - defines whether it _uses cache_ for **logger instances**

```javascript
const options = {
  useInstanceCache: true
};

const service = new ArchDevLogger.Services.LoggerService(options);
```

### LoggerService.fromFile()

```javascript
// in config.js
const config = {
  loggerServiceOptions: {
    useInstanceCache: true,
  },
  loggerServiceConfigs: {
    defaultLogger: {
      logger: 'AppLogger',
      properties: {}
    },
    loggerModules: [
      {
        logger: 'AppLogger',
        module: {
          type: 'module'
          resource: 'archdevloggerwinston'
        }
      }
    ],
    loggerSetups: [
      {
        name: 'TestModule',
        type: 'Module',
        logger: 'AppLogger',
        properties: {}
      }
    ]
  },
};

module.exports = config;
```

```javascript
// in application.js
const service = ArchDevLogger.Services.LoggerService.fromFile('./config.js');
```


The service provides functionalities:

1. [Set Default Logger](#default-logger)
1. [Set Logger Modules](#logger-modules)
1. [Set Logger Setups](#logger-setups)
1. [Resolve Logger Instance](#logger-instances)

### Default Logger

Logger Service defines **Default Logger** by _logger_ and _properties_.

+ **logger**: _string_ - defines the **name** of default logger module
+ **properties**: _any_ - defines the **properties** of default logger instance

```javascript
service.setDefaultLogger(logger, properties);
```

### Logger Modules

Logger Service defines **Logger Modules** by _logger_ and _logger module_.

+ **logger**: _string_ - defines the **name** of logger module
+ **LoggerModule**: _any_ - defines the **module** of logger

```javascript
service.setLoggerModule(logger, LoggerModule);
```

### Logger Setups

Logger Service defines **Logger Setups** by _name_, _type_, _logger_, and _properties_.

+ **name**: _string_ - defines the **name** of logger instance
+ **type**: _string_ - defines the **type** of logger instance
+ **logger**: _string_ - defines the name of **logger** module
+ **properties**: _any_ - defines the **properties** of logger instance

```javascript
service.setLoggerSetup(name, type, logger, properties);
```

### Logger Instances

Logger Service resolves **Logger Instances** by _name_ and _type_.

+ **name**: _string_ - defines the **name** of logger instance
+ **type**: _string_ - defines the **type** of logger instance

```javascript
service.resolveLogger(name, type);
```

The service maps **name** and **type** to get **logger** and **properties** that are defined with **Logger Setup**. The **logger** is mapped to **LoggerModule**.
