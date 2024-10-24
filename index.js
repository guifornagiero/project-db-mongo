require("dotenv").config();
const mongoose = require("mongoose");
const alunos = require("./jsons/aluno.json");
const professores = require("./jsons/professor.json");
const matrizCurricular = require("./jsons/matriz_curricular.json");

const { Professor, MatrizCurricular, Aluno } = require("./schema.js");

mongoose
  .connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

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

    console.log("Database initialization complete.");
  } catch (error) {
    console.error("Error initializing database:", error);
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
          nota: disciplina.nota,
        };

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

async function getProfessores() {
  try {
    const professores = await Professor.find({});
    let professoresList = [];
    for (let professor of professores) {
      for (let disciplina of professor.disciplinas) {
        const newProfessor = {
          nomeProfessor: professor.nome,
          departamento: professor.departamento,
          nomeDisciplina: disciplina.nome,
          codigo: disciplina.codigo,
          semestre: disciplina.semestre,
          ano: disciplina.ano,
        };

        professoresList.push(newProfessor);
      }
    }
    console.log("\nQUERY 2 - HISTÓRICO DE DISCIPLINAS PROFESSOR\n");
    console.table(professoresList);
  } catch (error) {
    console.error("Erro ao buscar professores (query 2): ", error);
    throw error;
  }
}

async function getChefes() {
  try {
    const chefes = await Professor.find({
      isChefe: true,
    });

    let list = [];
    for (let chefe of chefes) {
      const newChefe = {
        nome: chefe.nome,
        departamento: chefe.departamento,
      };

      list.push(newChefe);
    }

    console.log("\nQUERY 4 - LISTA DE CHEFES DE DEPARTAMENTOS\n");
    console.table(list);
  } catch (error) {
    console.error("Erro ao buscar chefes (query 4): ", error);
    throw error;
  }
}

async function getTCCS() {
  try {
    const alunos = await Aluno.find({});

    let list = [];


    alunos.forEach((aluno) => {
      if (!list.some((item) => item.nome === aluno.tcc.nome)) {
        list.push({ nome: aluno.tcc.nome });
      }
    });


    for (let tcc of list) {
      const professors = await Professor.find({
        tccs: {
          $elemMatch: {
            nome: tcc.nome,
          },
        },
      });

      const alunoTCC = [];
      alunos.forEach((aluno) => {
        if (aluno.tcc.nome === tcc.nome) {
          alunoTCC.push(aluno.nome);
        }
      });

      tcc.professores = professors[0]?.nome;
      tcc.alunos = alunoTCC;
    }

    console.log("\nQUERY 5 - LISTA DE TCCS\n");
    console.table(list);
  } catch (error) {
    console.error("Erro ao buscar chefes (query 5): ", error);
    throw error;
  }
}

// async function getFormados() {
//   try {
//     const alunos = await Aluno.find({});
//     const matrizCurricular = await MatrizCurricular.find({});
    
//     const formados
    
//   } catch (error) {
//     console.error("Erro ao buscar chefes (query 3): ", error);
//     throw error;
//   }
// }

async function callQueries() {
  await getAlunos();
  await getProfessores();
  await getChefes();
  await getTCCS();
}

callQueries();
