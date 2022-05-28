class AbstractApp extends Session{
    constructor(){
        super()
        if (new.target === AbstractApp) {
            throw new TypeError("Cannot construct Abstract instances directly!!");
        }
    }

}
