// CustomSceneSessionData.ts
import { WizardSessionData } from "telegraf/typings/scenes";

export interface AIOSessionData extends WizardSessionData {
  apiKey?: number;
  phone?: string;
  apiHash?: string;
  otp?: string;
  session?: string;
}
