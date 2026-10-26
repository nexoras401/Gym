# GYM STORE — instalação na Netlify

O ZIP contém uma pasta GYM-STORE com o projeto inteiro. Extraia antes de instalar. Não envie o arquivo privado de configuração do banco ou a senha administrativa para um repositório público.

## Publicar o sistema completo

A forma indicada é importar o repositório do projeto na Netlify. Use como raiz a pasta que contém package.json e netlify.toml. Build: npm run build. Publish directory: public. Functions directory: netlify/functions. Node: 24.

Alternativa: executar o Netlify CLI na pasta do projeto: npm ci; depois netlify deploy --build para uma prévia, e netlify deploy --build --prod para produção quando autorizado. Os comandos de deploy são instruções para o proprietário; não foram executados nesta entrega.

O upload por arrastar somente public ou um HTML não instala as funções Node. Login, banco e painel não funcionarão dessa forma. netlify.toml contém a configuração; a função moderna atende /api/* e mantém validação e autorização no servidor.

## Variáveis privadas na Netlify

Antes de testar, configure na interface da Netlify (com escopo Functions e disponibilidade para o deploy desejado):
- DATABASE_URL: conexão PostgreSQL privada já criada. Use Transaction pooler obtida em Supabase > projeto GYM STORE > Connect para compatibilidade IPv4. O arquivo privado entregue anteriormente contém a credencial do usuário gym_store_app e o endereço direto; ao usar o pooler, o usuário é gym_store_app seguido de ponto e o ID do projeto indicado pelo Supabase. Copie o host real mostrado no painel, sem adivinhar.
- DATABASE_MANAGED: true
- STORE_MODE: production
- APP_URL: endereço HTTPS final da loja

Não coloque essas credenciais em netlify.toml ou public. Configuração na hospedagem é necessária; ela não é importada automaticamente do ZIP. Caso o banco exija certificado de autoridade, configure uma cadeia confiável; não desative a verificação TLS.

O banco gratuito GYM STORE já existe e foi inicializado. Sua conexão ponta a ponta ainda não foi validada porque a rede do ambiente de desenvolvimento não resolveu o host. O endereço direto do plano gratuito depende de IPv6; por isso o pooler é necessário em redes IPv4.

## Primeiro acesso

Abra /#admin no domínio final. Login único dono.gym; use a senha privada entregue e troque no primeiro acesso. Configure o número no painel > Loja. Cadastre produtos reais, fotos, tamanhos e estoque. O checkout prepara a mensagem para o WhatsApp, e o cliente confirma o envio; pagamento e disponibilidade são combinados no atendimento.

## Verificação após instalar

Crie uma conta de cliente, saia e entre novamente. Confirme que esse cliente não acessa o painel. No painel, salve um tênis com várias fotos e estoque por tamanho; atualize a página e veja a alteração na loja. Teste sacola, cupom e WhatsApp no celular. Configure e-mail se quiser recuperação de senha por mensagem.

28 testes automatizados passaram, incluindo o adaptador Request/Response da Netlify, cookies Secure/HttpOnly, origem externa rejeitada, cadastro, sessão, logout e bloqueio administrativo. Isso não substitui o teste no domínio real com PostgreSQL. Não houve publicação na Netlify.

Documentação: https://docs.netlify.com/build/functions/get-started/ e https://docs.netlify.com/build/functions/configuration/
