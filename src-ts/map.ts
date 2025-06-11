import type { AnyModel } from "@anywidget/types";

import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import mustache from "mustache";
import { Protocol, PMTiles } from "pmtiles";

import { jsonConverter, MapboxOverlay } from "./deck.gl";

// css
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

// @ts-expect-error
maplibregl.MapTilerGeocodingControl = GeocodingControl;

const customMethods = [
    "addControl",
    "addImage",
    "addTooltip",
    "addMapboxOverlay",
    "setCenterFromPMTiles",
    "fitBoundsFromPMTiles"
];

function createPopupDescription(feature: maplibregl.MapGeoJSONFeature, template?: string): string {
    const properties = feature.properties;
    if (template)
        return mustache.render(template, properties);

    return Object.keys(properties).map((key) => `${key}: ${properties[key]}`).join("</br>");
}

export default class MapWidget {
    _map: maplibregl.Map;
    _mapboxOverlay: MapboxOverlay | undefined;
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

    addTooltip(layerId: string, template?: string): void {
        const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false });

        this._map.on("mousemove", layerId, (e) => {
            // @ts-expect-error
            const feature = e.features[0];
            const description = createPopupDescription(feature, template);
            popup.setLngLat(e.lngLat).setHTML(description).addTo(this._map);
        });

        this._map.on("mouseleave", layerId, () => {
            popup.remove();
        });
    }

    addMapboxOverlay(layerDefs: any[]): void {
        const layers = layerDefs.map((json) => jsonConverter.convert(json));
        if (this._mapboxOverlay !== undefined) {
            console.log("Update layers");
            this._mapboxOverlay.setProps({ layers: layers });
            return
        }

        console.log("Create MapboxOverlay");
        this._mapboxOverlay = new MapboxOverlay({
            interleaved: true,
            layers: layers
        });
        this._map.addControl(this._mapboxOverlay);
    }

    setCenterFromPMTilesOld(url: string): void {
        const p = new PMTiles(url);
        p.getHeader().then(h => {
            this._map.setZoom(h.maxZoom - 2);
            this._map.setCenter([h.centerLon, h.centerLat]);
        });
    }

    async setCenterFromPMTiles(url: string, zoomOffset: number = 2): Promise<void> {
        const p = new PMTiles(url);
        const h = await p.getHeader();
        this._map.setZoom(h.maxZoom - zoomOffset);
        this._map.setCenter([h.centerLon, h.centerLat]);
    }

    fitBoundsFromPMTiles(url: string): void {
        const p = new PMTiles(url);
        p.getHeader().then((h) => {
            const bounds = [h.minLon, h.minLat, h.maxLon, h.maxLat] as maplibregl.LngLatBoundsLike;
            // console.log(bounds);
            this._map.fitBounds(bounds);
        });

        // p.getMetadata().then((md) => console.log(md));
    }
}
