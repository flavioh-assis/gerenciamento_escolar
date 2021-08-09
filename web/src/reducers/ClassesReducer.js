const initialState = {
  classes: [
    {
      id: 1,
      ano: '1º',
      turma: 'A',
      periodo: 'Manhã',
      sala: '01',
      professor: 'Adriana Bonavena',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 2,
      ano: '1º',
      turma: 'B',
      periodo: 'Tarde',
      sala: '01',
      professor: 'Erika',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 3,
      ano: '2º',
      turma: 'A',
      periodo: 'Manhã',
      sala: '02',
      professor: 'Joselaine',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 4,
      ano: '2º',
      turma: 'B',
      periodo: 'Tarde',
      sala: '02',
      professor: 'Ricardo',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 5,
      ano: '3º',
      turma: 'A',
      periodo: 'Manhã',
      sala: '03',
      professor: 'Angélica',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 6,
      ano: '3º',
      turma: 'B',
      periodo: 'Tarde',
      sala: '03',
      professor: 'Ariane',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 7,
      ano: '4º',
      turma: 'A',
      periodo: 'Manhã',
      sala: '04',
      professor: 'Priscila',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 8,
      ano: '4º',
      turma: 'B',
      periodo: 'Tarde',
      sala: '04',
      professor: 'Glenda',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 9,
      ano: '5º',
      turma: 'A',
      periodo: 'Manhã',
      sala: '05',
      professor: 'Danila',
      n_ativos: 5,
      n_total: 5
    },
    {
      id: 10,
      ano: '5º',
      turma: 'B',
      periodo: 'Tarde',
      sala: '05',
      professor: 'Gislaine',
      n_ativos: 5,
      n_total: 5
    },
  ],
  sel: [],
  disp: ['1º', '2º', '3º', '4º', '5º'],
  update: true,
  upDisp: true,
  idAluno: null,
}

const ClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return { ...state, classes: action.payload.classes }

    case 'SET_DISP':
      return { ...state, disp: action.payload.disp }

    case 'SET_SEL':
      return { ...state, sel: action.payload.sel }

    case 'SET_UPDATE':
      return { ...state, update: action.payload.update }

    case 'SET_UPDISP':
      return { ...state, upDisp: action.payload.upDisp }

    case 'SET_IDALUNO':
      return { ...state, idAluno: action.payload.idAluno }

    default:
      break
  }

  return state
}

export default ClassesReducer
