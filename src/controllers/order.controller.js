import * as orderService from '../services/order.service.js'
import { handleError } from '../utils/errorhandler.js'

export const createOrder = async( req, res) => {
    try {
        const {userId, items} = req.body;

        if(!userId || !items || !Array.isArray(items) || items.length === 0){
            return res.status(400).json({
                success: false,
                message: "Invalid order data",
            });
        }

        const order = await orderService.createOrder({userId, items});

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        })
    } catch (error) {
        handleError(res, error);
    }
}

export const getOrderById = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }
        
        const order = await orderService.getOrderById(id);

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order
        })
        
    } catch (error) {
        handleError(res, error);
    }
}

export const getOrdersByUserId = async(req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        
        const orders = await orderService.getOrdersByUserId(id);
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
    } catch (error) {
        handleError(res,error);
    }
}



export const getAllOrders = async(req, res) => {
    try {
        const orders = await orderService.getAllOrders();

        return res.status(200).json({
            success: true,
            message: "All orders fetched successfully",
            data: orders
        })
        
    } catch (error) {
        handleError(res, error);
    }
};


export const getOrderByDate = async(req, res) => {
    try {
        const {date} = req.params;

        if(!date){
            return res.status(400).json({
                success: false,
                message: "Date is required",
            });
        }

        const orders = await orderService.getOrderByDate(date);

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
        
    } catch (error) {
        handleError(res, error);
    }
}

// NOTE: this feature is optional 

export const getOrderByEmployeeId = async(req,res) => {
    try {
        const {employeeId} = req.params;

        if(!employeeId){
            return res.status(400).json({
                success: false,
                message: "Employee ID is required",
            });
        }

        const orders = await orderService.getOrderByEmployeeId(employeeId);

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })

    } catch (error) {
        handleError(res, error);
    }
}