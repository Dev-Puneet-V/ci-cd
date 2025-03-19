FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Create src directory and move files
RUN mkdir -p src

# Expose port 5000
EXPOSE 5002

# Start development server
CMD ["npm", "run", "dev"] 