class Session{
    constructor(){
        this.socket = io()

        this.socket.on('connect', () => {
            this.onConnect()

            this.socket.on('session', data => this.initialize(data) )
            this.socket.on('granted', data => this.onGranted(data))
            this.socket.on('denied', data => this.onDenied(data))
            this.socket.on('reply', data => this.onReply(data))
        })

        this.socket.on("connect_error", error => this.onError(error) )
    }
    

    onError(error){
        console.log(`connect_error due to ${error.message}`);
    }

    onConnect(){
        console.log('connect')
    }

    onGranted(data){
        console.log('granted', data)
    }

    onDenied(data){
        console.log('denied', data)
    }

    onReply(data){
        console.log('reply', data)
    }

    initialize(data){
        console.log('initialize', data)
    }

    send(type, data){
        data.timestamp = Date.now()
        this.socket.emit(type, data)
    }

    login(accessKey, password){
        this.send('login', {
            accessKey: accessKey,
            password: password
        })
    }

    signal(from, to, data){
        this.send('signal',{
            from: from,
            to: to,
            ...data
        })
    }

    reply(from, to, data){
        this.send('reply', {
            from: from,
            to: to,
            ...data
        })
    }
}
