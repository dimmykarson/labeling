const Evaluation = require('../models/Evaluation')
module.exports = app => {

    const controller = {};
    controller.evaluations = async (req, res) =>{
        try {
            const evaluations = await Evaluation.find();
            res.json(evaluations)
        } catch (error) {
            res.json({message:error})
        }
    }
    controller.evaluate = async (req, res) =>{
        const evaluation = new Evaluation({
            text_1_id:req.body.text_1_id,
            text_1_is_argument:req.body.text_1_is_argument,
            text_2_id:req.body.text_2_id,
            text_2_is_argument:req.body.text_2_is_argument,
            similarity_stars:req.body.similarity_star
        })
        console.log(evaluation.similarity_stars)
        
        if(evaluation.similarity_stars<0 || evaluation.similarity_stars>5){
            res.status(500).json({message:"Error on rating"})
            return controller;
        }
        try{
            const savedEvaluation = await evaluation.save();
            res.status(200).json("It's ok")
        }catch(err){
            res.status(500).json({message:err})
        }
    };

    return controller;
  }