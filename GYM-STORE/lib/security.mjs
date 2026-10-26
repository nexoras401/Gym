import {scryptSync,randomBytes,timingSafeEqual,createHash} from 'node:crypto';
export const token=()=>randomBytes(32).toString('hex');
export const digest=x=>createHash('sha256').update(x).digest('hex');
export function passwordHash(p){const salt=randomBytes(16).toString('hex');return 'v2:'+salt+':'+scryptSync(p,salt,64,{N:32768,r:8,p:3,maxmem:128*1024*1024}).toString('hex');}
export function passwordOK(p,h){try{const parts=h.split(':');const modern=parts[0]==='v2';const [salt,v]=modern?parts.slice(1):parts;const b=Buffer.from(v,'hex');return timingSafeEqual(scryptSync(p,salt,64,modern?{N:32768,r:8,p:3,maxmem:128*1024*1024}:undefined),b);}catch{return false;}}
export const staff=u=>['owner','manager','admin'].includes(u?.role);
export const permissions=u=>u?.role==='owner'?['products','stock','customers','settings']:u?.role==='manager'?['products','stock','customers']:u?.role==='admin'?['products','stock']:[];
export function fail(message,status=400){throw Object.assign(new Error(message),{status});}
export function text(v,max=200){if(typeof v!=='string'||!v.trim()||v.trim().length>max)fail('Preencha os campos corretamente.');return v.trim();}
export function safeImage(v){if(typeof v!=='string'||v.length>1100000||!(/^(\/assets\/[a-zA-Z0-9._-]+|https:\/\/[^\s"<>]+|data:image\/(jpeg|png|webp);base64,[a-zA-Z0-9+/=]+)$/.test(v)))fail('Use imagem PNG, JPG ou WebP, até 800 KB, ou URL HTTPS.');return v;}
export function publicUser(u){if(!u)return null;return {id:u.id,name:u.name,email:u.email,phone:u.phone||'',addresses:u.addresses||[],role:u.role,username:u.username||'',mustChangePassword:!!u.mustChangePassword,createdAt:u.createdAt||null,lastLoginAt:u.lastLoginAt||null};}
