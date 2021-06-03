const initialState = {
  classes: [],
  sel: [],
  disp: [],
  update: true,
  upDisp: true,
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

    default:
      break
  }

  return state
}

export default ClassesReducer
