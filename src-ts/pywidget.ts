import { Protocol } from "pmtiles";
let protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

// Add custom controls

import InfoBoxControl from "./custom-controls/info-box";
maplibregl.InfoBoxControl = InfoBoxControl;
/*
import LayerSwitcherControl from "./custom-controls/layer-switcher";
maplibregl.LayerSwitcherControl = LayerSwitcherControl;
*/

import {
  getTextFromFeature,
  getDeckTooltip,
  getDeckMapLibrePopupTooltip,
} from "./utils";

function getJSONConverter() {
  if (typeof deck === "undefined") {
    return;
  }

  const configuration = new deck.JSONConfiguration({ classes: deck });
  return new deck.JSONConverter({ configuration });
}

// MapboxDraw must be imported before this one
if (typeof MapboxDraw !== "undefined") {
  MapboxDraw.constants.classes.CONTROL_BASE = "maplibregl-ctrl";
  MapboxDraw.constants.classes.CONTROL_PREFIX = "maplibregl-ctrl-";
  MapboxDraw.constants.classes.CONTROL_GROUP = "maplibregl-ctrl-group";
}

// TODO: Rename to 'MapLibreWidget'
export default class MapWidget {
  _id: string;
  _map: any;
  _JSONConverter: any;
  _deckOverlay: any;

  constructor(mapOptions: MapOptions) {
    this._id = mapOptions.container;
    this._map = new maplibregl.Map(mapOptions);

    this._map.on("mouseover", () => {
      this._map.getCanvas().style.cursor = "pointer";
    });

    this._map.on("mouseout", () => {
      this._map.getCanvas().style.cursor = "";
    });

    this._JSONConverter = getJSONConverter();
  }

  getMap() {
    return this._map;
  }

  applyMapMethod(name: string, params: []) {
    this._map[name](...params);
  }

  addControl(type: string, options: object, position: string) {
    this._map.addControl(new maplibregl[type](options), position);
  }

  addMarker({ lngLat, popup, options }: { lngLat: any, popup: Popup, options: object }) {
    const marker = new maplibregl.Marker(options).setLngLat(lngLat);
    if (popup) {
      const popup_ = new maplibregl.Popup(popup.options).setHTML(popup.text);
      marker.setPopup(popup_);
    }
    marker.addTo(this._map);
  }

  addLayer(layer: any, beforeId: string) {
    this._map.addLayer(layer, beforeId);

    // Add event listener
    if (typeof Shiny !== "undefined") {
      this._map.on("click", layer.id, (e: any) => {
        console.log(e, e.features[0]);
        const inputName = `${this._id}_feature_clicked`;
        const feature = {
          props: e.features[0].properties,
          layer_id: layer.id,
        };
        console.log(inputName, feature);
        Shiny.onInputChange(inputName, feature);
      });
    }
  }

  addPopup(layerId: string, property: string | null = null, template: string | null = null) {
    const popupOptions = {
      closeButton: false,
    };
    const popup = new maplibregl.Popup(popupOptions);
    this._map.on("click", layerId, (e: any) => {
      const feature = e.features[0];
      // const text = feature.properties[property];
      const text = getTextFromFeature(feature, property, template);
      popup.setLngLat(e.lngLat).setHTML(text).addTo(this._map);
    });
  }

  addTooltip(layerId: string, property: string | null = null, template: string | null = null) {
    const popupOptions = {
      closeButton: false,
      closeOnClick: false,
    };
    const popup = new maplibregl.Popup(popupOptions);
    this._map.on("mousemove", layerId, (e: any) => {
      const feature = e.features[0];
      const text = getTextFromFeature(feature, property, template);
      popup.setLngLat(e.lngLat).setHTML(text).addTo(this._map);
    });

    this._map.on("mouseleave", layerId, () => {
      popup.remove();
    });
  }

  setSourceData(sourceId: string, data: object) {
    this._map.getSource(sourceId).setData(data);
  }

  addDeckOverlay(deckLayers: [], tooltip: any = null) {
    if (typeof this._JSONConverter === "undefined") {
      console.log("deck or JSONConverter is undefined");
      return;
    }

    const layers = this._convertDeckLayers(deckLayers, tooltip);
    this._deckOverlay = new deck.MapboxOverlay({
      interleaved: true,
      layers: layers,
      // getTooltip: tooltip ? getDeckTooltip(tooltip) : null,
    });
    this._map.addControl(this._deckOverlay);
  }

  _convertDeckLayers(deckLayers: [], tooltip: any = null) {
    return deckLayers.map((deckLayer: any) => {
      const tooltip_ =
        tooltip && typeof tooltip === "object"
          ? tooltip[deckLayer.id]
          : tooltip;
      const getTooltip = getDeckMapLibrePopupTooltip(this._map, tooltip_);
      deckLayer.onHover = ({ layer, coordinate, object }: any) => {
        if (tooltip_) getTooltip({ coordinate, object });

        // Add event listener
        if (typeof Shiny !== "undefined") {
          const inputName = `${this._id}_layer_${deckLayer.id}`;
          Shiny.onInputChange(inputName, object);
        }
      };
      return this._JSONConverter.convert(deckLayer);
    });
  }

  setDeckLayers(deckLayers: [], tooltip: any = null) {
    console.log("Updating Deck.GL layers");
    const layers = this._convertDeckLayers(deckLayers, tooltip);
    this._deckOverlay.setProps({ layers });
  }

  addMapboxDraw(options: object, position: string, geojson: object | null = null) {
    const draw = new MapboxDraw(options);
    this._map.addControl(draw, position);
    if (geojson) draw.add(geojson);

    // Add event listeners
    if (typeof Shiny !== "undefined") {
      this._map.on("draw.selectionchange", (e: any) => {
        const inputName = `${this._id}_draw_features_selected`;
        const object = { features: e.features, random: Math.random() };
        console.log(inputName, object);
        Shiny.onInputChange(inputName, object);
      });

      this._map.on("draw.create", (e: any) => {
        const inputName = `${this._id}_draw_features_created`;
        Shiny.onInputChange(inputName, { features: e.features });
      });

      this._map.on("draw.delete", (e: any) => {
        const inputName = `${this._id}_draw_features_deleted`;
        Shiny.onInputChange(inputName, { features: e.features });
      });

      this._map.on("draw.update", (e: any) => {
        const inputName = `${this._id}_draw_features_updated`;
        Shiny.onInputChange(inputName, { features: e.features });
      });
    }
  }

  render(calls: [string, any][]) {
    calls.forEach(([name, params]: [name: string, params: []]) => {
      // Custom method
      if (
        [
          "addLayer",
          "addPopup",
          "addTooltip",
          "addMarker",
          "addPopup",
          "addControl",
          "setSourceData",
          "addDeckOverlay",
          "setDeckLayers",
          "addMapboxDraw",
        ].includes(name)
      ) {
        console.log("Custom method", name, params);

        // @ts-expect-error
        this[name](...params);

        return;
      }

      console.log("Map method", name);

      // this._map[name](...params);
      this.applyMapMethod(name, params);
    });
  }
}
