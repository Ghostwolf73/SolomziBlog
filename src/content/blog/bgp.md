---
title: "BGP"
date: 2025-12-11
tags: ["routing", "ccnp"]
summary: "Digging into BGP after avoiding it for a while — working through it as part of CCNP prep."
readTime: "8 min"
---

Replace this with the full write-up. A few tips for formatting:

## Use headings to break up sections

Just like this one — `##` for a section, `###` for a sub-section.

## Code blocks for configs

```text
router bgp 65001
 neighbor 10.0.0.2 remote-as 65002
 network 192.168.1.0 mask 255.255.255.0
```

## Images

Drop image files into `public/images/` and reference them like:

```md
![topology diagram](/images/bgp-topology.png)
```

Copy this file for each new post, or use it as the pattern — one `.md` file
per post inside `src/content/blog/`, named however you like (the filename
becomes the URL slug).
