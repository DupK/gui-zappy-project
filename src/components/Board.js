import React from 'react';
import proptypes from 'prop-types';
import '../styles/board.css';
import ScoreBoard from './ScoreBoard';
import Map from './Map';

const Board = props => {
  return (
    <div className="Board-layout">
      <div className="Board-map">
        <Map
          mapSize={props.mapSize}
          cells={props.cells}
          players={props.players}
          segment={props.segment}
        />
      </div>
      <div className="Board-sidebar">
        <ScoreBoard
          teams={props.teams}
          players={props.players}
        />
      </div>
    </div>
  );
};

Board.proptypes = {
  mapSize: proptypes.object,
  cells: proptypes.object,
  teams: proptypes.array,
  players: proptypes.object,
  segment: proptypes.number,
};

export default Board;