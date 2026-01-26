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

export const updateName = async(id, name) => {
    if(!id){
        throwError("Product ID is required", 400);
    }
    
    const existingProduct = await pool.query('select * from products where id = $1 limit 1', [id]);
    if(existingProduct.rows.length === 0){
        throwError("Product not found", 404);
    }

    const updatedProduct = await pool.query('update products set name = $1 where id = $2 returning *', [name, id]);
    return updatedProduct.rows[0];
};

export const updatePrice = async(id, price) => {
    if(!id){
        throwError("Product ID is required", 400);
    }
    
    const existingProduct = await pool.query('select * from products where id = $1 limit 1', [id]);
    if(existingProduct.rows.length === 0){
        throwError("Product not found", 404);
    }

    const updatedProduct = await pool.query('update products set price = $1 where id = $2 returning *', [price, id]);
    return updatedProduct.rows[0];
};

export const updateCategory = async(id, category) => {
    if(!id){
        throwError("Product ID is required", 400);
    }
    
    const existingProduct = await pool.query('select * from products where id = $1 limit 1', [id]);
    if(existingProduct.rows.length === 0){
        throwError("Product not found", 404);
    }

    const updatedProduct = await pool.query('update products set category = $1 where id = $2 returning *', [category, id]);
    return updatedProduct.rows[0];
};

export const updateStock = async(id, stock) => {
    if(!id){
        throwError("Product ID is required", 400);
    }
    
    const existingProduct = await pool.query('select * from products where id = $1 limit 1', [id]);
    if(existingProduct.rows.length === 0){
        throwError("Product not found", 404);
    }

    const updatedProduct = await pool.query('update products set stock = $1 where id = $2 returning *', [stock, id]);
    return updatedProduct.rows[0];
};

export const updateBarcode = async(id, barcode) => {
    if(!id){
        throwError("Product ID is required", 400);
    }
    
    const existingProduct = await pool.query('select * from products where id = $1 limit 1', [id]);
    if(existingProduct.rows.length === 0){
        throwError("Product not found", 404);
    }

    const updatedProduct = await pool.query('update products set barcode = $1 where id = $2 returning *', [barcode, id]);
    return updatedProduct.rows[0];
};

export const deleteProduct = async(id) => {
    if(!id){
        throwError("Product ID is required", 400);
    }
    
    const existingProduct = await pool.query('select * from products where id = $1 limit 1', [id]);
    if(existingProduct.rows.length === 0){
        throwError("Product not found", 404);
    }

    await pool.query('delete from products where id = $1', [id]);
    return { message: "Product deleted successfully" };
};          