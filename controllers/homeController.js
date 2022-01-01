//const taskModel = require('../models/taskModels');

// Index page controller
function index_page_get (req, resp) {
    resp.render('index');
};

// Export controllers
module.exports = {
  index_page_get
};