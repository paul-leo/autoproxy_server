import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babelEnv from '@babel/preset-env';
import typescript from '@rollup/plugin-typescript';
const isDev = process.env.NODE_ENV === 'development';
const defaultConfig = {
    input: {
        main: 'src/main.ts',
    },
    external: (id) => {
        return id.indexOf('tslib') === -1 && id.indexOf('node_modules') > -1;
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            include: ['src/**'],
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
        typescript({
            compilerOptions: {
                allowJs: true,
                checkJs: false,
                lib: ['es5', 'es6', 'dom', 'esnext'],
                target: 'es5',
                allowSyntheticDefaultImports: true,
                jsx: 'react',
            },
        }),
    ],
    output: {
        dir: 'dist',
        format: 'es',
        entryFileNames: 'main.js',
        sourcemap: isDev,
        exports: 'auto',
    },
};
export default defaultConfig;
