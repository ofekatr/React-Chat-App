"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const { PORT } = process.env;
const app = express_1.default();
const port = PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
//# sourceMappingURL=index.js.map