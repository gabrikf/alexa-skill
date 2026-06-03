/**
 * SessionEndedRequestHandler — cleanup when the session ends.
 * Required by Alexa to handle session termination gracefully.
 */

import * as Alexa from "ask-sdk-core";

export const SessionEndedRequestHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  },
};
