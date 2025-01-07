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
import fs from "fs-extra";
import path from "path";
import axios from "axios";
import { formatProgress, prettyBytes } from "../utils/formatter.js";
var DOWNLOADS_DIR = path.join(process.cwd(), "downloads");
export function downloadVideo(url, progressCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var fileName, filePath, headers, totalBytes_1, downloadedBytes_1, lastUpdateTime_1, updateInterval_1, writer_1, chunkSize, start, _loop_1, state_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fs.ensureDir(DOWNLOADS_DIR)];
                case 1:
                    _a.sent();
                    fileName = "video_".concat(Date.now(), ".mp4");
                    filePath = path.join(DOWNLOADS_DIR, fileName);
                    return [4 /*yield*/, axios.head(url)];
                case 2:
                    headers = (_a.sent()).headers;
                    totalBytes_1 = parseInt(headers["content-length"] || "0", 10);
                    if (isNaN(totalBytes_1) || totalBytes_1 <= 0) {
                        throw new Error("Invalid content length received from server");
                    }
                    downloadedBytes_1 = 0;
                    lastUpdateTime_1 = Date.now();
                    updateInterval_1 = 2000;
                    writer_1 = fs.createWriteStream(filePath, { flags: "w" });
                    chunkSize = 20 * 1024 * 1024;
                    start = 0;
                    _loop_1 = function () {
                        var end, response_1, error_2, fullResponse_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    end = Math.min(start + chunkSize - 1, totalBytes_1 - 1);
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 4, , 7]);
                                    return [4 /*yield*/, axios({
                                            method: "GET",
                                            url: url,
                                            responseType: "stream",
                                            timeout: 2400000, // Timeout 40 minutes
                                            headers: {
                                                Range: "bytes=".concat(start, "-").concat(end),
                                            },
                                        })];
                                case 2:
                                    response_1 = _b.sent();
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            response_1.data.on("data", function (chunk) {
                                                downloadedBytes_1 += chunk.length;
                                                // Ensure downloadedBytes does not exceed totalBytes
                                                downloadedBytes_1 = Math.min(downloadedBytes_1, totalBytes_1);
                                                var currentTime = Date.now();
                                                // Only update progress every few seconds
                                                if (progressCallback && currentTime - lastUpdateTime_1 >= updateInterval_1) {
                                                    lastUpdateTime_1 = currentTime;
                                                    progressCallback({
                                                        progress: formatProgress(downloadedBytes_1, totalBytes_1),
                                                        downloaded: prettyBytes(downloadedBytes_1),
                                                        total: prettyBytes(totalBytes_1),
                                                        speed: "".concat(prettyBytes(chunk.length), "/s"),
                                                    }).catch(console.error);
                                                }
                                            });
                                            response_1.data.pipe(writer_1, { end: false });
                                            response_1.data.on("end", resolve);
                                            response_1.data.on("error", reject);
                                        })];
                                case 3:
                                    _b.sent();
                                    start += chunkSize;
                                    return [3 /*break*/, 7];
                                case 4:
                                    error_2 = _b.sent();
                                    console.warn("Range request failed, attempting to download the entire file");
                                    return [4 /*yield*/, axios({
                                            method: "GET",
                                            url: url,
                                            responseType: "stream",
                                            timeout: 2400000,
                                        })];
                                case 5:
                                    fullResponse_1 = _b.sent();
                                    fullResponse_1.data.pipe(writer_1);
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            fullResponse_1.data.on("end", resolve);
                                            fullResponse_1.data.on("error", reject);
                                        })];
                                case 6:
                                    _b.sent();
                                    return [2 /*return*/, "break"];
                                case 7: return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 3;
                case 3:
                    if (!(start < totalBytes_1)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1()];
                case 4:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 5];
                    return [3 /*break*/, 3];
                case 5:
                    writer_1.end();
                    return [2 /*return*/, {
                            path: filePath,
                            title: fileName,
                            quality: "N/A", // Placeholder for video quality
                            duration: 0, // Placeholder for video duration
                            width: 0, // Placeholder for video width
                            height: 0, // Placeholder for video height
                            size: prettyBytes(totalBytes_1),
                        }];
                case 6:
                    error_1 = _a.sent();
                    throw new Error("Download failed:: ".concat(error_1 instanceof Error ? error_1.message : "Unknown error"));
                case 7: return [2 /*return*/];
            }
        });
    });
}
