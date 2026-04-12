const fs = require("fs");
const path = require("path");
const filePath = path.join(
  __dirname,
  "src",
  "components",
  "calculators",
  "CalculatorTemplate.jsx",
);
const source = fs.readFileSync(filePath, "utf8");
const opens = (source.match(/<div(\s|>)/g) || []).length;
const closes = (source.match(/<\/div>/g) || []).length;
console.log("div opens", opens, "div closes", closes);
const lines = source.split("\n");
for (let i = 160; i < lines.length; i++) {
  console.log((i + 1).toString().padStart(4) + ": " + lines[i]);
}
