const Swal = require('sweetalert2');

// Middleware to set SweetAlert messages in response locals
function setSweetAlertMessages(req, res, next) {
  res.locals.swal = Swal;
  next();
}

module.exports = setSweetAlertMessages;