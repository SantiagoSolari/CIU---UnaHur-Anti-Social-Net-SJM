import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './UserProfile.module.css'
import { Carousel } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext'


const UserProfile = () => {
    const { usuario, logout } = useContext(UserContext)
    const navigate = useNavigate()
    const [userPosts, setUserPosts] = useState([])
    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        if(!usuario){
            navigate('/login')
            return    
        }
    

        const posteosUsuario = async () => {
            try {
                const res = await fetch(`http://localhost:3001/posts?userId=${usuario.id}`)
                if(!res.ok){
                    setMensaje(`No se pudieron encontrar las publicaciones del usuario`)
                }

                const posts = await res.json()

                const postsDetallado = await Promise.all(posts.map(async (post) => {
                    const resImages = await fetch(`http://localhost:3001/postimages/post/${post.id}`)
                    const images = resImages.ok ? await resImages.json() : []
                    const resComments = await fetch(`http://localhost:3001/comments/post/${post.id}`)
                    const comments = resComments.ok ? await resComments.json() : []
                    const commentCount = comments.length
                    return({...post, images, commentCount}) //...post -> combina las propiedades que ya tiene post junto a las que se agregan (images y comments)
                }))
                setUserPosts(postsDetallado)
            } catch (error) {
                console.error('Error al cargar las publicaciones del usuario', error.message)
                setMensaje('Hubo un error al obtener las publicaciones del usuario')
            }
        }

    posteosUsuario()
    },[usuario, navigate])

    const manejarVistaPosts = (postId) => {
        navigate(`/post/${postId}`)
    }

    const manejarLogout = () => {
        logout()
        navigate('/Login')
    }

    if(!usuario){
        return null
    }
    
    return(
        <div className='container mt-4'>
            <h2 className='text-center mb-3'>Perfil de Usuario</h2>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h3 className='text-center mb-4'>Bienvenido/a, {usuario.nickName}</h3>
                <button onClick={manejarLogout} className='btn btn-danger btn-sm'>Cerrar Sesión</button>
            </div>

            <h3 className='mb-3 text-center'>Mis Publicaciones</h3>
            {userPosts.length === 0 ? (
                <p className='text-center'>Todavía no creaste publicaciones.</p>
            ) : (
                <div className={styles.postsGridContainer}>
                    {userPosts.map((post) => (
                        <div key={post.id} className={styles.postCard}>
                            <h5>{post.description}</h5>
                            {post.images && post.images.length > 0 && (
                                post.images.length > 1 ? (
                                    <Carousel interval={null} indicators={false} className='mb-2' style={{ width: '100%'}}>
                                        {post.images.map(image => (
                                            <Carousel.Item key={image.id}>
                                                <img 
                                                    className={`d-block ${styles.postImage}`}
                                                    src={image.url}
                                                    alt='Post'
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <img 
                                        src={post.images[0].url}
                                        alt='Post'
                                        className={styles.postImage}
                                    />
                                )
                            )}
                            <p>Comentarios: {post.commentCount}</p>
                            <button onClick={() => manejarVistaPosts(post.id)} className='btn btn-primary'>Ver más</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}
export default UserProfile;