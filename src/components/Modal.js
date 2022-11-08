import React from 'react'
import { Link } from 'react-router-dom'

function Modal() {
    let id1 = "player1"
    let id2 = "player2"

    return (
        <div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content position-relative">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="modal-body d-flex flex-column align-items-center justify-content-center">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Create a game</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " aria-current="page" href="#">Join a game</a>
                                </li>
                            </ul>
                            <div className="container">
                                <span> My Id : <span className="text-fc3434">{id1}</span></span><br />
                                <span> opponents Id : <span className="text-fc3434">{id2}</span> </span><br />
                                <Link to='/online' >
                            <button  data-bs-dismiss="modal" aria-label="Close" type="button" class="btn btn-primary">Start the game</button>
                                </Link>
                                    

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
