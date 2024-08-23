# Quartz v4

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.
Quartz v4 features a from-the-ground rewrite focusing on end-user extensibility and ease-of-use.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

## Get started

To run the website locally simply run

```
npm run serve
```

## Custom frontmatter

| Item          | Type    | Explanation                                                                                |
| ------------- | ------- | ------------------------------------------------------------------------------------------ |
| prioritise    | boolean | Whether this page should appear above maps in the explorer                                 |
| map           | boolean | Whether this page should show the campaign map                                             |
| marker        | object  | Custom object containing marker information                                                |
| marker.x      | number  | Marker x coordinate                                                                        |
| marker.y      | number  | Marker y coordinate                                                                        |
| marker.icon   | string  | `capitol`, `town`, `camp`, `subway`                                                        |
| marker.colour | string  | `green`, `lime`, `yellow`, `pink`, `blue`, `lightblue`, `brown`, `orange`, `red`, `purple` |

> A marker requires `title`, `marker.x`, `marker.x`, and `marker.icon` to be set. Colour defaults to `blue`.

## Custom CSS

We also make use to the the same css [this wiki](https://morrowind-modding.github.io/contributing/custom-formatting-features) uses.
