FROM node:lts-alpine
WORKDIR /app
COPY music-matcher .
RUN npm ci && npm run initdb && npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]