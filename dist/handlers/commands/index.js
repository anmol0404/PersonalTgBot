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
export default {
    startHandler: startHandler,
    postHandler: postHandler,
    makeCollectionAIOHandler: makeCollectionAIOHandler,
    autoImageFileHandler: autoImageFileHandler,
    deleteAIOHandler: deleteAIOHandler,
    reqAIOHandler: reqAIOHandler,
    addAIOHandler: addAIOHandler,
    createSessionHandler: createSessionHandler,
    editAIOHandler: editAIOHandler,
    helpHandler: helpHandler,
};
