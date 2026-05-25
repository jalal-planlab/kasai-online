#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="finance-fe"
CONTAINER_NAME="finance-fe-container"
PORT="${PORT:-7001}"
ENV_FILE=".env"

# Function to print colored messages
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    print_warning "$ENV_FILE not found!"
    if [ -f ".env.example" ]; then
        print_info "Creating .env from .env.example..."
        cp .env.example .env
        print_success "Created .env file. Please edit it with your actual values."
        echo "Press Enter to continue with default values, or Ctrl+C to exit and edit .env first..."
        read
    else
        print_error "Neither .env nor .env.example found!"
        print_info "Please create a .env file with required environment variables."
        exit 1
    fi
fi

# Initialize build args
BUILD_ARGS=""

# Read REACT_APP_BASE_URL from .env
REACT_APP_BASE_URL=""
PORT_FROM_ENV=""

print_info "Reading environment variables from $ENV_FILE..."
while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip comments and empty lines
    if [[ "$key" =~ ^#.* ]] || [[ -z "$key" ]]; then
        continue
    fi

    # Trim spaces
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)

    # Remove surrounding quotes from value if present
    value="${value%\"}"
    value="${value#\"}"
    value="${value%\'}"
    value="${value#\'}"

    # Skip if value is empty
    if [ -z "$value" ]; then
        continue
    fi

    # Only process REACT_APP_BASE_URL and PORT_FROM_ENV
    if [ "$key" = "REACT_APP_BASE_URL" ]; then
        REACT_APP_BASE_URL="$value"
    elif [ "$key" = "PORT_FROM_ENV" ] || [ "$key" = "PORT" ]; then
        PORT_FROM_ENV="$value"
    fi
done < "$ENV_FILE"

# Use PORT from .env if available, otherwise use default
if [ ! -z "$PORT_FROM_ENV" ]; then
    PORT="$PORT_FROM_ENV"
fi

# Build build args
if [ ! -z "$REACT_APP_BASE_URL" ]; then
    BUILD_ARGS+=" --build-arg REACT_APP_BASE_URL=$REACT_APP_BASE_URL"
fi

BUILD_ARGS+=" --build-arg PORT=$PORT"

# Build the Docker image FIRST (while old container is still running)
print_info "Building Docker image '$IMAGE_NAME' with env vars from $ENV_FILE..."
print_info "This may take a few minutes..."
print_info "Old container will continue running during build to minimize downtime..."

if eval docker build -t "$IMAGE_NAME:latest" $BUILD_ARGS .; then
    print_success "Docker image built successfully!"
else
    print_error "Docker build failed!"
    exit 1
fi

# Now stop and remove existing container (only after new image is ready)
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    print_warning "Stopping and removing existing container..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    print_success "Old container stopped and removed"
fi

# Run the new container
print_info "Starting new container '$CONTAINER_NAME' on port $PORT..."
if docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:$PORT \
    -e PORT=$PORT \
    --restart unless-stopped \
    $IMAGE_NAME:latest; then
    print_success "Container started successfully!"
else
    print_error "Failed to start container!"
    exit 1
fi

# Clean up Docker system
print_info "Cleaning up Docker system (dangling images, build cache, etc.)..."

# Remove dangling images
DANGLING_IMAGES=$(docker images -f "dangling=true" -q)
if [ ! -z "$DANGLING_IMAGES" ]; then
    docker rmi $DANGLING_IMAGES 2>/dev/null || true
    print_success "Removed dangling images"
else
    print_info "No dangling images to remove"
fi

# Prune build cache (optional - uncomment if you want to free up more space)
# print_info "Pruning build cache..."
# docker builder prune -f

# Show container status
print_info "Container status:"
docker ps -f name=$CONTAINER_NAME

echo ""
print_success "Deployment completed successfully!"
echo ""
echo -e "${GREEN}📍 Application URL: http://localhost:$PORT${NC}"
echo ""
echo "Useful commands:"
echo "  View logs:    docker logs -f $CONTAINER_NAME"
echo "  Stop:          docker stop $CONTAINER_NAME"
echo "  Restart:       docker restart $CONTAINER_NAME"
echo "  Remove:        docker rm -f $CONTAINER_NAME"
echo "  Shell access:  docker exec -it $CONTAINER_NAME sh"
echo ""
