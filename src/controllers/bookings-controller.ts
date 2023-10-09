import { AuthenticatedRequest } from "@/middlewares";
import { bookingsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

async function showBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    const showBooking = await bookingsService.getBookingUser(userId);

    return res.status(httpStatus.OK).send(showBooking);
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  const booking = await bookingsService.createBooking(roomId, userId);
  res.status(httpStatus.OK).json({ bookingId: booking.id });
}  

  export const bookingsController = {
    showBooking,
    createBooking
};