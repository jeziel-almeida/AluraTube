import React from "react";
import { videoService } from "../../services/videoService";
import { StyledRegisterVideo } from "./styles";

// get youtube video id
function getVideoId(url) {
    try {
        const videoId = url.split("v=")[1];
        const ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition);
        }
        return videoId;
    } catch (error) {
        return ""
    }
}

function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues)
    const [thumbCode, setThumbCode] = React.useState(getVideoId(values.url))


    return {
        values,
        thumbCode,
        handleChange: (e) => {
            const value = e.target.value
            const name = e.target.name

            setValues({
                ...values,
                [name]: value
            })

            const code = getVideoId(value)

            setThumbCode(code)
        },
        clearForm() {
            setValues({})
            setThumbCode("")
        }

    }
}

export default function RegisterVideo() {

    const formCadastro = useForm({
        initialValues: { titulo: "Clash Royale - New Season", url: "https://www.youtube.com/watch?v=j9HyKVstlDk" }
    })

    const service = videoService()
    const [formVisivel, setFormVisivel] = React.useState(false)

    function getThumb(url) {
        const id = getVideoId(url)
        const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
        return thumb
    }


    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel &&
                <form onSubmit={(e) => {
                    e.preventDefault()
                    console.log(formCadastro.values)

                    //Submission to the database
                    service.insertVideo().insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumb(formCadastro.values.url),
                        playlist: "jogos"
                    })
                    .then((res) => {
                        if(res.error) {
                            alert("Vc não pode adicionar novos vídeos")
                        }
                    })
                    .catch((err) => {
                        console.log("Erro", err)
                    })

                    formCadastro.clearForm()
                    setFormVisivel(false)
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            x
                        </button>
                        <input
                            type="text"
                            placeholder="Título do vídeo"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />
                        <button type="submit">
                            Cadastrar
                        </button>

                        {formCadastro.thumbCode !== "" && <img src={`https://img.youtube.com/vi/${formCadastro.thumbCode}/hqdefault.jpg`} alt="Carregando" style={{ marginTop: "70px" }} />}
                    </div>

                </form>}
        </StyledRegisterVideo>
    )
}