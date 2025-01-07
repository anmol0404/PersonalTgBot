/// <reference types="node" />
export declare function setThumb(userId: number, buffer: Buffer): Promise<boolean>;
export declare function getThumb(userId: number): Promise<string | null>;
