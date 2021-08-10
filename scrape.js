/* 

I want to scrape from SOS but I also don't want to abuse all their servers.

1. Call the main getLocByBounds
2. Save that output
3. Now for all the ids, save the JSONs
4. Save that, and distribute it one time.

*/
const fs = require("fs");
const fetch = require("node-fetch");
const { chunkPromise, PromiseFlavor } = require("chunk-promise");

const parentData = require("./sos-get-loc.json");
const allIds = parentData.map((d) => d._id);
const BATCH_SIZE = 100;
console.log(`okay, fetching ${allIds.length} records, 100 at a time`);

const promises = allIds.map(
  (id) => () =>
    fetch(`https://sosmap.net/api/posts/${id}`).then((y) => {
      process.stdout.write(".");
      return y.json();
    })
);

console.log(promises);

chunkPromise(promises, {
  concurrent: BATCH_SIZE,
  promiseFlavor: PromiseFlavor.PromiseAll,
  sleepMs: 2000,
}).then((values) => {
  const filename = `data-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(values));
  console.log(`Done writing to ${filename}`);
});
