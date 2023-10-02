export class EventBus {
    static events = []

    static publish(name, ...args) {
        console.log("published - " + name)
        const callbackList = this.events[name];

        if (!callbackList) return console.warn(name + " not found!");

        for (let callback of callbackList) {
            callback(...args);
        }
    }

    static subscribe(name, callback) {
        console.log(callback.toString())
        console.log(callback)
        if (!this.events[name]) {
            this.events[name] = [];
        }
        let foundSame = this.events[name].some((event) => {
            return callback.toString() === event.toString()
        })
        if (foundSame) {
            // return
        }
        console.log("subscribed - " + name)

        this.events[name].push(callback);
    }
}