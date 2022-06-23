module.exports = function(app) {
    let homeCtrl = require("../controllers/homeCtrl");
    app.route("/")
        .get(homeCtrl.get)
}