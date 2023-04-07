import { api, LightningElement } from 'lwc';//wire,

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import userId from '@salesforce/user/Id';
//import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
//import User_Name from '@salesforce/schema/User.Name';

import findParams from '@salesforce/apex/Iframed.findParams';


export default class IFramed extends LightningElement {
	@api url;
	@api height;
	@api width;
	@api params;
	@api recordId;
	@api debug = false;

	isLoading = true;
	iframeUrl = '';
	iframeParams = '';

	get iframeSrc() {
		return this.iframeUrl + this.iframeParams;
	}

	get iframeStyle() {
		return `height:${this.height};width:${this.width};`;
	}

    //get username() {
    //    return getFieldValue(this.user?.data, User_Name);
    //}

    //@wire(getRecord, { recordId: '$userId', fields: [ User_Name, ] })
    //user;

	connectedCallback() {
		this.init();
	}
	renderedCallback() {
		this.applyDimensions();
	}

	debugOut() {

		console.log( JSON.parse(JSON.stringify({
			params: this.params,
			username: this.username,
			iframeSrc: this.iframeSrc,
			iframeParams: this.iframeParams,
			_params_normal: this._params_normal,
			_params: this._params,
			_processed: this._processed,
			_processedParams: this._processedParams,
		})));
	}

	
	async init() {
		try {
			
			if(!this.url){
				const msg = 'Please provide a URL for the iframe';
				this.showToast(msg, msg, 'error');
			}
			
			if(this.url){
				this.iframeUrl = this.url;
			}
			else {
				this.iframeUrl = 'https://example.com';
			}
			// handle dynamic url
			if(this.iframeUrl){
				if(this.iframeUrl.includes('{')){
					// we have dynamic url
					console.log('iframe dyn iframeUrl: ' + this.iframeUrl);
					const url = await this.processURL(this.iframeUrl);
					this.iframeUrl = url;
				}
			}
			// handle dynamic params
			if(this.params){
				// set params
				if(this.params.includes('{')){
					// we have dynamic param/s
					//console.log('iframe dyn param: ' + this.url);	
					const params = await this.processParams(this.params);
					this.iframeParams = params;
				}
				else {
					this.iframeParams = this.params;
					//console.log('iframe not dyn param: ' + this.iframeUrl);	
				}
			}
	
			console.log('iframe url: ' + JSON.parse(JSON.stringify({
				iframeUrl: this.iframeUrl,
				iframeParams: this.iframeParams,
			})));
			
			this.isLoading = false;
		}
		catch (error) {
			this.handleError(error);
		}
	}

	applyDimensions() {
		if (this.height) {
			this.template.querySelector('.container').style.height = this.height;
		}
		if (this.width) {
			this.template.querySelector('.container').style.width = this.width;
		}
	}

	async processParams(input){

		const qIndex = input.indexOf('?')

		// if no dynamic params, return the normal params
		if(qIndex === -1) return ``;

		const array = input.slice(qIndex + 1)

		const params = []
		const params_normal = []

		// get the param name, object and field
		array.split('&').forEach(p => {

			console.log('dyn param p: ' + p);

			if(!p.includes('=')) return;
			if(!p.includes('{') || !p.includes('}')) {
				params_normal.push({
					param: p.split('=')[0],
					value: p.split('=')[1],
				})
				return;
			}

			const [param, value] = p.split('=')
			const [sobjectApi, field] = value
				.replace('{', '')
				.replace('}', '')
				.split('.');

			const res = {
				param,
				sobjectApi,
				field,
				value: '',
			}

			if(res.sobjectApi.toLowerCase() === 'user'){
				res.recordId = userId;
			}
			else {
				res.recordId = this.recordId || userId;
			}

			params.push(res)
		})

		this._params_normal = params_normal;
		this._params = params;

		// if no dynamic params, return the normal params
		if(!params.length) return `?${this.buildParams(...params_normal)}`

		// call apex to get the values
		const processed = await findParams({
			params: params
		})

		this._processed = processed;
		
		// build the param string
		const result = `?${this.buildParams(...params_normal, ...JSON.parse(processed))}`

		this._processedParams = result;

		return result;
	}

	buildParams(...arr){
		return arr.map(p => `${p.param}=${p.value}`).join('&')
	}

	async processURL(input){

		const regex = /{([^}]+)}/g;

		const matches = input.match(regex);

		const params = matches.map(match => {
			const s = match.replace('{', '').replace('}', '');
			const [sobjectApi, field] = s.split('.')
			
			const res = {
				field,
				sobjectApi,
				param: match,
				value: '',
			}

			if(res.sobjectApi.toLowerCase() === 'user'){
				res.recordId = userId;
			}
			else {
				res.recordId = this.recordId || userId;
			}

			return res;
		})

		const res = await findParams({
			params: params
		})

		return JSON.parse(res).reduce((acc, r) => {
			const { param, value } = r;
			return acc.replace(param, value);
		}, input);
	}

	showToast(title, message, variant) {
		const event = new ShowToastEvent({
			title: title,
			message: message,
			variant: variant,
		});
		this.dispatchEvent(event);
	}

	handleError(error) {
		console.log('iframe error: ' + error)
		const msg = error?.body?.message || error?.message || error || 'Unknown iframe error';
		this.showToast(msg, msg, 'error');
	}
}