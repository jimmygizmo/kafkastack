# Kafkapoc -  Kafka Node Client Dockerfile
# TODO: put base image size here

FROM node:19.4.0-slim

RUN apt-get -y update
RUN apt-get -y install net-tools

WORKDIR /app


# For docker-compose execution, 'kafka' must be up and acceptiing connections before 'kafkaclient/node' starts.
# The wait-for-it.sh script will be run by docker-compose and will be passed
# arguments such that once it detects the Kafka port is accepting connections, it will then
# bring up kafkaclient, or it may be set to timeout and start kafkaclient anyhow after 20 seconds or a similar timeout.
COPY ./wait-for-it.sh /app/wait-for-it.sh
RUN chmod o+x /app/wait-for-it.sh


COPY package.json /app
COPY package-lock.json /app

# This node image now needs an npm upgrade. TODO: Check for a newer image now.
RUN npm install -g npm@9.3.1

RUN npm i


# NOTE: Remember to separate stuff for optimal layer caching and the least-frequent cache invalidation.
# That's why this copy of application-specific content is done after the platform build above.

# Copy server application code for Kafka client etc.
# TODO: NOTE: COPY command weirdness. THIS was expected to copy ALL of src but it copies only all the CONTENTS.
#   So to fix this I had to specify the destination /app/src dir (expecting it to be created now)
#   This is not the same behavior as a linux or macos cp command.
COPY ./src/. /app/src/

# Special tests with .env
# ** Dotenv could not find the .env file when it was getting put in /src/ next to the code!
# ** Maybe Dotenv always starts looking in the parent dir?! Maybe only if it is in a /src/ dir?!
# RESULT: IT WORKED! Conclusion: Carefully put the .env exactly in place and in the parent dir of a /src/
# or just generally in the parent dir of the source code calling dotenv loading. (I guess.)
COPY ./.env /app/


# /datavolume for general sharing
RUN mkdir /app/datavolume
# TODO: Fix this. It needs to be something that does not invalidate cache, but is still useful.
RUN date > /app/datavolume/test-file-created-by-kafkaclient-Dockerfile.txt


EXPOSE 44555

# Disabled because now this will be started by Docker Compose via the wait-for-it.sh script.
# TODO: There is at least one other Dockerfile this comment would be good to add to (NGINX) and maybe others:
# See the docker compose files for the full wait-for-it.sh commands and entry-point arguments.
#CMD ["node", "index.js"]

