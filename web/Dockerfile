
FROM node:latest
WORKDIR /work
COPY package*.json /work/
RUN cd /work
RUN npm install -g npm@9.6.7
COPY ./ /work/
CMD ["node index.js"]
