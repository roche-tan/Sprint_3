"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mymodule_1 = require("./mymodule");
const directory = process.argv[2];
const extension = process.argv[3];
// callint myModule function instead of calling it in myModules.ts
(0, mymodule_1.myModule)(directory, extension, (error, files) => {
    if (error) {
        console.error("Error: ", error);
        return;
    }
    else {
        files.forEach((file) => {
            console.log(file);
        });
    }
});
