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
   * @LastEditTime: 2022-01-28 20:31:42
   * @Description: effect
   */
  function effect() { }

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
          console.log(res);
          if (isSymbol(key)) {
              return res;
          }
          // 依赖收集
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
          var hadKey = isArray() && isInteger(target) ? Number(key) < target.length : hasOwn(target, key);
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
