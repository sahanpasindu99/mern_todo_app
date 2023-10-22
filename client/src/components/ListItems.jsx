import React from 'react'

const ListItems = (props) => {
  return (
    <div>
    <div >
      <p className=''>{props.title}</p>
    </div>
    <div>
      <button >Edit</button>
      <button >Delete</button>
    </div>
    </div>

  )
}

export default ListItems