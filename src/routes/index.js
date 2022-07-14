import express from 'express';
const router = express.Router();

router.use('/orders', require('./orders'));
router.use('/refunds', require('./refunds'));
module.exports = router;
