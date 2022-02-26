import React, { Component } from "react";
import {Button, Label, Col, Row} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
        
export const CommentForm = (params) => {
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