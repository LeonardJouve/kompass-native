
import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';

class Websocket {
    private pusher?: Pusher;
    private echo?: Echo;

    init(websocketHost: string, websocketPort: string, websocketKey: string) {
        this.pusher = new Pusher(websocketKey, {
            wsHost: websocketHost,
            wsPort: Number(websocketPort),
            enabledTransports: ['ws'],
            forceTLS: false,
        });

        this.echo = new Echo({
            broadcaster: 'pusher',
            client: this.pusher,
        });
    }

    connect() {
        this.echo?.connect();
    }

    disconnect() {
        this.echo?.disconnect();
    }

    join(channelName: string) {
        this.echo?.join(channelName);
    }

    leave(channelName: string) {
        this.echo?.leave(channelName);
    }

    listen(channelName: string, eventName: string, callback: Function) {
        this.echo?.channel(channelName).listen(eventName, callback);
    }

    stopListening(channelName: string, eventName: string, callback: Function) {
        this.echo?.channel(channelName).stopListening(eventName, callback);
    }

    listenToAll(channelName: string, callback: Function) {
        //@ts-ignore
        this.echo?.channel(channelName).listenToAll(callback);
    }

    // This unfortunatly doesn't work.
    // Needs more investigation.
    stopListeningToAll(channelName: string, callback: Function) {
        //@ts-ignore
        this.echo?.channel(channelName).stopListeningToAll(callback);
    }
}

export default new Websocket();
