import startHandler from "./start.js";
import reqAIOHandler from "./reqAIO.js";
import addAIOHandler from "./addAIO.js";
import editAIOHandler from "./editAIO.js";
import deleteAIOHandler from "./deleteMsg.js";
import makeCollectionAIOHandler from "./makeCollection.js";
import autoImageFileHandler from "./autoImageFileHandler.js";
import helpHandler from "./help.js";
import postHandler from "./post.js";
export default {
    startHandler: startHandler,
    postHandler: postHandler,
    makeCollectionAIOHandler: makeCollectionAIOHandler,
    autoImageFileHandler: autoImageFileHandler,
    deleteAIOHandler: deleteAIOHandler,
    reqAIOHandler: reqAIOHandler,
    addAIOHandler: addAIOHandler,
    editAIOHandler: editAIOHandler,
    helpHandler: helpHandler,
};
