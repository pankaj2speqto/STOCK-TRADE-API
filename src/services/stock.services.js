const ApiError=require("../utils/ApiError");
const stockModel=require("../models/stock.model");
const httpstatus=require("http-status");
const createStock=async(updatedBody)=>{
    const createData=await stockModel.create(updatedBody);
    return createData
};

const findAllStock=async(req,res)=>{
    const findData=await stockModel.find({})
    return findData;
};

const findStockByQuery=async(queryParams)=>{
    const findData=await stockModel.find(queryParams)
    console.log(findData,"dfghjkl")
    return findData

};

const findStockById=async(id)=>{
    const data=await stockModel.findById(id);
    return data
};
const updatedStcok=async(id,updatedBody)=>{
    const data=await stockModel.findByIdAndUpdate(id,updatedBody)
return data;
}

module.exports={
    createStock,
    findAllStock,
    findStockByQuery,
    findStockById,
    updatedStcok
};
    

