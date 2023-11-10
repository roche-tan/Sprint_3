import { myModule } from "./mymodule";

const directory = process.argv[2];
const extension = process.argv[3];

// callint myModule function instead of calling it in myModules.ts
 myModule(directory, extension, (error, files) => {
  if (error) {
    console.error("Error: ", error);
    return;
  } else {
    files.forEach((file) => {
      console.log(file);
    });
  }
});
