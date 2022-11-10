import React from "react"
import { ColorModeContext } from "../src/components/Menu/components/ColorMode"

export default function Video() {

    const contexto = React.useContext(ColorModeContext)

    return (
        <>
            <div>
                <div>Video</div>
                <button onClick={() => contexto.toggleMode()}>Mudar tema</button>
            </div>
        </>
    )
}