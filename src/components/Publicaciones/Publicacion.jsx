import { useState, useEffect } from 'react'
import { Carousel, Row, Card, Col, ListGroup, Button, Form } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom'
import './Publicacion.css'
import perrito from '../../assets/perrito.png'


const Publicacion = () => {
    const { id } = useParams()
    const [post, setPost] = useState([])
    const [user, setUsers] = useState([])
    const [comentarios, setComentario] = useState([])
    const [images, setImage] = useState([])
    const [nuevoComentario, setNuevoComentario] = useState('');
    const navigate = useNavigate()


    //Get postId y usuarios
    useEffect(() => {
        fetch(`http://localhost:3001/posts/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
            .catch(error => console.error('Error al cargar el post', error))
            .finally()
    }, [])

    //Imagenes
    useEffect(() => {
            fetch(`http://localhost:3001/postimages/post/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setImage((prevImages) => ({
                        ...prevImages,
                        [id]: data
                    }));
                })
                .catch(error => console.error('Error al cargar las imagenes', error));
        },[]);
    

    //Comentarios
    useEffect(() => {
        fetch(`http://localhost:3001/comments/post/${id}`)
            .then((res) => res.json())
            .then((data) => setComentario(data))
            .catch(error => console.error('Error al cargar los comentarios', error));
    }, [id])

    //Usuario id
    useEffect(() => {
        if (post.UserId) {
            fetch(`http://localhost:3001/users/${post.UserId}`)
                .then((res) => res.json())
                .then((data) => setUsers(data))
                .catch(error => console.error('Error al cargar usuario', error));
        }
        }, [post.UserId])


    const agregarComentario = async (e) => {
        e.preventDefault(); 

        try {
            const res = await fetch('http://localhost:3001/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: nuevoComentario , userId:user.id , postId: post.id}),
            });

            if (!res.ok) {
                alert('Error al crear comentario');
                return;
            }
            const comentarioCreado = await res.json();
            setComentario(prev => [...prev, comentarioCreado]);
            setNuevoComentario('');
        } catch (error) {
            console.error('Error al crear comentario:', error.message);
        }
    };


    return (
        <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} className="mb-4" key={post.id}>
                <Card className='publicacion-card'>
                    <Card.Body>
                        <Card.Title>{post?.User?.nickName || user?.nickName}</Card.Title>
                    </Card.Body>
                    <Card.Body >
                            {images[id] && (
                                images[id].length > 1 ? (
                                    <Carousel interval={null} indicators={false} className='mb-2' style={{ width: '100%' }}>
                                        {images[id].map((image) => (
                                            <Carousel.Item key={image.id}>
                                                <img
                                                    className="d-block w-100 carousel-img"
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
                                            : perrito
                                        }
                                        alt="Post"
                                        className="d-block w-100 carousel-img"
                                    />
                                )
                            )}
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Descripción: {post.description}</ListGroup.Item>
                        <ListGroup.Item>
                            Comentarios: {comentarios.length > 0 ? (
                                comentarios?.map((c, index) => (
                                    <span key={c.id}>
                                        {c.content}
                                        {index < comentarios.length - 1 ? ' - ' : ''}
                                    </span>
                                ))
                            ) : "Sin comentarios"}
                        </ListGroup.Item>
                        <ListGroup.Item>Cantidad Comentarios: {comentarios.length ?? 0}</ListGroup.Item>
                        <ListGroup.Item>Etiquetas: {post?.Tags?.map((tag, index) => (
                            <span key={tag.id}>
                                {tag.name ?? "Sin Tags"}
                                {index < post.Tags.length - 1 ? " - " : ""}
                            </span>
                        ))}</ListGroup.Item>
                    </ListGroup>
                </Card>
                <Button className="btn-volver" variant="primary" onClick={() => navigate(`/Home`)}>Volver</Button>
                <Form onSubmit={agregarComentario} className="comentario-form mt-3">
                    <Form.Control
                        type="text"
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribí un comentario..."
                        className='comentario-input'
                    />
                    <Button variant="primary" type="submit" className="btn-comentar w-100">
                        Comentar
                    </Button>
                </Form>

            </Col>
        </Row>
    )
}

export default Publicacion