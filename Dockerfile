FROM node:22 AS installer

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:22 AS builder

WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY package*.json ./

COPY prisma ./prisma

RUN npm run prisma:generate

COPY src ./src
COPY nest-cli.json tsconfig.json tsconfig.build.json ./

RUN npm run build

FROM node:22 AS runner

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 8000

CMD ["sh", "-c", "npm run prisma:migrate:deploy && npm run start:prod"]
