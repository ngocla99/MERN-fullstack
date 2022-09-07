import React from 'react';
import Tree from 'react-d3-tree';
import { TREE_DATA } from '../../const/const';
import { TreeWrapper } from './Map.style.js';

const PATH_FUNC = {
  DIAGONAL: 'diagonal',
  ELBOW: 'elbow',
  STRAIGHT: 'straight',
  STEP: 'step',
};

const Map = (props) => {
  const orgChart = TREE_DATA;

  return (
    <TreeWrapper>
      <Tree data={orgChart} pathFunc={PATH_FUNC.DIAGONAL} />
    </TreeWrapper>
  );
};

export default Map;
