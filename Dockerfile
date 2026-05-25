# Stage 1: Build the React TypeScript application
FROM node:24-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json ./

# Install dependencies with clean install
RUN npm ci --only=production=false && \
    npm cache clean --force

# Copy the rest of the application code
COPY . .

# Accept build arguments for environment variables
ARG REACT_APP_BASE_URL
ARG PORT=7001

# Set environment variables from build args
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV PORT=$PORT
ENV NODE_ENV=production

# Build the React application (TypeScript will be transpiled to JavaScript)
RUN npm run build && \
    rm -rf node_modules && \
    rm -rf src && \
    rm -rf public && \
    rm -f package-lock.json

# Stage 2: Production - Serve the application using nginx
FROM node:24-slim AS production

# Set the working directory
WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port (overridden at runtime via PORT env)
EXPOSE 7001

# Start the application using 'serve' with CORS enabled
CMD ["sh", "-c", "serve -s dist -p ${PORT:-7001} --cors"]
