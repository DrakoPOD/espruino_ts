# espruino_ts
Template for build espruino projects with TypeScript.

## npm commands

```
npm run build
```
Compile the code to ./dist folder using webpack

```
npm run upload
```
Upload the code to espruino board, port must be specified in `env-config`.

```
npm run monitor
```
Monitor the espruino board, port must be specified in `env-config`.

```
npm run upload-monitor
```
Run upload then, run monitor.