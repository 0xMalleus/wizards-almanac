# Less fragile/complex to use full node version with sqlite3
FROM node:16.13.1 as development

WORKDIR usr/src/app

# Install node dependencies - done in a separate step so Docker can cache it.
COPY package.json yarn.lock ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile

# Copy project files into the docker image
COPY . .

# Build the project
RUN yarn build

FROM node:16.13.1 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR usr/src/app

copy --from=development /usr/src/app .

CMD ["yarn", "start:prod"]
