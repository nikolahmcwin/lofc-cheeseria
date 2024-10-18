# Build Stage 
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV VITE_API_URL=http://localhost:3000
# Copy all remaining files - but should be more explicit here
COPY . . 
CMD ["npm", "run", "build"]


# Production Stage 
FROM node:20-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist .
EXPOSE 8080
CMD ["http-server", "-p", "8080"]