import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';

const RenderDish = ({dish}) => {
    return (
        <Card>
            <CardBody>
                <CardImg src={baseURL+dish.image} alt={dish.name} />
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

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

const CommentForm = (params) => {
    return (
        <LocalForm onSubmit={ (val) => params.handleSubmit(val)}>
            <Row className="form-group">
                <Label htmlFor="rating" md={6}>Rating</Label>
                <Col md={12}>
                    <Control.select model=".rating" id="rating" name="rating"
                        className="form-control" 
                        validators={{
                            isNumber
                        }}>
                        <option value={undefined} selected> Choose</option>
                        <option value={1}> 1</option>
                        <option value={2}> 2</option>
                        <option value={3}> 3</option>
                        <option value={4}> 4</option>
                        <option value={5}> 5</option>
                    </Control.select>
                    <Errors className="text-danger"
                        model='.rating'
                        show='touched'
                        messages={{
                            isNumber: 'Must be a number'
                        }}
                    />
                </Col>
            </Row>
            
            <Row className="form-group">
                <Label htmlFor="author" md={6}>Your Name</Label>
                <Col md={12}>
                    <Control.text model=".author" id="author" name="author"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                        }}
                            />
                    <Errors 
                        className='text-danger'
                        model='.author'
                        show='touched'
                        messages={{
                            required: 'Required, ',
                            minLength: 'Must be greater than 2 characters, ',
                            maxLength: 'Must be 15 characters or less, '
                        }}  
                    />
                </Col>
            </Row>
            
            <Row className="form-group">
                <Label htmlFor="comment" md={6}>Comment</Label>
                <Col md={12}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                        rows="6"
                        className="form-control" />
                </Col>
            </Row>

            <div className="mt-2 form-group">
                <Button type="submit" color="primary">Submit</Button>
            </div>
        </LocalForm>
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
        this.toggleModal();
        this.props.addComment(this.props.dish.id, val.rating, val.author, val.comment);
        console.log(this.props.dish.id, val.rating, val.author, val.comment);
    }

    render () {
        const dish = this.props.dish;
        if ( this.props.errmess ) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>{this.props.errmess}</h4>
                    </div>
                </div>
            );
        }
        else if ( this.props.isLoading ) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            );
        }
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