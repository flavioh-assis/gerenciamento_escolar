# Gerenciamento Escolar

Projeto criado para o Trabalho de Conclusão de Curso de Tecnólogo em Análise e Desenvolvimento de Sistemas da FATEC Ribeirão Preto.<br/>

Foi idealizado com o intuito de auxiliar a gestão de matrículas da escola onde trabalho, a EMEB "Maria Virgínia Matarazzo Ippólito", 
uma escola municipal de 1º ao 5º ano do ensino fundamental situada em Cravinhos-SP.<br/>

Foi baseado no projeto [Proffy](https://github.com/rocketseat-education/nlw-02-omnistack) da [Rocketseat](https://github.com/rocketseat-education).

# Tecnologias

  * TypeScript
  * ReactJS
  * Redux
  * CSS
  * Node.js
  * Postgres
  * Express
  * Knex
  * Axios
  
 OBS.: Alterações foram feitas para que não haja requisições no servidor de banco de dados, servindo apenas para portfólio.
 
# Links úteis
 
 * [Deploy do Projeto](https://gerenciamento-escolar.vercel.app/)
 * [Artigo WorkTec](https://docs.google.com/document/d/1xyH6Z3J6rALaGfIFmGBaaJziCJi1UOFH/edit?usp=sharing&ouid=105664717359710468557&rtpof=true&sd=true)
 * [Apresentação](https://docs.google.com/presentation/d/1V2H3M3n8rAYSfewMI12OvwiFNAZgDegr/edit?usp=sharing&ouid=105664717359710468557&rtpof=true&sd=true)

# Como Executar

 * Pré-requisitos
   * É necessário possuir o Node.js instalado no computador
   * É necessário possuir o Git instalado e configurado no computador
   * Também, é preciso ter um gerenciador de pacotes seja o NPM ou Yarn
   
1. Faça um clone do repositório:
   ```sh
    git clone https://github.com/flavioh-assis/gerenciamento_escolar.git
   ```
2. Executando a Aplicação:
   ```sh
    # API
    $ cd server
    # Instalando as dependências do projeto.
    $ yarn # ou npm install
    # Configurando o banco de dados e criando as tabelas.
    $ yarn knex:migrate # ou npm run knex:migrate

    # Inicie a API
    $ yarn start # ou npm start

    # Aplicação web
    $ cd web
    # Instalando as dependências do projeto.
    $ yarn # ou npm install
    # Inicie a aplicação web
    $ yarn start # ou npm start
    ```
---
<sup>Projeto desenvolvido com a tutoria de [Diego Fernandes](https://github.com/diego3g), da [Rocketseat](rocketseat.com.br).</sup>
 
