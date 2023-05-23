import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' //自动导入 Composition API
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer' //打包size分析工具
import compression from 'vite-plugin-compression' //gzip/br 压缩
import path from 'path'

// 引入多页面配置文件
import project from './scripts/router.json'
// 获取npm run dev后缀 配置的环境变量
const npm_config_page: string = process.env.npm_config_page || ''

let filterProjects = []
if (npm_config_page) {
  //如果指定了单页面打包，过滤出这个页面的配置项
  filterProjects = project.filter((ele) => {
    return ele.name.toLowerCase() === npm_config_page.toLowerCase()
  })
  console.log(`--------单独构建：${filterProjects[0]['name']}--------`)
} else {
  filterProjects = project
}

//多页面入口
const getEnterPages = (p) => {
  const pages = {}
  p.forEach((ele) => {
    const htmlUrl = path.resolve(__dirname, ele.html)
    pages[ele.name] = htmlUrl
  })
  return pages
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())
  return {
    // root: './src/pages/',
    root: process.cwd(),
    base: env.VITE_BASE_PATH,
    envDir: path.resolve(__dirname), //用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
    plugins: [
      vue(),
      Components({
        dirs: ['src/components/', 'src/pages'],
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: '../components.d.ts'
      }),
      AutoImport({
        include: [
          /.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /.vue$/,
          /.vue?vue/, // .vue
          /.md$/ // .md
        ],
        imports: ['vue', 'vue-router', 'pinia'],
        dts: path.resolve(__dirname, './auto-import.d.ts'),
        eslintrc: {
          // 已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
          enabled: false,
          // 生成文件地址和名称
          filepath: path.resolve(__dirname, './.eslintrc-auto-import.json'),
          globalsPropValue: true
        }
      }),
      visualizer(),
      // gzip格式
      compression({
        threshold: 1024 * 500, // 体积大于 threshold 才会被压缩,单位 b
        ext: '.gz', // 压缩文件格式
        deleteOriginFile: false // 是否删除源文件
      })
      // br格式
      // compression({
      //   threshold: 1024 * 500,    // 体积大于 threshold 才会被压缩,单位 b
      //   ext: '.br',
      //   algorithm: 'brotliCompress',
      //   deleteOriginFile: false
      // })
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      }
    },
    build: {
      outDir: path.resolve(__dirname, `dist`), // 指定输出路径
      assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
      emptyOutDir: true, //Vite 会在构建时清空该目录
      rollupOptions: {
        input: getEnterPages(filterProjects),
        output: {
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          compact: true,
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString() // 拆分多个vendors
            }
          }
        }
      }
    },
    server: {
      host: 'localhost', // 指定服务器主机名
      port: 8880, // 指定服务器端口
      hmr: true,
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      https: false // 是否开启 https
    }
  }
}
