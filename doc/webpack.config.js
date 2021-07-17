const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './server_api/js/index.js',
	module: {
        rules: [
			{
				test: /\.css$/,
        		use: ["style-loader", "css-loader"],
			}
		]
    },
	plugins: [
		new HtmlWebpackPlugin,
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server_api_bundle.js'
	},
	mode: 'production',
}
