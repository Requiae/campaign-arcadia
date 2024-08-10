import {
  CRS,
  DivIcon,
  divIcon,
  imageOverlay,
  LatLngBoundsExpression,
  LeafletMouseEvent,
  LeafletMouseEventHandlerFn,
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

interface MarkerDataSet {
  name: string;
  link: string;
  posX: string;
  posY: string;
  icon: string;
  colour: MarkerColour;
}

function buildIcon(icon: string, colour: MarkerColour): DivIcon {
  return divIcon({
    className: "custom-div-icon",
    html: `<i class="marker fa fa-location-pin" style="color:${MARKER_COLOUR_MAP[colour]}"></i><i class='icon fa-solid ${icon}'>`,
    iconSize: [30, 38],
    iconAnchor: [15, 38],
    tooltipAnchor: [16, -25],
    shadowUrl: "../assets/img/markers/shadow.png",
    shadowSize: [41, 41],
  });
}

document.addEventListener("nav", () => {
  const mapElement = document.getElementById("leaflet-map");
  if (!mapElement) {
    return;
  }

  const markers: NodeListOf<HTMLElement> = document.querySelectorAll("div.marker");

  //const bounds: LatLngBoundsExpression = [[0, 0], [1064, 1200]];
  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [768, 1024],
  ];

  const mapItem = map("leaflet-map", {
    crs: CRS.Simple,
    maxBounds: bounds,
    minZoom: 0,
    maxZoom: 2,
  });

  imageOverlay("../assets/img/arcadia.png", bounds).addTo(mapItem);

  mapItem.fitBounds(bounds);

  for (const marker of markers) {
    // yuck, but mehh
    const markerData = marker.dataset as unknown as MarkerDataSet;
    addMarker(markerData);
  }

  function getMarkerOnClick(url: string): LeafletMouseEventHandlerFn {
    return (_event: LeafletMouseEvent) => {
      window.location.href = `${url}`;
    };
  }

  function addMarker(markerData: MarkerDataSet) {
    const options: MarkerOptions = {
      icon: buildIcon(markerData.icon, markerData.colour),
    };

    console.log(options);

    // eslint-disable-next-line
    marker([parseInt(markerData.posY), parseInt(markerData.posX)], options)
      .bindTooltip(markerData.name)
      .on("click", getMarkerOnClick(markerData.link))
      .addTo(mapItem);
  }
});
