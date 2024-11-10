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
import memory from "./memory.js";
import telegram from "../../services/telegram.js";
memory.set(true);
export default function postHandler(ctx) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var args, parts, content, imageUrl, buttonArgs, buttons_1, currentRow_1, replyMarkup, repliedToMessageId, error_1, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text.startsWith("/post"))) return [3 /*break*/, 15];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 13, , 15]);
                    args = ctx.message.text
                        .trim()
                        .replace("/post", "")
                        .replace(" (", "(")
                        .replace("( ", "(")
                        .replace(" )", ")")
                        .replace(") ", ")")
                        .replace(" ,", ",")
                        .replace(", ", ",")
                        .trim();
                    parts = args.split(",").map(function (part) { return part.trim(); });
                    content = "";
                    imageUrl = "";
                    buttonArgs = [];
                    if (parts[0].startsWith("http")) {
                        imageUrl = parts[0];
                        content = "";
                        buttonArgs = parts.slice(1);
                    }
                    else if ((_a = parts[1]) === null || _a === void 0 ? void 0 : _a.startsWith("http")) {
                        imageUrl = parts[1];
                        content = parts[0] || "";
                        buttonArgs = parts.slice(2);
                    }
                    else {
                        content = parts[0] || "";
                        buttonArgs = parts.slice(1);
                    }
                    buttons_1 = [];
                    currentRow_1 = [];
                    buttonArgs.forEach(function (buttonArg) {
                        var buttonMatches = Array.from(buttonArg.matchAll(/(.+?)\((http[s]?:\/\/[^\s)]+)\)|(.+)/g));
                        buttonMatches.forEach(function (match) {
                            var _ = match[0], labelWithLink = match[1], link = match[2], labelOnly = match[3];
                            var label = labelWithLink || labelOnly || "";
                            if (label && link) {
                                currentRow_1.push({ text: label.trim(), url: link.trim() });
                            }
                            else if (label) {
                                currentRow_1.push({
                                    text: label.trim(),
                                    callback_data: "action_".concat(label.trim().replace(/\s+/g, "_")),
                                });
                            }
                        });
                        if (currentRow_1.length >= 2) {
                            buttons_1.push(currentRow_1);
                            currentRow_1 = [];
                        }
                    });
                    if (currentRow_1.length)
                        buttons_1.push(currentRow_1);
                    replyMarkup = {
                        inline_keyboard: buttons_1.map(function (row) {
                            return row.map(function (button) { return ({
                                text: button.text,
                                url: button.url ? button.url : undefined,
                                callback_data: button.callback_data ? button.callback_data : "",
                            }); });
                        }),
                    };
                    if (!(ctx.message && ctx.message.reply_to_message && replyMarkup && ((_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id))) return [3 /*break*/, 7];
                    repliedToMessageId = ctx.message.reply_to_message.message_id;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 6]);
                    return [4 /*yield*/, telegram.app.telegram.copyMessage(ctx.chat.id, ctx.chat.id, repliedToMessageId, {
                            reply_markup: replyMarkup,
                            parse_mode: "MarkdownV2",
                            caption: content || "‎ ",
                        })];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _c.sent();
                    return [4 /*yield*/, ctx.reply("I think I need to become an admin to do this else insure that format is /post caption , button1(link) button2(link) ...buttons")];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 11];
                case 7:
                    if (!imageUrl) return [3 /*break*/, 9];
                    return [4 /*yield*/, ctx.replyWithPhoto(imageUrl, {
                            caption: content,
                            reply_markup: replyMarkup,
                        })];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, ctx.reply(content || "‎ ", { reply_markup: replyMarkup })];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11: return [4 /*yield*/, ctx.deleteMessage()];
                case 12:
                    _c.sent();
                    return [3 /*break*/, 15];
                case 13:
                    error_2 = _c.sent();
                    console.error("Error while processing /post command:", error_2);
                    return [4 /*yield*/, ctx.reply("/post caption , <image URL> , button1(link)> <button2(link)> ...buttons")];
                case 14:
                    _c.sent();
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
