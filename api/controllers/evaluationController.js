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
            similarity_stars:req.body.similarity_stars
        })
        try{
            const savedEvaluation = await evaluation.save();
            res.json(savedEvaluation)
        }catch(err){
            res.json({message:err})
        }
       
    };

    return controller;
  }