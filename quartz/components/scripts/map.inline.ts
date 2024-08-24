import {
  CRS,
  DivIcon,
  divIcon,
  imageOverlay,
  LatLngBoundsExpression,
  LeafletMouseEvent,
  LeafletMouseEventHandlerFn,
  Map,
  map,
  marker,
  MarkerOptions,
} from "leaflet";

const MAP_ID = "leaflet-map";
const MARKER_SELECTOR = "div.marker";

interface MarkerDataSet {
  name: string;
  link: string;
  posX: string;
  posY: string;
  icon: string;
  colour: string;
}

function buildIcon(icon: string, colour: string): DivIcon {
  return divIcon({
    className: "custom-div-icon",
    html: `
      <svg class='marker ${colour}' width="32" height="48" version="1.1" viewBox="0 0 233.29 349.94"">
        <g transform="matrix(.75581 0 0 .75 -59.677 -.00049655)">
          <path d="m233.29 0c-85.1 0-154.33 69.234-154.33 154.33 0 34.275 21.887 90.155 66.908 170.83 31.846 57.063 63.168 104.64 64.484 106.64l22.942 34.775 22.941-34.774c1.317-1.998 32.641-49.577 64.483-106.64 45.023-80.68 66.908-136.56 66.908-170.83 1e-3 -85.1-69.233-154.33-154.33-154.33z"/>
        </g>
      </svg>
      <img class='icon' src='../static/markers/${icon}.svg'>
    `,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    tooltipAnchor: [17, -36],
  });
}

function getMarkerOnClick(url: string): LeafletMouseEventHandlerFn {
  return (_event: LeafletMouseEvent) => {
    window.location.href = `${url}`;
  };
}

function addMarker(markerData: MarkerDataSet, mapItem: Map): void {
  const options: MarkerOptions = {
    icon: buildIcon(markerData.icon, markerData.colour),
  };

  // eslint-disable-next-line
  marker([parseInt(markerData.posY), parseInt(markerData.posX)], options)
    .bindTooltip(markerData.name)
    .on("click", getMarkerOnClick(markerData.link))
    .addTo(mapItem);
}

function isMarkerDataSet(dataset: any): dataset is MarkerDataSet {
  if (
    !dataset["name"] ||
    !dataset["link"] ||
    !dataset["posX"] ||
    !dataset["posY"] ||
    !dataset["icon"] ||
    !dataset["colour"]
  ) {
    return false;
  }
  return true;
}

function getMarkerData(markers: NodeListOf<HTMLElement>): MarkerDataSet[] {
  const data: MarkerDataSet[] = [];
  for (const marker of markers) {
    if (isMarkerDataSet(marker.dataset)) {
      data.push(marker.dataset);
    }
    marker.remove();
  }
  return data;
}

function initialiseMap(mapElement: HTMLElement, markers: MarkerDataSet[]): Map {
  //const bounds: LatLngBoundsExpression = [[0, 0], [1064, 1200]];
  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [768, 1024],
  ];

  const mapItem = map(mapElement, {
    crs: CRS.Simple,
    maxBounds: bounds,
    minZoom: 0,
    maxZoom: 2,
  });

  imageOverlay("../assets/img/arcadia.png", bounds).addTo(mapItem);

  mapItem.fitBounds(bounds);
  markers.map((marker) => addMarker(marker, mapItem));

  return mapItem;
}

document.addEventListener("nav", () => {
  const map = document.getElementById(MAP_ID);
  if (!map) {
    return;
  }

  const markers: NodeListOf<HTMLElement> = document.querySelectorAll(MARKER_SELECTOR);
  const markerData = getMarkerData(markers);

  const mapItem = initialiseMap(map, markerData);
  window.addCleanup(() => mapItem.remove());
});
