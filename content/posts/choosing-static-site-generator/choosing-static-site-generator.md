---
id: choosing-static-site-generator
title: Choosing a static site generator
author: woubuc
description: >
  When I started building this blog, I knew from the start that I wanted to use a static site generator with markdown files. But I had no idea which SSG I should use. I decided to do a little write-up about my search and my decision to use Gridsome.

published: true
date: 2019-07-28

subjects:
- gridsome

tags:
- Jekyll
- Hugo
- Gatsby
- GraphQL
- Frontend
- SSG

image: ./header.jpg
colour: '#e1858a'

commentLinks:
- https://www.reddit.com/r/vuejs/comments/ciublx/how_and_why_i_chose_gridsome_static_site/
- https://dev.to/woubuc/choosing-a-static-site-generator-126k#comments
- https://medium.com/p/c56ae081cd4e/responses/show
- https://twitter.com/woubuc/status/1155461900064514053
---

I'm new to static site generators. I've heard about them, and I know they've gained in popularity in the past couple of years, but until now when I made a static site it was just a folder of HTML files. But now I decided to do it *properly*, since I was going to build a whole new blog. So I started searching.
 
After a few Google searches, I found a website called [StaticGen.com](https://www.staticgen.com/) which lists a lot of static site generators (I didn't even know there were that many!). The site also provides filters to search for exactly the type of SSG you want. Of course, since I was new at all this, I had no idea what I needed from a static site generator, so I started with the top entries on the list.

*I'm going to list good and bad things about each of the tools I tried. These are just my initial experiences based on working with them for a short time. Your mileage may vary.*



## Jekyll
The 'classic' static site generator, [Jekyll](https://jekyllrb.com/) has been around for ages, it's stable and boring. A great choice for a writer or someone who just needs their site online. A little less *fun* for someone who wants to use their site as a personal playground for experimenting (like me).
 
#### I liked
- Stable, battle-tested and production-ready
- Can deploy directly to Github pages
- Big community, lots of info to be found and most problems have been solved before
 
#### I didn't like
- Liquid templates have limited logic (also I'm not a fan of the `{% %}` syntax)
- It requires Ruby, GCC and Make, which are a bit of a headache to set up

In the end, I didn't go with Jekyll because of its limited support for custom logic or functionality.



## Hugo
Next on the list is [Hugo](https://gohugo.io/). This one is built in Go, another language and toolset that I don't use, but is downloadable as a simple binary.

#### I liked
- It's fast, especially compared to Javascript-based alternatives
- Their system of page resources, while not always properly documented, works very nicely and intuitively
- Resource pipes with transform functions are implemented very nicely
- You can download a binary instead of compiling Hugo from source

#### I didn't like
- I found the template syntax to be just awful if you want to do anything beyond printing variables and simple if-statements

Unfortunately, that one dislike was a dealbreaker for me. If it wasn't for the clumsy and messy templates, I probably would've stuck with Hugo. But the way I had to interpolate variables, the function calls without parentheses, and the fact that the template compiler doesn't support line breaks in code blocks, made for the worst code mess I've ever seen.

A short example of what this means:
```html
{{ $css := resources.Get "css/pageStyles/post.scss" | resources.ExecuteAsTemplate (printf "page-%s.scss" .File.UniqueID) .Params.colour | resources.ToCSS (dict "outputStyle" "compressed") }}
```

This line gets an SCSS file, fills the template tags inside it with a variable, and then renders it to CSS. On their own, these functions aren't that bad. But put together in this way the whole thing becomes difficult to visually grok what's going on and impossible to debug or change without a lot of trial-and-error.

Now I'm sure there must be good reasons why the template syntax is like this, but there were so many little annoyances and inconveniences that I simply gave up after building about two-thirds of the blog in Hugo.



## Gatsby
The next step on my search was [Gatsby](https://www.gatsbyjs.org/). As a front-end developer first and foremost, the concept of using [React](https://reactjs.org/) &mdash; a front-end framework &mdash; to build a front-end website, sounded logical. Next to the pre-rendered static HTML, Gatsby outputs a React-powered bundle of Javascript to turn the rest of the site into a progressive web app (__PWA__ for short). This makes for a fast initial load time because of the static HTML, and then even faster navigation due to the powers of the PWA.

#### I liked
- Static sites for front-end developers
- Generates static HTML pages for SEO, and then hydrates those pages with the client-side Javascript bundle

#### I didn't like
- I'm not a big fan of React

In any case, I like the concept of Gatsby, but I'm more partial to Vue and I have a lot more experience with it, so I decided to look for something similar in Vue-land.



## Gridsome
[Gridsome](https://gridsome.org/) is essentially the same as Gatsby, but it replaces React with [Vue.js](https://vuejs.org/), which is pretty much exactly what I was looking for at this point.

I checked out some other Vue-based alternatives, specifically [Nuxt.js](https://nuxtjs.org/) (aimed at server-rendered applications) and [Vuepress](https://vuepress.vuejs.org/) (for documentation sites), but Gridsome seemed the most geared towards building a static blog.

#### I liked
- Everything good about Gatsby, but with Vue instead of React.

#### I didn't like
- It's relatively new and hasn't got a large community behind it yet, so finding answers to specific questions can be a little difficult.

Gridsome is pretty early in development and is still finding itself, but I found the latest version at this time (v0.6.7) to be sufficiently stable. They've got some serious work to do before it could be considered production-ready &mdash; I especially found error-handling to be lacking during my initial tests &mdash; but overall it has worked well for me. Gridsome has allowed me to use my Vue experience to build a nice looking blog with relatively little effort.

### Side note: GraphQL
Like Gatsby, Gridsome uses [GraphQL](https://graphql.org/) to describe which page data to load. I've seen GraphQL get a lot of praise from developers online, but I hadn't actually worked with it until now. The ideas behind GraphQL sound very good and I could definitely see it work, but my practical experience is that the queries often feel a little *bloated* and excessively verbose at times. On my post details page, I just want __all__ the properties from my `Post` type, why do I need to write them out manually?

I also haven't figured out sorting and filtering yet, so I've got some learning to do still. But by looking at the Gridsome starters and examples I've managed to get my blog up and running.



## Conclusion
All static site generators have pros and cons, and I can't recommend enough that you just try them all out for a few hours to see how they work. Most of the time you'll figure out very quickly if the tool's workflow matches yours or not, and then you can move on to the next one.

The best resource I found to search for SSGs is [StaticGen.com](https://www.staticgen.com/). If you're trying to find a good static site generator, this is the best place to start your search. Not every tool is for everyone, but there's bound to be one that works *just right*.

In any case, so far I'm very happy with my choice of Gridsome. I plan to do a write-up later about my experience building a site with it, but I decided to keep this post just about the selection process.
