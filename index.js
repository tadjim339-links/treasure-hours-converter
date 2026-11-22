"use strict";
// Treasure Hours sessions as listed on piratetokencalculator.com:
// two Saturday sessions, 11 AM-1 PM PT and 6-8 PM PT. Confirm the real schedule
// with the official Fortnite Status account before relying on it.
const SESSIONS_PT = [
  { name: "first", startHour: 11, endHour: 13 },
  { name: "second", startHour: 18, endHour: 20 },
];

// Find the UTC instant at which a wall-clock time happens in a given zone.
function zonedToUtc(y, m, d, hour, zone) {
  const guess = Date.UTC(y, m - 1, d, hour, 0, 0);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: zone, hourCycle: "h23", year: "numeric", month: "2-digit",
    day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = (t) => Object.fromEntries(fmt.formatToParts(new Date(t)).map((p) => [p.type, p.value]));
  const p = parts(guess);
  const asIfUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  const offset = asIfUtc - guess;
  return new Date(guess - offset);
}

function formatIn(date, zone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone, weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit", hourCycle: "h12",
  }).format(date);
}

// y, m (1-12), d: the Saturday in Pacific Time. zone: any IANA name.
function convertSessions(y, m, d, zone) {
  return SESSIONS_PT.map((s) => {
    const start = zonedToUtc(y, m, d, s.startHour, "America/Los_Angeles");
    const end = zonedToUtc(y, m, d, s.endHour, "America/Los_Angeles");
    return { name: s.name, startUtc: start.toISOString(), endUtc: end.toISOString(),
      start: formatIn(start, zone), end: formatIn(end, zone) };
  });
}

module.exports = { SESSIONS_PT, zonedToUtc, convertSessions, formatIn };

if (require.main === module) {
  const [date, zone = "UTC"] = process.argv.slice(2);
  if (!date) { console.log("usage: node index.js YYYY-MM-DD [IANA zone]"); process.exit(1); }
  const [y, m, d] = date.split("-").map(Number);
  for (const s of convertSessions(y, m, d, zone)) console.log(`${s.name}: ${s.start} -> ${s.end}`);
}
