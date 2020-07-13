const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

const onAdd = () => {
	const text = input.value;
	if (text === "") {
		input.focus();
		return;
	}

	const item = createItem(text);

	items.appendChild(item);

	item.scrollIntoView({ block: "center" });

	input.value = "";
	input.focus();
};

addBtn.addEventListener("click", () => {
	onAdd();
});

const createItem = (text) => {
	const itemRow = document.createElement("li");
	itemRow.setAttribute("class", "item__row");

	const item = document.createElement("div");
	item.setAttribute("class", "item");

	const name = document.createElement("span");
	name.setAttribute("class", "item__name");
	name.innerText = text;

	const deleteBtn = document.createElement("button");
	deleteBtn.setAttribute("class", "item__delete");
	deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
	deleteBtn.addEventListener("click", () => {
		items.removeChild(itemRow);
	});

	const itemDivder = document.createElement("div");
	itemDivder.setAttribute("class", "item__divider");

	item.appendChild(name);
	item.appendChild(deleteBtn);

	itemRow.appendChild(item);
	itemRow.appendChild(itemDivder);

	return itemRow;
};

input.addEventListener("keypress", () => {
	if (event.key === "Enter") {
		onAdd();
	}
});
