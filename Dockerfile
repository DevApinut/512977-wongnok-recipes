# Use Node.js base image
FROM node:20.5.1

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install -g nodemon

# Copy the rest of the app source
COPY . .

# Expose React's default port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
