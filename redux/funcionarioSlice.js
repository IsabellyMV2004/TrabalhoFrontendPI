
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Para realizar as chamadas à API.
import ESTADO from "./estados";

// URL base da API
const API_URL = "https://backend-trabalho.vercel.app/funcionarios";

// Estado inicial
const initialState = {
  listaDeFuncionarios: [],
  estado: ESTADO.OCIOSO,
  mensagem: "",
};

// Thunks assíncronos
export const fetchFuncionarios = createAsyncThunk(
  "funcionarios/fetchFuncionarios",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Retorna a lista de funcionarios.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao consultar funcionarios.");
    }
  }
);

export const deleteFuncionario = createAsyncThunk(
  "funcionarios/deleteFuncionario",
  async (funcionario, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${funcionario.codigo}`);
      return funcionario.codigo; // Retorna o código do funcionario excluído.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao excluir funcionario.");
    }
  }
);

export const addFuncionario = createAsyncThunk(
  "funcionarios/addFuncionario",
  async (funcionario, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, funcionario);
      return response.data; // Retorna o funcionario cadastrado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao adicionar funcionario.");
    }
  }
);

export const updateFuncionario = createAsyncThunk(
  "funcionarios/updateFuncionario",
  async (funcionario, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${funcionario.codigo}`, funcionario);
      return response.data; // Retorna o funcionario atualizado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao alterar funcionario.");
    }
  }
);

// Slice de funcionarios
const funcionarioSlice = createSlice({
  name: "funcionarios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch funcionarios
      .addCase(fetchFuncionarios.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
      })
      .addCase(fetchFuncionarios.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.listaDeFuncionarios = action.payload;
      })
      .addCase(fetchFuncionarios.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Delete funcionario
      .addCase(deleteFuncionario.fulfilled, (state, action) => {
        state.listaDeFuncionarios = state.listaDeFuncionarios.filter(
          (item) => item.codigo !== action.payload
        );
      })
      .addCase(deleteFuncionario.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Add funcionario
      .addCase(addFuncionario.fulfilled, (state, action) => {
        state.listaDeFuncionarios.push(action.payload);
      })
      .addCase(addFuncionario.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Update funcionario
      .addCase(updateFuncionario.fulfilled, (state, action) => {
        const index = state.listaDeFuncionarios.findIndex(
          (item) => item.codigo === action.payload.codigo
        );
        if (index !== -1) {
          state.listaDeFuncionarios[index] = action.payload;
        }
      })
      .addCase(updateFuncionario.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      });
  },
});

export default funcionarioSlice.reducer;
