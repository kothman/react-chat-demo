module.exports = [
    /* Frontend static content (js and css) */
    require('./base.webpack.config.js'),
    /* Server routes and API logic */
    require('./server.webpack.config.js'),
    /**
     * Widget application (rendered in iframe via widget-embed-script),
     * associated styling, and demo.
     */
    require('./widget.webpack.config.js'),
    /**
     * Distributable script responsible for loading widget on 3rd party site,
     * and associated styling.
     */
    require('./widget-embed-script.webpack.config.js'),
    /* Backend & frontend tests */
    require('./test.webpack.config.js')
];