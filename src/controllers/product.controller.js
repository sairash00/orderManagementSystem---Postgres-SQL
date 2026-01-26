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

export const updateName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const result = await productService.updateName(id, name);

    return res.status(200).json({
      success: true,
      message: "Product name updated successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;     

    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Product price is required",
      });
    }

    const result = await productService.updatePrice(id, price);

    return res.status(200).json({
      success: true,
      message: "Product price updated successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product stock is required",
      });
    }

    const result = await productService.updateStock(id, stock);

    return res.status(200).json({
      success: true,
      message: "Product stock updated successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Product category is required",
      });
    }

    const result = await productService.updateCategory(id, category);

    return res.status(200).json({
      success: true,
      message: "Product category updated successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateBarcode = async (req, res) => {
  try {
    const { id } = req.params;
    const { barcode } = req.body;

    if (!barcode) {
      return res.status(400).json({
        success: false,
        message: "Product barcode is required",
      });
    }

    const result = await productService.updateBarcode(id, barcode);

    return res.status(200).json({
      success: true,
      message: "Product barcode updated successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};