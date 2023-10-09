import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbidden-error";
import { bookingsRepository, enrollmentRepository, ticketsRepository } from "@/repositories";
import { TicketStatus } from "@prisma/client";

async function getBookingUser(id: number) {
    const booking = await bookingsRepository.getBookingUser(id);
    if (!booking) throw notFoundError();

    return booking;
}


async function createBooking(roomId: number, userId: number) {
    if (!roomId) throw notFoundError();

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    const type = ticket.TicketType;

    if (ticket.status === TicketStatus.RESERVED || !type.includesHotel || type.isRemote) {
        throw forbiddenError();
    }

    const roomExists = await bookingsRepository.getRoom(roomId);
    if (!roomExists) throw notFoundError();
    if (roomExists.capacity === roomExists.Booking.length) throw forbiddenError();


    const booking = await bookingsRepository.createBooking(userId, roomId);
    if (!booking) throw notFoundError();

    return booking;
}


export const bookingsService = {
    getBookingUser,
    createBooking
};  