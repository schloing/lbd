import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(date: Date): string {
    return `${format(date, 'yyyy-MM-dd')} (${formatDistanceToNow(date, { addSuffix: true })})`;
}