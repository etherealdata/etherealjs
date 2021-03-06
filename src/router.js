import Base from './_base.js';

export default class Router extends Base {
	_onLoaded(config){
		this.routes = config.routes;
		this.runtime = config.runtime;
		this.context = config.context;
		if(!this.routes || !this.runtime) {
			throw new Error('Config missing routes or runtime')
        }
		this.path = window.location.pathname;
		if(this.routes[this.path]) {
			new this.runtime.library[this.routes[this.path]]({
				origin: this, 
				context: this.context, 
				attributes: this.context.attributes, 
				runtime: this.runtime
			});
		}
		super._onLoaded();
	}

}