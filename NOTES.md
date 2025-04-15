# Integrantes
Felipe Alves, Felipe Marinho, Arthur , Douglas dos Santos e Enzo Freitas

# Introdução
Esse projeto foi criado com a intuição de crirar APIs com cruds de 3 entidades(estudante, cidade e uf)

# Criando o projeto
## 1. Instalando pacotes: 
- `npm install -g @nestjs/cli`
    - Esse comando instala a CLI do NestJS de forma global, tornando o comando `nest` disponível em qualquer pasta do seu sistema.
-`nest new .`
    - Criar o projeto dentro da pasta atual
-Escolha do gerenciador de pacotes
    - Nesse projeto foi utilizado o `npm`
-`npm i sqlite3 typeorm @nestjs/typeorm class-validator class-transformer`
    - instala pacotes necessários para a execução do projeto
    
## 2. Criando APIs com gerador de código:
- `nest g resource estudante`
    - Selecionar a opção Rest API
- `nest g resource cidade`
    - Selecionar a opção Rest API
- `nest g resource uf`
    - Selecionar a opção Rest API
## 3. Rodando o projeto
- `npm run start:dev` 

# Configurando o projeto
## Adotaremos a extensão REST Client do VS Code para consumirmos nossas APIs 
- A extensão REST Cliente é uma alternativa em
relação às ferramentas Insomnia (https://insomnia.rest/download) e Postman (https://www.postman.com/).
    - Com a extensão REST Cliente instalada, crie um arquivo com extensão .http para definição
    das rotas.
## Criando as resquisições da API
- list estudante
GET http://localhost:3000/estudante

- get estudante by id
GET http://localhost:3000/estudante/3

- create estudante
POST http://localhost:3000/estudante
Content-Type: application/json

{
    "name": "lucas doe",
    "email": "Lucas.doe@acme.com",
    "dateOfBirth": "1990-01-01"
}

- update estudante
PATCH  http://localhost:3000/estudante/3
Content-Type: application/json

{
    "email": "sla@acme.com" <-- Parâmetro á ser atualizado
}

- delete estudante
DELETE http://localhost:3000/estudante/3