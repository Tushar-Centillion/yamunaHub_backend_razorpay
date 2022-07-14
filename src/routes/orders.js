import express from 'express';
import { OrderController } from '../controllers';
import { validator } from '../validation';
const router = express.Router();
router.post('/sendOrder', OrderController.post);
router.post('/payment', OrderController.payment);
module.exports = router;
