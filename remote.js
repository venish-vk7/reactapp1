export const initRemote = (federmodule) => {
  return `promise new Promise(resolve => {
    // This part depends on how you plan on hosting and versioning your federated modules
    const remoteUrlWithVersion = 'http://localhost:8081/remoteEntry.js'
    const script = document.createElement('script')
    script.src = remoteUrlWithVersion

    script.onload = () => {
      // the injected script has loaded and is available on window
      // we can now resolve this Promise
      const proxy = {
        get: (request) => {
          // Note the name of the module
          return window.app2.get(request);
        },
        init: (arg) => {
          try {
            // Note the name of the module
            return window.app2.init(arg)
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
  })`;
};
