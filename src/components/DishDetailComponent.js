import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { COMMENTS } from '../shared/comments';

const RenderDish = ({dish}) => {
    return (
        <Card>
            <CardBody>
                <CardImg src={dish.image} alt={dish.name} />
                <CardTitle heading>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

const RenderComments = ({dishId}) => {

    const comments = COMMENTS.map((comment) => {
        if ( comment.dishId === dishId ) {
            const date = new Date(comment.date.toString()),
                dateString = date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
            
            return (
                <div tag="li" key={comment.id}>
                    <p width="100%">{comment.comment}</p>
                    <p width="100%">-- {comment.author}, {dateString}</p>
                </div>
            );
        }
    });

    return (
        <ul className='list-ustyled'>
            {comments}
        </ul>
    );
};

const DishDetail = (props) => {
    const dish = props.dish;
    if ( dish === undefined || dish === null ) return (<div></div>);

    return (
        <div className='row mb-5'>
            <div className='col-12 col-md-5 mt-5'>
                <RenderDish dish={dish} />
            </div>
            
            <div className='col-12 col-md-5 mt-5'>
                <h4>Comments</h4>
                <RenderComments dishId={dish.id} />
            </div>
        </div>
    );
}

export default DishDetail;