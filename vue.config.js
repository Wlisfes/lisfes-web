const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
	publicPath: process.env.VUE_APP_BASE_PATH,
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false,
	productionSourceMap: false,
	configureWebpack: {
		name: '妖雨纯',
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
	},
	chainWebpack: config => {
		config.plugin('preload').tap(() => [
			{
				rel: 'preload',
				fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
				include: 'initial'
			}
		])
		config.plugins.delete('prefetch')

		config.when(process.env.NODE_ENV !== 'development', config => {
			config
				.plugin('ScriptExtHtmlWebpackPlugin')
				.after('html')
				.use('script-ext-html-webpack-plugin', [{ inline: /runtime\..*\.js$/ }])
				.end()
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					vendors: {
						name: 'chunk-vendors',
						test: /[\\/]node_modules[\\/]/,
						chunks: 'initial',
						priority: 2,
						reuseExistingChunk: true,
						enforce: true
					},
					elementUI: {
						name: 'chunk-element-ui',
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
						chunks: 'initial',
						priority: 20,
						reuseExistingChunk: true,
						enforce: true
					},
					commons: {
						name: 'chunk-commons', // 打包后的文件名
						test: resolve('src/components'),
						minChunks: 3,
						priority: 5,
						reuseExistingChunk: true
					},
					antDesignVue: {
						name: 'chunk-ant-design-vue',
						test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
						chunks: 'initial',
						priority: 3,
						reuseExistingChunk: true,
						enforce: true
					}
				}
			})
			config.optimization.runtimeChunk('single')
		})
	},
	css: {
		loaderOptions: {
			less: {
				modifyVars: {
					'primary-color': '#FA541C'
				},
				javascriptEnabled: true
			},
			css: {
				modules: {
					localIdentName: '[name]-[local]'
				}
			}
		},
		requireModuleExtension: true
	},
	devServer: {
		port: 1234,
		open: true,
		disableHostCheck: true,
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: 'http://localhost:3005',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					[`^${[process.env.VUE_APP_BASE_API]}`]: ''
				}
			}
		}
	}
}
