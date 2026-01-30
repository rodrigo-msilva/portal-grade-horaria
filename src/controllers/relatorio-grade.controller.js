const renderTemplate = require('../templates/grade-horaria.template');
const { generatePDF } = require('../services/pdf.service');

const {
  Curso,
  Pessoa,
  Ano,
  Curriculo,
  Semestre,
  Horario,
  DiaSemana,
  GradeHoraria,
  Disciplina
} = require('../models');

exports.gerarPDF = async (req, res) => {
  const { curso_id, ano_id, curriculo_id } = req.query;

  if (!curso_id || !ano_id || !curriculo_id) {
    return res.status(400).json({
      error: 'curso_id, ano_id e curriculo_id são obrigatórios'
    });
  }

  // ===== BUSCAR DADOS FIXOS =====
  const curso = await Curso.findByPk(curso_id);
  const ano = await Ano.findByPk(ano_id);
  const curriculo = await Curriculo.findByPk(curriculo_id);

  if (!curso || !ano || !curriculo) {
    return res.status(404).json({ error: 'Dados não encontrados' });
  }

  const coordenador = await Pessoa.findByPk(curso.coordenador_id);

  const horarios = await Horario.findAll({ order: [['id', 'ASC']] });
  const dias = await DiaSemana.findAll({ order: [['id', 'ASC']] });
  const semestres = await Semestre.findAll({ order: [['id', 'ASC']] });

  // ===== BUSCAR TODA A GRADE COM RELACIONAMENTOS =====
 const grades = await GradeHoraria.findAll({
  where: { curso_id, ano_id, curriculo_id },
  include: [
    { model: Disciplina, as: 'disciplina' },
    { model: Pessoa, as: 'professor' },
    { model: Horario, as: 'horario' },
    { model: DiaSemana, as: 'diaSemana' },
    { model: Semestre, as: 'semestre' }
  ]
});
  // ===== MONTAR SEMESTRES PARA RENDER =====
  const semestresRender = semestres.map(sem => {
    const registrosSemestre = grades.filter(g => g.semestre_id === sem.id);

    const linhas = horarios.map(h => {
      const celulas = dias.map(d => {
        const slot = registrosSemestre.find(
          g => g.horario_id === h.id && g.dia_semana_id === d.id
        );

        if (!slot || !slot.disciplina || !slot.professor) return '';
        return `${slot.disciplina.nome}\n${slot.professor.nome}`;
      });

      return {
        horario: h.descricao,
        celulas
      };
    });

    return {
      descricao: sem.descricao,
      dias: dias.map(d => d.descricao),
      linhas
    };
  });

  // ===== RENDERIZAR HTML =====
  const html = renderTemplate({
    universidade: 'Universidade Federal de Ciências da Saúde',
    curso: curso.nome,
    curriculo: curriculo.descricao,
    coordenador: coordenador?.nome || '',
    anoLetivo: ano.descricao,
    semestres: semestresRender
  });

  // ===== GERAR PDF =====
  const pdf = await generatePDF(html);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `inline; filename=grade-${curso.nome}.pdf`
  });

  res.end(pdf);
};