import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  containerFrom: {
    borderRadius: '40px',
    background: '#F2F2F2',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputsFormLogin: {
    display: 'flex',
    height: '40%',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  notification:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

export default useStyles
