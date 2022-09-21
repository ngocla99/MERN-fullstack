import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

import { CSSTransition } from 'react-transition-group';
import { Fragment } from 'react';
import './Modal.css';

const ModalOverlay = ({
    className,
    style,
    headerClass,
    contentClass,
    footerClass,
    header,
    footer,
    onSubmit,
    children,
}) => {
    const content = (
        <div className={`modal ${className}`} style={style}>
            <header className={`modal__header ${headerClass}`}>
                <h2>{header}</h2>
            </header>
            <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
                <div className={`modal__content ${contentClass}`}>{children}</div>
                <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
            </form>
        </div>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
    return (
        <Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames='modal'>
                <ModalOverlay {...props} />
            </CSSTransition>
        </Fragment>
    );
};

export default Modal;
