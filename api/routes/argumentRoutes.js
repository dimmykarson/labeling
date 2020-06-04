const Argument = require('../models/Argument')
module.exports = app => {
    const controller = app.controllers.argumentController;

    app.route('/api/v1/arguments')
      .get(controller.listArguments)
      .post(controller.createArgument);
    app.route('/api/v1/argument/pair')
      .get(controller.getPair);
    
}