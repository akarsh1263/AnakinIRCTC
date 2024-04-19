const API_KEY = process.env.API_KEY;

exports.checkApiKey = (req, res, next) => {
  const requestApiKey = req.headers['api-key'];

  if (requestApiKey !== API_KEY) {
    return res.status(401).json({ error: 'Invalid API Key' });
  }

  next();
};