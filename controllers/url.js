const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();
  const fullUrl=req.protocol + '://' + req.get('host') +'/'+shortID
console.log( req.protocol + '://' + req.get('host') +'/'+shortID)
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    shortUrl:fullUrl
  });

  return res.json({ id: shortID, shortUrl:fullUrl});
}

async function handleGetAnalytics(req, res) {
  const shortUrl = req.params.shortUrl;
  const result = await URL.findOne({ shortUrl });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}


module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
