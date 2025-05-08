FROM node:20-alpine3.21 AS base

WORKDIR /app

# Builder stage

FROM base AS builder

COPY package*.json .
COPY tsconfig.json .

RUN npm run dev
COPY . .
RUN npm run buil

# production stage

FROM base AS production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig.json ./

RUN npm install --omit=dev

EXPOSE 5000

CMD [ "node dist/index.js" ]
# docker build -t ration-system .
# docker run -it -p 8080:8080 ration-system
# docker run -itd -p 8080:8080 ration-system -> run in detach mode
# docker run --env-file .env -it -p 8080:8080 ration-system