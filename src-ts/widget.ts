import type { AnyModel } from "@anywidget/types";

import MapWidget from "./map";

function render({ model, el }: { model: AnyModel; el: HTMLElement }): void {
    // --- Main
    console.log("Welcome to maplibre-anywidget v2", el);

    const height = model.get("height") || "400px";
    const mapElement = document.createElement("div");
    mapElement.id = "maplibre-anywidget";
    mapElement.style.height = height;
    mapElement.style.width = "100%";

    el.appendChild(mapElement);

    const mapOptions = model.get("map_options") as maplibregl.MapOptions;
    const mapWidget = (window as any).anywidgetMapWidget = new MapWidget(mapElement, mapOptions, model);

    const map = mapWidget.getMap();

    const getCalls = (): any[][] => model.get("calls");
    const getMsg = (): any[] => model.get("msg");

    model.on("change:msg", () => {
        const call = getMsg();
        console.log("run", call);
        const [method_name, args] = call;
        mapWidget.executeCall(method_name, args);
    });

    /*
    map.once("load", () => {
        map.resize();
    });
    */

    map.on("load", () => {
        console.log("map loaded");
        map.resize();
        //model.set("load", true);
        //model.save_changes();

        for (let call of getCalls()) {
            console.log("init call", call);
            const [method_name, args] = call;
            mapWidget.executeCall(method_name, args);
        }

        model.set("load", true);
        model.save_changes();

    });

    /*
    model.on("msg:custom", (msg: any) => {
        console.log("thanx for your message", msg);

        try {
            for (let call of msg.calls) {
                const [method_name, args] = call;
                mapWidget.executeCall(method_name, args);
            }
        } catch (error) {
            console.log("error in anywidget msg call", error);
        }
    });
    */

    // el.appendChild(mapElement);
}

export default { render };
