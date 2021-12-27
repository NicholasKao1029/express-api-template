FROM node:16 as production

LABEL maintainer="Your Name"

# Create App Directory
RUN mkdir -p /app
WORKDIR /app
COPY . /app
ADD . /app

# Environment Variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install production dependencies.
RUN yarn install --only=production

# Copy local code to the container image.
COPY . .

COPY yarn.lock .
COPY package.json .

# Exports
EXPOSE $PORT
CMD [ "yarn", "start" ]
