import "./popover.css";

/**
 * Class for rendering a popover
 *
 * @param {HTMLElement} el - el to append popover to
 * @param {HTMLElement} content - Popover inner content
 */
export default class Popover {
  constructor({ el, content, style }) {
    console.log("hi");
    this.el = el;
    this.content = content;
    this.style = style;
    this.htmlContent = "";
    this.body = document.querySelector("body");
    this.rendered = false;

    this.mount();
    return this;
  }

  mount() {
    this.buildContainer();
    this.buildPopover();
    this.setStyle(this.style);
    this.appendPopoverContent();
    // this.renderPopover();
  }

  buildContainer() {
    this.container = document.createElement("div");
    this.container.classList.add("popover-container", "card");
  }

  buildPopover() {
    this.htmlContent = `<div class="popover">${this.content}</div>`;
  }

  setStyle(style) {
    console.log(style);
    Object.assign(this.container.style, style);
    return this;
  }

  // setContainerPosition() {
  //   const { top, left, height } = this.el.getBoundingClientRect();
  //   // const { width } = document.querySelector('.fc-daygrid-day').getBoundingClientRect();

  //   this.container.style.top = `${top + height}px`;
  //   this.container.style.left = `${left - 30}px`;
  //   Object.assign(style);
  // }

  appendPopoverContent() {
    this.container.innerHTML = this.htmlContent;
  }

  attach(el) {
    el.append(this.container);
    this.rendered = true;
  }

  unmount() {
    this.container.remove();
  }
}
