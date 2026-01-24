import { throwError } from "../utils/errorhandler"
import pool from "../database/index.js"

export const createProduct = async ({name, price, category, stock, barcode}) => {
    if(!name || !price || !category || !stock || !barcode){
        throwError("All product fields are required", 400)
    }

    const checkProductExistence = await pool.query('select id from products where name = $1 limit 1', [name]);
    
    if(checkProductExistence.rows.length > 0){
        throwError("Product with this name already exists", 409);
    }
    
    const product = await pool.query('insert into products (name, price, category, stock, barcode) values ($1, $2, $3, $4, $5) returning *', [name, price, category, stock, barcode]);

    if(product.rows.length === 0){
        throwError("Failed to create product", 500);
    }

    return product.rows[0];

};

export const getProductByName = async(name) => {
    if(!name){
        throwError("Product name is required", 400);
    }

    const product = await pool.query('select * from products where name = $1 limit 1', [name]);
    
    if(product.rows.length === 0){
        throwError("Product not found", 404);
    }

    return product.rows[0];
}

export const getProductById = async(id) => {
    if(!id){
        throwError("Product ID is required", 400);
    }
    
    const product = await pool.query('select * from products where id = $1 limit 1', [id]);
    
    if(product.rows.length === 0){
        throwError("Product not found", 404);
    }

    return product.rows[0];
}

export const  getProductByBarcode = async (barcode) => {
    if(!barcode){
        throwError("Product barcode is required", 400);
    }
    
    const product = await pool.query('select * from products where barcode = $1 limit 1', [barcode]);
    
    if(product.rows.length === 0){
        throwError("Product not found", 404);
    }
    
    return product.rows[0];
}

export const getAllProducts = async() => {
    const products  = await pool.query('select * from products');
    return products.rows;
}

export const updateProduct = async(id, name, price, category, stock, barcode) => {
    if(!id){
        throwError("Product ID is required", 400);
    }
    
    const existingProduct = await pool.query('select * from products where id = $1 limit 1', [id]);
    if(existingProduct.rows.length === 0){
        throwError("Product not found", 404);
    }
    
}