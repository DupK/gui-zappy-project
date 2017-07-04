import React from 'react';
import proptypes from 'prop-types';

import hearth from '../assets/images/heart.png';
import alien1 from '../assets/images/alien.png';
import alien2 from '../assets/images/alien2.png';
import alien3 from '../assets/images/alien3.png';
import human1 from '../assets/images/human1.png';
import human2 from '../assets/images/human2.png';
import human3 from '../assets/images/human3.png';
import human4 from '../assets/images/human4.png';

import egg from '../assets/images/egg.png';

import '../styles/map.css';
import _ from 'lodash';

const colors = [
  '#3498db',
  '#2ecc71',
  '#9b59b6',
  '#f1c40f',
  '#e74c3c',
  '#bdc3c7'
]

const Map = props => {

  function renderSkin(level) {
    switch (level) {
      case 1:
        return alien1;
      case 2:
        return alien2;
      case 3:
        return alien3;
      case 4:
        return human1;
      case 5:
        return human2;
      case 6:
        return human3;
      case 7:
        return human4;
      case 8:
        return human4;
      default:
        break;
    }
  }

  function renderCell(x, y) {
    const id = x * props.mapSize.width + y;
    const currentCell = props.cells[id];
    const players = _.filter(props.players, (player) => {
      return player.x === x && player.y === y;
    });
    let ret = [];

    if (currentCell.life > 0) {
      ret.push (
        <div className="Map-life">
          <img alt='hearth' src={hearth} style={{width: 7, height: 7}}/>
          <p className="Map-nbr-life">{currentCell.life}</p>
        </div>
      )
    }

    if (players.length > 0) {
      ret.push (
        _.map(players, (player, i) => (
          <img alt='alien' key={i} src={renderSkin(player.level)} style={{ position: 'absolute', width: 40, height: 40}}/>
        ))
      )
    }

    if (currentCell.eggs > 0) {
      ret.push (
        <div className="Map-egg">
          <img alt='egg' src={egg} style={{ height: 7, width: 7}}/>
          <p className="Map-nbr-eggs">{currentCell.eggs}</p>
        </div>
      )
    }

    if (currentCell.resources.length > 0) {
      ret.push (
        <div className="Map-resources">
          {
            _.map(currentCell.resources, (resource, i) => {
              if (resource >= 1) {
                return (
                  <div key={i} className="Map-resource">
                    <div style={{backgroundColor: colors[i], width: 7, height: 7, borderRadius: 30}}/>
                    <p className="Map-nbr-resource">{resource}</p>
                  </div>
                );
              }
            })
          }
        </div>
      )
    }
    return ret;
  }

  const height = props.mapSize.height;
  const width = props.mapSize.width;

  return (
    <div className="Map-container">
      <table className="Map-table">
        <tbody>
          {
            new Array(height).fill(0).map((n, x) => ((
                <tr className="Map-tr" key={x}>
                  {
                    new Array(width).fill(0).map((n, y) => {
                      return (
                        <td style={{ backgroundColor: props.cells[x * props.mapSize.width + y].incant === 1 ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}} className="Map-td" key={y}>
                          <div className="Map-cell">
                            {renderCell(x, y)}
                          </div>
                        </td>
                      )})
                  }
                </tr>
              )))
          }
        </tbody>
      </table>
    </div>
  );
};

Map.proptypes = {
  mapSize: proptypes.object,
  cells: proptypes.object,
  players: proptypes.object,
  segment: proptypes.number,
};

export default Map;