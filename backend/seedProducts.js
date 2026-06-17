require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");

const Product = require("./models/Product");
const Brand = require("./models/Brand");
const Category = require("./models/Category");

const imageSeeds = [
  "phone",
  "laptop",
  "watch",
  "camera",
  "headphone",
  "gaming",
  "keyboard",
  "mouse",
  "tablet",
  "electronics",
  "fashion",
  "beauty",
  "furniture",
  "shoes",
  "bag",
  "perfume",
  "car",
  "bike",
  "food",
  "home",
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    const response = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );

    const products = response.data.products;

    for (const item of products) {
      let category = await Category.findOne({
        name: item.category,
      });

      if (!category) {
        category = await Category.create({
          name: item.category,
        });
      }

      let brand = await Brand.findOne({
        name: item.brand || "Generic",
      });

      if (!brand) {
        brand = await Brand.create({
          name: item.brand || "Generic",
        });
      }

      const exists = await Product.findOne({
        title: item.title,
      });

      if (exists) {
        console.log(`${item.title} already exists`);
        continue;
      }

      const seed =
        imageSeeds[Math.floor(Math.random() * imageSeeds.length)];

      const thumbnail = `https://picsum.photos/seed/${seed}-${item.id}/600`;

      const images = [
        `https://picsum.photos/seed/${seed}-${item.id}-1/800`,
        `https://picsum.photos/seed/${seed}-${item.id}-2/800`,
        `https://picsum.photos/seed/${seed}-${item.id}-3/800`,
        `https://picsum.photos/seed/${seed}-${item.id}-4/800`,
      ];

      await Product.create({
        title: item.title,
        description: item.description,
        price: item.price,
        discountPercentage: item.discountPercentage,
        category: category._id,
        brand: brand._id,
        stockQuantity: item.stock || 100,
        thumbnail,
        images,
        isDeleted: false,
      });

      console.log(`Added: ${item.title}`);
    }

    console.log("Products Imported Successfully");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });