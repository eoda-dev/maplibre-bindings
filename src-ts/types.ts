const maplibregl = (window as any).maplibregl;
const deck = (window as any).deck;
const MapboxDraw = (window as any).MapboxDraw;
const Shiny = (window as any).Shiny;
const HTMLWidgets = (window as any).HTMLWidgets;

type MapOptions = {
  container: string;
};

type MapData = {
  mapOptions: MapOptions;
  calls: [string, any][];
};

type Payload = {
  mapData: MapData;
};

type Popup = {
  text: string;
  options: object;
};

// Custom controls
type InfoBoxControlOptions = {
  cssText: string;
  content: string;
}
