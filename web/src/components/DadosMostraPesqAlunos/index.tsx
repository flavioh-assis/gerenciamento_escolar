import React, { useState } from 'react';
import { api } from '../../services/api';
// import { Table } from "@material-ui/core";
import Input from '../Input';
import Select from '../Select';

import './styles.css';

// const columns: ColDef[] = [
//   {
//     field: "nome",
//     headerName: "Nome Completo",
//     width: 270,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "classe",
//     headerName: "Classe",
//     width: 91,
//     align: "center",
//     headerAlign: "center",
//     valueGetter: (params: ValueGetterParams) => {
//       return `${params.getValue("ano")} ano ${params.getValue("turma")}`;
//     },
//   },
//   { // ano, data_nasc, num_chamada, professor,
//     field: "ra",
//     headerName: "R.A.",
//     width: 133,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "id",
//     headerName: "R.M.",
//     width: 64,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "nee",
//     headerName: "Deficiência",
//     width: 124,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "bairro",
//     headerName: "Bairro",
//     width: 180,
//     align: "center",
//     headerAlign: "center",
//   },
//   {
//     field: "dados",
//     headerName: "-",
//     width: 87,
//     align: "center",
//     headerAlign: "center",
//   },
// ];

const DadosMostraPesqAlunos: React.FC = () => {
  const dadosInitialState = {
    aluno: '',
    ra: '',
    nee: '',
    ano: '',
    turma: '',
    professor: '',
    bairro: '',
  };

  const [alunos, setAlunos] = useState<
    {
      id: number;
      num_chamada: number;
      nome: string;
      ra: string;
      nee: string;
      nasc_data: string;
      ano: string;
      turma: string;
      professor: string;
      situacao: string;
      bairro: string;
    }[]
  >([]);
  const [dados, setDados] = useState(dadosInitialState);
  const onlyPortfolio = false;

  function fazerFiltro() {
    let filterBuilder = '?';

    if (dados.aluno) {
      filterBuilder += `nome=${dados.aluno}`;
    }
    if (dados.ra) {
      filterBuilder += `&ra=${dados.ra}`;
    }
    if (dados.nee) {
      filterBuilder += `&nee=${dados.nee}`;
    }
    if (dados.ano) {
      filterBuilder += `&ano=${dados.ano}`;
    }
    if (dados.turma) {
      filterBuilder += `&turma=${dados.turma}`;
    }
    if (dados.professor) {
      filterBuilder += `&professor=${dados.professor}`;
    }
    if (dados.bairro) {
      filterBuilder += `&bairro=${dados.bairro}`;
    }

    const filter = filterBuilder.length > 1 ? filterBuilder : '';

    return filter;
  }

  function atualizarGrid() {
    if (!onlyPortfolio) {
      let filter = fazerFiltro();

      api.get(`alunos${filter}`).then(response => {
        setAlunos(response.data);
      });
    } else {
      alert('Sem conexão com o Banco de Dados! Projeto apenas para portfólio.');
    }
  }

  function limparCampos() {
    setDados(dadosInitialState);
  }

  return (
    <div className="dados-pesquisa-alunos">
      <p id="titulo">INSIRA UM OU MAIS DADOS</p>

      <div className="dados">
        <div className="item aluno">
          <Input
            label="Nome do Aluno(a)"
            name="nome-aluno"
            value={dados.aluno}
            onChange={t => setDados({ ...dados, aluno: t.target.value })}
          />
        </div>
        <div className="item ra">
          <Input
            label="RA"
            name="ra"
            className="ra"
            value={dados.ra}
            onChange={t => setDados({ ...dados, ra: t.target.value })}
          />
        </div>
        <div className="item nee">
          <Select
            label="Deficiência"
            name="nee"
            value={dados.nee}
            onChange={t => setDados({ ...dados, nee: t.target.value })}
            options={[
              { value: '', label: 'Indeferente' },
              { value: 'Qualquer', label: 'Qualquer Tipo' },
              { value: 'Autismo', label: 'Autismo' },
              { value: 'Cadeirante', label: 'Cadeirante' },
              { value: 'Intelectual', label: 'Intelectual' },
              { value: 'Múltipla', label: 'Múltipla' },
            ]}
          />
        </div>

        <div className="item ano">
          <Select
            label="Ano"
            name="ano"
            value={dados.ano}
            onChange={t => setDados({ ...dados, ano: t.target.value })}
            options={[
              { value: '', label: '-----' },
              { value: '1º', label: '1º' },
              { value: '2º', label: '2º' },
              { value: '3º', label: '3º' },
              { value: '4º', label: '4º' },
              { value: '5º', label: '5º' },
            ]}
          />
        </div>
        <div className="item turma">
          <Select
            label="Turma"
            name="turma"
            value={dados.turma}
            onChange={t => setDados({ ...dados, turma: t.target.value })}
            options={[
              { value: '', label: '-----' },
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' },
            ]}
          />
        </div>
        <div className="item professor">
          <Input
            label="Professor(a)"
            name="professor"
            value={dados.professor}
            onChange={t => setDados({ ...dados, professor: t.target.value })}
          />
        </div>
        <div className="item bairro">
          <Input
            label="Bairro"
            name="bairro"
            value={dados.bairro}
            onChange={t => setDados({ ...dados, bairro: t.target.value })}
          />
        </div>
      </div>

      <div className="buttons">
        <input type="button" id="btn-pesquisar" value="Pesquisar" onClick={atualizarGrid} />
        <input type="button" id="btn-limpar" value="Limpar Campos" onClick={limparCampos} />
      </div>

      <div className="mostra-alunos-pesquisa">
        {alunos.length ? (
          alunos.map(aluno => (
            <div
              key={aluno.id}
              style={{
                background: 'white',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '5px',
              }}
            >
              <p>RM: {aluno.id}</p>
              <p>Nome: {aluno.nome}</p>
              <p>
                Classe: {aluno.ano} ano {aluno.turma}
              </p>
            </div>
          ))
        ) : (
          <p>Sem resultados</p>
        )}
      </div>
    </div>
  );
};

export default DadosMostraPesqAlunos;
