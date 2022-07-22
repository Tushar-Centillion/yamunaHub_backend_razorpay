import express from 'express';
import { RefundController } from '../controllers';
import { validator } from '../validation';
const router = express.Router();
router.post('/CreateRefundProcess', RefundController.CreateRefund);
router.post('/getByidRefund', RefundController.getByidRefund);
router.post('/CreateShiping', RefundController.CreateShiping);
router.post('/GetShiping', RefundController.GetShiping);
module.exports = router;
