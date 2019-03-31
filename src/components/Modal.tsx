import * as React from 'react';
import modalHelpers from '../lib/modalHelpers';

interface Props {
    children: JSX.Element
    title: string,
    onDismiss?: Function,
    onConfirm?: Function,
    canConfirm?: boolean,
    confirmText?: string
}

interface State {
    modalContentRef: any,
    active: boolean
}

class Modal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalContentRef: false,
            active: true
        }
    }
    dismissModal = () => {
        this.setState({active: false})
        if (this.props.onDismiss)
            this.props.onDismiss();
    }
    confirmModal = (e: React.MouseEvent) => {
        this.setState({ active: false })
        this.props.onConfirm();
    }
    backdropListener = (e: React.MouseEvent) => {
        if (this.state.modalContentRef && !this.state.modalContentRef.contains(e.target)) {
            this.dismissModal();
        }
    }
    setModalContentRef = (node: any) => {
        this.setState({modalContentRef: node});
    }
    render() {
        let className: string = 'modal';
        this.state.active ? className += ' active' : '';
        return (            
            <div className={className} onClick={this.backdropListener}>
                <div ref={this.setModalContentRef} className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">{this.props.title}</div>
                        <div className="modal-dismiss" onClick={() => { this.dismissModal() }}>X</div>
                    </div>
                    {this.props.children}
                    <div className="modal-actions">
                        {this.props.canConfirm ? 
                            <button type="button" onClick={this.confirmModal}>
                                {this.props.confirmText ? 
                                    this.props.confirmText : 'confirm'
                                }
                            </button> : <div></div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;