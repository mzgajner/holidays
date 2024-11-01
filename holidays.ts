import { HOLIDAY_DATE_STRINGS } from "./constants.ts";
import { plot } from "https://deno.land/x/chart/mod.ts";

const YEARS_TO_CALCULATE = 100;

const isWeekend = (date: Date) => [0, 6].includes(date.getDay());

let year = 2023;

let daysOffByYear: Record<number, number> = {};
let entireSum = 0;

for (let i = 0; i < YEARS_TO_CALCULATE; i++) {
  let dayOffCount = 1; // Easter Monday is always off
  entireSum++;

  HOLIDAY_DATE_STRINGS.forEach((dateString) => {
    const date = new Date(`${year}-${dateString}`);
    if (!isWeekend(date)) {
      dayOffCount++;
      entireSum++;
    }
  });

  daysOffByYear[year] = dayOffCount;
  year++;
}

// console.log(daysOffByYear);
console.log(`Average number of days off / year:
${entireSum / YEARS_TO_CALCULATE}

Days off / year from ${year - YEARS_TO_CALCULATE} to ${year - 1}:
${plot(Object.values(daysOffByYear))}`);
