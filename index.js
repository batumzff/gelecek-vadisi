const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/database/database");

const User = require("./src/models/user");
const Product = require("./src/models/product");

dotenv.config();

const seedDatabase = async () => {
  try {
    const users = await User.bulkCreate([
      {
        username: "root",
        email: "root@mail.com",
        password: "Rootpass123.",
        userType: "admin",
      },
    ]);
    const products = await Product.bulkCreate([
      {
        name: "Product 1",
        description: "Description 1",
        quantity: 10,
        price: 100,
      },
      {
        name: "Product 2",
        description: "Description 2",
        quantity: 20,
        price: 200,
      },
      {
        name: "Product 3",
        description: "Description 3",
        quantity: 30,
        price: 300,
      },
      {
        name: "Product 4",
        description: "Description 4",
        quantity: 40,
        price: 400,
      },
      {
        name: "Product 5",
        description: "Description 5",
        quantity: 50,
        price: 500,
      },
    ]);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Test the database connection
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database connection has been established successfully.");
    return seedDatabase();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./src/routes/user");

app.use("/api/auth", userRoutes);

const productRoutes = require("./src/routes/product");

app.use("/api/products", productRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
