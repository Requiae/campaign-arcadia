# Arcadia

This is a digital garden detailing the Dungeons and Dragons (5e) journey where the players join an expedition to explore the island of Arcadia.

# Quartz Template

This template uses a slightly modified version of [Quartz](https://github.com/jackyzha0/quartz) which has its own [documentation](https://quartz.jzhao.xyz/)
Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.
The modifier version can be found [here](https://github.com/Requiae/quartz-module)

## Get started

### Install dependencies

Install all the node dependencies

```
npm install
```

### Run website locally

Running the site now is done by using

```
npm run serve
```

### Update Git submodule

It might be the case that the [quartz-module submodule](https://github.com/Requiae/quartz-module) has been updated. In that case you should make a new branch and update the submodule.
Afterwards you merge it using a PR

```
git checkout -b submodule-update
git submodule update --remote quartz-module
git add quartz-module
git commit -m "Update submodule quartz-module to latest commit"
```

## Custom frontmatter

| Item           | Type    | Explanation                                                                                                                                  |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| prioritise     | boolean | Whether this page should appear above maps in the explorer                                                                                   |
| map            | object  | Custom object containing marker information Whether this page should show the campaign map                                                   |
| map.name       | string  | Name of the map                                                                                                                              |
| map.path       | string  | Path to the map image where the content folder is the root                                                                                   |
| map.minZoom    | number  | The minimum zoom the map allows                                                                                                              |
| map.maxZoom    | number  | The maximum zoom the map allows                                                                                                              |
| marker         | object  | Custom object containing marker information                                                                                                  |
| marker.x       | number  | (Integer) Marker x coordinate                                                                                                                |
| marker.y       | number  | (Integer) Marker y coordinate                                                                                                                |
| marker.icon    | string  | `anchor`, `anvil`, `bed`, `branch`, `camp`, `capitol`, `cauldron`, `diner`, `farm`, `shield`, `star`, `subway`, `town`, `tree`, `university` |
| marker.colour  | string  | (Optional, defaults to `blue`) `green`, `lime`, `yellow`, `pink`, `blue`, `lightblue`, `brown`, `orange`, `red`, `purple`                    |
| marker.minZoom | number  | (Optional Integer) The minimum zoom from which the marker is shown on the map                                                                |

> A marker requires `title`, `marker.x`, `marker.x`, and `marker.icon` to be set.

## Custom CSS

We also make use to the the same css [this wiki](https://morrowind-modding.github.io/contributing/custom-formatting-features) uses.
