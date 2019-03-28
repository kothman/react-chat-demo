import * as React from 'react';
import modalHelpers from '../lib/modalHelpers';

interface Props {
    children: JSX.Element
    id: string,
    title: string
}

class Modal extends React.Component<Props, any> {
    dismissModal = () => {
        modalHelpers.dismiss(this.props.id);
    }
    backdropListener = (e: React.MouseEvent) => {
        let backdrop: HTMLElement = document.getElementById(this.props.id);
        if (backdrop === e.currentTarget)
            this.dismissModal();
    }
    render() {
        let className: string = 'modal';
        return (            
            <div id={this.props.id} className={className} onClick={this.backdropListener}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">{this.props.title}</div>
                        <div className="modal-dismiss" onClick={() => { this.dismissModal() }}>X</div>
                    </div>
                   {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;