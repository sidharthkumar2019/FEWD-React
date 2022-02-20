import React, {Component} from 'react';
import Menu from './MenuComponent';
import  { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Routes, Route, Navigate} from 'react-router-dom';

class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      comments: COMMENTS
    };
  }

  render () {

    return (
      <div>
        <Header />
        
        <Routes>
          <Route path='/home' element={ <Home dish={this.state.dishes.filter( (dish) => dish.featured )[0]}
                                        leader={this.state.leaders.filter( (leader) => leader.featured )[0]} 
                                        promotion={this.state.promotions.filter( (promotion) => promotion.featured )[0]}
                                        /> } />
          <Route exact path='/menu' element={ <Menu dishes={this.state.dishes}/> } />
          <Route path='/contactus' element={ <Contact /> } />
          <Route path='*' element={ <Navigate to='/home' /> }/>
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default Main;
