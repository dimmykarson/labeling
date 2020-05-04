module.exports = app => {
    const controller = app.controllers.statusController;
    app.route('/api/v1/status')
      .get(controller.listStatus);
}