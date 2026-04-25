const fs = require('fs');
const path = require('path');

const root = process.cwd();
const prospectsPath = path.join(root, 'saas-factory', 'data', 'prospects.csv');
const outputDir = path.join(root, 'saas-factory', 'briefs');

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

function readProspects() {
  if (!fs.existsSync(prospectsPath)) {
    return [];
  }

  const raw = fs.readFileSync(prospectsPath, 'utf8').trim();
  if (!raw) return [];

  const lines = raw.split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    const item = {};
    headers.forEach((header, index) => {
      item[header] = values[index] || '';
    });
    return item;
  });
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function getScore(p) {
  const explicitScore = toNumber(p.fit_score);
  if (explicitScore > 0) return explicitScore;

  return toNumber(p.premium_signal) + toNumber(p.does_reports) + toNumber(p.manual_work_pain) + toNumber(p.ability_to_pay) + toNumber(p.ease_of_contact);
}

function countByStatus(prospects) {
  return prospects.reduce((acc, p) => {
    const status = p.status || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
}

function formatStatusCounts(counts) {
  const entries = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length === 0) return '- Nenhum prospect registrado.';
  return entries.map(([status, count]) => `- ${status}: ${count}`).join('\n');
}

function main() {
  const prospects = readProspects();
  const today = new Date().toISOString().slice(0, 10);
  const counts = countByStatus(prospects);
  const filledProspects = prospects.filter((p) => p.name && p.name.trim());
  const contacted = prospects.filter((p) => ['contacted', 'replied', 'meeting_scheduled', 'pilot_candidate', 'not_fit'].includes(p.status));
  const replied = prospects.filter((p) => ['replied', 'meeting_scheduled', 'pilot_candidate'].includes(p.status));
  const meetings = prospects.filter((p) => ['meeting_scheduled', 'pilot_candidate'].includes(p.status));
  const pilotCandidates = prospects.filter((p) => p.status === 'pilot_candidate');

  const topProspects = filledProspects
    .map((p) => ({ ...p, computed_score: getScore(p) }))
    .sort((a, b) => b.computed_score - a.computed_score)
    .slice(0, 10);

  const nextActions = prospects
    .filter((p) => p.name && p.next_action)
    .slice(0, 10);

  const brief = `# Daily Founder Brief — ${today}\n\n` +
`## Produto\n\nReportForge AI — SaaS para contabilidades premium gerarem relatórios gerenciais a partir de planilhas e exports financeiros.\n\n` +
`## Progresso de validação\n\n` +
`- Prospects preenchidos: ${filledProspects.length}/30\n` +
`- Prospects contatados: ${contacted.length}\n` +
`- Respostas recebidas: ${replied.length}\n` +
`- Conversas marcadas: ${meetings.length}\n` +
`- Candidatos a piloto: ${pilotCandidates.length}\n\n` +
`## Status do funil\n\n${formatStatusCounts(counts)}\n\n` +
`## Top prospects por fit\n\n` +
(topProspects.length ? topProspects.map((p) => `- ${p.name} (${p.city || 'cidade não informada'}) — score ${p.computed_score} — status: ${p.status || 'unknown'}`).join('\n') : '- Ainda não há prospects preenchidos.') +
`\n\n## Próximas ações registradas\n\n` +
(nextActions.length ? nextActions.map((p) => `- ${p.name}: ${p.next_action}`).join('\n') : '- Preencher os primeiros prospects e definir próximas ações.') +
`\n\n## Decisões necessárias do founder\n\n` +
`1. Existem prospects suficientes para iniciar abordagem hoje?\n` +
`2. Manter nicho em contabilidades premium ou estreitar para BPO financeiro/contabilidade consultiva?\n` +
`3. Quando houver 5 conversas, decidir se avança para landing page publicada.\n\n` +
`## Recomendação automática\n\n` +
(filledProspects.length < 10 ? `Priorizar preenchimento de pelo menos 10 prospects antes de construir qualquer MVP técnico.\n` : `Iniciar abordagens assistidas e buscar 5 conversas reais antes de construir MVP técnico.\n`);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, `${today}.md`), brief);
  fs.writeFileSync(path.join(root, 'saas-factory', 'DAILY_FOUNDER_BRIEF.md'), brief);

  console.log(`Generated founder brief for ${today}`);
}

main();
