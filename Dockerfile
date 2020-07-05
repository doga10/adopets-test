FROM node:14.3.0
LABEL maintainer="Douglas Dennys <douglasdennys@yahoo.com>"
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 5050
RUN npm run build
CMD ["npm", "start"]