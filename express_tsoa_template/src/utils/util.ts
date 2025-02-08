import { BadRequestError } from "../exceptions/EntityException";

export function castStringToValue(input: string | null | undefined): any {

    // Trim whitespace for cleaner comparison
    const trimmedInput = input?.trim();

    if (input === null || input === undefined || !trimmedInput) {
        return input; // Return null or undefined as they are
    }

    // Handle specific string cases
    if (trimmedInput === '') {
        return null; // Treat empty strings as null
    }

    if (input === 'undefined') {
        return undefined;
    }
    if (input === 'null') {
        return null;
    }
    if (input === 'true') {
        return true;
    }
    if (input === 'false') {
        return false;
    }
    if (!isNaN(Number(input))) {
        return Number(input);
    }
    return input; // Return the original string if no match
}


export function getHostWithSubdomain(url: string) {
    if (!url) {
        throw new BadRequestError("Invalid url")
    }
    try {
        const parsedUrl = new URL(url);
        let host = parsedUrl.hostname;

        // Normalize `www.` to be the same as the naked domain
        if (host.startsWith("www.")) {
            host = host.slice(4); // Remove the `www.` prefix
        }

        return host;
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}