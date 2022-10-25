import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import { FaEye, FaRegBookmark, FaShareAlt, FaStar } from 'react-icons/fa';

const NewsSummaryCard = ({news}) => {
    const { _id, title, author, details, image_url, rating, total_view } = news;
    // console.log(news);
    return (
        <Card className="mb-4">
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                    <Image roundedCircle style={{width: '50px'}} src={author?.img}></Image>
                    <div className='ms-2'>
                        <p className='mb-0'>{author?.name}</p>
                        <small>{author?.published_date}</small>
                    </div>
                </div>
                <div>
                    <FaRegBookmark className='me-2' /> <FaShareAlt />
                </div>
            </Card.Header>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Img variant="top mb-2" src={image_url} />
                    <Card.Text>
                        {
                            details.length > 250 ?
                            <>{details.slice(0, 250) + '...'} <Link to={`/news/${_id}`}>Read more</Link></>
                            :
                            <>{details}</>
                        }
                    </Card.Text>
                </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                <div>
                    <FaStar className='text-warning me-2 pb-1' /><span>{rating?.number}</span>
                </div>
                <div>
                    <FaEye className='me-2' /><span>{total_view}</span>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default NewsSummaryCard;