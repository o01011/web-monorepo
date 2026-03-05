FROM node:22-alpine AS installer

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY package*.json prisma.config.ts ./
COPY prisma ./prisma

RUN npm run db:generate

COPY src ./src
COPY nest-cli.json tsconfig.json ./

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json prisma.config.ts ./

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 8000

CMD [ "sh", "-c", "npm run db:migrate:deploy && npm run start:prod" ]
