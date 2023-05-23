import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import PokemonForm from '../../PokemonForm/PokemonForm';

const backdropRoot = document.createElement('div');
backdropRoot.setAttribute('id', 'backdrop-root');
document.body.appendChild(backdropRoot);

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'overlay-root');
document.body.appendChild(modalRoot);

const ModalOverlay = (props) => {
    const isEditing = useSelector((state) => state.pokemon.isEditing);
    const el = document.createElement('div');
    const el1 = document.createElement('div');

    useEffect(() => {
        modalRoot.appendChild(el);
        modalRoot.appendChild(el1);
        return () => {
            modalRoot.removeChild(el);
            modalRoot.removeChild(el1);
        };
    });

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onCancel} />, el)}
            {isEditing &&
                ReactDOM.createPortal(
                    <PokemonForm
                        title={isEditing ? 'Editar Pokemon' : 'Nuevo Pokemon'}
                        onCancel={props.onCancel}
                    />,
                    el1
                )}
        </Fragment>
    );
};

export default ModalOverlay;
