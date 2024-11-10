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
import database from "../../services/database.js";
import getAIOdata from "./aIODocument.js";
import { sendToCOllection2 } from "../../utils/sendToCollection.js";
import { delay } from "../../extra/delay.js";
import fs from "fs/promises";
import { editAIOTitle } from "../../utils/caption/editCaption.js";
import { Telegraf } from "telegraf";
var app = new Telegraf("7169264167:AAFhKex9ZZU4IyhCBcFzbCJW9i7eFdDWReg");
var app2 = new Telegraf("6935032403:AAGLMbYWtw-NzVbpq-kttVT_RBlVQRvfeb0");
var app3 = new Telegraf("7064197564:AAGh5xMTZ-NDbbZ1i4i634Vrh0ZbAetVJak");
var app4 = new Telegraf("6852648654:AAEGA-z6MgoEfAcLflRlBo-EehJHMpRSeHc");
var app5 = new Telegraf("7040925484:AAGnXpf5gTdP9DnbfU3IwOyHSA7m4vgx6D4");
var apps = [app, app2, app3, app4, app5];
function done(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var data, jsonArray, i, movie, messageIdsToCopy, messageIds, aIOTitle, aIOPosterID, appIndex, appInstance, success, result, error_1, AIODetails, AIOData, shareId, botUsername, link, sortLink;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile("./movies.json", "utf8")];
                case 1:
                    data = _a.sent();
                    jsonArray = JSON.parse(data);
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < jsonArray.length)) return [3 /*break*/, 17];
                    movie = jsonArray[i];
                    messageIdsToCopy = movie.messageIds;
                    messageIds = [];
                    aIOTitle = editAIOTitle(movie.aIOTitle, "");
                    aIOPosterID = movie.aIOPosterID;
                    appIndex = i % apps.length;
                    appInstance = apps[appIndex];
                    success = false;
                    _a.label = 3;
                case 3:
                    if (!!success) return [3 /*break*/, 11];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 10]);
                    return [4 /*yield*/, appInstance.telegram.copyMessage(-1002196550459, -1002092281312, messageIdsToCopy[0])];
                case 5:
                    result = _a.sent();
                    messageIds.push(result.message_id);
                    success = true;
                    return [3 /*break*/, 10];
                case 6:
                    error_1 = _a.sent();
                    success = false;
                    if (!(error_1.code === 429)) return [3 /*break*/, 8];
                    console.log("".concat(error_1));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 40000); })];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    success = true;
                    return [3 /*break*/, 3];
                case 9: return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 3];
                case 11:
                    AIODetails = {
                        aIOTitle: aIOTitle,
                        backupChannel: "",
                        messageIds: messageIds,
                        // shareId: getRandomId().toString(),
                        aIOPosterID: aIOPosterID,
                    };
                    return [4 /*yield*/, getAIOdata(AIODetails, messageIds)];
                case 12:
                    AIOData = _a.sent();
                    return [4 /*yield*/, database.saveAIO(AIOData)];
                case 13:
                    shareId = _a.sent();
                    botUsername = env.botUserName;
                    link = "https://t.me/".concat(botUsername, "?start=").concat(shareId, "-eng");
                    console.log(shareId);
                    sortLink = AIOData.aioShortUrl;
                    console.log(link, sortLink);
                    return [4 /*yield*/, sendToCOllection2(env.collectionAIO, sortLink, aIOTitle || "none", appInstance)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, delay(300, 600)];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    i++;
                    return [3 /*break*/, 2];
                case 17: return [2 /*return*/];
            }
        });
    });
}
export { done };
