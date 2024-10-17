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


const matrizCurricularSchema = new mongoose.Schema({
  curso:{
    id: { type: Number, required: true },
    nome: { type: String, required: true },
  },
  disciplinas: [
    {
      nome: { type: String, required: true },
      codigo: { type: String, required: true },
      semestre: { type: Number, required: true }
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

const Professor = mongoose.model('Professor', professorSchema);
const MatrizCurricular = mongoose.model('MatrizCurricular', matrizCurricularSchema);
const Aluno = mongoose.model('Aluno', alunoSchema);


module.exports = {
  Professor,
  MatrizCurricular,
  Aluno,
};
