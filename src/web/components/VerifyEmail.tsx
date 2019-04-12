import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface State {
    success: boolean,
}

class VerifyEmail extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            success: false
        }
    }
    componentDidMount = () => {
        axios.post('/api/v1/verifyEmail', {
            key: this.props.match.params.key
        }).then((res: AxiosResponse) => {
            this.props.dispatch({type: 'ADD_INFO', data: 'Email verified, please login'})
            this.setState({success: true});
            return res;
        }).catch((err: any) => {
            this.props.dispatch({type: 'ADD_ERROR', data: err.response.data.error});
        });
    }
    render() {
        return (
            <div className="page-verify-email">
                { this.state.success ?
                    <Redirect to='/login' /> : <div></div>
                }
            </div>
        );
    }
}

export default connect()(VerifyEmail);