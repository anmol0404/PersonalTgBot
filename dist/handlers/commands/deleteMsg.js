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
import { deleteMessagesInBatches, getAllMessages } from "../../services/client.js";
import memory from "./memory.js";
memory.set(true);
export default function addAIOHandler(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var userId, args, startFrom, chat, messages, extractedList, numbers, startId, fromChat, endFrom, messages, extractedList, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!(!auth.isAdmin(userId || 0) || !memory.get())) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Sorry, you have no permission to do this")];
                case 1: return [2 /*return*/, _c.sent()];
                case 2:
                    args = ctx.message.text.trim().replace("/del", "").trim().split(" ");
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 26, 28, 29]);
                    memory.set(false);
                    startFrom = 0;
                    _c.label = 4;
                case 4:
                    if (!true) return [3 /*break*/, 24];
                    if (!memory.getStopDeletion()) return [3 /*break*/, 6];
                    memory.set(false);
                    return [4 /*yield*/, ctx.reply("Deletion stopped.")];
                case 5: return [2 /*return*/, _c.sent()];
                case 6: return [4 /*yield*/, ctx.reply("Starting deletion from ".concat(startFrom))];
                case 7:
                    _c.sent();
                    if (!(args[0] === "all")) return [3 /*break*/, 15];
                    chat = ctx.message.chat.id;
                    return [4 /*yield*/, getAllMessages(chat, startFrom)];
                case 8:
                    messages = _c.sent();
                    extractedList = extractMessageData(messages);
                    if (!(extractedList.length < 2)) return [3 /*break*/, 11];
                    return [4 /*yield*/, ctx.scene.leave()];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, ctx.reply("All messages deleted!")];
                case 10: return [2 /*return*/, _c.sent()];
                case 11: return [4 /*yield*/, delay(30000, 40000)];
                case 12:
                    _c.sent();
                    return [4 /*yield*/, deleteMessagesInBatches(chat, extractedList)];
                case 13:
                    _c.sent();
                    memory.set(true);
                    return [4 /*yield*/, ctx.reply("Deletion completed.")];
                case 14: return [2 /*return*/, _c.sent()];
                case 15:
                    numbers = parseMessageIds(args);
                    if (!!numbers) return [3 /*break*/, 17];
                    return [4 /*yield*/, ctx.reply("Invalid details provided.")];
                case 16: return [2 /*return*/, _c.sent()];
                case 17:
                    startId = numbers[0], fromChat = numbers[1], endFrom = numbers[2];
                    startId = startFrom;
                    return [4 /*yield*/, getAllMessages(fromChat, startFrom)];
                case 18:
                    messages = _c.sent();
                    extractedList = extractMessageData(messages);
                    if (extractedList.length < 1)
                        return [3 /*break*/, 24];
                    return [4 /*yield*/, deleteMessagesInBatches(fromChat, extractedList)];
                case 19:
                    _c.sent();
                    if (!(startFrom + 50 >= endFrom)) return [3 /*break*/, 21];
                    return [4 /*yield*/, ctx.reply("deleted")];
                case 20: return [2 /*return*/, _c.sent()];
                case 21:
                    startFrom = ((_b = messages[messages.length - 1]) === null || _b === void 0 ? void 0 : _b.id) - 1 || 0;
                    if (messages.length <= 1)
                        return [3 /*break*/, 24];
                    return [4 /*yield*/, delay(30000, 40000)];
                case 22:
                    _c.sent();
                    _c.label = 23;
                case 23: return [3 /*break*/, 4];
                case 24: return [4 /*yield*/, ctx.reply("Deletion completed!")];
                case 25:
                    _c.sent();
                    return [3 /*break*/, 29];
                case 26:
                    err_1 = _c.sent();
                    return [4 /*yield*/, ctx.reply("Error: Please use the format: /del startId fromChat endFrom.")];
                case 27:
                    _c.sent();
                    return [3 /*break*/, 29];
                case 28:
                    memory.set(true);
                    return [7 /*endfinally*/];
                case 29: return [2 /*return*/];
            }
        });
    });
}
// Helper function to extract valid message IDs
function extractMessageData(messages) {
    return messages.map(function (msg) { return msg.id || 0; }).filter(function (id) { return id; });
}
// Parse IDs from input, return null if invalid
function parseMessageIds(args) {
    var numbers = args.map(function (num) { return parseInt(num, 10); });
    if (numbers.some(isNaN))
        return null;
    return numbers;
}
