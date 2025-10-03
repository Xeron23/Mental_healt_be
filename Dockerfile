FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json dulu
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua kode termasuk prisma/schema.prisma
COPY . .

# Pastikan prisma CLI sudah terinstall, lalu generate client
RUN npx prisma generate

# Expose port
EXPOSE 3002

# Jalankan aplikasi
CMD ["npm", "start"]
