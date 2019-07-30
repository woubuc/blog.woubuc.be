---
id: self-documenting-code-is-a-myth
title: Self-documenting is a myth, and how to make your code self-documenting
author: woubuc
description: >
  Self-documenting code is often presented as an utopia where you don't need to write comments. But code can never be entirely self-documenting. Here are some tips on how to clean up your code and write less comments without losing sight of the big picture.

published: false
date: 2019-07-29

tags:
- Best Practices
- Code
- Documentation

image: ./header.jpg
colour: '#713d61'
---

## What is self-documenting code
In order to write code, you have to understand the surrounding code. And in order to understand it, you need to read it. Often repeatedly and frequently. So it's in everyone's best interest that this code is clear, concise and properly documented.

**Self-documenting code** is a goal that a lot of developers (including myself) set for themselves one time or another. For most, it means you should write clean, well-structured code that makes it immediately obvious what's going on, so you don't need to write comments explaining it.

### Well actually...
You can write the best, cleanest, most well-structured code anyone has ever seen, but here's the truth: **You'll still need to write comments and document your code**. You won't have to write *as many* comments, but you can't stop writing comments altogether.

### Three questions
When someone reads what you wrote, for them to build the mental modal they need to understand it, your code needs to answer three questions:

- **What** is the goal of this code?
- **How** is it achieving that goal?
- **Why** does it achieve that goal in this way?

Let's take a little piece of *less-than-ideal* code, examine why it's written like that, and try to improve it so it answers all three questions.

*Note: The code samples are written in Javascript/Typescript, but the theory should be applicable for any language*

## The code
While experimenting with a new feature, you're just trying to get something working. So it can be tempting to think "I'll clean this up later" and write something like this:

```javascript
function get() {
	const arr = db.getAll();
	return arr.map(i => i.name);
}
```

Only you don't clean it up because deadlines are looming and you have ten more things to finish before tomorrow's standup. And so that piece of code sits in your codebase for seven months, until another developer (let's call him Steve) needs to update something in that file.

After reading the function for the first time, Steve will probably have several questions:

- **What** is this function getting?
- **What** is in `arr`?
- **Why** does it map to `name`?

By parsing what's happening, Steve can deduce a partial answer to these questions:

- The variable `arr` must be an array, given its name and the fact that `arr.map()` is used.
- The values in `arr` must have a property called `name` since it is mapped.
- The function returns an array.

As you can see, Steve is trying to deduce the **what** and the **why** based on the **how** because that's the only thing he has. This happens a lot, in all types of codebases, and most developers don't even think twice about it. But in the end, the time and energy you spent parsing this kind of code adds up and takes away from your time working on the code.

So how can we make it easier on Steve, so he can understand what's going on at a single glance?

### Add comments
One solution would be to add some comments to explain what's going on.

```javascript
/**
* Gets the names of all participants from the database
*/
function get() {
	// Load the participants from the database
	const arr = db.getAll();
	
	// Map to get just the participant's names
	return arr.map(i => i.name);
}
````

It has gotten a little clearer already, but adding comments is exactly what we wanted to avoid with our self-documenting code.

### Name those variables
Instead of adding comments, how about we change the names of the variables to reflect what they mean?

```javascript
function getParticipantNames() {
	const participants = database.getAllParticipants();
	return participants.map(p => p.name);
}
```

Now we have communicated essentially the same thing as before, but we didn't need all those comments. **Properly naming your variables** is one of the cornerstones of self-documenting code, because they communicate exactly **what** they represent.

Note how I still used a short variable `p` in the `participants.map()` function, since it's abundantly clear from the context that it will contain the participant.

So with these changes to the variable names, we've answered our original questions:

- _**What** is this function getting?_ It gets the names of the participants.
- _**What** is in `arr`?_ The participant entities.
- _**Why** does it map to `name`?_ Because we only need the name

Steve will find it much easier next time he has to read our code!

### Why?
Another question you could ask is a little more far-fetched and doesn't concern this function specifically, but I'll ask it anyway: **Why** is there no function called `database.getAllParticipantNames()`, to query just the names from the database (instead of all this other data we don't need)?

There could be 1001 reasons for this, but for this example let's say that the database queries are cached. This means that when the query runs, the received data is stored in memory for a little while so subsequent calls don't need to make another roundtrip to the database. So using the same query here is actually an optimisation, even if we get too much data from the call.

This optimisation is an example of something you can't possibly communicate using code alone. So to paint the whole picture, this information needs to be added in there as well.

```javascript
function getParticipantNames() {
	// Because queries are cached, using the `allParticipants` query 
	// prevents another roundtrip to the database
	const participants = database.getAllParticipants();
	
	return participants.map(p => p.name);
}
```

With this, we've made the **Why** even more complete. We needed comments to fully document the code, but I still consider this "self-documenting".

### What?
I want to ask one last question, one asked not by Steve who has to look at this function, but rather by Tom who has to use your function in another part of the codebase: **What** is the return type of this function?

The best solution for that is type annotations. This will differ per language, but in Javascript there are several popular solutions. I've personally worked with [JSDoc comments](https://devhints.io/jsdoc), [Flow types](https://flow.org/) and [Typescript](https://www.typescriptlang.org/).

We've already tried the full JSDoc comment above, but all that's necessary to annotate the return type is an `@returns` statement:

###### JSDoc
```javascript
/**
* @returns {string[]}
*/
function getParticipantNames() {
	// Because queries are cached, using the `allParticipants` query 
	// prevents another roundtrip to the database
	const participants = database.getAllParticipants();
	
	return participants.map(p => p.name);
}
```

Typescript and Flowtype have similar syntax:

###### Typescript / Flowtype
```typescript
function getParticipantNames() : string {
	// Because queries are cached, using the `allParticipants` query 
	// prevents another roundtrip to the database
	const participants = db.getAllParticipants();
	
	return participants.map(p => p.name);
}
```
 
My personal favourite is Typescript. It helps with creating clean code with strict interfaces and it makes refactoring a whole lot easier when I need to. I use Typescript in nearly all of my projects, but adding it to a project is generally not a decision to take lightly &mdash; especially if you already have a developed codebase &mdash; so do consider the ramifications before you start. JSDoc is almost always the easiest choice to get started typing your code.

## Conclusion
I want to extract three rules from what we've seen in this post, based on the three questions:

- Use clear and consistent naming, types and function signatures to communicate **what** the goal of each piece of code is.
- Use well-structured code to show **how** you're going about achieving the goal.
- Use comments to explain **why** you're doing things a certain way, especially if that way may be non-obvious.

That last one is the hardest for a lot of developers because the **why** is usually obvious while you're writing the code. But take a moment to think of all the Stevens who need to look at your code months or even years after you wrote it. They'll be grateful.

Make Steve happy. Document your self-documenting code.
