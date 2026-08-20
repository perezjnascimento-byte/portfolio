const fs = require('fs');
const content = fs.readFileSync('src/data/projectsData.ts', 'utf8');
const matches = [...content.matchAll(/"title":\s*"(.*?)"/g)];
console.log(JSON.stringify(matches.map(m => m[1]), null, 2));
