import * as React from 'react';

class DropdownMenu extends React.Component<any, any> {
    render() {
        let className: string = 'dropdown-menu';
        className += this.props.className ? ' ' + this.props.className : '';
        return <div className={className}>
            {this.props.children}
        </div>
    }
}

export default DropdownMenu;