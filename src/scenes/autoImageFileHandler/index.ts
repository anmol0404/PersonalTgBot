import { Scenes, Composer } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { AIOSessionData } from "./wizardSessionData.js";
import * as DramaHandlers from "./autoImageFileHandler.js";
const on = Composer.on;
const dramaSession = new Scenes.WizardScene<WizardContext<AIOSessionData>>(
  "autoImageFile",

  on("message", DramaHandlers.done)
);

export default dramaSession;
