 const ReviewSchema = require('../model/ReviewSchema');

const createReview = async (request, response) => {
    try{
        const {orderId, message, createdDate, userId, displayName, ratings, productId} = request.body;
        if (!userId || !message || !productId || !createdDate || !displayName || !orderId || !ratings ){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const review = new ReviewSchema({
            orderId: orderId,
            message: message,
            createdDate:createdDate,
            userId:userId,
            displayName:displayName,
            ratings:ratings,
            productId:productId,
        });

        const saveData = await review.save();
        return response.status(201).json({code:201, message:'review record has been saved...', data:saveData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const updateReview = async (request, response) => {
    try{
        const {orderId, message, createdDate, userId, displayName, ratings, productId} = request.body;
        if (!userId || !message || !productId || !createdDate || !displayName || !orderId || !ratings ){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const updateData = await ReviewSchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                orderId: orderId,
                message: message,
                createdDate:createdDate,
                userId:userId,
                displayName:displayName,
                ratings:ratings,
                productId:productId,
            }
        },{new:true});
        return response.status(200).json({code:200, message:'review record has been updated...', data:updateData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
// delete (DELETE)
const deleteReview = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const deletedData =
            await ReviewSchema.findOneAndDelete({'_id':request.params.id});
        return response.status(204).json({code:204, message:'review record has been deleted...', data:deletedData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
// review (GET)
const findReviewById = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const reviewData =
            await ReviewSchema.findById({'_id':request.params.id});
        if (reviewData){
            return response.status(200).json({code:200, message:'review data...', data:reviewData});
        }
        return response.status(404).json({code:404, message:'review data not found...', data:null});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const findAllReviews = async (request, response) => {
    try{
        const { page=1, size=10}=request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const skip = (pageIndex-1)*pageSize;
        const reviewRecordList = await ReviewSchema.find()
            .limit(pageSize)
            .skip(skip);
        const reviewRecordListCount = await ReviewSchema.countDocuments();
        return response.status(200).json({code: 200, message: 'review data data...', data:{list: reviewRecordList, dataCount:reviewRecordListCount}});
    }catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

module.exports = {
    findAllReviews, findReviewById, deleteReview, updateReview, createReview
}