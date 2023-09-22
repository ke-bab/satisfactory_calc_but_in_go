export class EventBus {
    static events = []
    static publish(name, ...args) {
        const callbackList = this.events[name];

        if (!callbackList) return console.warn(name + " not found!");

        for (let callback of callbackList) {
            callback(...args);
        }
    }

    static subscribe(name, callback) {
        if (!this.events[name]) {
            this.events[name] = [];
        }

        this.events[name].push(callback);
    }
}