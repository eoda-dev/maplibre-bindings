import mustache from "mustache";

function getTextFromFeature(feature: any, property: string | null, template: string | null) {
  if (template !== null) {
    return mustache.render(template, feature.properties);
  }

  if (property === null) {
    const text = Object.keys(feature.properties)
      .map((key) => `${key}: ${feature.properties[key]}`)
      .join("</br>");
    return text;
  }

  return feature.properties[property];
}

// Use build-in tooltip of Deck.GL
function getDeckTooltip(template: any) {
  const style = {
    background: "white",
    color: "black",
    "border-radius": "3px",
  };
  return ({ layer, object }: any) => {
    if (object) {
      const template_ =
        typeof template === "object" ? template[layer.id] : template;
      return (
        template_ && { html: mustache.render(template_, object), style: style }
      );
    }

    return null;
  };
}

// Use MapLibre Popup as tooltip for Deck.GL layers
function getDeckMapLibrePopupTooltip(map: any, tooltip: string) {
  const popup = new maplibregl.Popup({
    closeOnClick: false,
    closeButton: false,
  });
  map.on("mouseout", (e: any) => popup.remove());
  return ({ coordinate, object }: any) => {
    if (object) {
      // console.log(tooltip);
      popup.setHTML(mustache.render(tooltip, object)).setLngLat(coordinate);
      popup.addTo(map);
    } else popup.remove();
  };
}

function getViewState(map: any) {
  return {
    center: map.getCenter(),
    zoom: map.getZoom(),
    bounds: map.getBounds(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
  };
}

export {
  getTextFromFeature,
  getDeckTooltip,
  getDeckMapLibrePopupTooltip,
  getViewState,
};
