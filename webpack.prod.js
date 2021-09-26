const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	devtool: "source-map", //鼓励在生产环境使用 source-map，他们对 debug 和基准测试有帮助，但避免使用 inline-source-map，会增加 bundle 体积大小，降低整体性能
});
