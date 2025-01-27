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
import database from "../services/database.js";
import fs from "fs";
import memory from "../handlers/commands/memory.js";
import telegram from "../services/telegram.js";
import { addCommandDescription, aifileCommandDescription, copyCommandDescription, delMessagesDescription, howToCreateSession, howToLeech, mkcollectionDescription, postBotDescription, } from "../utils/message.js";
export default {
    private: function (ctx, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function () {
            var userId, caption, msgId, _l, aios, jsonContent, filePath, sentMessage, callbackData, message, err_1;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
                        console.log((_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id);
                        if (!(ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/post"))) return [3 /*break*/, 1];
                        next();
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(ctx.message && containsMediaOrDocument(ctx.message))) return [3 /*break*/, 7];
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
                        if (!(((_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.type) === "private")) return [3 /*break*/, 3];
                        return [4 /*yield*/, telegram.forwardMessages((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id, (_e = ctx.from) === null || _e === void 0 ? void 0 : _e.id, [msgId], true, [caption], env.join || "")];
                    case 2:
                        _m.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(((_f = ctx.chat) === null || _f === void 0 ? void 0 : _f.type) === "group" || ((_g = ctx.chat) === null || _g === void 0 ? void 0 : _g.type) === "supergroup")) return [3 /*break*/, 5];
                        return [4 /*yield*/, telegram.forwardMessages((_h = ctx.chat) === null || _h === void 0 ? void 0 : _h.id, (_j = ctx.chat) === null || _j === void 0 ? void 0 : _j.id, [msgId], true, [caption], env.join || "")];
                    case 4:
                        _m.sent();
                        _m.label = 5;
                    case 5: return [4 /*yield*/, ctx.deleteMessage(msgId)];
                    case 6:
                        _m.sent();
                        _m.label = 7;
                    case 7:
                        if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/resettracker")) return [3 /*break*/, 12];
                        _m.label = 8;
                    case 8:
                        _m.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, database.createOrUpdateTracker(0)];
                    case 9:
                        _m.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        _l = _m.sent();
                        return [3 /*break*/, 11];
                    case 11: return [3 /*break*/, 18];
                    case 12:
                        if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/getaios")) return [3 /*break*/, 17];
                        return [4 /*yield*/, database.getAllAIO()];
                    case 13:
                        aios = _m.sent();
                        jsonContent = JSON.stringify(aios, null, 2);
                        filePath = "./aioCollection.json";
                        fs.writeFileSync(filePath, jsonContent, "utf8");
                        return [4 /*yield*/, ctx.replyWithDocument({ source: filePath })];
                    case 14:
                        sentMessage = _m.sent();
                        if (!sentMessage) return [3 /*break*/, 16];
                        return [4 /*yield*/, database.deleteCollection()];
                    case 15:
                        _m.sent();
                        _m.label = 16;
                    case 16:
                        fs.unlinkSync(filePath);
                        return [3 /*break*/, 18];
                    case 17:
                        if (ctx.message && "text" in ctx.message && ctx.message.text === "/stopdel") {
                            memory.setStopDeletion(true);
                        }
                        else if (ctx.message && "text" in ctx.message && ctx.message.text === "/stopadd") {
                            memory.setStopAdding(true);
                        }
                        _m.label = 18;
                    case 18:
                        if (!(ctx.callbackQuery && "data" in ctx.callbackQuery)) return [3 /*break*/, 22];
                        callbackData = ctx.callbackQuery.data;
                        _m.label = 19;
                    case 19:
                        _m.trys.push([19, 21, , 22]);
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
                            case "leechCommand":
                                message = howToLeech;
                                break;
                            default:
                                message = "Unknown topic. Please try again.";
                        }
                        return [4 /*yield*/, ctx.reply(message)];
                    case 20:
                        _m.sent();
                        return [3 /*break*/, 22];
                    case 21:
                        err_1 = _m.sent();
                        console.log("Error handling callback:", err_1);
                        return [3 /*break*/, 22];
                    case 22:
                        if (((_k = ctx.chat) === null || _k === void 0 ? void 0 : _k.id) !== undefined) {
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
