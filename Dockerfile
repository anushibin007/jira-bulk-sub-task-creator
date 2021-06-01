FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install the server to host our application
RUN npm install serve -g

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY . .
RUN npm install --loglevel verbose

# Build our app
RUN npm run build

# The server will run on 80. So expose it
EXPOSE 80

# Serve the build
CMD [ "serve", "-s", "build", "-l", "80" ]