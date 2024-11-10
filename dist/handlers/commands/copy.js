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
        var userId, args, promoUsername_1, numberArgs, startId, fromChat_1, endId, toChats, startFrom, messages, lastFetchedMessageId, extractedList, _loop_1, i, state_1, error_1, err_1;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!auth.isAdmin(userId ? userId : 0 || !memory.get())) {
                        return [2 /*return*/, ctx.reply("Sorry, you have no permission to do this")];
                    }
                    memory.set(true);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 18, , 20]);
                    args = ctx.message.text.trim().replace("/copy", "").trim().split(" ");
                    if (!(args.length < 4)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ctx.reply("Please provide all details: username, promoUsername, startId, fromChat, toChat, collectionAIO, endId")];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 3: return [2 /*return*/, _d.sent()];
                case 4:
                    promoUsername_1 = args[0], numberArgs = args.slice(1);
                    startId = void 0, endId = void 0, toChats = void 0;
                    try {
                        _c = numberArgs.map(function (arg) {
                            var parsedNumber = parseInt(arg, 10);
                            if (isNaN(parsedNumber)) {
                                ctx.reply("Invalid details. Please make sure startId, fromChat, toChat, and endId are numbers.");
                                throw new Error("Invalid number in arguments");
                            }
                            return parsedNumber;
                        }), startId = _c[0], fromChat_1 = _c[1], endId = _c[2], toChats = _c[3];
                    }
                    catch (error) {
                        console.error("Error parsing arguments:", error);
                        return [2 /*return*/];
                    }
                    startFrom = startId;
                    _d.label = 5;
                case 5:
                    if (!memory.get()) return [3 /*break*/, 16];
                    memory.set(false);
                    return [4 /*yield*/, ctx.reply("Starting from message ID: ".concat(startFrom))];
                case 6:
                    _d.sent();
                    _d.label = 7;
                case 7:
                    _d.trys.push([7, 13, , 15]);
                    return [4 /*yield*/, getAllMessages(fromChat_1, startFrom)];
                case 8:
                    messages = _d.sent();
                    lastFetchedMessageId = (_b = messages[messages.length - 1]) === null || _b === void 0 ? void 0 : _b.id;
                    startFrom = lastFetchedMessageId - 1;
                    extractedList = extractMessageData(messages);
                    _loop_1 = function (i) {
                        var appIndex, appInstance, msg, caption, id, error_2;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    appIndex = i % apps.length;
                                    appInstance = apps[appIndex];
                                    msg = extractedList[i];
                                    caption = msg.caption;
                                    id = msg.id;
                                    startFrom = id;
                                    _e.label = 1;
                                case 1:
                                    _e.trys.push([1, 4, , 8]);
                                    return [4 /*yield*/, Promise.all(toChats.map(function (toChat) {
                                            return appInstance.telegram.copyMessage(toChat, fromChat_1, id, {
                                                caption: processCaption(caption, promoUsername_1 || ""),
                                            });
                                        }))];
                                case 2:
                                    _e.sent();
                                    return [4 /*yield*/, delay(200, 400)];
                                case 3:
                                    _e.sent();
                                    return [3 /*break*/, 8];
                                case 4:
                                    error_2 = _e.sent();
                                    if (!(error_2.code === 429)) return [3 /*break*/, 6];
                                    console.log("Rate limited: ".concat(error_2));
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 40000); })];
                                case 5:
                                    _e.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    console.error("Failed to copy message with ID ".concat(id, ": ").concat(error_2));
                                    return [2 /*return*/, "continue"];
                                case 7: return [3 /*break*/, 8];
                                case 8:
                                    if (!(i % 20 === 0)) return [3 /*break*/, 10];
                                    return [4 /*yield*/, ctx.reply("Processed up to message ID: ".concat(extractedList[i].id.toString()))];
                                case 9:
                                    _e.sent();
                                    _e.label = 10;
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
                    _d.label = 9;
                case 9:
                    if (!(i < extractedList.length)) return [3 /*break*/, 12];
                    return [5 /*yield**/, _loop_1(i)];
                case 10:
                    state_1 = _d.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 12];
                    _d.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 9];
                case 12:
                    if (lastFetchedMessageId >= endId || messages.length === 0) {
                        memory.set(true);
                        return [3 /*break*/, 16];
                    }
                    return [3 /*break*/, 15];
                case 13:
                    error_1 = _d.sent();
                    console.error("Error fetching messages. Retrying in 3 minutes...", error_1);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3 * 60 * 1000); })];
                case 14:
                    _d.sent();
                    return [3 /*break*/, 15];
                case 15:
                    memory.set(true);
                    return [3 /*break*/, 5];
                case 16: return [4 /*yield*/, ctx.reply("Operation completed successfully!")];
                case 17:
                    _d.sent();
                    return [3 /*break*/, 20];
                case 18:
                    err_1 = _d.sent();
                    console.error("Error processing command:", err_1);
                    return [4 /*yield*/, ctx.reply("An error occurred. Please check the command format: /add startId, fromChat, endId, ...toChats. Make sure bots are admin in both channels.")];
                case 19:
                    _d.sent();
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
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
