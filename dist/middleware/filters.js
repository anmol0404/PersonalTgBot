var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import env from "../services/env.js";
import auth from "../services/auth.js";
import database from "../services/database.js";
import fs from "fs";
import memory from "../handlers/commands/memory.js";
import telegram from "../services/telegram.js";
import { addCommandDescription, aifileCommandDescription, copyCommandDescription, delMessagesDescription, howToCreateSession, mkcollectionDescription, postBotDescription, } from "../utils/message.js";
export default {
    private: function (ctx, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var userId, caption, msgId, _f, aios, jsonContent, filePath, sentMessage, callbackData, message, err_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
                        console.log((_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id);
                        if (!(ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/post"))) return [3 /*break*/, 1];
                        next();
                        return [3 /*break*/, 5];
                    case 1:
                        if (!!auth.isAdmin(userId ? userId : 0)) return [3 /*break*/, 2];
                        return [2 /*return*/];
                    case 2:
                        if (!(ctx.message && containsMediaOrDocument(ctx.message))) return [3 /*break*/, 5];
                        caption = "[NONE]";
                        msgId = ctx.message.message_id;
                        if ("caption" in ctx.message) {
                            caption = ctx.message.caption || "[NONE]";
                            if ("document" in ctx.message) {
                                caption = ctx.message.document.file_name || "[NONE]";
                            }
                            else {
                                caption = ctx.message.caption || "[NONE]";
                            }
                        }
                        return [4 /*yield*/, telegram.forwardMessages((_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id, (_d = ctx.chat) === null || _d === void 0 ? void 0 : _d.id, [msgId], true, [caption], env.join || "")];
                    case 3:
                        _g.sent();
                        return [4 /*yield*/, ctx.deleteMessage(msgId)];
                    case 4:
                        _g.sent();
                        _g.label = 5;
                    case 5:
                        if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/resettracker")) return [3 /*break*/, 10];
                        _g.label = 6;
                    case 6:
                        _g.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, database.createOrUpdateTracker(0)];
                    case 7:
                        _g.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        _f = _g.sent();
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/getaios")) return [3 /*break*/, 15];
                        return [4 /*yield*/, database.getAllAIO()];
                    case 11:
                        aios = _g.sent();
                        jsonContent = JSON.stringify(aios, null, 2);
                        filePath = "./aioCollection.json";
                        fs.writeFileSync(filePath, jsonContent, "utf8");
                        return [4 /*yield*/, ctx.replyWithDocument({ source: filePath })];
                    case 12:
                        sentMessage = _g.sent();
                        if (!sentMessage) return [3 /*break*/, 14];
                        return [4 /*yield*/, database.deleteCollection()];
                    case 13:
                        _g.sent();
                        _g.label = 14;
                    case 14:
                        fs.unlinkSync(filePath);
                        return [3 /*break*/, 16];
                    case 15:
                        if (ctx.message && "text" in ctx.message && ctx.message.text === "/stopdel") {
                            memory.setStopDeletion(true);
                        }
                        else if (ctx.message && "text" in ctx.message && ctx.message.text === "/stopadd") {
                            memory.setStopAdding(true);
                        }
                        _g.label = 16;
                    case 16:
                        if (!(ctx.callbackQuery && "data" in ctx.callbackQuery)) return [3 /*break*/, 20];
                        callbackData = ctx.callbackQuery.data;
                        _g.label = 17;
                    case 17:
                        _g.trys.push([17, 19, , 20]);
                        message = void 0;
                        // Determine the button clicked and respond accordingly
                        switch (callbackData) {
                            case "delMessages":
                                message = delMessagesDescription;
                                break;
                            case "addCommand":
                                message = addCommandDescription;
                                break;
                            case "mkcollection":
                                message = mkcollectionDescription;
                                break;
                            case "aifileCommand":
                                message = aifileCommandDescription;
                                break;
                            case "postBot":
                                message = postBotDescription;
                                break;
                            case "copyCommand":
                                message = copyCommandDescription;
                                break;
                            case "howToCreateSession":
                                message = howToCreateSession;
                                break;
                            default:
                                message = "Unknown topic. Please try again.";
                        }
                        return [4 /*yield*/, ctx.reply(message)];
                    case 18:
                        _g.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        err_1 = _g.sent();
                        console.log("Error handling callback:", err_1);
                        return [3 /*break*/, 20];
                    case 20:
                        if (((_e = ctx.chat) === null || _e === void 0 ? void 0 : _e.id) !== undefined) {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
};
function containsMediaOrDocument(message) {
    var isDocument = message.document !== undefined;
    var isVideo = message.video !== undefined;
    var isPhoto = message.photo !== undefined;
    return isDocument || isVideo || isPhoto;
}
