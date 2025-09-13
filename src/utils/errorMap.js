export function toHttpError(err, defaultCode = 500) {
  // Errores típicos de Mongoose
  if (err?.name === 'CastError' || err?.name === 'ValidationError') {
    return { statusCode: 400, message: err.message };
  }

  // Si ya trae un statusCode, respétalo
  if (typeof err?.statusCode === 'number') {
    return { statusCode: err.statusCode, message: err.message };
  }

  // Fallback
  return { statusCode: defaultCode, message: err?.message || 'Internal Server Error' };
}
