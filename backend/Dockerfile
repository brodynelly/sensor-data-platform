# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose backend port
EXPOSE 3001

# Command to start backend server
CMD ["npm", "start"]