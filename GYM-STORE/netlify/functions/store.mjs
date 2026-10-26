import {handler} from '../../lib/api.mjs';

// Modern Netlify Request/Response API; keep the existing server-side validation.
export default async function store(request,context={}){
 const url=new URL(request.url);
 const headers=Object.fromEntries(request.headers);
 headers.host=url.host;
 headers['x-forwarded-host']=url.host;
 headers['x-forwarded-proto']=url.protocol.slice(0,-1);
 if(context.ip)headers['x-forwarded-for']=context.ip;
 const req={url:url.pathname+url.search,method:request.method,headers,
  async *[Symbol.asyncIterator](){if(request.body)for await(const chunk of request.body)yield Buffer.from(chunk);}
 };
 const responseHeaders=new Headers();let body='';
 const res={statusCode:200,setHeader(name,value){if(Array.isArray(value)){responseHeaders.delete(name);for(const item of value)responseHeaders.append(name,item);}else responseHeaders.set(name,String(value));},end(value){body=value||'';}};
 await handler(req,res);
 return new Response(request.method==='HEAD'?null:body,{status:res.statusCode,headers:responseHeaders});
}
export const config={path:'/api/*'};
