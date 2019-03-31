import * as React from 'react';
import { connect } from 'react-redux';

import {Channel} from '../reducers/channels';
import {fetchChannels} from '../actions/channelsActions';

import Modal from './Modal';

interface State {
    promptDeleteChannel: string | boolean
}

class ChannelsSettings extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            promptDeleteChannel: false
        }
    }
    handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
    }
    promptDeleteModal = (channelName: string) => {
        this.setState({promptDeleteChannel: channelName});
    }
    componentDidMount = () => {
        this.props.fetchChannels();
    }
    render() {
        let channels: JSX.Element[] = [];
        this.props.channels.forEach((c: Channel) => {
            channels.push(
                <div className="channel" key={c.name}>
                    {c.name}
                    <div className="delete" onClick={() => {this.promptDeleteModal(c.name)}}><i className="material-icons">delete</i></div>
                </div>
            );
        })

        return <div className="channels-settings">
            { this.state.promptDeleteChannel !== false ?
                <Modal title="Confirm deletion"
                       onDismiss={() => {
                           this.setState({promptDeleteChannel: false})
                        }}
                       onConfirm={() => {
                           this.props.removeChannel(this.state.promptDeleteChannel)
                           this.setState({promptDeleteChannel: false})
                        }}
                       canConfirm={true}
                       confirmText={'delete'}>
                    <div>
                        Are you sure you want to delete the channel "{this.state.promptDeleteChannel}"?
                    </div>
                </Modal> : <div></div>
            }
            <div className="settings-group">
                <div className="subtitle">Add/Remove Channels</div>
                <div className="channels">
                    {channels}
                </div>
            </div>
        </div>;
    }
}

export default connect((state: any) => {
    return {
        channels: state.channels
    };
}, (dispatch) => {
    return {
        fetchChannels: () => { return dispatch<any>(fetchChannels()); },
        addChannel: (name: string) => {},
        removeChannel: (name: string) => { console.log('Todo: implement removeChannel');}
    };
})(ChannelsSettings);