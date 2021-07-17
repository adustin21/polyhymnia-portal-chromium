export const convertJson = (store, root, parrentTagName) => {
	let parrentDiv = document.createElement('div');
	parrentDiv.classList.toggle(parrentTagName);
	store.forEach(element => {
		let childNameArray = Object.keys(element);
		childNameArray.forEach(childrenElementName => {
			if(Array.isArray(element[childrenElementName])){
				convertJson(element[childrenElementName], parrentDiv, childrenElementName);
			}else{
				let childrenDiv = document.createElement('div');
				childrenDiv.classList.toggle(childrenElementName);
				childrenDiv.innerHTML = element[childrenElementName]
				parrentDiv.appendChild(childrenDiv);
			}
		});
		root.appendChild(parrentDiv);
		parrentDiv = document.createElement('div');
		parrentDiv.classList.toggle(parrentTagName);
	});
}
