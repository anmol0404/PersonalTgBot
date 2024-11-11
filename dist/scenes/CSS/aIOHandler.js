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
import { TelegramClient } from "telegram/index.js";
import { StringSession } from "telegram/sessions/index.js";
var client;
// Ask for API Key
function askAPIKey(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ctx.session.session = "";
                    ctx.session.apiHash = "";
                    ctx.session.apiKey = 0;
                    return [4 /*yield*/, ctx.reply("Note: Go to [Telegram API](https://my.telegram.org/) to get your API Key Send the API Key here or say /cancel to exit", { parse_mode: "Markdown" })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ctx.wizard.next()];
            }
        });
    });
}
// Handle API Key and request API Hash
function handleAPIKeyAskHash(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text !== "/cancel")) return [3 /*break*/, 2];
                    ctx.session.apiKey = parseInt(ctx.message.text);
                    return [4 /*yield*/, ctx.reply("Please send your API Hash, or type /cancel to exit.")];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ctx.wizard.next()];
                case 2: return [4 /*yield*/, ctx.reply("Operation canceled.")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Handle API Hash and ask for phone number
function handleHashAskPhone(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message && ctx.message.text !== "/cancel")) return [3 /*break*/, 2];
                    ctx.session.apiHash = ctx.message.text;
                    return [4 /*yield*/, ctx.reply("Please provide your phone number (in international format), or type /cancel to exit.")];
                case 1:
                    _a.sent();
                    return [2 /*return*/, ctx.wizard.next()];
                case 2: return [4 /*yield*/, ctx.reply("Operation canceled.")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Handle phone number input and send OTP
function handlePhoneAskOTP(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var apiId, apiHash, stringSession, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message)) return [3 /*break*/, 12];
                    if (!(ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Operation canceled. Start again with /addaio.")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    // Save the phone number
                    ctx.session.phone = ctx.message.text;
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 8, , 11]);
                    apiId = ctx.session.apiKey;
                    apiHash = ctx.session.apiHash;
                    stringSession = new StringSession("");
                    client = new TelegramClient(stringSession, apiId, apiHash, {
                        connectionRetries: 5,
                    });
                    return [4 /*yield*/, client.connect()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.sendCode({ apiId: apiId, apiHash: apiHash }, ctx.session.phone)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, ctx.reply("OTP has been sent to your phone. Please enter the OTP you received.")];
                case 7:
                    _a.sent();
                    // Move to the next wizard step to handle OTP input
                    return [2 /*return*/, ctx.wizard.next()];
                case 8:
                    error_1 = _a.sent();
                    console.error("Error sending OTP:", error_1);
                    return [4 /*yield*/, ctx.reply("Failed to send OTP. Please start again with /addaio.")];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 10: return [2 /*return*/, _a.sent()];
                case 11: return [3 /*break*/, 15];
                case 12: return [4 /*yield*/, ctx.reply("Operation canceled.")];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 14: return [2 /*return*/, _a.sent()];
                case 15: return [2 /*return*/];
            }
        });
    });
}
// Handle OTP verification and sign in
function handleOTPVerification(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var apiId, apiHash, stringSession, sessionString, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(ctx.message && "text" in ctx.message)) return [3 /*break*/, 13];
                    if (!(ctx.message.text === "/cancel")) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.reply("Operation canceled. Start again with /addaio.")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    // Save the OTP entered by the user
                    ctx.session.otp = ctx.message.text;
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 9, , 12]);
                    apiId = ctx.session.apiKey;
                    apiHash = ctx.session.apiHash;
                    stringSession = new StringSession("");
                    return [4 /*yield*/, client.signInUser({ apiId: apiId, apiHash: apiHash }, {
                            phoneNumber: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, ctx.session.phone];
                            }); }); },
                            password: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, " ctx.message.text"];
                            }); }); },
                            phoneCode: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, ctx.session.otp];
                            }); }); },
                            onError: function (err) { return console.error("Error during client start:", err); },
                        })];
                case 5:
                    _a.sent();
                    sessionString = client.session.save();
                    return [4 /*yield*/, ctx.reply("`\n".concat(sessionString.toString(), "`"))];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, ctx.reply("Authentication successful! Save your session key and don't share it with anyone.")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 8: return [2 /*return*/, _a.sent()];
                case 9:
                    error_2 = _a.sent();
                    console.error("Authentication error:", error_2);
                    return [4 /*yield*/, ctx.reply("Authentication failed. Please start again with /addaio.")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 11: return [2 /*return*/, _a.sent()];
                case 12: return [3 /*break*/, 16];
                case 13: return [4 /*yield*/, ctx.reply("Invalid OTP. Please try again.")];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 15: return [2 /*return*/, _a.sent()];
                case 16: return [2 /*return*/];
            }
        });
    });
}
export { askAPIKey, handleAPIKeyAskHash, handleHashAskPhone, handlePhoneAskOTP, handleOTPVerification, };
