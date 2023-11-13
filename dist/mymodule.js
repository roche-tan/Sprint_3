"use strict";
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs")); // to work with files system
const path = __importStar(require("path")); //to work with files and directories path
const myModule = (directory, extension, callback) => {
    try {
        fs.readdir(directory, (error, files) => {
            // reads the content of the directory and proceeds if there are no errors. If errors, jumps to callback
            if (error) {
                return callback(error, []);
            }
            //fileters files according to the extension
            const filteredFiles = files.filter((file) => path.extname(file) === "." + extension);
            //calls callback if there is error
            callback(null, filteredFiles);
        });
    }
    catch (error) {
        //if there is an excepmtion, it calls callback
        callback(error, []);
    }
};
module.exports = myModule;
