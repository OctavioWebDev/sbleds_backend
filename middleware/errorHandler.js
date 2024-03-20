const errorHandler = (err, req, res, next) => {
  // Log the error internally
  console.error(err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  let response = {
    message: err.message,
    // Conditionally add more detailed information in non-production environments
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  };

  // Extend error handling for specific error types or codes
  if (err.type === 'ValidationError') {
      response.details = err.details; // Assuming err.details contains validation specifics
      response.message = 'Validation failed';
  }

  res.json(response);
};

module.exports = errorHandler;

  