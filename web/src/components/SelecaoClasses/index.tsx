import React, { useEffect, useState, FormEvent } from 'react'
import { connect } from 'react-redux'

import api from '../../services/api'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'

const SelecaoClasses = (props: any) => {

  const [ano, setAno] = useState('')
  const [turma, setTurma] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [sala, setSala] = useState('')
  const [professor, setProfessor] = useState('')

  const [turmasDisp, setTurmasDisp] = useState(Array())
  const [salasDisp, setSalasDisp] = useState(Array())

  useEffect(() => {
    if (props.upDisp) {
      atualizaDisponiveis()
    }
  })

  function atualizaDisponiveis() {
    api.get('classes/disp').then((resp) => {
      props.setDisp(resp.data.disp)
      props.setSel(resp.data.sel)
    })
    props.setUpDisp(false)
  }

  function atualizaTurmas(ano: string) {
    api.get(`classes/disp?ano=${ano}`).then((resp) => {
      setTurmasDisp(resp.data)
    })
  }

  function atualizaSalas(periodo: string) {
    api.get(`classes/disp?periodo=${periodo}`).then((resp) => {
      setSalasDisp(resp.data)
    })
  }

  function handleCadastrar(e: FormEvent) {
    e.preventDefault()

    if ([ano, turma, periodo, sala].includes('')) {
      alert('ERRO! Preencha os campos ANO, TURMA, PERÍODO e SALA.')
    } else {
      api
        .post('classes', {
          ano,
          turma,
          periodo,
          sala,
          professor,
        })
        .then(() => {
          alert('Cadastro feito com sucesso!')
          atualizaTabela()
          atualizaDisponiveis()
          limparCampos()
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  function limparCampos() {
    setAno('')
    setTurma('')
    setPeriodo('')
    setSala('')
    setProfessor('')
  }

  function atualizaTabela() {
    api.get('classes').then((response) => {
      props.setClasses(response.data)
    })
  }

  return (
    <div className='selecao-classes'>
      <form onSubmit={handleCadastrar}>
        <Select
          name='ano'
          label='Ano'
          value={ano}
          onChange={(t) => {
            setAno(t.target.value)
            atualizaTurmas(t.target.value)
            setTurma('')
          }}
          options={props.disp.map((x: any) => {
            return { value: x, label: x }
          })}
        />

        <Select
          name='turma'
          label='Turma'
          value={turma}
          onChange={(t) => {
            setTurma(t.target.value)
            setPeriodo('')
          }}
          options={turmasDisp.map((x: any) => {
            return { value: x, label: x }
          })}
        />

        <Select
          name='periodo'
          label='Periodo'
          value={periodo}
          onChange={(t) => {
            setPeriodo(t.target.value)
            atualizaSalas(t.target.value)
            setSala('')
          }}
          options={[
            { value: 'Manhã', label: 'Manhã' },
            { value: 'Tarde', label: 'Tarde' },
          ]}
        />

        <Select
          name='sala'
          label='Sala'
          value={sala}
          onChange={(t) => {
            setSala(t.target.value)
          }}
          options={salasDisp.map((x: any) => {
            return { value: x, label: x }
          })}
        />

        <Input
          label='Professor'
          name='professor'
          id='professor'
          value={professor}
          onChange={(t) => setProfessor(t.target.value)}
        />

        <input
          type='submit'
          className='botao'
          onClick={handleCadastrar}
          value='Cadastrar'
        />
      </form>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    classes: state.classe.classes,
    disp: state.classe.disp,
    sel: state.classe.sel,
    upDisp: state.classe.upDisp,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setClasses: (newClasses: any) =>
      dispatch({
        type: 'SET_CLASSES',
        payload: { classes: newClasses },
      }),
    setDisp: (NEW: []) =>
      dispatch({
        type: 'SET_DISP',
        payload: { disp: NEW },
      }),
    setSel: (NEW: []) =>
      dispatch({
        type: 'SET_SEL',
        payload: { disp: NEW },
      }),
    setUpDisp: (NEW: boolean) =>
      dispatch({
        type: 'SET_UPDISP',
        payload: { disp: NEW },
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelecaoClasses)
