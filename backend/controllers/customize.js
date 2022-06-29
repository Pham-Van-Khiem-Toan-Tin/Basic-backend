const fs = require("fs");
const categoryModel = require("../models/categories");
const userModel = require("../models/users");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const customizeModel = require("../models/customize");

class Customize {
  async getImages(req, res) {
    try {
      let Images = await customizeModel.find({});
      if (Images) {
        return res.json({ Images });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uploadSlideImage(req, res) {
    let image = req.file.filename;
    if (!image) {
      return res.json({ error: "All field required" });
    }
    try {
      let newCustomize = new customizeModel({
        slideImage: image,
      });
      let save = await newCustomize.save();
      if (save) {
        return res.json({ success: "Image upload successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSildeImage(req, res) {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "All filed required" });
    } else {
      try {
        let deletedSlideImage = await customizeModel.findById(id);
        const filePath = `../backend/public/uploads/${deletedSlideImage.slideImage}`;
        let deleteImage = await customizeModel.findByIdAndDelete(id);
        if (deleteImage) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Image deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getAllData(req, res) {
    try {
      let Categories = await categoryModel.find({}).count();
      let Orders = await orderModel.find({}).count();
      let Products = await productModel.find({}).count();
      let Users = await userModel.find({}).count();
      if (Categories && Products && Orders) {
        return res.json({ Categories, Products, Orders, Users });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const customizeController = new Customize();
module.exports = customizeController;
