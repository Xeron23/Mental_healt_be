#!/bin/sh

# Generate Prisma client
echo "Generating Prisma client..."
./node_modules/.bin/prisma generate
    
# Apply database migrations
echo "Applying database migrations..."
./node_modules/.bin/prisma migrate deploy

# Start app
echo "Starting app..."
npm start
