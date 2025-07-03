import { useState, useEffect } from 'react'
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import styles from './Publicacion.module.css'

const Publicaciones = () => {
    const [posts, setPosts] = useState([])
    const [images, setImage] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3001/posts')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
            })
            .catch(error => console.error('Error al cargar posts', error))
            .finally()
    }, [])

    useEffect(() => {
        posts.map((post) => {
            fetch(`http://localhost:3001/postimages/post/${post.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setImage((prevImages) => ({
                        ...prevImages,
                        [post.id]: data
                    }));
                })
                .catch(error => console.error('Error al cargar las imagenes', error));
        });
    }, [posts]);

    return (
        <Row className="justify-content-center">
            {posts.map((post) => (

                <Col xs={12} sm={10} md={8} lg={6} className="mb-4" key={post.id}>
                    <Card className={styles.publicacionCard}>
                        <Card.Body>
                            <Card.Title>{post.User.nickName}</Card.Title>
                        </Card.Body>
                        <Card.Body >
                            {images[post.id] && (
                                images[post.id].length > 1 ? (
                                    <Carousel interval={null} indicators={false} className='mb-2' style={{ width: '100%' }}>
                                        {images[post.id].map((image) => (
                                            <Carousel.Item key={image.id}>
                                                <img
                                                    className={`d-block w-100 ${styles.carouselImg}`}
                                                    src={image.url}
                                                    alt="Post"
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <img
                                        src={
                                            images[post.id] && images[post.id].length > 0
                                            ? images[post.id][0].url
                                            : "src/assets/perrito.png"
                                        }
                                        alt="Post"
                                        className={`d-block w-100 ${styles.carouselImg}`}
                                    />) 
                            )}
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                <Button className="btn-dark"variant="dark" onClick={() => navigate(`/post/${post.id}`)}>Ver Mas</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Publicaciones