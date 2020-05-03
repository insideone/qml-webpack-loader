'use strict';

const path = require('path');
const qmlParser = require('qmlweb-parser');
const loaderUtils = require('loader-utils');
const RecursiveIterator = require('recursive-iterator');

module.exports = function (source) {
    const options = Object.assign({
        documentType: null,
        exigentMode: false,
        requireRegex: null,
    }, loaderUtils.getOptions(this) || {});

    if (typeof options.requireRegex === 'string') {
        options.requireRegex = new RegExp(options.requireRegex);
    }

    const schema = qmlParser.parse(source, options.documentType, options.exigentMode);

    this.async()(null, `
        ${!options.requireRegex ? '' : (
            Array.from(new RecursiveIterator(schema)).map(({ node }) => {
                if (!(node instanceof Array && node.length >= 2 && typeof node[1] === 'string')) {
                    return null;
                }
                
                const [, filename] = node;
                if (options.requireRegex.test(filename)) {
                    return `require(${JSON.stringify(path.join(this.context, filename))})`;
                }

            }).filter(value => value).join(';')
        )}
        
        module.exports = ${JSON.stringify({
            default: schema,
        })};
    `, null, schema);
}
