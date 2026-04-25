# SaaS Factory Automation

## O que foi automatizado

Este repositório agora possui uma automação inicial para acompanhar a validação do ReportForge AI.

## Arquivos principais

- `saas-factory/data/prospects.csv` — lista e status dos primeiros 30 prospects.
- `saas-factory/scripts/generate-founder-brief.js` — gera resumo executivo para o founder.
- `.github/workflows/saas-factory-founder-brief.yml` — roda diariamente e também manualmente pelo GitHub Actions.
- `saas-factory/DAILY_FOUNDER_BRIEF.md` — resumo mais recente.
- `saas-factory/briefs/YYYY-MM-DD.md` — histórico de briefs diários.

## Como usar pelo celular

1. Abrir o repositório no app/site do GitHub.
2. Editar `saas-factory/data/prospects.csv` com prospects reais.
3. Ir em Actions > SaaS Factory Founder Brief > Run workflow, se quiser gerar na hora.
4. Abrir `saas-factory/DAILY_FOUNDER_BRIEF.md` para ver o resumo executivo.

## Campos de scoring

Usar notas de 1 a 5:

- `premium_signal`
- `does_reports`
- `manual_work_pain`
- `ability_to_pay`
- `ease_of_contact`

O script calcula o score somando esses campos quando `fit_score` estiver vazio.

## Status sugeridos

- `new`
- `research`
- `contacted`
- `replied`
- `meeting_scheduled`
- `pilot_candidate`
- `not_fit`
- `no_response`

## O que NÃO está automatizado

A automação não envia mensagens automaticamente para prospects.

Motivo: abordagem comercial deve ser controlada para evitar spam, proteger reputação e manter qualidade da validação.

O sistema automatiza organização, scoring e briefing. A abordagem inicial deve ser assistida e personalizada.
