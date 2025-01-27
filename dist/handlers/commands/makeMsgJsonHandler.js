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
import { delay } from "../../extra/delay.js";
import auth from "../../services/auth.js";
import { getAllMessages } from "../../services/client.js";
import memory from "./memory.js";
import * as fs from "fs";
memory.set(true);
var path = "data";
export default function addAIOHandler(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var userId, numbers, startId, fromChat, endFrom, lastProcessedId, startFrom, messages, lastFetchedMessageId, extractedList, error_1, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!!auth.isAdmin(userId ? userId : 0 || !memory.get())) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Sorry, you have no permission to do this or wait.")];
                case 1: return [2 /*return*/, _c.sent()];
                case 2:
                    if (!memory.get()) return [3 /*break*/, 24];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 21, , 23]);
                    numbers = ctx.message.text
                        .trim()
                        .replace("/mmj", "")
                        .trim()
                        .split(" ")
                        .map(function (number) {
                        var parsedNumber = parseInt(number, 10);
                        if (isNaN(parsedNumber)) {
                            ctx.reply("Invalid details");
                            throw new Error("Invalid number");
                        }
                        return parsedNumber;
                    });
                    startId = numbers[0], fromChat = numbers[1], endFrom = numbers[2];
                    path = "data".concat(fromChat, ".json");
                    lastProcessedId = readLastProcessedIdFromMessagesFile();
                    startFrom = Math.max(startId, lastProcessedId);
                    _c.label = 4;
                case 4:
                    if (!(startFrom <= endFrom)) return [3 /*break*/, 15];
                    memory.set(false);
                    return [4 /*yield*/, ctx.reply("Start from ".concat(startFrom))];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _c.trys.push([6, 11, , 14]);
                    return [4 /*yield*/, getAllMessages(fromChat, startFrom)];
                case 7:
                    messages = _c.sent();
                    console.log("Messages length:", messages.length);
                    if (!(messages.length === 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, ctx.reply("No more messages to process.")];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 15];
                case 9:
                    lastFetchedMessageId = (_b = messages[messages.length - 1]) === null || _b === void 0 ? void 0 : _b.id;
                    startFrom = lastFetchedMessageId;
                    extractedList = extractMessageData2(messages);
                    return [4 /*yield*/, delay(2000, 3000)];
                case 10:
                    _c.sent();
                    return [3 /*break*/, 14];
                case 11:
                    error_1 = _c.sent();
                    console.error("Error processing batch:", error_1);
                    return [4 /*yield*/, ctx.reply("Retrying in 2-3 minutes due to an error...")];
                case 12:
                    _c.sent();
                    return [4 /*yield*/, delay(2 * 60 * 1000, 4 * 60 * 1000)];
                case 13:
                    _c.sent();
                    return [3 /*break*/, 14];
                case 14: return [3 /*break*/, 4];
                case 15:
                    memory.set(true);
                    return [4 /*yield*/, ctx.reply("Done!")];
                case 16:
                    _c.sent();
                    if (!fs.existsSync(path)) return [3 /*break*/, 18];
                    return [4 /*yield*/, ctx.replyWithDocument({ source: path })];
                case 17:
                    _c.sent();
                    return [3 /*break*/, 20];
                case 18: return [4 /*yield*/, ctx.reply("File does not exist.")];
                case 19:
                    _c.sent();
                    _c.label = 20;
                case 20: return [3 /*break*/, 23];
                case 21:
                    err_1 = _c.sent();
                    console.error("Error in addAIOHandler:", err_1);
                    return [4 /*yield*/, ctx.reply("Please provide the correct details. The command should be in the format: /add startId fromChat toChat endFrom")];
                case 22:
                    _c.sent();
                    return [3 /*break*/, 23];
                case 23: return [3 /*break*/, 25];
                case 24:
                    ctx.reply("Please wait... \nTry again after some time.");
                    _c.label = 25;
                case 25: return [2 /*return*/];
            }
        });
    });
}
function readMessagesFromFile() {
    if (fs.existsSync(path)) {
        var data = fs.readFileSync(path, "utf-8");
        return JSON.parse(data);
    }
    else {
        return [];
    }
}
function saveMessagesToFile(messages) {
    fs.writeFileSync(path, JSON.stringify(messages, null, 2), "utf-8");
}
function readLastProcessedIdFromMessagesFile() {
    var _a;
    if (fs.existsSync(path)) {
        var data = fs.readFileSync(path, "utf-8");
        var messages = JSON.parse(data);
        if (messages.length > 0) {
            return ((_a = messages[messages.length - 1]) === null || _a === void 0 ? void 0 : _a.id) || 0;
        }
    }
    return 0;
}
function extractMessageData2(messages) {
    var storedMessages = readMessagesFromFile();
    for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
        var msg = messages_1[_i];
        var id = msg.id || 0;
        var caption = msg.message || "";
        var mediaFilename = void 0;
        if (msg.media && msg.media.document) {
            var fileNameAttribute = msg.media.document.attributes.find(function (attr) { return attr.className === "DocumentAttributeFilename"; });
            if (fileNameAttribute && fileNameAttribute.fileName) {
                mediaFilename = fileNameAttribute.fileName;
                caption = mediaFilename;
            }
        }
        storedMessages.push({ id: id, caption: caption });
    }
    saveMessagesToFile(storedMessages);
    return { storedMessages: storedMessages };
}
