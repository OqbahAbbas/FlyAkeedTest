# build environment
FROM node:16-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./

RUN yarn install
COPY . ./
RUN yarn build

# prod environment
FROM node:16-alpine AS runner

WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]