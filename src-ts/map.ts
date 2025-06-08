import type { AnyModel } from "@anywidget/types";

import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";

// css
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";

// @ts-expect-error
maplibregl.MapTilerGeocodingControl = GeocodingControl;

const customMethods = [
    "addControl"
];

export default class MapWidget {
    // _mapElement: HTMLElement;
    _map: maplibregl.Map;
    _model: AnyModel | undefined;

    constructor(mapElement: HTMLElement, mapOptions: maplibregl.MapOptions, model?: AnyModel) {
        this._model = model;

        // this._mapElement = mapElement;
        mapOptions.container = mapElement;
        this._map = new maplibregl.Map(mapOptions);
    }

    getMap(): maplibregl.Map {
        return this._map;
    }

    getElement(): HTMLElement {
        return this._map.getContainer();
    }

    getAnywidgetModel(): AnyModel | undefined {
        return this._model;
    }

    executeCall(method_name: string, args: any): void {
        if (customMethods.includes(method_name)) {
            // @ts-expect-error
            this[method_name](...args);
            return;
        }

        // @ts-expect-error
        if (this._map[method_name] instanceof Function) {
            // @ts-expect-error
            this._map[method_name](...args);
            return;
        }

        console.log("NOT IMPLEMENTED");
    }

    addControl(
        type: string,
        options: any,
        position: maplibregl.ControlPosition,
    ): void {
        // @ts-expect-error
        this._map.addControl(new maplibregl[type](options), position);
    }
}
