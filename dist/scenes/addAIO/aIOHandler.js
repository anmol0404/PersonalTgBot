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
import telegram from "../../services/telegram.js";
import database from "../../services/database.js";
import getAIOdata from "./aIODocument.js";
import { sendToCOllection } from "../../utils/sendToCollection.js";
import { delay } from "../../extra/delay.js";
import fs from "fs/promises";
import memory from "../../handlers/commands/memory.js";
var can = true;
function done(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var tracker, args, botUsername, promoUsername, numberArgs, _a, startId, fromChat, toChat, collectionAIO, endFrom, data, jsonArray, i, drama, forwardedMessageIds, AIOData, link, shareId, ctracker, error_1, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 27, 29, 30]);
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled, start again with /add ")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, database.createOrUpdateTracker()];
                case 4:
                    tracker = _b.sent();
                    if (!(ctx.message && "text" in ctx.message)) return [3 /*break*/, 26];
                    args = ctx.message.text.trim().replace("/add", "").trim().split(" ");
                    if (!(args.length < 7)) return [3 /*break*/, 7];
                    return [4 /*yield*/, ctx.reply("Please provide all details: username, promoUsername, startId, fromChat, toChat, collectionAIO, endFrom")];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 6: return [2 /*return*/, _b.sent()];
                case 7:
                    botUsername = args[0], promoUsername = args[1], numberArgs = args.slice(2);
                    _a = numberArgs.map(function (arg) {
                        var parsedNumber = parseInt(arg, 10);
                        if (isNaN(parsedNumber)) {
                            ctx.reply("Invalid details. Please make sure startId, fromChat, toChat, collectionAIO, and endFrom are numbers.");
                            throw new Error("Invalid number in arguments");
                        }
                        return parsedNumber;
                    }), startId = _a[0], fromChat = _a[1], toChat = _a[2], collectionAIO = _a[3], endFrom = _a[4];
                    if (!(!ctx.session.done && can)) return [3 /*break*/, 26];
                    can = false;
                    return [4 /*yield*/, fs.readFile("./bl.json", "utf8")];
                case 8:
                    data = _b.sent();
                    jsonArray = JSON.parse(data);
                    i = tracker.counter;
                    _b.label = 9;
                case 9:
                    if (!(i < jsonArray.length)) return [3 /*break*/, 24];
                    if (!memory.getStopAdding()) return [3 /*break*/, 11];
                    memory.set(false);
                    return [4 /*yield*/, ctx.reply("Adding stopped.")];
                case 10: return [2 /*return*/, _b.sent()];
                case 11:
                    drama = jsonArray[i];
                    _b.label = 12;
                case 12:
                    _b.trys.push([12, 21, , 23]);
                    return [4 /*yield*/, telegram.forwardMessages(toChat, fromChat, drama.messageIds ? drama.messageIds : [], false, [], promoUsername)];
                case 13:
                    forwardedMessageIds = _b.sent();
                    drama.messageIds = forwardedMessageIds ? forwardedMessageIds : [];
                    return [4 /*yield*/, getAIOdata(drama)];
                case 14:
                    AIOData = _b.sent();
                    link = "https://t.me/".concat(botUsername, "?start=").concat(AIOData.shareId, "-eng");
                    return [4 /*yield*/, ctx.reply("".concat(drama.aIOTitle || "none", "\n").concat(link))];
                case 15:
                    _b.sent();
                    return [4 /*yield*/, database.saveAIO(AIOData)];
                case 16:
                    shareId = _b.sent();
                    return [4 /*yield*/, sendToCOllection(collectionAIO, drama.aIOPosterID, link, drama.aIOTitle.replace("  #", "") || "none")];
                case 17:
                    _b.sent();
                    return [4 /*yield*/, database.createOrUpdateTracker(i + 1)];
                case 18:
                    ctracker = _b.sent();
                    return [4 /*yield*/, ctx.reply("track" + ctracker.counter.toString())];
                case 19:
                    _b.sent();
                    return [4 /*yield*/, delay(200, 400)];
                case 20:
                    _b.sent();
                    return [3 /*break*/, 23];
                case 21:
                    error_1 = _b.sent();
                    return [4 /*yield*/, ctx.reply("Failed to process drama item: ".concat(i + 1, ". Skipping to next."))];
                case 22:
                    _b.sent();
                    return [3 /*break*/, 23];
                case 23:
                    i++;
                    return [3 /*break*/, 9];
                case 24: return [4 /*yield*/, ctx.scene.leave()];
                case 25: return [2 /*return*/, _b.sent()];
                case 26: return [3 /*break*/, 30];
                case 27:
                    error_2 = _b.sent();
                    console.error("An error occurred in the done function:", error_2);
                    return [4 /*yield*/, ctx.reply("An unexpected error occurred. Please try again later.")];
                case 28:
                    _b.sent();
                    return [3 /*break*/, 30];
                case 29:
                    can = true;
                    return [7 /*endfinally*/];
                case 30: return [2 /*return*/];
            }
        });
    });
}
export { done };
