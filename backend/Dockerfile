FROM node:22

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

EXPOSE 5000

CMD ["sh","-c","npx prisma migrate deploy && npx prisma db seed && npm start"]