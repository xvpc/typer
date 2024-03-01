export default function FormatTime(sec: number): string {
    const roundedSeconds = Math.max(sec, 0); 
    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const seconds = roundedSeconds % 60;

    return `${hours ? hours.toString().padStart(2, '0') + ":" : ""}${minutes.toString().padStart(2, '0') + ":"}${seconds.toString().padStart(2, '0')}`;
}
