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