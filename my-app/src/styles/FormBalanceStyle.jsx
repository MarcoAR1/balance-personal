import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
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
}))

export default useStyles
