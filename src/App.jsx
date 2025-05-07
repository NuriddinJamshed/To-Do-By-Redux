import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addNewUser, changeStatus, delUser, editUserData} from './reducers/tableUsers'

const App = () => {
  const dispatch = useDispatch()
  const data = useSelector((store)=>store.DataUsers.data)
  const [addModal, setModal] = useState(false)
  const [addName, setAddName] = useState("")
  const [addAge, setAddAge] = useState("")
  const [addStatus, setAddStatus] = useState("false")
  const [editModal, setEditModal] = useState(false)
  const [editName, setEditName] = useState("")
  const [editAge, setEditAge] = useState("")
  const [editStatus, setEditStatus] = useState("false")
  const [idx, setIdx] = useState(null)

  function addUser(){
    let user={
      name: addName,
      age: addAge,
      status: addStatus=="true"?true:false,
      id: Date.now()
    }
    dispatch(addNewUser(user))
  }

  function editUser(){
    let user={
      name: editName,
      age: editAge,
      status: editStatus=="true"?true:false,
      id: idx
    }
    dispatch(editUserData(user))
  }

  function editFunc(elem){
    setEditName(elem.name)
    setEditAge(elem.age)
    setEditStatus(elem.status)
    setIdx(elem.id)
    setEditModal(!editModal)
  }


  return (
    <div>
      <button onClick={()=>setModal(!addModal)}>ADD USER</button>
      {
        addModal && (
          <div>
            <input value={addName} onInput={(e)=>setAddName(e.target.value)} type="text" placeholder='Name' />
            <input value={addAge} onInput={(e)=>setAddAge(e.target.value)} type="text" placeholder='Age' />
            <select value={addStatus} onChange={(e)=>setAddStatus(e.target.value)}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <button onClick={()=>{
              setModal(!addModal);
              addUser()
            }}>Add User</button>
            <button onClick={()=>setModal(!addModal)}>Close</button>
          </div>
        )
      }
      {
        editModal && (
          <div>
            <input value={editName} onInput={(e)=>setEditName(e.target.value)} type="text" placeholder='Name' />
            <input value={editAge} onInput={(e)=>setEditAge(e.target.value)} type="text" placeholder='Age' />
            <select value={editStatus} onChange={(e)=>setEditStatus(e.target.value)}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <button onClick={()=>{
              setEditModal(!editModal);
              editUser()
            }}>Add User</button>
            <button onClick={()=>setEditModal(!editModal)}>Close</button>
          </div>
        )
      }
      {
        data.map((el)=>(
          <div key={el.id}>
            <h1>{el.name}</h1>
            <h1>{el.age}</h1>
            <h1>{el.status?"Active":"Inactive"}</h1>
            <div className='actions'>
              <input checked={el.status} type="checkbox" onChange={()=>dispatch(changeStatus(el))} />
              <button onClick={()=>dispatch(delUser(el.id))}>Delete</button>
              <button onClick={()=>editFunc(el)}>Edit</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default App