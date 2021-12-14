import React from 'react'
import { useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation();

    return (
        <div>
            Successfully submitted {location.state.name}
        </div>
    )
}

export default Success
