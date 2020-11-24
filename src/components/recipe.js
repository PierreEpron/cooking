import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Link from '@material-ui/core/Link';
import Ingredient from "./ingredient"
import axios from 'axios';

import baseData from '../data/baseData.json'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "80%",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

export default function Recipe({match}) {
  const [isLoaded, setIsLoaded] = useState(false); 
  const [data, setData] = useState(baseData); 
  const [ingredients, setIngredients] = useState([]); 

  const recipe = data[match.params['day']][match.params['recipe']]
  const classes = useStyles();

  useEffect(() => {
    const requests = []
    recipe.ingredients.map((ingredient, i) => {
      requests.push(axios.get(`https://world.openfoodfacts.org/api/v0/product/${ingredient}.json`))
      return ingredient
    })
    axios.all(requests).then((responses) => {
      const _ingredients = []
      console.log(responses)
      responses.map((response, i) => {
        _ingredients.push(responses[i].data.product)
        return response
      })
      setIngredients(_ingredients)
      setIsLoaded(true)
    }).catch(errors => {
      console.log(errors)
    })

  }, [recipe, setIngredients, setIsLoaded]);

  if (!isLoaded) {
    return (<div>Loading...</div>)
  }

  if (ingredients.length === 0) {
    return (<div>there is no ingredients...</div>)
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="  /">
          {days[match.params.day]}
        </Link>
        <Link color="inherit" href="/">
        {match.params.recipe}
        </Link>
        <Typography color="textPrimary">{recipe.recipeLabel}</Typography>
      </Breadcrumbs>
      <h1>{recipe.recipeLabel}</h1>
      <img src={recipe.image} alt={recipe.recipeLabel} />
      <h4>Description :</h4>
      <Typography color="textPrimary">{recipe.description}</Typography>
      <h4>Ingredients :</h4>
      <div className="root">
        <GridList  cols={6} className={classes.gridList}>
          {ingredients.map((ingredient, i) => (
            <GridListTile key={'ingredient-'+[i]}>
                <img src={ingredient.image_front_url} alt={ingredient.product_name_fr} />
                <GridListTileBar
                            title={ingredient.product_name_fr}
                        />
            </GridListTile>
          // <Ingredient key={'ingredient-'+[i]} label={ingredient.product_name_fr} image={ingredient.image_front_url}/>
          ))}
        </GridList>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  );
}