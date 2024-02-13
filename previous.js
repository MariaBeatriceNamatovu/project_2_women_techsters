//this file handles the simple heading

//this is a file to handle the progress bar when tasks are added

const template = document.createElement('template');

template.innerHTML = 

`<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

div{
    display: flex;
    align-items: center;
    gap: 15px;

}
</style>

<div>
<i class="fa-solid fa-arrow-left"></i>
<h3 slot="heading">Back to lists</h3>
</div>
`
;

class Heading extends HTMLElement{
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'closed'});

        let clone = template.content.cloneNode(true);
        shadowRoot.append(clone);
    }
}

window.customElements.define('heading-one', Heading);