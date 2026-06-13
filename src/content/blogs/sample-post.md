---
title: "Sample Post – Writing Blogs with Images and Code"
date: "2025-10-28"
tags:
  - Next.js
  - Markdown
  - Blogging
image: "/og-image.png"
---

# Welcome to Your New Blog Post

This sample shows how to structure posts with frontmatter, images, links, tables, and code blocks.

## Frontmatter

Top section between the `---` lines contains metadata used by the site: `title`, `date`, `tags`, and `image`.

## Images

Use either a public image path or a full URL from an allowed domain.

![Local image from public folder](/og-image.png)

![Remote image from an allowed host](https://appwrite.io/images/blog/baas-backend-as-a-service/cover.png)

## Inline Code and Fenced Code

Use inline code like `npm run dev` for short snippets.

```ts
// TypeScript example
type User = {
  id: string;
  name: string;
};

export function greet(user: User) {
  return `Hello, ${user.name}!`;
}
```

```bash
# Shell example
npm install
npm run dev
```

## Links

Check out [Next.js docs](https://nextjs.org/docs) and the Markdown flavor we enable with GFM via remark-gfm.

## Lists

- Item one
- Item two
  - Nested item

1. First
2. Second

## Tables (GFM)

| Feature        | Supported |
| -------------- | --------- |
| Frontmatter    | Yes       |
| GFM (tables)   | Yes       |
| Images         | Yes       |
| Code fences    | Yes       |

## Blockquote

> Great documentation makes writing posts fast and fun.

## Callouts

Remember to set the `image` field in frontmatter for a nice hero image on the post page.


