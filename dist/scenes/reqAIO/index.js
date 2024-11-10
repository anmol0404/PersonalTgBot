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
import { Scenes, Composer } from "telegraf";
import database from "../../services/database.js";
import env from "../../services/env.js";
import { makeAIOCaption } from "../../utils/caption/makeCaption.js";
import getRandomId from "../../extra/getRandomId.js";
import { sendCallbackQueryResponse } from "./answerCbQUery.js";
import { makeButtons } from "../../utils/markupButton/permanantButton/keyboard.js";
import { reservedWordList } from "../../utils/markupButton/permanantButton/lists.js";
// Create a Wizard Scene
var paginationWizard = new Scenes.WizardScene("reqAIO", Composer.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var request, searchCriteria, finalResult, random, photo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!("text" in ctx.message)) return [3 /*break*/, 7];
                ctx.session.page = 0;
                request = ctx.message.text.replace("/eng", "").trim();
                if (!(!reservedWordList.includes(request.toLocaleLowerCase()) &&
                    request.length > 2 &&
                    request.length < 30)) return [3 /*break*/, 5];
                searchCriteria = {
                    aIOTitle: request,
                };
                return [4 /*yield*/, database.searchAIO(searchCriteria)];
            case 1:
                finalResult = _a.sent();
                random = getRandomId();
                ctx.session.prev = "prev".concat(random);
                ctx.session.next = "next".concat(random);
                console.log(ctx.session.prev);
                ctx.session.aIOData = finalResult;
                if (!(finalResult && finalResult.length > 0)) return [3 /*break*/, 3];
                photo = finalResult[0].aIOPosterID;
                return [4 /*yield*/, ctx
                        .replyWithPhoto(photo, {
                        caption: "```\n".concat(makeAIOCaption(finalResult[0]), "\n```"),
                        reply_markup: makeButtons("https://t.me/".concat(env.botUserName, "?start=").concat(finalResult[0].shareId, "-eng"), ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                        reply_to_message_id: ctx.message.message_id,
                    })
                        .then(function (sentMessage) {
                        var messageIdToDelete = sentMessage.message_id;
                        setTimeout(function () {
                            ctx.deleteMessage(messageIdToDelete);
                        }, 5 * 60 * 60 * 1000);
                    })];
            case 2:
                _a.sent();
                if (finalResult.length > 1) {
                    return [2 /*return*/, ctx.wizard.next()];
                }
                return [3 /*break*/, 4];
            case 3:
                ctx.scene.leave;
                _a.label = 4;
            case 4: return [2 /*return*/, ctx.wizard.next()];
            case 5: return [4 /*yield*/, ctx.scene.leave()];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); }), Composer.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var page, aIOData, photo, photo, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!("data" in ctx.callbackQuery &&
                    (ctx.session.next === ctx.callbackQuery.data ||
                        ctx.session.prev === ctx.callbackQuery.data))) return [3 /*break*/, 18];
                page = ctx.session.page || 0;
                aIOData = ctx.session.aIOData;
                console.log([
                    ctx.session.page || 0,
                    (_a = ctx.session.aIOData) === null || _a === void 0 ? void 0 : _a.length,
                ]);
                if (!aIOData) return [3 /*break*/, 15];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 13, , 14]);
                if (!ctx.callbackQuery.data.startsWith("next")) return [3 /*break*/, 7];
                if (!(page + 1 < aIOData.length)) return [3 /*break*/, 4];
                ctx.session.page =
                    ((_b = ctx.session.page) !== null && _b !== void 0 ? _b : 0) + 1;
                console.log(page, aIOData.length);
                photo = aIOData[ctx.session.page || 0].aIOPosterID;
                //edit
                return [4 /*yield*/, ctx.editMessageMedia({
                        type: "photo",
                        media: photo,
                    })];
            case 2:
                //edit
                _d.sent();
                return [4 /*yield*/, ctx.editMessageCaption("```\n".concat(makeAIOCaption(aIOData[page + 1]), "\n```"), {
                        reply_markup: makeButtons("https://t.me/".concat(env.botUserName, "?start=").concat(aIOData[page + 1].shareId, "-eng"), ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                    })];
            case 3:
                _d.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "This is the last no more there !! ")];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6: return [3 /*break*/, 12];
            case 7:
                if (!ctx.callbackQuery.data.startsWith("prev")) return [3 /*break*/, 12];
                if (!(aIOData && page != 0)) return [3 /*break*/, 10];
                //ignore this page != 0
                ctx.session.page = Math.max(((_c = ctx.session.page) !== null && _c !== void 0 ? _c : 0) - 1, 0);
                photo = aIOData[page - 1].aIOPosterID;
                return [4 /*yield*/, ctx.editMessageMedia({
                        type: "photo",
                        media: photo,
                    })];
            case 8:
                _d.sent();
                return [4 /*yield*/, ctx.editMessageCaption("```\n ".concat(makeAIOCaption(aIOData[page - 1]), "\n```"), {
                        reply_markup: makeButtons("https://t.me/".concat(env.botUserName, "?start=").concat(aIOData[page - 1].shareId, "-eng"), ctx.session.next || "", ctx.session.prev || ""),
                        parse_mode: "MarkdownV2",
                    })];
            case 9:
                _d.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "Nothing in Prev !! ")];
            case 11:
                _d.sent();
                _d.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                error_1 = _d.sent();
                return [3 /*break*/, 14];
            case 14: return [3 /*break*/, 17];
            case 15: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "No more data there !!!")];
            case 16:
                _d.sent();
                _d.label = 17;
            case 17: return [3 /*break*/, 20];
            case 18: return [4 /*yield*/, sendCallbackQueryResponse(ctx, "you need to search again this  !!!")];
            case 19:
                _d.sent();
                _d.label = 20;
            case 20: return [2 /*return*/];
        }
    });
}); }));
export default paginationWizard;
