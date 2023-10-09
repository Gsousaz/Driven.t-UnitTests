import { ApplicationError } from '@/protocols';

export function forbiddenError(): ApplicationError {
    return {
        name: 'Forbidden',
        message: `You don't have the permission.`,
    };
}