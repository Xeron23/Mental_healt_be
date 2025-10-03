# Gunakan Node.js versi terbaru sesuai requirement package
FROM node:20

# Set working directory di dalam container
WORKDIR /app

# Copy package.json & package-lock.json (atau yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua kode ke image
COPY . .

# Expose port backend sesuai yang dipakai aplikasi
EXPOSE 3002

# Command untuk jalankan aplikasi
CMD ["npm", "start"]
