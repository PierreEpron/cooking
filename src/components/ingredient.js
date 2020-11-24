import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';

import { makeStyles } from '@material-ui/core/styles';

export default function Ingredient(props) {
  return (
    <GridListTile>
        <img src={props.image} alt={props.label} />
    </GridListTile>
  );
}