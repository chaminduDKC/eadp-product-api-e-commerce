const BookmarkSchema = require('../model/BookmarkSchema');

const createBookmark = async (request, response) => {
    try{
        const {userId, productId, createdDate} = request.body;
        if (!userId || !productId || !createdDate){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const bookmark = new BookmarkSchema({
            userId: userId,
            productId: productId,
            createdDate:createdDate,
        });

        const saveData = await bookmark.save();
        return response.status(201).json({code:201, message:'bookmark record has been saved...', data:saveData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const updateBookmark = async (request, response) => {
    try{
        const {userId ,productId, createdDate} = request.body;
        if (!userId || !productId || !createdDate){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const updateData = await BookmarkSchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                userId: userId,
                productId: productId,
                createdDate:createdDate,
            }
        },{new:true});
        return response.status(200).json({code:200, message:'bookmark record has been updated...', data:updateData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
// delete (DELETE)
const deleteBookmark = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const deletedData =
            await BookmarkSchema.findOneAndDelete({'_id':request.params.id});
        return response.status(204).json({code:204, message:'bookmark record has been deleted...', data:deletedData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const findBookmarkById = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const bookmarkData =
            await BookmarkSchema.findById({'_id':request.params.id});
        if (bookmarkData){
            return response.status(200).json({code:200, message:'bookmark data...', data:bookmarkData});
        }
        return response.status(404).json({code:404, message:'bookmark data not found...', data:null});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const findAllBookmarkRecords = async (request, response) => {
    try{
        const { page=1, size=10}=request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const skip = (pageIndex-1)*pageSize;
        const bookmarkRecordList = await BookmarkSchema.find()
            .limit(pageSize)
            .skip(skip);
        const bookmarkRecordListCount = await BookmarkSchema.countDocuments();
        return response.status(200).json({code: 200, message: 'cart record data data...', data:{list: bookmarkRecordList, dataCount:bookmarkRecordListCount}});
    }catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

module.exports = {
    findAllBookmarkRecords, findBookmarkById, deleteBookmark, updateBookmark, createBookmark
}