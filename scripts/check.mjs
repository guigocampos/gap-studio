import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { services, results, cycleIndex } from "../src/content.js";
import { createBookingMessage } from "../src/booking.js";
assert.equal(cycleIndex(0, -1, 4), 3);
assert.equal(cycleIndex(3, 1, 4), 0);
assert.equal(results.length, 4);
assert.equal(services.unhas.items.length, 2);
const bookingMessage = createBookingMessage({
  name: " Ana ",
  area: "Pedicure",
  procedure: " Pedicure ",
  date: "2030-08-20",
  period: "Tarde",
  observations: "  Primeira visita  ",
});
assert.match(bookingMessage, /Nome: Ana/);
assert.match(bookingMessage, /Dia de preferência: 20\/08\/2030/);
assert.match(bookingMessage, /Observações: Primeira visita/);
assert.doesNotMatch(
  createBookingMessage({
    name: "Ana",
    area: "Cabelos",
    procedure: "Corte",
    date: "2030-08-20",
    period: "Manhã",
    observations: " ",
  }),
  /Observações:/,
);
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
assert.match(html, /id="booking-form"/);
assert.match(html, /data-booking-open/);
assert.match(html, /https:\/\/wa.me\/5513991201050/);
assert.equal((html.match(/<details>/g) || []).length, 5);
assert.match(html, /id="perguntas"/);
assert.equal((html.match(/class="review-card"/g) || []).length, 2);
assert.match(html, /132 avaliações no Google/);
assert.match(html, /id="depoimentos"/);
assert.match(html, /\/images\/gap-interior\.jpg/);
for (const [, path] of html.matchAll(/(?:src|href)="(\/images\/[^" ]+)"/g))
  assert.ok(existsSync(`public${path}`), `Missing ${path}`);
for (const result of results)
  assert.ok(existsSync(`public/images/${result.image}.webp`));
for (const [, id] of html.matchAll(/href="#([^" ]+)"/g))
  assert.ok(html.includes(`id="${id}"`), `Missing anchor ${id}`);
console.log(
  "OK: booking message, carousel, 4 areas, testimonials, FAQ, salon photo, schema, indexing, assets and anchors.",
);
