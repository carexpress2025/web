# Etapa 1: Construção da imagem
FROM node:18 AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instala as dependências do projeto usando o Yarn
RUN yarn install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Etapa 2: Rodar os testes (compilar e rodar testes)
FROM node:18 AS test

# Diretório de trabalho dentro do container para a execução dos testes
WORKDIR /app

# Copia o package.json, yarn.lock e outros arquivos necessários para os testes
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app ./

# Instala as dependências de desenvolvimento necessárias para os testes
RUN yarn install --frozen-lockfile

# Roda os testes (supondo que você esteja usando um framework como Jest ou outro)
RUN yarn test

# Etapa 3: Compilação da aplicação Next.js para produção
FROM builder AS build

# Constrói a aplicação Next.js para produção
RUN yarn build

# Etapa 4: Imagem final (produção)
FROM node:18 AS production

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para a produção
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Instala apenas as dependências de produção usando o Yarn
RUN yarn install --production

# Expõe a porta 3000 (porta padrão do Next.js)
EXPOSE 3000

# Comando para rodar o Next.js em modo produção
CMD ["yarn", "start"]
