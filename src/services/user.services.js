import pool from '../database/index.js';
import bcrypt from 'bcrypt';
import { throwError } from '../utils/errorhandler.js';

export const registerUser = async({name, email, password}) => {
    if(!name || !email || !password) {
       throwError("all fields are required", 400);
    }

    const existingUserCheck = await pool.query('select id from users where email = $1 limit 1', [email]);
    
    if(existingUserCheck.rows.length > 0) {
        throwError("user already exists with this email", 409);
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const result = await pool.query(
    'insert into users(name, email, password) values($1, $2, $3) returning id, email, name' , [name, email, hashedPassword]);


    return result.rows[0];

};

export const loginUser = async({email, password}) => {
    if(!email || !password) {
        throwError("all fields are required", 400);
    }

    const user = await pool.query('select name, email, password from users where email = $1 limit 1', [email]);

    if(user.rows.length === 0 ){
        throwError("User does not exist", 404);
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if(!passwordMatch) {
        throwError("Invalid credentials", 401);
    }
    
    return {
        name: user.rows[0].name,
        email: user.rows[0].email
    }
}

export const getUserProfile = async(userId) => {
    if(!userId) {
        throwError("User ID is required", 400);
    }

    const user = await pool.query('select id, name, email from users where id = $1 limit 1', [userId]);

    if(user.rows.length === 0){
        throwError("User not found", 404);
    }
    return user.rows[0];

}

export const getUserId = async(username) => {
    if(!username) {
        throwError("Username is required", 400);
    };

    const user = await pool.query('select id from users where name = $1 limit 1', [username]);

    if(user.rows.length === 0){
        throwError("User not found", 404);
    }

    return user.rows[0].id;
}