const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const cursoRoutes = require('./routes/curso.routes');
const disciplinaRoutes = require('./routes/disciplina.routes');
const cursoDisciplinaRoutes = require('./routes/curso-disciplina.routes');
const pessoaRoutes = require('./routes/pessoa.routes');
const usuarioRoutes = require('./routes/usuario.routes');


app.use('/auth', authRoutes);
app.use('/cursos', cursoRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/curso-disciplinas', cursoDisciplinaRoutes);
app.use('/pessoas', pessoaRoutes);
app.use('/usuarios', usuarioRoutes);

module.exports = app;
