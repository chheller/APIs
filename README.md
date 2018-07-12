# APIs

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Overview

The goal of this project is to implement a dead simple API in as many languages/frameworks as possible.
This project aims to have a very small and fast overview of different solutions and their implementation
in one of the simplest case.

**Existing APIs**:

- Java
  - [Vert.x]
  - [Spark]
- Python
  - [Flask]

## Routes

Each API should have three routes:

Route         | Method | Action
------------- | :----: | ------------------------------------
`/`           |  `GET` | Displays "`Hello from <framwork> !`"
`/users/<id>` |  `GET` | Returns users info
`/users`      | `POST` | Add a new user

Payload for the `POST` request should have the following keys:

```json
{
    "name": "John Doe",
    "age": 42
}
```

## Database

The currently used database is SQLite3. The only table is:

User               |
:----------------- |
`id`   **int** (PK)
`name` **text**
`age`  **int**

## Contributing

Contributions are very welcome ! Please see the [contribution guidlines].

[Vert.x]: https://vertx.io
[Spark]:  http://sparkjava.com
[Flask]:  http://flask.pocoo.org

[contribution guidlines]: https://github.com/pBouillon/APIs/blob/master/CONTRIBUTING.md