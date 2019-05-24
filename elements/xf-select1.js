import {html, PolymerElement} from '../assets/@polymer/polymer/polymer-element.js';
import '../assets/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';

import { XfControl } from './xf-control.js';


/**
 * `xf-select1`
 * general class for bound elements
 *
 * @customElement
 * @polymer
 */
class XfSelect1 extends XfControl {
    static get template() {
        return html`
      <style>
        :host {
          display: inline;
        }
      </style>
      <paper-dropdown-menu id="dropdown"label="[[label]]" on-iron-select="_handleSelected">
<!--        <paper-listbox slot="dropdown-content" class="dropdown-content">-->
            <slot slot="dropdown-content"> </slot>
<!--        </paper-listbox>     -->
      </paper-dropdown-menu>
    `;
    }

    static get properties() {
        return {
            label: {
                type: String
            }
        };
    }


    _updateValue(){
        // console.log('xf-select1._updateValue ', this.proxy.value);

        // ### in this case we need to reach down to bring the list into the right state (showing pre-selection)
        this.querySelector('xf-itemset').selectItem(this.value);
        console.log('_updateValue proxy ', this.proxy);
    }

    _handleSelected(e){
        console.log('select1 got select ',e.detail.item.value);
        this.proxy.value = e.detail.item.value;
    }
}

window.customElements.define('xf-select1', XfSelect1);