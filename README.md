## object-iterable
> Iterate over object with `map`, `each` and `filter`

## Usage

```shell
  $ npm i object-iterable
```

```javascript
  const Iterable = require('object-iterable')
  var o = 
    Iterable({a: 'a', b: 'b', c: true})
      // get only props that have boolean values
      .filter((value, key, obj) => {
        return typeof value === 'string'
      })
      // map object by concating key and value
      .map((value, key, obj) => {
        return key + value
      })
      // log each new value
      .each(function (value, key, obj) => {
        console.log(value)
      })
      
     // Object.keys cached for better experience,
     // so for deleting/setting props and also better perfomance,
     // it is better to use builtin methods like set, kill, forceKill
     
     o.kill(a) 
     // will remove a from object, ! but wont update cache
     // so if u then iterate over object with each or map you will get a as undefined
     
     o.force()
     // reinit cache calling Object.keys, so now it's actually up-to-date
     
     o.forceKill(b) // will kill and call force
```

## API

`Iterable.each` 

iterate over object and evaluate callback

callback params

  * `value` prop value
  * `key` obviously key
  * `obj` iterable object
  
```javascript

iterable.
  .each((value, key, obj) => {
    console.log(value)
  })

```

`Iterable.map` 

map over object and return new object calling callback on each prop

callback params

  * `value` prop value
  * `key` obviously key
  * `obj` iterable object
  
```javascript

iterable.
  .map((value, key, obj) => {
    return key + value
  })

```

`Iterable.filter` 

filtering object calling callback on each prop

callback params

  * `value` prop value
  * `key` obviously key
  * `obj` iterable object
  
```javascript

iterable.
  .filter((value, key, obj) => {
    return key + value
  })

```

`Iterable.set` 

set new prop on object

```javascript

iterable.set('dev', true)

```

`Iterable.kill` 

delete prop on object, but not force cache revaluating

```javascript

iterable.kill('dev')

```

`Iterable.force` 

reinitializing cached variables

```javascript

iterable.kill('dev').force()

```

`Iterable.forceKill` 

helper for kill + force combo

```javascript

iterable.forceKill('dev')

```

##license
MIT
