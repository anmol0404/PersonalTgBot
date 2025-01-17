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
import { Api, TelegramClient } from "telegram/index.js";
import { StringSession } from "telegram/sessions/index.js";
import env from "./env.js";
import { delay } from "../extra/delay.js";
import memory from "../handlers/commands/memory.js";
import { formatDuration } from "../utils/formatter.js";
import { v2 as cloudinary } from "cloudinary";
var apiId = env.apiId;
var api = env.apiHash;
var session = env.session;
export var client = new TelegramClient(new StringSession(session), parseInt(apiId), api, {
    connectionRetries: 2,
});
env;
export function getMessageFromId(chat, messageId) {
    return __awaiter(this, void 0, void 0, function () {
        var source, message, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 7]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.getInputEntity(parseInt(chat))];
                case 2:
                    source = _a.sent();
                    return [4 /*yield*/, client.getMessages(source, { ids: [messageId] })];
                case 3:
                    message = _a.sent();
                    return [2 /*return*/, message];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error getting message with ID ".concat(messageId, " in chat ").concat(chat, ":"), error_1);
                    throw error_1;
                case 5: return [4 /*yield*/, client.disconnect()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
export function getAllMessages(chat, oId) {
    return __awaiter(this, void 0, void 0, function () {
        var source, offsetId, messages, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 7]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.getInputEntity(chat)];
                case 2:
                    source = _a.sent();
                    offsetId = oId;
                    return [4 /*yield*/, client.getMessages(source, {
                            limit: 5000,
                            offsetId: offsetId,
                            reverse: true,
                        })];
                case 3:
                    messages = _a.sent();
                    return [2 /*return*/, messages];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error getting all messages:", error_2);
                    throw error_2;
                case 5: return [4 /*yield*/, client.disconnect()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
export function deleteMessagesInBatches(channel, messageIds, endFrom) {
    if (endFrom === void 0) { endFrom = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var channelEntity, filteredMessageIds, batchSize, i, batch, batchError_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, 13, 15]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.getInputEntity(channel)];
                case 2:
                    channelEntity = _a.sent();
                    filteredMessageIds = endFrom !== 0 ? messageIds.filter(function (id) { return id <= endFrom; }) : messageIds;
                    batchSize = 50;
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < filteredMessageIds.length)) return [3 /*break*/, 11];
                    batch = filteredMessageIds.slice(i, i + batchSize);
                    if (memory.getStopDeletion()) {
                        memory.set(false);
                        console.log("Message deletion stopped by user.");
                        return [2 /*return*/];
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 8]);
                    console.log("Deleting messages: ".concat(batch));
                    return [4 /*yield*/, client.deleteMessages(channelEntity, batch, { revoke: true })];
                case 5:
                    _a.sent();
                    console.log("Deleted messages: ".concat(batch));
                    return [3 /*break*/, 8];
                case 6:
                    batchError_1 = _a.sent();
                    console.error("Error deleting batch ".concat(batch, ":"), batchError_1);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 40000); })];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 8: return [4 /*yield*/, delay(3000, 5000)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    i += batchSize;
                    return [3 /*break*/, 3];
                case 11: return [3 /*break*/, 15];
                case 12:
                    error_3 = _a.sent();
                    console.error("Error in deleteMessagesInBatches function:", error_3);
                    throw error_3;
                case 13: return [4 /*yield*/, client.disconnect()];
                case 14:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
}
export function uploadFile(channel, videoInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var message, error_4;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.sendFile(channel, {
                            file: videoInfo.path,
                            fileSize: parseInt(videoInfo.size) || 0,
                            workers: 2,
                            supportsStreaming: true,
                            // thumb: path,
                            caption: "".concat(videoInfo.title, "\n").concat(formatDuration(videoInfo.duration)),
                            attributes: [
                                new Api.DocumentAttributeVideo({
                                    duration: videoInfo.duration,
                                    w: 600,
                                    h: 350,
                                    supportsStreaming: true,
                                }),
                            ],
                            progressCallback: function (onprogress) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log(onprogress);
                                    return [2 /*return*/];
                                });
                            }); },
                        })];
                case 2:
                    message = _a.sent();
                    return [2 /*return*/, message];
                case 3:
                    error_4 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// export async function uploadFile(
//   channel: number,
//   videoInfo: VideoInfo
// ): Promise<Api.Message | undefined> {
//   try {
//     await client.connect();
//     const message = await client.sendFile(channel, {
//       file: await client.uploadFile({
//         file: new CustomFile(
//           videoInfo.path.replace("./", "") + ".mp4",
//           parseInt(videoInfo.size) || 0,
//           videoInfo.path
//         ),
//         workers: 2,
//       }),
//       // thumb: path,
//       attributes: [
//         new Api.DocumentAttributeVideo({
//           duration: videoInfo.duration,
//           w: 350,
//           h: 200,
//           supportsStreaming: true,
//         }),
//       ],
//       progressCallback: console.log,
//     });
//     return message;
//   } catch (error) {}
// }
export function downloadPhoto(message_id, chat_id) {
    return __awaiter(this, void 0, void 0, function () {
        var source, messages, message, photo, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 8]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.getInputEntity(chat_id)];
                case 2:
                    source = _a.sent();
                    return [4 /*yield*/, client.getMessages(source, { ids: [message_id] })];
                case 3:
                    messages = _a.sent();
                    message = messages[0];
                    return [4 /*yield*/, client.downloadMedia(message)];
                case 4:
                    photo = _a.sent();
                    return [2 /*return*/, photo];
                case 5:
                    error_5 = _a.sent();
                    console.error("Error downloading photo:", error_5);
                    throw error_5;
                case 6: return [4 /*yield*/, client.disconnect()];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function downloadAndUploadPhoto(message_id, chat_id) {
    return __awaiter(this, void 0, void 0, function () {
        var source, messages, message, photoBuffer_1, uploadResult, url, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, 7, 9]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.getInputEntity(chat_id)];
                case 2:
                    source = _a.sent();
                    return [4 /*yield*/, client.getMessages(source, { ids: [message_id] })];
                case 3:
                    messages = _a.sent();
                    message = messages[0];
                    return [4 /*yield*/, client.downloadMedia(message)];
                case 4:
                    photoBuffer_1 = _a.sent();
                    if (!photoBuffer_1) {
                        throw new Error("Photo not found or could not be downloaded.");
                    }
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var stream = cloudinary.uploader.upload_stream({ resource_type: "image" }, // Adjust resource type if necessary
                            function (error, result) {
                                if (error)
                                    reject(error);
                                else
                                    resolve(result);
                            });
                            stream.end(photoBuffer_1);
                        })];
                case 5:
                    uploadResult = _a.sent();
                    url = uploadResult.secure_url;
                    return [2 /*return*/, url];
                case 6:
                    error_6 = _a.sent();
                    console.error("Error downloading or uploading photo:", error_6);
                    throw error_6;
                case 7: return [4 /*yield*/, client.disconnect()];
                case 8:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
export function getAllParticipantIds(chat_id) {
    return __awaiter(this, void 0, void 0, function () {
        var source, participants, userIds, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 7]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.getInputEntity(chat_id)];
                case 2:
                    source = _a.sent();
                    return [4 /*yield*/, client.getParticipants(source)];
                case 3:
                    participants = _a.sent();
                    userIds = participants.map(function (participant) { return participant.id; });
                    return [2 /*return*/, userIds];
                case 4:
                    error_7 = _a.sent();
                    console.error("Error getting all participant IDs:", error_7);
                    throw error_7;
                case 5: return [4 /*yield*/, client.disconnect()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
