import React, { FormEvent, useState } from 'react'

import api from '../../services/api'
import Input from '../Input'
import Select from '../Select'

import './styles.css'

export default () => {
  function handleCadastrar(e: FormEvent) {
    e.preventDefault()

    api
      .post('alunos', {
        nome,
        ra,
        nasc_cidade,
        nasc_uf,
        nacionalidade,
        nasc_data,
        nee,
        pai,
        mae,
        responsavel,
        endereco,
        bairro,
        cidade,
        telefones,
        obs,
        proc_escola,
        proc_cidade,
        proc_ano,
        ex_aluno,
        ano_desejado,
        turma
      })
      .then(() => {
        alert('Cadastro feito com sucesso!')
      })
      .catch(error => {
        alert('Deu ruim: ' + error)
      })
  }

  const [nome, setNome] = useState('Flavio Henrique de Assis Silva')
  const [ra, setRa] = useState('144.937.520-X')
  const [rm, setRm] = useState('')
  const [nee, setNee] = useState('')

  const [nasc_cidade, setLocalidade] = useState('Ribeirão Preto')
  const [nasc_uf, setUfNasc] = useState('SP')
  const [nacionalidade, setNacionalidade] = useState('Brasileira')
  const [nasc_data, setDataNasc] = useState('')

  const [pai, setPai] = useState('Magno Onofre de Assis Silva')
  const [mae, setMae] = useState('Elisabete Guilherme de Assis Silva')
  const [responsavel, setResponsavel] = useState('')

  const [endereco, setEndereço] = useState('Rua Cardeal Leme, 300')
  const [bairro, setBairro] = useState('Vila Virgínia')
  const [cidade, setCidadeRes] = useState('Ribeirão Preto')

  const [telefones, setTelefones] = useState('99617-1234 (mãe)')
  const [obs, setObservaçoes] = useState('Bl 9 Ap 32 - Cond. Delboux A')

  const [proc_escola, setEscola] = useState('EMEB. Antônio Joaquim da Silva')
  const [proc_cidade, setCidadeProc] = useState('Cravinhos')
  const [proc_ano, setAnoProc] = useState('Pré-escola')
  const [ex_aluno, setExAluno] = useState('Não')
  const [ano_desejado, setAnoDesejado] = useState('1º')
  const [turma, setTurma] = useState('A')

  return (
    <form onSubmit={handleCadastrar} className="dados-alunos">
      <p>IDENTIFICAÇÃO</p>
      <div className="identificaçao">
        <div className="item aluno">
          <Input
            label="Nome do Aluno"
            name="nome-aluno"
            onChange={t => setNome(t.target.value)}
            value={nome}
          />
        </div>
        <div className="item ra">
          <Input
            label="RA"
            name="ra"
            className="ra"
            onChange={t => setRa(t.target.value)}
            value={ra}
          />
        </div>
        <div className="item rm">
          <Input
            label="RM"
            name="rm"
            className="item rm"
            onChange={t => setRm(t.target.value)}
            value={rm}
            disabled
          />
        </div>
        <div className="item nee">
          <Select
            value={nee}
            label="Deficiência"
            name="nee"
            onChange={e => setNee(e.target.value)}
            options={[
              { value: '', label: 'Não Possui' },
              { value: 'Autismo', label: 'Autismo' },
              { value: 'Cadeirante', label: 'Cadeirante' },
              { value: 'Intelectual', label: 'Intelectual' },
              { value: 'Múltipla', label: 'Múltipla' }
            ]}
          />
        </div>

        <div className="item localidade">
          <Input
            label="Localidade"
            name="localidade"
            onChange={t => setLocalidade(t.target.value)}
            value={nasc_cidade}
          />
        </div>
        <div className="item uf-nasc">
          <Select
            value={nasc_uf}
            label="UF"
            name="uf-nasc"
            onChange={e => setUfNasc(e.target.value)}
            options={[
              { value: 'AC', label: 'AC' },
              { value: 'AL', label: 'AL' },
              { value: 'AM', label: 'AM' },
              { value: 'AP', label: 'AP' },
              { value: 'BA', label: 'BA' },
              { value: 'CE', label: 'CE' },
              { value: 'DF', label: 'DF' },
              { value: 'ES', label: 'ES' },
              { value: 'GO', label: 'GO' },
              { value: 'MG', label: 'MG' },
              { value: 'MA', label: 'MA' },
              { value: 'MS', label: 'MS' },
              { value: 'MT', label: 'MT' },
              { value: 'PA', label: 'PA' },
              { value: 'PB', label: 'PB' },
              { value: 'PE', label: 'PE' },
              { value: 'PI', label: 'PI' },
              { value: 'PR', label: 'PR' },
              { value: 'RJ', label: 'RJ' },
              { value: 'RN', label: 'RN' },
              { value: 'RO', label: 'RO' },
              { value: 'RR', label: 'RR' },
              { value: 'RS', label: 'RS' },
              { value: 'SP', label: 'SP' },
              { value: 'SC', label: 'SC' },
              { value: 'SE', label: 'SE' },
              { value: 'TO', label: 'TO' },
              { value: 'EX', label: 'Est.' }
            ]}
          />
        </div>
        <div className="item nacionalidade">
          <Input
            label="Nacionalidade"
            name="nacionalidade"
            onChange={t => setNacionalidade(t.target.value)}
            value={nacionalidade}
          />
        </div>
        <div className="item data-nasc">
          <Input
            label="Data Nasc"
            name="data-nasc"
            onChange={(t) => {
              setDataNasc(t.target.value)

              if ([1, 4].includes(nasc_data.length)) {
                setDataNasc(t.target.value + '/')
              }
            }}
            value={nasc_data}
          />
        </div>

        <div className="item pai">
          <Input
            label="Nome do Pai"
            name="nome-pai"
            onChange={t => setPai(t.target.value)}
            value={pai}
          />
        </div>
        <div className="item mae">
          <Input
            label="Nome da Mãe"
            name="nome-mae"
            onChange={t => setMae(t.target.value)}
            value={mae}
          />
        </div>
        <div className="item responsavel">
          <Input
            label="Nome da Responsável Legal"
            name="nome-resp-legal"
            onChange={t => setResponsavel(t.target.value)}
            value={responsavel}
          />
        </div>
      </div>

      <p>RESIDÊNCIA</p>
      <div className="residencia">
        <div className="endereço">
          <Input
            label="Endereço"
            name="endereço"
            onChange={t => setEndereço(t.target.value)}
            value={endereco}
          />
        </div>
        <div className="bairro">
          <Input
            label="Bairro"
            name="bairro"
            onChange={t => setBairro(t.target.value)}
            value={bairro}
          />
        </div>
        <div className="cidade">
          <Input
            label="Cidade"
            name="cidade"
            onChange={t => setCidadeRes(t.target.value)}
            value={cidade}
          />
        </div>

        <div className="telefones">
          <textarea
            name="telefones"
            onChange={t => setTelefones(t.target.value)}
            placeholder="Telefones"
            value={telefones}
          ></textarea>
        </div>
        <div className="observaçoes">
          <textarea
            name="observacoes"
            onChange={t => setObservaçoes(t.target.value)}
            placeholder="Observações"
            value={obs}
          ></textarea>
        </div>
      </div>

      <p>PROCEDÊNCIA</p>
      <div className="procedencia">
        <div className="proc_escola">
          <Input
            label="Escola"
            name="proc_escola"
            onChange={t => setEscola(t.target.value)}
            value={proc_escola}
          />
        </div>
        <div className="cidade">
          <Input
            label="Cidade"
            name="cidade"
            onChange={t => setCidadeProc(t.target.value)}
            value={proc_cidade}
          />
        </div>
        <div className="ano-proc">
          <Select
            value={proc_ano}
            label="Ano/Série"
            name="ano-proc"
            onChange={e => setAnoProc(e.target.value)}
            options={[
              { value: 'Não cursou', label: 'Não cursou' },
              { value: 'Pré-escola', label: 'Pré-escola' },
              { value: '1º ano', label: '1º ano' },
              { value: '2º ano', label: '2º ano' },
              { value: '3º ano', label: '3º ano' },
              { value: '4º ano', label: '4º ano' },
              { value: '5º ano', label: '5º ano' }
            ]}
          />
        </div>
        <div className="ex-aluno">
          <Select
            value={ex_aluno}
            label="É ex-aluno?"
            name="ex-aluno"
            onChange={e => setExAluno(e.target.value)}
            options={[
              { value: 'Não', label: 'Não' },
              { value: 'Sim', label: 'Sim' }
            ]}
          />
        </div>
        <div className="ano-desejado">
          <Select
            value={ano_desejado}
            label="Ano Desejado"
            name="ano-desejado"
            onChange={e => setAnoDesejado(e.target.value)}
            options={[
              { value: '1º', label: '1º ano' },
              { value: '2º', label: '2º ano' },
              { value: '3º', label: '3º ano' },
              { value: '4º', label: '4º ano' },
              { value: '5º', label: '5º ano' }
            ]}
          />
        </div>
        <div className="turma">
          <Select
            label="Turma"
            name="turma"
            onChange={e => setTurma(e.target.value)}
            options={[
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' }
            ]}
            value={turma}
          />
        </div>
      </div>

      <div className="buttons">
        <input type="submit" id="btn-matricular" value="Matricular Aluno" />
        <input type="button" id="btn-limpar" value="Limpar Campos" />
      </div>
    </form>
  )
}
