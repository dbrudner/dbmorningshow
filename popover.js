import "./popover.css";

/**
 * Class for rendering a popover
 *
 * @param {HTMLElement} node - Node to append popover to
 * @param {HTMLElement} content - Popover inner content
 */
export default class Popover {
  constructor({ node, content }) {
    this.node = node;
    this.content = content;
    // this.show = true;
    this.htmlContent = "";
    this.body = document.querySelector("body");
    this.rendered = false;

    this.mount();
  }

  mount() {
    this.buildContainer();
    this.buildPopover();
    this.setContainerPosition();
    this.appendPopoverContent();
    this.renderPopover();
  }

  buildContainer() {
    this.container = document.createElement("div");
    this.container.classList.add("popover-container", "card");
  }

  buildPopover() {
    this.htmlContent = `<div class="popover">${this.content}</div>`;
  }

  setContainerPosition() {
    const { top, left, height } = this.node.getBoundingClientRect();

    this.container.style.top = `${top + height}px`;
    this.container.style.left = `${left - 30}px`;
  }

  appendPopoverContent() {
    this.container.innerHTML = this.htmlContent;
  }

  renderPopover() {
    this.body.append(this.container);
    this.rendered = true;
  }

  unmount() {}
}
