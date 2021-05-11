const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const {NODE_ENV = "production"} = process.env;

module.exports = {
	entry: "./src/index.js",
	mode: NODE_ENV,
	target: "node",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
	},
	resolve: {
		extensions: [".js"],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{from: ".env", to: "./.env.production"}
			]
		})
	],
	optimization: {
		minimize: NODE_ENV === "production",
		minimizer: [new TerserPlugin({parallel: 4, })],
	},
};
