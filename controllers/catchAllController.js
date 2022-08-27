export const invalidEndpoint = (req, res, next) => {
  return res.status(404).json({
    message: `Invalid endpoints`,
  });
};
