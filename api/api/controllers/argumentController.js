const Argument = require('../models/Argument')

module.exports = app => {
    const dataDB = app.data.statusData;
    const controller = {};
    controller.listArguments = async (req, res) => {
        try {
            const arguments = await Argument.find();
            res.json(arguments)
        } catch (error) {
            res.json({message:error})
        }
    };
    controller.createArgument = async (req, res) =>{
        const argument = new Argument({
            text:req.body.text,
            label:req.body.label,
            importance:req.body.importance,
            process:req.body.process,
            comments:req.body.comments
        })
        try{
            const savedArgument = await argument.save();
            res.json(savedArgument)
        }catch(err){
            res.json({message:err})
        }
    };
   

 
    controller.getPair = async (req, res) => {
        console.log("Getting pair");
        var arguments = await Argument.aggregate([
            {$sample:{size:2}}
        ]);
        res.json(arguments)
    }
    return controller;
  }