FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
CMD ["node",".output/server/index.mjs"]


# FROM node:14-alpine
# WORKDIR /app
# COPY --from=builder /app/.output ./.output
## application 실행
# CMD ["node",".output/server/index.mjs"]