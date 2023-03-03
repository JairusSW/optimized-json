import * as bench from "benny";
import * as OptJSON from "./index.js";

const arr = [3.5, 12.3, 4.2];
const vec = {
    x: 3.5,
    y: 12.3,
    z: 4.2
}
bench.suite(
    "Optimized JSON",

    bench.add("Optimized Serialize String", () => {
        OptJSON.stringify("Hello World");
    }),
    bench.add("JSON Serialize String", () => {
        JSON.stringify("Hello World");
    }),
/*
    bench.add("Optimized Serialize Array", () => {
        OptJSON.stringify(arr);
    }),
    bench.add("JSON Serialize Array", () => {
        JSON.stringify(arr);
    }),

    bench.add("Optimized Serialize Vec3", () => {
        OptJSON.compileObject(vec);
    }),
    bench.add("JSON Serialize Vec3", () => {
        JSON.stringify(vec);
    }),

    bench.add("Optimized Serialize Float", () => {
        OptJSON.stringify(3.14);
    }),
    bench.add("JSON Serialize Float", () => {
        JSON.stringify(3.14);
    }),

    bench.add("Optimized Serialize Boolean", () => {
        OptJSON.stringify(true);
    }),

    bench.add("JSON Serialize Boolean", () => {
        JSON.stringify(true);
    }),
*/
    bench.cycle(),
    bench.complete(),
    bench.save({ file: "json", version: "1.0.0" }),
    bench.save({ file: "json", format: "chart.html" }),
)