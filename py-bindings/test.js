// python3 -m http.server

"use strict";

const CARTO_THEME = "dark-matter";

console.log("test");

const layer = {

};

const mapData = {
    mapOptions: {
        style: `https://basemaps.cartocdn.com/gl/${CARTO_THEME}-gl-style/style.json`,
        center: [-87.61694, 41.86625],
        zoom: 17,
        pitch: 40,
        bearing: 20,
        antialias: true,
    },
    calls: [
        ["flyTo", [{ "center": [-87.61694, 41.7] }]],
        ["addControl", ["InfoBoxControl", { content: "Hi there!", cssText: "background: yellow; padding: 20px; color: blue;" }, "top-left"]]
    ]
};

pymaplibregl(mapData);
