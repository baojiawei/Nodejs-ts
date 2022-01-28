(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueReactivity = {}));
})(this, (function (exports) { 'use strict';

  /*
   * @Author: 鲍佳玮
   * @Date: 2022-01-28 20:28:54
   * @LastEditors: 鲍佳玮
   * @LastEditTime: 2022-01-28 20:31:33
   * @Description: computed
   */
  function computed() { }

  /*
   * @Author: 鲍佳玮
   * @Date: 2022-01-28 20:29:26
   * @LastEditors: 鲍佳玮
   * @LastEditTime: 2022-01-29 00:17:13
   * @Description: effect
   */
  function effect(fn, options) {
      if (options === void 0) { options = {}; }
      var effect = createReactiveEffect(fn, options); // 创建一个响应式的effect
      if (!options.lazy) {
          effect();
      }
      return effect;
  }
  var activeEffect; // 全局变量，用于存储当前的effect，关联每个get的state属性
  var uid = 0;
  var effectStack = []; // 建立一个effect栈，用于处理嵌套effect，但是effect被清空导致后面的属性无法被收集
  function createReactiveEffect(fn, options) {
      var effect = function () {
          try {
              activeEffect = effect;
              effectStack.push(activeEffect);
              return fn(); // 内部调用用户传入effect的方法
          }
          finally {
              effectStack.pop();
              activeEffect = effectStack[effectStack.length - 1];
          }
      };
      effect.id = uid++;
      effect.deps = []; // 用于创建每个effect和state的联系
      effect.options = options;
      return effect;
  }
  var targetMap = new WeakMap();
  // 将属性和effect关联,此方法在baseHandlers的get里用到，
  // 因为执行fn后，会一次调用proxy的get方法。需要在get的时候
  // 将目标函数和属性传入
  // 由于effect可以多次调用
  // 所以关联结构应为{Object:{key: [effect,effect]}}
  function track(target, key) {
      if (activeEffect == null) {
          //如果用户不在effect里取值，直接return
          return;
      }
      // start =====处理map空的情况=====
      var depsMap = targetMap.get(target);
      if (!depsMap) {
          targetMap.set(target, (depsMap = new Map()));
      }
      var dep = depsMap.get(key);
      if (!dep) {
          depsMap.set(key, (dep = new Set()));
      }
      // end =====处理map空的情况=====
      // 创建每个属性和effect的联系，这个联系是双向的
      if (!dep.has(activeEffect)) {
          dep.add(activeEffect);
          activeEffect.deps.push(dep);
      }
  }

  /*
   * @Author: 鲍佳玮
   * @Date: 2022-01-28 21:05:13
   * @LastEditors: 鲍佳玮
   * @LastEditTime: 2022-01-28 21:47:30
   * @Description: 工具
   */
  var isObject = function (val) { return typeof val === 'object' && val != null; };
  var isSymbol = function (val) { return typeof val === 'symbol'; };
  var isArray = function (val) { return Array.isArray; };
  var isInteger = function (key) { return '' + parseInt(key, 10) === key; };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = function (val, key) { return hasOwnProperty.call(val, key); };
  var hasChanged = function (value, oldValue) { return value !== oldValue; };

  function createGetter() {
      return function get(target, key, receiver) {
          var res = Reflect.get(target, key, receiver);
          if (isSymbol(key)) {
              return res;
          }
          // 依赖收集
          track(target, key);
          if (isObject(res)) {
              // 取值是对象就代理，懒递归
              return reactive(res);
          }
          return res;
      };
  }
  function createSetter() {
      return function set(target, key, value, receiver) {
          var oldValue = target[key];
          var hadKey = isArray() && isInteger(key) ? Number(key) < target.length : hasOwn(target, key);
          var result = Reflect.set(target, key, value, receiver);
          if (!hadKey) {
              console.log('新增属性');
          }
          else if (hasChanged(value, oldValue)) {
              console.log('修改属性');
          }
          return result;
      };
  }
  var get = createGetter();
  var set = createSetter();
  var mutableHandlers = {
      get: get,
      set: set
  };

  /*
   * @Author: 鲍佳玮
   * @Date: 2022-01-28 20:29:13
   * @LastEditors: 鲍佳玮
   * @LastEditTime: 2022-01-28 21:11:36
   * @Description: reactive
   */
  function reactive(target) {
      return createReactiveObject(target, mutableHandlers);
  }
  var proxyMap = new WeakMap();
  function createReactiveObject(target, baseHandlers) {
      //不是对象不做代理
      if (!isObject(target)) {
          return target;
      }
      var exisitingProxy = proxyMap.get(target);
      if (exisitingProxy) {
          return exisitingProxy;
      }
      var proxy = new Proxy(target, baseHandlers);
      // 做缓存，将代理过的对象和代理后的结果做一个映射表
      proxyMap.set(target, proxy);
      return proxy;
  }

  /*
   * @Author: 鲍佳玮
   * @Date: 2022-01-28 20:30:55
   * @LastEditors: 鲍佳玮
   * @LastEditTime: 2022-01-28 20:32:06
   * @Description: ref
   */
  function ref() { }

  exports.computed = computed;
  exports.effect = effect;
  exports.reactive = reactive;
  exports.ref = ref;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vue.js.map
