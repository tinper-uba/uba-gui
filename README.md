# uba-gui
A tool for uba developement

## Installation

```bash

npm i -r https://registry.npm.taobao.org
``` 

or 

```bash

npm i
``` 

## Development

1. `npm run dev`

start `webpack` for bundling `main` and `renderer`

2. open another terminal, `npm start`

start electron app

## Bundle & Production

`npm run build`

then use the following commands:

* `npm run pack` bundle without installation package
* `npm run pack:mac` bundle and create macOS (.dmg) package
* `npm run pack:win` bundle and create window (.exe) package


## Modification
### add/remove vendor
modify `vendors` array in file `webpack/vendor.prod.config.babel.js`

![image](https://user-images.githubusercontent.com/3817644/37190895-7bf63e28-2397-11e8-9eaa-4e7df88a740d.png)

![image](https://user-images.githubusercontent.com/3817644/37190915-9a1c2e94-2397-11e8-9c11-0c64524ff381.png)

![image](https://user-images.githubusercontent.com/3817644/37191917-753814ac-239d-11e8-92b5-a08524504e7b.png)
