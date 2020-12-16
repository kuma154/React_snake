import React from 'react'

const Snack = ({snackDots}) => {
    return (
        <div>
            
            {snackDots.map((item,index)=>{
                
                const style={
                    left:`${item[0]}%`,
                    top:`${item[1]}%`
                }
                return (<div key={index} className='snake-dot' style={style}></div>)
            })}
        </div>
    )
}

export default Snack

