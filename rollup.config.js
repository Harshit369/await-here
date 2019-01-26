import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/await-here.cjs.js',
      format: 'cjs',
      name: 'await-here'
    },
    {
      file: 'dist/await-here.umd.js',
      format: 'umd',
      name: 'await-here'
    },
    {
      file: 'dist/await-here.esm.js',
      format: 'esm',
      name: 'await-here'
    }
  ],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
