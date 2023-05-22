export class CreateElement {
  constructor() {}

  create(tag, className, parent, textContent = "") {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.textContent = textContent;
    parent.append(element);
    return element;
  }
}
