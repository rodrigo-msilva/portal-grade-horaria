const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const cursoRoutes = require('./routes/curso.routes');
const disciplinaRoutes = require('./routes/disciplina.routes');
const cursoDisciplinaRoutes = require('./routes/curso-disciplina.routes');



app.use('/auth', authRoutes);
app.use('/cursos', cursoRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/curso-disciplinas', cursoDisciplinaRoutes);


module.exports = app;
