const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  departamento: {type: String, required: true},
  isChefe: { type: Boolean, required: true },
  disciplinas: [
    {
      nome: { type: String, required: true },
      codigo: { type: String, required: true },
      semestre: { type: Number, required: true },
      ano: { type: Number, required: true }
    }
  ],
  tccs: [
    {
      id: { type: Number, required: true },
      nome: { type: String, required: true },
    }
  ]
});

// const cursoSchema = new mongoose.Schema({
//   nome: { type: String, required: true },
//   departamento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true }
// });

// const disciplinaSchema = new mongoose.Schema({
//   codigo: { type: String, required: true },
//   nome: { type: String, required: true },
//   departamento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true },
//   professor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true }
//});

const matrizCurricularSchema = new mongoose.Schema({
  curso:{
    id: { type: Number, required: true },
    nome: { type: String, required: true },
  },
  disciplinas: [
    {
      nome: { type: String, required: true },
      codigo: { type: String, required: true },
    }
  ]
});

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  RA: { type: String, required: true },
  curso : { 
    id: { type: Number, required: true },
    nome: { type: String, required: true },
   },
  historico: [
    {
      disciplina: {type: String, required: true},
      codigo: { type: String, required: true },
      semestre: { type: Number, required: true },
      ano: { type: Number, required: true },
      nota: { type: Number, required: true }
    }
  ],
  tcc: {
    id: { type: Number, required: true },
    nome: { type: String, required: true } 
  },
  semestre: { type: Number, required: true }
});

// const historicoAlunoSchema = new mongoose.Schema({
//   aluno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
//   disciplina_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
//   semestre: { type: Number, required: true },
//   ano: { type: Number, required: true },
//   nota: { type: Number, required: true }
// });

// const tccSchema = new mongoose.Schema({
//   nome: { type: String, required: true },
//   orientador_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true }
// });

// const alunoTccSchema = new mongoose.Schema({
//   aluno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
//   tcc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tcc', required: true }
// });

//const Departamento = mongoose.model('Departamento', departamentoSchema);
const Professor = mongoose.model('Professor', professorSchema);
//const ChefeDepartamento = mongoose.model('ChefeDepartamento', chefeDepartamentoSchema);
//const Curso = mongoose.model('Curso', cursoSchema);
//const Disciplina = mongoose.model('Disciplina', disciplinaSchema);
const MatrizCurricular = mongoose.model('MatrizCurricular', matrizCurricularSchema);
const Aluno = mongoose.model('Aluno', alunoSchema);
//const HistoricoAluno = mongoose.model('HistoricoAluno', historicoAlunoSchema);
//const Tcc = mongoose.model('Tcc', tccSchema);
//const AlunoTcc = mongoose.model('AlunoTcc', alunoTccSchema);

module.exports = {
  //Departamento,
  Professor,
  //ChefeDepartamento,
  //Curso,
  //Disciplina,
  MatrizCurricular,
  Aluno,
  //HistoricoAluno,
  //Tcc,
  //AlunoTcc
};
