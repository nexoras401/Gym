import {seed} from './seed.mjs';
import {mkdirSync} from 'node:fs';
import initialStaff from './staff-bootstrap.json' with {type:'json'};
export function bootstrap(s){if(s.staffProvisionedVersion===2)return;const initial=initialStaff[0];const existing=s.users.find(u=>u.id===initial.id||u.username===initial.username);const owner=existing?{...existing,role:'owner',active:true}: {...initial,addresses:[]};const removed=new Set(s.users.filter(u=>['owner','manager','admin'].includes(u.role)&&u.id!==owner.id).map(u=>u.id));s.users=s.users.filter(u=>!removed.has(u.id)&&u.id!==owner.id);s.users.push(owner);s.sessions=s.sessions.filter(x=>!removed.has(x.userId));s.resets=s.resets.filter(x=>!removed.has(x.userId));s.staffProvisioned=true;s.staffProvisionedVersion=2;}
let local,pool,ready,queue=Promise.resolve();
const table=()=>process.env.DATABASE_MANAGED==='true'?'gym_private.gym_store_state':'gym_store_state';
async function init(){
 if(process.env.DATABASE_URL){const {Pool}=await import('pg');pool=new Pool({connectionString:process.env.DATABASE_URL,max:3,connectionTimeoutMillis:10000,idleTimeoutMillis:10000});if(process.env.DATABASE_MANAGED!=='true')await pool.query('CREATE TABLE IF NOT EXISTS gym_store_state (id INTEGER PRIMARY KEY, data JSONB NOT NULL)');await pool.query('INSERT INTO '+table()+'(id,data) VALUES(1,$1) ON CONFLICT DO NOTHING',[JSON.stringify(seed())]);}
 else {if(process.env.VERCEL||process.env.NETLIFY)throw Error('DATABASE_URL obrigatória na hospedagem.');const {DatabaseSync}=await import('node:sqlite');mkdirSync('.data',{recursive:true});local=new DatabaseSync(process.env.SQLITE_PATH||'.data/store.sqlite');local.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS state(id INTEGER PRIMARY KEY, data TEXT NOT NULL)');local.prepare('INSERT OR IGNORE INTO state VALUES(1,?)').run(JSON.stringify(seed()));}
}
export async function transaction(fn){ready??=init();await ready;
 const work=async()=>{if(pool){const c=await pool.connect();try{await c.query('BEGIN');const {rows}=await c.query('SELECT data FROM '+table()+' WHERE id=1 FOR UPDATE');const s=rows[0].data;bootstrap(s);const result=await fn(s);await c.query('UPDATE '+table()+' SET data=$1 WHERE id=1',[JSON.stringify(s)]);await c.query('COMMIT');return result;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}}
 local.exec('BEGIN IMMEDIATE');try{const s=JSON.parse(local.prepare('SELECT data FROM state WHERE id=1').get().data);bootstrap(s);const result=await fn(s);local.prepare('UPDATE state SET data=? WHERE id=1').run(JSON.stringify(s));local.exec('COMMIT');return result;}catch(e){local.exec('ROLLBACK');throw e;}};
 const result=queue.then(work,work);queue=result.catch(()=>{});return result;
}
