import {transaction} from '../lib/database.mjs';
import {passwordHash,token} from '../lib/security.mjs';
let raw='';for await(const c of process.stdin)raw+=c;
const {name,email,password}=JSON.parse(raw);
if(!name||!email||typeof password!=='string'||password.length<12)throw Error('Informe nome, e-mail e senha de pelo menos 12 caracteres via JSON em stdin.');
await transaction(s=>{if(s.users.some(u=>['owner','manager','admin'].includes(u.role)))throw Error('A loja já possui seu único administrador. Use o acesso existente.');if(s.users.some(u=>u.email===email.toLowerCase()))throw Error('E-mail já cadastrado; nenhuma conta foi alterada.');s.users.push({id:token().slice(0,16),name,email:email.toLowerCase(),password:passwordHash(password),role:'owner',addresses:[],createdAt:new Date().toISOString()});});console.log('Administrador criado.');process.exit(0);
