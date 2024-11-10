import { Scenes, Composer } from "telegraf";
import * as DramaHandlers from "./autoImageFileHandler.js";
var on = Composer.on;
var dramaSession = new Scenes.WizardScene("autoImageFile", on("message", DramaHandlers.done));
export default dramaSession;
