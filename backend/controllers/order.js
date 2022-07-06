const orderModel = require("../models/orders");

class Order {
  async getAllOrder(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name eamil")
        .sort({ id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Order = orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {
    let { allProduct, users, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !users ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newOrder = new orderModel({
          allProduct,
          users,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newOrder.save();
        if (save) {
          res.json("Order created successfully");
        }
      } catch (err) {
        return res.json({ error: err });
      }
    }
  }

  async postUpdateOrder(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentOrder = orderModel.findByIdAndUpdate(oId, {
        status: status,
        updateAt: Date.now(),
      });
      currentOrder.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "Order update successfully" });
      });
    }
  }

  async postDeleteOrder(req,res) {
    let {oId} =req.body;
    if(!oId) {
        return res.json({error: 'All filled must be required'});
    }
    else {
        try {
            let deleteOrder = await orderModel.findByIdAndDelete(oId);
            if(deleteOrder) {
                return res.json({sucess: 'Order deleted successfully'});
            }
        } catch (err) {
            console.log(err);
        }
    }
  }
}

const orderController = new Order();
module.exports = orderController;
