module.exports = app => {
    const dataDB = app.data.statusData;
    console.log(dataDB);
    const controller = {};
      controller.listStatus = (req, res) => res.status(200).json(dataDB);
      return controller;
  }