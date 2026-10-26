# GYM STORE — revisão de 23/10/2026

## Acesso único integrado
Uma única conta: dono.gym, nome Administrador GYM STORE, com controle completo. Senha inicial no arquivo privado ACESSOS-GYM-STORE.txt, entregue separadamente. Primeiro acesso em /#admin exige nova senha pessoal (12 a 128 caracteres). Atualizar uma instalação anterior remove os outros acessos administrativos, suas sessões e tokens de recuperação. Senha pessoal da conta principal é preservada.

A autorização é conferida no servidor, inclusive quando uma requisição é feita diretamente à API. Sessões da equipe expiram em 8 horas, com limite de 30 minutos de inatividade. Trocar a senha revoga as sessões anteriores. Cookies HttpOnly e SameSite; Secure na Vercel/HTTPS. Senhas com salt e scrypt. Limites de tentativas de login. Cadastro público sempre cria apenas cliente.

## Verificações concluídas
27 testes automatizados passaram: provisionamento de conta única, remoção de acessos anteriores e revogação de sessões, cadastro/login, isolamento de clientes e permissões, troca obrigatória e revogação da sessão, estoque e preços calculados pelo servidor, cupons, alterações do painel refletidas no catálogo, imagens inseguras, proteção contra origem externa, mensagem e URL do WhatsApp. Verificação sintática passou.

No navegador da prévia integrada: tela de login carregou; pesquisa por Caramelo retornou um produto; seleção do tamanho 40, inclusão na sacola e aumento para duas unidades funcionaram; total R$ 519,80; GYM10 reduziu para R$ 467,82. O envio externo ao WhatsApp não foi realizado. O fluxo administrativo autenticado foi verificado pela API com banco SQLite de teste; as senhas entregues não foram alteradas pelos testes.

Corrigidos: regra CSP que bloqueava imagens temporárias usadas no upload; leitura de JSON já processado pela função Vercel; separação de permissões e de dados dos clientes por função.

## Pendências antes de vender
- Informar WhatsApp real com país e DDD na aba Loja usando o acesso do dono. Sem ele, o site bloqueia o envio em vez de usar número fictício.
- Configurar DATABASE_URL de PostgreSQL persistente na Vercel. SQLite serve para execução local, não é o banco de produção da Vercel. A conexão e persistência PostgreSQL ainda não foram testadas com uma conta real.
- Trocar produtos, fotos, preços, estoques demonstrativos e informações comerciais/políticas pelos dados reais. Verificar direitos de uso das fotos.
- Configurar o serviço de e-mail para recuperação de senha dos clientes. Não está ativo sem credenciais.
- Testar em um celular real e no endereço HTTPS final, incluindo cadastro, fotos, login da equipe e abertura do WhatsApp.
- Criar rotina de backup do banco. Não há garantia de 100% de funcionamento ou auditoria profissional de segurança.

## Executar e hospedar
Node 24 recomendado. Execute npm ci e npm start; abra http://localhost:4173/#admin. Use .env.example para as variáveis. Na Vercel: projeto com public como saída, funções em api e configuração vercel.json fornecida; definir DATABASE_URL e APP_URL, STORE_MODE=production. Nenhuma publicação ou conexão a pagamento foi realizada. Checkout é pelo WhatsApp, sem gateway. O envio de mensagem não confirma pagamento nem reserva estoque; o atendimento confirma disponibilidade e entrega.

Referências técnicas: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html e https://vercel.com/docs/functions/runtimes/node-js .

## Banco criado — atualização
Projeto Supabase GYM STORE, região São Paulo (sa-east-1), custo informado pela plataforma: US$ 0/mês no momento da criação. Projeto fldhclwhlguyspwkaxbn. Esquema gym_private com RLS, sem privilégios para anon/authenticated; usuário técnico gym_store_app pode somente ler/inserir/atualizar a tabela da loja, sem privilégios de administração. Banco inicializado com seis produtos de exemplo e uma conta de dono.

DATABASE_MANAGED=true seleciona a tabela privada já provisionada e evita DDL pela conta de execução. A conexão usa TLS com verificação. A conexão direta do Node não foi validada: resolução do host bloqueada neste ambiente (EAI_AGAIN). A verificação SQL confirmou a estrutura, os dados iniciais e os privilégios; a auditoria de segurança Supabase retornou zero avisos. Não afirmar integração ponta a ponta concluída.

A senha do banco não está no ZIP nem nos arquivos públicos. Credencial entregue separadamente em CONFIGURACAO-BANCO-GYM-STORE.env; importar DATABASE_URL e DATABASE_MANAGED nas variáveis privadas da hospedagem. Na Vercel, conferir a conexão Transaction pooler do painel Supabase (Connect) e usar o host informado lá, pois a conexão direta gratuita requer IPv6. Nenhum projeto Vercel GYM STORE foi encontrado na conta conectada e nenhuma publicação foi realizada.

## Netlify
Adaptador moderno Request/Response em netlify/functions/store.mjs; configuração netlify.toml; Node 24; JSON administrativo empacotado por importação estática; ambiente Netlify recusa SQLite efêmero. Total: 28 testes aprovados. Publicação e conexão real na Netlify ainda pendentes. Consulte LEIA-PRIMEIRO-NETLIFY.md.
