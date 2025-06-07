import * as geolayers from "@deck.gl/geo-layers";


import { AnyModel } from "@anywidget/types";

import maplibregl from "maplibre-gl";

import { Protocol } from "pmtiles";

// import * as deckLayerCatalog from "./deck-layers";

import * as layers from "@deck.gl/layers";
import * as agglayers from "@deck.gl/aggregation-layers";

import MapboxDraw from "@mapbox/mapbox-gl-draw";

import { MapboxOverlay } from "@deck.gl/mapbox";
import { JSONConfiguration, JSONConverter } from "@deck.gl/json";


async function render({ model, el }: { model: any; el: HTMLElement }) {
    console.log("anywidget", "render", maplibregl, Protocol
        , layers
        , agglayers
        , geolayers
        , MapboxDraw
        , MapboxOverlay
        , JSONConverter, JSONConfiguration
    );//, geolayers);

    const myContainer = document.createElement("div");
    myContainer.innerHTML = "MAPLIBRE!";
    el.appendChild(myContainer);
}

export default { render };