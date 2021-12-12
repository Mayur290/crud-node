import { Product } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import Joi from "joi";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

const productController = {
  async store(req, res, next) {
    //multipart form data
    handleMultipartData(req, res, async (err) => {
      if (err) {
        console.log("handle multipart daat ");
        console.log(err);
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;

      //Validation
      const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
      });

      const { error } = productSchema.validate(req.body);

      if (error) {
        // Delete uploaded image
        console.log("validation error");

        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });

        return next(error);
      }

      // DB
      const { name, price, size } = req.body;
      let document;
      try {
        document = await Product.create({
          name,
          price,
          size,
          image: filePath,
        });
      } catch (err) {
        console.log("Product creat error");

        return next(err);
      }
      res.status(201).json(document);
    });
    //
  },
  async update(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }

      let filePath;
      if (req.file) {
        filePath = req.file.path;
      }

      const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
        image: Joi.string(),
      });

      const { error } = productSchema.validate(req.body);
      if (error) {
        if (req.file) {
          fs.unlink(`${appRoot}/${filePath}`, (err) => {
            if (err) {
              return next(CustomErrorHandler.serverError(err.message));
            }
          });
        }
        return next(error);
      }

      const { name, price, size } = req.body;
      let document;
      try {
        document = await Product.findOneAndUpdate(
          { _id: req.params.id },
          { name, price, size, ...(req.file && { image: filePath }) },
          { new: true }
        );
      } catch (err) {
        return next(err);
      }

      res.status(201).json(document);
    });
  },
  async destroy(req, res, next) {
    const document = await Product.findOneAndRemove({ _id: req.params.id });
    if (!document) {
      return next(new Error("Nothing to Delete"));
    }

    // Delete Image
    const imagePath = document._doc.image;
    fs.unlink(`${appRoot}/${imagePath}`, (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError());
      }
    });
    res.json(document);
  },
};

export default productController;
