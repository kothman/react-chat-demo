import * as React from 'react';

interface State {
    open: boolean
}

let initialState: State = {
    open: false
}

class Dropdown extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }
    toggleDropdownOpen = () => {
        this.setState({open: !this.state.open});
    }
    render() {
        let className = 'dropdown';
        className += this.props.className ? ' ' + this.props.className : '';
        className += this.state.open ? ' open' : '';
        return <div className={className} onClick={this.toggleDropdownOpen}>
            {this.props.children}
        </div>
    }
}

export default Dropdown;