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

| Item       | Type    | Explanation                                                |
| ---------- | ------- | ---------------------------------------------------------- |
| prioritise | boolean | Whether this page should appear above maps in the explorer |
| map        | boolean | Whether this page should show the campaign map             |
| markerX    | integer | X coordinate for this page on the campaign map             |
| markerY    | integer | Y coordinate for this page on the campaign map             |

> A marker requires `title`, `markerX`, and `markerY` to be set
