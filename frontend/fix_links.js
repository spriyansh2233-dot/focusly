const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}
const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // First, fix the corrupted `<Link="...` to `<Link to="...`
  let newContent = content.replace(/<Link=(["'{])/g, '<Link to=$1');
  
  // Then properly fix any remaining <Link href= to <Link to=
  newContent = newContent.replace(/<Link([^>]*?)\bhref=/g, '<Link$1to=');
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
  }
});
console.log('Fixed Links properly.');
