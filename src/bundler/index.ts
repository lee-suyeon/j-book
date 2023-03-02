import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;
const bundle = async (rawCode: string) => {
  if(!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  }

  try {
    // bundling
    const env = ["process", "env", "NODE_ENV"].join(".");
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        [env]: '"production"',
        globalName: 'window',
      },
    });
  
    return {
      code: result.outputFiles[0].text,
      err: ''
    } 
  } catch(err) {
    if (err instanceof Error) {
      console.log('err')
      return {
        code: "",
        err: err.message,
      };
    } else {
      throw err;
    }
  }
}

export default bundle;