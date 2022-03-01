import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';
import { Fade, Stagger } from 'react-animation-components';

const RenderLeader = ({leader}) => {
    return (
        <div key={leader.id} className="row mt-5">
            <Media className ="col-12 col-md-3">
                <Media object src={baseURL+leader.image} alt={leader.name} />
            </Media>
            <Media body className="col-12  col-md-9">
            <Media heading>{leader.name}</Media>
            <p>{leader.designation}</p>
            <p>{leader.description}</p>
            </Media>
        </div>
    );
}

function About(props) {
    if ( props.errmess ) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.errmess}</h4>
                </div>
            </div>
        );
    }
    else if ( props.isLoading ) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }

    const leaders = props.leaders.map((leader) => {
        return (
            <Fade in>
                <RenderLeader leader={leader} />
            </Fade>
        );
    });


    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote mb-4">
                                <p><span>
                                You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.
                                </span></p>
                            </blockquote>
                                <footer className="blockquote-footer mb-0">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content col-9">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                    <Stagger in>
                        {leaders}   
                    </Stagger>
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    