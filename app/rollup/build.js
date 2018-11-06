import node from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';

export default {
    input: ['app/src/js/index.js'],
    output: {
        dir: 'app/dist/js',
        format: 'es',
        sourcemap: true
    },
    plugins: [node(), cjs()],
    experimentalCodeSplitting: true
};
