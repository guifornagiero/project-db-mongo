# projeto-db-mongo
Projeto criado para a disciplina de Tópicos Avançados de Banco de Dados - FEI 6 semestre

## Sobre
Este projeto seleciona os dados de um cluster MongoDB Atlas, populado préviamente com os arquivos json na pasta /jsons. O banco de dados atua no modelo de documentos, e o arquivo executável traz os dados das seguintes queries:
- Histórico escolar dos alunos-
- Histórico de disciplinas ministradas pelos professores
- Alunos formados
- Chefes de departamento
- Grupos de TCC e orientador

## Grupo
Gianluca Mariano Sobreiro - 22.122.011-4 <br>
Guilherme Fornagiero de Carvalho - 22.122.016-3 <br>
Paulo Vinícius Bessa de Brito - 22.122.005-6 <br>
Pedro Augusto Bento Rocha - 22.122.028-8

## Estrutura do projeto
Neste projeto, utilizamos JavaScript e Node.js para a utilização das libs necessárias, e ele está estruturado com os seguintes arquivos principais:
- index.js: arquivo onde é executada a seleção das queries necessárias
- schema.js: arquivo onde são criados os schemas da lib Mongoose, para conexão com as entidades do banco
- jsons/: arquivos json que foram utilizados para popular o cluster do banco de dados
- package.json: arquivo de configuração do Node.js

## Schemas:
### Professor:
```
professor = new mongoose.Schema({
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
```

### Matriz Curricular
```
matrizCurricular = new mongoose.Schema({
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
```

### Aluno
```
aluno = new mongoose.Schema({
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
```

## Como rodar o projeto?
1. Clone o projeto com o seguinte comando ```git clone https://github.com/guifornagiero/projeto-db-mongo.git```
2. Entre na pasta do projeto com o comando ```cd projeto-db-mongo```
3. Instale o Node.js no seu computador
4. Altere os dados do arquivo .env para os dados enviados na tarefa do Moodle, para poder conectar no cluster do banco de dados
5. Instale as depêndencias do projeto com o comando ```npm install```
6. Execute o arquivo de seleção com o comando ```npm run dev```
