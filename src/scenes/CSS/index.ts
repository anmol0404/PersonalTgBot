import { Scenes, Composer } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { AIOSessionData } from "./wizardSessionData.js";
import * as DramaHandlers from "./aIOHandler.js";
const on = Composer.on;
const dramaSession = new Scenes.WizardScene<WizardContext<AIOSessionData>>(
  "CSS",
  on("message", DramaHandlers.askAPIKey),
  on("message", DramaHandlers.handleAPIKeyAskHash),
  on("message", DramaHandlers.handleHashAskPhone),
  on("message", DramaHandlers.handlePhoneAskOTP),
  on("message", DramaHandlers.handleOTPVerification)
);

export default dramaSession;
