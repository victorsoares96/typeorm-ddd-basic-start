"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionController = void 0;

var _tsyringe = require("tsyringe");

var _SessionService = require("../../../services/SessionService");

class SessionController {
  async handle(request, response) {
    const {
      username,
      password
    } = request.body;

    const createSession = _tsyringe.container.resolve(_SessionService.SessionService);

    const session = await createSession.execute({
      username,
      password
    });
    return response.json(session);
  }

}

exports.SessionController = SessionController;