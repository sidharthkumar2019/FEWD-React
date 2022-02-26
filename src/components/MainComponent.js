import React, {Component} from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Routes, Route, Navigate, useParams, useNavigate, useLocation} from 'react-router-dom';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

class Main extends Component {
  
  render () {

    const DishWithId = () => {
      console.log('DishWithId invoked');
      let {dishId} = useParams();
      dishId = parseInt(dishId);

      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === dishId)[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === dishId)} />
      );
    };

    return (
      <div>
        <Header />
        
        <Routes>
          <Route path='/home' element={ <Home dish={this.props.dishes.filter( (dish) => dish.featured )[0]}
                                        leader={this.props.leaders.filter( (leader) => leader.featured )[0]} 
                                        promotion={this.props.promotions.filter( (promotion) => promotion.featured )[0]}
                                        /> } />
          <Route exact path='/menu' element={ <Menu dishes={this.props.dishes}/> } />
          <Route exact path='/menu/:dishId' element={ <DishWithId /> } />
          <Route path='/contactus' element={ <Contact /> } />
          <Route path='/aboutus' element={ <About leaders={this.props.leaders}/> } />
          <Route path='*' element={ <Navigate to='/home' /> }/>
        </Routes>

        <Footer />
      </div>
    );
  }
}

// following function has been defined to use withRouter() which was 
// deprecated in React v6
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter(connect(mapStateToProps)(Main));