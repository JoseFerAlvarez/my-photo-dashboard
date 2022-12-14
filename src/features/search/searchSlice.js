import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPhotos } from "./photosAPI";

export const getApiPhotos = createAsyncThunk(
    "search/fetchPhotos",
    async (query) => {
        return await fetchPhotos(query);
    }
)

const initialState = {
    images: [],
}

export const searchSlice = createSlice({
    name: "photos",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getApiPhotos.fulfilled, (state, action) => {
                state.images = action.payload;
            })
            .addCase(getApiPhotos.rejected, () => {
                console.error("No se han podido encontrar imagenes.");
            });
    }
});

export default searchSlice.reducer;
