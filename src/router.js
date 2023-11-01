"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middleware_1 = require("./modules/middleware");
const product_1 = require("./handlers/product");
const update_1 = require("./handlers/update");
const router = (0, express_1.Router)();
router.get("/product", product_1.getProducts);
router.get("/product/:id", product_1.getOneProduct);
router.put("/product/:id", (0, express_validator_1.body)("name").isString(), middleware_1.handleInputErrors, (req, res) => { });
router.post("/product", (0, express_validator_1.body)("name").isString(), middleware_1.handleInputErrors, product_1.createProduct);
router.delete("/product/:id", product_1.deleteProduct);
/** Update */
router.get("/update", update_1.getUpdates);
router.get("/update/:id", update_1.getOneUpdate);
router.put("/update/:id", (0, express_validator_1.body)("title").optional(), (0, express_validator_1.body)("body").optional(), (0, express_validator_1.oneOf)([(0, express_validator_1.body)("IN_PROGRESS"), (0, express_validator_1.body)("SHIPPED"), (0, express_validator_1.body)("DEPRECATED")]), (0, express_validator_1.body)("version").optional(), update_1.updateUpdate);
router.post("/update", (0, express_validator_1.body)("title").exists().isString(), (0, express_validator_1.body)("body").exists().isString(), (0, express_validator_1.body)("productId").exists().isString(), update_1.createUpdate);
router.delete("/update/:id", update_1.deleteUpdate);
/** Update Point */
router.get("/updatepoint", (req, res) => { });
router.get("/updatepoint/:id", (req, res) => { });
router.put("/updatepoint/:id", (0, express_validator_1.body)("name").optional().isString(), (0, express_validator_1.body)("description").optional().isString(), (req, res) => { });
router.post("/updatepoint", (0, express_validator_1.body)("name").optional().isString(), (0, express_validator_1.body)("description").optional().isString(), (0, express_validator_1.body)("updateId").exists().isString(), (req, res) => { });
router.delete("/updatepoint/:id", (req, res) => { });
exports.default = router;
