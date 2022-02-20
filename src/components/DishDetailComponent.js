import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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

const RenderComments = ({comments}) => {

    if ( comments === null ) return (<div></div>);

    const renderedComments = comments.map((comment) => {
        const date = new Date(comment.date.toString()),
            dateString = date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
        
        return (
            <div tag="li" key={comment.id}>
                <p width="100%">{comment.comment}</p>
                <p width="100%">-- {comment.author}, {dateString}</p>
            </div>
        );
    });

    return (
        <ul className='list-ustyled'>
            {renderedComments}
        </ul>
    );
};

const DishDetail = (props) => {
    const dish = props.dish;
    if ( dish === undefined || dish === null ) return (<div></div>);

    return (
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                <h3>{props.dish.name}</h3>
                <hr />
                </div>
            </div>
            <div className='row mb-5'>
                <div className='col-12 col-md-5 mt-5'>
                    <RenderDish dish={props.dish} />
                </div>
                
                <div className='col-12 col-md-5 mt-5'>
                    <h4>Comments</h4>
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    );
}

export default DishDetail;