import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import {CommentForm} from './CommentFormComponent';

const RenderDish = ({dish}) => {
    return (
        <Card>
            <CardBody>
                <CardImg src={dish.image} alt={dish.name} />
                <CardTitle><h4>{dish.name}</h4></CardTitle>
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

class DishDetail extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal () {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (val) => {
        console.log(JSON.stringify(val));
        alert(JSON.stringify(val));
        this.toggleModal();
    }

    render () {
        const dish = this.props.dish;
        if ( dish === undefined || dish === null ) return (<div></div>);
        
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                    </div>
                </div>
                <div className='row mb-5'>
                    <div className='col-12 col-md-5 mt-5'>
                        <RenderDish dish={this.props.dish} />
                    </div>
                    
                    <div className='col-12 col-md-5 mt-5'>
                        <h4>Comments</h4>
                        <RenderComments comments={this.props.comments} />

                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-pencil fa-lg"></span> Submit Comment
                        </Button>
                    </div>
                </div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <CommentForm handleSubmit={this.handleSubmit}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default DishDetail;