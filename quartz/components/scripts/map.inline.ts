import { CRS, imageOverlay, LatLngBoundsExpression, map, marker } from "leaflet"

interface MarkerDataSet {
  name: string,
  link: string,
  posX: string,
  posY: string,
}

document.addEventListener("nav", () => {
  const mapElement = document.getElementById("leaflet-map")
  if (!mapElement) {
    return
  }

  const urlPrefix = mapElement.dataset.url ?? "";

  const markers = document.querySelectorAll("div.marker");

  //const bounds: LatLngBoundsExpression = [[0, 0], [1064, 1200]];
  const bounds: LatLngBoundsExpression = [[0, 0], [768, 1024]];
  const mapItem = map("leaflet-map", {
    crs: CRS.Simple,
    maxBounds: bounds,
    minZoom: 0,
    maxZoom: 2,
  });

  imageOverlay("../assets/img/arcadia.png", bounds).addTo(mapItem);

  mapItem.fitBounds(bounds);

  for (const marker of markers) {
    const markerData = marker.dataset as MarkerDataSet;
    addMarker(markerData);
  }

  function markerOnClick(event: any) {
    console.log(event.target.options.url)
    window.location.href = `/${urlPrefix}/${event.target.options.url}`
  }

  function addMarker(markerData: MarkerDataSet) {
    console.log(markerData)
    marker(
      [parseInt(markerData.posY), parseInt(markerData.posX)],
      {url: markerData.link},
    ).bindTooltip(markerData.name).on("click", markerOnClick).addTo(mapItem);
  }
})