FROM node:17



ENV SESSION_SECRET=process.env.SESSION_SECRET
ENV FACEBOOK_APP_ID=process.env.FACEBOOK_APP_ID
ENV FACEBOOK_APP_SECRET=process.env.FACEBOOK_APP_SECRET
ENV FBcallbackURL=process.env.FBcallbackURL

ENV GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
ENV GGcallbackURL=process.env.GGcallbackURL
ENV IMGUR_CLIENT_ID=process.env.IMGUR_CLIENT_ID


WORKDIR /user/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000


CMD  npm run start