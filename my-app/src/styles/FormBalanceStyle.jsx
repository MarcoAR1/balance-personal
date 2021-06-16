import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    borderRadius: '40px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    minHeight: '281px',
  },
  containerTitle: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  containerFrom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    marginBottom: '20px',
  },
  containerButtons: {
    display: 'flex',
    margin: '50px 20px 20px 20px',
  },
  containerButtonCancel: {
    flexGrow: '1',
  },
  buttonCancel: {
    width: '138px',
    height: '48px',
    borderRadius: '50px',
    background: '#FB9F9F',
    boxShadow: 'none',
  },
  buttonSave: {
    width: '138px',
    height: '48px',
    borderRadius: '50px',
    background: '#BEFBC1',
    boxShadow: 'none',
  },
}))

export default useStyles
