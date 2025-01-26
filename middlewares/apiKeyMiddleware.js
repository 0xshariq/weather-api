import { ApiKey } from '../models/apikey.models.js';

export const apiKeyMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.query.key || req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(401).json({ message: 'API key is missing' });
    }

    // Find the API key in the database
    const keyData = await ApiKey.findOne({ key: apiKey });

    if (!keyData) {
      return res.status(403).json({ message: 'Invalid API key' });
    }

    if (!keyData.active) {
      return res.status(403).json({ message: 'API key is inactive' });
    }

    if (keyData.requestCount >= keyData.requestLimit) {
      return res.status(429).json({ message: 'Request limit exceeded' });
    }

    // Increment the request count
    await ApiKey.updateOne(
      { key: apiKey },
      { $inc: { requestCount: 1 } }
    );

    // Attach the API key to the request object for potential use in route handlers
    req.apiKey = apiKey;

    next();
  } catch (error) {
    console.error('Error in API key middleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

