const productModel = require("../models/products");
const fs = require("fs");
const path = require("path");

class Product {
  static deleteImages(images, mode) {
    var basePath =
      path.resolve(__dirname + "../../") + "public/uploads/products/";
    console.log(basePath);
    for (let i = 0; i < images.length; i++) {
      let filePath = "";
      if ((mode = "file")) {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

  async getAllProduct(req, res) {
    try {
      let Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ id: -1 });
      if (Products) {
        return res.json({ Products });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddProduct(req, res) {
    let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } =
      req.body;
    let images = req.file;
    //validation
    if (
      !pName ||
      !pDescription ||
      !pPrice ||
      !pCategory ||
      !pQuantity ||
      !pOffer ||
      !pStatus
    ) {
      Product.deleteImages(image, "file");
      return res.json({ error: "All filed must be required" });
    } else if (pName.length > 255 || pDescription.length > 3000) {
      Product.deleteImages(images, "file");
      return res.json({
        error: "Name 255 & Description must not be 3000 charecter long",
      });
    } else if (images.length !== 2) {
      Product.deleteImages(images, "file");
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }
        let newProduct = new productModel({
          pName,
          pDescription,
          pPrice,
          pQuantity,
          pCategory,
          pOffer,
          pStatus,
        });
        let save = await newProduct.save();
        if (save) {
          return res.json({ success: "Product created successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async postEditProduct(req, res) {
    let {
      pId,
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
      pImages,
    } = req.body;
    let editImages = req.files;

    //validate other filed
    if (
      !pId ||
      !pName ||
      !pDescription ||
      !pPrice ||
      !pQuantity ||
      !pCategory ||
      !pOffer ||
      !pStatus
    ) {
      return res.json("All filed must be required");
    } else if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({
        error: "Name 255 & Description must not be 3000 charecter long",
      });
    } else if (editImages && editImages.length == 1) {
      Product.deleteImages(editImages, "file");
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      let editData = {
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
      };
      if(editImages.length ==2) {
        let allEditImages = [];
        for(const img of editImages) {
            allEditImages.push(img.filename);
        }
        editData = {...editData, pImages: allEditImages};
        Product.deleteImages(pImages.split(','), 'string');
      }
      try {
        let editProduct = productModel.findByIdAndUpdate(pId, editData);
        editProduct.exec((err) => {
            if(err) console.log(err);
            return res.json({success: 'Product edit sccessfully'});
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  
}
