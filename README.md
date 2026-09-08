# Ateliê Natália Huebra

Landing page estática, responsiva e pronta para GitHub/Hostinger. Não precisa de Node.js, banco de dados nem instalação.

## Recursos incluídos

- Página institucional de alto padrão, otimizada para celulares.
- Botões de WhatsApp, formulário de solicitação de horário e links sociais.
- Galeria editorial com ampliação de imagens (lightbox) e controle por teclado.
- Carrossel de imagens com setas, indicadores e gesto de deslizar no celular.
- FAQ, SEO básico, favicon e dados estruturados para mecanismos de busca.

## Atualizar ou cadastrar imagens

1. Envie a nova foto para a pasta `assets/` pelo Gerenciador de Arquivos da Hostinger ou pelo Git.
2. Abra `index.html` e procure por `assets/img (1).jpg` (ou outra imagem que queira trocar).
3. Substitua somente o caminho pelo nome do novo arquivo. Para incluir uma foto na galeria ampliável, copie um botão com a classe `gallery-item` e altere `data-full`, `src`, `alt` e a legenda.

O site é intencionalmente estático para ficar rápido e simples de hospedar. Um painel on-line para cadastro sem editar arquivos exigiria um serviço adicional (por exemplo, CMS ou banco de dados).

## Publicar na Hostinger

1. Envie `index.html`, `icon.png` e toda a pasta `assets/` para `public_html`.
2. Mantenha exatamente os mesmos nomes e a estrutura de pastas.
3. Acesse o domínio e teste o WhatsApp e os links sociais.

## Desenvolvimento local

Abra `index.html` diretamente no navegador. Os dados de contato e os links sociais estão centralizados no próprio arquivo para uma edição simples.
