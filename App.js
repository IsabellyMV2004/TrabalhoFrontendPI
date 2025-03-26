    // App.js
    import 'bootstrap/dist/css/bootstrap.min.css';
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import TelaPrincipal from './componentes/Telas/TelaPrincipal/telaPrincipal';
    import TelaLoginADM from './componentes/Telas/TelaLoginADM/telaLoginADM';
    import TelaCadastro from './componentes/Telas/TelaCadastro/FormCadFuncionario';
    import TelaTabela from './componentes/TelaCadastroFuncionario';
    
    import './App.css'

    function App() {
        return (
            <Router>
                <div className="app-background"> 
                    <Routes>
                        <Route path="/" element={<TelaLoginADM />} />
                        <Route path="/cadastro_funcionarios" element={<TelaCadastro />} />
                        <Route path="/tabela_funcionarios" element={<TelaTabela />} />
                        <Route path="/principal_funcionarios" element={<TelaPrincipal />} />
                    </Routes>
                </div>
            </Router>
        );
    }

    export default App;



    /* import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import TelaPrincipalFuncionarios from './Telas/TelaPrincipal/telaPrincipal';
import TelaCadastroFuncioanrio from './Telas/TelaCadastro/telaCadastro';
import './App.css'

export const ContextoUsuario = createContext();

function PrivateRoute({ children }) {
  const { usuario } = useContext(ContextoUsuario);
  return usuario.logado ? children : <Navigate to="/" />;
}

function App() {
  const [usuario, setUsuario] = useState({
    usuario: "",
    logado: false,
  });

  // Recuperar estado do usuário do localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (userData) {
      setUsuario(userData);
    }
  }, []);

  // Salvar estado do usuário no localStorage
  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [usuario]);

  return (
    <Provider store={store}>
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <BrowserRouter basename="FrontendTrabalho">
          {usuario.logado ? (
            <Routes>
              <Route path="/" element={<TelaMenu />} />
              <Route
                path="/cadastro_funcionarios"
                element={
                  <PrivateRoute>
                    <TelaCadastroFuncioanrio />
                  </PrivateRoute>
                }
              />
              <Route
                path="/principal_funcionarios"
                element={
                  <PrivateRoute>
                    <TelaPrincipalFuncionarios />
                  </PrivateRoute>
                }
              />
            </Routes>
          ) : (
            <TelaLogin />
          )}
        </BrowserRouter>
      </ContextoUsuario.Provider>
    </Provider>
  );
}

export default App;*/