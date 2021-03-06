import React from "react";
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap'
import { Loading } from "./LoadingComponent";
import { baseURL } from '../shared/baseURL';
import { FadeTransform } from 'react-animation-components';

const RenderCard = ({item, isLoading, errmess}) => {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errmess) {
        return (
            <h4>{errmess}</h4>
        );
    }
    else {
        return (
            <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
            <Card>
                <CardImg src={baseURL+item.image} alt={item.name} />
                <CardBody>
                    <CardTitle><h4>{item.name}</h4></CardTitle>
                    {item.designation ? <CardTitle>{item.designation}</CardTitle> : null }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }
};

const Home = (props) => {
    console.log(props);
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errmess={props.dishesErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promosLoading} errmess={props.promosErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leadersLoding} errmess={props.leadersErrMess}/>
                </div>
            </div>
        </div>
    );
};

export default Home;