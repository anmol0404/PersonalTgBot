import { Scenes, Composer } from "telegraf";
import * as DramaHandlers from "./collectionHandler.js";
var on = Composer.on;
var dramaSession = new Scenes.WizardScene("collectionAIO", on("message", DramaHandlers.done));
export default dramaSession;
