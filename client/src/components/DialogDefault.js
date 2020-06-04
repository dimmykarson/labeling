import React, { Component } from 'react';
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class DialogDefault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({ isOpen: false });
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal} className="btn btn-warning">{this.props.open}</button>
                <Modal
                    isOpen={this.state.isOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className="rowC">
                        <h2 className="half">{this.props.title}</h2>
                        <div className="half right">
                            <button onClick={this.closeModal} className="btn btn-info">Fechar</button>
                        </div>
                    </div>


                    <div className="w20">{this.props.children}</div>
                </Modal>
            </div>

        );
    }
}

export default DialogDefault