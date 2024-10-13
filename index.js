require('dotenv').config();
const mongoose = require('mongoose');
const {
    geradorNome,
    geradorNomeFeminino,
    geradorNomeMasculino
  } = require("gerador-nome");

  const {
    Departamento,
    Professor,
    ChefeDepartamento,
    Curso,
    Disciplina,
    MatrizCurricular,
    Aluno,
    HistoricoAluno,
    Tcc,
    AlunoTcc
  } = require('./schema.js');
const { populate } = require('dotenv');


mongoose.connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


const main = async () => {
    const departamento = await Departamento.create({
        nome: geradorNome()
    });
    const professor = await Professor.create({
        nome: geradorNomeMasculino(),
        departamento_id: departamento._id
    });
    const chefeDepartamento = await ChefeDepartamento.create({
        departamento_id: departamento._id,
        chefe_id: professor._id
    });
    const curso = await Curso.create({
        nome: geradorNome(),
        departamento_id: departamento._id
    });
    const disciplina = await Disciplina.create({
        codigo: 10,
        nome: geradorNome(),
        professor_id: professor._id,
        departamento_id: departamento._id

    });
    const matrizCurricular = await MatrizCurricular.create({
        semestre: 1,
        curso_id: curso._id,
        disciplina_id: disciplina._id
    });
    const aluno = await Aluno.create({
        nome: geradorNomeMasculino(),
        RA: geradorNome(),
        curso_id: curso._id,
        semestre: 1
    });
    const historicoAluno = await HistoricoAluno.create({
        aluno_id: aluno._id,
        disciplina_id: disciplina._id,
        semestre: 1,
        ano: 2022,
        nota: 10
    });
    const tcc = await Tcc.create({
        nome: geradorNome(),
        orientador_id: professor._id
    });
    const alunoTcc = await AlunoTcc.create({
        aluno_id: aluno._id,
        tcc_id: tcc._id
    });
};

main();

const buscarAlunoPorNome = async (nomeAluno) => {
    try {
        const aluno = await Aluno.findOne({ nome: nomeAluno }) // Busca aluno pelo nome
            .populate('curso_id') // Faz o populate da referência para o curso
            .populate({
                path: 'curso_id',
                populate: {
                    path: 'departamento_id',
                    populate: {
                        path: 'nome'
                    }
                }
            })
            .exec(); // Executa a query

        if (!aluno) {
            console.log('Aluno não encontrado.');
            return;
        }

        console.log('Aluno com relações populadas:', aluno);
    } catch (err) {
        console.error('Erro ao buscar aluno:', err);
    }
};

// Exemplo de chamada da função
const nomeAluno = 'Radamés'; // Substitua pelo nome real do aluno
buscarAlunoPorNome(nomeAluno);
