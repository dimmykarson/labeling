const mongoose = require('mongoose');

const ArgumentSchema = mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    hits:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    },
    updated: { type: Date, default: Date.now() },
});

module.exports=mongoose.model('Argument', ArgumentSchema)