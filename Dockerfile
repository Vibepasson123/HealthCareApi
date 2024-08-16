# Use Node.js 20.9.0 as the base image
FROM node:20.9.0

# Set the working directory inside the container
WORKDIR /app

# Install the Nest CLI globally (optional, only if you need it globally)
RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run tests
RUN npm test

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
