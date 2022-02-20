import React from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardTitle } from 'reactstrap';

function RenderMenuItem ({dish, onClick}) {
  return (
    <Card onClick={() => onClick(dish.id)}>
      <CardBody>
        <CardImg width="100%" src={dish.image} alt={dish.name} />                
        <CardImgOverlay body className="ml-5">
            <CardTitle heading>{dish.name}</CardTitle>                    
        </CardImgOverlay>
      </CardBody>
    </Card>
  );
}

const Menu = (props) => {
  const menu = props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 mt-5">
          <RenderMenuItem dish={dish} onClick={props.onClick} />
        </div>
      );
  });

  return (
    <div className="container mb-5">
      <div className="row">
          {menu}              
      </div>
    </div>
  );
};
      

export default Menu;