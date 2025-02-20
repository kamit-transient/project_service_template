export function parseInterval(input: string): { days?: number; hours?: number; minutes?: number } {
    const regex = /(?:(\d+)\s*day[s]?)|(?:(\d+)\s*hour[s]?)|(?:(\d+)\s*minute[s]?)/gi;
    const matches = [...input.matchAll(regex)];

    let result: { days?: number; hours?: number; minutes?: number } = {};

    for (const match of matches) {
        if (match[1]) result.days = parseInt(match[1], 10);
        if (match[2]) result.hours = parseInt(match[2], 10);
        if (match[3]) result.minutes = parseInt(match[3], 10);
    }


    return result;
}

export function stringifyInterval(intervalObj: { days?: number; hours?: number; minutes?: number }) {
    // Define an array to hold the parts of the string.
    const parts = [];

    // For each key, if a value exists, add it to the parts array.
    if (intervalObj.days) {
        parts.push(`${intervalObj.days} ${intervalObj.days === 1 ? "day" : "days"}`);
    }
    if (intervalObj.hours) {
        parts.push(`${intervalObj.hours} ${intervalObj.hours === 1 ? "hour" : "hours"}`);
    }
    if (intervalObj.minutes) {
        parts.push(`${intervalObj.minutes} ${intervalObj.minutes === 1 ? "minute" : "minutes"}`);
    }

    // Join all parts with a space.
    return parts.join(" ");

}