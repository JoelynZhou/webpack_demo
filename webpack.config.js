const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");

const options = {};

module.exports = {
	/**
	 * 设置 mode 实现 tree shaking，可以去除 bundle 里面的 dead code(未引用代码),减少 budle 体积
	 */
	mode: "production", //启用 minifaction(代码压缩)和 tree shaking
	// mode: "development", //确保 bundle 是未压缩的版本
	// optimization: {
	// 	usedExports: true,
	// },

	entry: {
		app: "./src/index.js",
		// print: "./src/print.js", //删掉 print.js 的入口起点，因为 index.js 中已经引用了它
	},
	/**
	 * source map 将编译后的代码映射回原始代码，可以更容易的追踪 error 和 warning
	 */
	devtool: "inline-source-map", //!注意：此配置仅用于示例，不要用于生产环境！！
	devServer: {
		static: "./dist", // 将 dist 下的文件 serve 到 localhost://8080 下
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(), //构建前先清理 dist 文件夹，从而只会看到构建后生成的文件，没有新文件
		new WebpackManifestPlugin(options), //在 dist 文件夹内创建一个 json 文件，包含了源文件与相应构建输出文件的映射
		new HtmlWebpackPlugin({
			//创建全新的 index.html 文件，将所有的 bundle 自动添加到 html 中，替换原有文件
			title: "管理输出",
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			//ProvidePlugin 插件实现将模块依赖改为一个全局变量依赖
			_: "lodash",
		}),
	],
	output: {
		// !除此以外，还需要去 index.html 里面修改旧的名称，如何解决？用 HtmlWebpackPlugin 插件
		filename: "[name].bundle.js", //根据入口起点定义的名称，动态产生 bundle 名称
		path: path.resolve(__dirname, "dist"),
		publicPath: "/", //确保文件资源能正确 serve 在 http://localhost:3000 下
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
			// {
			// 	/**
			// 	 * 一般 this 指向 window 对象，但当模块运行在 CommonJS 上下文时，this 指向 module.exports。
			// 	 * 此时，需要通过 imports-loader 覆盖 this 的执行
			// 	 */
			// 	test: require.resolve("./src/index.js"),
			// 	use: "imports-loader?wrapper=window",
			// },
		],
	},
};
