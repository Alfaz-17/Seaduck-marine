const fs = require('fs');
const path = require('path');

const DIRECTORY = path.join(__dirname, '..', 'src');

const replacements = [
  // Brand name
  { regex: /Aarfa Marine Solutions/g, value: "Sea Duck Marine Service" },
  { regex: /Aarfa Marine/gi, value: "Sea Duck Marine Service" },
  { regex: /AARFA MARINE/g, value: "SEA DUCK MARINE SERVICE" },
  { regex: /Aarfa/gi, value: "Sea Duck" },
  
  // Domains and folders
  { regex: /aarfa-marine/g, value: "seaduck-marine" },
  { regex: /aarfamarine\.com/g, value: "seaduckmarine.com" },
  
  // Contacts
  { regex: /aarfa\.navigation@gmail\.com/g, value: "info@seaduckmarine.com" },
  { regex: /sales@aarfamarine\.com/g, value: "info@seaduckmarine.com" },
  { regex: /info@aarfamarine\.com/g, value: "info@seaduckmarine.com" },
  { regex: /admin@aarfamarine\.com/g, value: "admin@seaduckmarine.com" },
  { regex: /operator@aarfamarine\.com/g, value: "admin@seaduckmarine.com" },
  { regex: /918347471248/g, value: "918048264492" }, // WhatsApp links
  { regex: /\+91\s*83474\s*71248/g, value: "+91 8048264492" },
  { regex: /\+91\s*8048264492/g, value: "+91 8048264492" },
  
  // Proprietor & Establishment
  { regex: /Mr\.\s*Afzal/g, value: "Mr. Umar" },
  { regex: /Afzal/g, value: "Umar" },
  { regex: /since\s*2013/gi, value: "since 2009" },
  { regex: /since\s*2018/gi, value: "since 2009" },
  { regex: /established\s*in\s*2018/gi, value: "established in 2009" },
  { regex: /established\s*in\s*2013/gi, value: "established in 2009" },
  { regex: /career\s*in\s*2014/gi, value: "career in 2009" },
  
  // Logo filenames
  { regex: /aarfa-logo\.png/g, value: "logo.png" }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const rep of replacements) {
    content = content.replace(rep.regex, rep.value);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (stat.isFile() && /\.(js|ts|jsx|tsx|json|css|md)$/i.test(file)) {
      processFile(fullPath);
    }
  }
}

console.log(`Starting branding replacement in ${DIRECTORY}...`);
walkDir(DIRECTORY);
console.log('Branding replacement complete.');
