# specify the node base image with your desired version node:<version>
FROM node:10
ENV NPM_CONFIG_LOGLEVEL info
# replace this with your application's default port


# Create app directory

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

ENV SELENIUM_REMOTE_URL http://127.0.0.1:4444/wd/hub 

CMD [ "sleep", "5" ]
CMD [ "npm", "test" ]

