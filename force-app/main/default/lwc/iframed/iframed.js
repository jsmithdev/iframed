import { api,LightningElement } from 'lwc';

export default class Iframed extends LightningElement {
	@api url;
	@api height;
	@api width;

	get iframeStyle() {
		return `height:${this.height};width:${this.width};`;
	}
}