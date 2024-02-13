//this file handles the different types of lists

//this is a file to handle the progress bar when tasks are added

const template = document.createElement('template');

template.innerHTML = 
`
<style>
#one {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#two {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.daily, .Weekly, .Monthly, .Occasional{
    background-color: #ff5945;
    color: #fff;
    padding: 8px;
    border-radius: 40px;
    flex: 1;
    margin: 8px 8px;
    display: flex;
    align-items: center;
    justify-content: center;

}

</style>
<div id="one">
<div class="daily">
<p>Daily</p>
</div>
<div class="Monthly">
<p>Weekly</p>
</div>
</div>
<div id="two">
<div class="Weekly">
<p>Monthly</p>
</div>
<div class="Occasional">
<p>Occasional</p>
</div>
</div>

`
;

class Lists extends HTMLElement{
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'closed'});

        let clone = template.content.cloneNode(true);
        shadowRoot.append(clone);
    }
}

window.customElements.define('list-item', Lists);