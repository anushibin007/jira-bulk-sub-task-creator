# BUILD STAGE 1
FROM node:latest AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY . .
RUN npm install --loglevel verbose

# Build our app
RUN npm run build

# --------------- End of stage 1. Stage 2 starts --------------- #

# BUILD STAGE 2
FROM httpd:alpine AS main

# Set the httpd's web folder as the workdir
WORKDIR /usr/local/apache2/htdocs

# Delete unwanted stuff in the main folder
RUN rm -Rf *

# Just copy the build output from STAGE 1 and paste it here. Run it
COPY --from=builder /usr/src/app/build .

# Need not expose any port or anything. This is httpd's image. So it will do everything implicitly.