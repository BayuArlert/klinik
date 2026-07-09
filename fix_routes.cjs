const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'resources', 'js');

function findFiles(dir, filter, fileList = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, filter, fileList);
        } else if (filter.test(filePath)) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

const tsxFiles = findFiles(jsDir, /\.tsx$/);

for (const file of tsxFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    const routesToImport = new Set();
    let hasLogout = false;
    let hasLogin = false;
    let hasRegister = false;

    // Handle standard route('xxx.yyy', args)
    content = content.replace(/route\('([^']+)'(?:,\s*([^)]+))?\)/g, (match, routeName, args) => {
        if (routeName === 'logout') {
            hasLogout = true;

            return `logout.url(${args ? args : ''})`;
        }

        if (routeName === 'login') {
            hasLogin = true;

            return `login.url(${args ? args : ''})`;
        }

        if (routeName === 'register' || routeName === 'register.store') {
            hasRegister = true;

            if (routeName === 'register.store') {
                return `registerStore.url(${args ? args : ''})`;
            }

            return `register.url(${args ? args : ''})`;
        }
        
        const parts = routeName.split('.');
        const topLevel = parts[0]; 
        routesToImport.add(topLevel);
        
        let wayfinderCall = topLevel;

        for (let i = 1; i < parts.length; i++) {
            wayfinderCall += '.' + parts[i];
        }

        wayfinderCall += '.url(' + (args ? args : '') + ')';

        return wayfinderCall;
    });

    // Replace route().current(...) in AppLayout
    content = content.replace(/route\(\)\.current\(([^)]+)\)/g, '(window.location.pathname.startsWith($1.replace(/\\*$/, "")))');

    if (content !== original) {
        // Find existing imports to insert below them
        const imports = [];

        if (hasLogout) {
imports.push(`import { logout } from '@/routes';`);
}

        if (hasLogin) {
imports.push(`import { login } from '@/routes';`);
}

        if (hasRegister) {
            if (original.includes("route('register.store')")) {
                imports.push(`import { store as registerStore } from '@/routes/register';`);
            }

            if (original.includes("route('register')")) {
                imports.push(`import { register } from '@/routes';`);
            }
        }
        
        for (const top of routesToImport) {
            imports.push(`import ${top} from '@/routes/${top}';`);
        }
        
        if (imports.length > 0) {
            // Very simple insertion: just put them after the last import line, or at the top
            const lines = content.split('\n');
            let lastImportIdx = -1;

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim().startsWith('import ')) {
                    lastImportIdx = i;
                }
            }

            if (lastImportIdx >= 0) {
                lines.splice(lastImportIdx + 1, 0, ...imports);
                content = lines.join('\n');
            } else {
                content = imports.join('\n') + '\n' + content;
            }
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
