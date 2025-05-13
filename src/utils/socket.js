const socket = require('socket.io');

const initializeSocket = (server) => {

    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    })

    //io is used to receive the connection, listening to connections

    io.on('connection', (socket) => {
        //handle events

        socket.on("joinChat", () => {

        })

        socket.on("sendMessage", () => {

        })

        socket.on("disconnect", () => {

        })
    })
}

module.exports = initializeSocket