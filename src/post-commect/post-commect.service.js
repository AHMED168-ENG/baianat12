"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
        while (_) try {
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
exports.__esModule = true;
exports.PostCommectService = void 0;
var common_1 = require("@nestjs/common");
var sequelize_1 = require("@nestjs/sequelize");
var sequelize_2 = require("sequelize");
var post_commect_model_1 = require("./models/post-commect.model");
var PostCommectService = /** @class */ (function () {
    function PostCommectService(postCommectModel) {
        this.postCommectModel = postCommectModel;
    }
    PostCommectService.prototype.create = function (userId, createPostCommectDto) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        createPostCommectDto.userId = userId;
                        return [4 /*yield*/, this.postCommectModel.create(createPostCommectDto)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        throw new common_1.HttpException(error_1, common_1.HttpStatus.BAD_REQUEST);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostCommectService.prototype.findAll = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postCommectModel.findAll({
                                where: {
                                    postId: postId
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        throw new common_1.HttpException(error_2, common_1.HttpStatus.BAD_REQUEST);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostCommectService.prototype.findOne = function (id, userId) {
        if (userId === void 0) { userId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.postCommectModel.findOne({
                                where: {
                                    id: id,
                                    userId: userId ? userId : (_a = {}, _a[sequelize_2.Op.ne] = null, _a)
                                }
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_3 = _b.sent();
                        throw new common_1.HttpException(error_3, common_1.HttpStatus.BAD_REQUEST);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostCommectService.prototype.update = function (id, updatePostCommectDto, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var comment, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.findOne(id, userId)];
                    case 1:
                        comment = _a.sent();
                        if (!comment) {
                            throw new common_1.HttpException('this comment not belong to you', common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.postCommectModel.update(updatePostCommectDto, {
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.findOne(id, userId)];
                    case 3:
                        error_4 = _a.sent();
                        throw new common_1.HttpException(error_4, common_1.HttpStatus.BAD_REQUEST);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostCommectService.prototype.remove = function (id, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var comment, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.findOne(id, userId)];
                    case 1:
                        comment = _a.sent();
                        if (!comment) {
                            throw new common_1.HttpException('this comment not belong to you', common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [2 /*return*/, this.postCommectModel.destroy({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        error_5 = _a.sent();
                        throw new common_1.HttpException(error_5, common_1.HttpStatus.BAD_REQUEST);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostCommectService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, sequelize_1.InjectModel)(post_commect_model_1.PostCommectModel))
    ], PostCommectService);
    return PostCommectService;
}());
exports.PostCommectService = PostCommectService;
