/* istanbul instrument in package istanbul-lite */
/* jslint-ignore-begin */
// https://raw.githubusercontent.com/lukehoban/es6features/9354b8f68f26bf1931d05251c7d4411808669c97/README.md
(function exampleEs6() {
'use strict';
var echo = function (arg) {
    return arg;
}, tryCatch = function (fnc) {
    try {
        fnc();
    } catch (errorCaught) {
        console.error(errorCaught.stack);
    }
};
// coverage-hack
tryCatch(function () {
    throw '';
});
tryCatch(function () {
var evens = [0, 2, 4, 6];
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));
// Statement bodies
nums.forEach(v => {
    if (v % 5 === 0) {
        var fives = [];
        fives.push(v);
    }
});
// Lexical this
var bob = {
    _name: 'Bob',
    _friends: ['John'],
    printFriends() {
        this._friends.forEach(f =>
            console.log(this._name + ' knows ' + f));
    }
}
bob.printFriends();
});
tryCatch(function () {
var THREE = { Matrix4: echo, Mesh: echo };
THREE.Mesh.prototype.update = echo;
class SkinnedMesh extends THREE.Mesh {
    constructor(geometry, materials) {
        super(geometry, materials);
        this.idMatrix = SkinnedMesh.defaultMatrix();
        this.bones = [];
        this.boneMatrices = [];
        //...
    }
    update(camera) {
        //...
        super.update();
    }
    get boneCount() {
        return this.bones.length;
    }
    set matrixType(matrixType) {
        this.idMatrix = SkinnedMesh[matrixType]();
    }
    static defaultMatrix() {
        return new THREE.Matrix4();
    }
}
var aa = new SkinnedMesh();
aa.update();
console.assert(aa.boneCount === 0);
aa.matrixType = 'defaultMatrix';
console.assert(aa.matrixType === undefined);
});
tryCatch(function () {
var handler, theProtoObj;
var obj = {
    // __proto__
    __proto__: theProtoObj,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return 'd ' + super.toString();
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42
};
console.assert(String(obj) === 'd [object Object]');
});
tryCatch(function () {
// Basic literal string creation
`In JavaScript '\n' is a line-feed.`;
// Multiline strings
`In JavaScript this is
 not legal.`;
// String interpolation
var name = 'Bob', time = 'today';
`Hello ${name}, how are you ${time}?`;
// Construct an HTTP request prefix is used to interpret the replacements and construction
var POST = function () {
    return myOnReadyStateChangeHandler;
}, a, b, bar, credentials, foo, myOnReadyStateChangeHandler = echo;
POST`http://foo.org/bar?a=${a}&b=${b}
    Content-Type: application/json
    X-Credentials: ${credentials}
    { 'foo': ${foo}, 'bar': ${bar}}`(myOnReadyStateChangeHandler);
});
tryCatch(function () {
var getASTNode = function () {
    return { op: null, lhs: {}, rhs: {} };
};
// list matching
var [a, , b] = [1,2,3];
// object matching
var { op: a, lhs: { op: b }, rhs: c } = getASTNode();
// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var {op, lhs, rhs} = getASTNode();
// Can be used in parameter position
function g({name: x}) {
    console.log(x);
}
g({name: 5});
// Fail-soft destructuring
var [a] = [];
console.assert(a === undefined);
// Fail-soft destructuring with defaults
//// var [a = 1] = [];
//// console.assert(a === 1);
});
tryCatch(function () {
function f(x, y=12) {
    // y is 12 if not passed (or passed as undefined)
    return x + y;
}
console.assert(f(3) === 15);
});
tryCatch(function () {
function f(x, ...y) {
    // y is an Array
    return x * y.length;
}
console.assert(f(3, 'hello', true) === 6);
});
tryCatch(function () {
function f(x, y, z) {
    return x + y + z;
}
// Pass each elem of array as argument
console.assert(f(...[1,2,3]) === 6);
});
tryCatch(function () {
function f() {
    {
        let x;
        {
            // okay, block scoped name
            const x = 'sneaky';
            // error, const
            //// x = 'foo';
        }
        // error, already declared in block
        //// let x = 'inner';
    }
}
f();
});
tryCatch(function () {
let fibonacci = {
    [Symbol.iterator]() {
        let pre = 0, cur = 1;
        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return { done: false, value: cur }
            }
        }
    }
}
for (var n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    console.log(n);
}
});
//// try {(function () {
//// interface IteratorResult {
    //// done: boolean;
    //// value: any;
