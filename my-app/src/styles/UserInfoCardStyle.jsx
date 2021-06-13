import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    borderRadius: '40px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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
  totalBalance: {
    marginLeft: '20px',
  },
  containerGraphic: {
    marginLeft: '20px',
  },
  containerButtons: {
    display: 'flex',
    margin: '10px 20px 20px 20px',
  },
  containerButtonADD:{
      flexGrow: '1',
  },
  buttonAdd:{
    width: '138px',
    height: '48px',
    borderRadius: '50px',
    background: '#BEFBC1',
    boxShadow:'none',
  },
  buttonWithDraw:{
    width: '138px',
    height: '48px',
    borderRadius: '50px',
    background: '#FB9F9F',
    boxShadow:'none'
  },
}))

export default useStyles
