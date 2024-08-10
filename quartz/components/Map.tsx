import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";

// @ts-ignore: typescript doesn't know about our inline bundling system
// so we need to silence the error
import mapScript from "./scripts/map.inline";
import mapStyles from "./styles/map.scss";
import { QuartzPluginData } from "../plugins/vfile";

interface Marker {
  name: string;
  link: string;
  position: {
    x: number;
    y: number;
  };
  icon: string;
  colour: string;
}

interface FrontmatterMarkerData {
  x: string;
  y: string;
  icon: string;
  colour: string | undefined;
}

function isFrontmatterMarkerData(object: any): object is FrontmatterMarkerData {
  return !(!object || !object.x || !object.y || !object.icon);
}

export default ((ignore: boolean = false) => {
  function buildMarker(file: QuartzPluginData): Marker | undefined {
    const { slug, frontmatter } = file;
    const markerData = frontmatter?.marker;

    if (!slug || !frontmatter || !frontmatter?.title || !isFrontmatterMarkerData(markerData)) {
      return undefined;
    }

    return {
      name: frontmatter.title,
      link: slug,
      position: {
        x: parseInt(markerData.x),
        y: parseInt(markerData.y),
      },
      icon: markerData.icon ?? "",
      colour: markerData.colour ?? "blue",
    };
  }

  const MarkerComponent = (marker: Marker, index: number, prefix: string) => {
    return (
      <div
        class={"marker"}
        key={index}
        data-name={marker.name}
        data-link={`https://${prefix}/${marker.link}`}
        data-pos-x={marker.position.x}
        data-pos-y={marker.position.y}
        data-icon={marker.icon}
        data-colour={marker.colour}
      />
    );
  };

  const Map: QuartzComponent = (props: QuartzComponentProps) => {
    if (!props.fileData.frontmatter || !props.fileData.frontmatter?.map || ignore) {
      return <></>;
    }

    const urlPrefix = props.cfg.baseUrl ?? "";

    const markers = props.allFiles
      .map((file) => buildMarker(file))
      .filter((marker) => marker !== undefined);
    return (
      <div>
        <h2 id="map">Map</h2>
        <div id="leaflet-map" />
        {markers.map((object, i) => MarkerComponent(object, i, urlPrefix))}
      </div>
    );
  };

  Map.afterDOMLoaded = mapScript;
  Map.css = mapStyles;

  return Map;
}) satisfies QuartzComponentConstructor;
