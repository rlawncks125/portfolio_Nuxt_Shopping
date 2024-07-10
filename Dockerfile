FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .

ENV APISERVER=$APISERVER
ENV reCAPTCHA_SITE_KEY=$reCAPTCHA_SITE_KEY
ENV reCAPTCHA_SECRET_KEY=$reCAPTCHA_SECRET_KEY

RUN npm run build
# CMD ["node",".output/server/index.mjs"]


FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
# application 실행

ENV PORT=$PORT

CMD ["node",".output/server/index.mjs"]

