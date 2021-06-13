import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    borderRadius: '20px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    minHeight: '425px',
    '@media (min-width:800px)':{
      minHeight: '680px',
    }
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
  itemRecordBalance: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    height: '48px',
    borderRadius: '50px',
    boxShadow: 'none',
  },
  recordPayIn: {
    background: '#BEFBC1',
  },
  recordWithout: {
    background: '#FB9F9F',
  },
  record: {
    display: 'flex',
    width: '85%',
    alignItems: 'center',
  },
  text: {
    flexGrow:'1',
  },
}))

export default useStyles
