import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addNewUser, changeStatus, delUser, editUserData} from './reducers/tableUsers'
import "./App.css"

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
    <div className='body'>
      <button onClick={()=>setModal(!addModal)}>ADD USER</button>
      {
        addModal && (
          <div className='modal'>
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
          <div className='modal'>
            <input value={editName} onInput={(e)=>setEditName(e.target.value)} type="text" placeholder='Name' />
            <input value={editAge} onInput={(e)=>setEditAge(e.target.value)} type="text" placeholder='Age' />
            <select value={editStatus} onChange={(e)=>setEditStatus(e.target.value)}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <button onClick={()=>{
              setEditModal(!editModal);
              editUser()
            }}>Edit User</button>
            <button onClick={()=>setEditModal(!editModal)}>Close</button>
          </div>
        )
      }
      <div className="box">
      {
        data.map((el)=>(
          <div className='card' key={el.id}>
            <h1>{el.name}</h1>
            <h2>{el.age}</h2>
            <h3>{el.status?"Active":"Inactive"}</h3>
            <div className='actions'>
              <input checked={el.status} type="checkbox" onChange={()=>dispatch(changeStatus(el))} />
              <button onClick={()=>dispatch(delUser(el.id))}>Delete</button>
              <button onClick={()=>editFunc(el)}>Edit</button>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default App