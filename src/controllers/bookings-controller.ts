import { AuthenticatedRequest } from "@/middlewares";
import { bookingsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

async function showBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    const searchedBooking = await bookingsService.getBookingUser(userId);
    res.status(httpStatus.OK).send(searchedBooking);
}


export async function createBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body;

    const booking = await bookingsService.createBooking(roomId, userId);
    res.status(httpStatus.OK).json({ bookingId: booking.id });
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const bookingId = req.params.bookingId;
    const { roomId } = req.body;

    const bookingUpdated = await bookingsService.updateBooking(userId, Number(bookingId), roomId);
    res.status(httpStatus.OK).json({ bookingId: bookingUpdated.id });
}

export const bookingsController = {
    showBooking,
    createBooking,
    updateBooking,
};