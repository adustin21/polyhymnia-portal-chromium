const { body, root } = require("./elements");

export const createRoot = (rootName = 'root') => {
	body.appendChild(root);
	root.classList.toggle(rootName);
	root.id = rootName;
	return root;
}

