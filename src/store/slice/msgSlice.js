import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const msgSlice = createSlice({
    name: "msgSlice",
    initialState: [],
    reducers: {
        addMsg(state, action) {
            state.push({
                id: action.payload.id,
                type: action.payload.success ? "success" : "danger",
                title: action.payload.success ? "成功" : "失敗",
                text: action.payload.message,
            });
        },
        removeMsg(state, action) {
            const idx = state.findIndex((item) => item.id === action.payload);
            if (idx !== -1) {
                state.splice(idx, 1);
            }
        },
    },
});

export const { addMsg, removeMsg } = msgSlice.actions;

const createAsyncMessage = createAsyncThunk(
    "createAsyncMsg",
    async (payload, { dispatch, requestId }) => {
        dispatch(addMsg({ ...payload, id: requestId }));
        setTimeout(() => {
            dispatch(removeMsg(requestId));
        }, 3000);
    },
);

export default msgSlice.reducer;
export { createAsyncMessage };
