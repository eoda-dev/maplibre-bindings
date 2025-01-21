import MapWidget from "./pywidget";
import { getViewState } from "./utils";

const version = "0.2.7";
console.log("py-maplibregl-bindings", version);

if (typeof Shiny === "undefined") {
    (window as any).pymaplibregl = function ({ mapOptions, calls }: { mapOptions: MapOptions, calls: [string, any][] }) {
        // TODO: make id a parameter
        const id = "pymaplibregl";
        const container = document.getElementById(id);
        const mapWidget = new MapWidget(
            Object.assign({ container: container?.id }, mapOptions),
        );
        const map = mapWidget.getMap();
        map.on("load", () => {
            mapWidget.render(calls);
        });
    };
}

if (typeof Shiny !== "undefined") {
    class MapLibreGLOutputBinding extends Shiny.OutputBinding {
        find(scope: any) {
            return scope.find(".shiny-maplibregl-output");
        }

        renderValue(el: HTMLElement, payload: Payload) {
            console.log("id:", el.id, "payload:", payload);
            const pyMapLibreGL = ((window as any)._maplibreWidget = new MapWidget(
                Object.assign({ container: el.id }, payload.mapData.mapOptions),
            ));

            const map = pyMapLibreGL.getMap();
            map.on("load", () => {
                pyMapLibreGL.render(payload.mapData.calls);
            });

            // Add event listeners, TODO: Move to separate file 
            map.on("click", (e: any) => {
                const inputName = `${el.id}_clicked`;
                const data = { coords: e.lngLat, point: e.point };
                // console.log(inputName, data);
                Shiny.onInputChange(inputName, data);
            });

            for (const event of ["load", "zoomend", "moveend"]) {
                map.on(event, (e: any) => {
                    const inputName = `${el.id}_view_state`;
                    Shiny.onInputChange(inputName, getViewState(map));
                });
            }

            const messageHandlerName = `pymaplibregl-${el.id}`;
            console.log(messageHandlerName);
            Shiny.addCustomMessageHandler(messageHandlerName, ({ id, calls }: { id: string, calls: [string, any][] }) => {
                console.log(id, calls);
                pyMapLibreGL.render(calls);
            });
        }
    }

    Shiny.outputBindings.register(
        new MapLibreGLOutputBinding(),
        "shiny-maplibregl-output",
    );
}
