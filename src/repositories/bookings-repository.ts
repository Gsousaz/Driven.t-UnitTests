import { prisma } from "@/config";

async function getBookingUser(id: number) {
    const booking = await prisma.booking.findFirst({
        where: { id },
        include: { Room: true },
    });

    return booking;
}

async function getRoom(roomId: number) {
    return await prisma.room.findFirst({
        where: { id: roomId },
        include: { Booking: true },
    });
}


async function createBooking(userId: number, roomId: number) {
    return await prisma.booking.create({
        data: {
            userId,
            roomId,
        },
        include: { Room: true },
    });
}


async function updateBooking(bookingId: number, roomId: number) {
    return await prisma.booking.update({
        where: { id: bookingId },
        data: {
            roomId: roomId,
        },
        include: { Room: true },
    });
}


export const bookingsRepository = {
    getBookingUser,
    getRoom,
    createBooking,
    updateBooking
};