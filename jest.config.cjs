// module.exports = {
//   preset: "ts-jest",
//   transform: {
//     "^.+\\.jsx?$": "babel-jest",
//   },
//   transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
// };
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
