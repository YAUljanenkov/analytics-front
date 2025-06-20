const MONTHS = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

export function parseDayNumber(dayNumber: number): string {
    if (dayNumber < 0 || dayNumber > 365) {
        throw new RangeError('dayNumber must be between 0 and 365');
    }
    const date = new Date(2025, 0, 1);
    date.setDate(date.getDate() + dayNumber);
    const day = date.getDate();
    const month = date.getMonth();
    return `${day} ${MONTHS[month]}`;
}
