import React from 'react';
import * as Actions from '../actions';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import Search from '../components/Search';
import Main from '../components/Main';

const App = () => (
  <div className="app">
    <Header />
    <Banner />
    <Testimonial />
    <Search />
    <Main />
    {/* <h1>OSfG Project Directory</h1> */}
  </div>
);

export default App;
