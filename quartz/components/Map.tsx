
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// @ts-ignore: typescript doesn't know about our inline bundling system
// so we need to silence the error
import mapScript from "./scripts/map.inline"
import mapStyles from "./styles/map.scss"
import { QuartzPluginData } from "../plugins/vfile"

interface Marker {
  name: string,
  link: string,
  position: {
    x: number,
    y: number,
  },
}

export default ((ignore: boolean = false) => {
  function buildMarker(file: QuartzPluginData): Marker | undefined {
    const {slug, frontmatter} = file;
    if (
      !slug ||
      !frontmatter?.title || 
      !frontmatter?.markerX || 
      !frontmatter?.markerY
    ) {
      return undefined;
    }

    return {
      name: frontmatter.title,
      link: slug,
      position: {
        x: parseInt(frontmatter.markerX as string),
        y: parseInt(frontmatter.markerY as string),
      }
    }
  }

  const MarkerComponent = (marker: Marker, index: number) => {
    return (<div
      class={"marker"}
      key={index}
      data-name={marker.name}
      data-link={marker.link}
      data-pos-x={marker.position.x}
      data-pos-y={marker.position.y}
    />);
  }

  const Map: QuartzComponent = (props: QuartzComponentProps) => {
    if (!props.fileData.frontmatter || !props.fileData.frontmatter?.map || ignore) {
      return (
        <></>
      )
    }

    const markers = props.allFiles
      .map((file) => buildMarker(file))
      .filter((marker) => marker !== undefined)
    ;

    const urlPrefix = props.cfg.baseUrl?.split("/")[1];

    return (
      <div>
        <div id="leaflet-map" data-url={urlPrefix}/>
        {markers.map((object, i) => MarkerComponent(object, i))}
      </div>
    )
  }

  Map.afterDOMLoaded = mapScript
  Map.css = mapStyles

  return Map
}) satisfies QuartzComponentConstructor
