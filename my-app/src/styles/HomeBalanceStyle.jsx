import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerApp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    '@media (min-width:800px)': {
      flexDirection: 'row',
      width: '90%',
      alignItems: 'flex-start',
      maxWidth: '800px',
    },
  },
  userInfoContainer: {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
  },
  graphicInfo: {
    display: 'none',
    '@media (min-width:800px)': {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
    },
  },
  recordInfoContainer: {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    marginTop: '22px',
    '@media (min-width:800px)': {
      marginTop: '0px',
      marginLeft: '20px',
    },
  },
  title: {
    margin: 10,
    width: '90%',
    '@media (min-width:800px)': {
      display: 'flex',
      justifyContent: 'center',
      margin: '30px',
    },
  },
}))

export default useStyles
