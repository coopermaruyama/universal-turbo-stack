"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostSchema = exports.Post = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
var v4_1 = require("zod/v4");
exports.Post = (0, pg_core_1.pgTable)("post", function (t) { return ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    title: t.varchar({ length: 256 }).notNull(),
    content: t.text().notNull(),
    createdAt: t.timestamp().defaultNow().notNull(),
    updatedAt: t
        .timestamp({ mode: "date", withTimezone: true })
        .$onUpdateFn(function () { return (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["now()"], ["now()"]))); }),
}); });
exports.CreatePostSchema = (0, drizzle_zod_1.createInsertSchema)(exports.Post, {
    title: v4_1.z.string().max(256),
    content: v4_1.z.string().max(256),
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
__exportStar(require("./auth-schema"), exports);
var templateObject_1;
