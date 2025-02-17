# base_react_components

## Developer notes

This package has two entry points one for client components("use clients") and second for server side codes.

Its critical to seperate them, if you do not in that case your code will be marked with "use client" in your final bundle under dist folder which will make your whole code client side and you will start to get weird erros like code x can not be used server side etc.


## Consuming the packae.

Step 1: install the package 

Step 2: you would need to have a custom .npmrc file with your own github PAT.

```
//npm.pkg.github.com/:_authToken=<replace with your PAT>
@kamit-transient:registry=https://npm.pkg.github.com

```

Step 3: if your getting error likr no declaration file found add below two things in your `tsconfig.json`'s **paths** objects like below:

```tsconfig.json
    "paths": {
     ....
     ....,

      "@kamit-transient/react_components": [
        "./node_modules/@kamit-transient/react_components"
      ],
      "@kamit-transient/react_components/client": [
        "./node_modules/@kamit-transient/react_components/dist/types/client-build.d.ts"
      ]
    },

    ```