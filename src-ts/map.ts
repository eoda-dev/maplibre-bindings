import type { AnyModel } from "@anywidget/types";

import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";

// css
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";

// @ts-expect-error
maplibregl.MapTilerGeocodingControl = GeocodingControl;

const customMethods = [
    "addControl",
    "addImage",
    "addTooltip"
];

export default class MapWidget {
    _map: maplibregl.Map;
    _model: AnyModel | undefined;

    constructor(mapElement: HTMLElement, mapOptions: maplibregl.MapOptions, model?: AnyModel) {
        this._model = model;

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

    async addImage(id: string, url: string, options?: any): Promise<void> {
        // url = 'https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png';
        const image = await this._map.loadImage(url);
        this._map.addImage(id, image.data, options);
    }

    addTooltip(): void {
        console.log("addTooltip NOT IMPLEMENTED YET");
    }
}
