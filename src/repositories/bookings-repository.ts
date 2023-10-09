import { prisma } from "@/config";

async function getBookingUser(id: number) {
    const booking =  await prisma.booking.findFirst({
        where: { id },
        include: { Room: true },
    });

    return booking;

}


export const bookingsRepository = {
    getBookingUser
};  