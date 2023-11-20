import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import axios from "axios";

const initialState = {
  loading: false,
};
