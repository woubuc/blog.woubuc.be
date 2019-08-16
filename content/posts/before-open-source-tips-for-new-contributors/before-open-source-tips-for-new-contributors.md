---
id: before-open-source-tips-for-new-contributors
title: "Before open source: some tips for new contributors"
author: woubuc
description: I've been writing open source libraries and tools for a while. I don't have any big, famous projects, but occasionally I do get someone who wants to contribute to my projects. Here are some lessons I've learned from that, and some tips for new contributors. 

published: false
date: 2019-08-18

tags:
- Open Source
- Best Practices
- Beginners

image: ./header.jpg
colour: '#95ba9b'
---

I love getting contributions on my projects. It's great to see how people see this thing I'm making and not only find it useful, but actively want to participate in making it better. That's one of the best things about working on open source software projects.

Except when it's not.

As a new contributor, you should realise that it takes __a lot__ of work to guide you through my project so you can contribute. Most of the time I will happily help you and there is no problem, but sometimes a pull request or a contributor can become a bit of a nuisance.

So here are some nuisances I've experienced, and what you could do as a new contributor to make both our lives easier.

*This post was inspired by [something I tweeted](https://twitter.com/woubuc/status/1162364668872183814) recently in response to an actual pull request I received. After sending that tweet, I figured it would make an interesting blog post to write up some of these beginner faux-pas.* 

## Learn the history
Every project has history, and it's on you to learn about it so you know what you're talking about.

I'm not saying you should read every commit message since the project started, but __you should do your homework__ before creating an issue or a pull request. If you want to add X to feature Y because you feel it's sorely missing from the project, try searching the old issues for mention of something similar &mdash; there may be a really good reason why it's not a good idea, something that you hadn't considered.

Sure, you could just ask about it in a new issue. Or create the PR right away and then be told no. But it's much more considerate towards the project maintainer(s) if you do just a little research beforehand.

*Added bonus*: this will also give you a good jumping-off point if you want to continue a conversation. Say the last discussion about your feature X ended with "this is not possible due to technical restriction Y," but that was two years ago and in the meantime Y was removed from the code. You now have the perfect opportunity to make your case, and the maintainer will love you even more for picking up on an older discussion (that they may or may not have been involved in personally).

## Remember the human
Sometimes new contributors simply don't think about the fact that a project has one or several developers behind it who have already put in a lot of hard work to get the codebase where it's at today. They come in and assume everything is just there for them to play with. Seeing this happen can be very discouraging for a project maintainer.

Don't come in expecting to make sweeping changes from the start. Try to figure out what would benefit the project and submit small issues and PRs to learn how the project works, rather than trying to force your views or opinions on the project unprompted.

## Open source = open communication 
If there is something about the project that you think should change, and you haven't found anything about it in the project history, __ask about it__. This is another big part of open source. I don't always know what you're using my packages and crates for, so let's discuss how to make it better for your use case. 

And then either I will add it to the code, if I have time and feel like it, or you can clone the repository, add it yourself and submit a pull request.

## Conclusion
Open source maintainers are almost always happy to get new contributors, but that joy can quickly turn into disappointment if they need to spend a lot of time on you without making any progress. So when contributing to open source, try to be considerate of the developers and their projects.
