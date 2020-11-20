"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldMerge = exports.defaultValue = void 0;
const minimatch_1 = __importDefault(require("minimatch"));
exports.defaultValue = "!master,!main,*";
/**
 * Whether a branch should be deleted
 * @param branch - Name of branch
 * @param rules - List of glob rules
 */
const shouldMerge = (branch, rules) => {
    console.log("Start: Debug should delete");
    const branches = (rules || "").split(",").map((branch) => branch.trim());
    let shouldMerge = branches.every((rule) => {
        console.log(branch, rule, minimatch_1.default(branch, rule));
        return minimatch_1.default(branch, rule);
    });
    console.log("End: Debug should delete, result:", shouldMerge);
    return shouldMerge;
};
exports.shouldMerge = shouldMerge;
//# sourceMappingURL=util.js.map