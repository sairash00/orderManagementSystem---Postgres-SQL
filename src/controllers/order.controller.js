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

export const updateOrderStatus = async(req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        if(!id){
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        if(!status){
            return res.status(400).json({
                success: false,
                message: "Order status is required",
            });
        }

        const updatedOrder = await orderService.updateOrderStatus(id, status);

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: updatedOrder
        })
        
    } catch (error) {
        handleError(res, error);
    }
}   

export const deleteOrder = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        await orderService.deleteOrder(id);

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        })
        
    } catch (error) {
        handleError(res, error);
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

export const getOrdersByStatus = async(req, res) => {
    try {
        const {status} = req.params;

        if(!status){
            return res.status(400).json({
                success: false,
                message: "Order status is required",
            });
        }

        const orders = await orderService.getOrdersByStatus(status);

        return res.status(200).json({
            success: true,
            message: `Orders with status ${status} fetched successfully`,
            data: orders
        })
        
    } catch (error) {
        handleError(res, error);
    }
}

export const cancelOrder = async(req, res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        const canceledOrder = await orderService.cancelOrder(id);

        return res.status(200).json({
            success: true,
            message: "Order canceled successfully",
            data: canceledOrder
        })
        
    } catch (error) {
        handleError(res, error);
    }
}