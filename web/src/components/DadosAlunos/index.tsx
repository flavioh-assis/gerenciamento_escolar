import React from 'react'
// import { Link } from 'react-router-dom'

import Input from '../Input'
import Select from '../Select'

import './styles.css'

export default () => {
  return (
    <form action="" method="post" className="dados-alunos">
      <p>IDENTIFICAÇÃO</p>
      <div className="identificaçao">
        <div className="item aluno">
          <Input
            label="Nome do Aluno"
            name="nome-aluno"
            value="Vitor Augusto das Neves Martins de Almeida Santos"
          />
        </div>
        <div className="item rm">
          <Input
            label="RM"
            name="rm"
            className="item rm"
            value="12.345"
            disabled
          />
        </div>
        <div className="item ra">
          <Input label="RA" name="ra" className="ra" value="44.937.520-X" />
        </div>

        <div className="item localidade">
          <Input label="Localidade" name="localidade" value="Belo Horizonte" />
        </div>
        <div className="item uf-nasc">
          <Select
            label="UF"
            name="uf-nasc"
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
            value="Brasileira"
          />
        </div>
        <div className="item data-nasc">
          <Input label="Data Nasc" name="data-nasc" value="22/11/1988" />
        </div>

        <div className="item cert-nasc">
          <Input label="Nº Cert. Nasc." name="cert-nasc-num" value="166.155" />
        </div>
        <div className="item livro">
          <Input label="Livro" name="livro" value="436A" />
        </div>
        <div className="item folha">
          <Input label="Folha" name="folha" value="229V" />
        </div>

        <div className="item distrito">
          <Input
            label="(Sub-) Distrito"
            name="sub-distrito"
            value="Belo Horizonte"
          />
        </div>
        <div className="item comarca">
          <Input label="Comarca" name="comarca" value="Belo Horizonte" />
        </div>
        <div className="item uf-comarca">
          <Select
            label="UF"
            name="uf-comarca"
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

        <div className="item pai">
          <Input
            label="Nome do Pai"
            name="nome-pai"
            value="Renato Sebastiao de Almeida Santos"
          />
        </div>
        <div className="item mae">
          <Input
            label="Nome da Mãe"
            name="nome-mae"
            value="Clarinia Maria das Neves Martins de Almeida Santos"
          />
        </div>

        <div className="item responsavel">
          <Input
            label="Nome da Responsável Legal"
            name="nome-resp-legal"
            value=""
          />
        </div>

        <div className="item validade">
          <Input label="Valid. Guarda" name="validade-guarda" value="" />
        </div>
        <div className="item nee">
          <Select
            label="Deficiência"
            name="nee"
            options={[
              { value: '', label: '-----' },
              { value: 'Autismo Infantil', label: 'Autismo Infantil' },
              { value: 'Cadeirante', label: 'Cadeirante' },
              { value: 'Intelectual', label: 'Intelectual' },
              { value: 'Múltipla', label: 'Múltipla' }
            ]}
          />
        </div>
      </div>

      <p>RESIDÊNCIA</p>
      <div className="residencia">
        <div className="endereço">
          <Input
            label="Endereço"
            name="endereço"
            value="Rua Amarildo de Souza Filho Junior, 1234"
          />
        </div>

        <div className="bairro">
          <Input label="Bairro" name="bairro" value="Jardim Regina Volpato" />
        </div>

        <div className="cidade">
          <Input label="Cidade" name="cidade" value="Cravinhos" />
        </div>

        <div className="telefones">
          <textarea
            name="telefones"
            placeholder="Telefones"
          ></textarea>
        </div>

        <div className="observaçoes">
          <textarea
            name="observaçoes"
            placeholder="Observações"
          ></textarea>
        </div>
      </div>

      <p>PROCEDÊNCIA</p>
      <div className="procedencia">
        <div className="escola">
          <Input label="Escola" name="escola" value="EMEB. 'Antônio Joaquim da Silva'" />
        </div>
        <div className="cidade">
          <Input label="Cidade" name="cidade" value="Ribeirão Preto" />
        </div>

        <div className="ano-proc">
          <Select
            label="Ano/Série"
            name="ano-proc"
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
            label="É ex-aluno?"
            name="ex-aluno"
            options={[
              { value: 'Não', label: 'Não' },
              { value: 'Sim', label: 'Sim' }
            ]}
          />
        </div>
        <div className="ano-desejado">
          <Select
            label="Ano Desejado"
            name="ano-desejado"
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
            options={[
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' },
            ]}
          />
        </div>
      </div>

      <div className="buttons">
        <input type="submit" id="btn-matricular" value="Matricular Aluno"/>
        <input type="button" id="btn-limpar" value="Limpar Campos"/>
        {/* <button type="submit"></button> */}
        {/* <button type="button" id="btn-limpar">Limpar Campos</button> */}
      </div>
    </form>
  )
}
