"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var postgres_1 = require("@vercel/postgres");
var vercel_postgres_1 = require("drizzle-orm/vercel-postgres");
var schema = require("./schema");
exports.db = (0, vercel_postgres_1.drizzle)({
    client: postgres_1.sql,
    schema: schema,
    casing: "snake_case",
});
