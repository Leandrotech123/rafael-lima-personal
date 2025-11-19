import React, { useState } from "react";
import {
  User,
  Dumbbell,
  Calendar,
  TrendingUp,
  DollarSign,
  Plus,
  Search,
  Trash2,
  CheckCircle,
  BarChart3,
  Users,
  Award,
  Eye,
  EyeOff,
  FileText,
  Edit2,
  Save,
} from "lucide-react";

const App = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [telaAuth, setTelaAuth] = useState("login");
  const [tipoCadastro, setTipoCadastro] = useState("");

  const [professores, setProfessores] = useState([
    {
      id: 1,
      email: "rafael@personal.com",
      senha: "123456",
      nome: "Rafael Lima",
    },
  ]);

  const [alunosUsuarios, setAlunosUsuarios] = useState([
    {
      id: 1,
      email: "joao@email.com",
      senha: "123456",
      nome: "João Silva",
      alunoId: 1,
    },
    {
      id: 2,
      email: "maria@email.com",
      senha: "123456",
      nome: "Maria Santos",
      alunoId: 2,
    },
  ]);

  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
    tipo: "",
  });
  const [formCadastro, setFormCadastro] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    idade: "",
    objetivo: "",
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const [telaAtiva, setTelaAtiva] = useState("dashboard");
  const [alunos, setAlunos] = useState([
    {
      id: 1,
      nome: "João Silva",
      idade: 28,
      objetivo: "Hipertrofia",
      plano: "R$ 250/mês",
      status: "ativo",
      ultimoTreino: "2025-11-15",
      anamnese: null,
    },
    {
      id: 2,
      nome: "Maria Santos",
      idade: 32,
      objetivo: "Emagrecimento",
      plano: "R$ 200/mês",
      status: "ativo",
      ultimoTreino: "2025-11-14",
      anamnese: null,
    },
  ]);

  const [treinos, setTreinos] = useState([
    {
      id: 1,
      alunoId: 1,
      nome: "Treino A - Peito",
      data: "2025-11-15",
      concluido: true,
      exercicios: [
        {
          id: 1,
          nome: "Supino Reto",
          series: 4,
          repeticoes: 12,
          carga: 60,
          descanso: 90,
        },
      ],
    },
    {
      id: 2,
      alunoId: 1,
      nome: "Treino B - Costas",
      data: "2025-11-13",
      concluido: false,
      exercicios: [],
    },
  ]);

  const [exercicios, setExercicios] = useState([
    { id: 1, nome: "Supino Reto", categoria: "Peito", musculo: "Peitoral" },
    { id: 2, nome: "Agachamento", categoria: "Pernas", musculo: "Quadríceps" },
    {
      id: 3,
      nome: "Levantamento Terra",
      categoria: "Costas",
      musculo: "Lombar",
    },
    {
      id: 4,
      nome: "Desenvolvimento",
      categoria: "Ombros",
      musculo: "Deltoide",
    },
    { id: 5, nome: "Rosca Direta", categoria: "Braços", musculo: "Bíceps" },
  ]);

  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTipo, setModalTipo] = useState("");
  const [busca, setBusca] = useState("");
  const [novoAluno, setNovoAluno] = useState({
    nome: "",
    idade: "",
    objetivo: "",
    plano: "",
  });
  const [novoTreino, setNovoTreino] = useState({
    nome: "",
    exerciciosSelecionados: [],
  });
  const [novoExercicio, setNovoExercicio] = useState({
    nome: "",
    categoria: "",
    musculo: "",
  });
  const [exercicioEditando, setExercicioEditando] = useState(null);
  const [anamnese, setAnamnese] = useState({
    peso: "",
    altura: "",
    pressao: "",
    frequenciaCardiaca: "",
    doencas: "",
    medicamentos: "",
    lesoes: "",
    restricoes: "",
    fumante: "",
    bebida: "",
    atividade: "",
    observacoes: "",
  });

  const fazerLogin = () => {
    setErro("");
    if (!formLogin.email || !formLogin.senha || !formLogin.tipo) {
      setErro("Preencha todos os campos");
      return;
    }

    if (formLogin.tipo === "professor") {
      const prof = professores.find(
        (p) => p.email === formLogin.email && p.senha === formLogin.senha
      );
      if (prof) {
        setUsuarioLogado(prof);
        setTipoUsuario("professor");
        setTelaAtiva("dashboard");
      } else {
        setErro("Email ou senha incorretos");
      }
    } else {
      const alu = alunosUsuarios.find(
        (a) => a.email === formLogin.email && a.senha === formLogin.senha
      );
      if (alu) {
        setUsuarioLogado(alu);
        setTipoUsuario("aluno");
        setTelaAtiva("meusTreinos");
      } else {
        setErro("Email ou senha incorretos");
      }
    }
  };

  const fazerCadastro = () => {
    setErro("");
    if (
      !formCadastro.nome ||
      !formCadastro.email ||
      !formCadastro.senha ||
      !formCadastro.confirmarSenha
    ) {
      setErro("Preencha todos os campos obrigatórios");
      return;
    }
    if (formCadastro.senha !== formCadastro.confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }
    if (formCadastro.senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    const emailExiste = [...professores, ...alunosUsuarios].some(
      (u) => u.email === formCadastro.email
    );
    if (emailExiste) {
      setErro("Este email já está cadastrado");
      return;
    }

    if (tipoCadastro === "professor") {
      setProfessores([
        ...professores,
        {
          id: professores.length + 1,
          email: formCadastro.email,
          senha: formCadastro.senha,
          nome: formCadastro.nome,
        },
      ]);
      alert("Professor cadastrado com sucesso!");
    } else {
      const novoAlunoId = alunos.length + 1;
      setAlunosUsuarios([
        ...alunosUsuarios,
        {
          id: alunosUsuarios.length + 1,
          email: formCadastro.email,
          senha: formCadastro.senha,
          nome: formCadastro.nome,
          alunoId: novoAlunoId,
        },
      ]);
      setAlunos([
        ...alunos,
        {
          id: novoAlunoId,
          nome: formCadastro.nome,
          idade: formCadastro.idade || 0,
          objetivo: formCadastro.objetivo || "Não definido",
          plano: "R$ 200/mês",
          status: "ativo",
          ultimoTreino: "-",
          anamnese: null,
        },
      ]);
      alert("Aluno cadastrado com sucesso!");
    }

    setFormCadastro({
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      idade: "",
      objetivo: "",
    });
    setTelaAuth("login");
    setTipoCadastro("");
  };

  const fazerLogout = () => {
    setUsuarioLogado(null);
    setTipoUsuario(null);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setModalTipo("");
    setAlunoSelecionado(null);
    setNovoTreino({ nome: "", exerciciosSelecionados: [] });
    setAnamnese({
      peso: "",
      altura: "",
      pressao: "",
      frequenciaCardiaca: "",
      doencas: "",
      medicamentos: "",
      lesoes: "",
      restricoes: "",
      fumante: "",
      bebida: "",
      atividade: "",
      observacoes: "",
    });
  };

  const adicionarExercicioTreino = (exercicio) => {
    if (!novoTreino.exerciciosSelecionados.find((e) => e.id === exercicio.id)) {
      setNovoTreino({
        ...novoTreino,
        exerciciosSelecionados: [
          ...novoTreino.exerciciosSelecionados,
          {
            ...exercicio,
            series: 3,
            repeticoes: 12,
            carga: 0,
            descanso: 60,
          },
        ],
      });
    }
  };

  const removerExercicioTreino = (id) => {
    setNovoTreino({
      ...novoTreino,
      exerciciosSelecionados: novoTreino.exerciciosSelecionados.filter(
        (e) => e.id !== id
      ),
    });
  };

  const atualizarExercicioTreino = (id, campo, valor) => {
    setNovoTreino({
      ...novoTreino,
      exerciciosSelecionados: novoTreino.exerciciosSelecionados.map((e) =>
        e.id === id ? { ...e, [campo]: valor } : e
      ),
    });
  };

  const salvarTreino = () => {
    if (
      novoTreino.nome &&
      novoTreino.exerciciosSelecionados.length > 0 &&
      alunoSelecionado
    ) {
      setTreinos([
        ...treinos,
        {
          id: treinos.length + 1,
          alunoId: alunoSelecionado.id,
          nome: novoTreino.nome,
          data: new Date().toISOString().split("T")[0],
          concluido: false,
          exercicios: novoTreino.exerciciosSelecionados,
        },
      ]);
      fecharModal();
    }
  };

  if (!usuarioLogado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Dumbbell className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white">RAFAEL LIMA</h1>
            <h2 className="text-xl text-blue-200">PERSONAL</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {telaAuth === "login" ? (
              <>
                <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
                {erro && (
                  <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                    {erro}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        setFormLogin({ ...formLogin, tipo: "professor" })
                      }
                      className={`py-3 rounded-lg border-2 ${
                        formLogin.tipo === "professor"
                          ? "border-blue-600 bg-blue-50 font-semibold"
                          : "border-gray-300"
                      }`}
                    >
                      👨‍🏫 Professor
                    </button>
                    <button
                      onClick={() =>
                        setFormLogin({ ...formLogin, tipo: "aluno" })
                      }
                      className={`py-3 rounded-lg border-2 ${
                        formLogin.tipo === "aluno"
                          ? "border-green-600 bg-green-50 font-semibold"
                          : "border-gray-300"
                      }`}
                    >
                      👤 Aluno
                    </button>
                  </div>

                  <input
                    type="email"
                    value={formLogin.email}
                    onChange={(e) =>
                      setFormLogin({ ...formLogin, email: e.target.value })
                    }
                    onKeyDown={(e) => e.key === "Enter" && fazerLogin()}
                    placeholder="Email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="relative">
                    <input
                      type={mostrarSenha ? "text" : "password"}
                      value={formLogin.senha}
                      onChange={(e) =>
                        setFormLogin({ ...formLogin, senha: e.target.value })
                      }
                      onKeyDown={(e) => e.key === "Enter" && fazerLogin()}
                      placeholder="Senha"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute right-3 top-3"
                    >
                      {mostrarSenha ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={fazerLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Entrar
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => setTelaAuth("cadastro")}
                      className="text-blue-600 text-sm"
                    >
                      Não tem conta? Cadastre-se
                    </button>
                  </div>
                </div>
              </>
            ) : tipoCadastro === "" ? (
              <>
                <h3 className="text-2xl font-bold text-center mb-6">
                  Tipo de Cadastro
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setTipoCadastro("professor")}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700"
                  >
                    👨‍🏫 Cadastrar como Professor
                  </button>
                  <button
                    onClick={() => setTipoCadastro("aluno")}
                    className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700"
                  >
                    👤 Cadastrar como Aluno
                  </button>
                  <button
                    onClick={() => setTelaAuth("login")}
                    className="w-full text-blue-600 text-sm"
                  >
                    Voltar para Login
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-center mb-6">
                  Cadastro
                </h3>
                {erro && (
                  <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                    {erro}
                  </div>
                )}

                <div className="space-y-4">
                  <input
                    placeholder="Nome completo"
                    value={formCadastro.nome}
                    onChange={(e) =>
                      setFormCadastro({ ...formCadastro, nome: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formCadastro.email}
                    onChange={(e) =>
                      setFormCadastro({
                        ...formCadastro,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  {tipoCadastro === "aluno" && (
                    <>
                      <input
                        type="number"
                        placeholder="Idade"
                        value={formCadastro.idade}
                        onChange={(e) =>
                          setFormCadastro({
                            ...formCadastro,
                            idade: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border rounded-lg"
                      />
                      <select
                        value={formCadastro.objetivo}
                        onChange={(e) =>
                          setFormCadastro({
                            ...formCadastro,
                            objetivo: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border rounded-lg"
                      >
                        <option value="">Objetivo</option>
                        <option value="Hipertrofia">Hipertrofia</option>
                        <option value="Emagrecimento">Emagrecimento</option>
                        <option value="Condicionamento">Condicionamento</option>
                      </select>
                    </>
                  )}
                  <input
                    type="password"
                    placeholder="Senha (mín. 6 caracteres)"
                    value={formCadastro.senha}
                    onChange={(e) =>
                      setFormCadastro({
                        ...formCadastro,
                        senha: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Confirmar senha"
                    value={formCadastro.confirmarSenha}
                    onChange={(e) =>
                      setFormCadastro({
                        ...formCadastro,
                        confirmarSenha: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <button
                    onClick={fazerCadastro}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                  >
                    Cadastrar
                  </button>
                  <button
                    onClick={() => setTipoCadastro("")}
                    className="w-full text-blue-600 text-sm"
                  >
                    Voltar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Dumbbell className="w-8 h-8" />
              <div>
                <span className="text-xl font-bold">RAFAEL LIMA</span>
                <span className="text-xs text-blue-200 block">PERSONAL</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">{usuarioLogado?.nome}</span>
              <button
                onClick={fazerLogout}
                className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Sair
              </button>
            </div>
          </div>

          <div className="flex space-x-1 pb-2 overflow-x-auto">
            {tipoUsuario === "professor" ? (
              <>
                <button
                  onClick={() => setTelaAtiva("dashboard")}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    telaAtiva === "dashboard"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <BarChart3 className="w-5 h-5 inline mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => setTelaAtiva("alunos")}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    telaAtiva === "alunos"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Users className="w-5 h-5 inline mr-2" />
                  Alunos
                </button>
                <button
                  onClick={() => setTelaAtiva("anamnese")}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    telaAtiva === "anamnese"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <FileText className="w-5 h-5 inline mr-2" />
                  Anamnese
                </button>
                <button
                  onClick={() => setTelaAtiva("treinos")}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    telaAtiva === "treinos"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Dumbbell className="w-5 h-5 inline mr-2" />
                  Treinos
                </button>
                <button
                  onClick={() => setTelaAtiva("exercicios")}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    telaAtiva === "exercicios"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Award className="w-5 h-5 inline mr-2" />
                  Exercícios
                </button>
                <button
                  onClick={() => setTelaAtiva("financeiro")}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    telaAtiva === "financeiro"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <DollarSign className="w-5 h-5 inline mr-2" />
                  Financeiro
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setTelaAtiva("meusTreinos")}
                  className={`px-4 py-2 rounded-lg ${
                    telaAtiva === "meusTreinos"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Dumbbell className="w-5 h-5 inline mr-2" />
                  Meus Treinos
                </button>
                <button
                  onClick={() => setTelaAtiva("historico")}
                  className={`px-4 py-2 rounded-lg ${
                    telaAtiva === "historico"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Histórico
                </button>
                <button
                  onClick={() => setTelaAtiva("evolucao")}
                  className={`px-4 py-2 rounded-lg ${
                    telaAtiva === "evolucao"
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <TrendingUp className="w-5 h-5 inline mr-2" />
                  Evolução
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {telaAtiva === "dashboard" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-100">Alunos Ativos</p>
                    <p className="text-4xl font-bold mt-2">{alunos.length}</p>
                  </div>
                  <Users className="w-12 h-12 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-100">Treinos</p>
                    <p className="text-4xl font-bold mt-2">{treinos.length}</p>
                  </div>
                  <Dumbbell className="w-12 h-12 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-purple-100">Exercícios</p>
                    <p className="text-4xl font-bold mt-2">
                      {exercicios.length}
                    </p>
                  </div>
                  <Award className="w-12 h-12 opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-emerald-100">Receita</p>
                    <p className="text-4xl font-bold mt-2">R$ 450</p>
                  </div>
                  <DollarSign className="w-12 h-12 opacity-80" />
                </div>
              </div>
            </div>
          </div>
        )}

        {telaAtiva === "alunos" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">Alunos</h1>
              <button
                onClick={() => {
                  setModalTipo("novoAluno");
                  setModalAberto(true);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Novo Aluno</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alunos.map((aluno) => (
                <div
                  key={aluno.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{aluno.nome}</h3>
                        <p className="text-sm text-blue-100">
                          {aluno.idade} anos
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Objetivo:</span>
                      <span className="font-semibold">{aluno.objetivo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plano:</span>
                      <span className="font-semibold">{aluno.plano}</span>
                    </div>
                    <div className="pt-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setAlunoSelecionado(aluno);
                          setModalTipo("anamnese");
                          if (aluno.anamnese) setAnamnese(aluno.anamnese);
                          setModalAberto(true);
                        }}
                        className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-sm"
                      >
                        Anamnese
                      </button>
                      <button
                        onClick={() => {
                          setAlunoSelecionado(aluno);
                          setModalTipo("novoTreino");
                          setModalAberto(true);
                        }}
                        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Criar Treino
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {telaAtiva === "anamnese" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Anamnese dos Alunos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alunos.map((aluno) => (
                <div
                  key={aluno.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="w-10 h-10 text-purple-600" />
                    <div>
                      <h3 className="text-xl font-bold">{aluno.nome}</h3>
                      <p className="text-sm text-gray-600">
                        {aluno.anamnese
                          ? "✓ Anamnese preenchida"
                          : "Sem anamnese"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAlunoSelecionado(aluno);
                      setModalTipo("anamnese");
                      if (aluno.anamnese) setAnamnese(aluno.anamnese);
                      setModalAberto(true);
                    }}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold"
                  >
                    {aluno.anamnese ? "Ver/Editar" : "Preencher"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {telaAtiva === "treinos" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Treinos Prescritos
            </h1>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Aluno
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Treino
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Data
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Exercícios
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {treinos.map((treino) => {
                    const aluno = alunos.find((a) => a.id === treino.alunoId);
                    return (
                      <tr key={treino.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{aluno?.nome}</td>
                        <td className="px-6 py-4">{treino.nome}</td>
                        <td className="px-6 py-4">{treino.data}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              treino.concluido
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {treino.concluido ? "Concluído" : "Pendente"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {treino.exercicios?.length || 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {telaAtiva === "exercicios" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Biblioteca de Exercícios
            </h1>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-4 text-lg">
                Adicionar Novo Exercício
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  placeholder="Nome do exercício"
                  value={novoExercicio.nome}
                  onChange={(e) =>
                    setNovoExercicio({ ...novoExercicio, nome: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  placeholder="Categoria (ex: Peito)"
                  value={novoExercicio.categoria}
                  onChange={(e) =>
                    setNovoExercicio({
                      ...novoExercicio,
                      categoria: e.target.value,
                    })
                  }
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  placeholder="Músculo"
                  value={novoExercicio.musculo}
                  onChange={(e) =>
                    setNovoExercicio({
                      ...novoExercicio,
                      musculo: e.target.value,
                    })
                  }
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (novoExercicio.nome && novoExercicio.categoria) {
                      setExercicios([
                        ...exercicios,
                        { ...novoExercicio, id: exercicios.length + 1 },
                      ]);
                      setNovoExercicio({
                        nome: "",
                        categoria: "",
                        musculo: "",
                      });
                    }
                  }}
                  className="bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercicios.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
                >
                  {exercicioEditando?.id === ex.id ? (
                    <div className="space-y-2">
                      <input
                        value={exercicioEditando.nome}
                        onChange={(e) =>
                          setExercicioEditando({
                            ...exercicioEditando,
                            nome: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                      <input
                        value={exercicioEditando.musculo}
                        onChange={(e) =>
                          setExercicioEditando({
                            ...exercicioEditando,
                            musculo: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setExercicios(
                              exercicios.map((e) =>
                                e.id === exercicioEditando.id
                                  ? exercicioEditando
                                  : e
                              )
                            );
                            setExercicioEditando(null);
                          }}
                          className="flex-1 bg-green-600 text-white py-1 rounded flex items-center justify-center"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Salvar
                        </button>
                        <button
                          onClick={() => setExercicioEditando(null)}
                          className="bg-gray-300 px-3 py-1 rounded"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-gray-800">{ex.nome}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {ex.categoria}
                      </p>
                      <p className="text-xs text-gray-500">{ex.musculo}</p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setExercicioEditando(ex)}
                          className="flex-1 bg-blue-100 text-blue-700 py-1 rounded text-sm flex items-center justify-center"
                        >
                          <Edit2 className="w-3 h-3 mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Excluir exercício?")) {
                              setExercicios(
                                exercicios.filter((e) => e.id !== ex.id)
                              );
                            }
                          }}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {telaAtiva === "financeiro" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Gestão Financeira
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Receita Mensal</h3>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-4xl font-bold">R$ 450</p>
                <p className="text-sm text-gray-600 mt-2">
                  {alunos.length} alunos ativos
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Ticket Médio</h3>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-4xl font-bold">R$ 225</p>
                <p className="text-sm text-gray-600 mt-2">Por aluno/mês</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Projeção Anual</h3>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-4xl font-bold">R$ 5.400</p>
                <p className="text-sm text-gray-600 mt-2">
                  Baseado na receita atual
                </p>
              </div>
            </div>
          </div>
        )}

        {telaAtiva === "meusTreinos" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Meus Treinos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treinos
                .filter((t) => t.alunoId === usuarioLogado?.alunoId)
                .map((treino) => (
                  <div
                    key={treino.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                      <h3 className="text-xl font-bold">{treino.nome}</h3>
                      <p className="text-sm text-green-100">
                        Data: {treino.data}
                      </p>
                    </div>
                    <div className="p-6">
                      {treino.exercicios && treino.exercicios.length > 0 ? (
                        <div className="space-y-3">
                          {treino.exercicios.map((ex, idx) => (
                            <div key={idx} className="border rounded-lg p-3">
                              <h4 className="font-semibold">{ex.nome}</h4>
                              <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                                <p>Séries: {ex.series}</p>
                                <p>Reps: {ex.repeticoes}</p>
                                <p>Carga: {ex.carga}kg</p>
                                <p>Descanso: {ex.descanso}s</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">
                          Nenhum exercício
                        </p>
                      )}
                      <button
                        className={`w-full mt-4 py-3 rounded-lg font-semibold ${
                          treino.concluido
                            ? "bg-green-100 text-green-700"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {treino.concluido ? "✓ Concluído" : "Iniciar Treino"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {telaAtiva === "historico" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Histórico</h1>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600 text-center py-8">
                Nenhum treino concluído ainda
              </p>
            </div>
          </div>
        )}

        {telaAtiva === "evolucao" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Evolução</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Total de Treinos</h3>
                <p className="text-4xl font-bold text-blue-600">2</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Concluídos</h3>
                <p className="text-4xl font-bold text-green-600">1</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Taxa de Conclusão
                </h3>
                <p className="text-4xl font-bold text-purple-600">50%</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {modalTipo === "novoAluno" && "Novo Aluno"}
                {modalTipo === "novoTreino" &&
                  `Criar Treino - ${alunoSelecionado?.nome}`}
                {modalTipo === "anamnese" &&
                  `Anamnese - ${alunoSelecionado?.nome}`}
              </h2>
              <button
                onClick={fecharModal}
                className="text-3xl hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {modalTipo === "novoAluno" ? (
                <div className="space-y-4">
                  <input
                    placeholder="Nome"
                    value={novoAluno.nome}
                    onChange={(e) =>
                      setNovoAluno({ ...novoAluno, nome: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    placeholder="Idade"
                    type="number"
                    value={novoAluno.idade}
                    onChange={(e) =>
                      setNovoAluno({ ...novoAluno, idade: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    placeholder="Objetivo"
                    value={novoAluno.objetivo}
                    onChange={(e) =>
                      setNovoAluno({ ...novoAluno, objetivo: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    placeholder="Plano (ex: R$ 250/mês)"
                    value={novoAluno.plano}
                    onChange={(e) =>
                      setNovoAluno({ ...novoAluno, plano: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <button
                    onClick={() => {
                      if (novoAluno.nome) {
                        setAlunos([
                          ...alunos,
                          {
                            ...novoAluno,
                            id: alunos.length + 1,
                            status: "ativo",
                            anamnese: null,
                            ultimoTreino: "-",
                          },
                        ]);
                        setNovoAluno({
                          nome: "",
                          idade: "",
                          objetivo: "",
                          plano: "",
                        });
                        fecharModal();
                      }
                    }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Adicionar Aluno
                  </button>
                </div>
              ) : modalTipo === "anamnese" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Peso (kg)"
                      value={anamnese.peso}
                      onChange={(e) =>
                        setAnamnese({ ...anamnese, peso: e.target.value })
                      }
                      className="px-4 py-2 border rounded-lg"
                    />
                    <input
                      placeholder="Altura (cm)"
                      value={anamnese.altura}
                      onChange={(e) =>
                        setAnamnese({ ...anamnese, altura: e.target.value })
                      }
                      className="px-4 py-2 border rounded-lg"
                    />
                    <input
                      placeholder="Pressão"
                      value={anamnese.pressao}
                      onChange={(e) =>
                        setAnamnese({ ...anamnese, pressao: e.target.value })
                      }
                      className="px-4 py-2 border rounded-lg"
                    />
                    <input
                      placeholder="Freq. Cardíaca"
                      value={anamnese.frequenciaCardiaca}
                      onChange={(e) =>
                        setAnamnese({
                          ...anamnese,
                          frequenciaCardiaca: e.target.value,
                        })
                      }
                      className="px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <textarea
                    placeholder="Doenças pré-existentes"
                    value={anamnese.doencas}
                    onChange={(e) =>
                      setAnamnese({ ...anamnese, doencas: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="3"
                  />
                  <textarea
                    placeholder="Medicamentos"
                    value={anamnese.medicamentos}
                    onChange={(e) =>
                      setAnamnese({ ...anamnese, medicamentos: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="3"
                  />
                  <textarea
                    placeholder="Lesões"
                    value={anamnese.lesoes}
                    onChange={(e) =>
                      setAnamnese({ ...anamnese, lesoes: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="2"
                  />
                  <button
                    onClick={() => {
                      setAlunos(
                        alunos.map((a) =>
                          a.id === alunoSelecionado?.id ? { ...a, anamnese } : a
                        )
                      );
                      alert("Anamnese salva!");
                      fecharModal();
                    }}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold"
                  >
                    Salvar Anamnese
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <input
                    placeholder="Nome do treino"
                    value={novoTreino.nome}
                    onChange={(e) =>
                      setNovoTreino({ ...novoTreino, nome: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold mb-3">
                      Selecionar Exercícios
                    </h3>
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-3 border rounded-lg">
                      {exercicios.map((ex) => (
                        <button
                          key={ex.id}
                          onClick={() => adicionarExercicioTreino(ex)}
                          disabled={novoTreino.exerciciosSelecionados.find(
                            (e) => e.id === ex.id
                          )}
                          className={`p-3 border rounded-lg text-left ${
                            novoTreino.exerciciosSelecionados.find(
                              (e) => e.id === ex.id
                            )
                              ? "bg-green-50 border-green-500"
                              : "hover:border-blue-500"
                          }`}
                        >
                          <p className="font-medium">{ex.nome}</p>
                          <p className="text-sm text-gray-600">
                            {ex.categoria}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {novoTreino.exerciciosSelecionados.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">
                        Exercícios ({novoTreino.exerciciosSelecionados.length})
                      </h3>
                      <div className="space-y-3">
                        {novoTreino.exerciciosSelecionados.map((ex, i) => (
                          <div key={ex.id} className="border rounded-lg p-4">
                            <div className="flex justify-between mb-3">
                              <p className="font-semibold">
                                {i + 1}. {ex.nome}
                              </p>
                              <button
                                onClick={() => removerExercicioTreino(ex.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                              <div>
                                <label className="text-xs">Séries</label>
                                <input
                                  type="number"
                                  value={ex.series}
                                  onChange={(e) =>
                                    atualizarExercicioTreino(
                                      ex.id,
                                      "series",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full px-2 py-1 border rounded text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs">Reps</label>
                                <input
                                  type="number"
                                  value={ex.repeticoes}
                                  onChange={(e) =>
                                    atualizarExercicioTreino(
                                      ex.id,
                                      "repeticoes",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full px-2 py-1 border rounded text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs">Carga</label>
                                <input
                                  type="number"
                                  value={ex.carga}
                                  onChange={(e) =>
                                    atualizarExercicioTreino(
                                      ex.id,
                                      "carga",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full px-2 py-1 border rounded text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs">Desc</label>
                                <input
                                  type="number"
                                  value={ex.descanso}
                                  onChange={(e) =>
                                    atualizarExercicioTreino(
                                      ex.id,
                                      "descanso",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-full px-2 py-1 border rounded text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={salvarTreino}
                    disabled={
                      !novoTreino.nome ||
                      novoTreino.exerciciosSelecionados.length === 0
                    }
                    className={`w-full py-3 rounded-lg font-semibold ${
                      novoTreino.nome &&
                      novoTreino.exerciciosSelecionados.length > 0
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    Salvar Treino
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
