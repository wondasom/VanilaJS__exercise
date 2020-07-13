# Vanila JS Exercises 💛

This is a collection of toy projects made with Vanila JS without any framework.
They include very basic yet important front-end features. 🔥
<br />

## 1. Target Pointer ✔️

Users are able to
-  target a pointer by moving a mouse 🖱

### Noteworthy things❗️ (1)
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
### Noteworthy things❗️ (2)
- For the better performance(to improve CRP), 
```tag.style.top = `${y}px`;``` better be changed to
```
tag.style.transform = `translate(${x}px, ${y}px)`;
```
- Because `transform` does not trigger layout event, whereas `top` or `left` does. (See more on [CSS Triggers](https://csstriggers.com/).)

<br />

## 2. Shopping List 🛒 

Users are able to
-  add a new item to the list by click the buttton 🖱 or pressing enter ⌨️
-  delete a item(s) in the list

<br />



