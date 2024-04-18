FROM node:20.10.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only  --create-ivy-entry-points
COPY . .
ARG BUILD_TYPE=development
RUN if [ "$BUILD_TYPE" = "production" ] ; then npm run build; else npm run buildDev; fi

FROM nginx:stable
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/employee-management-client/browser /usr/share/nginx/html
EXPOSE 80
