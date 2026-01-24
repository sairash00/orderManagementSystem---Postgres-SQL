const throwError = (msg, code) => {
  const error = new Error(msg);
  error.isOperational = true;
  error.statusCode = code;
  throw error;
};


export { throwError };