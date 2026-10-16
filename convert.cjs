const fs = require('fs');
const text = fs.readFileSync('src/data/projects.ts', 'utf8');

// We can just read the projects directly by evaluating the TS (since it's simple object syntax).
// But it's easier to transpile or just regex.
// Wait, the easiest is to just write a simple JSON format.
const imagesMatch = [...text.matchAll(/\/images\/[^\"]+/g)].map(m => m[0]);
let projectsArrayText = text.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/)[1];

// replace projectImages[x] with actual string
projectsArrayText = projectsArrayText.replace(/projectImages\[(\d+)\]/g, (m, p1) => {
  return `"${imagesMatch[p1]}"`;
});

// Since it's a JS object string, we can evaluate it if we polyfill Project type or remove it.
// To evaluate safely:
const jsCode = `(function(){ return ${projectsArrayText}; })()`;
const projectsData = eval(jsCode);

fs.writeFileSync('src/data/projects.json', JSON.stringify(projectsData, null, 2));
console.log("Written to projects.json");
