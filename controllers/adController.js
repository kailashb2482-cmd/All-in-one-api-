const AdSettings = require('../models/AdSettings');

exports.getConfig = async (req, res) => {
    const config = await AdSettings.find({ status: 'active' });
    const isGlobalEnabled = await AdSettings.findOne({ adsEnabled: false });
    
    if (isGlobalEnabled) {
        return res.json({ success: true, adsEnabled: false, ads: [] });
    }
    
    res.json({ success: true, adsEnabled: true, ads: config });
};

exports.adminCreateAd = async (req, res) => {
    const ad = await AdSettings.create(req.body);
    res.json({ success: true, ad });
};

exports.adminListAds = async (req, res) => {
    const ads = await AdSettings.find().sort({ createdAt: -1 });
    res.json({ success: true, ads });
};

exports.adminUpdateAd = async (req, res) => {
    const ad = await AdSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, ad });
};

exports.adminDeleteAd = async (req, res) => {
    await AdSettings.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};

exports.adminToggleGlobal = async (req, res) => {
    const { adsEnabled } = req.body;
    await AdSettings.updateMany({}, { $set: { adsEnabled } });
    res.json({ success: true, adsEnabled });
};
