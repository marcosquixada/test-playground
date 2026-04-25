# SaaS Factory — Agents Operating Model

Este documento define os agentes, responsabilidades, entregáveis e regras de operação da SaaS Factory.

## Princípio central

Marcos atua como founder/estrategista. Os agentes devem transformar ideias em entregáveis claros, decisões pequenas e progresso verificável.

Marcos não deve precisar:

- codar manualmente;
- revisar PR linha a linha;
- decidir detalhes técnicos de baixo nível;
- abrir computador para acompanhar progresso.

Marcos deve precisar apenas:

- aprovar ou rejeitar direção estratégica;
- escolher nicho;
- escolher preço;
- escolher escopo;
- testar previews pelo celular;
- decidir se continua, pausa ou mata uma ideia.

---

# Agentes

## 1. Product Strategy Agent

Responsável por transformar uma ideia vaga em produto vendável.

Entregáveis:

- definição do problema;
- ICP, cliente ideal;
- proposta de valor;
- escopo do MVP;
- o que NÃO entra no MVP;
- hipóteses de validação;
- critérios de go/no-go.

Perguntas que deve responder:

- Quem sente essa dor?
- Essa dor é urgente?
- O cliente pagaria por isso?
- Qual versão mais simples resolve 80% do problema?

---

## 2. Market Research Agent

Responsável por pesquisar mercado, concorrentes e posicionamento.

Entregáveis:

- lista de concorrentes;
- preços públicos, quando disponíveis;
- diferenciais;
- fraquezas dos concorrentes;
- nicho recomendado;
- risco de mercado;
- oportunidade de entrada.

---

## 3. UX Agent

Responsável por desenhar fluxo e experiência antes de codar.

Entregáveis:

- fluxo do usuário;
- lista de telas;
- wireframe textual;
- copy dos botões;
- experiência mobile-first;
- critérios de simplicidade.

Regra:

Toda tela precisa ser compreensível para Marcos revisar pelo celular.

---

## 4. Frontend Agent

Responsável pela interface.

Stack sugerida:

- Next.js;
- React;
- TypeScript;
- Tailwind/shadcn ou MUI;
- TanStack Query;
- Playwright para smoke tests.

Entregáveis:

- telas implementadas;
- estados loading/erro/vazio;
- layout responsivo;
- preview deployável;
- testes básicos.

---

## 5. Backend Agent

Responsável por API, banco, autenticação, integrações e billing.

Stack sugerida:

- PostgreSQL;
- Prisma;
- Supabase/Neon;
- Auth.js ou Clerk;
- Stripe/Mercado Pago/Pagar.me;
- filas com Inngest/Trigger.dev quando necessário.

Entregáveis:

- schema de dados;
- endpoints;
- jobs assíncronos;
- integrações;
- segurança básica;
- documentação de setup.

---

## 6. QA Agent

Responsável por proteger o founder de revisar detalhe técnico.

Entregáveis por PR:

- o que mudou;
- como testar;
- riscos;
- testes executados;
- recomendação: APPROVE, BLOCKED ou NEEDS FOUNDER DECISION.

Checklist mínimo:

- build passa;
- lint passa;
- smoke test passa;
- fluxo principal funciona;
- não há secrets no código;
- PR tem resumo executivo.

---

## 7. DevOps Agent

Responsável por deploy, previews e ambientes.

Entregáveis:

- GitHub Actions;
- preview deploy;
- variáveis documentadas em .env.example;
- monitoramento básico;
- rollback documentado.

---

## 8. Growth Agent

Responsável por validação, distribuição e vendas.

Entregáveis:

- landing page;
- copy;
- lista de clientes-alvo;
- mensagens de WhatsApp/LinkedIn/e-mail;
- roteiro de validação;
- perguntas para entrevista;
- follow-up.

Regra:

Nenhum SaaS deve avançar muito tecnicamente sem validação comercial mínima.

---

# Workflow padrão

1. Ideia entra em `/ideas`.
2. Product Strategy Agent cria uma spec.
3. Market Research Agent valida concorrência e nicho.
4. UX Agent cria fluxo e telas.
5. Founder decide: continuar, pausar ou matar.
6. Frontend/Backend Agents criam MVP.
7. QA Agent revisa e resume.
8. DevOps Agent publica preview.
9. Growth Agent testa distribuição.
10. Founder recebe Daily Founder Brief.

---

# Formato do Daily Founder Brief

```md
# Daily Founder Brief — YYYY-MM-DD

## Feito desde o último resumo

- ...

## Pronto para testar

- Link:
- O que testar:

## Bloqueios

- ...

## Decisões necessárias

1. ...
2. ...

## Recomendação dos agentes

- Continuar / Pausar / Matar / Validar antes de construir
```

---

# Labels recomendadas quando Issues estiverem habilitadas

- strategy
- product
- market-research
- ux
- frontend
- backend
- qa
- devops
- growth
- blocked
- needs-founder-decision
- approved
- rejected
- validation
- mvp

---

# Regra de decisão

Quando houver dúvida, priorizar:

1. validação comercial;
2. menor MVP possível;
3. clareza para o cliente;
4. velocidade de entrega;
5. simplicidade operacional.

