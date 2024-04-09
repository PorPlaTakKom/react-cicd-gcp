# Use the official Node.js runtime as the base image for building
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the base image for serving the built React app
FROM nginx:alpine

# Copy built React app from the build stage to Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration file with the updated port
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the specified port
EXPOSE 8080

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
