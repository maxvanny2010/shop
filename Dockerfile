FROM node:18
WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/frontend
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm i

ENV NODE_ENV=production
ENV API_PREFIX=/api
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "run", "start"]