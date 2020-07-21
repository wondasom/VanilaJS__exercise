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

items.addEventListener("click", (event) => {
	const id = event.target.dataset.id;
	if (id) {
		const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
		toBeDeleted.remove()
	}
});

let index = 0;
const createItem = (text) => {
	const itemRow = document.createElement("li");
	itemRow.setAttribute("class", "item__row");
	itemRow.setAttribute("data-id", index);
	itemRow.innerHTML = `			
	<div class="item" >
		<span class="item__name">${text}</span>
		<button class="item__delete">
			<i class="far fa-trash-alt" data-id=${index}></i>
		</button>
	</div>
	<div class="item__divider"></div>`;
	index++;
	return itemRow;
};

input.addEventListener("keypress", () => {
	if (event.key === "Enter") {
		onAdd();
	}
});
