import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookingsController } from '@/controllers/bookings-controller';
const bookingsRouter = Router();

bookingsRouter
    .all('/*', authenticateToken)
    .get('/', bookingsController.showBooking)
    .post('/',)
    .put('/:bookingId');

export { bookingsRouter };