module.exports = app => {
    const dataDB = app.data.statusData;
    const controller = {};
      controller.listStatus = (req, res) => res.status(200).json("It's ok");
      return controller;
  }