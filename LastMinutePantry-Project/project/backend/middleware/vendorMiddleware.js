import asyncHandler from 'express-async-handler';

const vendor = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'vendor') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a vendor');
  }
});

export { vendor };