const mongoose = require('mongoose');

const EvaluationSchema = mongoose.Schema({
    text_1_id:{
        type:String,
        require:true
    },
    text_1_is_argument:Boolean,
    text_2_id:{
        type:String,
        require:true
    },
    text_2_is_argument:Boolean,
    similarity_stars:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    },
    updated: { type: Date, default: Date.now() },
});

module.exports=mongoose.model('Evaluation', EvaluationSchema)