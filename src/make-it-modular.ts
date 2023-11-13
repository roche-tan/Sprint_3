const myModule = require("./mymodule"); // if doing it with import, will not verify on learnyounode

const directory = process.argv[2]; //takes third argument
const extension = process.argv[3]; //takes fourth argument

// calling myModule function instead of calling it in myModules.ts
myModule(directory, extension, (error: any, files: string[]) => {
  if (error) {
    //if error, prints error
    console.error("Error: ", error);
    return;
  } else {
    // if no error, prints files with extension
    files.forEach((file: string) => {
      console.log(file);
    });
  }
});
