import { useState, useEffect, useContext } from "react"
import { Container, Form, Button, Alert, FormCheck } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const CrearPost = () => {
    const navigate = useNavigate()
    const { usuario } = useContext(UserContext)

    const [description, setDescription] = useState('')
    const [imageUrls, setImageUrls] = useState([''])
    const [tags, setTags] = useState([])
    const [tagIds, setTagIds] = useState([])

    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        if(!usuario){
            navigate('/Login')
            return
        }

        //fetch de tags, busca los tags que haya cargados en la api.
        const traerTags = async() => {
            try {
                const res = await fetch('http://localhost:3001/tags')
                if(!res.ok){
                    setMensaje('No se pudieron obtener las etiquetas')
                    return
                }

                const data = await res.json()
                setTags(data)
            } catch (error) {
                setMensaje('Error al cargar las etiquetas')
                console.log('Error:', error.message)
            }
        }
        traerTags()

    }, [usuario, navigate])

    const manejarCambioImageUrl = (i, valor) => {
    const nuevaUrl = [...imageUrls]
        nuevaUrl[i] = valor //a la nueva imagen con el indice [i]  se le da el valor {valor}.
        setImageUrls(nuevaUrl)
    }

    const agregarCamposImagenUrl = () => {
        setImageUrls([...imageUrls, ''])
    }

    const manejarCambioTag = (e) => { //se actualiza cada vez que se marca y desmarca la seleccion.
        const tagId = parseInt(e.target.value)
        if(e.target.checked){
            setTagIds((tagsIdAntiguas) => {
                if(!tagsIdAntiguas.includes(tagId)){
                    return [...tagsIdAntiguas, tagId]
                }
                return tagsIdAntiguas
            })
        }else{
            setTagIds((tagsIdAntiguas) => tagsIdAntiguas.filter((id) => id !== tagId))
        }
    }

    const manejarSubmit = async (e) => {
        e.preventDefault()
        setMensaje(null)

        if(!description.trim()){
            setMensaje('La descripción es obligatoria')
            return
        }
        if(!usuario){
            setMensaje('Debes iniciar sesión para crear la publicación')
            return
        }

        try {
            const res = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description,
                    userId: usuario.id,
                    tagIds: tagIds.length > 0 ? tagIds : undefined,
                })
            })

            if(!res.ok){
                setMensaje('Error al crear la publicacion')
                return;
            }

            const nuevoPost = await res.json()
            const urlsParaSubir = imageUrls.filter(url => url.trim() !== '')
            if(urlsParaSubir.length > 0){
                for(let url of urlsParaSubir) {
                    const imageRes = await fetch('http://localhost:3001/postimages', { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ url, postId: nuevoPost.id }), 
                    });
                    if(!imageRes.ok){
                        console.error('error al agregar la imagen al post')
                    }
                }

            }

            setMensaje('Publicación creada con éxito')
            alert('Publicacion creada con éxito')
            navigate('/perfilUsuario')

        } catch (error) {
            console.log('Error al crear la publicacion', error.message)
            setMensaje('Error al enviar el formulario')
            
        }
    }

    return (
        <Container className='mt-4'>
            <h2>Nueva Publicación</h2>
            <Form onSubmit={manejarSubmit}>
                {mensaje && ( 
                    <Alert variant={
                        mensaje.includes('error') ? 'success' : 'danger'
                    }>
                        {mensaje}
                    </Alert>
                )}
                <Form controlId='description' className='mb-3'>
                    <Form.Label>Descripción (obligatoria):</Form.Label>
                    <Form.Control 
                        as='textarea'
                        placeholder='Ingrese la descripción de la publicación'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form>

                <Form className='mb-3'>
                    <Form.Label>URLs de imágenes (opcional):</Form.Label>
                    {imageUrls.map((url, i) => (
                        <div key={i} className='d-flex mb-2'>
                            <Form.Control
                                type='text'
                                placeholder={'Ingrese URL de la imagen'}
                                value={url}
                                onChange={(e) => manejarCambioImageUrl(i, e.target.value)}
                            />
                        </div>
                    ))}

                    <Button variant="outline-secondary" size="sm" onClick={agregarCamposImagenUrl}> + Añadir otra imagen</Button>
                </Form>

                <Form className='mb-3'>
                    <Form.Label>Seleccionar etiquetas:</Form.Label> 
                    <div>
                        {tags.map((tag) => (
                        <FormCheck
                            key={tag.id}
                            type="checkbox"
                            id={`tag-${tag.id}`}
                            label={tag.name}
                            value={tag.id}
                            checked={tagIds.includes(tag.id)} 
                            onChange={manejarCambioTag}
                            className="mb-1"
                        />
                        ))}
                    </div>
                </Form>

                <Button variant="primary" type="submit">Crear</Button>
            </Form>
        </Container>
    )
}

export default CrearPost;