# Use official Node.js LTS image
FROM node

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port (if your app listens on 3000, adjust if different)
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
