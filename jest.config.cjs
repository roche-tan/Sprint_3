module.exports = {
  preset: "ts-jest",  
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
};
