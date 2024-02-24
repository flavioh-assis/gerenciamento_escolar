import React, { FormEvent, useState } from 'react';

import { api } from '../../services/api';
import Input from '../Input';
import Select from '../Select';

import './styles.css';

export default () => {
  const onlyPortfolio = false;

  const initialState = {
    dadosAluno: {
      nome: '',
      ra: '',
      rm: '1',
      nee: '',
      nasc_cidade: '',
      nasc_uf: '',
      nacionalidade: '',
      nasc_data: '',
      pai: '',
      mae: '',
      responsavel: '',
      endereco: '',
      bairro: '',
      cidade: '',
      telefones: '',
      obs: '',
      proc_escola: '',
      proc_cidade: '',
      proc_ano: '',
      ex_aluno: '',
      ano_desejado: '',
      turma: '',
    },
  };
  const [dadosAluno, setDadosAluno] = useState({
    nome: 'Flavio',
    ra: '144.937.520-X',
    rm: '--',
    nee: '',
    nasc_cidade: 'Ribeirão Preto',
    nasc_uf: 'SP',
    nacionalidade: 'Brasileira',
    nasc_data: '07/05/1993', //deveria ser Date()
    pai: 'Magno Onofre de Assis Silva',
    mae: 'Elisabete Guilherme de Assis Silva',
    responsavel: '',
    endereco: 'Rua Cardeal Leme, 300',
    bairro: 'Vila Virgínia',
    cidade: 'Ribeirão Preto',
    telefones: '99617-1234 (mãe)',
    obs: 'Bl 9 Ap 32 - Cond. Delboux A',
    proc_escola: 'EMEB. Antônio Joaquim da Silva',
    proc_cidade: 'Cravinhos',
    proc_ano: 'Pré-escola',
    ex_aluno: 'Não',
    ano_desejado: '1º',
    turma: 'A',
  });
  const UFs = [
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MG',
    'MA',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SP',
    'SC',
    'SE',
    'TO',
    'Ext.',
  ];

  function clearFields() {
    setDadosAluno(initialState.dadosAluno);
  }

  function handleCadastrar(e: FormEvent) {
    e.preventDefault();

    if (!onlyPortfolio) {
      api
        .post('alunos', {
          ...dadosAluno,
        })
        .then(res => {
          alert(
            'Cadastro feito com sucesso!\nO RM gerado foi o ' +
              res.data.enrollmentRegistration +
              '.'
          );
          clearFields();
        })
        .catch(error => {
          alert('Deu ruim: ' + error);
        });
    } else {
      alert('Sem conexão com o Banco de Dados! Projeto apenas para portfólio.');
    }
  }

  function setValue(value: object) {
    setDadosAluno(Object.assign({}, dadosAluno, value));
  }

  return (
    <form onSubmit={handleCadastrar} className="dados-alunos">
      <p>IDENTIFICAÇÃO</p>

      <div className="identificaçao">
        <div className="item aluno">
          <Input
            label="Nome do Aluno"
            name="nome-aluno"
            onChange={t => setValue({ nome: t.target.value })}
            value={dadosAluno.nome}
          />
        </div>
        <div className="item ra">
          <Input
            label="RA"
            name="ra"
            className="ra"
            onChange={t => setValue({ ra: t.target.value })}
            value={dadosAluno.ra}
          />
        </div>
        <div className="item rm">
          <Input
            label="RM"
            name="rm"
            className="item rm"
            onChange={t => setValue({ rm: t.target.value })}
            value={dadosAluno.rm}
            disabled
          />
        </div>
        <div className="item nee">
          <Select
            value={dadosAluno.nee}
            label="Deficiência"
            name="nee"
            onChange={e => setValue({ nee: e.target.value })}
            options={[
              { value: '', label: 'Não Possui' },
              { value: 'Autismo', label: 'Autismo' },
              { value: 'Cadeirante', label: 'Cadeirante' },
              { value: 'Intelectual', label: 'Intelectual' },
              { value: 'Múltipla', label: 'Múltipla' },
            ]}
          />
        </div>

        <div className="item localidade">
          <Input
            label="Cidade"
            name="localidade"
            onChange={t => setValue({ nasc_cidade: t.target.value })}
            value={dadosAluno.nasc_cidade}
          />
        </div>
        <div className="item uf-nasc">
          <Select
            value={dadosAluno.nasc_uf}
            label="UF"
            name="uf-nasc"
            onChange={e => setValue({ nasc_uf: e.target.value })}
            options={UFs.map((UF: string) => {
              return { value: UF, label: UF };
            })}
          />
        </div>
        <div className="item nacionalidade">
          <Input
            label="Nacionalidade"
            name="nacionalidade"
            onChange={t => setValue({ nacionalidade: t.target.value })}
            value={dadosAluno.nacionalidade}
          />
        </div>
        <div className="item data-nasc">
          <Input
            label="Data Nasc."
            name="data-nasc"
            onChange={t => {
              // deveria ter REGEX
              if ([1, 4].includes(dadosAluno.nasc_data.length)) {
                setValue({ nasc_data: t.target.value + '/' });
              } else {
                setValue({ nasc_data: t.target.value });
              }
            }}
            value={dadosAluno.nasc_data}
          />
        </div>

        <div className="item pai">
          <Input
            label="Nome do Pai"
            name="nome-pai"
            onChange={t => setValue({ pai: t.target.value })}
            value={dadosAluno.pai}
          />
        </div>
        <div className="item mae">
          <Input
            label="Nome da Mãe"
            name="nome-mae"
            onChange={t => setValue({ mae: t.target.value })}
            value={dadosAluno.mae}
          />
        </div>
        <div className="item responsavel">
          <Input
            label="Nome do Responsável Legal"
            name="nome-resp-legal"
            onChange={t => {
              setValue({ responsavel: t.target.value });
            }}
            value={dadosAluno.responsavel}
          />
        </div>
      </div>

      <p>RESIDÊNCIA</p>
      <div className="residencia">
        <div className="endereço">
          <Input
            label="Endereço"
            name="endereço"
            onChange={t => setValue({ endereco: t.target.value })}
            value={dadosAluno.endereco}
          />
        </div>
        <div className="bairro">
          <Input
            label="Bairro"
            name="bairro"
            onChange={t => setValue({ bairro: t.target.value })}
            value={dadosAluno.bairro}
          />
        </div>
        <div className="cidade">
          <Input
            label="Cidade"
            name="cidade"
            onChange={t => setValue({ cidade: t.target.value })}
            value={dadosAluno.cidade}
          />
        </div>

        <div className="telefones">
          <textarea
            name="telefones"
            onChange={t => setValue({ telefones: t.target.value })}
            placeholder="Telefones"
            value={dadosAluno.telefones}
          ></textarea>
        </div>
        <div className="observaçoes">
          <textarea
            name="observacoes"
            onChange={t => setValue({ obs: t.target.value })}
            placeholder="Observações"
            value={dadosAluno.obs}
          ></textarea>
        </div>
      </div>

      <p>PROCEDÊNCIA</p>
      <div className="procedencia">
        <div className="proc_escola">
          <Input
            label="Escola"
            name="proc_escola"
            onChange={t => setValue({ proc_escola: t.target.value })}
            value={dadosAluno.proc_escola}
          />
        </div>
        <div className="cidade">
          <Input
            label="Cidade"
            name="cidade"
            onChange={t => setValue({ proc_cidade: t.target.value })}
            value={dadosAluno.proc_cidade}
          />
        </div>
        <div className="ano-proc">
          <Select
            value={dadosAluno.proc_ano}
            label="Ano/Série"
            name="ano-proc"
            onChange={e => setValue({ proc_ano: e.target.value })}
            options={[
              { value: 'Não cursou', label: 'Não cursou' },
              { value: 'Pré-escola', label: 'Pré-escola' },
              { value: '1º ano', label: '1º ano' },
              { value: '2º ano', label: '2º ano' },
              { value: '3º ano', label: '3º ano' },
              { value: '4º ano', label: '4º ano' },
              { value: '5º ano', label: '5º ano' },
            ]}
          />
        </div>
        <div className="ex-aluno">
          <Select
            value={dadosAluno.ex_aluno}
            label="É ex-aluno?"
            name="ex-aluno"
            onChange={e => setValue({ ex_aluno: e.target.value })}
            options={[
              { value: 'Não', label: 'Não' },
              { value: 'Sim', label: 'Sim' },
            ]}
          />
        </div>
        <div className="ano-desejado">
          <Select
            value={dadosAluno.ano_desejado}
            label="Ano Desejado"
            name="ano-desejado"
            onChange={e => setValue({ ano_desejado: e.target.value })}
            options={[
              { value: '1º', label: '1º ano' },
              { value: '2º', label: '2º ano' },
              { value: '3º', label: '3º ano' },
              { value: '4º', label: '4º ano' },
              { value: '5º', label: '5º ano' },
            ]}
          />
        </div>
        <div className="turma">
          <Select
            label="Turma"
            name="turma"
            onChange={e => setValue({ turma: e.target.value })}
            options={[
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' },
            ]}
            value={dadosAluno.turma}
          />
        </div>
      </div>

      <div className="buttons">
        <input type="submit" id="btn-matricular" value="Matricular Aluno" />
        <input type="button" id="btn-limpar" value="Limpar Campos" onClick={clearFields} />
      </div>
    </form>
  );
};
