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
import axios from "axios";
import { getThumb, setThumb } from "../thumbnail.js";
export function handleSetThumb(ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var photo, file, fileUrl, response, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 11]);
                    if (!!((_a = ctx.message.reply_to_message) === null || _a === void 0 ? void 0 : _a.photo)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.reply("Please reply to an image to set it as thumbnail")];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
                case 2:
                    photo = ctx.message.reply_to_message.photo.pop();
                    if (!!photo) return [3 /*break*/, 4];
                    return [4 /*yield*/, ctx.reply("Invalid image")];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
                case 4: return [4 /*yield*/, ctx.telegram.getFile(photo.file_id)];
                case 5:
                    file = _b.sent();
                    fileUrl = "https://api.telegram.org/file/bot".concat(process.env.BOT_TOKEN, "/").concat(file.file_path);
                    return [4 /*yield*/, axios.get(fileUrl, { responseType: "arraybuffer" })];
                case 6:
                    response = _b.sent();
                    return [4 /*yield*/, setThumb(ctx.from.id, Buffer.from(response.data))];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, ctx.reply("✅ Custom thumbnail has been set successfully!")];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 9:
                    error_1 = _b.sent();
                    return [4 /*yield*/, ctx.reply("❌ Failed to set thumbnail: " + (error_1 instanceof Error ? error_1.message : "Unknown error"))];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
export function handleViewThumb(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var thumbPath, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 7]);
                    return [4 /*yield*/, getThumb(ctx.from.id)];
                case 1:
                    thumbPath = _a.sent();
                    if (!!thumbPath) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("No custom thumbnail found. Set one using /setthumb command.")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, ctx.replyWithPhoto({ source: thumbPath }, { caption: "Your current custom thumbnail" })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    error_2 = _a.sent();
                    return [4 /*yield*/, ctx.reply("Failed to retrieve thumbnail: " + (error_2 instanceof Error ? error_2.message : "Unknown error"))];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
