import { Scenes, Composer } from "telegraf";
import * as DramaHandlers from "./aIOHandler.js";
var on = Composer.on;
var dramaSession = new Scenes.WizardScene("addAIO", on("message", DramaHandlers.done));
export default dramaSession;
