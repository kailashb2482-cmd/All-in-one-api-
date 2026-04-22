// Add these lines to your main app file
const rewardRoutes = require('./routes/rewardRoutes');
const adRoutes = require('./routes/adRoutes');

app.use('/api/rewards', rewardRoutes);
app.use('/api/ads', adRoutes);
