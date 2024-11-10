import { Scenes, Composer } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { AIOSessionData } from "./wizardSessionData.js";
import * as DramaHandlers from "./collectionHandler.js";
const on = Composer.on;
const dramaSession = new Scenes.WizardScene<WizardContext<AIOSessionData>>(
  "collectionAIO",
  on("message", DramaHandlers.done)
);

export default dramaSession;
