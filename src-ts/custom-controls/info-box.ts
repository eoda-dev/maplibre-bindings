export default class InfoBoxControl {
  _container: HTMLElement | null = null;
  _options: InfoBoxControlOptions;
  _map: any;

  constructor(options: InfoBoxControlOptions) {
    this._options = options || {};
  }

  onAdd(map: any) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this._container.style.cssText = this._options.cssText || "padding: 10px;";
    this._container.innerHTML = this._options.content || "We out here.";
    return this._container;
  }

  onRemove() {
    // @ts-expect-error
    this._container.parentNode.removeChild(this._container);

    this._map = undefined;
  }
}
