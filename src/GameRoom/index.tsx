import React from 'react'
import UsersSection from "./UsersSection"

const GameRoom = () => {
    const [usersArray, setUsersArray] = React.useState<string[]>([])
    const [username, setUsername] = React.useState<string>()

    const socket = React.useRef<WebSocket | null>(null)
    const [socketConnected, setSocketConnected] = React.useState<boolean | undefined>(undefined)

    function connect(): void {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = (): void => {
            setSocketConnected(true)

            const message: object = {
                event: 'connection',
                username
            }

            if (socket.current) {
                socket.current.send(JSON.stringify(message))
            }
        }

        socket.current.onmessage = (event: MessageEvent): void => {
            const message = JSON.parse(event.data)
            console.log(message)

            switch (message.event) {
                case 'connection':
                    setUsersArray(prev => [message.username, ...prev])
                    break
                case 'getUsers':
                    setUsersArray(message.usersArray)
                    break
            }
        }
    }

    if(!socketConnected) {
        return (
            <div>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="nickname"/>
                <button onClick={connect}>Войти</button>
            </div>
        )
    }

    return (
        <div>
            <UsersSection usersArray={usersArray}/>
        </div>
    )
}

export default GameRoom