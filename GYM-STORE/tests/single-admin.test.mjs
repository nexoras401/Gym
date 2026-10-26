import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {bootstrap} from '../lib/database.mjs';
const initial=JSON.parse(readFileSync(new URL('../lib/staff-bootstrap.json',import.meta.url)));
test('instalação nova provisiona apenas um dono e não expõe senha em texto',()=>{assert.equal(initial.length,1);assert.equal(initial[0].role,'owner');assert.ok(initial[0].password.startsWith('v2:'));const s={users:[],sessions:[],resets:[]};bootstrap(s);assert.equal(s.users.length,1);assert.equal(s.users[0].mustChangePassword,true);bootstrap(s);assert.equal(s.users.length,1);});
test('atualização revoga contas antigas e preserva senha do dono e clientes',()=>{const owner={...initial[0],password:'senha-ja-alterada',mustChangePassword:false};const s={staffProvisioned:true,users:[owner,{id:'old-manager',role:'manager'},{id:'old-admin',role:'admin'},{id:'customer',role:'customer'}],sessions:[{userId:'old-manager'},{userId:'old-admin'},{userId:owner.id},{userId:'customer'}],resets:[{userId:'old-admin'}]};bootstrap(s);assert.deepEqual(s.users.map(x=>x.id).sort(),['customer',owner.id].sort());assert.equal(s.users.find(x=>x.id===owner.id).password,'senha-ja-alterada');assert.equal(s.users.find(x=>x.id===owner.id).mustChangePassword,false);assert.equal(s.sessions.length,2);assert.equal(s.resets.length,0);});
