import React, { Component } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
        window.addEventListener('click', this.handleModalClick)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
        window.removeEventListener('click', this.handleModalClick)
    }

    handleKeyDown = (e) => {
        if (e.code === "Escape") {
            this.props.onClose();
        }
    };

    handleModalClick = (e) => {
        if (e.target.nodeName !== "DIV") {
            return;
        };
        this.props.onClose();
    }

    render() {
        const { url, tags } = this.props;

        return (
        <Overlay>
            <ModalContainer>
                <img src={url} alt={tags} />
            </ModalContainer>
        </Overlay>
        )
    }
};

export default Modal;