const fs = require('fs');
const path = require('path');
const DIRECTORY = path.join(__dirname, '..', 'src');

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (stat.isFile() && /\.(js|ts|jsx|tsx|json|css|md)$/i.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      // Clean up spaced domains and mail URLs
      content = content.replace(/admin@Sea Duckmarine\.com/gi, 'admin@seaduckmarine.com');
      content = content.replace(/info@Sea Duckmarine\.com/gi, 'info@seaduckmarine.com');
      content = content.replace(/sales@Sea Duckmarine\.com/gi, 'info@seaduckmarine.com');
      content = content.replace(/sales@seaduckmarine\.com/gi, 'info@seaduckmarine.com');
      content = content.replace(/admin@seaduckmarine\.com/gi, 'admin@seaduckmarine.com');
      content = content.replace(/info@seaduckmarine\.com/gi, 'info@seaduckmarine.com');
      content = content.replace(/seaduckmarine\.com/gi, 'seaduckmarine.com');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed emails in: ${fullPath}`);
      }
    }
  }
}

console.log('Cleaning up email strings...');
walkDir(DIRECTORY);
console.log('Email clean up complete.');
