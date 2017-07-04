import React from 'react';
import proptypes from 'prop-types';
import '../styles/scorebard.css';
import _ from 'lodash';
import hearth from '../assets/images/heart.png';

const colors = [
  '#3498db',
  '#2ecc71',
  '#9b59b6',
  '#f1c40f',
  '#e74c3c',
  '#bdc3c7'
];

const ScoreBoard = props => {

  function renderOrientation(code) {
    switch (code) {
      case 1:
        return 'N';
      case 2:
        return 'S';
      case 3:
        return 'E';
      case 4:
        return 'O';
      default:
        break;
    }
  }

  return (
    <div className="ScoreBoard-container">
      {
        _.map(props.teams, (team, i) => {
          return (
            <div className="ScoreBoard-team" key={i}>
              <p className="ScoreBoard-title">Team {team}</p>
              {
                _.map(props.players, (player, j) => {
                  if (player.teamName === team) {
                    return (
                      <div key={j}>
                        <p className="ScoreBoard-player">Level {player.level} ; {player.x} ; {player.y} ; {renderOrientation(player.orientation)}</p>
                        <div className="ScoreBoard-resources"><p className="ScoreBoard-number">{player.life}</p><img alt='hearth' src={hearth} style={{ marginLeft: 5, width: 7, height: 7}}/>
                        {
                          _.map(player.resources, (resource, k) => {
                            return (
                              <div className="ScoreBoard-resources" key={k}>
                                <div className="ScoreBoard-resource" style={{ backgroundColor: colors[k] }} />
                                <p className="ScoreBoard-number">{resource}</p>
                              </div>
                            );
                          })
                        }
                        </div>
                      </div>
                    );
                  }
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

ScoreBoard.proptypes = {
  teams: proptypes.array,
  players: proptypes.object,
};

export default ScoreBoard;