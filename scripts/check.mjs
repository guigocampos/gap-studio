import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { services, results, cycleIndex } from "../src/content.js";
assert.equal(cycleIndex(0, -1, 4), 3);
assert.equal(cycleIndex(3, 1, 4), 0);
assert.equal(results.length, 4);
assert.equal(services.unhas.items.length, 2);
const html = readFileSync("index.html", "utf8");
assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
assert.match(html, /noindex, nofollow/);
assert.match(readFileSync("public/robots.txt", "utf8"), /Disallow: \//);
const schema = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
);
assert.equal(schema["@type"], "BeautySalon");
assert.equal(schema.telephone, "+55-13-99120-1050");
assert.ok(!schema.aggregateRating);
assert.match(html, /https:\/\/wa.me\/5513991201050/);
for (const [, path] of html.matchAll(/(?:src|href)="(\/images\/[^" ]+)"/g))
  assert.ok(existsSync(`public${path}`), `Missing ${path}`);
for (const result of results)
  assert.ok(existsSync(`public/images/${result.image}.webp`));
for (const [, id] of html.matchAll(/href="#([^" ]+)"/g))
  assert.ok(html.includes(`id="${id}"`), `Missing anchor ${id}`);
console.log(
  "OK: carousel wrapping, 4 areas, unique H1, schema, indexing blocked, assets and anchors.",
);
