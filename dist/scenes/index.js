import { Scenes } from "telegraf";
import shareAIO from "./addAIO/index.js";
import reqAIO from "./reqAIO/index.js";
import editAIO from "./editAIO/index.js";
import collectionAIO from "./makeCollectionAIO/index.js";
import autoImageFileHandler from "./autoImageFileHandler/index.js";
var stage = new Scenes.Stage([
    shareAIO,
    reqAIO,
    editAIO,
    collectionAIO,
    autoImageFileHandler,
]);
export default stage;
