# Use official Node.js runtime as base image
FROM node:alpine

# Set working directory inside container
WORKDIR /

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
ENV PORT=3000
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]