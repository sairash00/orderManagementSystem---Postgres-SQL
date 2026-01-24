import * as productService from "../services/product.services.js";
import { handleError } from "../utils/errorhandler.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock, barcode } = req.body;

    if (!name || !price || !category || !stock || !barcode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await productService.createProduct({
      name,
      price,
      category,
      stock,
      barcode,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const result = await productService.getProductByName(name);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const result = await productService.getProductById(id);

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getProductByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;
    const result = await productService.getProductByBarcode(barcode);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, stock, barcode } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const result = await productService.updateProduct(
      id,
      name,
      price,
      category,
      stock,
      barcode,
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const result = await productService.deleteProduct(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};
