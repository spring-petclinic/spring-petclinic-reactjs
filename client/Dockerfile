FROM node:18.12-alpine as builder

WORKDIR app
COPY . /app/
RUN npm install
#RUN npm run build:prod
#
#FROM nginx:stable-alpine
#
#COPY --from=builder /app/public/images /usr/share/nginx/html/images
#COPY --from=builder /app/public/dist /usr/share/nginx/html/dist
#COPY --from=builder /app/public/index.html /usr/share/nginx/html/index.html
#CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start"]
