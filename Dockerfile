# Gunakan Node.js 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Copy entrypoint script & beri permission
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose port backend
EXPOSE 3002

# Jalankan entrypoint
CMD ["./entrypoint.sh"]
