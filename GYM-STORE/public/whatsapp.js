export function buildWhatsAppMessage(q,customer){
 const brl=n=>(n/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
 const methods={pix:'Pix',card:'Cartão (combinar com a loja)',cash:'Dinheiro (combinar com a loja)'};
 if(!methods[customer.payment])throw Error('Selecione a forma de pagamento.');
 return ['Olá! Quero fazer um pedido na *GYM STORE*.', '',...q.items.map((i,n)=>`${n+1}. *${i.name}*\nNumeração: ${i.size} | Cor: ${i.color||'Consultar'}\nQuantidade: ${i.quantity} | Unitário: ${brl(i.price)}\nSubtotal: ${brl(i.price*i.quantity)}`),'',`Subtotal dos produtos: ${brl(q.subtotal)}`,q.coupon?`Cupom: ${q.coupon} | Desconto: ${brl(q.discount)}`:null,`*Total dos produtos: ${brl(q.total)}*`,'Frete: a combinar com a loja.',`Forma de pagamento: ${methods[customer.payment]}`,'',`Nome: ${customer.name}`,customer.phone?`Contato: ${customer.phone}`:null,customer.address?`Entrega/retirada: ${customer.address}`:null,customer.notes?`Observações: ${customer.notes}`:null,'','Aguardo a confirmação de disponibilidade, frete e pagamento.'].filter(x=>x!==null).join('\n');
}
export function whatsappURL(number,message){const digits=String(number||'').replace(/\D/g,'');if(!/^\d{10,15}$/.test(digits))throw Error('O WhatsApp da loja ainda não foi configurado.');return 'https://wa.me/'+digits+'?text='+encodeURIComponent(message);}
