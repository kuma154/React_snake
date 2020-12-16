import React from 'react'

const Food = ({food}) => {
   
    const style={
        left:`${food[0]}%`,
        top:`${food[1]}%`
    }
    return (
        <div>
            {<div style={style} className='snake-food'></div>}
        </div> 
    )
}

export default Food
