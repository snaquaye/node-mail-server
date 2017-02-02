module.exports = () => {
  return (err, req, res) => {
    if (err.statusCode) {
      res.status(err.statusCode);
      res.send({
        success: false,
        message: err.message
      });
    } else {
      res.status(500);
      res.send({
        success: false,
        message: 'Oops!! Something went wrong!'
      });
    }
  };
};
