import React from 'react';
import classNames from 'classnames';


export default React.createClass({
    propTypes: {
        loading: React.PropTypes.bool,
        error: React.PropTypes.bool,
        mask: React.PropTypes.bool,
        full: React.PropTypes.bool,
        spinner: React.PropTypes.bool,
        size: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            loading: false,
            showError: true,
            mask: true,
            spinner: true,
            full: false
        };
    },
    render() {
        const style = {
            display: this.props.loading ? 'block' : 'none'
        };
        const className = classNames('loading', {full: this.props.full}, this.props.size, this.props.className);
        const spinner = this.props.spinner ?
            <div style={style} className="text-container">
                Завантаження...
            </div>
            : null;
        const content = !this.props.showError || this.props.loading || (!this.props.loading && !this.props.error) ?
            this.props.children : <p>Помилка завантаження</p>;
        return (
            <div className={className}>
                {content}
                {this.props.mask ? <div style={style} className="mask"/> : null}
                {spinner}
            </div>
        );
    }
});
