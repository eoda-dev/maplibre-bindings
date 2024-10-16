#!/bin/sh
branch=${1:-dev}
curl -O https://raw.githubusercontent.com/eodaGmbH/maplibre-bindings/${branch}/r-bindings/rmaplibre.js
curl -O https://raw.githubusercontent.com/eodaGmbH/maplibre-bindings/${branch}/r-bindings/rmaplibre.css

