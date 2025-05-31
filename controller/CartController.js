const CartSchema = require('../model/CartSchema');

const createCartRecord = async (request, response) => {
    try{
        const {userId, qty,productId, createdDate} = request.body;
        if (!userId || !productId || !createdDate){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const cartRecord = new CartSchema({
            qty:qty,
            userId: userId,
            productId: productId,
            createdDate:createdDate,
        });

        const saveData = await cartRecord.save();
        return response.status(201).json({code:201, message:'cart record has been saved...', data:saveData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const updateCartRecord = async (request, response) => {
    try{
        const {userId, qty ,productId, createdDate} = request.body;
        if (!userId || !productId || !createdDate){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const updateData = await CartSchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                qty:qty,
                userId: userId,
                productId: productId,
                createdDate:createdDate,
            }
        },{new:true});
        return response.status(200).json({code:200, message:'Cart record has been updated...', data:updateData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
// delete (DELETE)
const deleteCartRecord = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const deletedData =
            await CartSchema.findOneAndDelete({'_id':request.params.id});
        return response.status(204).json({code:204, message:'cart record has been deleted...', data:deletedData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const findCartById = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const cartData =
            await CartSchema.findById({'_id':request.params.id});
        if (cartData){
            return response.status(200).json({code:200, message:'cart data...', data:cartData});
        }
        return response.status(404).json({code:404, message:'cart data not found...', data:null});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
const findAllCartRecords = async (request, response) => {
    try{
        const { page=1, size=10}=request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const skip = (pageIndex-1)*pageSize;
        const cartRecordList = await CartSchema.find()
            .limit(pageSize)
            .skip(skip);
        const cartRecordListCount = await CartSchema.countDocuments();
        return response.status(200).json({code: 200, message: 'cart record data data...', data:{list: cartRecordList, dataCount:cartRecordListCount}});
    }catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

module.exports = {
    createCartRecord, deleteCartRecord, findCartById, updateCartRecord, findAllCartRecords
}