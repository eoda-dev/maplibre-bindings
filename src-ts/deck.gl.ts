import { MapboxOverlay } from "@deck.gl/mapbox";
import { JSONConfiguration, JSONConverter } from "@deck.gl/json";

import * as layers from "@deck.gl/layers";
import * as aggregationLayers from "@deck.gl/aggregation-layers";
import * as geoLayers from "@deck.gl/geo-layers";

const layerCatalog = { ...layers, ...aggregationLayers, ...geoLayers };

const jsonConfiguration = new JSONConfiguration({
    layers: layerCatalog
});

const jsonConverter = new JSONConverter({
    configuration: jsonConfiguration
});

export { jsonConverter, MapboxOverlay };
