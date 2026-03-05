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

# Create a non-root user to run the server
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built assets and serve configuration
COPY --from=build /app/dist ./dist
COPY serve.json ./serve.json

# Transfer ownership to the non-root user
RUN chown -R appuser:appgroup /app

USER appuser

# Cloud Run injects PORT; default to 8080
ENV PORT=8080

# Serve the built app with security headers
CMD ["serve", "-s", "dist", "-l", "8080", "--config", "serve.json"]
