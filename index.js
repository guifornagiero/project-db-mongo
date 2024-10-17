require('dotenv').config();
const mongoose = require('mongoose');
const alunos = require('./jsons/aluno.json');
const professores = require('./jsons/professor.json');
const matrizCurricular = require('./jsons/matriz_curricular.json');

const {
    Professor,
    MatrizCurricular,
    Aluno
} = require('./schema.js');

mongoose.connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const main = async () => {
    try {
        // Check if the Aluno collection is empty
        const alunoCount = await Aluno.find();
        console.log(alunoCount.length);
        if (alunoCount.length === 0) {
            Object.keys(alunos).forEach(async (key) => {
                const aluno = alunos[key];
                await Aluno.create(aluno);
            });
        }

        // Check if the Professor collection is empty
        const professorCount = await Professor.find();
        if (professorCount.length === 0) {
            Object.keys(professores).forEach(async (key) => {
                const professor = professores[key];
                await Professor.create(professor);
            });
        }

        // Check if the MatrizCurricular collection is empty
        const matrizCurricularCount = await MatrizCurricular.find();
        if (matrizCurricularCount.length === 0) {
            Object.keys(matrizCurricular).forEach(async (key) => {
                const matrizCurriculars = matrizCurricular[key];
                await MatrizCurricular.create(matrizCurriculars);

            });
        }

        console.log('Database initialization complete.');

    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

main();

async function getAlunos() {
    try {
        const alunos = await Aluno.find({});

        let alunosList = [];
        for (let aluno of alunos) {
            for (let disciplina of aluno.historico) {
                const newAluno = {
                    nomeAluno: aluno.nome,
                    nomeDisciplina: disciplina.disciplina,
                    codigo: disciplina.codigo,
                    semestre: disciplina.semestre,
                    ano: disciplina.ano,
                    nota: disciplina.nota
                }

                alunosList.push(newAluno);
            }
        }
        console.log("\nQUERY 1 - HISTÓRICO DE ALUNOS\n");
        console.table(alunosList);
    } catch (error) {
        console.error("Erro ao buscar alunos (query 1): ", error);
        throw error;
    }
}

getAlunos();