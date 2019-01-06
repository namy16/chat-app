import React from 'react'

class ChannelList extends React.Component {
    render () {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id)
        return (
            <div className="rooms-list">
                <ul>
                <h3>Available Channels:</h3>
                    {orderedRooms.length > 0 ? orderedRooms.map(room => {
                        const active = room.id === this.props.roomId ? 'rooms-button_active' : '';
                        return (
                            <li key={room.id}>
                                <button className={active ===''?'rooms-button':active}
                                    onClick={() => this.props.subscribeToRoom(room.id)}
                                    >
                                     {room.name}
                                </button>
                            </li>
                        )
                    }):<p style={{color:"lightgrey"}}>No Channels Found</p>}
                </ul>
            </div>
        )
    }
}

export default ChannelList