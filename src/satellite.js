import Base from './_base.js';

export default class Satellite extends Base {
    _construct(config) {
        this.subscribers = {};
        this.store = config;
    }
    subscribe(component, bindAs) {
        if(bindAs) {
            component[bindAs] = this
        }
        this.subscribers[component.pid] = component;
        this.subscribers[component.pid]._onTerminate = (process) => {
            this.unsubscribe(component);
        }
        this.subscribers[component.pid].synchronize()
        return this
    }
    unsubscribe(component) {
        delete this.subscribers[component.pid];
    }
    setStore(store) {
        this.publish(store)
    }
    publish(store) {
        // todo: clean this up - different apps might use publish and not setStore, but setStore makes more sense
        // probably major version bump this
        super.setStore(store);
        for(let subscriber in this.subscribers) {
            this.subscribers[subscriber].synchronize();
        }
    }
}