//// }
//// interface Iterator {
    //// next(): IteratorResult;
//// }
//// interface Iterable {
    //// [Symbol.iterator](): Iterator
//// }
//// }())} catch (errorCaught) {
    //// console.log(errorCaught.stack);
//// }
tryCatch(function () {
var fibonacci = {
    [Symbol.iterator]: function*() {
        var pre = 0, cur = 1;
        for (;;) {
            var temp = pre;
            pre = cur;
            cur += temp;
            yield cur;
        }
    }
}
for (var n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    console.log(n);
}
});
//// try {(function () {
//// interface Generator extends Iterator {
    //// next(value?: any): IteratorResult;
    //// throw(exception: any);
//// }
//// }())} catch (errorCaught) {
    //// console.log(errorCaught.stack);
//// }
tryCatch(function () {
// same as ES5.1
console.assert('\ud842\udfb7'.length === 2);
// new RegExp behaviour, opt-in ‘u’
console.assert('\ud842\udfb7'.match(/./u)[0].length === 2);
// new form
'\u{20BB7}'=='\ud842\udfb7'=='\uD842\uDFB7'
// new String ops
console.assert('\ud842\udfb7'.codePointAt(0) === 0x20BB7);
// for-of iterates code points
for(var c of '\ud842\udfb7') {
    console.log(c);
}
});
//// try {(function () {
//// // lib/math.js
//// export function sum(x, y) {
    //// return x + y;
//// }
//// export var pi = 3.141593;
//// }())} catch (errorCaught) {
    //// console.log(errorCaught.stack);
//// }
//// try {(function () {
//// // app.js
//// import * as math from 'lib/math';
//// alert('2π = ' + math.sum(math.pi, math.pi));
//// }())} catch (errorCaught) {
    //// console.log(errorCaught.stack);
//// }
//// try {(function () {
//// // otherApp.js
//// import {sum, pi} from 'lib/math';
//// alert('2π = ' + sum(pi, pi));
//// }())} catch (errorCaught) {
    //// console.log(errorCaught.stack);
//// }
//// try {(function () {
//// // lib/mathplusplus.js
//// export * from 'lib/math';
//// export var e = 2.71828182846;
//// export default function(x) {
    //// return Math.log(x);
//// }
//// }())} catch (errorCaught) {
    //// console.log(errorCaught.stack);
//// }
//// try {(function () {
//// // app.js
//// import ln, {pi, e} from 'lib/mathplusplus';
//// alert('2π = ' + ln(e)*pi*2);
//// }())} catch (errorCaught) {
    //// console.log(errorCaught.stack);
//// }
//// try {(function () {
//// // Dynamic loading – ‘System’ is default loader
//// System.import('lib/math').then(function(m) {
    //// alert('2π = ' + m.sum(m.pi, m.pi));
//// });
//// // Create execution sandboxes – new Loaders
//// var loader = new Loader({
    //// global: fixup(window) // replace ‘console.log’
//// });
//// loader.eval('console.log('hello world!');');
//// // Directly manipulate module cache
//// System.get('jquery');
//// System.set('jquery', Module({$: $})); // WARNING: not yet finalized
//// }())} catch (errorCaught) {
    //// console.log(errorCaught.stack);
