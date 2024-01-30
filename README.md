<h1> 🌍 Best Mind API </h1>

#### Este projeto foi como um desafio técnico para uma vaga de Desenvolvedor FullStack Junior.

#### Neste projeto, tive a oportunidade de aplicar meus conhecimentos e habilidades para desenvolver a aplicação de acordo com os requisitos propostos, utilizando conceitos como SOLID e CleanCode.

<br>
<br>

# ✨ Funcionalidades

### 👤 User

✅ Criação de usuário

✅ Atualização de usuário

✅ Autenticação de usuário

✅ Selecão de usuário por id

### 📦 Product

✅ Criação de um produto

✅ Seleção de todos os produtos

✅ Seleção de um produto especifico

✅ Remocão de um produto criado

<br>
<br>

# ⚙️ Utilizando Localmente

<br>

- Clone o repositório.

- Criar um arquivo `.env` com a informacoes seguindo o padrão do `.env.test`

- Instale as dependências necessárias usando `pnpm install`.

- Execute o arquivo da docker usando `docker compose up`.

  <strong>OBS: E necessário ter a docker instalada no computador.</strong>

- Execute as migrates para criar o banco de dados usando `pnpm prisma migrate dev && pnpm prisma generate`.

- Execute a aplicação usando `pnpm dev`.

<br>

# 📡 Endpoints da API

### Os seguintes endpoints estão disponíveis:

## 👤 User - Endpoints

- #### Criar um novo usuário.

  <p>Método: <strong>POST</strong> <p> 
  <p>rota: <strong>/user</strong> </p>

  ##### OBS: password precisa de no mínimo 6 caracteres

#### <p>Requisição:</p>

```
 {
  name: "user",
  email: "user@example.com",
  password: "userpassord"
 }
```

#### <p>Resposta:</p>

```
HTTP/1.1 201 Created
vary: Origin
access-control-allow-origin: http://localhost:5173
access-control-allow-credentials: true
content-type: application/json; charset=utf-8
content-length: 206
Date: Tue, 30 Jan 2024 17:06:37 GMT
Connection: close

{

}
```

<hr>

- #### Autenticar usuário

  <p>Método: <strong>POST</strong> <p> 
  <p>rota: <strong>/auth</strong> </p>

#### <p>Requisição:</p>

```
 {
  email: "user@example.com",
  password: "userpassord"
 }
```

#### <p>Resposta:</p>

```
HTTP/1.1 201 Created
vary: Origin
access-control-allow-origin: http://localhost:5173
access-control-allow-credentials: true
content-type: application/json; charset=utf-8
set-cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTI0M2RjNC0wODM3LTRiYjAtYjAwMy1lYzU3YmYzOTRhNTUiLCJpYXQiOjE3MDY2MzQ2NzQsImV4cCI6MTcwNjcyMTA3NH0.sjXvDI1UP_-1UlRYOglS08md6ndWwQ56wghwPGEdJvA; Path=/; HttpOnly; Secure; SameSite=None
content-length: 206
Date: Tue, 30 Jan 2024 17:11:14 GMT
Connection: close

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTI0M2RjNC0wODM3LTRiYjAtYjAwMy1lYzU3YmYzOTRhNTUiLCJpYXQiOjE3MDY2MzQ2NzQsImV4cCI6MTcwNjcyMTA3NH0.sjXvDI1UP_-1UlRYOglS08md6ndWwQ56wghwPGEdJvA"
}
```

<hr>

- #### Atualizar usuário.

  <p>Método: <strong>PUT</strong> <p> 
  <p>rota: <strong>/user/:userId</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token via cookie

  ##### OBS: Todos os parâmetros que esta rota pode receber são opcionais

#### <p>Requisição:</p>

```
 {
  name?: "username",
  image?: "userimage.png",
  email?: "user-threads",
  oldPassword:"123456"
  newPassword?:"123456"
 }

```

#### <p>Resposta:</p>

```
HTTP/1.1 204 Created
vary: Origin
access-control-allow-origin: http://localhost:5173
access-control-allow-credentials: true
content-type: application/json; charset=utf-8
content-length: 206
Date: Tue, 30 Jan 2024 17:11:14 GMT
Connection: close

{

}
```

<hr>

- #### Selecionar usuário pelo ID.

  <p>Método: <strong>GET</strong> <p> 
  <p>rota: <strong>/user/:userId</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token via cookie

  #### <p>Resposta:</p>

```
HTTP/1.1 204 Created
vary: Origin
access-control-allow-origin: http://localhost:5173
access-control-allow-credentials: true
content-type: application/json; charset=utf-8
content-length: 206
Date: Tue, 30 Jan 2024 17:11:14 GMT
Connection: close

{
  id:"user_id"
  name: "user",
  email: "user@example.com",
  password: "userpassord"
}
```

<br>

## 📦 Product - Endpoints

- #### Criar um novo produto.

  <p>Método: <strong>POST</strong> <p> 
  <p>rota: <strong>/product</strong> </p>

  ##### OBS: A imagem deve ser um file do tipo jpg/jpeg/png

  ##### OBS: A imagem deve ter um tamanho maximo de 5MB

  ##### OBS: Esta rota requer um Bearer Token via cookie

  #### <p>Exemplo para requisição:</p>

```
 {
	name: "product example",
	price: "10,50",
	description: "lorem lorem lorem lorem lorem lorem",
	image: "1e1a98285b6125b6a307-linux.jpeg",
 }
```

<hr>

- #### Selecionar todos os produtos.

  <p>Método: <strong>GET</strong> <p> 
  <p>rota: <strong>/product</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token via cookie

<hr>

- #### Selecionar um produto.

  <p>Método: <strong>GET</strong> <p> 
  <p>rota: <strong>/product/:produto_id</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token via cookie

<hr>

- #### Deletar um produto.

  <p>Método: <strong>DEL</strong> <p> 
  <p>rota: <strong>/product/:product_id</strong> </p>

  ##### OBS: Só é possível deletar este produto se o usuário for o mesmo que o criou.

  ##### OBS: Esta rota requer um Bearer Token via cookie

<br>

<hr>

# Tecnologias Utilizadas

- [NodeJs](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)
- [Multer](https://www.npmjs.com/package/fastify-multer)
- [Vitest](https://vitest.dev/)
- [Jwt](https://www.npmjs.com/package/@fastify/jwt)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Zod](https://zod.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://docs.docker.com/)

<br>

#### O arquivo client.http é um arquivo utilizado para fazer todas as possíveis chamadas para a API. Para utiliza-lo, basta ter a extensão [RestClient](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

#### Para testar toda aplicacao utilize também o Front-End [Best Mind](https://github.com/EduardoNGomes/front-best-mind)

<hr>

## Contribuidores

| Nome                                                            | Papel                 |
| --------------------------------------------------------------- | --------------------- |
| [Eduardo N Gomes](https://www.linkedin.com/in/eduardo-n-gomes/) | Back-End \| Front-end |
