import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    borderRadius: '20px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    minHeight: '425px',
    '@media (min-width:800px)': {
      minHeight: '680px',
      maxHeight: '750px',
    },
  },
  containerTitle: {
    display: 'flex',
    justifyContent: 'center',
    width: '95%',
    marginTop: '10px',
  },
  title: {
    flexGrow: 1,
    transform: 'translate(30px)',
  },
  containerRecord: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export default useStyles
