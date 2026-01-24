const throwError = (msg, code) => {
  const error = new Error(msg);
  error.isOperational = true;
  error.statusCode = code;
  throw error;
};


export const handleError = (res, error) => {

  if (error.isOperational) {
    return res.status(error.statusCode || 400).json({
      success: false,
      error: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};


export { throwError };