"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormatDate = void 0;
const getFormatDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
exports.getFormatDate = getFormatDate;
