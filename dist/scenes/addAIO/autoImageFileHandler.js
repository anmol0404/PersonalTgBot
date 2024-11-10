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
import { getDramadata2 } from "./aIODocument.js";
import { sendToCOllection } from "../../utils/sendToCollection.js";
import { Input } from "telegraf";
import { delay } from "../../extra/delay.js";
import env from "../../services/env.js";
import { processCaption } from "../../utils/caption/editCaption.js";
import { getAllMessages } from "../../services/client.js";
function done(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var media, batch, foundFirstPhoto, count, msg, _i, msg_1, message, _a, media_1, mediaItem, messageIds, caption, photoId, photo, AIODetails, AIODetailsString, forwardedMessageIds, AIOData, shareId, botUsername, link;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Share AIO Canceled start again /addaio")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _b.sent()];
                case 3:
                    if (!!ctx.session.done) return [3 /*break*/, 18];
                    media = [];
                    batch = [[], "", ""];
                    foundFirstPhoto = false;
                    count = false;
                    return [4 /*yield*/, getAllMessages(-1002003392871, 133892)];
                case 4:
                    msg = _b.sent();
                    console.log("Total messages:", msg.length);
                    for (_i = 0, msg_1 = msg; _i < msg_1.length; _i++) {
                        message = msg_1[_i];
                        // Ensure message has media to process
                        if (message.media) {
                            if (message.media.webpage && message.media.webpage.type === "photo") {
                                console.log("Photo found with URL:", message.media.webpage.url);
                                console.log("Message details:", message);
                                if (!foundFirstPhoto) {
                                    if (count) {
                                        media.push(batch);
                                        batch = [[], "", ""];
                                    }
                                    else {
                                        count = true;
                                        continue;
                                    }
                                    batch[0].push(message.id);
                                    batch[1] = message.message;
                                    batch[2] = message.media.webpage.url;
                                    foundFirstPhoto = true;
                                }
                            }
                            else if (message.media.document) {
                                if (message.message.includes("1080p")) {
                                    batch[0].push(message.id);
                                    foundFirstPhoto = false;
                                }
                            }
                        }
                    }
                    console.log("Final collected media:", media);
                    _a = 0, media_1 = media;
                    _b.label = 5;
                case 5:
                    if (!(_a < media_1.length)) return [3 /*break*/, 16];
                    mediaItem = media_1[_a];
                    messageIds = mediaItem[0], caption = mediaItem[1], photoId = mediaItem[2];
                    if (!mediaItem || mediaItem.length < 3 || !photoId) {
                        console.log("Skipping invalid media item:", mediaItem);
                        return [3 /*break*/, 15];
                    }
                    if (messageIds.length === 0) {
                        console.log("Skipping empty batch:", messageIds);
                        return [3 /*break*/, 15];
                    }
                    console.log("Processing batch:", messageIds, caption, photoId);
                    return [4 /*yield*/, getPhotoUrlFromWebPage(photoId)];
                case 6:
                    photo = _b.sent();
                    AIODetails = {
                        aIOTitle: processCaption(caption, env.join),
                        backupChannel: "@drama_think",
                        messageIds: messageIds,
                        aIOPosterID: photo,
                    };
                    AIODetailsString = JSON.stringify(AIODetails, null, 2);
                    return [4 /*yield*/, ctx.reply("```AIO details and file received.\n".concat(AIODetailsString, " \uD83C\uDF89```"), {
                            parse_mode: "MarkdownV2",
                        })];
                case 7:
                    _b.sent();
                    ctx.session.done = true;
                    return [4 /*yield*/, telegram.forwardMessages(-1002053142149, -1002003392871, AIODetails.messageIds, false)];
                case 8:
                    forwardedMessageIds = _b.sent();
                    return [4 /*yield*/, getDramadata2(AIODetails, forwardedMessageIds)];
                case 9:
                    AIOData = _b.sent();
                    if (!!AIOData) return [3 /*break*/, 11];
                    return [4 /*yield*/, ctx.scene.leave()];
                case 10: return [2 /*return*/, _b.sent()];
                case 11: return [4 /*yield*/, database.saveAIO(AIOData)];
                case 12:
                    shareId = _b.sent();
                    botUsername = ctx.botInfo.username;
                    link = AIOData.aioShortUrl;
                    return [4 /*yield*/, ctx.reply("https://t.me/".concat(botUsername, "?start=").concat(shareId, "-eng"))];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, sendToCOllection(-1002241017188, photo, link, processCaption(caption, env.join) || "none")];
                case 14:
                    _b.sent();
                    _b.label = 15;
                case 15:
                    _a++;
                    return [3 /*break*/, 5];
                case 16: return [4 /*yield*/, ctx.scene.leave()];
                case 17: return [2 /*return*/, _b.sent()];
                case 18: return [2 /*return*/];
            }
        });
    });
}
export function getPhotoUrlFromWebPage(link) {
    return __awaiter(this, void 0, void 0, function () {
        var success, photo, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    success = false;
                    _a.label = 1;
                case 1:
                    if (!!success) return [3 /*break*/, 11];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 10]);
                    return [4 /*yield*/, telegram.app.telegram.sendPhoto(env.dbPosterID, Input.fromURL("".concat(link)))];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, delay(1000, 4100)];
                case 4:
                    _a.sent();
                    photo = "".concat(env.dbPosterLink, "/").concat(result.message_id);
                    success = true;
                    return [3 /*break*/, 10];
                case 5:
                    error_1 = _a.sent();
                    console.log(error_1);
                    success = false;
                    if (!(error_1.code === 429)) return [3 /*break*/, 7];
                    console.log("".concat(error_1));
                    return [4 /*yield*/, delay(40000, 41000)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    console.log("".concat(error_1));
                    return [4 /*yield*/, delay(40000, 41000)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 1];
                case 11: return [2 /*return*/, photo || ""];
            }
        });
    });
}
export { done };
export function checkMessageType(message) {
    if (message.media) {
        if (message.media.photo) {
            if (message.message.trim() !== "") {
                return "pwc"; // Photo with caption
            }
            else {
                return "pwoc"; // Photo without caption
            }
        }
        else if (message.media.video) {
            if (message.message.trim() !== "") {
                return "vw"; // Video with caption
            }
            else {
                return "v"; // Video without caption
            }
        }
        else if (message.media.document) {
            if (message.message.trim() !== "") {
                return "dw"; // Document with caption
            }
            else {
                return "d"; // Document without caption
            }
        }
    }
    return "n"; // No media
}
export function getPhotoUrl(photoId) {
    return __awaiter(this, void 0, void 0, function () {
        var success, photo, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    success = false;
                    _a.label = 1;
                case 1:
                    if (!!success) return [3 /*break*/, 11];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 10]);
                    return [4 /*yield*/, telegram.app.telegram.sendPhoto(env.dbPosterID, Input.fromURL("".concat(env.channelSourceLink, "/").concat(parseInt(photoId))))];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, delay(1000, 4100)];
                case 4:
                    _a.sent();
                    photo = "".concat(env.dbPosterLink, "/").concat(result.message_id);
                    success = true;
                    return [3 /*break*/, 10];
                case 5:
                    error_2 = _a.sent();
                    success = false;
                    if (!(error_2.code === 429)) return [3 /*break*/, 7];
                    console.log("".concat(error_2));
                    return [4 /*yield*/, delay(40000, 41000)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    console.log("".concat(error_2));
                    return [4 /*yield*/, delay(40000, 41000)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 1];
                case 11: return [2 /*return*/, photo || ""];
            }
        });
    });
}