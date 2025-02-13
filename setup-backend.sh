#!/bin/bash

# Define base directories
BASE_DIR="backend"
SRC_DIR="$BASE_DIR/src"
CONFIG_DIR="$SRC_DIR/config"
ROUTES_DIR="$SRC_DIR/routes"
CONTROLLERS_DIR="$SRC_DIR/controllers"
MODELS_DIR="$SRC_DIR/models"
MIDDLEWARE_DIR="$SRC_DIR/middleware"

# Create the directory structure
mkdir -p $BASE_DIR $SRC_DIR $CONFIG_DIR $ROUTES_DIR $CONTROLLERS_DIR $MODELS_DIR $MIDDLEWARE_DIR

# Create essential files
touch $BASE_DIR/package.json \
      $BASE_DIR/.env \
      $BASE_DIR/Dockerfile \
      $BASE_DIR/docker-compose.yml \
      $SRC_DIR/index.js \
      $CONFIG_DIR/db.js \
      $ROUTES_DIR/pigs.js \
      $CONTROLLERS_DIR/pigController.js

# Populate package.json
cat <<EOF > $BASE_DIR/package.json
{
  "name": "sensor-backend",
  "version": "1.0.0",
  "description": "Backend API for sensor data platform",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "pg": "^8.7.1",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
EOF

# Populate .env file
cat <<EOF > $BASE_DIR/.env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=sensor_data
POSTGRES_HOST=db
POSTGRES_PORT=5432
EOF

# Populate index.js
cat <<EOF > $SRC_DIR/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const pigRoutes = require("./routes/pigs");
app.use("/api/pigs", pigRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOF

# Populate db.js
cat <<EOF > $CONFIG_DIR/db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

module.exports = pool;
EOF

# Populate pigs.js (routes)
cat <<EOF > $ROUTES_DIR/pigs.js
const express = require("express");
const router = express.Router();
const { getPigs, addPig } = require("../controllers/pigController");

router.get("/", getPigs);
router.post("/", addPig);

module.exports = router;
EOF

# Populate pigController.js (controllers)
cat <<EOF > $CONTROLLERS_DIR/pigController.js
const pool = require("../config/db");

const getPigs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pigs");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const addPig = async (req, res) => {
  const { pig_id, breed, age } = req.body;
  try {
    await pool.query("INSERT INTO pigs (pig_id, breed, age) VALUES ($1, $2, $3)", [pig_id, breed, age]);
    res.status(201).send("Pig added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { getPigs, addPig };
EOF

# Populate Dockerfile
cat <<EOF > $BASE_DIR/Dockerfile
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
EOF

# Populate docker-compose.yml
cat <<EOF > $BASE_DIR/docker-compose.yml
version: "3.8"

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    env_file:
      - .env
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: sensor_data
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
EOF

# Install dependencies
cd $BASE_DIR && npm install

echo "✅ Backend setup completed! Run 'docker compose up --build -d' to start the server."
