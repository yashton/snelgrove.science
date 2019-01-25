import React from 'react';
import ReactDOM from 'react-dom'
import Blog from './Blog';
import { BrowserRouter } from "react-router-dom";
import './main.css';
import './fonts.css';

ReactDOM.render(
  <BrowserRouter><Blog/></BrowserRouter>,
  document.getElementById('root'));
