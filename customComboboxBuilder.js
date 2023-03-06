
(function () {
    let template = document.createElement("template");
    template.innerHTML = '<button type="button" id="myBtn">Helper Button</button>';
    class customComboboxBuilderPanel extends HTMLElement {
        constructor() {
            super();
            this.init();

        }
        init() {

            let shadowRoot = this.attachShadow({
                mode: "open"
            });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.fireChanged();
                this.dispatchEvent(event);
            });
        }
        customElements.define("custom-button",
            customComboboxBuilderPanel);
    })();
