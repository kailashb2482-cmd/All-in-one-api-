const mongoose = require('mongoose');

const AdSettingsSchema = new mongoose.Schema({
    adsEnabled: { type: Boolean, default: true },
    type: { type: String, enum: ['banner', 'interstitial', 'rewarded', 'native'], required: true },
    name: { type: String, required: true },
    platform: { type: String, enum: ['android', 'web'], required: true },
    appId: { type: String },
    adUnitId: { type: String, required: true },
    status: { type: String, enum: ['active', 'disabled', 'banned'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('AdSettings', AdSettingsSchema);
