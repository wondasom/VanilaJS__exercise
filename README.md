# JavaScript Toy Projects 💛

This is a collection of toy projects made with Vanila JS without any framework.
They include very basic yet important front-end features. 🔥
<br />

## 1. Target Pointer ✔️

Users are able to

- target a pointer by moving a mouse 🖱

### Please Note❗️ (1)

- The code block below is an attempt to adjust the target image to be center.
- However, it does not work because `targetHalfWidth` and `targetHalfHeight` are somehow `0`, even though it does not look like it on the browser.

```
const target = document.querySelector(".target");

const targetRect = target.getBoundingClientRect();
	const targetHalfWidth = targetRect.width / 2;
	const targetHalfHeight = targetRect.height / 2;

document.addEventListener("mousemove", () => {
		const x = event.clientX;
		const y = event.clientY;
    ...
		target.style.transform = `translate(${x - targetHalfWidth}px, ${y -
			targetHalfHeight}px)`;
    ...
	});
```

- It is becayse the `<script>` is embedded with `defer`,
- which means as soon as the HTML is ready, the script is excuted before the src(in tis case, `<img class="target" src="img/target.png" alt="target" />` arrives,
- therefore, the value of `targetHalfWidth` and `targetHalfHeight` are `0`.

- to solve this issue, the code block should be called with the `load` event. (See more info about [Resource events](https://developer.mozilla.org/en-US/docs/Web/Events).)

```
const target = document.querySelector(".target");

addEventListener("load", () => {
	const targetRect = target.getBoundingClientRect();
	const targetHalfWidth = targetRect.width / 2;
	const targetHalfHeight = targetRect.height / 2;

	document.addEventListener("mousemove", () => {
		const x = event.clientX;
		const y = event.clientY;
    ...
		target.style.transform = `translate(${x - targetHalfWidth}px, ${y -
			targetHalfHeight}px)`;
		...
	});
});

```

### Please Note❗️ (2)

- For the better performance(to improve CRP),
  `` tag.style.top = `${y}px`; `` better be changed to

```
tag.style.transform = `translate(${x}px, ${y}px)`;
```

- Because `transform` does not trigger layout event, whereas `top` or `left` does. (See more on [CSS Triggers](https://csstriggers.com/).)

<br />

## 2. Shopping List 🛒

Users are able to

- add a new item to the list by click the buttton 🖱 or pressing enter ⌨️
- delete a item(s) in the list

<br />

## 3. Carrot Finding Game 🥕

🎉 Users win when

- they click all the carrots within time limit

💩 Users lose when

- they click any bug or
- they fail to click all the carrots within time limit

### Please Note❗️ (3)

In an attempt to do refactoring by creating js modules...

- you need to include `type="module"` in the `<script>` element, to declare this script as a module
- for example: to import the `main.js` script, we use this:

```
<script type="module" src="main.js"></script>
```

During this process, you might run into an error in local testing environment 🤦🏻‍♀️

- if you try to load the HTML file locally (i.e. with a `file://` URL), you'll run into CORS errors due to JavaScript module security requirements.
- You need to do your testing through a server. [MORE INFO HERE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- ✨ SOLUTION ✨ : (if you use VS Code) INSTALL [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension

### Please Note❗️ (4)

In an attempt to do refactoring by creating js modules...

- you will encounter bugs unless you bind methods in classes
- there are [three ways](https://www.notion.so/dasomwon/binding-in-JS-1048a0eab28145d185d6b01fc869112a) to bind functions
- and I decided to bind the function in the class properties by using a arrow function syntax since it is also [a applicable way in using React](https://www.notion.so/dasomwon/binding-in-React-7de60400d84e42c18615a54a8ce9675d)

```
	// from this
	onClick (event) {
		// onClick logics
	};
	// to this ✨
	onClick = (event) => {
		// onClick logics
	};
```

### Please Note❗️ (5)

In an attempt to do refactoring...
- you can implement a builder pattern like [this](https://github.com/wondasom/VanilaJS__exercise/commit/2b775a3cdcd09f40a004413a0983eea3a0ab0c35#diff-af8e1ac3aae90234f73e730595cf2b6b) in the project.
- a builder pattern separates the construction of a complex object from its representation.
- by implementing a builder pattern, you can build a complex object using simple object.
