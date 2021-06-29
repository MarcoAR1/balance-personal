import KitchenIcon from '@material-ui/icons/Kitchen'
import CommuteIcon from '@material-ui/icons/Commute'
import LocalAirportIcon from '@material-ui/icons/LocalAirport'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CastForEducationIcon from '@material-ui/icons/CastForEducation'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

export const categoryData = {
  Travel: {
    color: '#3A7EFE',
    icon: <LocalAirportIcon style={{ color: '#3A7EFE' }}></LocalAirportIcon>,
  },
  Transport: {
    color: '#583AFE',
    icon: <CommuteIcon style={{ color: '#583AFE' }}></CommuteIcon>,
  },
  Food: {
    color: '#BA3AFE',
    icon: <KitchenIcon style={{ color: '#BA3AFE' }}></KitchenIcon>,
  },
  Services: {
    color: '#FE3AE0',
    icon: <WhatshotIcon style={{ color: '#FE3AE0' }}></WhatshotIcon>,
  },
  Restaurants: {
    color: '#FE3A7E',
    icon: <RestaurantIcon style={{ color: '#FE3A7E' }}></RestaurantIcon>,
  },
  'Health and self-care': {
    color: '#FE583A',
    icon: (
      <FavoriteBorderIcon style={{ color: '#FE583A' }}></FavoriteBorderIcon>
    ),
  },
  Wardrobe: {
    color: '#C6FE3A',
    icon: <ShoppingCartIcon style={{ color: '#C6FE3A' }}></ShoppingCartIcon>,
  },
  Education: {
    color: '#D43AFE',
    icon: (
      <CastForEducationIcon style={{ color: '#D43AFE' }}></CastForEducationIcon>
    ),
  },
  'Entertainment and fun': {
    color: '#FE3A64',
    icon: <FastfoodIcon style={{ color: '#FE3A64' }}></FastfoodIcon>,
  },
  Other: {
    color: '#FE723A',
    icon: <HelpOutlineIcon style={{ color: '#FE723A' }}></HelpOutlineIcon>,
  },
}

export const getDataSortAndFilter = (Records) =>
  Object.entries(
    Records.reduce((reducer, record) => {
      if (record.type === 'sub') {
        const currentCategory = JSON.parse(record.description).category
        const copy = { ...reducer }
        copy[currentCategory]
          ? (copy[currentCategory] += parseInt(record.amount))
          : (copy[currentCategory] = parseInt(record.amount))
        return copy
      }
      return reducer
    }, {})
  )