//// }
tryCatch(function () {
// Sets
var s = new Set();
s.add('hello').add('goodbye').add('hello');
console.assert(s.size === 2);
console.assert(s.has('hello') === true);
// Maps
var m = new Map();
m.set('hello', 42);
m.set(s, 34);
console.assert(m.get(s) === 34);
// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
console.assert(wm.size === undefined);
// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
// Because the added object has no other references, it will not be held in the set
});
tryCatch(function () {
// Proxying a normal object
var target = {};
var handler = {
    get: function (receiver, name) {
        return `Hello, ${name}!`;
    }
};
var p = new Proxy(target, handler);
console.assert(p.world === 'Hello, world!');
});
tryCatch(function () {
// Proxying a function object
var target = function () { return 'I am the target'; };
var handler = {
    apply: function (receiver, ...args) {
        return 'I am the proxy';
    }
};
var p = new Proxy(target, handler);
console.assert(p() === 'I am the proxy');
console.assert(target() === 'I am the target');
});
tryCatch(function () {
var handler =
{
    get: echo,
    set: echo,
    has: echo,
    deleteProperty: echo,
    apply: echo,
    construct: echo,
    getOwnPropertyDescriptor: echo,
    defineProperty: echo,
    getPrototypeOf: echo,
    setPrototypeOf: echo,
    enumerate: echo,
    ownKeys: echo,
    preventExtensions: echo,
    isExtensible: echo
}
});
tryCatch(function () {
var MyClass = (function() {
    // module scoped symbol
    var key = Symbol('key');
    function MyClass(privateData) {
        this[key] = privateData;
    }
    MyClass.prototype = {
        doStuff: function() {
            this[key];
        }
    };
    return MyClass;
})();
var c = new MyClass('hello')
console.assert(c.doStuff() === undefined);
console.assert(c.key === undefined);
});
tryCatch(function () {
// Pseudo-code of Array2
class Array2 {
    constructor(...args) { /* ... */ }
    static [Symbol.create]() {
        // Install special [[DefineOwnProperty]]
        // to magically update 'length'
    }
}
// User code of Array2 subclass
class MyArray extends Array2 {
    constructor(...args) { super(...args); }
}
// Two-phase 'new':
// 1) Call @@create to allocate object
// 2) Invoke constructor on new instance
var arr = new MyArray();
arr[1] = 12;
//// console.assert(arr.length === 2, arr.length);
console.assert(MyArray.undefined() === undefined);
});
tryCatch(function () {
Number.EPSILON;
Number.isInteger(Infinity); // false
Number.isNaN('NaN'); // false
Math.acosh(3); // 1.762747174039086
Math.hypot(3, 4); // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2); // 2
'abcde'.includes('cd'); // true
'abc'.repeat(3); // 'abcabcabc'
if (typeof document === 'object' && document) {
    Array.from(document.querySelectorAll('*')); // Returns a real Array
}
Array.of(1, 2, 3); // Similar to new Array(...), but without special one-arg behavior
[0, 0, 0].fill(7, 1); // [0,7,7]
console.assert([1, 2, 3].find(x => x === 3) === 3); // 3
console.assert([1, 2, 3].findIndex(x => x === 2) === 1); // 1
[1, 2, 3, 4, 5].copyWithin(3, 0); // [1, 2, 3, 1, 2]
['a', 'b', 'c'].entries(); // iterator [0, 'a'], [1,'b'], [2,'c']
['a', 'b', 'c'].keys(); // iterator 0, 1, 2
//// ['a', 'b', 'c'].values(); // iterator 'a', 'b', 'c'
var Point = echo;
Object.assign(Point, { origin: new Point(0,0) });
});
tryCatch(function () {
console.assert(0b111110111 === 503); // true
console.assert(0o767 === 503); // true
});
tryCatch(function () {
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}
var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error('hmm');
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
});
tryCatch(function () {
// No sample yet
});
tryCatch(function () {
function factorial(n, acc = 1) {
    //// 'use strict';
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}
// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES6
factorial(100)
});
}());
/* jslint-ignore-end */
