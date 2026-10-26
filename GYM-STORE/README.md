# GYM STORE — pedidos pelo WhatsApp

Para instalar na Netlify, siga LEIA-PRIMEIRO-NETLIFY.md.

Loja com catálogo, filtros, sacola e finalização pelo WhatsApp. Sem gateway e sem cobrança online. Não foi publicada.

## Prévia
Abra PREVIA-GYM-STORE.html. Você pode navegar pelo catálogo, escolher tamanho/quantidade, aplicar GYM10, preencher o pedido e conferir a mensagem. Contas e painel precisam do servidor completo. Produtos, fotos e valores são exemplos.

## Configurar o número da loja
No projeto completo, defina WHATSAPP_NUMBER no arquivo .env, com código do país + DDD + número, apenas dígitos. Também pode alterar no painel, aba Loja. Não há número fictício configurado.

Depois de enviar o número correto, regenere a prévia com o mesmo número para testar o redirecionamento. Sem número, a mensagem aparece para conferência e cópia, mas não abre uma conversa com destinatário desconhecido.

## Funcionamento do pedido
1. Cliente escolhe tênis, numeração e quantidade.
2. Revisa a sacola e aplica cupom, se houver.
3. Informa nome, contato e endereço/retirada (opcionais).
4. Escolhe Pix, cartão ou dinheiro para combinar no atendimento.
5. Confere a mensagem e clica em Abrir WhatsApp com meu pedido.
6. O WhatsApp abre com a mensagem preenchida; o cliente toca em Enviar.

A mensagem contém produto, tamanho, cor, quantidade, preço unitário, subtotal, desconto, total dos produtos, forma de pagamento, dados informados e observações. Frete, disponibilidade e pagamento são confirmados pela loja. Nenhum dado de cartão é solicitado. A sacola não é apagada ao abrir o WhatsApp, pois o site não tem como confirmar o envio. Não exige cadastro/login. Não reserva estoque nem registra automaticamente a confirmação no histórico: o atendimento é feito pelo WhatsApp. Pedidos antigos do banco são apenas testes da versão anterior.

## Executar sistema completo
Instale Node.js 22.16+ (recomendado 24), abra o terminal nesta pasta:

```
npm install
npm run dev
```

Abra http://localhost:4173. Não use apenas Live Server para funções de banco. SQLite é criado localmente em .data/. Na Vercel, DATABASE_URL para PostgreSQL persistente é obrigatória; SQLite é recusado nesse ambiente para evitar perda de dados. Não exponha .env nem .data.

## Administrador
Uma conta exclusiva: dono.gym, nome Administrador GYM STORE. Senha no arquivo privado ACESSOS-GYM-STORE.txt entregue separadamente. Troca obrigatória no primeiro acesso em /#admin. Atualizações removem contas administrativas antigas adicionais e revogam suas sessões. Não é necessário executar scripts para criar contas.

Entre na conta e abra Administração pelo rodapé. Gerencie produtos, fotos (JPG/PNG/WebP até 800 KB cada e até 2,5 MB somadas por produto), categorias, preços, estoque por tamanho, visibilidade, cupons, campanha principal e WhatsApp. As alterações aparecem na loja. Os dois banners de categoria usam imagens fixas em public/assets. A prévia HTML autônoma não compartilha o banco: regenere com node scripts/make-preview.mjs para refletir alterações do código/semente.

## Hospedagem
Projeto preparado para Vercel com vercel.json, public/ e api/index.mjs. Framework Other, build npm run build, diretório estático public, Node 24. Configure DATABASE_URL de PostgreSQL com TLS conforme o provedor e WHATSAPP_NUMBER. Nenhuma publicação foi realizada; aguarda autorização. O banco usa um documento JSON transacional para o catálogo inicial; antes de alto volume, normalize tabelas e valide carga. Não há gateway para configurar.

