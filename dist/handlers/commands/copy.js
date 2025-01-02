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
var _a;
import { Telegraf } from "telegraf";
import auth from "../../services/auth.js";
import { delay } from "../../extra/delay.js";
import { processCaption } from "../../utils/caption/editCaption.js";
import env from "../../services/env.js";
import { getAllMessages } from "../../services/client.js";
import memory from "./memory.js";
var apps = (_a = env.botTokens) === null || _a === void 0 ? void 0 : _a.map(function (token) { return new Telegraf(token); });
export default function copyHandler(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var userId, args, promoUsername_1, startIdStr, fromChatStr, endIdStr, toChatsStr, startId, fromChat_1, endId, toChats, error_1, startFrom, messages, lastFetchedMessageId, extractedList, _loop_1, i, state_1, error_2, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!auth.isAdmin(userId ? userId : 0 || !memory.get())) {
                        return [2 /*return*/, ctx.reply("Sorry, you have no permission to do this")];
                    }
                    memory.set(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 22, , 24]);
                    args = ctx.message.text.trim().replace("/copy", "").trim().split(" ");
                    if (!(args.length < 5)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ctx.reply("Please provide all details: promoUsername, startId: number, fromChat: number, endId: number, toChats: (number)[]")];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 3: return [2 /*return*/, _c.sent()];
                case 4:
                    promoUsername_1 = args[0], startIdStr = args[1], fromChatStr = args[2], endIdStr = args[3], toChatsStr = args.slice(4);
                    startId = void 0, endId = void 0, toChats = void 0;
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 6, , 8]);
                    // Parse numeric arguments
                    startId = parseInt(startIdStr, 10);
                    fromChat_1 = parseInt(fromChatStr, 10);
                    endId = parseInt(endIdStr, 10);
                    toChats = toChatsStr.map(function (toChat) {
                        var parsedToChat = parseInt(toChat, 10);
                        if (isNaN(parsedToChat)) {
                            throw new Error("Invalid number in toChats");
                        }
                        return parsedToChat;
                    });
                    if (isNaN(startId) || isNaN(fromChat_1) || isNaN(endId)) {
                        throw new Error("Invalid number for startId, fromChat, or endId");
                    }
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _c.sent();
                    return [4 /*yield*/, ctx.reply("Invalid details. Please ensure startId, fromChat, endId, and all toChats are valid numbers.")];
                case 7:
                    _c.sent();
                    return [2 /*return*/];
                case 8:
                    startFrom = startId;
                    _c.label = 9;
                case 9:
                    if (!memory.get()) return [3 /*break*/, 20];
                    memory.set(false);
                    return [4 /*yield*/, ctx.reply("Starting from message ID: ".concat(startFrom))];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11:
                    _c.trys.push([11, 17, , 19]);
                    return [4 /*yield*/, getAllMessages(fromChat_1, startFrom)];
                case 12:
                    messages = _c.sent();
                    lastFetchedMessageId = (_b = messages[messages.length - 1]) === null || _b === void 0 ? void 0 : _b.id;
                    startFrom = lastFetchedMessageId - 1;
                    extractedList = extractMessageData(messages);
                    _loop_1 = function (i) {
                        var appIndex, appInstance, msg, caption, id, error_3;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    appIndex = i % apps.length;
                                    appInstance = apps[appIndex];
                                    msg = extractedList[i];
                                    caption = msg.caption;
                                    id = msg.id;
                                    startFrom = id;
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 4, , 8]);
                                    return [4 /*yield*/, Promise.all(toChats.map(function (toChat) {
                                            return appInstance.telegram.copyMessage(toChat, fromChat_1, id, {
                                                caption: processCaption(caption, promoUsername_1 || ""),
                                            });
                                        }))];
                                case 2:
                                    _d.sent();
                                    return [4 /*yield*/, delay(200, 400)];
                                case 3:
                                    _d.sent();
                                    return [3 /*break*/, 8];
                                case 4:
                                    error_3 = _d.sent();
                                    if (!(error_3.code === 429)) return [3 /*break*/, 6];
                                    console.log("Rate limited: ".concat(error_3));
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 40000); })];
                                case 5:
                                    _d.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    console.error("Failed to copy message with ID ".concat(id, ": ").concat(error_3));
                                    return [2 /*return*/, "continue"];
                                case 7: return [3 /*break*/, 8];
                                case 8:
                                    if (!(i % 20 === 0)) return [3 /*break*/, 10];
                                    return [4 /*yield*/, ctx.reply("Processed up to message ID: ".concat(extractedList[i].id.toString()))];
                                case 9:
                                    _d.sent();
                                    _d.label = 10;
                                case 10:
                                    if (id >= endId || messages.length === 0) {
                                        memory.set(true);
                                        return [2 /*return*/, "break"];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _c.label = 13;
                case 13:
                    if (!(i < extractedList.length)) return [3 /*break*/, 16];
                    return [5 /*yield**/, _loop_1(i)];
                case 14:
                    state_1 = _c.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 16];
                    _c.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 13];
                case 16:
                    if (lastFetchedMessageId >= endId || messages.length === 0) {
                        memory.set(true);
                        return [3 /*break*/, 20];
                    }
                    return [3 /*break*/, 19];
                case 17:
                    error_2 = _c.sent();
                    console.error("Error fetching messages. Retrying in 3 minutes...", error_2);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3 * 60 * 1000); })];
                case 18:
                    _c.sent();
                    return [3 /*break*/, 19];
                case 19:
                    memory.set(true);
                    return [3 /*break*/, 9];
                case 20: return [4 /*yield*/, ctx.reply("Operation completed successfully!")];
                case 21:
                    _c.sent();
                    return [3 /*break*/, 24];
                case 22:
                    err_1 = _c.sent();
                    console.error("Error processing command:", err_1);
                    return [4 /*yield*/, ctx.reply("An error occurred. Please check the command format: /copy promoUsername startId fromChat endId toChats. Make sure bots are admin in all channels.")];
                case 23:
                    _c.sent();
                    return [3 /*break*/, 24];
                case 24: return [2 /*return*/];
            }
        });
    });
}
function extractMessageData(messages) {
    return messages.map(function (msg) {
        var _a, _b;
        var id = (_a = msg.id) !== null && _a !== void 0 ? _a : 0;
        var messageText = (_b = msg.message) !== null && _b !== void 0 ? _b : "";
        var caption = messageText;
        var mediaFilename = undefined;
        if (msg.media && msg.media.document) {
            var fileNameAttribute = msg.media.document.attributes.find(function (attr) { return attr.className === "DocumentAttributeFilename"; });
            if (fileNameAttribute && fileNameAttribute.fileName) {
                mediaFilename = fileNameAttribute.fileName;
            }
            if (msg.media.video === false && mediaFilename) {
                caption = mediaFilename;
            }
            else {
                caption = mediaFilename ? mediaFilename : messageText;
            }
        }
        return { id: id, caption: caption };
    });
}
