// ESTA VA A SER LA LISTA DE VIDEOS POR DEFECTO, QUE VA A VER EL USUARIO
import React, {useEffect, useState} from 'react'
import {Video} from './Video'
// USO * PORQUE SE VAN A DECLARAR MAS SERVICIOS PARA EL CRUD COMPLETO
import * as VideoService from "./VideoService";
import VideoItem from "./VideoItem";

const VideoList = () => {
  // AHORA EL ARRAY, ES DE ELEMENTOS TIPO Video, COMO LA INTERFAZ
  const [videos, setVideos] = useState<Video[]>([])

  const loadVideos = async () => {
    // ESTE MENSAJE SOLO SE PUEDE VER AL EJECUTAR Y VER LA CONSOLA DEL EXPLORADOR, EN EL FRONTEND.
    // axios  SIRVE PARA HACER PETICIONES DE FRONTEND A BACKEND
    // EL DIJO QUE SE PODRIA USAR fetch() DENTRO DEL useEffect, PARA CONSUMIR LA API.
    // PERO ESTE MODO ES EL USADO ACTUALMENTE
    const res = await VideoService.getVideos()
    // MOSTRAR LOS VIDEOS, PONIENDO LOS MAS NUEVOS ARRIBA.
      // PARA ESO VA A CONVERTIR EL ATRIBUTO FECHA DE CREACION, DE STRING A DATE.
    const formatedVideos = res.data.map(video => {
      return {
        // CREA UNA COPIA DEL OBJETO VIDEO, AHI PREGUNTA SI EXISTEN LOS ATRIBUTOS FECHA CREACION Y MODIFICACION.
          // SI EXISTEN LOS CONVIERTE A DATE, SINO CREA NUEVOS DATE.
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt): new Date(),
        updatedAt: video.updatedAt ? new Date(video.updatedAt): new Date(),
      }
    })
    // METODO PARA ORDENAR QUE NO COMPRENDI.
    // EL DIJO QUE LOS MENORES TERMINAN A LA IZQUIERDA Y LOS MAYORES A LA DERECHA.
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    setVideos(formatedVideos);
    console.log(formatedVideos)
  }
  useEffect(()=> {
    // AQUI MOVIO LA SENTENCIA axios.get A UNA FUNCION ASINCRONA LLAMADA loadVideos.
    // ESTO DEBIDO A QUE useEffect NO PERMITE QUE SU FUNCION ANONIMA, SEA ASINCRONA.
    loadVideos()
  }, [])

  return (
    // CREANDO UNA CLASE PARA AGRUPAR LAS COLUMNAS
    <div className="row">
      {/* .map RECORRE TODOS LOS ELEMENTOS DE UNA LISTA */}
      {videos.map((video) => {
        // DESPUES DE HABER CREADO LA INTERFAZ, DIJO QUE ERA NECESARIO ESTE RETURN
        // TAMBIEN DECLARAR LA VARIABLE INTERNA video ENTRE PARENTESIS

        // ESTO ES DIFICIL DE EXPLICAR POR LA NOMENCLATURA, ASI QUE LEERLO DETENIDAMENTE:
        // AQUI MIENTRAS RECORRE LA LISTA DE VIDEOS, CREA UN CONJUNTO DE COMPONENTES VideoItem.
        // LA FUNCION/COMPONENTE REQUIERE UN ARGUMENTO.
        // UN Prop CON EL ATRIBUTO video, DE TIPO Video(POR LA INTERFAZ)
        // EL ATRIBUTO _id PASA COMO CLAVE AGREGADA

        // AHORA EL OBJETO VIDEO QUE VA A SER RETORNADO
        // TIENE ADJUNTA LA FUNCION loadVideos QUE LE PERMITIRA EJECUTAR UNA RECARGA A TODA LA LISTA
        return <VideoItem video={video} key={video._id} loadVideos={loadVideos}/>
      })}
    </div>
  )
}

export default VideoList
