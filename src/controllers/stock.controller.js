const httpStatus = require('http-status');
const stockModel=require("../models/stock.model")
const stockService=require("../services/stock.services");

const createStockeTrade=async(req,res)=>{
    const data=req.body
    const{Type,User_id,symbol,Shares,Price}=data
    
    if (Type !=="buy" && Type !=="sell"){
        return  res.status(httpStatus.BAD_REQUEST).send({msg:"not valid enum"})
    }
        if(!(/^[1-9]?[0-9]{1}$|^100$/.test(Shares))){
           return res.status(httpStatus.BAD_REQUEST).send({msg:"value must be 1 to 100"})
        };
    
    const dataCreate=await stockService.createStock(data)
    res.status(httpStatus.CREATED).send({msg:"Sucessfully created",data:dataCreate})
};

const findalldata=async(req,res)=>{
    const data=await stockService.findAllStock();
    if(!data || data==null || data==undefined){
        return res.status(httpStatus.NOT_FOUND).send({msg:"Not any data"})
    }
    res.status(httpStatus.OK).send({msg:"all data",data:data})
}

const findStockByquery=async(req,res)=>{
    const queryParams=req.query
    const {Type,User_id}=queryParams

    const stockData=await stockService.findStockByQuery(queryParams);
    if(!stockData){
      return res.status(httpStatus.NOT_FOUND).send({msg:"Not any data"})
    };
    res.status(httpStatus.OK).send({msg:"all data",data:stockData})
}

const findstockById=async(req,res)=>{
    const stokkId=req.params.stockId
    const dataById=await stockService.findStockById(stokkId)
    if(!dataById){
        return res.status(httpStatus.NOT_FOUND).send({msg:"not found"});
    }
    res.status(httpStatus.OK).send({data:dataById})
}

const updateStock = async(req, res)=>{     
       let Type = req.body.Type
       let User_id = req.body.User_id
       let symbol = req.body.symbol
       let Shares = req.body.Shares
       let Price=req.body.Price
       let stockId = req.params.stockId
       let stocks = await stockModel.findOne({ _id: stockId})
 
       if (!stocks) {
          return res.status(httpStatus.NOT_FOUND).send({ status: false, msg: "Not found" })
       }

       if (Type !=="buy" && Type !=="sell"){
        return  res.status(httpStatus.BAD_REQUEST).send({msg:"not valid enum"})
    }
        if(!(/^[1-9]?[0-9]{1}$|^100$/.test(Shares))){
           return res.status(httpStatus.BAD_REQUEST).send({msg:"value must be 1 to 100"})
        };


       let allstock = await stockModel.findOneAndUpdate(
          { _id: stockId},
          { $set: { Type: Type, User_id: User_id, symbol:symbol, Shares: Shares,Price:Price } },
          { new: true })
 
       return res.status(httpStatus.OK).send({ status: true, msg: allstock })
 
    }

    const deleteStock=async(req,res)=>{
        const stockId=req.params.stockId;
        const stock=await stockModel.findOneAndDelete({_id:stockId});
        if(!stock){
            return res.status(httpStatus.NOT_FOUND).send({msg: "Not found" })
        };
        res.status(httpStatus.OK).send({msg:"stock deleted"})
    }




module.exports={
    createStockeTrade,
    findalldata,
    findStockByquery,
    findstockById,
    updateStock,
    deleteStock
}