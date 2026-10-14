# Gap Studio Hair — demonstração Ghati Inovações

Website completo e responsivo desenvolvido como demonstração comercial. Não publicado. A indexação está bloqueada. Pesquisa atualizada em 14/10/2026, horário de São Paulo.

## Executar

```powershell
cd 'C:\Users\usuário\Documents\Lands\gap-studio-hair'
npm install
npm run dev
```

Preview de desenvolvimento: http://127.0.0.1:5197. Para gerar a versão estática: `npm run build`. O resultado está em `dist/`. Para inspecionar o build: `npm run preview`. Se o servidor de desenvolvimento já estiver aberto, use `npm run preview -- --port 5198`.

## Stack e estrutura

HTML semântico, CSS responsivo, JavaScript ES Modules e Vite 7. Fontes locais via Fontsource: Anton 400 e DM Sans 400/500/600/700. Sem framework de interface, backend, integrações de reserva simuladas ou biblioteca de animação. CSS, IntersectionObserver e Web Animations API cobrem as interações necessárias. Não havia projeto Gap no workspace; foi criado um diretório independente, sem alterações nos outros sites.

- `index.html`: conteúdo estático, SEO, dados estruturados, navegação e diálogo nativo.
- `src/content.js`: catálogo confirmado e slides editoriais.
- `src/booking.js`: montagem da mensagem de triagem para revisão no WhatsApp.
- `src/main.js`: triagem de agendamento, carrossel, reveals e movimento reduzido.
- `src/style.css`: tokens, composição e adaptação por largura.
- `public/images/`: cinco imagens editoriais, foto real do interior enviada pelo cliente, logo oficial, favicon e Open Graph.
- `public/robots.txt`, `public/_headers`, `public/llms.txt`: bloqueio de indexação e contexto factual.
- `scripts/`: verificações de conteúdo e roteiro Playwright.
- `evidence/`: screenshots e resultados de validação.

## Direção visual e seções

Referência principal: imagem LUXE fornecida pelo usuário, preservada em `evidence/reference-luxe.png`. A numeração das imagens no texto do pedido estava invertida em relação aos anexos; os arquivos foram identificados pelo conteúdo.

A hero usa fotografia como fundo integral, título pesado à esquerda, assinatura dourada e selo circular. Anton foi escolhida pela massa tipográfica e proporção condensada próximas da referência; DM Sans faz a leitura e a interface sem competir com os títulos. Foram comparadas as características de Anton, Bebas Neue e Oswald com a exigência de títulos pesados; Anton foi validada com conteúdo português nas cinco larguras. Os arquivos utilizados são estáticos, com suporte a acentos e licença SIL OFL; nenhuma configuração de eixo variável é presumida.

Após a hero: três cards fotográficos (cabelos, sobrancelhas e unhas), modal de triagem que reaproveita a área escolhida, coleta nome/procedimento/data/período/observações e prepara uma mensagem para revisão no WhatsApp, galeria editorial de inspirações com quatro estados, curadoria horizontal de cinco fotos, apresentação do salão com foto real do interior, FAQ com cinco respostas, depoimentos públicos com link para a ficha no Google, agendamento/localização e rodapé escuro. Manicure e pedicure aparecem separadamente no formulário e no carrossel. A composição mobile mantém a hero fotográfica, cards em sequência e galeria compacta. O selo gira lentamente; o movimento é desativado com `prefers-reduced-motion`.

| Token | Cor | Uso |
|---|---|---|
| Preto | `#150B09` | Rodapé e assinatura escura |
| Texto | `#241C19` | Títulos, textos, botões |
| Dourado | `#A27A30` | Títulos grandes e detalhes |
| Dourado suave | `#DDC487` | CTAs, setas e selo |
| Creme | `#F7F2EB` | Fundo principal |
| Bege | `#EAE0D5` | Superfícies de apoio |

O dourado dos títulos foi escurecido para legibilidade em fundos claros. As cores são uma harmonização do logo e da referência; não representam extração colorimétrica precisa da marca.

## Informações verificadas e fontes

