import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    return (
        <div>
            Successfully submitted {location.state.name}
        </div>
    )
}

export default Success
