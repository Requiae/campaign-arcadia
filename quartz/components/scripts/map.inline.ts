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

type MarkerColour =
  | "green"
  | "lime"
  | "yellow"
  | "pink"
  | "blue"
  | "lightblue"
  | "brown"
  | "orange"
  | "red"
  | "purple";
type MarkerIcon = "capitol" | "town" | "subway" | "camp";

const MARKER_COLOUR_MAP: Record<MarkerColour, string> = {
  green: "#039c4b",
  lime: "#66d313",
  yellow: "#fedf17",
  pink: "#ff0984",
  blue: "#21409a",
  lightblue: "#04adff",
  brown: "#e48873",
  orange: "#f16623",
  red: "#f44546",
  purple: "#7623a5",
};
const MAP_ID = "leaflet-map";
const MARKER_SELECTOR = "div.marker";

interface MarkerDataSet {
  name: string;
  link: string;
  posX: string;
  posY: string;
  icon: MarkerIcon;
  colour: MarkerColour;
}

function buildIcon(icon: MarkerIcon, colour: MarkerColour): DivIcon {
  const iconColour = MARKER_COLOUR_MAP[colour];
  return divIcon({
    className: "custom-div-icon",
    html: `<div class="marker" style="background-color:${iconColour}"></div><img class='icon' src='../static/markers/${icon}.svg'>`,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    tooltipAnchor: [17, -36],
    shadowUrl: "../assets/img/markers/shadow.png",
    shadowSize: [41, 41],
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
