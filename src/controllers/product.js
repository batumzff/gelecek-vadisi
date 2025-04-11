const Product = require("../models/product");
const redisClient = require("../config/redis");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, description, quantity, price } = req.body;
      const product = await Product.create({
        name,
        description,
        quantity,
        price,
      });
      const keys = await redisClient.keys("products:*");
      if (keys.length > 0) {
        await redisClient.del(keys);
        console.log("Cache cleared");
      }
      res.status(201).json({ message: "Product created", product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const cacheKey = `products:${page}:${limit}`;
      const cachedProducts = await redisClient.get(cacheKey);
      if (cachedProducts) {
        console.log("Cache hit");
        return res.status(200).json(JSON.parse(cachedProducts));
      }
      const products = await Product.findAndCountAll({
        limit,
        offset,
      });
      const totalPages = Math.ceil(products.count / limit);
      res.json({
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: products.count,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      });
      await redisClient.set(cacheKey, JSON.stringify(products), {
        EX: 60 * 60 * 24,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.destroy({ where: { id } });
      await redisClient.del(`product:${id}`);
      const keys = await redisClient.keys("products:*");
      if (keys.length > 0) {
        await redisClient.del(keys);
        console.log("Cache cleared");
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, quantity, price } = req.body;
      const product = await Product.update(
        { name, description, quantity, price },
        { where: { id } }
      );
      await redisClient.del(`product:${id}`);
      const keys = await redisClient.keys("products:*");
      if (keys.length > 0) {
        await redisClient.del(keys);
        console.log("Cache cleared");
      }
      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const cacheKey = `product:${id}`;
      const cachedProduct = await redisClient.get(cacheKey);
      if (cachedProduct) {
        console.log("Cache hit");
        return res.status(200).json(JSON.parse(cachedProduct));
      }
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      await redisClient.set(cacheKey, JSON.stringify(product), {
        EX: 60 * 60 * 24,
      });
      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
