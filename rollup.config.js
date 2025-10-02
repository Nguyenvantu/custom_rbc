import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import sizeSnapshot from 'rollup-plugin-size-snapshot'

const createConfig = ({ input, output, env }) => ({
  input,
  output,
  external: [
    'react',
    'react-dom',
    'prop-types',
    'moment',
    'lodash',
    'classnames',
    'date-arithmetic',
    'dom-helpers',
    'invariant',
    'memoize-one',
    'prop-types-extra',
    'react-overlays',
    'uncontrollable',
    'warning'
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    env === 'production' && terser(),
    sizeSnapshot()
  ].filter(Boolean)
})

export default [
  createConfig({
    input: 'src/index.js',
    output: {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'ReactBigCalendar',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        moment: 'moment',
        lodash: '_',
        classnames: 'classNames',
        'date-arithmetic': 'dateArithmetic',
        'dom-helpers': 'domHelpers',
        invariant: 'invariant',
        'memoize-one': 'memoizeOne',
        'prop-types-extra': 'propTypesExtra',
        'react-overlays': 'ReactOverlays',
        uncontrollable: 'uncontrollable',
        warning: 'warning'
      }
    },
    env: process.env.BABEL_ENV === 'esm' ? 'production' : 'development'
  })
]
