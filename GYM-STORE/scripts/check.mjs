import {execFileSync} from 'node:child_process';
for(const f of ['netlify/functions/store.mjs','server.mjs','lib/api.mjs','lib/database.mjs','public/app.js','public/whatsapp.js','scripts/setup-admin.mjs','scripts/make-admin-preview.mjs','scripts/make-mobile-preview.mjs'])execFileSync(process.execPath,['--check',f],{stdio:'inherit'});
console.log('Código verificado. Front-end sem etapa de compilação.');
