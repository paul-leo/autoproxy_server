import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babelEnv from '@babel/preset-env';
console.log(babel, commonjs, nodeResolve, babelEnv);
const isDev = process.env.NODE_ENV === 'development';
const defaultConfig = {
    input: {
        main: 'src/main.ts',
    },
    external: (id) => {
        const external = [];
        const isCoreJs = id.indexOf('core-js') === 0;
        return external.includes(id) || isCoreJs;
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: ['node_modules/**', '../../node_modules/core-js/**'],
            presets: [
                [
                    babelEnv,
                    {
                        useBuiltIns: 'usage',
                        corejs: '3',
                        targets: ['node >= 9'],
                    },
                ],
            ],
        }),
    ],
    output: {
        dir: 'dist',
        format: 'iife',
        entryFileNames: 'main.js',
        sourcemap: isDev,
        exports: 'auto',
    },
};
export default defaultConfig;
