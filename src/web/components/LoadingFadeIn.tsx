import * as React from 'react';

interface Props {
    active: boolean
    children?: JSX.Element
}

class LoadingFadeIn extends React.Component<any, any> {
    render() {
        let className: string = "loading loading-fade-in";
        className += this.props.active ? ' active' : '';
        return <div className={className}>{this.props.children}</div>
    }
}

export default LoadingFadeIn;