const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require('./models/productModel');

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Node devs. I will be with you");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.post("/products", async(req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({ message: `Cant find product by this id ${id}`})
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
    
  } catch (error) {
    res.status(500).json({ massage: error.message })
  }
})

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: "Cant find this product" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

mongoose
  .connect(
    "mongodb+srv://norgestream:03121979Sestra@sergioapi.rarueb1.mongodb.net/MyList?retryWrites=true&w=majority&appName=SergioAPI"
  )
  .then(() => {
    console.log("Connected to Mongo DB");
    app.listen(3001, () => {
      console.log("Node API is runing");
    });
  })
  .catch((err) => console.log(err));
