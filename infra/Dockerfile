FROM node:18 as next
COPY . .
WORKDIR /next
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]