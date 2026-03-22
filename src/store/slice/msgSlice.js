import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const msgSlice = createSlice({
    name: "msgSlice",
    initialState: [
        // {
        //     id: 123,
        //     type: "success",
        //     title: '成功',
        //     text: "default message",
        //     totalCountInCart: 0,
        // },
    ],
    reducer: {
        addMsg(state, action) {
            console.log("addMsg", action.payload);
            state.push({
                id: action.payload.id,
                type: action.payload.success ? "success" : "danger",
                title: action.payload.success ? "成功" : "失敗",
                text: action.payload.message,
                // totalCountInCart: 0,
            });
        },
        removeMsg(state, action) {
            console.log("removeMsg", action.payload);
            const idx = state.findIndex(
                (value, index) => value.id === action.payload,
            );
            if (idx) {
                state.splice(state[idx], 1);
            }
        },
    },
});

const createAsyncMessage = createAsyncThunk(
    "createAsyncMsg",
    async (payload, { dispatch, requestId }) => {
        console.log("createAsyncMsg", payload, requestId);
        dispatch(
            addMsg({
                ...payload,
                id: requestId,
            }),
        );
        setTimeout(() => {
            dispatch(removeMsg(requestId));
        }, 2000);
    },
);

export default msgSlice.reducer;
export {createAsyncMessage}
