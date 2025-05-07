import {createSlice} from "@reduxjs/toolkit"

export const tableUsers = createSlice({
    name: "DataUsers",
    initialState: {
        text: "",
        data: [
            {
                name: "Muhammad",
                age: 18,
                status: false ,
                id: 1
            },
            {
                name: "Hushang",
                age: 8,
                status: true ,
                id: 2
            },
            {
                name: "Vali",
                age: 28,
                status: false ,
                id: 3
            }
        ]
    },
    reducers:{
        delUser: (state, id)=>{
            state.data = state.data.filter((el)=>el.id!=id.payload)
        },
        changeStatus: (state, elem)=>{
            state.data = state.data.map((el)=>{
                if(el.id==elem.payload.id){
                    el.status=!el.status
                }
                return el
            })
        },
        addNewUser: (state, elem)=>{
            state.data.push(elem.payload)
        },
        editUserData: (state, elem)=>{
            state.data = state.data.map((el)=>{
                if(el.id==elem.payload.id){
                    return elem.payload
                }
                return el
            })
        }
    }
})

export const {delUser, changeStatus, addNewUser, editUserData} = tableUsers.actions

export default tableUsers.reducer
