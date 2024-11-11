import { Scenes, Composer } from "telegraf";
import * as DramaHandlers from "./aIOHandler.js";
var on = Composer.on;
var dramaSession = new Scenes.WizardScene("CSS", on("message", DramaHandlers.askAPIKey), on("message", DramaHandlers.handleAPIKeyAskHash), on("message", DramaHandlers.handleHashAskPhone), on("message", DramaHandlers.handlePhoneAskOTP), on("message", DramaHandlers.handleOTPVerification));
export default dramaSession;
