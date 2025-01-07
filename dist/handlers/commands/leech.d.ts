import { WizardContext } from "telegraf/typings/scenes";
import { Message } from "telegraf/typings/core/types/typegram.js";
export default function leechHandler(ctx: WizardContext): Promise<true | Message.TextMessage | undefined>;
