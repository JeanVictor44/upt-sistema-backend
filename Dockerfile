# ---------- STAGE 1: build ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# Instala TODAS as dependências (inclui dev)
RUN npm ci

COPY . .

# Build do Nest
RUN npm run build


# ---------- STAGE 2: production ----------
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# Instala SOMENTE dependências de produção
RUN npm ci --omit=dev

# Copia o build gerado
COPY --from=builder /app/dist ./dist

# Copia as migrações do Drizzle
COPY --from=builder /app/drizzle ./drizzle

EXPOSE 3333

CMD ["node", "dist/src/main.js"]