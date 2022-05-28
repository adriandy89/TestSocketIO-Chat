class App extends AbstractApp{
        
    constructor(username, message, output, actions, sendData){
        super()
        this.username= username;        
        this.message=message;        
        this.output=output;        
        this.actions=actions;        
        this.sendb=sendData;
        
        //Events
        this.sendb.addEventListener('click', () => this.send('chat:message', {username: username.value, message: message.value}));
        this.message.addEventListener('keypress', () => this.send('chat:typing', {username: username.value}))
        this.message.addEventListener('', () => this.send('chat:typing', {username: username.value}))
        this.message.addEventListener('focusout', () => this.send('chat:nottyping', {}))

        //Sockets - actions
        this.socket.on('chat:nottyping', () => {
            actions.innerHTML = ''
        })
        this.socket.on('chat:message', data => {
            actions.innerHTML = ''
            output.innerHTML += `<p><strong>${data.username}: </strong> <span style="border: 1px solid; padding: 5px; border-radius: 10px;">${data.message} . 
                                --- ${new Date(data.timestamp).getDate()}/${new Date(data.timestamp).getMonth()+1}/${new Date(data.timestamp).getFullYear()}</span></p>`
        })        
        this.socket.on('chat:typing', data => {
            actions.innerHTML = `<p><em>${data.username} esta escribiendo</em></p>`
        })
        }
    }

    

    
