#!/bin/sh
# entrypoint.sh

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Apply database migrations (opsional)
echo "Applying database migrations..."
npx prisma migrate deploy

# Jalankan aplikasi
echo "Starting app..."

npm start
