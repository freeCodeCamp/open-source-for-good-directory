import React from 'react';
import Navbar from './Navbar';
import Card from './Card';

const array = ['1', '1', '1', '1', '1', '1'];

const Main = () => (
  <main className="main">
    <div className="content-center">
      <Navbar />
      <div className="content-container">
        <div className="card-container">
          { array.map(() => <Card />) }
        </div>
      </div>
    </div>
  </main>
);

export default Main;
