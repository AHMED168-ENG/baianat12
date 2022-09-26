"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostReactionModule = void 0;
var common_1 = require("@nestjs/common");
var post_reaction_service_1 = require("./post-reaction.service");
var post_reaction_resolver_1 = require("./post-reaction.resolver");
var sequelize_1 = require("@nestjs/sequelize");
var post_reaction_model_1 = require("./models/post-reaction.model");
var PostReactionModule = /** @class */ (function () {
    function PostReactionModule() {
    }
    PostReactionModule = __decorate([
        (0, common_1.Module)({
            imports: [sequelize_1.SequelizeModule.forFeature([post_reaction_model_1.PostReactionModel])],
            providers: [post_reaction_resolver_1.PostReactionResolver, post_reaction_service_1.PostReactionService]
        })
    ], PostReactionModule);
    return PostReactionModule;
}());
exports.PostReactionModule = PostReactionModule;