Cadastro e login opcionais permanecem disponíveis para dados pessoais/endereço, com senhas scrypt, sessões HttpOnly/SameSite, permissões de administrador e tokens de recuperação. O envio de recuperação depende de RESEND_API_KEY, EMAIL_FROM e APP_URL. A finalização por WhatsApp funciona sem esses serviços.

O adaptador opcional de cotação de frete permanece desligado no código; o fluxo de compra utiliza frete a combinar. Não é necessário conectar esse serviço para usar pedidos por WhatsApp.

## Validação e limitações
npm test e npm run build verificam API, contas, permissões, cupons, preços, estoque, mensagens e links do WhatsApp. Nenhuma mensagem é enviada automaticamente por ferramentas: apenas o cliente envia no aplicativo. O layout visual/mobile não pôde ser homologado porque o navegador de prévia do ambiente foi bloqueado. Teste em aparelhos reais antes de publicar.

## Arquivos
public/: interface e módulo whatsapp.js; lib/: API, banco e segurança; api/: função Vercel; scripts/: administrador, prévia e verificação; tests/: testes de integração. Logo recebida do usuário. Fotos de exemplo: Unsplash, IDs photo-1542291026-7eec264c27ff, photo-1600185365926-3a2ce3cdb9eb e photo-1549298916-b41d501d3772. As seis fichas compartilham três fotos ilustrativas; substitua pelo catálogo real. Referência funcional: Minor Company, sem copiar seu design ou fotos. Dados comerciais e políticas precisam ser definidos pela loja antes do lançamento.

## Aparência atual
Interface simplificada com fundo branco e detalhes em preto e dourado da logo. Banner de boas-vindas acima das categorias e do catálogo. No celular: busca visível no cabeçalho, produtos em duas colunas, controles de pelo menos 44 pixels e navegação inferior fixa (Início, Tênis, Conta, Sacola). Botões de pagamento/WhatsApp e painel preservados. Prévia visual ainda precisa ser conferida em dispositivos reais.

Banner de boas-vindas: imagem gerada com a ferramenta integrada, em public/assets/welcome-banner.webp. Texto e botão são HTML para leitura e adaptação ao celular. O prompt de criação está em public/assets/welcome-banner-prompt.txt.

Atualização do catálogo demonstrativo: exemplos Nike e Adidas; fotografia Adidas de Unsplash photo-1518002171953-a080ee817e1f. O banner é uma imagem publicitária ilustrativa gerada, e não uma fotografia de estoque real. Marcas não indicam parceria oficial. Os nomes são descritivos, sem confirmação de referência/SKU. Substitua os exemplos pelos modelos efetivamente vendidos.

## Fundo e banner atuais
Fundo em mármore branco com veios dourados usando a imagem enviada pelo usuário (otimizada em public/assets/marble-background.webp), suavizado por uma camada clara. Cards de produto e formulários mantêm fundos claros para legibilidade. Banner feito em HTML/CSS com fotografia real ilustrativa de tênis (public/assets/white.webp), sem a arte gerada da versão anterior.

Logo atual: versão aprovada pelo usuário em preto, branco e dourado suave, aplicada ao cabeçalho, rodapé e ícone da página. Arquivo otimizado public/assets/logo.webp.

Detalhes do produto: janela com foto em destaque, preço e desconto, seleção de tamanho com confirmação visual, quantidade em controles +/−, total atualizado e descrição/entrega em seções expansíveis. Limites de estoque são verificados antes de adicionar à sacola.

## Painel administrativo atualizado
Veja PAINEL-ADM.md para configuração e uso. A prévia interativa está em PREVIA-PAINEL-ADM.html (dados fictícios, sem conexão a clientes reais). O comando npm run admin cria a conta administrativa com senha oculta. Datas de cadastro e último acesso são guardadas para novos registros; não há preenchimento retroativo de datas desconhecidas. Os tamanhos agora possuem campos individuais de estoque, as fotos têm prévia e capa, e o banner editado no painel é usado pela vitrine. Não há gateway: ajuste o estoque manualmente depois de confirmar vendas pelo WhatsApp.
