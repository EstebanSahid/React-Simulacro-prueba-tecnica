import { useEffect, useState } from "react"
import './App.css'

const API_RANDOM_FACT = 'https://catfact.ninja/fact'

export function App () {
    const [fact, setFact] = useState()
    const [imgUrl, setImgUrl] = useState()
    
    // Recuperar el dato al cargar la página
    useEffect(() => {
        fetch(API_RANDOM_FACT)
        .then(res => {
            if (!res.ok) throw new Error('Error al recuperar el dato')
            res.json()
        })
        .then(data => {
            const { fact } = data
            setFact(fact)
        })
        .catch(err => {
            console.error('Error::',err)
        })
    }, [])

    // Recuperar la imagen cada que tenemos un nuevo dato
    useEffect(() => {
        // Retorno temprano si no hay dato
        if (!fact) return

        const primeraPalabra = fact.split(' ')[0]
            console.log(primeraPalabra)

            // Fetch a la imagen
            fetch(`https://cataas.com/cat/says/${primeraPalabra}?fontSize=50&fontColor=red&json=true`)
            .then(res => res.json())
            .then(data => {
                const { url } = data
                setImgUrl(url)
            })
    },[fact])

    return (
        <main>
            <h1> App de Gatos </h1>
            {fact && <p>{fact}</p>} 
            {imgUrl && <img src={imgUrl} alt={`Imagen extraida de la primera palabra de ${fact}`} />}
        </main>
    )
}