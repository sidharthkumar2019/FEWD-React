import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class Menu extends Component {
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 mt-5">
                <Card onClick={() => this.props.onClick(dish.id)}>
                  <CardBody>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />                
                    <CardImgOverlay body className="ml-5">
                        <CardTitle heading>{dish.name}</CardTitle>                    
                    </CardImgOverlay>
                  </CardBody>
                </Card>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
                {menu}              
            </div>
          </div>
        );
    }
}

export default Menu;