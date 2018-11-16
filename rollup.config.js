import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/await-here.cjs.js',
      format: 'cjs',
      name:'await-here'
    },
    {
      file: 'dist/await-here.umd.js',
      format: 'umd',
      name:'await-here'
    },
    {
      file: 'dist/await-here.esm.js',
      format: 'esm',
      name:'await-here'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};

