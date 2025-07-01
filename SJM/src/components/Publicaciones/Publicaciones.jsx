import { useState, useEffect } from 'react'


const Publicaciones = () =>{
    const [posts, setPosts] = useState([])
    const [postsImages, setPostsImages] = useState([])

    useEffect(() =>{
        async function obtenerPosts(){
            try {
                const res = await fetch('http://localhost:3001/posts')
                const data = await res.json()
                setPosts(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        obtenerPosts()
    }, [])

    useEffect(() =>{
        async function obtenerImagesPost(){
            try {
                const res = await fetch('http://localhost:3001/postimages/post/:postId')
                const data = await res.json()
                setPostsImages(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        obtenerImagesPost()
    }, [])

    const obtenerImageById = (postId) =>{
        postsImages.filter( img => img.postId === postId)

    }

    return(<div className='container-publicaciones'>
        {posts.map((post) =>{
            <div className='publicacion'>
                <h3>POST</h3>
                <p>{post.description}</p>
                <div className='imagenes'>
                    {obtenerImageById(post._id).map((img, index)=>{
                        <img src={img.url} alt={`imagen ${index}`} />
                    })}
                </div>
            </div>
        })}
    </div>

    )
}