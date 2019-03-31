import * as React from 'react';
import {connect} from 'react-redux';

import {removeError, removeInfo} from '../actions/notificationsActions';

interface Props {
    errors: string[],
    infos: string[],
    removeError: Function,
    removeInfo: Function
}

class Notifications extends React.Component<any, any> {
    render() {
        let errors: JSX.Element[] = [];
        let infos: JSX.Element[] = [];
        this.props.errors.forEach( (err: string, i: number) => {
            errors.push(<div className="notification notification-error" key={i}>
                {err}
                <span className="remove-notification" onClick={() => this.props.removeError(i)}>x</span>
            </div>);
        });
        this.props.infos.forEach( (info: string, i: number) => {
            infos.push(<div className="notification notification-info" key={i}>
                {info}
                <span className="remove-notification" onClick={() => this.props.removeInfo(i)}>x</span>
            </div>);
        })

        return <div className="notifications">
            {errors}
            {infos}
        </div>
    }
}

function mapStateToProps(state: any) {
    return state.notifications;
}

function mapDispatchToProps(dispatch: any) {
    return {
        removeError: (i: number) => dispatch(removeError(i)),
        removeInfo: (i: number) => dispatch(removeInfo(i))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)