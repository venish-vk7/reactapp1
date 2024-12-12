const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = "style-loader";
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        app2: `promise new Promise(resolve => {
      // This part depends on how you plan on hosting and versioning your federated modules
      const remoteUrlWithVersion = 'https://reactapp2-ten.vercel.app/remoteEntry.js'
      const script = document.createElement('script')
      script.src = remoteUrlWithVersion

      script.onload = () => {
        // the injected script has loaded and is available on window
        // we can now resolve this Promise
        const proxy = {
          get: (request) => {
            // Note the name of the module
            return window.reactapp2.get(request);
          },
          init: (arg) => {
            try {
              // Note the name of the module
              return window.reactapp2.init(arg)
            } catch(e) {
              console.log('remote container already initialized')
            }
          }
        }
        resolve(proxy)
      }
      script.onerror = (error) => {
        console.error('error loading remote container')
        const proxy = {
          get: (request) => {
            // If the service is down it will render this content
            return Promise.resolve(() => () => "Remote component is down so Please check the server");
          },
          init: (arg) => {
            return;
          }
        }
        resolve(proxy)
      }
      // inject this script with the src set to the versioned remoteEntry.js
      document.head.appendChild(script);
  })`,
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-router-dom"],
        },
      },
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
