const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace text-[Xpx] with standard tailwind classes
    content = content.replace(/text-\[[7-9]px\]/g, 'text-xs');
    content = content.replace(/text-\[1[0-2]px\]/g, 'text-xs');
    content = content.replace(/text-\[13px\]/g, 'text-sm');
    content = content.replace(/text-\[14px\]/g, 'text-sm');
    content = content.replace(/text-\[15px\]/g, 'text-base');
    content = content.replace(/text-\[1[6-7]px\]/g, 'text-base');
    content = content.replace(/text-\[1[8-9]px\]/g, 'text-lg');
    content = content.replace(/text-\[2[0-3]px\]/g, 'text-xl');
    content = content.replace(/text-\[2[4-9]px\]/g, 'text-2xl');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed', filePath);
    }
  }
});
