import { AIOSessionData } from "./wizardSessionData.js";
import AIOWizardContext from "./aIOWizardContext.js";
declare function askAPIKey(ctx: AIOWizardContext): Promise<import("telegraf/typings/scenes/index.js").WizardContextWizard<import("telegraf/typings/scenes/index.js").WizardContext<AIOSessionData>>>;
declare function handleAPIKeyAskHash(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes/index.js").WizardContextWizard<import("telegraf/typings/scenes/index.js").WizardContext<AIOSessionData>>>;
declare function handleHashAskPhone(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes/index.js").WizardContextWizard<import("telegraf/typings/scenes/index.js").WizardContext<AIOSessionData>>>;
declare function handlePhoneAskOTP(ctx: AIOWizardContext): Promise<void | import("telegraf/typings/scenes/index.js").WizardContextWizard<import("telegraf/typings/scenes/index.js").WizardContext<AIOSessionData>>>;
declare function handleOTPVerification(ctx: AIOWizardContext): Promise<void>;
export { askAPIKey, handleAPIKeyAskHash, handleHashAskPhone, handlePhoneAskOTP, handleOTPVerification, };
