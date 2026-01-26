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
  semestres // array
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
@page {
  size: A4;
  margin: 18mm 15mm 22mm 15mm;
}

body {
  font-family: "Times New Roman", serif;
  font-size: 11px;
  line-height: 1.25;
}

.header h1 {
  font-size: 13px;
  margin-bottom: 2px;
}

.header h2 {
  font-size: 11px;
  margin-top: 0;
  margin-bottom: 8px;
}

.info {
  margin-bottom: 10px;
}

.info div {
  margin-bottom: 2px;
}

.semester-title {
  margin-top: 6px;
  margin-bottom: 4px;
  font-size: 11px;
}

th, td {
  padding: 3px 4px;
}

.disciplina {
  line-height: 1.15;
}

.logo {
  width: 70px;
  margin-bottom: 6px;
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

 ${semestres
  .map(
    semestre => `
      <div class="semester">

        <div class="header">
          <h1>${universidade}</h1>
          <h2>Grade Horária</h2>
        </div>

        <div class="info">
          <div><strong>Curso:</strong> ${curso}</div>
          <div><strong>Currículo:</strong> ${curriculo}</div>
          <div><strong>Ano Letivo:</strong> ${anoLetivo}</div>
          <div><strong>Coordenador:</strong> ${coordenador}</div>
        </div>

        <div class="semester-title">
          ${semestre.descricao}
        </div>

        <table>
          <thead>
            <tr>
              <th class="horario">Horário</th>
              ${semestre.dias.map(d => `<th>${d}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${semestre.linhas
              .map(
                linha => `
                  <tr>
                    <td class="horario">${linha.horario}</td>
                    ${linha.celulas
                      .map(
                        c => `
                          <td class="disciplina">
                            ${c || ''}
                          </td>
                        `
                      )
                      .join('')}
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>

      </div>
    `
  )
  .join('')}


  <footer>
    Documento gerado automaticamente pelo sistema acadêmico
  </footer>

</body>
</html>
`;
};
