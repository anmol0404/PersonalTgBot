import AIOWizardContext from "./aIOWizardContext.js";
declare function done(ctx: AIOWizardContext): Promise<void>;
export declare function getPhotoUrlFromWebPage(link: any): Promise<string>;
export { done };
export declare function checkMessageType(message: any): string;
export declare function getPhotoUrl(photoId: any): Promise<string>;
