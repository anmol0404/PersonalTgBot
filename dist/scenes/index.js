import { Scenes } from "telegraf";
import shareAIO from "./addAIO/index.js";
import reqAIO from "./reqAIO/index.js";
import editAIO from "./editAIO/index.js";
import collectionAIO from "./makeCollectionAIO/index.js";
import autoImageFileHandler from "./autoImageFileHandler/index.js";
import CSSHandler from "./CSS/index.js";
var stage = new Scenes.Stage([
    shareAIO,
    reqAIO,
    editAIO,
    collectionAIO,
    autoImageFileHandler,
    CSSHandler,
]);
export default stage;
