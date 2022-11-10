import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues)
    const [thumbCode, setThumbCode] = React.useState("")


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

            const code = value.slice(32)

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
        initialValues: { titulo: "Flappy Bird", url: "https://www.youtube.com/watch?v=jOAU81jdi-c"}
    })

    const [formVisivel, setFormVisivel] = React.useState(false)
    

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel && 
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log(formCadastro.values)
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

                    {formCadastro.thumbCode !== "" && <img src={`https://img.youtube.com/vi/${formCadastro.thumbCode}/hqdefault.jpg`} alt="Carregando" style={{marginTop: "70px"}} />}
                </div>
                
            </form>}
        </StyledRegisterVideo>
    )
}