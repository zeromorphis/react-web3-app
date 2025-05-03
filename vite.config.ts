import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from 'path';
import react from '@vitejs/plugin-react'
import { wrapperEnv } from "./src/utils/tools";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import postCssPxToRem from 'postcss-pxtorem'
import postCssPxToViewPort8Plugin from 'postcss-px-to-viewport-8-plugin'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode.mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  return {
    root,
    // base: '/',// 开发或生产环境服务的公共基础路径
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOB_APP_TITLE
          }
        }
      }),
      // * 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      // * gzip compress
      viteEnv.VITE_BUILD_GZIP && viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      })
    ],
    server: {
      host: viteEnv.VITE_HOST,//如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址,如果将此设置为localhost将监听127.0.0.1
      port: viteEnv.VITE_PORT,//vite项目启动时自定义端口
      strictPort: true,//若端口已被占用则会直接退出，而不是尝试下一个可用端口
      open: viteEnv.VITE_OPEN, //vite项目启动时自动打开浏览器
      hmr: true, //开启热更新
      proxy: {
				"/api": {
					target: "https://mock.mengxuegu.com/mock/62abda3212c1416424630a45", // easymock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),//适应部分场景，引入一些特殊js文件使用
      }
    },
    css: {
      modules: {
        localsConvention: 'camelCase', // 默认只支持驼峰，修改为同时支持横线和驼峰
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue({ file }: any) {
              return file.indexOf('/antd-mobile/') !== -1 ? 37.5 : 75;
            },
            unitPrecision: 13,// 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            propList: ['*'],
            selectorBlackList: ['ant-'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            exclude: /node_modules|src\/components\/web|src\/views\/web/i,//忽略该目录下文件
          }),
          postCssPxToViewPort8Plugin({
            unitToConvert: 'px', //需要转换的单位，默认为"px"
            viewportWidth: 1920, // 视窗的宽度，对应的是我们设计稿的宽度
            // viewportHeight: 1080,//视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
            unitPrecision: 13, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            fontViewportUnit: 'vw', //字体使用的视口单位
            selectorBlackList: ['adm-'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            // mediaQuery: false, // 允许在媒体查询中转换`px`
            replace: true, //是否直接更换属性值，而不添加备用属性
            exclude: /node_modules|src\/components\/wap|src\/views\/wap/i,//忽略该目录下文件
            // landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            // landscapeUnit: 'vw', //横屏时使用的单位
            // landscapeWidth: 1134 //横屏时使用的视口宽度
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          charset: false,
        },
        less: {
					// modifyVars: {
					// 	"primary-color": "#1DA57A",
					// },
					javascriptEnabled: true,
					additionalData: `@use "@/styles/var.less" as *;`
				}
      },
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "console.warn", "console.error"] : []
    },
    build: {
			outDir: "dist",
			// esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
			minify: "esbuild",
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
  }
});
