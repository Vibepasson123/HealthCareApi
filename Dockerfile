# Use Node.js 20.9.0 as the base image
FROM node:20.9.0

# Set the working directory inside the container
WORKDIR /app

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
# Copy SSL certificates (if needed)
#COPY key.pem cert.pem ./

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
