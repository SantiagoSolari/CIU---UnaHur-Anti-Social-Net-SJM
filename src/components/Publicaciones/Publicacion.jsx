import { useState, useEffect } from 'react'
import { Carousel, Row, Card, Col, ListGroup, Button, Form } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom'
import styles from './Publicacion.module.css'
import no_image from '../../assets/no_image.png'
import usuario from '../../assets/usuario.jpg'


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
        <div className={styles.contenedorPost}> 
            <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} className="mb-4" key={post.id}>
                <Card className={styles.publicacionCard}>

                    <Card.Body className={styles.cardNickname}>
                        <Card.Title><img src={usuario} style={{width:"40px"}}/><span style={{color:"black", fontSize:"1.3rem"}}>{post?.User?.nickName || user?.nickName}</span></Card.Title>
                    </Card.Body>

                    <Card.Body>
                        {images[id] && (
                        images[id].length > 1 ? (
                            <Carousel interval={null} indicators={false} className="mb-2" style={{ width: '100%' }}>
                            {images[id].map((image) => (
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
                                : no_image
                            }
                            alt="Post"
                            className={`d-block w-100 ${styles.carouselImg}`}
                            />
                        )
                        )}
                    </Card.Body>

                    <ListGroup className="list-group-flush">
                        <div className={styles.listGroupItem}>
                        Descripción: {post.description}
                        </div>
                        <div className={styles.listGroupItem}>
                            Etiquetas:{' '}
                            {post?.Tags?.length > 0 ? (
                                post.Tags.map((tag) => (
                                <span key={tag.id} className={styles.tag}>
                                    {tag.name ?? "Sin Tags"}
                                </span>
                                ))
                            ) : (
                                <span className={styles.tag}>Sin Tags</span>
                            )}
                        </div>
                        <div className={styles.listGroupItem}>
                        <details className={styles.details}>
                            <summary className={styles.summary}>
                            {comentarios.length ?? 0} Comentarios
                            </summary>

                            {comentarios.length > 0 ? (
                            comentarios.map((c) => (
                                <p key={c.id} className={styles.comentarioText}>
                                {c.content}
                                </p>
                            ))
                            ) : (
                            <p className={styles.comentarioText}>Sin comentarios</p>
                            )}
                        </details>
                        </div>
                    </ListGroup>

                    <Form onSubmit={agregarComentario} className={styles.comentarioForm}>
                        <Form.Control
                        type="text"
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribí un comentario..."
                        className={styles.comentarioInput}
                        />
                        <Button variant="dark" type="submit" className={`w-100 ${styles.btnComentar}`}>
                        Comentar
                        </Button>
                    </Form>

                    <Button
                        variant="dark"
                        className={styles.volverBtn}
                        onClick={() => navigate(`/Home`)}
                    >
                        Volver
                    </Button>

                </Card>

            </Col>
            </Row>
        </div>
        
    )
}

export default Publicacion