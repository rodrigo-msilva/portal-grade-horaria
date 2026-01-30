const fs = require('fs');
const path = require('path');

const logoBase64 = fs.readFileSync(
  path.resolve(__dirname, '../../assets/logo-ufcspa.png'),
  { encoding: 'base64' }
);

module.exports = function renderGradeHTML({
  universidade,
  curso,
  curriculo,
  coordenador,
  anoLetivo,
  semestres
}) {
  return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8" />

<style>
@page {
  size: A4;
  margin: 18mm 15mm;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #000;
  margin: 0;
}

/* ================= HEADER ================= */
.header {
  text-align: center;
  margin-bottom: 12px;
}

.logo {
  width: 65px;
  margin-bottom: 4px;
}

.header h1 {
  font-size: 13px;
  margin: 2px 0;
  font-weight: normal;
  color: #1f3a5f;
}

.header h2 {
  font-size: 11px;
  margin: 0;
  font-weight: normal;
  color: #555;
}

/* ================= INFO ================= */
.info {
  font-size: 10.5px;
  margin-bottom: 12px;
}

.info div {
  margin-bottom: 2px;
}

/* ================= SEMESTRE ================= */
.semester {
  margin-bottom: 14px;
  page-break-inside: avoid;
}

.semester-title {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #1f3a5f;
}

/* ================= TABELA ================= */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
  table-layout: fixed; /* 🔥 impede quebra estrutural */
}

th, td {
  border: 0.5px solid #000;
  padding: 4px 5px;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Cabeçalho da tabela */
th {
  background-color: #f2f4f6;
  font-weight: bold;
}

/* Coluna horário */
td.horario {
  width: 75px;
  font-weight: bold;
  background-color: #f2f4f6;
}

/* Conteúdo da disciplina */
.disciplina {
  white-space: normal; /* 🔥 evita estourar a célula */
  line-height: 1.25;
}

/* ================= FOOTER ================= */
footer {
  font-size: 9px;
  text-align: center;
  margin-top: 16px;
  color: #666;
}
</style>
</head>

<body>

<div class="header">
  <img class="logo" src="data:image/png;base64,${logoBase64}" />
  <h1>${universidade}</h1>
  <h2>Grade Horária</h2>
</div>

<div class="info">
  <div><strong>Curso:</strong> ${curso}</div>
  <div><strong>Currículo:</strong> ${curriculo}</div>
  <div><strong>Ano Letivo:</strong> ${anoLetivo}</div>
  <div><strong>Coordenador:</strong> ${coordenador}</div>
</div>

${semestres.map(semestre => `
  <div class="semester">
    <div class="semester-title">${semestre.descricao}</div>

    <table>
      <thead>
        <tr>
          <th>Horário</th>
          ${semestre.dias.map(d => `<th>${d}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${semestre.linhas.map(linha => `
          <tr>
            <td class="horario">${linha.horario}</td>
            ${linha.celulas.map(c => `
              <td class="disciplina">${c || ''}</td>
            `).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`).join('')}

<footer>
  Documento gerado pelo sistema acadêmico
</footer>

</body>
</html>
`;
};