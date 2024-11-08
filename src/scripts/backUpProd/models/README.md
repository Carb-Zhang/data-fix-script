# Storehub Schema

For defining Storehub data schema.

### Build for src/*.ts
Just run `yarn build`, will need you input a file path, then will start to build.
Using tsconfig
```
sourceMap: false
target: es2018
module: commonjs
esModuleInterop: true
noImplicitAny: true
moduleResolution: node
```

```
$ yarn build
Which *.ts file you want to build ? (example: src/sample.ts): src/logistics.ts
Starting build file: src/logistics.ts
$ /Users/zach/Code/NodeJS/mongodb_schemas-lib/node_modules/.bin/tsc --declaration --outDir ./ --sourceMap false -t es2018 -m commonjs --esModuleInterop true --noImplicitAny true src/logistics.ts
✨  Done in 8.15s.
```


### Usage

```
var business = require('Schema/business');
...

```

### Structure

* appliedPromotion
* business
* cashRegister
* componentUsage
* customer
* deletedRegister
* employee
* inventory
* inventoryManualUpdateLog
* priceBook
* product
* promotion
* purchasedItemOption
* purchaseOrder
* receiptTemplate
* serialNumber
* sharedCatalog
* shift
* stockReturn
* stockTake
* stockTakeItem
* stockTransfer
* store
* supplier
* timesheet
* transactionRecord
* userActionLog
* userJob
* zReading

### TODO

* user
* order