import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/app/app.tsx'],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  sourcemap: true,
  minify: true,
  bundle: true,
  outdir: 'dist/js',
  logLevel: 'info',
});