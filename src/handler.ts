/**
 * Entry point — wires all Alexa intent handlers together into a single Lambda handler.
 * Handler order matters: Alexa SDK uses the first handler whose canHandle() returns true.
 * CatchAllIntent must come AFTER more specific intents but BEFORE the fallback.
 */

import * as Alexa from "ask-sdk-core";
import { LaunchRequestHandler } from "./handlers/launch";
import { CatchAllIntentHandler } from "./handlers/catch-all";
import { FallbackIntentHandler } from "./handlers/fallback";
import { SessionEndedRequestHandler } from "./handlers/session-ended";
import { GlobalErrorHandler } from "./handlers/error";

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    CatchAllIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(GlobalErrorHandler)
  .lambda();
