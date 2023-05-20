function createApiError(message = "Internal Server Error", statusCode = 500) {
  // Create new instance of error
  const error = new Error(message);

  // Append statusCode property to error object to facilitate error handling
  error.statusCode = statusCode;

  return error;
}

// Returns a standard response for api requests
// sample usage res.status(200).json(handleResponse({ certificates },"sucessfully created "))
function handleResponse(data = {}, message = "success") {
  // Returns standardised success response format
  return {
    message,
    data,
    success: true,
  };
}

// Creates a standard error response object
// sample usage:
// res.status(404).json(handleError("Certificate Not Found"))
function handleError(message = "Internal Server Error") {
  // Return standardised error response
  return { message, success: false };
}
