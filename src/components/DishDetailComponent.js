import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { COMMENTS } from '../shared/comments';

class DishDetail extends Component {

    renderComments(dishId) {
        if ( this.props.comments === null ) return (<div></div>);

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

        return comments;
    }

    render() {
        const dish = this.props.dish;
        if ( dish === undefined || dish === null ) return (<div></div>);

        return (
            <div className='row mb-5'>
                <div className='col-12 col-md-5 mt-5'>
                    <Card>
                        <CardBody>
                            <CardImg src={dish.image} alt={dish.name} />
                            <CardTitle heading>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                
                <div className='col-12 col-md-5 mt-5'>
                    <h4>Comments</h4>

                    <ul className='list-ustyled'>
                        {this.renderComments(dish.id)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default DishDetail;