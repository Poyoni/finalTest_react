import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Status } from '../types';
import axios from 'axios';

interface resourcesStateType {
    resources: {
        name: string;
        amount: number;
    };
    status: Status;
    error: string | null;
}

const initialState: resourcesStateType = {
    resources: {
        name: '',
        amount: 0
    },
    status: 'idle',
    error: null
}

export const fetchResources = createAsyncThunk(
    "resources/fetchResources",
    async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/attackPag" ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  );

export const voteCandidate = createAsyncThunk(
  "candidates/voteCandidate",
  async (candidateId: string,) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`http://localhost:3000/api/candidates/${candidateId}/vote`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
)
  
  export const attackSlice = createSlice({
    name: "candidates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchResources.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.resources = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch resources";
      })
      // .addCase(voteCandidate.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(voteCandidate.fulfilled, (state, action) => {
      //   const updatedCandidate = action.payload;
      //   state.candidates = state.candidates.map(candidate =>
      //     candidate._id === updatedCandidate._id ? updatedCandidate : candidate
      //   );
      //   state.status = "succeeded";
      // })
      // .addCase(voteCandidate.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message || "Failed to vote";
      //   console.error("Error while voting:", action.error);
      // });
    
    },
  });
  
  export default attackSlice.reducer;


