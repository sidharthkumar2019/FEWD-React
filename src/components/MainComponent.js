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
import { postComment, fetchComments, fetchDishes, fetchPromos} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())}
});

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render () {

    const DishWithId = () => {
      console.log('DishWithId invoked');
      let {dishId} = useParams();
      dishId = parseInt(dishId);

      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === dishId)[0]}
            isLoading={this.props.dishes.isLoading}
            ErrMess={this.props.dishes.errmess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
            commentsErrMess={this.props.comments.errmess} 
            postComment={this.props.postComment}
          />
      );
    };

    return (
      <div>
        <Header />
        
          <Routes>
            <Route path='/home' element={ <Home dish={this.props.dishes.dishes.filter( (dish) => dish.featured )[0]}
                                          dishesLoading={this.props.dishes.isLoading}
                                          dishesErrMess={this.props.dishes.errmess}
                                          
                                          promotion={this.props.promotions.promotions.filter( (promotion) => promotion.featured )[0]}
                                          promosLoading={this.props.promotions.isLoading}
                                          promosErrMess={this.props.promotions.errmess}

                                          leader={this.props.leaders.filter( (leader) => leader.featured )[0]} 
                                          /> } />
            <Route exact path='/menu' element={ <Menu dishes={this.props.dishes}/> } />
            <Route exact path='/menu/:dishId' element={ <DishWithId /> } />
            <Route path='/contactus' element={ <Contact resetFeedbackForm={this.props.resetFeedbackForm}/> } />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));