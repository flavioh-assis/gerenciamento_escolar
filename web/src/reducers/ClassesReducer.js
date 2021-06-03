const initialState = {
  classes: [],
  update: true
}

const ClassesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return { ...state, classes: action.payload.classes }

      case 'SET_UPDATE':
        return { ...state, update: action.payload.update }
  
    default:
      break
  }

  return state
}

export default ClassesReducer
