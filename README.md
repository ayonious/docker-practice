# docker-practice

A multi-service application demonstrating Docker containerization with Node.js (Express) and Spring Boot services.

## Architecture

This project consists of two microservices:

1. **Express Service** (Node.js) - Port 3000
   - REST API for user management
   - Proxies product requests to Spring Boot service
   - Endpoints: `/api/users`, `/api/products`

2. **Spring Boot Service** (Java) - Port 8080
   - REST API for product management
   - Endpoints: `/api/products`, `/api/health`

The Express service calls the Spring Boot service to fetch product data, demonstrating inter-service communication.

## Prerequisites

- Download Docker from docker website and keep it running
- Make sure you have docker-compose installed:
   ```bash
   brew install docker-compose
   ```

## Quick Start with Makefile

The project includes a Makefile with convenient shortcuts:

```bash
make build     # Build all Docker images
make up        # Start all services
make down      # Stop all services
make restart   # Restart all services
make logs      # View logs from all services
make clean     # Remove all containers, images, and volumes
make test      # Run tests for Express service
```

## Manual Docker Compose Commands

### Start both services:
```bash
docker-compose up
```

To run in detached mode:
```bash
docker-compose up -d
```

### Stop the services:
```bash
docker-compose down
```

### View logs:
```bash
docker-compose logs -f
```

## API Endpoints

### Express Service (http://localhost:3000)

**User endpoints:**
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user (body: `{name, email}`)

**Product endpoints (proxied to Spring Boot):**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (body: `{name, price}`)

**Health check:**
- `GET /health`

### Spring Boot Service (http://localhost:8080)

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `GET /api/health` - Health check

## Testing

Test the services with curl:

```bash
# Check Express service health
curl http://localhost:3000/health

# Get users from Express
curl http://localhost:3000/api/users

# Get products (Express proxies to Spring Boot)
curl http://localhost:3000/api/products

# Create a product via Express
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","price":299.99}'
```

## Troubleshooting

If you get a "port already in use" error:
```bash
# For port 3000
lsof -i :3000
kill {processNo}

# For port 8080
lsof -i :8080
kill {processNo}
```

## Environment Variables

**Express Service:**
- `NODE_ENV`: Set to `production` by default
- `PORT`: Service port (default: 3000)
- `SPRINGBOOT_SERVICE_URL`: URL of Spring Boot service (default: http://springboot-service:8080)

**Spring Boot Service:**
- `SPRING_PROFILES_ACTIVE`: Set to `prod` by default
