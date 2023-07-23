export function relative(date) {
    //return relative time using Intl.RelativeTimeFormat
    if (!date) return;
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const unit = {};
    unit.year = 1000 * 60 * 60 * 24 * 365;
    unit.month = 1000 * 60 * 60 * 24 * 30;
    unit.week = 1000 * 60 * 60 * 24 * 7;
    unit.day = 1000 * 60 * 60 * 24;
    unit.hour = 1000 * 60 * 60;
    unit.minute = 1000 * 60;
    unit.second = 1000;
    const rtf = new Intl.RelativeTimeFormat("en", {numeric: "auto"});
    for (const u in unit) {
        if (Math.abs(diff) > unit[u] || u === "second") {
            return rtf.format(-Math.round(diff / unit[u]), u);
        }
    }
}

export function humanizeDate(date) {
    //return humanized time using Intl.DateTimeFormat ex. Aug 12, 2020
    if (!date) return;
    const d = new Date(date);
    return d.toLocaleDateString(
        'en-gb',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'utc'
        });


}

//export both functions
export default {relative, humanizeDate};
