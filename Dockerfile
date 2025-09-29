FROM node:18

WORKDIR /app

# Copy file package.json & package-lock.json (atau yarn.lock)
COPY package*.json ./

# Install dependencies (hanya production dependencies)
RUN npm install

# Copy semua kode ke image
COPY . .

# Expose port backend (sesuai yang dipakai backend kamu)
EXPOSE 3000

# Command untuk jalankan aplikasi
CMD ["npm", "start"]
