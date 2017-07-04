import React, { Component } from 'react';

import Loader from 'halogen/RingLoader';
import * as io from 'socket.io-client';
import background from '../assets/images/planets.png';

import Form from './Form';
import Board from './Board';

import '../styles/home.css';

export default class Home extends Component {

  constructor(props) {

    super(props);

    this.state = {
      connected: false,
      error: false,
      message: '',
      loading: true,

      mapSize: {},
      cells: {},
      teams: [],
      players : {},
      game: {
        end: false,
        winner: '',
      },
      segment: 0,
    };

    this.onReceiveIp = this.onReceiveIp.bind(this);
    this.onError = this.onError.bind(this);

  }

  onError(connected, error, message, loading) {

    this.setState({
      connected: connected,
      error: error,
      message: message,
      loading: loading,
    })

  }

  onReceiveIp(ip) {

    if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:[0-9]{1,4}$/.test(ip)) {
      const server = ip.split(':');
      const middleware = '127.0.0.1:8080';

      const socket = io('http://' + middleware, {reconnection: false});

      socket.on('connect_error', () => {
        this.onError(false, true, "Can't get a response from middleware", true);
      });

      socket.on('connect', () => {
        socket.emit('bridge', {ip: server[0], port: server[1]});
      });

      socket.on('failed', () => {
        socket.close();
        this.onError(false, true, "Can't get a response from server", true);
      });

      socket.on('disconnect', () => {
        socket.close();
        this.onError(false, true, "Disconnected to middleware", true);
      });

      socket.on('players', (payload) => {
        this.setState({ players: payload });
      });

      socket.on('cells', (payload) => {
        this.setState({ cells: payload});
      });

      socket.on('end', (payload) => {
        this.setState({
          game: {
            end: payload.end,
            winner: payload.winner,
          }
        })
      });

      socket.on('initialization', (payload) => {
        this.setState({
          mapSize: payload.mapSize,
          cells: payload.cells,
          segment: payload.segment,
          teams: payload.teams,
          loading: false
        })
      });
      this.setState({connected: true});
    } else this.onError(false, true, 'Please enter a valid IP address', true);
  }

  render() {

    return (
      <div className="Home-background" style={{backgroundImage: `url(${background})`}}>
        {
          this.state.connected ?
          <div className="Home-content">
            {
              this.state.loading ?
              <div className="Home-loader">
                <Loader color="#77AAD4" />
              </div>
              :
              <div className="Home-interface">
                <Board
                  mapSize={this.state.mapSize}
                  cells={this.state.cells}
                  teams={this.state.teams}
                  messages={this.state.messages}
                  players={this.state.players}
                  segment={this.state.segment}
                />
              </div>
            }
          </div>
            :
          <div className="Home-form">
            {
              !this.state.game.end ?
                <Form
                  onReceiveIp={this.onReceiveIp}
                  error={this.state.error}
                  message={this.state.message}
                />
                :
                <div />
            }
          </div>
        }
      </div>
    );
  }
}
