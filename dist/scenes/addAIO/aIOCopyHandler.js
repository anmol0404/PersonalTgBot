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
import { delay } from "../../extra/delay.js";
import { processCaption } from "../../utils/caption/editCaption.js";
import { Telegraf } from "telegraf";
import { getAllMessages } from "../../services/client.js";
var app = new Telegraf("7169264167:AAFhKex9ZZU4IyhCBcFzbCJW9i7eFdDWReg");
var app2 = new Telegraf("6935032403:AAGLMbYWtw-NzVbpq-kttVT_RBlVQRvfeb0");
var app3 = new Telegraf("7064197564:AAGh5xMTZ-NDbbZ1i4i634Vrh0ZbAetVJak");
var app4 = new Telegraf("6852648654:AAEGA-z6MgoEfAcLflRlBo-EehJHMpRSeHc");
var app5 = new Telegraf("7040925484:AAGnXpf5gTdP9DnbfU3IwOyHSA7m4vgx6D4");
var apps = [app, app2, app3, app4, app5];
function done(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var outerI, startFrom, msges, innerI, appIndex, appInstance, success, msg, caption, id, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outerI = 0;
                    startFrom = 0;
                    _a.label = 1;
                case 1:
                    if (!(outerI < 5)) return [3 /*break*/, 13];
                    return [4 /*yield*/, getAllMessages(-1002234725927, startFrom)];
                case 2:
                    msges = _a.sent();
                    console.log(msges);
                    innerI = 0;
                    _a.label = 3;
                case 3:
                    if (!(innerI < msges.length)) return [3 /*break*/, 12];
                    appIndex = innerI % apps.length;
                    appInstance = apps[appIndex];
                    success = false;
                    msg = msges[innerI];
                    caption = msg.message;
                    id = msg.id;
                    startFrom = id;
                    console.log(id);
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 7, , 11]);
                    return [4 /*yield*/, appInstance.telegram.copyMessage(-1002212733477, -1002234725927, id, {
                            caption: processCaption(caption, "@KDL_HERE"),
                        })];
                case 5:
                    _a.sent();
                    success = true;
                    return [4 /*yield*/, delay(300, 700)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 7:
                    error_1 = _a.sent();
                    success = false;
                    if (!(error_1.code === 429)) return [3 /*break*/, 9];
                    console.log("".concat(error_1));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 40000); })];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    success = true;
                    return [3 /*break*/, 11];
                case 10: return [3 /*break*/, 11];
                case 11:
                    innerI++;
                    return [3 /*break*/, 3];
                case 12:
                    outerI = outerI + 1;
                    return [3 /*break*/, 1];
                case 13: return [2 /*return*/];
            }
        });
    });
}
export { done };
