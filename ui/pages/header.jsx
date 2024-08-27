import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../src/App.css'
import { useNavigate } from "react-router-dom"
import imagePatrimoine from '../../image/immobilier.png'
import immagePossession from '../../image/la-possession.png'

export default function header() {
    const navigate = useNavigate();

    const navigateToPatrimoine = () => {
        navigate('/patrimoine')
    }

    const navigateToPossessions = () => {
        navigate('/possession')
    }

    return (
        <div>
            <div className="text-center my-5">
                <h1 className="titre text-primary">
                    GESTION DE PATRIMOINE
                    <span className="ligne"></span>
                </h1>
            </div>

            <div className="App">
                <div className="bubble-container">
                    <div className="bubble bubble-top-left">
                        <img src={imagePatrimoine} alt="Patrimoine"/>
                        <Button variant="link" onClick={navigateToPatrimoine} className="bubble-text bubble-text-right">Patrimoine</Button>
                    </div>
                    <div className="bubble bubble-bottom-right">
                        <img src={immagePossession} alt="Possession" />
                        <Button variant="link" onClick={navigateToPossessions} className="bubble-text bubble-text-left">Possession</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}