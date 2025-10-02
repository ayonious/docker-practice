# docker-practice

## Express Service

A simple REST API built with Express.js and containerized with Docker.

### Running with Docker Compose

1. Navigate to the service directory:
   ```bash
   cd express-service
   ```

2. Start the service:
   ```bash
   docker-compose up
   ```

   To run in detached mode:
   ```bash
   docker-compose up -d
   ```

3. The service will be available at `http://localhost:3000`

4. Check service health:
   ```bash
   curl http://localhost:3000/health
   ```

5. Stop the service:
   ```bash
   docker-compose down
   ```

### Environment Variables

- `NODE_ENV`: Set to `production` by default
- `PORT`: Service port (default: 3000)

### Health Check

The service includes a health check endpoint that runs every 30 seconds with a 40-second startup grace period.
