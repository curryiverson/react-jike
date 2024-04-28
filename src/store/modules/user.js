//用户相关

import { createSlice } from '@reduxjs/toolkit'
import { request } from '../../utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token_key') || '',
  },
  //同步修改方法
  reducers:{
    setToken(state, action){
      state.token = action.payload
      //token本地持久化
      localStorage.setItem('token_key', action.payload)
    }
  }
})
//解构出actionCreater函数
const {setToken} = userStore.actions

//获取reducer函数
const userRuducer = userStore.reducer

//异步方法
const fetchLogin =  (loginForm)=> {
 return async (disptach)=> {
  const res = await request.post('/authorizations', loginForm)
  console.log('res', res)
  disptach(setToken(res.data.data.token))
 }
}

export {setToken, fetchLogin}

export default userRuducer
