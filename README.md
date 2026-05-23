# AutoMessages WhatsApp

Sistema de automação de mensagens WhatsApp com campanhas, fluxos automáticos e processamento assíncrono utilizando filas.

---

# Sobre o projeto

Este projeto foi desenvolvido como solução para um desafio técnico com foco em:

* Arquitetura backend
* Processamento assíncrono
* Persistência de execuções
* Filas de envio
* Fluxos automáticos
* Execução independente do navegador

O sistema permite:

* Importação de contatos via CSV
* Criação de campanhas de disparo
* Delays aleatórios entre mensagens
* Criação de fluxos automáticos
* Execução individual por contato
* Worker contínuo utilizando BullMQ + Redis
* Integração com WhatsApp via WPPConnect

---

# Tecnologias utilizadas

## Backend

* Node.js
* Express
* MongoDB
* Mongoose
* BullMQ
* Redis
* WPPConnect
* Multer
* CSV Parser

## Frontend

* React
* Axios
* Vite

---

# Arquitetura do sistema

```txt
Frontend (React)
        ↓
API REST (Express)
        ↓
MongoDB
        ↓
BullMQ Queue
        ↓
Redis
        ↓
Worker
        ↓
WPPConnect
        ↓
WhatsApp
```

---

# Funcionalidades

## 1. Importação de contatos

Upload de arquivo CSV no formato:

```csv
nome,telefone
Rodrigo,31999999999
Barbara,31988888888
```

Os contatos são persistidos no MongoDB.

---

## 2. Campanhas de disparo

O sistema permite:

* Criar campanhas
* Definir delays mínimos e máximos
* Selecionar contatos
* Processar mensagens individualmente

Cada envio é executado via fila assíncrona.

---

## 3. Fluxos automáticos

Fluxos possuem múltiplas etapas.

Exemplo:

```txt
Mensagem 1 → imediatamente
Mensagem 2 → após 5 segundos
Mensagem 3 → após 10 segundos
```

Cada contato possui execução própria e independente.

---

## 4. Worker contínuo

O sistema possui worker dedicado utilizando BullMQ.

Responsabilidades:

* Processar mensagens pendentes
* Executar campanhas
* Executar fluxos automáticos
* Agendar próximas etapas
* Atualizar status de execução

A execução continua funcionando mesmo com o frontend fechado.

---

# Estrutura de banco

## Contacts

```js
{
  name,
  phone
}
```

## Campaigns

```js
{
  name,
  message,
  minDelay,
  maxDelay,
  totalContacts,
  processedContacts,
  status
}
```

## Flows

```js
{
  name
}
```

## FlowSteps

```js
{
  flowId,
  order,
  message,
  delayAfterPrevious
}
```

## FlowExecutions

```js
{
  flowId,
  contactId,
  currentStep,
  status
}
```

---

# Status de execução

## Campanhas

* pending
* running
* finished

## Fluxos

* waiting
* running
* finished
* failed

---

# Como rodar o projeto

# 1. Clonar repositório

```bash
git clone <repo>
```

---

# 2. Backend

## Entrar na pasta

```bash
cd backend
```

## Instalar dependências

```bash
npm install express mongodb mongoose bullmq ioredis @wppconnect-team/wppconnect multer csv-parser 
```

---

# 3. Configurar variáveis de ambiente

Criar arquivo:

```txt
.env
```

Exemplo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/automessages
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

# 4. Rodar Redis

Utilizando Docker:

```bash
docker run -d -p 6379:6379 redis
```

---

# 5. Iniciar backend

```bash
npm run dev
```

---

# 6. Iniciar worker

```bash
npm run worker
```

---

# 7. Frontend

## Entrar na pasta frontend

```bash
cd frontend
```

## Instalar dependências

```bash
npm install axios react-router-dom
```

## Rodar frontend

```bash
npm run dev
```

---

# Integração WhatsApp

O projeto utiliza WPPConnect.

Ao iniciar o servidor:

* Um QRCode será exibido
* Basta autenticar com WhatsApp
* O worker passará a enviar mensagens reais

---

# Processamento assíncrono

Nenhuma mensagem é enviada diretamente nas requisições HTTP.

Fluxo do envio:

```txt
Controller
    ↓
BullMQ Queue
    ↓
Redis
    ↓
Worker
    ↓
WPPConnect
```

Isso garante:

* Persistência
* Escalabilidade
* Independência do navegador
* Continuidade das execuções

---

# Diferenciais implementados

* Delays aleatórios em campanhas
* Worker desacoplado
* Persistência de execuções
* Status de processamento
* Fluxos independentes por contato
* Integração real com WhatsApp
* Arquitetura assíncrona

