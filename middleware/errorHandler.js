module.exports = (error, req, res, next) => {
  try {
    const status = error.statusCode || 500;
    const message = error.message;
    const detail = error.detail;
    const data = {
      status: status,
      message: message,
      detail: detail,
    };
    const { transaction } = req.body;
    try {
      if (transaction) transaction.rollback();
    } catch (error) {}
    return res.status(status).json(data);
  } catch (e) {
    return res.status(500).json(e);
    
  }
};
