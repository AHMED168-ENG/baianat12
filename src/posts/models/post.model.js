"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostModel = void 0;
var graphql_1 = require("@nestjs/graphql");
var sequelize_typescript_1 = require("sequelize-typescript");
var post_commect_model_1 = require("../../../../../../../../../src/post-commect/models/post-commect.model");
var post_reaction_model_1 = require("../../../../../../../../../src/post-reaction/models/post-reaction.model");
var user_model_1 = require("../../../../../../../../../src/user/model/user.model");
var PostModel = /** @class */ (function (_super) {
    __extends(PostModel, _super);
    function PostModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { name: 'id' }),
        sequelize_typescript_1.PrimaryKey,
        (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV1),
        sequelize_typescript_1.Column
    ], PostModel.prototype, "id");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }),
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
    ], PostModel.prototype, "post");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { nullable: true }),
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
    ], PostModel.prototype, "image");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }),
        (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING })
    ], PostModel.prototype, "userId");
    __decorate([
        (0, graphql_1.Field)(function () { return user_model_1.User; }),
        (0, sequelize_typescript_1.BelongsTo)(function () { return user_model_1.User; }, 'userId')
    ], PostModel.prototype, "postUser");
    __decorate([
        (0, graphql_1.Field)(function () { return [post_commect_model_1.PostCommectModel]; }),
        (0, sequelize_typescript_1.HasMany)(function () { return post_commect_model_1.PostCommectModel; }, 'postId')
    ], PostModel.prototype, "postComments");
    __decorate([
        (0, graphql_1.Field)(function () { return [post_reaction_model_1.PostReactionModel]; }),
        (0, sequelize_typescript_1.HasMany)(function () { return post_reaction_model_1.PostReactionModel; }, 'postId')
    ], PostModel.prototype, "PostReaction");
    PostModel = __decorate([
        sequelize_typescript_1.Table,
        (0, graphql_1.ObjectType)()
    ], PostModel);
    return PostModel;
}(sequelize_typescript_1.Model));
exports.PostModel = PostModel;
