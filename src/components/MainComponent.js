import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import  { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';

class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

  render () {
    return (
      <div>
        <Navbar dark color='primary' width="100%">
          <div className='container'>
            <NavbarBrand left href='/'>Restorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>

        <div className='container mb-5'>
            <Menu dishes={this.state.dishes} 
                onClick={(dishId) => this.onDishSelect(dishId)}
            />

            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        </div>
      </div>
    );
  }
}

export default Main;
