import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookingsController } from '@/controllers/bookings-controller';
import { createBookingSchema } from '@/schemas/booking-schemas';
const bookingsRouter = Router();

bookingsRouter
    .all('/*', authenticateToken)
    .get('/', bookingsController.showBooking)
    .post('/', validateBody(createBookingSchema), bookingsController.createBooking)
    .put('/:bookingId');

export { bookingsRouter };