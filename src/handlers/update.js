"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUpdate = exports.updateUpdate = exports.createUpdate = exports.getUpdates = exports.getOneUpdate = void 0;
const db_1 = __importDefault(require("../db"));
const getOneUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield db_1.default.update.findFirst({
        where: {
            id: req.params.id,
        },
    });
    res.json({ data: update });
});
exports.getOneUpdate = getOneUpdate;
const getUpdates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.default.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);
    res.json({ data: updates });
});
exports.getUpdates = getUpdates;
const createUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.default.product.findUnique({
        where: {
            id: req.body.productId,
        },
    });
    if (!product) {
        // does not belong to user
        return res.json({ message: "nope" });
    }
    const update = yield db_1.default.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: { id: product.id } },
        },
    });
    res.json({ data: update });
});
exports.createUpdate = createUpdate;
const updateUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.default.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);
    const match = updates.find((update) => update.id === req.params.id);
    if (!match) {
        // handle this
        res.json({ message: "nope" });
    }
    const updatedUpdate = yield db_1.default.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });
    res.json({ data: updatedUpdate });
});
exports.updateUpdate = updateUpdate;
const deleteUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.default.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);
    const match = updates.find((update) => update.id === req.params.id);
    if (!match) {
        // handle this
        res.json({ message: "nope" });
    }
    const deleted = yield db_1.default.update.delete({
        where: {
            id: req.params.id,
        },
    });
    res.json({ data: deleted });
});
exports.deleteUpdate = deleteUpdate;
