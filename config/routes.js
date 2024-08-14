const express = require('express');
const ctrl = require('../app/controllers');
const path = require('path');
const { uploadUser, uploadTicket, uploadShop, uploadProduct} = require("../app/controllers/middleware/upload");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const cron = require('node-cron');

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));

const apiRouter = express.Router();

apiRouter.use(cors());

apiRouter.use(express.static(path.join(__dirname, '../bin/public')));
apiRouter.use('/', swaggerUi.serve);
apiRouter.get('/', swaggerUi.setup(swaggerDocument));

// =============================== Node Cron Scheduling =====================================
cron.schedule('0 0 */1 * * *', () => {
    console.log('running a task every 60 minutes');
    ctrl.api.v1.transactions.update()
});
// ==========================================================================================

/**
 * TODO: Implement your own API
 *       implementations
 */

//===================================== Route untuk Umum =====================================
//============ Route untuk Produk
apiRouter.get("/api/v1/product",ctrl.api.v1.product.getAllProduct);
apiRouter.get("/api/v1/product/:id",ctrl.api.v1.product.getProduct);

//============ Route untuk Shop
apiRouter.get("/api/v1/shop", ctrl.api.v1.shop.getAllShop);
apiRouter.get("/api/v1/shop/:id",ctrl.api.v1.shop.getShop);
//============================================================================================

//=================================== Route authentikasi =====================================
apiRouter.post('/api/v1/login', ctrl.middleware.auths.login, ctrl.api.v1.auths.login);
apiRouter.post('/api/v1/register', ctrl.middleware.auths.register, ctrl.api.v1.auths.register);
apiRouter.post('/api/v1/loginRegGoogle', ctrl.api.v1.auths.loginRegGoogle);

//===================================== Route untuk Pemilik UMKM =====================================
apiRouter.post("/api/v1/shop", ctrl.middleware.auths.isLogin,uploadShop.single('image'), ctrl.middleware.uploadHandler, ctrl.middleware.createShopForm, ctrl.api.v1.shop.createShop);
apiRouter.put('/api/v1/shop/:id/update',ctrl.middleware.auths.isLogin,uploadShop.single('image'), ctrl.middleware.uploadHandler, ctrl.api.v1.shop.updateShop);
apiRouter.delete('/api/v1/shop/:id/delete',ctrl.middleware.auths.isLogin, ctrl.api.v1.shop.deleteShop);
apiRouter.get("/api/v1/shop/:id", ctrl.middleware.auths.isLogin, ctrl.api.v1.shop.getShop);

//===================================== Route untuk Toko Pemilik produk =====================================
apiRouter.post("/api/v1/product", ctrl.middleware.auths.isLogin, uploadProduct.single('image'), ctrl.middleware.uploadHandler, ctrl.middleware.createProductForm, ctrl.api.v1.product.createProduct);
apiRouter.put("/api/v1/product/:id/update", ctrl.middleware.auths.isLogin,uploadShop.single('image'), ctrl.middleware.uploadHandler, ctrl.api.v1.product.updateProduct);
apiRouter.delete("/api/v1/product/:id/delete", ctrl.middleware.auths.isLogin, ctrl.api.v1.product.deleteProduct);

//==================================== Route untuk user login ================================
apiRouter.get('/api/v1/who-am-i', ctrl.middleware.auths.isLogin, ctrl.api.v1.auths.whoAmI);



//======================================= Route untuk admin ==================================
apiRouter.delete("/api/v1/:id/delete-user", ctrl.middleware.auths.isLogin, ctrl.middleware.auths.isAdmin, ctrl.middleware.auths.getUser, ctrl.api.v1.auths.deleteUser)
apiRouter.get("/api/v1/:id/user", ctrl.middleware.auths.isLogin, ctrl.middleware.auths.isAdmin, ctrl.api.v1.auths.getUser)
apiRouter.get("/api/v1/users", ctrl.middleware.auths.isLogin, ctrl.middleware.auths.isAdmin, ctrl.api.v1.auths.getAllUser)
apiRouter.get("/api/v1/:email/user-email", ctrl.middleware.auths.isLogin, ctrl.middleware.auths.isAdmin, ctrl.api.v1.auths.findByEmail)


//===================================== Route verifikasi =====================================
apiRouter.post("/api/v1/reset-password", ctrl.middleware.auths.forgotPass, ctrl.api.v1.auths.forgotPassword)
apiRouter.get("/api/v1/:token/verify-result-register", ctrl.middleware.auths.verifyRegister, ctrl.api.v1.auths.verifyRegister);
apiRouter.get("/api/v1/:email/verify-reset-password", ctrl.middleware.auths.verifyResetPass, ctrl.api.v1.auths.verifyForgotPass);
/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */

// ================ Route Testing Transaksi ==============================

// =======================================================================

apiRouter.get("/api/v1/errors", () => {
    throw new Error(
        "The Industrial Revolution and its consequences have been a disaster for the human race. (NB: Ini adalah tempat redirect verifikasi sementaranya. Nunggu bagian FE selesai dan dihosting)"
    )
})

apiRouter.use(ctrl.api.main.onLost);
apiRouter.use(ctrl.api.main.onError);

module.exports = apiRouter;