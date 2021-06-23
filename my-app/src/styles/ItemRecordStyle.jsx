import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  itemRecordBalance: {
    marginBottom: '10px',
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
    flexGrow: '1',
  },
}))

export default useStyles
