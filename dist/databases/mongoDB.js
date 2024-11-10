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
import mongoose from "mongoose";
import env from "../services/env.js";
import MessageModel from "./models/messageModel.js";
import UserModel from "./models/userModel.js";
import AIOModel from "./models/aIOModel.js";
import SortModel from "./models/sortModel.js";
import { InviteService } from "./inviteService.js";
import ConfigModel from "./models/configModels.js";
import TrackerModel from "./models/trackerModel.js";
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        this.db = mongoose;
        this.MessageModel = MessageModel;
        this.UserModel = UserModel;
        this.TrackerModel = TrackerModel;
        this.SortModel = SortModel;
        this.AIOModel = AIOModel;
        this.ConfigModel = ConfigModel;
        this.inviteService = new InviteService();
        this.databaseUrl = env.databaseUrl || "";
    }
    MongoDB.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.connect(this.databaseUrl)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.saveMessages = function (shareId, messageIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.MessageModel({
                            shareId: shareId,
                            messageIds: messageIds,
                        }).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, shareId];
                }
            });
        });
    };
    MongoDB.prototype.saveUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.UserModel(user).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MongoDB.prototype.createOrUpdateTracker = function (counter) {
        return __awaiter(this, void 0, void 0, function () {
            var tracker, updatedTracker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!counter) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.TrackerModel.findOne({})];
                    case 1:
                        tracker = _a.sent();
                        if (!!tracker) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.TrackerModel.create({ counter: 0 })];
                    case 2:
                        tracker = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, tracker];
                    case 4: return [4 /*yield*/, this.TrackerModel.findOneAndUpdate({}, { counter: counter }, {
                            new: true,
                            upsert: true,
                            setDefaultsOnInsert: true,
                        })];
                    case 5:
                        updatedTracker = _a.sent();
                        return [2 /*return*/, updatedTracker];
                }
            });
        });
    };
    MongoDB.prototype.getMessages = function (shareId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.MessageModel.findOne({ shareId: shareId })];
                    case 1: return [2 /*return*/, (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.messageIds];
                }
            });
        });
    };
    MongoDB.prototype.getAIOMessages = function (shareId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.AIOModel.findOne({ shareId: shareId })];
                    case 1: return [2 /*return*/, (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.messageIds];
                }
            });
        });
    };
    MongoDB.prototype.saveAIO = function (aio) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.AIOModel(aio).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, aio];
                }
            });
        });
    };
    MongoDB.prototype.getAllAIO = function () {
        return __awaiter(this, void 0, void 0, function () {
            var aios, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.AIOModel.find()];
                    case 1:
                        aios = _a.sent();
                        return [2 /*return*/, aios];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error while fetching the collection:", error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.deleteCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.AIOModel.deleteMany({})];
                    case 1:
                        _a.sent(); // Delete all documents in the collection
                        console.log("Collection deleted successfully");
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error while deleting the collection:", error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.saveSort = function (sort) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.SortModel(sort).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, sort];
                }
            });
        });
    };
    MongoDB.prototype.removeFirstItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var document_1, removedItem, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, SortModel.findOne({}, { sort: { $slice: 1 } })];
                    case 1:
                        document_1 = _a.sent();
                        if (!document_1 || document_1.sort.length === 0) {
                            console.log("No document found or the sort array is empty.");
                            return [2 /*return*/, null];
                        }
                        removedItem = document_1.sort[0];
                        return [4 /*yield*/, SortModel.findOneAndUpdate({ _id: document_1._id }, { $pop: { sort: -1 } }, { new: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, removedItem];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.searchAIO = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var regexOptions, query, results, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regexOptions = { $regex: new RegExp(criteria.aIOTitle || "", "i") };
                        query = {};
                        if (criteria.aIOTitle && criteria.aIOTitle.length >= 2) {
                            query.aIOTitle = regexOptions;
                        }
                        else {
                            query.aIOTitle = undefined;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.AIOModel.find(query)];
                    case 2:
                        results = _a.sent();
                        console.log("Search Result:", results);
                        return [2 /*return*/, results];
                    case 3:
                        err_2 = _a.sent();
                        console.error("Error executing the query:", err_2);
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.addAIO = function (shareId, messageIds) {
        return __awaiter(this, void 0, void 0, function () {
            var aioDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AIOModel.findOne({ shareId: shareId })];
                    case 1:
                        aioDocument = _a.sent();
                        if (!aioDocument) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.AIOModel.findByIdAndUpdate(aioDocument.id, { $push: { messageIds: { $each: messageIds } } }, { new: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    MongoDB.prototype.deleteAIO = function (shareId) {
        return __awaiter(this, void 0, void 0, function () {
            var animeDocument;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AIOModel.findOne({ shareId: shareId })];
                    case 1:
                        animeDocument = _a.sent();
                        if (!animeDocument) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.AIOModel.findByIdAndDelete(animeDocument.id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    MongoDB.prototype.updateAIOAttribute = function (shareId, updateQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AIOModel.updateOne({ shareId: shareId }, { $set: updateQuery })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error updating drama attribute:", error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //invite
    MongoDB.prototype.addInvite = function (userId, invitedUsername, invitedUserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inviteService.addInvite(userId, invitedUsername, invitedUserId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.getInviteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.inviteService.getInviteUser(userId)];
            });
        });
    };
    MongoDB.prototype.canRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.inviteService.canRequest(userId)];
            });
        });
    };
    MongoDB.prototype.useRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inviteService.useRequest(userId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.prototype.getConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ConfigModel.findOne()];
            });
        });
    };
    // Set a new configuration (replace existing config or create a new one)
    MongoDB.prototype.setConfig = function (configData) {
        return __awaiter(this, void 0, void 0, function () {
            var existingConfig, newConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ConfigModel.findOne()];
                    case 1:
                        existingConfig = _a.sent();
                        if (existingConfig) {
                            // Update existing configuration
                            Object.assign(existingConfig, configData);
                            return [2 /*return*/, existingConfig.save()];
                        }
                        else {
                            newConfig = new ConfigModel(configData);
                            return [2 /*return*/, newConfig.save()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Update specific fields in the configuration
    MongoDB.prototype.updateConfig = function (updates) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ConfigModel.findOneAndUpdate({}, updates, { new: true })];
            });
        });
    };
    // Individual getters
    MongoDB.prototype.getStringSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/, (config === null || config === void 0 ? void 0 : config.stringSession) || null];
                }
            });
        });
    };
    MongoDB.prototype.getApiKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/, (config === null || config === void 0 ? void 0 : config.apiKey) || null];
                }
            });
        });
    };
    MongoDB.prototype.getApiHash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/, (config === null || config === void 0 ? void 0 : config.apiHash) || null];
                }
            });
        });
    };
    MongoDB.prototype.getBotTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/, (config === null || config === void 0 ? void 0 : config.botTokens) || null];
                }
            });
        });
    };
    MongoDB.prototype.getSingleBotToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/, (config === null || config === void 0 ? void 0 : config.singleBotToken) || null];
                }
            });
        });
    };
    MongoDB.prototype.getPromo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/, (config === null || config === void 0 ? void 0 : config.promo) || null];
                }
            });
        });
    };
    MongoDB.prototype.getAdminIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/, (config === null || config === void 0 ? void 0 : config.adminIds) || null];
                }
            });
        });
    };
    MongoDB.prototype.getAllowGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfig()];
                    case 1:
                        config = _a.sent();
                        return [2 /*return*/, (config === null || config === void 0 ? void 0 : config.allowGroups) || null];
                }
            });
        });
    };
    // Individual setters
    MongoDB.prototype.setStringSession = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateConfig({ stringSession: value })];
            });
        });
    };
    MongoDB.prototype.setApiKey = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateConfig({ apiKey: value })];
            });
        });
    };
    MongoDB.prototype.setApiHash = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateConfig({ apiHash: value })];
            });
        });
    };
    MongoDB.prototype.setBotTokens = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateConfig({ botTokens: value })];
            });
        });
    };
    MongoDB.prototype.setSingleBotToken = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateConfig({ singleBotToken: value })];
            });
        });
    };
    MongoDB.prototype.setPromo = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateConfig({ promo: value })];
            });
        });
    };
    MongoDB.prototype.setAdminIds = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateConfig({ adminIds: value })];
            });
        });
    };
    MongoDB.prototype.setAllowGroups = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateConfig({ allowGroups: value })];
            });
        });
    };
    return MongoDB;
}());
var mongoDB = new MongoDB();
export default mongoDB;
