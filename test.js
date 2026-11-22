const assert = require("assert");
const { convertSessions, zonedToUtc } = require("./index");
// 21 Nov 2026 is after US daylight saving ended (1 Nov), so PT = UTC-8, ET = UTC-5.
const s = convertSessions(2026, 11, 21, "America/New_York");
assert.strictEqual(s[0].startUtc, "2026-11-21T19:00:00.000Z");
assert.strictEqual(s[0].endUtc, "2026-11-21T21:00:00.000Z");
assert.ok(s[0].start.includes("2:00 PM") && s[0].end.includes("4:00 PM"));
assert.ok(s[1].start.includes("9:00 PM") && s[1].end.includes("11:00 PM"));
// second session crosses midnight UTC
assert.strictEqual(s[1].startUtc, "2026-11-22T02:00:00.000Z");
// a zone ahead of PT rolls into Sunday
const t = convertSessions(2026, 11, 21, "Asia/Tokyo");
assert.ok(t[1].start.startsWith("Sun"));
assert.strictEqual(zonedToUtc(2026, 11, 21, 11, "America/Los_Angeles").toISOString(), "2026-11-21T19:00:00.000Z");
console.log("ok");
