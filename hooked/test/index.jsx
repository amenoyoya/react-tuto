import React from "react";
import '../components/App.css';
import Header from '../components/Header';
import Movie from '../components/Movie';

export default class extends React.Component {
  render() {
    return (
      <div>
        <Header text="Header Test" />
        <Movie movie={{Poster: 'N/A', Title: 'placeholder', Year: '2020'}} />
      </div>
    );
  }
}