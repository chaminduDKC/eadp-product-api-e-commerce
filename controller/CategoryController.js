const CategorySchema = require('../model/CategorySchema')


const createCategory = async (request, response) => {
    try{
        const {categoryName,file, countryIds} = request.body;
        if (!categoryName || !file || !countryIds){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const category = new CategorySchema({
            // client side must send the file resource
            // you must upload the icon into the S3 bucket and then you can get the response body.

            // the client send the ids of all the available countries, and the system must find all the countries for the request and save.

            categoryName: categoryName,
            icon: {
                hash: 'Temp Hash',
                resourceUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr1TiZMtNq_El78BMq7-uS7g01qtuiAAVNj6tLspl1bAMw_t9AgZsxNlkrEzXrrYMGcz_S_pKEDq4FU-A_vW875CtAp1DHRfKZAt7xoww',
                fileName: 'Temp File Name',
                directory: 'Temp Directory'
            }, // assume that you have send the image to the s3
            availableCountries: [
                {
                    countryId: 'Temp-Id-1',
                    countryName: 'Sri Lanka',
                },
                {
                    countryId: 'Temp-Id-2',
                    countryName: 'USA',
                }
            ],
        });

        const saveData = await category.save();
        return response.status(201).json({code:201, message:'customer has been saved...', data:saveData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const updateCategory = async (request, response) => {
    try{
        const {categoryName} = request.body;
        if (!categoryName){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const updateData = await CategorySchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                categoryName:categoryName
            }
        },{new:true});
        return response.status(200).json({code:200, message:'customer has been updated...', data:updateData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
// delete (DELETE)
const deleteCategory = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const deletedData =
            await CategorySchema.findOneAndDelete({'_id':request.params.id});
        return response.status(204).json({code:204, message:'customer has been deleted...', data:deletedData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

const findCategoryById = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const categoryData =
            await CategorySchema.findById({'_id':request.params.id});
        if (categoryData){
            return response.status(200).json({code:200, message:'category data...', data:categoryData});
        }
        return response.status(404).json({code:404, message:'category data not found...', data:null});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
const findAllCategories = async (request, response) => {
    try{
        const {searchText, page=1, size=10}=request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const query={};
        if(searchText){
            query.$text={$search:searchText}
        }
        const skip = (pageIndex-1)*pageSize;
        const categoryList = await CategorySchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const categoryListCount = await CategorySchema.countDocuments(query);
        return response.status(200).json({code: 200, message: 'category data data...', data:{list: categoryList, dataCount:categoryListCount}});
    }catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

module.exports = {
    createCategory, findCategoryById, findAllCategories, updateCategory, deleteCategory,
}