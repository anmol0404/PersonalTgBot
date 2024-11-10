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
import env from "../../services/env.js";
import { sendToCollectionAll } from "../../utils/sendToCollection.js";
import { delay } from "../../extra/delay.js";
import fs from "fs/promises";
var apps = env.botTokens;
function done(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var args, botUsername, backupLink, numberArgs, collectionAIO, data, jsonArray, i, appIndex, appInstance, movie, aIOPosterID, aIOTitle, shareId, link, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 15, , 17]);
                    if (!(ctx.message && "text" in ctx.message)) return [3 /*break*/, 14];
                    args = ctx.message.text.trim().replace("/mkc", "").trim().split(" ");
                    if (!(args.length < 7)) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Please provide all details: username, promoUsername, startId, fromChat, toChat, collectionAIO, endFrom")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    botUsername = args[0], backupLink = args[1], numberArgs = args.slice(2);
                    collectionAIO = parseInt(numberArgs[0], 10);
                    if (!isNaN(collectionAIO)) return [3 /*break*/, 5];
                    return [4 /*yield*/, ctx.reply("Invalid details. Please make sure collectionAIO is a number.")];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, fs.readFile("./aio.json", "utf8")];
                case 6:
                    data = _a.sent();
                    jsonArray = JSON.parse(data);
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < jsonArray.length)) return [3 /*break*/, 14];
                    appIndex = i % apps.length;
                    appInstance = apps[appIndex];
                    movie = jsonArray[i];
                    aIOPosterID = movie.aIOPosterID;
                    aIOTitle = movie.aIOTitle;
                    shareId = "";
                    if (typeof movie.shareId === "object" && "$numberLong" in movie.shareId) {
                        shareId += movie.shareId["$numberLong"];
                    }
                    else {
                        shareId += movie.shareId.toString();
                    }
                    link = "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-eng");
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 11, , 13]);
                    return [4 /*yield*/, sendToCollectionAll(collectionAIO, link, aIOTitle || "none", aIOPosterID, appInstance, backupLink)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, delay(300, 600)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 11:
                    error_1 = _a.sent();
                    return [4 /*yield*/, ctx.reply("Failed to send data for movie: ".concat(aIOTitle))];
                case 12:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 13:
                    i++;
                    return [3 /*break*/, 7];
                case 14: return [3 /*break*/, 17];
                case 15:
                    error_2 = _a.sent();
                    console.error("An error occurred in the done function:", error_2);
                    return [4 /*yield*/, ctx.reply("An unexpected error occurred. Please try again later.")];
                case 16:
                    _a.sent();
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
}
export { done };
