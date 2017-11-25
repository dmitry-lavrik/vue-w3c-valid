"use strict";

export default class VueW3CValid{

	constructor(options){
		let defaults = {
			autoRender: true,
			dataSetRole: 'vueRole',
			attrSetRole: 'data-vue-role',
			patternAttrs: /^data-vue-(.*)$/g,
			patternDirective: /^data-v-(.*)$/g,
			patternDots: /^(bind|on){0,1}-(.*)$/g
		};

		this.options = Object.assign({}, defaults, options);

		if(this.options.autoRender){
			this.render();
		}
	}

	render(){
		let el = document.querySelector(this.options.el);
		
		if(el === null){
			console.log('Error! HTML Element wan`t found!');
		}

		this._renderNode(el);
	}

	_renderNode(el){
		let node = el;
		let rerender = false;
		let newNode;
		let changes = [];

		if(el.dataset[this.options.dataSetRole]){
			newNode = document.createElement(el.dataset[this.options.dataSetRole]);
			el.removeAttribute(this.options.attrSetRole);
			rerender = true;
		}

		this._replaceAttributes(el);

		for(let i = 0; i < el.children.length; i++){
			let child = this._renderNode(el.children[i]);

			if(child !== el.children[i]){
				changes.push({
					old: el.children[i],
					new: child
				});
			}
		}

		for(let i = 0; i < changes.length; i++){
			this._copyNode(changes[i].old, changes[i].new);
			el.insertBefore(changes[i].new, changes[i].old);
			el.removeChild(changes[i].old);
		}

		if(rerender){
			node = newNode;
		}

		return node;
	}

	_replaceAttributes(el){
		let changes = [];

		for(let i = 0; i < el.attributes.length; i++){
			let name = el.attributes[i].nodeName;
			let value = el.attributes[i].value;

			if(this.options.patternAttrs.test(name)){
				let newName = this._researchAttr(name);
				changes.push({name, newName, value});
			}
			else if(this.options.patternDirective.test(name)){
				let newName = this._researchDirective(name);
				changes.push({name, newName, value});
			}
		}

		for(let i = 0; i < changes.length; i++){
			el.removeAttribute(changes[i].name);
			el.setAttribute(changes[i].newName, changes[i].value);
		}
	}

	_researchAttr(name){
		return name.replace(this.options.patternAttrs, (full, part) => {
			return part;
		});
	}

	_researchDirective(name){
		return name.replace(this.options.patternDirective, (full, part) => {
			if(this.options.patternDots.test(part)){
				part = part.replace(this.options.patternDots, (full, name, val) => {
					return name + ':' + val;
				});
			}

			return 'v-' + part;
		});
	}

	_copyNode(oldNode, newNode){
		newNode.innerHTML = oldNode.innerHTML;

		for(let i = 0; i < oldNode.attributes.length; i++){
			newNode.setAttribute(oldNode.attributes[i].nodeName, oldNode.attributes[i].value);
		}
	}
}