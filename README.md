# React Chat Demo
[![CircleCI](https://circleci.com/gh/kothman/react-chat-demo/tree/master.svg?style=svg)](https://circleci.com/gh/kothman/react-chat-demo/tree/master)

[Heroku Demo](https://frozen-hamlet-33935.herokuapp.com/register)

Another simplified Slack clone.

## Stack
### Frontend
* Webpack + Typescript
* React, Redux, React-Redux, Redux-Thunk, React-Router
* SocketIO
* Sass

### Backend
* Node (Webpack + Typescript)
* MongoDB, Mongoose
* ExpressJS

### Testing
* Mocha + Chai

## Features
* Post messages to various channels
* Receive messages via websocket
* User login and registration
* Update account settings (name, email, and password)
* Role permissions (user and admin)
* Add and remove channels (admin only)
* Add, remove, restore, and edit users (admin only)
* CSRF protection
* Continuous integration with CircleCI
