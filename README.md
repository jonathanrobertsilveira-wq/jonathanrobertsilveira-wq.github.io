# Portfólio de automações

Automações que construí e mantenho em produção para e-commerces e para o funil comercial de uma agência. Os dados de clientes foram removidos; cada estudo de caso explica o problema, a arquitetura e as decisões técnicas.

🌐 Versão web: https://jonathanrobertsilveira-wq.github.io

| # | Automação | Tipo |
|---|---|---|
| 01 | [CRM → Meta Ads: conversões offline + públicos](automacoes/01-crm-para-meta-capi.md) | Webhook · tempo real |
| 02 | [Relatório semanal do Merchant Center](automacoes/02-relatorio-merchant-center.md) | Agendado · multi-cliente |
| 03 | [Sistema de alertas de campanhas](automacoes/03-sistema-de-alertas.md) | Agendado · com estado |
| 04 | [Feed complementar de ofertas](automacoes/04-feed-de-ofertas.md) | Agendado · catálogo |
| 05 | [MCP para e-commerce + captação de leads](automacoes/05-mcp-ecommerce-e-leads.md) | IA · integração |

**Padrões que uso em todos:** workflow de erro global com aviso no Slack, idempotência em banco, modo ensaio antes de publicar, nada de dado pessoal sem hash.
