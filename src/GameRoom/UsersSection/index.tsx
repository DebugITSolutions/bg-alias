import React from 'react'

interface PlayersSectionProps {
    usersArray: string[]
}

const UsersSection: React.FC<PlayersSectionProps> = ({ usersArray }) => {
    return (
        <div>
            В комнате:
            {
                usersArray.map((username, index) =>
                    <li key={index}>{username}</li>
                )
            }
        </div>
    )
}

export default UsersSection