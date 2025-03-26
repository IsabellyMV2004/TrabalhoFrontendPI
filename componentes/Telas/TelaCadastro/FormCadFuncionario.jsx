//import React from 'react';
/*import './telaCadastro.css';
import { useState, React } from 'react';
import { Button, Col, Form, Row} from 'react-bootstrap';
import { alterarFuncionario, gravarFuncionario } from '../../../servicos/servicoFuncionario';
import toast, {Toaster} from 'react-hot-toast';

export default function FormCadFuncionarios(props) {
const [funcionario, setFuncionario] = useState(props.funcionarioSelecionado);
const [formValidado, setFormValidado] = useState(false);


function manipularSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
 
        if (!props.modoEdicao) {
            // Cadastrar o funcionario
            gravarFuncionario(funcionario)
                .then((resultado) => {
                    if (resultado.status) {
                        props.setExibirTabela(true);
                    } else {
                        toast.error(resultado.mensagem);
                    }
                });
        } else {
            // Editar o funcionario
            alterarFuncionario(funcionario)
                .then((resultado) => {
                    if (resultado.status) {
                        props.setListaDeFuncionarios(
                            props.listaDeFuncionarios.map((item) => {
                                if (item.codigo !== funcionario.codigo) return item;
                                else return funcionario;
                            })
                        );
 
                        // Após a alteração, resetar o estado para o modo de adição
                        props.setModoEdicao(false); // Mudar para o modo de adicionar
                        
                        // Resetar o funcionario selecionado
                        props.setFuncionarioSelecionado({
                            codigo: 0,
                            nome: "",
                            cpf: "",
                            cargo:"",
                            nivel:""
                        });
 
                        // Mostrar a tabela novamente
                        props.setExibirTabela(true);
                    } else {
                        toast.error(resultado.mensagem);
                    }
                });
        }
    } else {
        setFormValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
 }
 
    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setFuncionario({ ...funcionario, [elemento]: valor });
    }

         return (
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <div className="cadastro-wrapper">
                <div className="cadastro-container">
                    <h1>Cadastro de Funcionario</h1>
                    
                    <label>Nome</label>
                    <input type="text" placeholder="Informe o nome completo" id="nome" name="nome" value={funcionario.nome} onChange={manipularMudanca}/>

                    <label>CPF</label>
                    <input type="text" placeholder="000.000.000-00" id="cpf" name="cpf" value={funcionario.cpf} onChange={manipularMudanca}/>
                    
                    <label>Cargo</label>
                    <input type="text" placeholder="Informe o cargo" id="cargo" name="cargo" value={funcionario.cargo} onChange={manipularMudanca}/>
                    
                    <label>Nivel de Acesso</label>
                    <input type="text" placeholder="MédInforme o nivel" id="nivel" name="nivel" value={funcionario.nivel} onChange={manipularMudanca}/>
                    
                    <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                    </Row>
                </div>
            </div>
            </Form>
        );
}
*/



import './FormCadFuncionario.css';
import { useState, React, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { alterarFuncionario, gravarFuncionario } from '../../../servicos/servicoFuncionario';
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadFuncionarios(props) {
    const [funcionario, setFuncionario] = useState(
        props.funcionarioSelecionado || { codigo: 0, nome: "", cpf: "", cargo: "", nivel: "" }
    );
    const [formValidado, setFormValidado] = useState(false);

    // Atualiza o estado quando o funcionarioSelecionado mudar
    useEffect(() => {
        setFuncionario(props.funcionarioSelecionado || { codigo: 0, nome: "", cpf: "", cargo: "", nivel: "" });
    }, [props.funcionarioSelecionado]);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                // Cadastrar o funcionário
                gravarFuncionario(funcionario)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setExibirTabela(true);
                        } else {
                            toast.error(resultado.mensagem);
                        }
                    });
            } else {
                // Editar o funcionário
                alterarFuncionario(funcionario)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setListaDeFuncionarios(
                                props.listaDeFuncionarios.map((item) =>
                                    item.codigo !== funcionario.codigo ? item : funcionario
                                )
                            );

                            // Resetar o estado para o modo de adição
                            props.setModoEdicao(false);
                            props.setFuncionarioSelecionado({ codigo: 0, nome: "", cpf: "", cargo: "", nivel: "" });

                            // Mostrar a tabela novamente
                            props.setExibirTabela(true);
                        } else {
                            toast.error(resultado.mensagem);
                        }
                    });
            }
        } else {
            setFormValidado(true);
        }
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setFuncionario((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <div className="cadastro-wrapper">
                <div className="cadastro-container">
                    <h1>Cadastro de Funcionário</h1>

                    <label>Nome</label>
                    <input type="text" placeholder="Informe o nome completo" id="nome" name="nome"
                        value={funcionario.nome} onChange={manipularMudanca} required />

                    <label>CPF</label>
                    <input type="text" placeholder="000.000.000-00" id="cpf" name="cpf"
                        value={funcionario.cpf} onChange={manipularMudanca} required />

                    <label>Cargo</label>
                    <input type="text" placeholder="Informe o cargo" id="cargo" name="cargo"
                        value={funcionario.cargo} onChange={manipularMudanca} required />

                    <label>Nível de Acesso</label>
                    <input type="text" placeholder="Informe o nível" id="nivel" name="nivel"
                        value={funcionario.nivel} onChange={manipularMudanca} required />
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </div>
            </div>
        </Form>
    );
}
