const express = require('express');
const router = express.Router();
const rewardCtrl = require('../controllers/rewardController');
const { dailyRewardReset } = require('../middlewares/rewardMiddleware');
const auth = require('../middlewares/auth'); // Path to existing auth

router.post('/spin', auth, dailyRewardReset, rewardCtrl.spinWheel);
router.post('/scratch', auth, dailyRewardReset, rewardCtrl.scratchCard);
router.post('/watch-complete', auth, dailyRewardReset, rewardCtrl.watchComplete);
router.post('/exchange', auth, dailyRewardReset, rewardCtrl.exchangeCoins);
router.get('/referral/share-message', auth, dailyRewardReset, rewardCtrl.getReferralData);

module.exports = router;
