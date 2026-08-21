const fs = require('fs');
const path = require('path');


const MAX_DEPTH = 5; 


const IGNORE = [
  'node_modules', '.git', 'dist', 'build', '.next', '.cache', 
  '.vscode', 'package-lock.json', 'yarn.lock', 'coverage'
];

function drawTree(dirPath, prefix = '', currentDepth = 1) {
  if (currentDepth > MAX_DEPTH) return;

  // قراءة العناوين واستثناء الزحمة
  let items = fs.readdirSync(dirPath).filter(item => !IGNORE.includes(item));

  // ترتيب الفولدرات الأول بعدين الملفات لشكل متناسق
  items.sort((a, b) => {
    const aIsDir = fs.statSync(path.join(dirPath, a)).isDirectory();
    const bIsDir = fs.statSync(path.join(dirPath, b)).isDirectory();
    return bIsDir - aIsDir || a.localeCompare(b);
  });

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const fullPath = path.join(dirPath, item);
    const isDir = fs.statSync(fullPath).isDirectory();

    const connector = isLast ? '└── ' : '├── ';
    const icon = isDir ? '📁 ' : '📄 ';

    console.log(`${prefix}${connector}${icon}${item}`);

    if (isDir) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      drawTree(fullPath, newPrefix, currentDepth + 1);
    }
  });
}

console.log(`📦 ${path.basename(process.cwd())}`);
drawTree('.');