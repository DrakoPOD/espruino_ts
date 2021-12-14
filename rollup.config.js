import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/app.ts',
  external: ['MQTT', 'Wifi'],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.min.js',
      format: 'cjs',
      plugins: [terser()],
    },
  ],
  plugins: [typescript()],
};
