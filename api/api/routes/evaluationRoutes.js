module.exports = app => {
    const controller = app.controllers.evaluationController;

    app.route('/api/v1/evaluate')
      .get(controller.evaluations)
      .post(controller.evaluate);
   
}