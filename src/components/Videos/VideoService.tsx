// ESTE ARCHIVO SERA PARA ALMACENAR TODAS LAS PETICIONES AL BACKEND, O SEA LAS DEFINICIONES DE ESAS FUNCIONES
import axios from 'axios'
import {Video} from './Video'

// SOLO ES UNA STRING CON LA RUTA, PARA DESPUES CONCATENAR
// const API = 'http://127.0.0.1:4000'
const API = 'https://mern-api-production-d847.up.railway.app'


export const getVideos = async() => {
    // AHORA LA FUNCION getVideos DEVUELVE UN ARRAY DE ELEMENTOS VIDEO.
    return await axios.get<Video[]>(`${API}/videos`)
}

export const createVideo = async (video: Video) => {
    return await axios.post(`${API}/videos`, video)
}

export const getVideo = async(id: String) => {
    // FUNCION getVideo, SERVIRA PARA OBTENER UN VIDEO AL ENVIAR UN .id
    return await axios.get<Video>(`${API}/videos/${id}`)
}

export const updateVideo = async(id: String, video: Video) => {
    // FUNCION updateVideo, MODIFICA UN VIDEO Y DEVUELVE EL REGISTRO MODIFICADO
    return await axios.put<Video>(`${API}/videos/${id}`, video)
}

export const deleteVideo = async(id: String) => {
    // FUNCION deleteVideo, ELIMINA UN VIDEO AL ENVIAR EL .id
    return await axios.delete<Video>(`${API}/videos/${id}`)
}
