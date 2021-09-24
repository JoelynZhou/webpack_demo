const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		app: "./src/index.js",
		print: "./src/print.js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "管理输出",
		}),
	],
	output: {
		// !除此以外，还需要去 index.html 里面修改旧的名称，如何解决？用 HtmlWebpackPlugin 插件
		filename: "[name].bundle.js", //根据入口起点定义的名称，动态产生 bundle 名称
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/, //正则匹配查找哪些文件
				use: ["style-loader", "css-loader"], //将上述文件提供给指定 的loader
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"],
			},
			{
				test: /\.(csv|tsv)$/,
				use: ["csv-loader"],
			},
			{
				test: /\.xml$/,
				use: ["xml-loader"],
			},
		],
	},
};
