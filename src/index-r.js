import PyMapLibreGL from "./pymaplibregl";
const MapLibreWidget = PyMapLibreGL;

function mapLibreFactory(widgetElement, width, height) {
  let map = null;

  function renderValue(widgetData) {
    console.log(widgetData);
    widgetData.mapOptions.container = widgetElement.id;
    const mapLibreWidget = new MapLibreWidget(widgetData.mapOptions);
    const map = mapLibreWidget.getMap();
    map.on("load", () => {
      mapLibreWidget.render(widgetData.calls);
    });
  }

  if (typeof Shiny !== "undefined") {
    const messageHandlerName = `maplibre-${el.id}`;
    console.log(messageHandlerName);
    Shiny.addCustomMessageHandler(messageHandlerName, ({ id, calls }) => {
      console.log(id, calls);
      mapLibreWidget.render(calls);
    });
  }

  function resize(width, height) {
    // not implemented yet
  }

  return { renderValue, resize };
}

HTMLWidgets.widget({
  name: "maplibre",
  type: "output",
  factory: mapLibreFactory,
});
