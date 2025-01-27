import startHandler from "./start.js";
import reqAIOHandler from "./reqAIO.js";
import addAIOHandler from "./addAIO.js";
import editAIOHandler from "./editAIO.js";
import deleteAIOHandler from "./deleteMsg.js";
import makeCollectionAIOHandler from "./makeCollection.js";
import autoImageFileHandler from "./autoImageFileHandler.js";
import helpHandler from "./help.js";
import postHandler from "./post.js";
import createSessionHandler from "./createSessionHandler.js";
import copyHandler from "./copy.js";
import leechHandler from "./leech.js";
import banAllHandler from "./banAll.js";
import makeMsgJsonHandler from "./makeMsgJsonHandler.js";
export default {
    startHandler: startHandler,
    banAllHandler: banAllHandler,
    leechHandler: leechHandler,
    copyHandler: copyHandler,
    postHandler: postHandler,
    makeCollectionAIOHandler: makeCollectionAIOHandler,
    autoImageFileHandler: autoImageFileHandler,
    deleteAIOHandler: deleteAIOHandler,
    reqAIOHandler: reqAIOHandler,
    addAIOHandler: addAIOHandler,
    createSessionHandler: createSessionHandler,
    editAIOHandler: editAIOHandler,
    makeMsgJsonHandler: makeMsgJsonHandler,
    helpHandler: helpHandler,
};
