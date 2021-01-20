import React from 'react'

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
            value="Flavio Henrique de Assis Silva"
          />
        </div>
        <div className="item ra">
          <Input label="RA" name="ra" className="ra" value="144.937.520-X" />
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
        <div className="item nee">
          <Select
            label="Deficiência"
            name="nee"
            options={[
              { value: '', label: 'Não Possui' },
              { value: 'NEE Autismo', label: 'Autismo' },
              { value: 'NEE Cadeirante', label: 'Cadeirante' },
              { value: 'NEE Intelectual', label: 'Intelectual' },
              { value: 'NEE Múltipla', label: 'Múltipla' }
            ]}
          />
        </div>

        <div className="item localidade">
          <Input label="Localidade" name="localidade" value="Ribeirão Preto" />
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
          <Input label="Data Nasc" name="data-nasc" value="07/05/1993" />
        </div>

        <div className="item pai">
          <Input
            label="Nome do Pai"
            name="nome-pai"
            value="Magno Onofre de Assis Silva"
          />
        </div>
        <div className="item mae">
          <Input
            label="Nome da Mãe"
            name="nome-mae"
            value="Elisabete Guilherme de Assis Silva"
          />
        </div>

        <div className="item responsavel">
          <Input
            label="Nome da Responsável Legal"
            name="nome-resp-legal"
            value="Itamar Maran Jordão"
          />
        </div>
        <div className="item validade">
          <Input label="Valid. Guarda" name="validade-guarda" value="01/12/2021" />
        </div>

      </div>

      <p>RESIDÊNCIA</p>
      <div className="residencia">
        <div className="endereço">
          <Input
            label="Endereço"
            name="endereço"
            value="Rua Cardeal Leme, 300"
          />
        </div>
        <div className="bairro">
          <Input label="Bairro" name="bairro" value="Vila Virgínia" />
        </div>
        <div className="cidade">
          <Input label="Cidade" name="cidade" value="Ribeirão Preto" />
        </div>

        <div className="telefones">
          <textarea
            name="telefones"
            placeholder="Telefones"
            value="99617-1234 (mãe)"
          ></textarea>
        </div>
        <div className="observaçoes">
          <textarea
            name="observaçoes"
            placeholder="Observações"
            value="Bloco 9 Apt 32 - Cond. Delboux A"
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
        <input type="button" id="btn-limpar" value="Limpar Campos" />
      </div>
    </form>
  )
}


        {/* <div className="item cert-nasc">
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
        </div> */}
