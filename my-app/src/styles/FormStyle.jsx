import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'grid',
    width: '100%',
    height: '100%',
    '@media (min-width:800px)': {
      flexDirection: 'column',
      width: '80%',
      alignItems: 'center',
      margin: '0 auto',
      maxWidth: '600px',
    },
  },
  primary: {
    order: '1',
    '@media (min-width:800px)': {
      width: '20%',
      order: '2',
    },
  },

  secondary: {
    order: '0',
    width: '15%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: '70%',
    '@media (min-width:800px)': {
      justifyContent: 'space-between',
      height: '20%',
      flexDirection: 'row',
      width: '65%',
      order: '1',
    },
  },
  tertiary: {
    display: 'none',
    height: '10%',
    '@media (min-width:800px)': {
      display: 'block',
    },
  },
  button: {
    whiteSpace: 'nowrap',
    transform: 'rotate(90deg)',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width:800px)': {
      transform: 'none',
    },
  },

  textNormal: {
    fontSize: '19px',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  textHover: {
    color: '#FFFFFF',
    fontSize: '25px',
    textAlign: 'center',
    borderTop: '15px solid #2D25CB',
    '@media (min-width:800px)': {
      border: 'thick double  #2D25CB',
      borderBottom: 'dotted',
      borderLeft: 'none',
      borderRight: 'none',
    },
  },
}))

export default useStyles
