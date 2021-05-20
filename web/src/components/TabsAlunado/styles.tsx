import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#bbb',
    flexGrow: 1,
    margin: '0 auto',
    width: '90rem',
  }
}))

export const tabStyle = {
  backgroundColor: '#fff',
  color: '#000',
  font: '700 2rem Archivo'
}
