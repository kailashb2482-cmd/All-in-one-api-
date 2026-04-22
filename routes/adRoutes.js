const express = require('express');
const router = express.Router();
const adCtrl = require('../controllers/adController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth'); // Path to existing admin auth

// User API
router.get('/config', auth, adCtrl.getConfig);

// Admin APIs
router.post('/admin/ads/create', auth, adminAuth, adCtrl.adminCreateAd);
router.get('/admin/ads/list', auth, adminAuth, adCtrl.adminListAds);
router.put('/admin/ads/:id', auth, adminAuth, adCtrl.adminUpdateAd);
router.delete('/admin/ads/:id', auth, adminAuth, adCtrl.adminDeleteAd);
router.patch('/admin/ads/toggle', auth, adminAuth, adCtrl.adminToggleGlobal);

module.exports = router;
