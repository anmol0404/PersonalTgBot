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
// import { getThumb } from '../services/thumbnail';
import env from "../../services/env.js";
import { formatDuration } from "../formatter.js";
import { uploadFile } from "../../services/client.js";
import { downloadVideo } from "../../services/downloader.js";
import fs from "fs-extra";
var VideoHandler = /** @class */ (function () {
    function VideoHandler() {
    }
    VideoHandler.handleDownload = function (ctx, url, statusMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var lastUpdate_1, updateInterval_1, videoInfo, videoMessage, error_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        lastUpdate_1 = Date.now();
                        updateInterval_1 = 2000;
                        return [4 /*yield*/, downloadVideo(url, function (progress) { return __awaiter(_this, void 0, void 0, function () {
                                var now;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            now = Date.now();
                                            if (!(now - lastUpdate_1 >= updateInterval_1)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.updateProgress(ctx, statusMessage, url, progress)];
                                        case 1:
                                            _a.sent();
                                            lastUpdate_1 = now;
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        videoInfo = _a.sent();
                        console.log(videoInfo);
                        return [4 /*yield*/, uploadFile(env.channel, videoInfo)];
                    case 2:
                        videoMessage = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fs.unlink(videoInfo.path)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error("Error deleting file ".concat(videoInfo.path, ": ").concat(error_1));
                        return [3 /*break*/, 6];
                    case 6: 
                    // const videoMessage = await this.sendVideo(ctx, videoInfo);
                    // console.log(videoMessage + "hfdvfsh");
                    // const message_id = videoMessage.message_id;
                    // const chat_id = videoMessage.chat.id;
                    // if (process.env.CHANNEL_ID) {
                    //   await this.sendToChannel(ctx, message_id, chat_id, videoInfo);
                    // }
                    return [2 /*return*/, true];
                    case 7:
                        error_2 = _a.sent();
                        throw new Error("Download failed: ".concat(error_2 instanceof Error ? error_2.message : "Unknown error"));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    VideoHandler.updateProgress = function (ctx, statusMessage, url, progress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.telegram.editMessageText(statusMessage.chat.id, statusMessage.message_id, undefined, "\uD83D\uDCE5 Downloading Video\n\n" +
                            "".concat(progress.progress, "\n") +
                            "\uD83D\uDCE6 Size: ".concat(progress.downloaded, " / ").concat(progress.total, "\n") +
                            "\uD83D\uDE80 Speed: ".concat(progress.speed), { parse_mode: "HTML" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoHandler.sendVideo = function (ctx, videoInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.sendVideo({ source: videoInfo.path }, {
                            caption: "\uD83D\uDCF9 Video Details\n\n" +
                                "\uD83C\uDFAC Title: ".concat(videoInfo.title, "\n") +
                                "\uD83D\uDCCA Quality: ".concat(videoInfo.quality, "\n") +
                                "\u23F1 Duration: ".concat(formatDuration(videoInfo.duration), "\n") +
                                "\uD83D\uDCE6 Size: ".concat(videoInfo.size),
                            parse_mode: "HTML",
                            // thumb: thumb,
                            width: videoInfo.width,
                            height: videoInfo.height,
                            duration: videoInfo.duration,
                        })];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                }
            });
        });
    };
    VideoHandler.sendToChannel = function (ctx, message_id, chat_id, videoInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.telegram.copyMessage(env.channel, chat_id, message_id, {
                            caption: " ".concat(videoInfo.title, "\n"),
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return VideoHandler;
}());
export { VideoHandler };
