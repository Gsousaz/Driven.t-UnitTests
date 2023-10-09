import { notFoundError } from "@/errors";
import { bookingsRepository } from "@/repositories";

async function getBookingUser(id: number) {
    const booking = await bookingsRepository.getBookingUser(id);
    if (!booking) throw notFoundError();

    return booking;

}


export const bookingsService = {
    getBookingUser
};  