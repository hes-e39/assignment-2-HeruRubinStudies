//formats numbers like 01, 02, 03, 04... for that sci-fi aesthetic
export function formatTimerNumber(index: number): string {
    return index < 10 ? `0${index}` : `${index}`;
}
