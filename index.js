require('dotenv').config();
const mongoose = require('mongoose');
const {
    geradorNome,
    geradorNomeFeminino,
    geradorNomeMasculino
  } = require("gerador-nome");

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

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomNota = () => parseFloat((Math.random() * 10).toFixed(1));

const main = async () => {
    const matrizCurricular1 = await MatrizCurricular.create({
        curso: {
            id: 1,
            nome: 'Engenharia da Computação',
        },
        disciplinas: [
            { nome: 'Calculo I', codigo: 'MAT101' },
            { nome: 'Física I', codigo: 'FIS101' },
            { nome: 'Introdução à Computação', codigo: 'COMP101' },
            { nome: 'Banco de Dados I', codigo: 'BD101' },
            { nome: 'Programação Orientada a Objetos', codigo: 'POO101' },
            { nome: 'Automatização e Robótica', codigo: 'AR101' }
        ],
    });

    const matrizCurricular2 = await MatrizCurricular.create({
        curso: {
            id: 2,
            nome: 'Ciência da Computação',
        },
        disciplinas: [
            { nome: 'Calculo I', codigo: 'MAT101' },
            { nome: 'Física I', codigo: 'FIS101' },
            { nome: 'Introdução à Computação', codigo: 'COMP101' },
            { nome: 'Banco de Dados I', codigo: 'BD101' },
            { nome: 'Programação Orientada a Objetos', codigo: 'POO101' },
            { nome: 'Estrutura de Dados', codigo: 'ED101' },
            { nome: 'Inteligência Artificial', codigo: 'IA101' }
        ],
    });

    // Criar professores com disciplinas aleatórias
    const professor = await Professor.create({
        nome: geradorNome(),
        departamento: 'Departamento de Ciência da Computação',
        isChefe: true,
        disciplinas: matrizCurricular2.disciplinas.map(disciplina => ({
            nome: disciplina.nome,
            codigo: disciplina.codigo,
            semestre: getRandomInt(1, 2),
            ano: getRandomInt(2020, 2024)
        }))
    });

    
    const gerarHistorico = (disciplinas) => {
        return disciplinas.map(disciplina => {
            const nota = getRandomNota();
            return {
                disciplina: disciplina.nome,
                codigo: disciplina.codigo,
                semestre: getRandomInt(1, 2),
                ano: getRandomInt(2020, 2024),
                nota: nota
            };
        });
    };

    
    for (let i = 0; i < 10; i++) {
        const cursoId = getRandomInt(1, 2);
        const curso = cursoId === 1 ? matrizCurricular1 : matrizCurricular2;
        
        // Criar um histórico de disciplinas para o aluno
        const historico = gerarHistorico(curso.disciplinas);

        // Verifica se o aluno passou (notas >= 6)

        await Aluno.create({
            nome: geradorNome(),
            RA: 'RA' + Math.floor(Math.random() * 100000),
            curso: {
                id: cursoId,
                nome: curso.curso.nome
            },
            historico: historico,
            tcc: {
                id: getRandomInt(1, 10),
                nome: 'Projeto Final - ' + curso.curso.nome,
                orientador: {
                    id: professor._id,
                    nome: professor.nome
                }
            },
            semestre: getRandomInt(1, 8)
        });
    }

    console.log('Dados inseridos com sucesso!');
};

main();
