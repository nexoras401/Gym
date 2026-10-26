# Painel GYM STORE

Há apenas um administrador: dono.gym (nome: Administrador GYM STORE), com controle completo de tênis, fotos, numerações, estoque, clientes e configurações. A senha está no arquivo privado ACESSOS-GYM-STORE.txt, separado do ZIP. Troca obrigatória no primeiro acesso em /#admin no servidor integrado.

Ao atualizar uma instalação anterior, a migração remove os antigos administradores adicionais e revoga suas sessões e tokens de recuperação. A conta principal preserva sua senha pessoal se já tiver sido alterada. Não há senha administrativa no código público. Prévias HTML contêm apenas demonstrações e não permitem entrar na administração real.

Execute npm ci e npm start para uso local. Na Vercel, configure banco PostgreSQL persistente e as variáveis de .env.example. Consulte REVISAO-PARA-PUBLICAR.md antes de publicar.
