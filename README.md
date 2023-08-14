# Get-Samurais-API <img width="40" height="40" src="https://cdn-icons-png.flaticon.com/512/410/410235.png" />
Projeto _back-end_ para construção de uma aplicação de um sistema para prestação de serviços, conectando clientes e prestadores.

## Requisitos Obrigatórios ⚠️

### Geral:
- **Deploy do projeto back-end e do banco de dados na nuvem**.
- Utilização do banco de dados PostgreSQL.
- Arquiteturar o projeto em _controllers_, _routers_, _middlewares_, _schemas_ e _respository_.
- Validação de dados utilizando a dependência _joi_.
- _Repository Pattern_
- _dump SQL_

### Armazenamento dos Dados:

- Formato geral dos dados:

``` sql
"users" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(64) NOT NULL,
	"email" VARCHAR(128) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

UF AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO','RR', 'SC', 'SP', 'SE', 'TO');

"address" (
	"id" SERIAL PRIMARY KEY,
	"CEP" VARCHAR(8) NOT NULL,
	"city" VARCHAR(255) NOT NULL,
	"UF" UF NOT NULL,
	"address" VARCHAR(255) NOT NULL,
	"complement" VARCHAR(255) DEFAULT ''
);

"serviceProviders" (
	"id" SERIAL PRIMARY KEY,
	"addressId" INTEGER NOT NULL REFERENCES "addresses" ("id"),
	"name" VARCHAR(64) NOT NULL,
	"email" VARCHAR(128) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"cellphoneNumber" VARCHAR(11) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

"userSessions" (
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users" ("id"),
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

"serviceProviderSessions" (
	"id" SERIAL PRIMARY KEY,
	"serviceProviderId" INTEGER NOT NULL REFERENCES "serviceProviders" ("id"),
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

SERVICE_ROLE AS ENUM('tecnologia', 'marketing', 'arquitetura', 'financeiro', 'consultoria', 'saude', 'aulas', 'domestico', 'outros');

"services" (
	"id" SERIAL PRIMARY KEY,
	"serviceProviderId" INTEGER NOT NULL REFERENCES "serviceProviders" ("id"),
	"role" SERVICE_ROLE NOT NULL,
	"title" VARCHAR(128) NOT NULL,
	"description" VARCHAR(2048) NOT NULL,
	"price" FLOAT(3) NOT NULL,
	"available" BIT NOT NULL,
	"imageURL" TEXT NOT NULL,
	"likes" INTEGER NOT NULL DEFAULT 0,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## Entrypoints ⚙️
### 🚩 AuthRouter 🚩
### /signup/user
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **name, email** e **password** pelo _body_ e realiza o cadastro do usuário.<br>
### /signup/service-provider
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **name, email, password, cellhponeNumber, city, UF, address** e **complement** pelo _body_ e realiza o cadastro do prestrador de serviço.<br>
### /signin
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **email** e **password** pelo _body_ e realiza o login do usuário/prestador de serviço.
### /logout
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **token** pelo _header_ e realiza o logout do usuário/prestador de serviço.
<br>
### 🚩 ServiceRouter 🚩
### /services/
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Retorna todos os serviços mais recentes. Limitado por 20 serviços.<br>
### /services/roles/:role
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Retorna todos os serviços por categoria. Limitado por 20 serviços.<br>
### /services/:id
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Retorna um serviço por **ID**.<br>
### 🚩 ServiceProviderRouter 🚩
### /services/me
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Retorna de todos os serviços criados pelo provedor de serviço. Limitado por 10 serviços.
### /api/services
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **title, description, role, price, image** e **available** pelo _body_ e cadastra um serviço.
### /api/services/:id
![](https://place-hold.it/80x20/ec7926/ffffff?text=PUT&fontsize=16) Recebe **title, description, role, price, image** e **available** pelo _body_, ID de um serviço e atualiza um serviço.
### /api/services/:id
![](https://place-hold.it/80x20/ec2626/ffffff?text=DELETE&fontsize=16) Recebe  **title, description, role, price, image** e **available** pelo _body_, ID de um serviço e atualiza um serviço.
### 🚩 UserRouter 🚩
### /profile/service-provider/:id
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Recebe um ID e lista um perfil de provedor de serviços com informações dos serviços prestados.
### /profile/me
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe token e lista o perfil de um usuário/provedor de serviço.
### /search-service
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe **query, order** e **offset** pelo _query_ retorna lista de serviços de acordo com a pesquisa.
## Middlewares 🔛

### schemaValidation & dataSanitization:
- Recebe um _Schema_ por parámetro de função e realiza as verificações dos dados recebidos pelo _body_ e _params_.
- Realiza a sanitização dos dados.
- Rotas que utilizam esses _middlewares_:
  - **AuthRouter**:
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/signup/user**
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/signup/service-provider**
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/signin** 
  - **ServiceProviderRouter**:
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/api/services/:id**
    - ![](https://place-hold.it/80x20/ec2626/ffffff?text=DELETE&fontsize=16) **/api/services/:id**

### authValidation e serviceProviderAuthValidation:
- Recebe um **token** pelo _header_ e verifica se o **token** é válido e se o usuário/prestador de serviço está autentificado no sistema.
- Rotas que utilizam esse _middleware_:
  - **AuthRoute**
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/logout**
  - **UrlRoute**:
    - ![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) **/profile/me**

## Deploy Front-End do Projeto 💻

| Plataforma | Deploy |
| --- | --- |
| <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a> | https://get-samurais-luiz-gustavo-alves.vercel.app/