Fonte principal de endereço, telefone e horários: [ficha do Google Maps](https://www.google.com/maps/place/Gap+Studio+Hair+%7C+Sal%C3%A3o+de+Beleza+em+Praia+Grande/@-24.018104,-46.4593246,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce1fcda7bbdb73:0xc2664183000b33b!8m2!3d-24.018104!4d-46.4593246!16s%2Fg%2F11td3pmpfb). Inspecionada em navegador, com horários expandidos.

- **Nome e cidade:** Gap Studio Hair, salão de beleza em Praia Grande/SP.
- **Endereço no Maps:** Avenida Presidente Kennedy, 5303, Vila Tupi, Praia Grande/SP, CEP 11703-205.
- **Telefone:** (13) 99120-1050.
- **WhatsApp:** [5513991201050](https://wa.me/5513991201050), confirmado no link de agendamento do [Linktree vinculado ao Maps](https://linktr.ee/gapstudiohair). Nenhuma mensagem foi enviada.
- **Horários no Maps:** segunda a sábado, 09h–18h; domingo fechado. A plataforma alerta para possíveis mudanças em feriados.
- **Instagram:** [@gapstudiohair](https://www.instagram.com/gapstudiohair/), confirmado também pelo Linktree. O feed não pôde ser lido nesta sessão.
- **Cabelos:** corte de cabelo e tratamentos capilares mencionados pelo próprio estabelecimento em resposta pública no Maps. O painel inclui somente essas descrições verificadas.
- **Manicure e pedicure:** informadas no briefing e corroboradas por cadastro empresarial e diretório comercial.
- **Sobrancelhas:** área informada pelo contratante da demonstração; não foi encontrado catálogo público confiável de técnicas específicas.
- **Comunicação:** o Linktree e respostas do proprietário usam uma linguagem acolhedora, voltada a beleza, confiança e cuidado. A copy do site é autoral, sem reproduzir avaliações de clientes.

O [GuiaFix](https://guiafix.com.br/praia-grande-sp/salao-de-beleza) cita cortes feminino/masculino, coloração, mechas, loiro personalizado, hidratação e reconstrução. É fonte secundária, sem comprovação de gestão pelo salão; essas especialidades não foram adicionadas ao catálogo como confirmadas.

**Divergência relevante:** [CNPJ.biz](https://cnpj.biz/48358958000185) e [Desassossegada](https://diretorio.desassossegada.com.br/salao/gap-studio-hair-praia-grande-000185/) listam Rua Potiguares, 642, loja 01, e outro telefone cadastral. O site usa os dados atuais da ficha Maps, cruzados com o WhatsApp do Linktree. Recomenda-se a confirmação do estabelecimento antes da publicação.

Não foram tratados descritores genéricos de CNAE como procedimentos realmente oferecidos. A seção de depoimentos reproduz trechos curtos de duas avaliações públicas do Google Maps, com nomes abreviados e link para a ficha; na consulta de 14/10/2026, a ficha mostrava nota 4,9 e 132 avaliações, números sujeitos a mudança. Nenhuma fala foi inventada. Nomes citados em avaliações não foram transformados em perfis de profissionais sem confirmação.

## Fotografias, logo e pendências

`logo-original.png` preserva a imagem fornecida pelo usuário. `logo-gap.png` é um PNG recortado dessa fonte na resolução original, com fundo externo transparente e a composição completa — coroa, emblema, ornamentos e tipografia — sem redesenho. O preto do medalhão foi preservado; o dourado foi harmonizado com o tom de assinatura do site para manter contraste no cabeçalho claro. No rodapé, o mesmo PNG recebe um ajuste de brilho. O favicon usa o emblema em proporção preservada. Não foi obtida uma versão oficial de resolução superior à imagem recebida.

As cinco imagens editoriais foram criadas com a ferramenta integrada **imagegen** e não representam trabalhos de clientes do Gap. A foto do interior foi enviada pelo cliente e teve apenas as bordas com controles do Google Maps removidas por recorte; os detalhes do salão foram preservados. A seção de inspirações é uma galeria editorial, sem comparação de antes/depois. Os links direcionam o visitante ao acervo oficial. Origem e prompts: [MEDIA.md](./MEDIA.md).

Antes da publicação oficial:

1. Substituir as cinco imagens editoriais por material de serviços do Gap autorizado, incluindo cabelos, sobrancelhas, manicure e pedicure.
2. Confirmar catálogo, técnicas de sobrancelhas, procedimentos adicionais de unhas, profissionais e eventuais diferenciais documentados.
3. Confirmar diretamente endereço, horários, canais de atendimento e direitos de uso da marca/mídia.
4. Definir domínio oficial. Só então gerar sitemap e adicionar URLs absolutas a Open Graph, canonical e identidade do schema. Nenhum domínio fictício foi usado. Sitemap foi omitido nesta demonstração sem domínio e sem indexação.
5. Após aprovação, remover `noindex/nofollow/noarchive`, liberar `robots.txt` e revisar o header `X-Robots-Tag` do host. `_headers` é reconhecido apenas por hosts compatíveis; meta robots e robots.txt já estão ativos independentemente dele.

## Testes e revisão

`npm run check` e `npm run build` passaram. `npm install` reportou zero vulnerabilidades no conjunto instalado. JavaScript de produção: aproximadamente 3,9 kB antes de gzip, 1,6 kB após gzip. Hero WebP: aproximadamente 147 kB; fotos secundárias: 56–96 kB cada. Fontes servidas localmente e imagens abaixo da primeira dobra carregadas sob demanda.

O roteiro `scripts/browser-check.js` foi executado com Playwright em Microsoft Edge, nas larguras **375, 390, 768, 1280 e 1440 px**. Resultado preservado em `evidence/browser-check.json`:

- Nenhuma rolagem horizontal acidental, imagem quebrada, fonte ausente ou âncora inválida.
- H1 único nas cinco larguras.
- Cards de serviço preenchem a área da triagem; modal abre, fecha com Escape e restaura o foco.
- Manicure e pedicure presentes no painel de unhas.
- Carrossel: voltar de 01 para 04, avançar de 04 para 01 e atualizar legendas.
- Mensagem de triagem inclui nome, área, procedimento, data, período e observações no link oficial do WhatsApp; o teste intercepta a abertura e não envia mensagens.
- Ativação dos cards com Enter, movimento reduzido e reflow adicional em 320 px.
- Nenhum erro de console ou exceção JavaScript nos fluxos testados.

Screenshots completos capturados e inspecionados, comparando hierarquia, recortes, tipografia e ritmo com a referência. A hero mobile recebeu refinamento de transição da fotografia e o título da galeria foi corrigido para manter a separação entre palavras. Acessibilidade por leitor de tela e testes em dispositivos físicos não foram realizados.

**Lighthouse no build de produção, desktop e mobile:** acessibilidade 100, boas práticas 100, agentic browsing 100, SEO 66. O único item reprovado é o bloqueio de indexação exigido pelo briefing. Relatórios completos em `evidence/lighthouse-desktop.json` e `evidence/lighthouse-mobile.json`. Essa auditoria não inclui nota de performance.

**Trace de performance local**, 1440×950, CPU 1×, sem limitação de rede: LCP observado 210 ms; CLS 0,00. Não há dados CrUX ou INP de usuários reais. Os valores locais não representam desempenho em rede móvel ou produção pública.

Para repetir a suíte com o Playwright CLI disponível:

```powershell
playwright-cli -s=gap open http://127.0.0.1:5197 --browser msedge
playwright-cli -s=gap run-code --filename=scripts/browser-check.js
```

## Screenshots

- [Página completa — desktop](./evidence/final-desktop.png)
- [Página completa — mobile](./evidence/final-mobile.png)

- [Desktop 1440 px](./evidence/desktop-1440.png)
- [Desktop 1280 px](./evidence/desktop-1280.png)
- [Tablet 768 px](./evidence/desktop-768.png)
- [Mobile 390 px](./evidence/mobile-390.png)
- [Mobile 375 px](./evidence/mobile-375.png)
- [Hero desktop](./evidence/hero-desktop.png)
- [Hero mobile](./evidence/hero-mobile.png)

Fora do escopo: publicação, sistema que consulta ou grava na agenda, pagamentos, rastreamento e conexões de conta. O formulário não salva informações no site: ele prepara uma mensagem no WhatsApp oficial para a pessoa revisar e enviar; disponibilidade e confirmação são realizadas pela equipe do salão.
