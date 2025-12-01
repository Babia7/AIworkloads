# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Run stage
FROM node:22-alpine
WORKDIR /app

# Install a simple static file server
RUN npm install -g serve

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Cloud Run injects PORT; default to 8080
ENV PORT=8080

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "8080"]
