const httpStatus = require("http-status");
const mongoose=require("mongoose");
const ApiError=require("../utils/ApiError")

const stockTradeSchema=mongoose.Schema({
    Type:{
        type:String,
        required:true,
        enum:["buy","sell"]
    },
User_id:{
    type:Number,
    required:true
},
symbol:{
    type:String,
    required:true
},
Shares:{
    type:Number,
    required:true,
    validate:{
        validator:async(Shares)=>{
            return /^[1-9]?[0-9]{1}$|^100$/.test(Shares)   
    }, message: 'Please fill a valid Shares'
  }
},
Price:{
    type:Number,
    required:true
}
},{timestamps:true});

const StockTrade=mongoose.model("Stock",stockTradeSchema);

module.exports=StockTrade;