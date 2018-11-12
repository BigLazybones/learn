//事件模块
var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

//emitter.setMaxListeners 默认情况下，如果为特定事件添加了超过 10 个监听器，则 EventEmitter 会打印一个警告。 这有助于发现内存泄露。 但是，并不是所有的事件都要限制 10 个监听器。 emitter.setMaxListeners() 方法可以为指定的 EventEmitter 实例修改限制。 值设为 Infinity（或 0）表示不限制监听器的数量。
life.setMaxListeners(3);

function eat(who){
    console.log("和"+ who + '吃饭');
}

life.on('engagement',eat);

life.on('engagement',function(who){
    console.log("和"+ who + '看电影');
})

life.on('engagement',function(who){
    console.log("和"+ who + '牵手聊心事');
})

life.on('engagement',function(who){
    console.log("和"+ who + '一起看海');
})

life.on('engagement',function(who){
    console.log("和"+ who + '打KISS');
})

life.on('engagement',function(who){
    console.log("和"+ who + '各回各家...');
})

life.on('work',function(who){
    console.log("和"+ who + '一起写代码');
})

life.removeListener('engagement',eat);
//emitter.removeAllListeners 从名为 eventName 的事件的监听器数组中移除指定的 listener。
// life.removeAllListeners('engagement');

// emitter.emit 按照监听器注册的顺序，同步地调用每个注册到名为 eventName 的事件的监听器，并传入提供的参数。
// 如果事件有监听器，则返回 true，否则返回 false
var hasListener = life.emit('engagement','张三');
console.log("事件是否被监听：" + hasListener);

//emitter.listeners 返回名为 eventName 的事件的监听器数组的副本。
console.log(life.listeners('engagement').length);
