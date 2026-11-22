# treasure-hours-converter

A zero-dependency Node.js helper that turns the two Saturday Fortnite Treasure Hours sessions into your own time zone, using only the built-in `Intl` API.

Treasure Hours are listed in Pacific Time: a first session at 11 AM to 1 PM PT and a second at 6 PM to 8 PM PT. The second session ends after midnight UTC, and for players east of Europe it lands on Sunday, which is easy to get wrong by hand. This script does the arithmetic for any IANA zone name and handles daylight saving correctly for the date you give it.

## Use

```bash
node index.js 2026-11-28 Europe/London
# first: Sat, Nov 28, 7:00 PM -> Sat, Nov 28, 9:00 PM
# second: Sun, Nov 29, 2:00 AM -> Sun, Nov 29, 4:00 AM

node index.js 2026-11-28 America/New_York
# first: Sat, Nov 28, 2:00 PM -> Sat, Nov 28, 4:00 PM
# second: Sat, Nov 28, 9:00 PM -> Sat, Nov 28, 11:00 PM
```

As a module:

```js
const { convertSessions } = require("./index");
convertSessions(2026, 11, 21, "Asia/Tokyo");
```

Run the tests with `npm test`.

## Caveats

- The session hours are the ones listed on the [Pirate Token odds and Treasure Hours page](https://piratetokencalculator.com/?utm_source=github&utm_medium=readme); later Saturdays were listed as expected rather than confirmed, so check the official Fortnite Status account on the day.
- This is an unofficial fan tool and is not affiliated with or endorsed by Epic Games.
- Interested in what the drop rate means in practice? See the write-up on whether the token was nerfed: piratetokencalculator.com/was-pirate-token-nerfed/

License: MIT
