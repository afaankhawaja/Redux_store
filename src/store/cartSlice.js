const {createSlice,nanoid} =require('@reduxjs/toolkit')
const cartSlice=createSlice({
    name:"cart",
    initialState:[],
   
    reducers:{
               addItem(state,action){
                const product={
                    id:nanoid(),
                    data:action.payload,
                }
                state.push(product)
               },
               removeItem(state,action){
                return  state.filter(item=>item.id!==action.payload)
               },
              
    },
})
export const {addItem,removeItem} =cartSlice.actions
export default cartSlice.reducer