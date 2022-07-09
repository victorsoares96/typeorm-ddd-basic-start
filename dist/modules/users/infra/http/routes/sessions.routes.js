"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionsRouter = void 0;

var _express = require("express");

var _SessionController = require("../controllers/SessionController");

/* eslint-disable @typescript-eslint/ban-ts-comment */
const sessionsRouter = (0, _express.Router)();
exports.sessionsRouter = sessionsRouter;
const sessionsController = new _SessionController.SessionController();
sessionsRouter.post('/sessions', sessionsController.handle);