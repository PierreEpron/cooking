import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Link from '@material-ui/core/Link';

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
      test: {
        display:"flex"
      }
}));
  
export default function Day(props) {
    const classes = useStyles();
  
    return (
            <div className={classes.root}>
                <GridList cellHeight={180} cols={3} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                        <ListSubheader component="div">{props.dayLabel}</ListSubheader>
                    </GridListTile>
                    {['breakfast', 'lunch', 'diner'].map((recipe, i) => (
                        <GridListTile key={"recipe-"+i}>
                            <img src={props.recipes[recipe].image} alt={props.recipes[recipe].recipeLabel}/>
                            <Link href={'/'+props.dayId+'/'+recipe} className={classes.test}>
                                <GridListTileBar
                                title={props.recipes[recipe].recipeLabel}
                                subtitle={<span>{props.recipes[recipe].description}</span>}
                                actionIcon={
                                <IconButton aria-label={`info about ${props.recipes[recipe].recipeLabel}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                                }
                            /></Link>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
    );
}
  