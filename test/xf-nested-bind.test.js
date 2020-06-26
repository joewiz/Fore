/* eslint-disable no-unused-expressions */
import { html, oneEvent, fixture, fixtureSync, expect, elementUpdated, defineCE } from '@open-wc/testing';

import '../src/xf-form.js';
import '../src/xf-model.js';
import '../src/xf-instance.js';
import '../src/xf-bind.js';
import '../src/xf-output.js';

describe('initialize nested bindings', () => {

    it('is initialized', async () => {
        const el =  (
            await fixture(html`
                 <xf-form>
                    <xf-model id="model1">
                        <xf-instance>
                            <data>
                                <greeting type="message">Hello World!</greeting>
                            </data>
                        </xf-instance>
                        <xf-bind id="b-greeting" ref="greeting" required="1 = 1">
                            <xf-bind id="b-type" ref="@type"></xf-bind>
                        </xf-bind>
                    </xf-model>
                    <xf-group>
                        <xf-output id="output1" ref="greeting"> </xf-output> : <xf-output id="output2" ref="greeting"></xf-output>
                    </xf-group>
                </xf-form>               
            `)
        );

        await elementUpdated(el);
        const bind = document.getElementById('b-greeting');
        expect(bind).to.exist;

        const model = document.getElementById('model1');
        expect(model.bindingMap.length).to.equal(2);

        //check the modelitems
        const mi = model.bindingMap[0];
        expect(mi.modelItem.value).to.exist;
        expect(mi.modelItem.value).to.equal('Hello World!');

        const mi2 = model.bindingMap[1];
        expect(mi2.modelItem.value).to.exist;
        expect(mi2.modelItem.value).to.equal('message');

        //check the controls
        const out1 = document.getElementById('output1');
        expect(out1.nodeName).to.equal('XF-OUTPUT');
        expect(out1.nodeset).to.exist;
        expect(out1.ref).to.equal('greeting');
        expect(out1.value).to.equal('Hello World!');

        const out2 = document.getElementById('output1');
        expect(out2.nodeName).to.equal('XF-OUTPUT');
        expect(out2.nodeset).to.exist;
        expect(out1.ref).to.equal('greeting');
        expect(out1.value).to.equal('Hello World!');
    });




});