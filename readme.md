> Love Vue.js?  Love W3C validator too? Use vue-w3c-valid libruary!

## Install

### NMP + webpack (and similar)
```
$ npm i vue-w3c-valid --save
```
```js
import VueW3CValid from 'vue-w3c-valid';
```

### Simple
```
<script src="https:// ... "></script>
```
## Usage

```js
new VueW3CValid({
    el: '.yourElement'
});
```

It`s transform data-attributes to Vue.js directives and components!

## Transforms

### data-v to Vue.js directives
| before  | after  |
|---|---|
| <input data-v-if="some">  |  <input v-if="some"> |
| <input data-v-show="some">  |  <input v-show="some"> |

### data-v with _ to :

| <input data-v-bind_value="some">  |  <input v-bind:value="some"> |
| <button data-v-on_click="some">  |  <input v-on:click="some"> |

### data-vue to simple attribytes
| before  | after  |
|---|---|
| <div data-vue-slot="some">1</div>  | <div slot="some">1</div> |

### data-vue-role to HTML tag
| before  | after  |
|---|---|
| <div data-vue-role="transition">...</div>  | <transition>...</transition> |

### So, it sorks nice! As sample:
```html
<div class="directivesValid">
    <input type="button" value="change" data-v-on_click.prevent="ordered = !ordered">
    <ol data-v-if="ordered">
        <li data-v-for="item in items">{{ item }}</li>
    </ol>
    <ul data-v-else>
        <li data-v-for="item in items">{{ item }}</li>
    </ul>
    <div data-vue-role="transition" data-vue-name="fade" data-vue-mode="out-in">
        <input type="text" data-v-bind_value="ordered" data-v-show="ordered">
    </div>
    <div data-vue-role="some-div">
        <p>Message</p>
        <p data-vue-slot="footer">Message</p>
    </div>
</div>
```
#### It's valid HTML code! Let's render to Vue:

```js
new VueW3CValid({
	el: '.directivesValid'
});
```
#### In DOM We get
```html
<div class="directivesValid">
	<input value="change" v-on:click.prevent="ordered = !ordered" type="button">
	<ol v-if="ordered">
		<li v-for="item in items">{{ item }}</li>
	</ol>
	<ul v-else="">
		<li v-for="item in items">{{ item }}</li>
	</ul>
	<transition name="fade" mode="out-in">
		<input v-bind:value="ordered" v-show="ordered" type="text">
	</transition>
	<some-div>
		<p>Message</p>
		<p slot="footer">Message</p>
	</some-div>
</div>
```
#### And Vue.js works good:
```js
Vue.component('someDiv', {
	template: `
		<div class="some">
			<hr>
			<slot></slot>
			<hr>
			<slot name="footer"></slot>
			<hr>
		</div>
	`
});

new Vue({
	el: '.directivesValid',
	data: {
		items: ['a', 'b', 'c'],
		ordered: false
	}
});
```

#### You can find this sample on ...
