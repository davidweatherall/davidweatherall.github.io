(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('preact'), require('redux')) :
	typeof define === 'function' && define.amd ? define(['preact', 'redux'], factory) :
	(global.preactRedux = factory(global.preact,global.Redux));
}(this, (function (preact,redux) {

var Children = {
	only: function only(children) {
		return children && children[0] || null;
	}
};

function proptype() {}
proptype.isRequired = proptype;

var PropTypes = {
	element: proptype,
	func: proptype,
	shape: function shape() {
		return proptype;
	},
	instanceOf: function instanceOf() {
		return proptype;
	}
};

var subscriptionShape = PropTypes.shape({
  trySubscribe: PropTypes.func.isRequired,
  tryUnsubscribe: PropTypes.func.isRequired,
  notifyNestedSubs: PropTypes.func.isRequired,
  isSubscribed: PropTypes.func.isRequired
});

var storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  warning('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      classCallCheck(this, Provider);

      var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return Children.only(this.props.children);
    };

    return Provider;
  }(preact.Component);

  {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = storeShape.isRequired, _Provider$childContex[subscriptionKey] = subscriptionShape, _Provider$childContex);

  return Provider;
}

var Provider = createProvider();

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty$1 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

var hoistNonReactStatics = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty$1(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};

var invariant = function () {};

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get$$1() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = storeShape, _contextTypes[subscriptionKey] = subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    invariant(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      inherits(Connect, _Component);

      function Connect(props, context) {
        classCallCheck(this, Connect);

        var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        invariant(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        invariant(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return preact.h(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(preact.Component);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;


    {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return hoistNonReactStatics(Connect, WrappedComponent);
  };
}

var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      verifyPlainObject(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && (typeof mapDispatchToProps === 'undefined' ? 'undefined' : _typeof(mapDispatchToProps)) === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return redux.bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}

var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}

var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        verifyPlainObject(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      warning('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? shallowEqual : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? shallowEqual : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? shallowEqual : _ref2$areMergedPropsE,
        extraOptions = objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

var connect = createConnect();

var index = { Provider: Provider, connect: connect, connectAdvanced: connectAdvanced };

return index;

})));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"preact":2,"redux":9}],2:[function(require,module,exports){
!function() {
    'use strict';
    function VNode() {}
    function h(nodeName, attributes) {
        var lastSimple, child, simple, i, children = EMPTY_CHILDREN;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && null != attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else {
            if ('boolean' == typeof child) child = null;
            if (simple = 'function' != typeof nodeName) if (null == child) child = ''; else if ('number' == typeof child) child = String(child); else if ('string' != typeof child) simple = !1;
            if (simple && lastSimple) children[children.length - 1] += child; else if (children === EMPTY_CHILDREN) children = [ child ]; else children.push(child);
            lastSimple = simple;
        }
        var p = new VNode();
        p.nodeName = nodeName;
        p.children = children;
        p.attributes = null == attributes ? void 0 : attributes;
        p.key = null == attributes ? void 0 : attributes.key;
        if (void 0 !== options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        for (var i in props) obj[i] = props[i];
        return obj;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function enqueueRender(component) {
        if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p.__d) renderComponent(p);
    }
    function isSameNodeType(node, vnode, hydrating) {
        if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
        if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName); else return hydrating || node._componentConstructor === vnode.nodeName;
    }
    function isNamedNode(node, nodeName) {
        return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }
    function getNodeProps(vnode) {
        var props = extend({}, vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (void 0 !== defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function createNode(nodeName, isSvg) {
        var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
        node.__n = nodeName;
        return node;
    }
    function removeNode(node) {
        var parentNode = node.parentNode;
        if (parentNode) parentNode.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('key' === name) ; else if ('ref' === name) {
            if (old) old(null);
            if (value) value(node);
        } else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if ('string' != typeof old) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !1 === IS_NON_DIMENSIONAL.test(i) ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else node.removeEventListener(name, eventProxy, useCapture);
            (node.__l || (node.__l = {}))[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || !1 === value) node.removeAttribute(name);
        } else {
            var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));
            if (null == value || !1 === value) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); else node.removeAttribute(name); else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this.__l[e.type](options.event && options.event(e) || e);
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
            hydrating = null != dom && !('__preactattr_' in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll, componentRoot);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll, componentRoot) {
        var out = dom, prevSvgMode = isSvgMode;
        if (null == vnode || 'boolean' == typeof vnode) vnode = '';
        if ('string' == typeof vnode || 'number' == typeof vnode) {
            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                out = document.createTextNode(vnode);
                if (dom) {
                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                    recollectNodeTree(dom, !0);
                }
            }
            out.__preactattr_ = !0;
            return out;
        }
        var vnodeName = vnode.nodeName;
        if ('function' == typeof vnodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
        isSvgMode = 'svg' === vnodeName ? !0 : 'foreignObject' === vnodeName ? !1 : isSvgMode;
        vnodeName = String(vnodeName);
        if (!dom || !isNamedNode(dom, vnodeName)) {
            out = createNode(vnodeName, isSvgMode);
            if (dom) {
                while (dom.firstChild) out.appendChild(dom.firstChild);
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, !0);
            }
        }
        var fc = out.firstChild, props = out.__preactattr_, vchildren = vnode.children;
        if (null == props) {
            props = out.__preactattr_ = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
        var j, c, f, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren ? vchildren.length : 0;
        if (0 !== len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child.__preactattr_, key = vlen && props ? _child._component ? _child._component.__k : props.key : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
        }
        if (0 !== vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && void 0 !== keyed[key]) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c;
                children[j] = void 0;
                if (j === childrenLen - 1) childrenLen--;
                if (j === min) min++;
                break;
            }
            child = idiff(child, vchild, context, mountAll);
            f = originalChildren[i];
            if (child && child !== dom && child !== f) if (null == f) dom.appendChild(child); else if (child === f.nextSibling) removeNode(f); else dom.insertBefore(child, f);
        }
        if (keyedLen) for (var i in keyed) if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
        while (min <= childrenLen) if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component); else {
            if (null != node.__preactattr_ && node.__preactattr_.ref) node.__preactattr_.ref(null);
            if (!1 === unmountOnly || null == node.__preactattr_) removeNode(node);
            removeChildren(node);
        }
    }
    function removeChildren(node) {
        node = node.lastChild;
        while (node) {
            var next = node.previousSibling;
            recollectNodeTree(node, !0);
            node = next;
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name;
        (components[name] || (components[name] = [])).push(component);
    }
    function createComponent(Ctor, props, context) {
        var inst, list = components[Ctor.name];
        if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
        } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
        }
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.__b = list[i].__b;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function doRender(props, state, context) {
        return this.constructor(props, context);
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component.__x) {
            component.__x = !0;
            if (component.__r = props.ref) delete props.ref;
            if (component.__k = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.__c) component.__c = component.context;
                component.context = context;
            }
            if (!component.__p) component.__p = component.props;
            component.props = props;
            component.__x = !1;
            if (0 !== opts) if (1 === opts || !1 !== options.syncComponentUpdates || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__r) component.__r(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component.__x) {
            var rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.__p || props, previousState = component.__s || state, previousContext = component.__c || context, isUpdate = component.base, nextBase = component.__b, initialBase = isUpdate || nextBase, initialChildComponent = component._component, skip = !1;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && !1 === component.shouldComponentUpdate(props, state, context)) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.__p = component.__s = component.__c = component.__b = null;
            component.__d = !1;
            if (!skip) {
                rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if ('function' == typeof childComponent) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1); else {
                        toUnmount = inst;
                        component._component = inst = createComponent(childComponent, childProps, context);
                        inst.__b = inst.__b || nextBase;
                        inst.__u = component;
                        setComponentProps(inst, childProps, 0, context, !1);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase, !1);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t.__u) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            if (null != component.__h) while (component.__h.length) component.__h.pop().call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c.__u)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.__b) {
                c.__b = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom, !1);
            }
        }
        return dom;
    }
    function unmountComponent(component) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component.__x = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner); else if (base) {
            if (base.__preactattr_ && base.__preactattr_.ref) base.__preactattr_.ref(null);
            component.__b = base;
            removeNode(base);
            collectComponent(component);
            removeChildren(base);
        }
        if (component.__r) component.__r(null);
    }
    function Component(props, context) {
        this.__d = !0;
        this.context = context;
        this.props = props;
        this.state = this.state || {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent, !1);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var defer = 'function' == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var items = [];
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        setState: function(state, callback) {
            var s = this.state;
            if (!this.__s) this.__s = extend({}, s);
            extend(s, 'function' == typeof state ? state(s, this.props) : state);
            if (callback) (this.__h = this.__h || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function(callback) {
            if (callback) (this.__h = this.__h || []).push(callback);
            renderComponent(this, 2);
        },
        render: function() {}
    });
    var preact = {
        h: h,
        createElement: h,
        cloneElement: cloneElement,
        Component: Component,
        render: render,
        rerender: rerender,
        options: options
    };
    if ('undefined' != typeof module) module.exports = preact; else self.preact = preact;
}();

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
	var _class, _temp2;

	var Component = _ref.Component,
	    createElement = _ref.createElement;
	return _temp2 = _class = function (_Component) {
		_inherits(ReactHint, _Component);

		function ReactHint() {
			var _temp, _this, _ret;

			_classCallCheck(this, ReactHint);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { target: null }, _this._containerStyle = { position: 'relative' }, _this.toggleEvents = function (_ref2, flag) {
				var events = _ref2.events,
				    _ref2$events = _ref2.events,
				    click = _ref2$events.click,
				    focus = _ref2$events.focus,
				    hover = _ref2$events.hover;

				var action = flag ? 'addEventListener' : 'removeEventListener';
				var hasEvents = events === true;(click || hasEvents) && document[action]('click', _this.toggleHint);(focus || hasEvents) && document[action]('focusin', _this.toggleHint);(hover || hasEvents) && document[action]('mouseover', _this.toggleHint);(click || hover || hasEvents) && document[action]('touchend', _this.toggleHint);
			}, _this.toggleHint = function () {
				var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    _ref3$target = _ref3.target,
				    target = _ref3$target === undefined ? null : _ref3$target;

				clearTimeout(_this._timeout);
				_this._timeout = setTimeout(function () {
					return _this.setState(function () {
						return {
							target: _this.getHint(target)
						};
					});
				}, _this.props.delay);
			}, _this.getHint = function (el) {
				var _this$props = _this.props,
				    attribute = _this$props.attribute,
				    persist = _this$props.persist;
				var target = _this.state.target;


				while (el) {
					if (el === document) break;
					if (persist && el === _this._hint) return target;
					if (el.hasAttribute(attribute)) return el;
					el = el.parentNode;
				}return null;
			}, _this.shallowEqual = function (a, b) {
				var keys = Object.keys(a);
				return keys.length === Object.keys(b).length && keys.reduce(function (result, key) {
					return result && (typeof a[key] === 'function' && typeof b[key] === 'function' || a[key] === b[key]);
				}, true);
			}, _this.getHintData = function (_ref4, _ref5) {
				var target = _ref4.target;
				var attribute = _ref5.attribute,
				    autoPosition = _ref5.autoPosition,
				    position = _ref5.position;

				var content = target.getAttribute(attribute) || '';
				var at = target.getAttribute(attribute + '-at') || position;

				var _this$_container$getB = _this._container.getBoundingClientRect(),
				    containerTop = _this$_container$getB.top,
				    containerLeft = _this$_container$getB.left;

				var _this$_hint$getBoundi = _this._hint.getBoundingClientRect(),
				    hintWidth = _this$_hint$getBoundi.width,
				    hintHeight = _this$_hint$getBoundi.height;

				var _target$getBoundingCl = target.getBoundingClientRect(),
				    targetTop = _target$getBoundingCl.top,
				    targetLeft = _target$getBoundingCl.left,
				    targetWidth = _target$getBoundingCl.width,
				    targetHeight = _target$getBoundingCl.height;

				if (autoPosition) {
					var isHoriz = ['left', 'right'].includes(at);

					var _document$documentEle = document.documentElement,
					    clientHeight = _document$documentEle.clientHeight,
					    clientWidth = _document$documentEle.clientWidth;


					var directions = {
						left: (isHoriz ? targetLeft - hintWidth : targetLeft + (targetWidth - hintWidth >> 1)) > 0,
						right: (isHoriz ? targetLeft + targetWidth + hintWidth : targetLeft + (targetWidth + hintWidth >> 1)) < clientWidth,
						bottom: (isHoriz ? targetTop + (targetHeight + hintHeight >> 1) : targetTop + targetHeight + hintHeight) < clientHeight,
						top: (isHoriz ? targetTop - (hintHeight >> 1) : targetTop - hintHeight) > 0
					};

					switch (at) {
						case 'left':
							if (!directions.left) at = 'right';
							if (!directions.top) at = 'bottom';
							if (!directions.bottom) at = 'top';
							break;

						case 'right':
							if (!directions.right) at = 'left';
							if (!directions.top) at = 'bottom';
							if (!directions.bottom) at = 'top';
							break;

						case 'bottom':
							if (!directions.bottom) at = 'top';
							if (!directions.left) at = 'right';
							if (!directions.right) at = 'left';
							break;

						case 'top':
						default:
							if (!directions.top) at = 'bottom';
							if (!directions.left) at = 'right';
							if (!directions.right) at = 'left';
							break;
					}
				}

				var top = void 0,
				    left = void 0;
				switch (at) {
					case 'left':
						top = targetHeight - hintHeight >> 1;
						left = -hintWidth;
						break;

					case 'right':
						top = targetHeight - hintHeight >> 1;
						left = targetWidth;
						break;

					case 'bottom':
						top = targetHeight;
						left = targetWidth - hintWidth >> 1;
						break;

					case 'top':
					default:
						top = -hintHeight;
						left = targetWidth - hintWidth >> 1;
				}

				return {
					content: content, at: at,
					top: top + targetTop - containerTop | 0,
					left: left + targetLeft - containerLeft | 0
				};
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		ReactHint.prototype.componentDidMount = function componentDidMount() {
			this.toggleEvents(this.props, true);
		};

		ReactHint.prototype.componentWillUnmount = function componentWillUnmount() {
			this.toggleEvents(this.props, false);
			clearTimeout(this._timeout);
		};

		ReactHint.prototype.shouldComponentUpdate = function shouldComponentUpdate(props, state) {
			return !this.shallowEqual(state, this.state) || !this.shallowEqual(props, this.props);
		};

		ReactHint.prototype.componentDidUpdate = function componentDidUpdate() {
			if (this.state.target) this.setState(this.getHintData);
		};

		ReactHint.prototype.render = function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    onRenderContent = _props.onRenderContent;
			var _state = this.state,
			    target = _state.target,
			    content = _state.content,
			    at = _state.at,
			    top = _state.top,
			    left = _state.left;


			return createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this2._container = _ref7;
					},
					style: this._containerStyle },
				target && createElement(
					'div',
					{ className: className + ' ' + className + '--' + at,
						ref: function ref(_ref6) {
							return _this2._hint = _ref6;
						},
						style: { top: top, left: left } },
					onRenderContent ? onRenderContent(target, content) : createElement(
						'div',
						{ className: className + '__content' },
						content
					)
				)
			);
		};

		return ReactHint;
	}(Component), _class.defaultProps = {
		attribute: 'data-rh',
		autoPosition: false,
		className: 'react-hint',
		delay: 0,
		events: false,
		onRenderContent: null,
		persist: false,
		position: 'top'
	}, _temp2;
};

module.exports = exports['default'];
},{}],5:[function(require,module,exports){
(function (global){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.reduxLogger=e.reduxLogger||{})}(this,function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function n(e,t,r){n.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function o(e,t){o.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function f(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function u(e){var t="undefined"==typeof e?"undefined":N(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,c,s,d,p){s=s||[],p=p||[];var g=s.slice(0);if("undefined"!=typeof d){if(c){if("function"==typeof c&&c(g,d))return;if("object"===("undefined"==typeof c?"undefined":N(c))){if(c.prefilter&&c.prefilter(g,d))return;if(c.normalize){var h=c.normalize(g,d,e,t);h&&(e=h[0],t=h[1])}}}g.push(d)}"regexp"===u(e)&&"regexp"===u(t)&&(e=e.toString(),t=t.toString());var y="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new o(g,t));else if(!m&&b)r(new i(g,e));else if(u(e)!==u(t))r(new n(g,e,t));else if("date"===u(e)&&e-t!==0)r(new n(g,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter(function(t){return t.lhs===e}).length)e!==t&&r(new n(g,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;e.length;for(w=0;w<e.length;w++)w>=t.length?r(new a(g,w,new i(void 0,e[w]))):l(e[w],t[w],r,c,g,w,p);for(;w<t.length;)r(new a(g,w,new o(void 0,t[w++])))}else{var x=Object.keys(e),S=Object.keys(t);x.forEach(function(n,o){var i=S.indexOf(n);i>=0?(l(e[n],t[n],r,c,g,n,p),S=f(S,i)):l(e[n],void 0,r,c,g,n,p)}),S.forEach(function(e){l(void 0,t[e],r,c,g,e,p)})}p.length=p.length-1}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new n(g,e,t)))}function c(e,t,r,n){return n=n||[],l(e,t,function(e){e&&n.push(e)},r),n.length?n:void 0}function s(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":s(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":s(e[t],r.index,r.item);break;case"D":e=f(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":s(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":o[r.path[n]]=r.lhs;break;case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e[t]=r.lhs;break;case"E":e[t]=r.lhs;break;case"N":e=f(e,t)}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":p(i[r.path[n]],r.index,r.item);break;case"D":i[r.path[n]]=r.lhs;break;case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}}function h(e,t,r){if(e&&t){var n=function(n){r&&!r(e,t,n)||d(e,t,n)};l(e,t,n)}}function y(e){return"color: "+F[e].color+"; font-weight: bold"}function v(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"→",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}function b(e,t,r,n){var o=c(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach(function(e){var t=e.kind,n=v(e);r.log.apply(r,["%c "+F[t].text,y(t)].concat(P(n)))}):r.log("—— no diff ——");try{r.groupEnd()}catch(e){r.log("—— diff end —— ")}}function m(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,P(r)):e[n];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function x(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?w(t):o,a=t.collapsed,f=t.colors,u=t.level,l=t.diff,c="undefined"==typeof t.titleFormatter;e.forEach(function(o,s){var d=o.started,p=o.startedTime,g=o.action,h=o.prevState,y=o.error,v=o.took,w=o.nextState,x=e[s+1];x&&(w=x.prevState,v=x.started-d);var S=n(g),k="function"==typeof a?a(function(){return w},g,o):a,j=D(p),E=f.title?"color: "+f.title(S)+";":"",A=["color: gray; font-weight: lighter;"];A.push(E),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var O=i(S,j,v);try{k?f.title&&c?r.groupCollapsed.apply(r,["%c "+O].concat(A)):r.groupCollapsed(O):f.title&&c?r.group.apply(r,["%c "+O].concat(A)):r.group(O)}catch(e){r.log(O)}var N=m(u,S,[h],"prevState"),P=m(u,S,[S],"action"),C=m(u,S,[y,h],"error"),F=m(u,S,[w],"nextState");if(N)if(f.prevState){var L="color: "+f.prevState(h)+"; font-weight: bold";r[N]("%c prev state",L,h)}else r[N]("prev state",h);if(P)if(f.action){var T="color: "+f.action(S)+"; font-weight: bold";r[P]("%c action    ",T,S)}else r[P]("action    ",S);if(y&&C)if(f.error){var M="color: "+f.error(y,h)+"; font-weight: bold;";r[C]("%c error     ",M,y)}else r[C]("error     ",y);if(F)if(f.nextState){var _="color: "+f.nextState(w)+"; font-weight: bold";r[F]("%c next state",_,w)}else r[F]("next state",w);l&&b(h,w,r,k);try{r.groupEnd()}catch(e){r.log("—— log end ——")}})}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,f=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var r=e.getState;return function(e){return function(l){if("function"==typeof i&&!i(r,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=n(r()),c.action=l;var s=void 0;if(a)try{s=e(l)}catch(e){c.error=o(e)}else s=e(l);c.took=O.now()-c.started,c.nextState=n(r());var d=t.diff&&"function"==typeof f?f(r,l):t.diff;if(x(u,Object.assign({},t,{diff:d})),u.length=0,c.error)throw c.error;return s}}}}var k,j,E=function(e,t){return new Array(t+1).join(e)},A=function(e,t){return E("0",t-e.toString().length)+e},D=function(e){return A(e.getHours(),2)+":"+A(e.getMinutes(),2)+":"+A(e.getSeconds(),2)+"."+A(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},C=[];k="object"===("undefined"==typeof global?"undefined":N(global))&&global?global:"undefined"!=typeof window?window:{},j=k.DeepDiff,j&&C.push(function(){"undefined"!=typeof j&&k.DeepDiff===c&&(k.DeepDiff=j,j=void 0)}),t(n,r),t(o,r),t(i,r),t(a,r),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:h,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof j},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e()}),C=null),c},enumerable:!0}});var F={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?S()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=L,e.createLogger=S,e.logger=T,e.default=T,Object.defineProperty(e,"__esModule",{value:!0})});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REJECTED = exports.FULFILLED = exports.PENDING = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = promiseMiddleware;

var _isPromise = require('./isPromise.js');

var _isPromise2 = _interopRequireDefault(_isPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Note to contributors: Please also remember to check and make sure
 * that `index.d.ts` is also up to date with the implementation when
 * you add new features or modify existing ones.
 */

// The default async action types
var PENDING = exports.PENDING = 'PENDING';
var FULFILLED = exports.FULFILLED = 'FULFILLED';
var REJECTED = exports.REJECTED = 'REJECTED';
var defaultTypes = [PENDING, FULFILLED, REJECTED];

/**
 * Function: promiseMiddleware
 * Description: The main promiseMiddleware accepts a configuration
 * object and returns the middleware.
 */
function promiseMiddleware() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var PROMISE_TYPE_SUFFIXES = config.promiseTypeSuffixes || defaultTypes;
  var PROMISE_TYPE_DELIMITER = config.promiseTypeDelimiter || '_';

  return function (ref) {
    var dispatch = ref.dispatch;


    return function (next) {
      return function (action) {

        /**
         * Instantiate variables to hold:
         * (1) the promise
         * (2) the data for optimistic updates
         */
        var promise = void 0;
        var data = void 0;

        /**
         * There are multiple ways to dispatch a promise. The first step is to
         * determine if the promise is defined:
         * (a) explicitly (action.payload.promise is the promise)
         * (b) implicitly (action.payload is the promise)
         * (c) as an async function (returns a promise when called)
         *
         * If the promise is not defined in one of these three ways, we don't do
         * anything and move on to the next middleware in the middleware chain.
         */

        // Step 1a: Is there a payload?
        if (action.payload) {
          var PAYLOAD = action.payload;

          // Step 1.1: Is the promise implicitly defined?
          if ((0, _isPromise2.default)(PAYLOAD)) {
            promise = PAYLOAD;
          }

          // Step 1.2: Is the promise explicitly defined?
          else if ((0, _isPromise2.default)(PAYLOAD.promise)) {
              promise = PAYLOAD.promise;
              data = PAYLOAD.data;
            }

            // Step 1.3: Is the promise returned by an async function?
            else if (typeof PAYLOAD === 'function' || typeof PAYLOAD.promise === 'function') {
                promise = PAYLOAD.promise ? PAYLOAD.promise() : PAYLOAD();
                data = PAYLOAD.promise ? PAYLOAD.data : undefined;

                // Step 1.3.1: Is the return of action.payload a promise?
                if (!(0, _isPromise2.default)(promise)) {

                  // If not, move on to the next middleware.
                  return next(_extends({}, action, {
                    payload: promise
                  }));
                }
              }

              // Step 1.4: If there's no promise, move on to the next middleware.
              else {
                  return next(action);
                }

          // Step 1b: If there's no payload, move on to the next middleware.
        } else {
          return next(action);
        }

        /**
         * Instantiate and define constants for:
         * (1) the action type
         * (2) the action meta
         */
        var TYPE = action.type;
        var META = action.meta;

        /**
         * Instantiate and define constants for the action type suffixes.
         * These are appended to the end of the action type.
         */

        var _PROMISE_TYPE_SUFFIXE = _slicedToArray(PROMISE_TYPE_SUFFIXES, 3),
            _PENDING = _PROMISE_TYPE_SUFFIXE[0],
            _FULFILLED = _PROMISE_TYPE_SUFFIXE[1],
            _REJECTED = _PROMISE_TYPE_SUFFIXE[2];

        /**
         * Function: getAction
         * Description: This function constructs and returns a rejected
         * or fulfilled action object. The action object is based off the Flux
         * Standard Action (FSA).
         *
         * Given an original action with the type FOO:
         *
         * The rejected object model will be:
         * {
         *   error: true,
         *   type: 'FOO_REJECTED',
         *   payload: ...,
         *   meta: ... (optional)
         * }
         *
         * The fulfilled object model will be:
         * {
         *   type: 'FOO_FULFILLED',
         *   payload: ...,
         *   meta: ... (optional)
         * }
         */


        var getAction = function getAction(newPayload, isRejected) {
          return _extends({
            // Concatentate the type string property.
            type: [TYPE, isRejected ? _REJECTED : _FULFILLED].join(PROMISE_TYPE_DELIMITER)

          }, newPayload === null || typeof newPayload === 'undefined' ? {} : {
            payload: newPayload
          }, META !== undefined ? { meta: META } : {}, isRejected ? {
            error: true
          } : {});
        };

        /**
         * Function: handleReject
         * Calls: getAction to construct the rejected action
         * Description: This function dispatches the rejected action and returns
         * the original Error object. Please note the developer is responsible
         * for constructing and throwing an Error object. The middleware does not
         * construct any Errors.
         */
        var handleReject = function handleReject(reason) {
          var rejectedAction = getAction(reason, true);
          dispatch(rejectedAction);

          throw reason;
        };

        /**
         * Function: handleFulfill
         * Calls: getAction to construct the fullfilled action
         * Description: This function dispatches the fulfilled action and
         * returns the success object. The success object should
         * contain the value and the dispatched action.
         */
        var handleFulfill = function handleFulfill() {
          var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var resolvedAction = getAction(value, false);
          dispatch(resolvedAction);

          return { value: value, action: resolvedAction };
        };

        /**
         * First, dispatch the pending action:
         * This object describes the pending state of a promise and will include
         * any data (for optimistic updates) and/or meta from the original action.
         */
        next(_extends({
          // Concatentate the type string.
          type: [TYPE, _PENDING].join(PROMISE_TYPE_DELIMITER)

        }, data !== undefined ? { payload: data } : {}, META !== undefined ? { meta: META } : {}));

        /**
         * Second, dispatch a rejected or fulfilled action and move on to the
         * next middleware.
         */
        return promise.then(handleFulfill, handleReject);
      };
    };
  };
}
},{"./isPromise.js":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isPromise;
function isPromise(value) {
  if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}
},{}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;
},{}],9:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var $$observable = _interopDefault(require('symbol-observable'));

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.'),
  REPLACE: '@@redux/REPLACE' + Math.random().toString(36).substring(7).split('').join('.')
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) return false;

  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.REPLACE });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && 'action "' + String(actionType) + '"' || 'an action';

  return 'Given ' + actionDescription + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var store = createStore.apply(undefined, args);
      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(undefined, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning("You are currently using minified code outside of NODE_ENV === 'production'. " + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = createStore;
exports.combineReducers = combineReducers;
exports.bindActionCreators = bindActionCreators;
exports.applyMiddleware = applyMiddleware;
exports.compose = compose;
exports.__DO_NOT_USE__ActionTypes = ActionTypes;

}).call(this,require('_process'))

},{"_process":3,"symbol-observable":10}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill.js');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ponyfill.js":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _Matches = require('./PreactClasses/Matches');

var _Matches2 = _interopRequireDefault(_Matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LeagueMatchesApp = function () {
	function LeagueMatchesApp(element) {
		_classCallCheck(this, LeagueMatchesApp);

		this.element = element;
		this.bindEvents();
	}

	_createClass(LeagueMatchesApp, [{
		key: 'bindEvents',
		value: function bindEvents() {
			(0, _preact.render)((0, _preact.h)(_Matches2.default, null), this.element);
		}
	}]);

	return LeagueMatchesApp;
}();

exports.default = LeagueMatchesApp;

},{"./PreactClasses/Matches":36,"preact":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _MainLeagueApp = require('./PreactClasses/MainLeagueApp');

var _MainLeagueApp2 = _interopRequireDefault(_MainLeagueApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LeagueReactApp = function () {
	function LeagueReactApp(element) {
		_classCallCheck(this, LeagueReactApp);

		this.element = element;
		this.bindEvents();
	}

	_createClass(LeagueReactApp, [{
		key: 'bindEvents',
		value: function bindEvents() {
			console.log('rendering');
			(0, _preact.render)((0, _preact.h)(_MainLeagueApp2.default, null), this.element);
		}
	}]);

	return LeagueReactApp;
}();

exports.default = LeagueReactApp;

},{"./PreactClasses/MainLeagueApp":27,"preact":2}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _index = require('./MatchUp/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./Champs/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./Players/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppMain = function (_Component) {
	_inherits(AppMain, _Component);

	function AppMain() {
		_classCallCheck(this, AppMain);

		return _possibleConstructorReturn(this, (AppMain.__proto__ || Object.getPrototypeOf(AppMain)).apply(this, arguments));
	}

	_createClass(AppMain, [{
		key: 'getSpecificApp',
		value: function getSpecificApp() {
			switch (this.props.appType) {
				case 'matchUp':
					return (0, _preact.h)(_index2.default, { store: this.props.store });

				case 'champs':
					return (0, _preact.h)(_index4.default, null);

				case 'players':
					return (0, _preact.h)(_index6.default, null);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return this.getSpecificApp();
		}
	}]);

	return AppMain;
}(_preact.Component);

exports.default = AppMain;

},{"./Champs/index.js":23,"./MatchUp/index.js":34,"./Players/index.js":38,"preact":2}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calculator = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		stats: store.stats.stats,
		loading: store.stats.loading
	};
}), _dec(_class = function (_Component) {
	_inherits(Calculator, _Component);

	function Calculator(props) {
		_classCallCheck(this, Calculator);

		return _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));
	}

	_createClass(Calculator, [{
		key: 'render',
		value: function render() {
			return 'calc';
		}
	}]);

	return Calculator;
}(_preact.Component)) || _class);
exports.default = Calculator;

},{"preact":2,"preact-redux":1}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Patches = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        minPlayed: store.stats.minPlayed
    };
}), _dec(_class = function (_Component) {
    _inherits(Patches, _Component);

    function Patches(props) {
        _classCallCheck(this, Patches);

        return _possibleConstructorReturn(this, (Patches.__proto__ || Object.getPrototypeOf(Patches)).call(this, props));
    }

    _createClass(Patches, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.props.dispatch({
                type: 'SET_MINPLAYED',
                minPlayed: e.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                (0, _preact.h)('input', { value: this.props.minPlayed, onChange: this.handleChange.bind(this), type: 'text', placeholder: 'Min Games Played' })
            );
        }
    }]);

    return Patches;
}(_preact.Component)) || _class);
exports.default = Patches;

},{"preact":2,"preact-redux":1}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Patches = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        activePatches: store.stats.activePatches
    };
}), _dec(_class = function (_Component) {
    _inherits(Patches, _Component);

    function Patches(props) {
        _classCallCheck(this, Patches);

        var _this = _possibleConstructorReturn(this, (Patches.__proto__ || Object.getPrototypeOf(Patches)).call(this, props));

        if (window.localStorage.patches) {
            _this.setLocalPatches();
        } else {
            _this.setDefaultPatches();
        }
        return _this;
    }

    _createClass(Patches, [{
        key: 'setDefaultPatches',
        value: function setDefaultPatches() {
            this.props.dispatch({
                type: 'SET_ALL_PATCHES',
                patches: this.props.patches
            });
        }
    }, {
        key: 'setLocalPatches',
        value: function setLocalPatches() {
            this.props.dispatch({
                type: 'SET_ALL_PATCHES',
                patches: window.localStorage.patches
            });
        }
    }, {
        key: 'isPatchActive',
        value: function isPatchActive(patch) {
            if (this.props.activePatches && this.props.activePatches.includes(patch)) {
                return 'checked';
            }
            return '';
        }
    }, {
        key: 'togglePatch',
        value: function togglePatch(patch) {
            var activePatches = Object.assign([], this.props.activePatches);
            if (this.props.activePatches.includes(patch)) {
                activePatches = activePatches.filter(function (activePatch) {
                    return activePatch !== patch;
                });
            } else {
                activePatches.push(patch);
            }
            this.props.dispatch({
                type: 'SET_ALL_PATCHES',
                patches: activePatches
            });
            window.localStorage.patches = activePatches;
        }
    }, {
        key: 'renderPatches',
        value: function renderPatches() {
            var _this2 = this;

            var patches = [];
            Array.from(this.props.patches, function (patch) {
                patches.push((0, _preact.h)(
                    'div',
                    { className: 'topnav__input-holder' },
                    (0, _preact.h)('input', { onChange: function onChange() {
                            _this2.togglePatch(patch);
                        }, checked: _this2.isPatchActive(patch), id: 'patch-' + patch, type: 'checkbox' }),
                    (0, _preact.h)(
                        'label',
                        { 'for': 'patch-' + patch },
                        patch
                    )
                ));
            });
            return patches;
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                this.renderPatches()
            );
        }
    }]);

    return Patches;
}(_preact.Component)) || _class);
exports.default = Patches;

},{"preact":2,"preact-redux":1}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Regions = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        activeRegions: store.stats.activeRegions
    };
}), _dec(_class = function (_Component) {
    _inherits(Regions, _Component);

    function Regions(props) {
        _classCallCheck(this, Regions);

        var _this = _possibleConstructorReturn(this, (Regions.__proto__ || Object.getPrototypeOf(Regions)).call(this, props));

        _this.setDefaultRegions();
        return _this;
    }

    _createClass(Regions, [{
        key: 'setDefaultRegions',
        value: function setDefaultRegions() {
            this.props.dispatch({
                type: 'SET_ALL_REGIONS',
                regions: this.props.regions
            });
        }
    }, {
        key: 'isRegionActive',
        value: function isRegionActive(region) {
            if (this.props.activeRegions && this.props.activeRegions.includes(region)) {
                return 'checked';
            }
            return '';
        }
    }, {
        key: 'toggleRegion',
        value: function toggleRegion(region) {
            var activeRegions = Object.assign([], this.props.activeRegions);
            if (this.props.activeRegions.includes(region)) {
                activeRegions = activeRegions.filter(function (activeRegion) {
                    return activeRegion !== region;
                });
            } else {
                activeRegions.push(region);
            }
            this.props.dispatch({
                type: 'SET_ALL_REGIONS',
                regions: activeRegions
            });
        }
    }, {
        key: 'renderRegions',
        value: function renderRegions() {
            var _this2 = this;

            var regions = [];
            Array.from(this.props.regions, function (region) {
                regions.push((0, _preact.h)(
                    'div',
                    { className: 'topnav__input-holder' },
                    (0, _preact.h)('input', { onChange: function onChange() {
                            _this2.toggleRegion(region);
                        }, checked: _this2.isRegionActive(region), id: 'region-' + region, type: 'checkbox' }),
                    (0, _preact.h)(
                        'label',
                        { 'for': 'region-' + region },
                        region
                    )
                ));
            });
            return regions;
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                this.renderRegions()
            );
        }
    }]);

    return Regions;
}(_preact.Component)) || _class);
exports.default = Regions;

},{"preact":2,"preact-redux":1}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _Stats = require('./methods/Stats');

var _Stats2 = _interopRequireDefault(_Stats);

var _ChampFuncs = require('./methods/ChampFuncs');

var _Calculator = require('./Calculator');

var _Calculator2 = _interopRequireDefault(_Calculator);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatsBlock = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        stats: store.stats.stats,
        activeRegions: store.stats.activeRegions,
        activePatches: store.stats.activePatches,
        activeVariables: store.stats.activeVariables,
        minPlayed: store.stats.minPlayed
    };
}), _dec(_class = function (_Component) {
    _inherits(StatsBlock, _Component);

    function StatsBlock(props) {
        _classCallCheck(this, StatsBlock);

        var _this = _possibleConstructorReturn(this, (StatsBlock.__proto__ || Object.getPrototypeOf(StatsBlock)).call(this, props));

        _this.setState({
            activeRegions: _this.props.activeRegions,
            activePatches: _this.props.activePatches,
            active: 'table'
        });
        _this.statsClass = new _Stats2.default(_this.props.stats);
        _this.calculateStats();
        return _this;
    }

    _createClass(StatsBlock, [{
        key: 'calculateStats',
        value: function calculateStats() {
            this.statsClass.setStates(this.state.activeRegions, this.state.activePatches);
            this.statsClass.calculate();
        }
    }, {
        key: 'getPercentage',
        value: function getPercentage(a, b) {
            var percentage = a / b * 100;
            return Math.floor(percentage) + '%';
        }
    }, {
        key: 'setActiveColumn',
        value: function setActiveColumn(variable) {
            this.statsClass.setOrder(variable);
            this.updateChampQuery();
        }
    }, {
        key: 'checkFirstChamps',
        value: function checkFirstChamps() {
            console.log(this.state.champs);
            if (!this.state.champs && this.statsClass) {
                this.updateChampQuery();
            }
        }
    }, {
        key: 'updateChampQuery',
        value: function updateChampQuery() {
            this.setState({
                champs: this.statsClass.getChamps()
            });
        }
    }, {
        key: 'isColumnActive',
        value: function isColumnActive(variable) {
            if (this.statsClass && variable.statName === this.statsClass.getOrderVariable()) {
                return true;
            }
            return false;
        }
    }, {
        key: 'renderChampColumns',
        value: function renderChampColumns() {
            var _this2 = this;

            var columns = [];
            Array.from(this.props.activeVariables, function (variable) {
                columns.push((0, _preact.h)(
                    'th',
                    { className: _this2.isColumnActive(variable) ? 'is-active' : '', onClick: function onClick() {
                            return _this2.setActiveColumn(variable);
                        } },
                    variable.friendlyName
                ));
            });
            return columns;
        }
    }, {
        key: 'renderChampCells',
        value: function renderChampCells(champ) {
            var _this3 = this;

            console.log('render new');
            var cells = [];

            Array.from(this.props.activeVariables, function (variable) {
                var cell = '';
                if (variable.type === 'percent') {
                    cell = (0, _preact.h)(
                        'td',
                        null,
                        _this3.getPercentage(champ[variable.statName], champ.played)
                    );
                }
                if (variable.type === 'value') {
                    cell = (0, _preact.h)(
                        'td',
                        null,
                        champ[variable.statName]
                    );
                }
                cells.push(cell);
            });
            return cells;
        }
    }, {
        key: 'renderfirstChamps',
        value: function renderfirstChamps() {
            var _this4 = this;

            this.checkFirstChamps();
            if (this.state.champs) {
                var firstArray = [];
                Array.from(this.state.champs, function (champ) {
                    if (_this4.props.minPlayed && _this4.props.minPlayed > champ.played) return;
                    firstArray.push((0, _preact.h)(
                        'tr',
                        null,
                        (0, _preact.h)(
                            'td',
                            null,
                            (0, _ChampFuncs.idToChamp)(champ.id)
                        ),
                        _this4.renderChampCells(champ)
                    ));
                });
                return firstArray;
            }
        }
    }, {
        key: 'renderSwitcher',
        value: function renderSwitcher() {
            var _this5 = this;

            return (0, _preact.h)(
                'div',
                null,
                (0, _preact.h)(
                    'a',
                    { onClick: function onClick() {
                            _this5.setState({ active: 'table' });
                        } },
                    'Table'
                ),
                (0, _preact.h)(
                    'a',
                    { onClick: function onClick() {
                            _this5.setState({ active: 'calculator' });
                        } },
                    'Calculator'
                )
            );
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            switch (this.state.active) {
                case 'table':
                    console.log('sending new table');
                    return (0, _preact.h)(_Table2.default, { statsClass: this.statsClass });
                case 'calculator':
                    return (0, _preact.h)(_Calculator2.default, null);
                default:
                    return '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                this.renderSwitcher(),
                this.renderContent()
            );
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var changed = false;
            if (this.state.activePatches !== newProps.activePatches) {
                this.setState({
                    activePatches: newProps.activePatches
                });
                changed = true;
            }

            if (this.state.activeRegions !== newProps.activeRegions) {
                this.setState({
                    activeRegions: newProps.activeRegions
                });
                changed = true;
            }
            if (changed) {
                this.calculateStats();
                this.updateChampQuery();
            }
        }
    }]);

    return StatsBlock;
}(_preact.Component)) || _class);
exports.default = StatsBlock;

},{"./Calculator":15,"./Table":20,"./methods/ChampFuncs":24,"./methods/Stats":26,"preact":2,"preact-redux":1}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _ChampFuncs = require('./methods/ChampFuncs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        stats: store.stats.stats,
        activeRegions: store.stats.activeRegions,
        activePatches: store.stats.activePatches,
        activeVariables: store.stats.activeVariables,
        minPlayed: store.stats.minPlayed
    };
}), _dec(_class = function (_Component) {
    _inherits(Table, _Component);

    function Table(props) {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));
    }

    _createClass(Table, [{
        key: 'getPercentage',
        value: function getPercentage(a, b) {
            var percentage = a / b * 100;
            return Math.floor(percentage) + '%';
        }
    }, {
        key: 'setActiveColumn',
        value: function setActiveColumn(variable) {
            this.props.statsClass.setOrder(variable);
            this.updateChampQuery();
        }
    }, {
        key: 'checkFirstChamps',
        value: function checkFirstChamps() {
            console.log(this.state.champs);
            if (!this.state.champs && this.props.statsClass) {
                this.updateChampQuery();
            }
        }
    }, {
        key: 'updateChampQuery',
        value: function updateChampQuery() {
            this.setState({
                champs: this.props.statsClass.getChamps()
            });
        }
    }, {
        key: 'isColumnActive',
        value: function isColumnActive(variable) {
            if (this.props.statsClass && variable.statName === this.props.statsClass.getOrderVariable()) {
                return true;
            }
            return false;
        }
    }, {
        key: 'renderChampColumns',
        value: function renderChampColumns() {
            var _this2 = this;

            var columns = [];
            Array.from(this.props.activeVariables, function (variable) {
                columns.push((0, _preact.h)(
                    'th',
                    { className: _this2.isColumnActive(variable) ? 'is-active' : '', onClick: function onClick() {
                            return _this2.setActiveColumn(variable);
                        } },
                    variable.friendlyName
                ));
            });
            return columns;
        }
    }, {
        key: 'renderChampCells',
        value: function renderChampCells(champ) {
            var _this3 = this;

            console.log('render new');
            var cells = [];

            Array.from(this.props.activeVariables, function (variable) {
                var cell = '';
                if (variable.type === 'percent') {
                    cell = (0, _preact.h)(
                        'td',
                        null,
                        _this3.getPercentage(champ[variable.statName], champ.played)
                    );
                }
                if (variable.type === 'value') {
                    cell = (0, _preact.h)(
                        'td',
                        null,
                        champ[variable.statName]
                    );
                }
                cells.push(cell);
            });
            return cells;
        }
    }, {
        key: 'renderfirstChamps',
        value: function renderfirstChamps() {
            var _this4 = this;

            this.checkFirstChamps();
            if (this.state.champs) {
                var firstArray = [];
                Array.from(this.state.champs, function (champ) {
                    if (_this4.props.minPlayed && _this4.props.minPlayed > champ.played) return;
                    firstArray.push((0, _preact.h)(
                        'tr',
                        null,
                        (0, _preact.h)(
                            'td',
                            null,
                            (0, _ChampFuncs.idToChamp)(champ.id)
                        ),
                        _this4.renderChampCells(champ)
                    ));
                });
                return firstArray;
            }
        }
    }, {
        key: 'checkStatsUpdated',
        value: function checkStatsUpdated() {
            if (!(this.props.statsClass.getChamps() === this.state.champs)) {
                this.updateChampQuery();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            this.checkStatsUpdated();
            var champColumn = { type: 'alphabetically', defaultOrder: 'asc', statName: 'alphabetically' };
            return (0, _preact.h)(
                'div',
                { className: 'table__holder' },
                (0, _preact.h)(
                    'table',
                    { className: 'table' },
                    (0, _preact.h)(
                        'tbody',
                        null,
                        (0, _preact.h)(
                            'tr',
                            null,
                            (0, _preact.h)(
                                'th',
                                { className: this.isColumnActive(champColumn) ? 'is-active' : '', onClick: function onClick() {
                                        return _this5.setActiveColumn(champColumn);
                                    } },
                                'Champ'
                            ),
                            this.renderChampColumns()
                        ),
                        this.renderfirstChamps()
                    )
                )
            );
        }
    }]);

    return Table;
}(_preact.Component)) || _class);
exports.default = Table;

},{"./methods/ChampFuncs":24,"preact":2,"preact-redux":1}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _Filters = require('./methods/Filters');

var _Filters2 = _interopRequireDefault(_Filters);

var _Patches = require('./Patches');

var _Patches2 = _interopRequireDefault(_Patches);

var _Regions = require('./Regions');

var _Regions2 = _interopRequireDefault(_Regions);

var _Variables = require('./Variables');

var _Variables2 = _interopRequireDefault(_Variables);

var _MinPlayed = require('./MinPlayed');

var _MinPlayed2 = _interopRequireDefault(_MinPlayed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopNav = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        stats: store.stats.stats,
        loading: store.stats.loading
    };
}), _dec(_class = function (_Component) {
    _inherits(TopNav, _Component);

    function TopNav(props) {
        _classCallCheck(this, TopNav);

        var _this = _possibleConstructorReturn(this, (TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call(this, props));

        _this.filters = new _Filters2.default(_this.props.stats);

        _this.regions = _this.filters.getRegions();
        _this.patches = _this.filters.getPatches();
        _this.variables = _this.filters.getVariables();
        return _this;
    }

    _createClass(TopNav, [{
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                { className: 'topnav__holder' },
                (0, _preact.h)(
                    'div',
                    { className: 'topnav' },
                    (0, _preact.h)(
                        'div',
                        { className: 'topnav__dropdown' },
                        (0, _preact.h)(
                            'div',
                            { className: 'topnav__title' },
                            'Patches'
                        ),
                        (0, _preact.h)(_Patches2.default, { patches: this.patches })
                    ),
                    (0, _preact.h)(
                        'div',
                        { className: 'topnav__dropdown' },
                        (0, _preact.h)(
                            'div',
                            { className: 'topnav__title' },
                            'Regions'
                        ),
                        (0, _preact.h)(_Regions2.default, { regions: this.regions })
                    ),
                    (0, _preact.h)(
                        'div',
                        { className: 'topnav__dropdown' },
                        (0, _preact.h)(
                            'div',
                            { className: 'topnav__title' },
                            'Variables'
                        ),
                        (0, _preact.h)(_Variables2.default, { variables: this.variables })
                    ),
                    (0, _preact.h)(
                        'div',
                        { className: 'topnav__dropdown' },
                        (0, _preact.h)(
                            'div',
                            { className: 'topnav__title' },
                            'Min Played'
                        ),
                        (0, _preact.h)(_MinPlayed2.default, null)
                    )
                )
            );
        }
    }]);

    return TopNav;
}(_preact.Component)) || _class);
exports.default = TopNav;

},{"./MinPlayed":16,"./Patches":17,"./Regions":18,"./Variables":22,"./methods/Filters":25,"preact":2,"preact-redux":1}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variables = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        activeVariables: store.stats.activeVariables
    };
}), _dec(_class = function (_Component) {
    _inherits(Variables, _Component);

    function Variables(props) {
        _classCallCheck(this, Variables);

        var _this = _possibleConstructorReturn(this, (Variables.__proto__ || Object.getPrototypeOf(Variables)).call(this, props));

        if (window.localStorage.variables) {
            _this.setLocalVariables();
        } else {
            _this.setDefaultVariables();
        }
        return _this;
    }

    _createClass(Variables, [{
        key: 'setDefaultVariables',
        value: function setDefaultVariables() {
            this.props.dispatch({
                type: 'SET_ALL_VARIABLES',
                variables: this.props.variables
            });
        }
    }, {
        key: 'setLocalVariables',
        value: function setLocalVariables() {
            console.log('seting local');
            this.props.dispatch({
                type: 'SET_ALL_VARIABLES',
                variables: JSON.parse(window.localStorage.variables)
            });
        }
    }, {
        key: 'isVariableActive',
        value: function isVariableActive(variable) {
            if (this.props.activeVariables) {
                console.log('checker', this.props.activeVariables.some(function (activeVariable) {
                    return activeVariable.statName === variable.statName;
                }));
            }
            if (this.props.activeVariables && this.props.activeVariables.some(function (activeVariable) {
                return activeVariable.statName === variable.statName;
            })) {
                return 'checked';
            }
            return '';
        }
    }, {
        key: 'toggleVariable',
        value: function toggleVariable(variable) {
            var activeVariables = Object.assign([], this.props.activeVariables);
            if (this.props.activeVariables.some(function (activeVariable) {
                return activeVariable.statName === variable.statName;
            })) {
                activeVariables = activeVariables.filter(function (activeVariable) {
                    return activeVariable.statName !== variable.statName;
                });
            } else {
                activeVariables.push(variable);
            }
            this.props.dispatch({
                type: 'SET_ALL_VARIABLES',
                variables: activeVariables
            });
            console.log('active vars are ', activeVariables);
            window.localStorage.variables = JSON.stringify(activeVariables);
        }
    }, {
        key: 'renderVariables',
        value: function renderVariables() {
            var _this2 = this;

            var variables = [];
            Array.from(this.props.variables, function (variable) {
                variables.push((0, _preact.h)(
                    'div',
                    { className: 'topnav__input-holder' },
                    (0, _preact.h)('input', { onChange: function onChange() {
                            _this2.toggleVariable(variable);
                        }, checked: _this2.isVariableActive(variable), id: 'variable-' + variable.friendlyName, type: 'checkbox' }),
                    (0, _preact.h)(
                        'label',
                        { 'for': 'variable-' + variable.friendlyName },
                        variable.friendlyName
                    )
                ));
            });
            return variables;
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                this.renderVariables()
            );
        }
    }]);

    return Variables;
}(_preact.Component)) || _class);
exports.default = Variables;

},{"preact":2,"preact-redux":1}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _StatsBlock = require('./StatsBlock');

var _StatsBlock2 = _interopRequireDefault(_StatsBlock);

var _TopNav = require('./TopNav');

var _TopNav2 = _interopRequireDefault(_TopNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Champs = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		stats: store.stats.stats,
		loading: store.stats.loading
	};
}), _dec(_class = function (_Component) {
	_inherits(Champs, _Component);

	function Champs(props) {
		_classCallCheck(this, Champs);

		var _this = _possibleConstructorReturn(this, (Champs.__proto__ || Object.getPrototypeOf(Champs)).call(this, props));

		_this.regions = ['NALCS', 'EULCS', 'CBLOL', 'LCK', 'LMS', 'TCL', 'OPL'];
		if (!_this.props.stats) {
			_this.fetchStats();
		}
		return _this;
	}

	_createClass(Champs, [{
		key: 'fetchStats',
		value: function fetchStats() {
			var _this2 = this;

			Array.from(this.regions, function (region) {
				_this2.props.dispatch({
					type: 'FETCH_STATS',
					payload: fetch('/api/' + region + '/full.json').then(function (response) {
						return response.json();
					}),
					meta: region
				});
			});
		}
	}, {
		key: 'handleResetClick',
		value: function handleResetClick() {
			var _this3 = this;

			window.localStorage.removeItem('variables');
			window.localStorage.removeItem('patches');
			window.localStorage.removeItem('regions');
			this.props.dispatch({
				type: 'RESET_CHAMPS'
			});
			this.setState({
				reset: true
			});
			setTimeout(function () {
				_this3.setState({
					reset: false
				});
			}, 1);
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.reset) {
				return (0, _preact.h)(
					'div',
					null,
					'Resetting'
				);
			}
			if (this.props.loading || !this.props.stats) {
				return (0, _preact.h)(
					'div',
					null,
					'loading'
				);
			} else {
				return (0, _preact.h)(
					'div',
					null,
					(0, _preact.h)(
						'div',
						{ className: 'mb20' },
						(0, _preact.h)(
							'a',
							{ onClick: this.handleResetClick.bind(this) },
							'Reset'
						)
					),
					(0, _preact.h)(_TopNav2.default, null),
					(0, _preact.h)(_StatsBlock2.default, null)
				);
			}
		}
	}]);

	return Champs;
}(_preact.Component)) || _class);
exports.default = Champs;

},{"./StatsBlock":19,"./TopNav":21,"preact":2,"preact-redux":1}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.idToChamp = idToChamp;
function idToChamp(id) {
    var champdict = { '145': 'KaiSa', '555': 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac' };
    return champdict[id];
}

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function () {
    function Filters(stats) {
        _classCallCheck(this, Filters);

        this.stats = stats;
        this.regions = Object.keys(stats);
    }

    _createClass(Filters, [{
        key: 'getRegions',
        value: function getRegions() {
            return this.regions;
        }
    }, {
        key: 'getVariables',
        value: function getVariables() {
            return [{ statName: 'fbTeam', friendlyName: 'First Blood Team', type: 'percent', defaultOrder: 'desc' }, { statName: 'fbKiller', friendlyName: 'First Blood Killer', type: 'percent', defaultOrder: 'desc' }, { statName: 'fbAssist', friendlyName: 'First Blood Assist', type: 'percent', defaultOrder: 'desc' }, { statName: 'firstDeath', friendlyName: 'First Death', type: 'percent', defaultOrder: 'desc' }, { statName: 'ftTeam', friendlyName: 'First Tower Team', type: 'percent', defaultOrder: 'desc' }, { statName: 'ftKiller', friendlyName: 'First Tower Killer', type: 'percent', defaultOrder: 'desc' }, { statName: 'fdTeam', friendlyName: 'First Dragon Team', type: 'percent', defaultOrder: 'desc' }, { statName: 'played', friendlyName: 'Games Played', type: 'value', defaultOrder: 'desc' }, { statName: 'win', friendlyName: 'Win', type: 'percent', defaultOrder: 'desc' }];
        }
    }, {
        key: 'getPatches',
        value: function getPatches() {
            var _this = this;

            if (this.patches) {
                return this.patches;
            }
            this.patches = [];
            Array.from(this.regions, function (region) {
                var regionMatches = _this.stats[region];
                Array.from(regionMatches, function (match) {
                    if (!_this.patches.includes(match.patch)) {
                        _this.patches.push(match.patch);
                    }
                });
            });

            return this.patches;
        }
    }]);

    return Filters;
}();

exports.default = Filters;

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ChampFuncs = require('./ChampFuncs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stats = function () {
    function Stats(stats) {
        _classCallCheck(this, Stats);

        this.stats = stats;
        this.orderBy = 'alphabetically';
        this.orderByVariable = 'alphabetically';
        this.orderDirection = 'asc';
    }

    _createClass(Stats, [{
        key: 'setStates',
        value: function setStates(regions, patches) {
            this.regions = regions;
            this.patches = patches;
        }
    }, {
        key: 'setOrder',
        value: function setOrder(variable) {
            this.orderDirectio;
            if (this.orderBy === variable.type && this.orderByVariable === variable.statName) {
                this.orderDirection = this.orderDirection === 'desc' ? 'asc' : 'desc';
            } else {
                this.orderBy = variable.type;
                this.orderByVariable = variable.statName;
                this.orderDirection = variable.defaultOrder;
            }
            this.orderChamps();
        }
    }, {
        key: 'getOrderVariable',
        value: function getOrderVariable() {
            return this.orderByVariable;
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.calculateChamps();
        }
    }, {
        key: 'calculateChamps',
        value: function calculateChamps() {
            var _this = this;

            this.firstChampsObject = {};
            Array.from(this.regions, function (region) {
                var regionMatches = _this.stats[region];
                Array.from(regionMatches, function (match) {
                    if (_this.patches.includes(match.patch)) {
                        _this.addStats(match);
                    }
                });
            });
            this.orderChamps();
        }
    }, {
        key: 'getPercentage',
        value: function getPercentage(a, b) {
            var percentage = a / b * 100;
            return Math.floor(percentage) + '%';
        }
    }, {
        key: 'orderChamps',
        value: function orderChamps() {
            this.fbArray = [];
            for (var champId in this.firstChampsObject) {
                var champ = this.firstChampsObject[champId];
                champ['id'] = champId;
                this.fbArray.push(champ);
            }
            this.fbArray.sort(this.sortFunction.bind(this));
        }
    }, {
        key: 'sortFunction',
        value: function sortFunction(a, b) {
            var valA = '';
            var valB = '';

            if (this.orderBy === 'percent') {
                valA = a[this.orderByVariable] / a.played;
                valB = b[this.orderByVariable] / b.played;
            } else if (this.orderBy === 'alphabetically') {
                valA = (0, _ChampFuncs.idToChamp)(a.id);
                valB = (0, _ChampFuncs.idToChamp)(b.id);
            } else if (this.orderBy === 'value') {
                valA = a[this.orderByVariable];
                valB = b[this.orderByVariable];
            }

            if (valA < valB) {
                return this.orderDirection === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return this.orderDirection === 'asc' ? 1 : -1;
            }
            return 0;
        }
    }, {
        key: 'addStats',
        value: function addStats(match) {
            for (var playerIndex = 0; playerIndex < 10; playerIndex++) {
                var player = match['players'][playerIndex];
                var champId = player.champId;
                if (this.firstChampsObject[champId] === undefined) {
                    this.firstChampsObject[champId] = this.getDefaultStat();
                }
                this.firstChampsObject[champId]['played']++;
                if (this.playedGotVariable(match.firstBlood, playerIndex)) {
                    this.firstChampsObject[champId]['fbTeam']++;
                }
                if (player.firstBloodKill) {
                    this.firstChampsObject[champId]['fbKiller']++;
                }
                if (player.firstBloodAssist) {
                    this.firstChampsObject[champId]['fbAssist']++;
                }
                if (player.firstDeath) {
                    this.firstChampsObject[champId]['firstDeath']++;
                }
                if (this.playedGotVariable(match.firstTower, playerIndex)) {
                    this.firstChampsObject[champId]['ftTeam']++;
                }
                if (player.firstTowerKill || player.firstTowerAssist) {
                    this.firstChampsObject[champId]['ftKiller']++;
                }
                if (this.playedGotVariable(match.firstDragon, playerIndex)) {
                    this.firstChampsObject[champId]['fdTeam']++;
                }
                if (this.playedGotVariable(match.win, playerIndex)) {
                    this.firstChampsObject[champId]['win']++;
                }
            }
        }
    }, {
        key: 'playedGotVariable',
        value: function playedGotVariable(firstTeam, playerIndex) {
            return firstTeam === 0 && playerIndex < 5 || firstTeam === 1 && playerIndex > 4;
        }
    }, {
        key: 'getDefaultStat',
        value: function getDefaultStat() {
            return {
                played: 0,
                fbTeam: 0,
                ftTeam: 0,
                fdTeam: 0,
                fbKiller: 0,
                fbAssist: 0,
                firstDeath: 0,
                ftKiller: 0,
                win: 0
            };
        }
    }, {
        key: 'getChamps',
        value: function getChamps() {
            return this.fbArray;
        }
    }]);

    return Stats;
}();

exports.default = Stats;

},{"./ChampFuncs":24}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _redux = require('redux');

var _preactRedux = require('preact-redux');

var _store = require('./reducers/store');

var _store2 = _interopRequireDefault(_store);

var _AppMain = require('./AppMain');

var _AppMain2 = _interopRequireDefault(_AppMain);

var _NavBar = require('./NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _index = require('./Matches/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//https://wireframe.cc/xKOvCE
var MainLeagueApp = function (_Component) {
	_inherits(MainLeagueApp, _Component);

	function MainLeagueApp() {
		_classCallCheck(this, MainLeagueApp);

		var _this = _possibleConstructorReturn(this, (MainLeagueApp.__proto__ || Object.getPrototypeOf(MainLeagueApp)).call(this));

		_this.store = _store2.default;
		if (window.localStorage.appType) {
			_this.state = {
				appType: window.localStorage.appType
			};
		} else {
			_this.state = {
				appType: 'matchUp'
			};
		}
		return _this;
	}

	_createClass(MainLeagueApp, [{
		key: 'updateAppType',
		value: function updateAppType(type) {
			this.setState({ appType: type });
			window.localStorage.appType = type;
		}
	}, {
		key: 'render',
		value: function render(props, state) {
			return (0, _preact.h)(
				_preactRedux.Provider,
				{ store: this.store },
				(0, _preact.h)(
					'div',
					null,
					(0, _preact.h)(
						'header',
						null,
						(0, _preact.h)(
							'nav',
							{ 'class': 'nav' },
							(0, _preact.h)(
								'div',
								{ 'class': 'nav__logo' },
								(0, _preact.h)(
									'a',
									{ href: 'https://github.com/davidweatherall', target: '_blank' },
									'David Weatherall'
								)
							),
							(0, _preact.h)(
								'div',
								{ 'class': 'nav__links  js-nav-links' },
								(0, _preact.h)(_NavBar2.default, { updateAppType: this.updateAppType.bind(this), appType: this.state.appType })
							)
						)
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'page' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches' },
							(0, _preact.h)(_index2.default, null)
						),
						(0, _preact.h)(
							'main',
							{ 'class': 'main' },
							(0, _preact.h)(_AppMain2.default, { appType: this.state.appType })
						)
					)
				)
			);
		}
	}]);

	return MainLeagueApp;
}(_preact.Component);

exports.default = MainLeagueApp;

},{"./AppMain":14,"./Matches/index.js":36,"./NavBar":37,"./reducers/store":44,"preact":2,"preact-redux":1,"redux":9}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _Players = require('./Players');

var _Players2 = _interopRequireDefault(_Players);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchCard = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeRegion: store.config.activeRegion,
		regionData: store.regions.regionData,
		team1: store.config.team1,
		team2: store.config.team2
	};
}), _dec(_class = function (_Component) {
	_inherits(MatchCard, _Component);

	function MatchCard() {
		_classCallCheck(this, MatchCard);

		var _this = _possibleConstructorReturn(this, (MatchCard.__proto__ || Object.getPrototypeOf(MatchCard)).call(this));

		_this.teamColours = ['blue', 'red'];
		return _this;
	}

	_createClass(MatchCard, [{
		key: 'getIndex',
		value: function getIndex() {
			var getEnemy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			if (this.props.team) {
				this.index = 0;
				this.enemyIndex = 1;
				if (this.props.game.teamNames[1] == this.props.team) {
					this.index = 1;
					this.enemyIndex = 0;
				}
			} else {
				this.index = false;
			}

			if (getEnemy) {
				return this.enemyIndex;
			}

			return this.index;
		}
	}, {
		key: 'getTime',
		value: function getTime(unix) {
			var date = new Date(unix);
			return date.toLocaleString([], { day: 'numeric', month: 'long', year: 'numeric' });
		}
	}, {
		key: 'togglePlayers',
		value: function togglePlayers() {
			this.setState({ showPlayers: !this.state.showPlayers });
		}
	}, {
		key: 'getBackground',
		value: function getBackground() {
			if (this.props.team) {
				return 'bg-color--' + this.teamColours[this.getIndex()];
			}
			return 'bg-color--default';
		}
	}, {
		key: 'getResult',
		value: function getResult() {
			if (this.getIndex() !== false) {
				if (this.props.game.win == this.getIndex()) {
					return (0, _preact.h)(
						'div',
						{ className: 'matches__result  matches__result--win' },
						'WIN'
					);
				} else {
					return (0, _preact.h)(
						'div',
						{ className: 'matches__result  matches__result--lose' },
						'LOSE'
					);
				}
			}
		}
	}, {
		key: 'renderAchievements',
		value: function renderAchievements(teamNum) {
			var myTeam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var isMyTeam = false;
			if (myTeam) {
				if (this.props.game.teamNames[teamNum] == myTeam) {
					isMyTeam = true;
				}
			}
			var checks = {
				'firstBaron': 'First Baron',
				'firstBlood': 'First Blood',
				'firstDragon': 'First Dragon',
				'firstInhibitor': 'First Inhibitor',
				'firstTower': 'First Tower'
			};
			var achievements = [];
			for (var check in checks) {
				if (this.props.game[check] == teamNum) {
					var classes = '';
					if (myTeam) {
						if (isMyTeam) {
							classes = 't-colour--green';
						} else {
							classes = 't-colour--red';
						}
					} else {
						classes = 't-colour--' + this.teamColours[teamNum];
					}
					achievements.push((0, _preact.h)(
						'div',
						{ className: classes },
						checks[check]
					));
				}
			};

			return achievements;
		}
	}, {
		key: 'renderMatchup',
		value: function renderMatchup() {
			var team1 = this.props.game.teamNames[0];
			var team2 = this.props.game.teamNames[1];

			if (this.props.team) {
				if (this.props.game.teamNames[0] != this.props.team) {
					team2 = this.props.game.teamNames[0];
					team1 = this.props.game.teamNames[1];
				}
			}

			return (0, _preact.h)(
				'div',
				{ className: 'matches__column' },
				(0, _preact.h)(
					'div',
					{ className: 'flex  flex-justify--between' },
					(0, _preact.h)('img', { className: 'card__logo', src: '/assets/img/logos/' + this.props.activeRegion + '/' + team1 + '.png' }),
					(0, _preact.h)(
						'span',
						{ className: 'card__vs' },
						'vs'
					),
					(0, _preact.h)('img', { className: 'card__logo', src: '/assets/img/logos/' + this.props.activeRegion + '/' + team2 + '.png' })
				),
				this.getResult()
			);
		}
	}, {
		key: 'renderShowMore',
		value: function renderShowMore() {
			return (0, _preact.h)(
				'div',
				{ className: 'card__showmore', onClick: this.togglePlayers.bind(this) },
				'Show More'
			);
		}
	}, {
		key: 'renderPlayers',
		value: function renderPlayers() {
			if (this.state.showPlayers) {
				return (0, _preact.h)(_Players2.default, { game: this.props.game, index: this.getIndex(), activeRegion: this.props.activeRegion });
			}
			return '';
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ showPlayers: false });
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				{ className: 'card  ' + this.getBackground(), 'data-count': this.props.count },
				(0, _preact.h)(
					'div',
					{ className: 'card__date' },
					this.getTime(this.props.game.time)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__columns  flex-align--center' },
					(0, _preact.h)(
						'div',
						{ className: 'matches__column  t-size--small' },
						this.renderAchievements(this.getIndex(), this.props.team)
					),
					this.renderMatchup(),
					(0, _preact.h)(
						'div',
						{ className: 'matches__column  t-align--right  t-size--small' },
						this.renderAchievements(this.getIndex(true), this.props.team)
					)
				),
				this.renderPlayers(),
				this.renderShowMore()
			);
		}
	}]);

	return MatchCard;
}(_preact.Component)) || _class);
exports.default = MatchCard;

},{"./Players":30,"preact":2,"preact-redux":1}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _MatchCard = require('./MatchCard');

var _MatchCard2 = _interopRequireDefault(_MatchCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchElements = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeRegion: store.config.activeRegion,
		regionData: store.regions.regionData,
		team1: store.config.team1,
		team2: store.config.team2
	};
}), _dec(_class = function (_Component) {
	_inherits(MatchElements, _Component);

	function MatchElements() {
		_classCallCheck(this, MatchElements);

		return _possibleConstructorReturn(this, (MatchElements.__proto__ || Object.getPrototypeOf(MatchElements)).apply(this, arguments));
	}

	_createClass(MatchElements, [{
		key: 'renderCards',
		value: function renderCards(team) {
			var _this2 = this;

			var team2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var cards = [];

			if (team2) {
				Array.from(this.props.games, function (game) {
					if (game.teamNames.includes(team) && game.teamNames.includes(team2)) {
						cards.push((0, _preact.h)(_MatchCard2.default, { game: game, team: false, store: _this2.props.store }));
					}
				});
			} else {
				Array.from(this.props.games, function (game) {
					if (game.teamNames.includes(team)) {
						cards.push((0, _preact.h)(_MatchCard2.default, { game: game, team: team, store: _this2.props.store }));
					}
				});
			}
			return cards;
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				{ className: 'matches__columns' },
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						this.props.team1,
						'\'s Recent Matches'
					),
					this.renderCards(this.props.team1)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						'Head to Head'
					),
					this.renderCards(this.props.team1, this.props.team2)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						this.props.team2,
						'\'s Recent Matches'
					),
					this.renderCards(this.props.team2)
				)
			);
		}
	}]);

	return MatchElements;
}(_preact.Component)) || _class);
exports.default = MatchElements;

},{"./MatchCard":28,"preact":2,"preact-redux":1}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _reactHint = require('react-hint');

var _reactHint2 = _interopRequireDefault(_reactHint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactHint = (0, _reactHint2.default)({ createElement: _preact.h, Component: _preact.Component });

var Players = function (_Component) {
	_inherits(Players, _Component);

	function Players() {
		_classCallCheck(this, Players);

		var _this = _possibleConstructorReturn(this, (Players.__proto__ || Object.getPrototypeOf(Players)).call(this));

		_this.setState({ playerData: false });
		return _this;
	}

	_createClass(Players, [{
		key: 'removeTeam',
		value: function removeTeam(playerName) {
			Array.from(this.props.game.teamNames, function (teamName) {
				playerName = playerName.replace(teamName, '');
			});
			return playerName;
		}
	}, {
		key: 'getChamp',
		value: function getChamp(champId) {
			var champIds = { '145': 'Kaisa', '555': 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac' };
			return champIds[champId];
		}
	}, {
		key: 'getPlayerData',
		value: function getPlayerData() {
			var _this2 = this;

			fetch('/api/' + this.props.activeRegion + '/games/' + this.props.game.gameId + '/players.json').then(function (response) {
				return response.json();
			}).then(function (data) {
				_this2.setState({ playerData: data });
			});
		}
	}, {
		key: 'getFB',
		value: function getFB(playerData) {
			var firstBlood = '';
			if (playerData.firstBloodKill) {
				firstBlood = (0, _preact.h)('img', { 'data-rh': 'First Kill', src: '/assets/svg/sword.svg' });
			} else if (playerData.firstBloodAssist) {
				firstBlood = (0, _preact.h)('img', { 'data-rh': 'First Kill Assist', src: '/assets/svg/help.svg' });
			} else if (playerData.firstDeath) {
				firstBlood = (0, _preact.h)('img', { 'data-rh': 'First Death', src: '/assets/svg/skull.svg' });
			}
			return firstBlood;
		}
	}, {
		key: 'renderPlayer',
		value: function renderPlayer(playerData) {
			var _this3 = this;

			var playerName = playerData.name;
			playerName = this.removeTeam(playerName);
			var firstBlood = this.getFB(playerData);
			var KDA = playerData.kills + '/' + playerData.deaths + '/' + playerData.kills;
			var champNane = this.getChamp(playerData.champId);
			var champImage = 'http://ddragon.leagueoflegends.com/cdn/8.14.1/img/champion/' + champNane + '.png';
			return (0, _preact.h)(
				'tr',
				{ 'class': 'card__player' },
				(0, _preact.h)(
					'td',
					null,
					playerName
				),
				(0, _preact.h)(
					'td',
					{ 'class': 'card__champ' },
					(0, _preact.h)('img', { src: champImage })
				),
				(0, _preact.h)(
					'td',
					null,
					KDA
				),
				(0, _preact.h)(
					'td',
					{ 'class': 'card__svg' },
					(0, _preact.h)(ReactHint, { autoPosition: true, events: true, delay: 100 }),
					(0, _preact.h)(ReactHint, { persist: true,
						attribute: 'data-custom',
						className: 'custom-hint',
						events: { hover: true },
						ref: function ref(_ref) {
							return _this3.instance = _ref;
						} }),
					firstBlood
				)
			);
		}
	}, {
		key: 'renderPlayers',
		value: function renderPlayers() {
			if (this.state.playerData) {
				var team1Players = [];
				var team2Players = [];
				var playerCount = 0;
				while (playerCount < 5) {
					var playerData = this.state.playerData[playerCount];
					team1Players.push(this.renderPlayer(playerData));
					playerCount++;
				}
				while (playerCount < 10) {
					var _playerData = this.state.playerData[playerCount];
					team2Players.push(this.renderPlayer(_playerData));
					playerCount++;
				}
				return (0, _preact.h)(
					'div',
					{ 'class': 'card__players' },
					(0, _preact.h)(
						'table',
						{ 'class': 'card__team' },
						this.props.index == 0 ? team1Players : team2Players
					),
					(0, _preact.h)(
						'table',
						{ 'class': 'card__team' },
						this.props.index == 0 ? team2Players : team1Players
					)
				);
			} else {
				return 'getting players...';
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				{ 'class': 'matches__players' },
				this.renderPlayers()
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getPlayerData();
		}
	}]);

	return Players;
}(_preact.Component);

exports.default = Players;

},{"preact":2,"react-hint":4}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Credit: https://codepen.io/smlsvnssn/pen/FolaA

var StatCircle = function (_Component) {
	_inherits(StatCircle, _Component);

	function StatCircle(props) {
		_classCallCheck(this, StatCircle);

		var _this = _possibleConstructorReturn(this, (StatCircle.__proto__ || Object.getPrototypeOf(StatCircle)).call(this, props));

		_this.setState({
			circleText: _this.props.fbText
		});
		return _this;
	}

	_createClass(StatCircle, [{
		key: 'createSvgArc',
		value: function createSvgArc(startPerc, extraPerc) {

			if (!Number.isInteger(startPerc)) {
				startPerc = 0;
			}
			if (!Number.isInteger(extraPerc)) {
				extraPerc = 0;
			}

			var x = 0;
			var y = 0;
			var r = 300;

			var startAngle = startPerc / 100 * Math.PI;

			var endAngle = (extraPerc + startPerc) / 100 * Math.PI;

			if (startAngle > endAngle) {
				var s = startAngle;
				startAngle = endAngle;
				endAngle = s;
			}
			if (endAngle - startAngle > Math.PI * 2) {
				endAngle = Math.PI * 1.99999;
			}

			var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;
			console.log('nums: ');
			console.log(startPerc);
			console.log(extraPerc);
			console.log(endAngle);
			console.log(startAngle);
			return ["M", x, y, "L", x + Math.cos(startAngle) * r, y - Math.sin(startAngle) * r, "A", r, r, 0, largeArc, 0, x + Math.cos(endAngle) * r, y - Math.sin(endAngle) * r, "L", x, y].join(" ");
		}
	}, {
		key: 'updateCircle',
		value: function updateCircle(perc) {
			var text = perc.toString() + '%';
			this.setState({
				circleText: text
			});
		}
	}, {
		key: 'resetCircle',
		value: function resetCircle() {
			this.setState({
				circleText: this.props.fbText
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return (0, _preact.h)(
				'div',
				{ className: 'circle' },
				(0, _preact.h)(
					'svg',
					{ id: 'theMap', width: '100%', viewBox: '0 0 600 600', preserveAspectRatio: 'xMidYMid meet' },
					(0, _preact.h)('circle', { cx: '300', cy: '300', r: '300', fill: 'rgba(255, 255, 255, 0)' }),
					(0, _preact.h)(
						'g',
						{ id: 'arcs', transform: ' translate(300 300) rotate(-90) scale(1 -1)' },
						(0, _preact.h)('path', { onMouseEnter: function onMouseEnter() {
								_this2.updateCircle(_this2.props.red);
							}, onMouseLeave: this.resetCircle.bind(this), d: this.createSvgArc(0, this.props.red), fill: '#ff0000', opacity: '0.5' }),
						(0, _preact.h)('path', { onMouseEnter: function onMouseEnter() {
								_this2.updateCircle(_this2.props.blue);
							}, onMouseLeave: this.resetCircle.bind(this), d: this.createSvgArc(this.props.red, this.props.blue), fill: '#0023ff', opacity: '0.5' })
					),
					(0, _preact.h)('circle', { cx: '300', cy: '300', r: '100', fill: '#fff' }),
					(0, _preact.h)(
						'text',
						{ x: '50%', y: '50%', 'text-anchor': 'middle', stroke: '#000', 'stroke-width': '2px', dy: '.3em', style: 'font-size: 55px;' },
						this.state.circleText
					)
				)
			);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			if (newProps.fbText !== this.props.fbText) {
				this.setState({
					circleText: newProps.fbText
				});
			}
		}
	}]);

	return StatCircle;
}(_preact.Component);

exports.default = StatCircle;

},{"preact":2}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StatsClass = function () {
	function StatsClass(stats) {
		_classCallCheck(this, StatsClass);

		this.stats = stats;
	}

	_createClass(StatsClass, [{
		key: "FB",
		value: function FB(team) {
			var fb = Math.round(100 * (this.stats[team].firstBloods / this.stats[team].matchesPlayed));
			return fb;
		}
	}, {
		key: "blueFB",
		value: function blueFB(team) {
			var fb = Math.round(100 * (this.stats[team].blueFirstBloods / this.stats[team].blueMatchesPlayed));
			return fb;
		}
	}, {
		key: "redFB",
		value: function redFB(team) {
			var fb = Math.round(100 * (this.stats[team].redFirstBloods / this.stats[team].redMatchesPlayed));
			return fb;
		}
	}, {
		key: "Tower",
		value: function Tower(team) {
			var Tower = Math.round(100 * (this.stats[team].firstTowers / this.stats[team].matchesPlayed));
			return Tower;
		}
	}, {
		key: "blueTower",
		value: function blueTower(team) {
			var Tower = Math.round(100 * (this.stats[team].blueFirstTowers / this.stats[team].blueMatchesPlayed));
			return Tower;
		}
	}, {
		key: "redTower",
		value: function redTower(team) {
			var Tower = Math.round(100 * (this.stats[team].redFirstTowers / this.stats[team].redMatchesPlayed));
			return Tower;
		}
	}, {
		key: "Dragon",
		value: function Dragon(team) {
			var Dragon = Math.round(100 * (this.stats[team].firstDragons / this.stats[team].matchesPlayed));
			return Dragon;
		}
	}, {
		key: "blueDragon",
		value: function blueDragon(team) {
			var Dragon = Math.round(100 * (this.stats[team].blueFirstDragons / this.stats[team].blueMatchesPlayed));
			return Dragon;
		}
	}, {
		key: "redDragon",
		value: function redDragon(team) {
			var Dragon = Math.round(100 * (this.stats[team].redFirstDragons / this.stats[team].redMatchesPlayed));
			return Dragon;
		}
	}]);

	return StatsClass;
}();

exports.default = StatsClass;

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _StatsClass = require('./StatsClass');

var _StatsClass2 = _interopRequireDefault(_StatsClass);

var _StatCircle = require('./StatCircle');

var _StatCircle2 = _interopRequireDefault(_StatCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamStats = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeRegion: store.config.activeRegion,
		regionStats: store.regions.regionStats,
		team1: store.config.team1,
		team2: store.config.team2
	};
}), _dec(_class = function (_Component) {
	_inherits(TeamStats, _Component);

	function TeamStats(props) {
		_classCallCheck(this, TeamStats);

		var _this = _possibleConstructorReturn(this, (TeamStats.__proto__ || Object.getPrototypeOf(TeamStats)).call(this, props));

		_this.stats = new _StatsClass2.default(_this.props.regionStats);
		return _this;
	}

	_createClass(TeamStats, [{
		key: 'getPlayerFBStats',
		value: function getPlayerFBStats(teamName) {
			var team = this.props.regionStats[teamName];
			var players = [];
			for (var player in team.playersMatchesPlayed) {
				var matchesPlayed = team.playersMatchesPlayed[player];
				var firstBlood = 100 * ((team.firstBloodPlayers[player] + team.firstBloodAssistPlayers[player]) / matchesPlayed);
				var firstBloodString = parseInt(firstBlood);

				var firstDeath = 100 * (team.firstDeathPlayers[player] / matchesPlayed);
				var firstDeathString = parseInt(firstDeath);

				players.push((0, _preact.h)(
					'tr',
					null,
					(0, _preact.h)(
						'td',
						null,
						player.replace(teamName, '')
					),
					(0, _preact.h)(
						'td',
						null,
						firstBloodString
					),
					(0, _preact.h)(
						'td',
						null,
						firstDeathString
					),
					(0, _preact.h)(
						'td',
						null,
						matchesPlayed
					)
				));
			}

			return (0, _preact.h)(
				'table',
				{ 'class': 'matches__table' },
				(0, _preact.h)(
					'tr',
					null,
					(0, _preact.h)('th', null),
					(0, _preact.h)(
						'th',
						null,
						'FB%'
					),
					(0, _preact.h)(
						'th',
						null,
						'FD%'
					),
					(0, _preact.h)(
						'th',
						null,
						'SS'
					)
				),
				players
			);
		}
	}, {
		key: 'getDragonStats',
		value: function getDragonStats() {
			var team1Stats = this.props.regionStats[this.props.team1];
			var team2Stats = this.props.regionStats[this.props.team2];

			return '';
		}
	}, {
		key: 'getPositionTowerStats',
		value: function getPositionTowerStats(teamName) {
			var team = this.props.regionStats[teamName];
			var positions = [];

			positions = this.getPositionTowerStat(positions, team, 'firstTowerPosition', 'firstEnemyTowerPosition', 'matchesPlayed', '');
			positions = this.getPositionTowerStat(positions, team, 'firstBlueTowerPosition', 'firstBlueEnemyTowerPosition', 'blueMatchesPlayed', 'colour__light-blue');
			positions = this.getPositionTowerStat(positions, team, 'firstRedTowerPosition', 'firstRedEnemyTowerPosition', 'redMatchesPlayed', 'colour__red');

			return (0, _preact.h)(
				'table',
				{ 'class': 'matches__table' },
				(0, _preact.h)(
					'tr',
					null,
					(0, _preact.h)('th', null),
					(0, _preact.h)(
						'th',
						null,
						'GET%'
					),
					(0, _preact.h)(
						'th',
						null,
						'LOSE%'
					)
				),
				positions
			);
		}
	}, {
		key: 'getPositionTowerStat',
		value: function getPositionTowerStat(positions, team, var1, var2, var3, classStyle) {
			for (var position in team.firstTowerPosition) {

				var matchesPlayed = team[var3];

				var firstTowerPercentage = parseInt(team[var1][position] / matchesPlayed * 100);
				var firstEnemyTowerPercentage = parseInt(team[var2][position] / matchesPlayed * 100);

				positions.push((0, _preact.h)(
					'tr',
					{ className: classStyle },
					(0, _preact.h)(
						'td',
						null,
						position.replace('_LANE', '')
					),
					(0, _preact.h)(
						'td',
						null,
						firstTowerPercentage + '%'
					),
					(0, _preact.h)(
						'td',
						null,
						firstEnemyTowerPercentage + '%'
					)
				));
			}

			return positions;
		}
	}, {
		key: 'renderCircleStats',
		value: function renderCircleStats() {
			if (!this.props.team1 || !this.props.team2) {
				return '';
			}
			return (0, _preact.h)(
				'div',
				{ className: 'matches__columns' },
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						'First Blood:'
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team1
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueFB(this.props.team1),
								red: this.stats.redFB(this.props.team1),
								fbText: this.stats.FB(this.props.team1) + '%'
							})
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team2
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueFB(this.props.team2),
								red: this.stats.redFB(this.props.team2),
								fbText: this.stats.FB(this.props.team2) + '%'
							})
						)
					)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						'First Dragon:'
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team1
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueDragon(this.props.team1),
								red: this.stats.redDragon(this.props.team1),
								fbText: this.stats.Dragon(this.props.team1) + '%'
							})
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team2
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueDragon(this.props.team2),
								red: this.stats.redDragon(this.props.team2),
								fbText: this.stats.Dragon(this.props.team2) + '%'
							})
						)
					)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						'First Tower:'
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team1
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueTower(this.props.team1),
								red: this.stats.redTower(this.props.team1),
								fbText: this.stats.Tower(this.props.team1) + '%'
							})
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team2
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueTower(this.props.team2),
								red: this.stats.redTower(this.props.team2),
								fbText: this.stats.Tower(this.props.team2) + '%'
							})
						)
					)
				)
			);
		}
	}, {
		key: 'renderPlayerStats',
		value: function renderPlayerStats() {
			if (!this.props.team1 || !this.props.team2) {
				return '';
			}
			return (0, _preact.h)(
				'div',
				{ className: 'matches__columns' },
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  bdr-right' },
							this.getPlayerFBStats(this.props.team1)
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half' },
							this.getPlayerFBStats(this.props.team2)
						)
					)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					this.getDragonStats()
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half bdr-right' },
							this.getPositionTowerStats(this.props.team1)
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half' },
							this.getPositionTowerStats(this.props.team2)
						)
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				null,
				(0, _preact.h)(
					'div',
					null,
					this.renderCircleStats()
				),
				(0, _preact.h)(
					'div',
					null,
					this.renderPlayerStats()
				)
			);
		}
	}]);

	return TeamStats;
}(_preact.Component)) || _class);
exports.default = TeamStats;

},{"./StatCircle":31,"./StatsClass":32,"preact":2,"preact-redux":1}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _MatchElements = require('./MatchElements');

var _MatchElements2 = _interopRequireDefault(_MatchElements);

var _TeamStats = require('./TeamStats');

var _TeamStats2 = _interopRequireDefault(_TeamStats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchUp = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeRegion: store.config.activeRegion,
		regionData: store.regions.regionData,
		team1: store.config.team1,
		team2: store.config.team2
	};
}), _dec(_class = function (_Component) {
	_inherits(MatchUp, _Component);

	function MatchUp() {
		_classCallCheck(this, MatchUp);

		return _possibleConstructorReturn(this, (MatchUp.__proto__ || Object.getPrototypeOf(MatchUp)).apply(this, arguments));
	}

	_createClass(MatchUp, [{
		key: 'updateRegion',
		value: function updateRegion(e) {
			this.props.dispatch({
				type: 'UPDATE_REGION',
				payload: fetch('/api/' + e.target.value + '/light.json').then(function (response) {
					return response.json();
				})
			});

			this.props.dispatch({
				type: 'UPDATE_REGION_STATS',
				payload: fetch('/api/' + e.target.value + '/stats.json').then(function (response) {
					return response.json();
				})
			});

			this.props.dispatch({
				type: 'UPDATE_REGION_TEXT',
				text: e.target.value
			});
		}
	}, {
		key: 'updateTeam1',
		value: function updateTeam1(e) {
			this.props.dispatch({
				type: 'UPDATE_TEAM1',
				text: e.target.value
			});
		}
	}, {
		key: 'updateTeam2',
		value: function updateTeam2(e) {
			this.props.dispatch({
				type: 'UPDATE_TEAM2',
				text: e.target.value
			});
		}
	}, {
		key: 'getTeams',
		value: function getTeams() {
			if (this.props.regionData) {
				var teams = [];
				var options = [];
				Array.from(this.props.regionData, function (game) {
					var team1 = game['teamNames'][0];
					var team2 = game['teamNames'][1];

					if (!teams.includes(team1)) {
						teams.push(team1);
					}
					if (!teams.includes(team2)) {
						teams.push(team2);
					}
				});

				teams.sort();

				Array.from(teams, function (team) {
					options.push((0, _preact.h)(
						'option',
						{ value: team },
						team
					));
				});

				return options;
			}

			return false;
		}
	}, {
		key: 'renderRegions',
		value: function renderRegions() {
			var _this2 = this;

			return (0, _preact.h)(
				'div',
				null,
				(0, _preact.h)(
					'select',
					{ onChange: function onChange(e) {
							return _this2.updateRegion(e);
						}, value: this.props.activeRegion },
					(0, _preact.h)(
						'option',
						{ disabled: true, selected: true, value: '' },
						'Select Region'
					),
					(0, _preact.h)(
						'option',
						{ value: 'LCK' },
						'LCK'
					),
					(0, _preact.h)(
						'option',
						{ value: 'CBLOL' },
						'CBLOL'
					),
					(0, _preact.h)(
						'option',
						{ value: 'EULCS' },
						'EULCS'
					),
					(0, _preact.h)(
						'option',
						{ value: 'NALCS' },
						'NALCS'
					),
					(0, _preact.h)(
						'option',
						{ value: 'TCL' },
						'TCL'
					),
					(0, _preact.h)(
						'option',
						{ value: 'LMS' },
						'LMS'
					),
					(0, _preact.h)(
						'option',
						{ value: 'OPL' },
						'OPL'
					)
				)
			);
		}
	}, {
		key: 'renderTeams',
		value: function renderTeams() {
			var _this3 = this;

			var teams = this.getTeams();
			if (teams) {
				return (0, _preact.h)(
					'div',
					null,
					(0, _preact.h)(
						'select',
						{
							onChange: function onChange(e) {
								return _this3.updateTeam1(e);
							},
							value: this.props.team1 ? this.props.team1 : 'select' },
						(0, _preact.h)(
							'option',
							{ selected: true, disabled: true, value: 'select' },
							'Select Team'
						),
						teams
					),
					(0, _preact.h)(
						'select',
						{
							onChange: function onChange(e) {
								return _this3.updateTeam2(e);
							},
							value: this.props.team2 ? this.props.team2 : 'select' },
						(0, _preact.h)(
							'option',
							{ selected: true, disabled: true, value: 'select' },
							'Select Team'
						),
						teams
					)
				);
			} else {
				return (0, _preact.h)(
					'div',
					null,
					(0, _preact.h)('select', { disabled: true }),
					(0, _preact.h)('select', { disabled: true })
				);
			}
		}
	}, {
		key: 'renderMatchup',
		value: function renderMatchup() {
			if (this.props.team1 && this.props.team2) {
				return (0, _preact.h)(_MatchElements2.default, { team1: this.props.team1, team2: this.props.team2, games: this.props.regionData, store: this.props.store });
			}
		}
	}, {
		key: 'renderStats',
		value: function renderStats() {
			if (this.props.team1 && this.props.team2) {
				return (0, _preact.h)(_TeamStats2.default, { team1: this.props.team1, team2: this.props.team2, store: this.props.store });
			}
		}
	}, {
		key: 'renderTeamsVS',
		value: function renderTeamsVS() {
			if (this.props.team1 && this.props.team2) {
				return (0, _preact.h)(
					'div',
					null,
					this.props.team1,
					' vs ',
					this.props.team2
				);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				null,
				(0, _preact.h)(
					'div',
					{ 'class': 'matches__selects' },
					(0, _preact.h)(
						'div',
						null,
						this.renderRegions()
					),
					(0, _preact.h)(
						'div',
						null,
						this.renderTeams()
					)
				),
				(0, _preact.h)(
					'div',
					null,
					this.renderTeamsVS()
				),
				(0, _preact.h)(
					'div',
					null,
					this.renderStats()
				),
				(0, _preact.h)(
					'div',
					null,
					this.renderMatchup()
				)
			);
		}
	}]);

	return MatchUp;
}(_preact.Component)) || _class);
exports.default = MatchUp;

},{"./MatchElements":29,"./TeamStats":33,"preact":2,"preact-redux":1}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchElement = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        team1: store.config.team1,
        team2: store.config.team2
    };
}), _dec(_class = function (_Component) {
    _inherits(MatchElement, _Component);

    function MatchElement(props) {
        _classCallCheck(this, MatchElement);

        return _possibleConstructorReturn(this, (MatchElement.__proto__ || Object.getPrototypeOf(MatchElement)).call(this, props));
    }

    _createClass(MatchElement, [{
        key: 'handleCardClick',
        value: function handleCardClick() {
            this.props.dispatch({
                type: 'UPDATE_TEAMS',
                team1: this.props.match.team1acro,
                team2: this.props.match.team2acro,
                region: this.props.match.region
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                { className: 'match-card', onClick: this.handleCardClick.bind(this) },
                (0, _preact.h)(
                    'div',
                    { className: 'match-card__backgrounds' },
                    (0, _preact.h)('div', { className: 'match-card__background', style: 'background-image: url(\'/assets/img/logos/' + this.props.match.region + '/' + this.props.match.team1acro + '.png\')' }),
                    (0, _preact.h)('div', { className: 'match-card__background', style: 'background-image: url(\'/assets/img/logos/' + this.props.match.region + '/' + this.props.match.team2acro + '.png\')' })
                ),
                (0, _preact.h)(
                    'div',
                    { className: 'match-card__content' },
                    (0, _preact.h)(
                        'div',
                        { className: 'match-card__league' },
                        this.props.match.region
                    ),
                    (0, _preact.h)(
                        'div',
                        { className: 'match-card__time' },
                        this.props.time
                    )
                )
            );
        }
    }]);

    return MatchElement;
}(_preact.Component)) || _class);
exports.default = MatchElement;

},{"preact":2,"preact-redux":1}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _MatchElement = require('./MatchElement');

var _MatchElement2 = _interopRequireDefault(_MatchElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Matches = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        loading: store.matches.loading,
        matches: store.matches.matches
    };
}), _dec(_class = function (_Component) {
    _inherits(Matches, _Component);

    function Matches(props) {
        _classCallCheck(this, Matches);

        // set initial time:
        var _this = _possibleConstructorReturn(this, (Matches.__proto__ || Object.getPrototypeOf(Matches)).call(this, props));

        _this.state = {
            time: new Date().getTime() / 1000
        };
        _this.fetchMatches();
        return _this;
    }

    _createClass(Matches, [{
        key: 'fetchMatches',
        value: function fetchMatches() {
            this.props.dispatch({
                type: 'GET_MATCHES',
                payload: fetch('/api/schedule.json').then(function (response) {
                    return response.json();
                })
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // update time every second
            this.timer = setInterval(function () {
                _this2.setState({
                    time: new Date().getTime() / 1000
                });
            }, 1000);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // stop when not renderable
            clearInterval(this.timer);
        }
    }, {
        key: 'getTimeDifference',
        value: function getTimeDifference(time1, time2) {
            if (time1 > time2) {
                var difference = time1 - time2;
                var days = Math.floor(difference / (3600 * 24));
                var formattedDays = ("0" + days).slice(-2);
                difference -= days * 3600 * 24;
                var hrs = Math.floor(difference / 3600);
                var formattedHrs = ("0" + hrs).slice(-2);
                difference -= hrs * 3600;
                var mnts = Math.floor(difference / 60);
                var formattedMnts = ("0" + mnts).slice(-2);
                difference -= mnts * 60;
                var seconds = Math.floor(difference);
                var formattedSeconds = ("0" + seconds).slice(-2);
                return formattedDays + ':' + formattedHrs + ':' + formattedMnts + ':' + formattedSeconds;
            } else {
                return '00:00:00:00';
            }
        }
    }, {
        key: 'getNextMatches',
        value: function getNextMatches() {
            var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            if (this.props.loading) {
                return 'Loading';
            }
            if (this.props.matches) {
                var matchElements = [];
                var count = 0;
                for (var index = 0; index < this.props.matches.length; index++) {
                    var match = this.props.matches[index];
                    if (count < max && this.props.matches[index].datetime > this.state.time) {
                        matchElements.push((0, _preact.h)(_MatchElement2.default, { store: this.props.store, match: this.props.matches[index], time: this.getTimeDifference(this.props.matches[index].datetime, this.state.time) }));
                        count++;
                    }
                }
                return matchElements;
            }
            return '';
        }
    }, {
        key: 'render',
        value: function render(props, state) {
            return (0, _preact.h)(
                'span',
                null,
                this.getNextMatches(25)
            );
        }
    }]);

    return Matches;
}(_preact.Component)) || _class);
exports.default = Matches;

},{"./MatchElement":35,"preact":2,"preact-redux":1}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_Component) {
	_inherits(NavBar, _Component);

	function NavBar() {
		_classCallCheck(this, NavBar);

		return _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).apply(this, arguments));
	}

	_createClass(NavBar, [{
		key: 'getLinks',
		value: function getLinks() {
			var _this2 = this;

			var options = {
				matchUp: 'Match Up',
				champs: 'Champs',
				players: 'Players'
			};
			var links = [];

			var _loop = function _loop(option) {
				links.push((0, _preact.h)(
					'li',
					{ onClick: function onClick() {
							return _this2.props.updateAppType(option);
						} },
					options[option]
				));
			};

			for (var option in options) {
				_loop(option);
			}
			return links;
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'ul',
				null,
				this.getLinks()
			);
		}
	}]);

	return NavBar;
}(_preact.Component);

exports.default = NavBar;

},{"preact":2}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppMain = function (_Component) {
	_inherits(AppMain, _Component);

	function AppMain() {
		_classCallCheck(this, AppMain);

		return _possibleConstructorReturn(this, (AppMain.__proto__ || Object.getPrototypeOf(AppMain)).apply(this, arguments));
	}

	_createClass(AppMain, [{
		key: 'render',
		value: function render() {
			return 'players';
		}
	}]);

	return AppMain;
}(_preact.Component);

exports.default = AppMain;

},{"preact":2}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = config;
function config() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'UPDATE_REGION_TEXT':
			return _extends({}, state, {
				activeRegion: action.text,
				team1: false,
				team2: false
			});
		case 'UPDATE_TEAM1':
			return _extends({}, state, {
				team1: action.text
			});
		case 'UPDATE_TEAM2':
			return _extends({}, state, {
				team2: action.text
			});

		case 'UPDATE_TEAMS':
			return _extends({}, state, {
				team1: action.team1,
				team2: action.team2,
				activeRegion: action.region
			});

		default:
			return state;
	}
}

},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _regions = require('./regions');

var _regions2 = _interopRequireDefault(_regions);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _stats = require('./stats');

var _stats2 = _interopRequireDefault(_stats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	regions: _regions2.default,
	config: _config2.default,
	matches: _matches2.default,
	stats: _stats2.default
});

},{"./config":39,"./matches":41,"./regions":42,"./stats":43,"redux":9}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = matches;
function matches() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case 'GET_MATCHES_PENDING':
            return _extends({}, state, {
                loading: true
            });
        case 'GET_MATCHES_FULFILLED':
            return _extends({}, state, {
                loading: false,
                matches: action.payload
            });

        default:
            return state;
    }
}

},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = regions;
function regions() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'UPDATE_REGION_PENDING':
			return _extends({}, state, {
				regionLoading: true
			});
		case 'UPDATE_REGION_FULFILLED':
			return _extends({}, state, {
				regionData: action.payload,
				regionLoading: false
			});
		case 'UPDATE_REGION_STATS_PENDING':
			return _extends({}, state, {
				statsLoading: true
			});
		case 'UPDATE_REGION_STATS_FULFILLED':
			return _extends({}, state, {
				regionStats: action.payload,
				statsLoading: false
			});

		default:
			return state;
	}
}

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = stats;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function stats() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { loading: 0 };
	var action = arguments[1];

	switch (action.type) {
		case 'FETCH_STATS_PENDING':
			return _extends({}, state, {
				loading: state.loading + 1
			});
		case 'FETCH_STATS_FULFILLED':
			return _extends({}, state, {
				loading: state.loading - 1,
				stats: _extends({}, state.stats, _defineProperty({}, action.meta, action.payload))
			});

		case 'SET_ALL_PATCHES':
			return _extends({}, state, {
				activePatches: action.patches
			});

		case 'SET_ALL_REGIONS':
			return _extends({}, state, {
				activeRegions: action.regions
			});

		case 'SET_ALL_VARIABLES':
			return _extends({}, state, {
				activeVariables: action.variables
			});

		case 'SET_MINPLAYED':
			return _extends({}, state, {
				minPlayed: action.minPlayed
			});

		case 'RESET_STATS':
			return _extends({}, state, {
				activePatches: undefined,
				activeRegions: undefined,
				activeVariables: undefined,
				minPlayed: undefined
			});

		default:
			return state;
	}
}

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require("redux-logger");

var _reduxPromiseMiddleware = require("redux-promise-middleware");

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), (0, _reduxLogger.createLogger)());

exports.default = (0, _redux.createStore)(_index2.default, middleware);

},{"./index":40,"redux":9,"redux-logger":5,"redux-promise-middleware":6,"redux-thunk":8}],45:[function(require,module,exports){
'use strict';

var _LeagueReactApp = require('./classes/LeagueReactApp');

var _LeagueReactApp2 = _interopRequireDefault(_LeagueReactApp);

var _LeagueMatchesApp = require('./classes/LeagueMatchesApp');

var _LeagueMatchesApp2 = _interopRequireDefault(_LeagueMatchesApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leagueApp = document.querySelector('.js-league-app');
if (leagueApp) {
	new _LeagueReactApp2.default(leagueApp);
}

var leagueMatches = document.querySelector('.js-league-matches');
if (leagueMatches) {
	new _LeagueMatchesApp2.default(leagueMatches);
}

},{"./classes/LeagueMatchesApp":12,"./classes/LeagueReactApp":13}]},{},[45])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0LXJlZHV4L2Rpc3QvcHJlYWN0LXJlZHV4LmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtaGludC9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2Rpc3QvcmVkdXgtbG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXByb21pc2UtbWlkZGxld2FyZS9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXByb21pc2UtbWlkZGxld2FyZS9kaXN0L2lzUHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL3JlZHV4LmpzIiwibm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiLCJzcmMvanMvY2xhc3Nlcy9MZWFndWVNYXRjaGVzQXBwLmpzIiwic3JjL2pzL2NsYXNzZXMvTGVhZ3VlUmVhY3RBcHAuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0FwcE1haW4uanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9DYWxjdWxhdG9yLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9DaGFtcHMvTWluUGxheWVkLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9DaGFtcHMvUGF0Y2hlcy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL1JlZ2lvbnMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9TdGF0c0Jsb2NrLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9DaGFtcHMvVGFibGUuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9Ub3BOYXYuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9WYXJpYWJsZXMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9pbmRleC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvQ2hhbXBGdW5jcy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvRmlsdGVycy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvU3RhdHMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01haW5MZWFndWVBcHAuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvTWF0Y2hDYXJkLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL01hdGNoRWxlbWVudHMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvUGxheWVycy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTWF0Y2hVcC9TdGF0Q2lyY2xlLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL1N0YXRzQ2xhc3MuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvVGVhbVN0YXRzLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL2luZGV4LmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaGVzL01hdGNoRWxlbWVudC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTWF0Y2hlcy9pbmRleC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTmF2QmFyLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9QbGF5ZXJzL2luZGV4LmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9jb25maWcuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL3JlZHVjZXJzL2luZGV4LmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9tYXRjaGVzLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9yZWdpb25zLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9zdGF0cy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvcmVkdWNlcnMvc3RvcmUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdk9BO0FBQ0E7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN2bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3RCQTs7QUFDQTs7Ozs7Ozs7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b3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdwcmVhY3QnKSwgcmVxdWlyZSgncmVkdXgnKSkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydwcmVhY3QnLCAncmVkdXgnXSwgZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLnByZWFjdFJlZHV4ID0gZmFjdG9yeShnbG9iYWwucHJlYWN0LGdsb2JhbC5SZWR1eCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKHByZWFjdCxyZWR1eCkge1xuXG52YXIgQ2hpbGRyZW4gPSB7XG5cdG9ubHk6IGZ1bmN0aW9uIG9ubHkoY2hpbGRyZW4pIHtcblx0XHRyZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW5bMF0gfHwgbnVsbDtcblx0fVxufTtcblxuZnVuY3Rpb24gcHJvcHR5cGUoKSB7fVxucHJvcHR5cGUuaXNSZXF1aXJlZCA9IHByb3B0eXBlO1xuXG52YXIgUHJvcFR5cGVzID0ge1xuXHRlbGVtZW50OiBwcm9wdHlwZSxcblx0ZnVuYzogcHJvcHR5cGUsXG5cdHNoYXBlOiBmdW5jdGlvbiBzaGFwZSgpIHtcblx0XHRyZXR1cm4gcHJvcHR5cGU7XG5cdH0sXG5cdGluc3RhbmNlT2Y6IGZ1bmN0aW9uIGluc3RhbmNlT2YoKSB7XG5cdFx0cmV0dXJuIHByb3B0eXBlO1xuXHR9XG59O1xuXG52YXIgc3Vic2NyaXB0aW9uU2hhcGUgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICB0cnlTdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRyeVVuc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBub3RpZnlOZXN0ZWRTdWJzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpc1N1YnNjcmliZWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn0pO1xuXG52YXIgc3RvcmVTaGFwZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIHN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldFN0YXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59KTtcblxuLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn1cblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cblxuXG5cblxuXG5cblxuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuXG5cblxuXG5cblxuXG52YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG52YXIgZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUgPSBmYWxzZTtcbmZ1bmN0aW9uIHdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKCkge1xuICBpZiAoZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUgPSB0cnVlO1xuXG4gIHdhcm5pbmcoJzxQcm92aWRlcj4gZG9lcyBub3Qgc3VwcG9ydCBjaGFuZ2luZyBgc3RvcmVgIG9uIHRoZSBmbHkuICcgKyAnSXQgaXMgbW9zdCBsaWtlbHkgdGhhdCB5b3Ugc2VlIHRoaXMgZXJyb3IgYmVjYXVzZSB5b3UgdXBkYXRlZCB0byAnICsgJ1JlZHV4IDIueCBhbmQgUmVhY3QgUmVkdXggMi54IHdoaWNoIG5vIGxvbmdlciBob3QgcmVsb2FkIHJlZHVjZXJzICcgKyAnYXV0b21hdGljYWxseS4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JlYWN0LXJlZHV4L3JlbGVhc2VzLycgKyAndGFnL3YyLjAuMCBmb3IgdGhlIG1pZ3JhdGlvbiBpbnN0cnVjdGlvbnMuJyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVyKCkge1xuICB2YXIgX1Byb3ZpZGVyJGNoaWxkQ29udGV4O1xuXG4gIHZhciBzdG9yZUtleSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ3N0b3JlJztcbiAgdmFyIHN1YktleSA9IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgc3Vic2NyaXB0aW9uS2V5ID0gc3ViS2V5IHx8IHN0b3JlS2V5ICsgJ1N1YnNjcmlwdGlvbic7XG5cbiAgdmFyIFByb3ZpZGVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBpbmhlcml0cyhQcm92aWRlciwgX0NvbXBvbmVudCk7XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbc3RvcmVLZXldID0gdGhpc1tzdG9yZUtleV0sIF9yZWZbc3Vic2NyaXB0aW9uS2V5XSA9IG51bGwsIF9yZWY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFByb3ZpZGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBQcm92aWRlcik7XG5cbiAgICAgIHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICAgIF90aGlzW3N0b3JlS2V5XSA9IHByb3BzLnN0b3JlO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3ZpZGVyO1xuICB9KHByZWFjdC5Db21wb25lbnQpO1xuXG4gIHtcbiAgICBQcm92aWRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIChuZXh0UHJvcHMpIHtcbiAgICAgIGlmICh0aGlzW3N0b3JlS2V5XSAhPT0gbmV4dFByb3BzLnN0b3JlKSB7XG4gICAgICAgIHdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIFByb3ZpZGVyLmNoaWxkQ29udGV4dFR5cGVzID0gKF9Qcm92aWRlciRjaGlsZENvbnRleCA9IHt9LCBfUHJvdmlkZXIkY2hpbGRDb250ZXhbc3RvcmVLZXldID0gc3RvcmVTaGFwZS5pc1JlcXVpcmVkLCBfUHJvdmlkZXIkY2hpbGRDb250ZXhbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfUHJvdmlkZXIkY2hpbGRDb250ZXgpO1xuXG4gIHJldHVybiBQcm92aWRlcjtcbn1cblxudmFyIFByb3ZpZGVyID0gY3JlYXRlUHJvdmlkZXIoKTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSwgWWFob28hIEluYy5cbiAqIENvcHlyaWdodHMgbGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgTGljZW5zZS4gU2VlIHRoZSBhY2NvbXBhbnlpbmcgTElDRU5TRSBmaWxlIGZvciB0ZXJtcy5cbiAqL1xudmFyIFJFQUNUX1NUQVRJQ1MgPSB7XG4gICAgY2hpbGRDb250ZXh0VHlwZXM6IHRydWUsXG4gICAgY29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgbWl4aW5zOiB0cnVlLFxuICAgIHByb3BUeXBlczogdHJ1ZSxcbiAgICB0eXBlOiB0cnVlXG59O1xuXG52YXIgS05PV05fU1RBVElDUyA9IHtcbiAgICBuYW1lOiB0cnVlLFxuICAgIGxlbmd0aDogdHJ1ZSxcbiAgICBwcm90b3R5cGU6IHRydWUsXG4gICAgY2FsbGVyOiB0cnVlLFxuICAgIGNhbGxlZTogdHJ1ZSxcbiAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgYXJpdHk6IHRydWVcbn07XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSQxID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YgJiYgZ2V0UHJvdG90eXBlT2YoT2JqZWN0KTtcblxudmFyIGhvaXN0Tm9uUmVhY3RTdGF0aWNzID0gZnVuY3Rpb24gaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBzb3VyY2VDb21wb25lbnQsIGJsYWNrbGlzdCkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuXG4gICAgICAgIGlmIChvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgIHZhciBpbmhlcml0ZWRDb21wb25lbnQgPSBnZXRQcm90b3R5cGVPZihzb3VyY2VDb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgaW5oZXJpdGVkQ29tcG9uZW50LCBibGFja2xpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICAgICAgaWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICBpZiAoIVJFQUNUX1NUQVRJQ1Nba2V5XSAmJiAhS05PV05fU1RBVElDU1trZXldICYmICghYmxhY2tsaXN0IHx8ICFibGFja2xpc3Rba2V5XSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2VDb21wb25lbnQsIGtleSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXZvaWQgZmFpbHVyZXMgZnJvbSByZWFkLW9ubHkgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eSQxKHRhcmdldENvbXBvbmVudCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xufTtcblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBlbmNhcHN1bGF0ZXMgdGhlIHN1YnNjcmlwdGlvbiBsb2dpYyBmb3IgY29ubmVjdGluZyBhIGNvbXBvbmVudCB0byB0aGUgcmVkdXggc3RvcmUsIGFzXG4vLyB3ZWxsIGFzIG5lc3Rpbmcgc3Vic2NyaXB0aW9ucyBvZiBkZXNjZW5kYW50IGNvbXBvbmVudHMsIHNvIHRoYXQgd2UgY2FuIGVuc3VyZSB0aGVcbi8vIGFuY2VzdG9yIGNvbXBvbmVudHMgcmUtcmVuZGVyIGJlZm9yZSBkZXNjZW5kYW50c1xuXG52YXIgQ0xFQVJFRCA9IG51bGw7XG52YXIgbnVsbExpc3RlbmVycyA9IHtcbiAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkoKSB7fVxufTtcblxuZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXJDb2xsZWN0aW9uKCkge1xuICAvLyB0aGUgY3VycmVudC9uZXh0IHBhdHRlcm4gaXMgY29waWVkIGZyb20gcmVkdXgncyBjcmVhdGVTdG9yZSBjb2RlLlxuICAvLyBUT0RPOiByZWZhY3RvcitleHBvc2UgdGhhdCBjb2RlIHRvIGJlIHJldXNhYmxlIGhlcmU/XG4gIHZhciBjdXJyZW50ID0gW107XG4gIHZhciBuZXh0ID0gW107XG5cbiAgcmV0dXJuIHtcbiAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICBuZXh0ID0gQ0xFQVJFRDtcbiAgICAgIGN1cnJlbnQgPSBDTEVBUkVEO1xuICAgIH0sXG4gICAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudCA9IG5leHQ7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaXN0ZW5lcnNbaV0oKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICBpZiAobmV4dCA9PT0gY3VycmVudCkgbmV4dCA9IGN1cnJlbnQuc2xpY2UoKTtcbiAgICAgIG5leHQucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgaWYgKCFpc1N1YnNjcmliZWQgfHwgY3VycmVudCA9PT0gQ0xFQVJFRCkgcmV0dXJuO1xuICAgICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAobmV4dCA9PT0gY3VycmVudCkgbmV4dCA9IGN1cnJlbnQuc2xpY2UoKTtcbiAgICAgICAgbmV4dC5zcGxpY2UobmV4dC5pbmRleE9mKGxpc3RlbmVyKSwgMSk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxudmFyIFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKHN0b3JlLCBwYXJlbnRTdWIsIG9uU3RhdGVDaGFuZ2UpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTdWJzY3JpcHRpb24pO1xuXG4gICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgIHRoaXMucGFyZW50U3ViID0gcGFyZW50U3ViO1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZSA9IG9uU3RhdGVDaGFuZ2U7XG4gICAgdGhpcy51bnN1YnNjcmliZSA9IG51bGw7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBudWxsTGlzdGVuZXJzO1xuICB9XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGROZXN0ZWRTdWIgPSBmdW5jdGlvbiBhZGROZXN0ZWRTdWIobGlzdGVuZXIpIHtcbiAgICB0aGlzLnRyeVN1YnNjcmliZSgpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5zdWJzY3JpYmUobGlzdGVuZXIpO1xuICB9O1xuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUubm90aWZ5TmVzdGVkU3VicyA9IGZ1bmN0aW9uIG5vdGlmeU5lc3RlZFN1YnMoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMubm90aWZ5KCk7XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5pc1N1YnNjcmliZWQgPSBmdW5jdGlvbiBpc1N1YnNjcmliZWQoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy51bnN1YnNjcmliZSk7XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS50cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiB0cnlTdWJzY3JpYmUoKSB7XG4gICAgaWYgKCF0aGlzLnVuc3Vic2NyaWJlKSB7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlID0gdGhpcy5wYXJlbnRTdWIgPyB0aGlzLnBhcmVudFN1Yi5hZGROZXN0ZWRTdWIodGhpcy5vblN0YXRlQ2hhbmdlKSA6IHRoaXMuc3RvcmUuc3Vic2NyaWJlKHRoaXMub25TdGF0ZUNoYW5nZSk7XG5cbiAgICAgIHRoaXMubGlzdGVuZXJzID0gY3JlYXRlTGlzdGVuZXJDb2xsZWN0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudHJ5VW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB0cnlVbnN1YnNjcmliZSgpIHtcbiAgICBpZiAodGhpcy51bnN1YnNjcmliZSkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IG51bGw7XG4gICAgICB0aGlzLmxpc3RlbmVycy5jbGVhcigpO1xuICAgICAgdGhpcy5saXN0ZW5lcnMgPSBudWxsTGlzdGVuZXJzO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpO1xuXG52YXIgaG90UmVsb2FkaW5nVmVyc2lvbiA9IDA7XG52YXIgZHVtbXlTdGF0ZSA9IHt9O1xuZnVuY3Rpb24gbm9vcCgpIHt9XG5mdW5jdGlvbiBtYWtlU2VsZWN0b3JTdGF0ZWZ1bChzb3VyY2VTZWxlY3Rvciwgc3RvcmUpIHtcbiAgLy8gd3JhcCB0aGUgc2VsZWN0b3IgaW4gYW4gb2JqZWN0IHRoYXQgdHJhY2tzIGl0cyByZXN1bHRzIGJldHdlZW4gcnVucy5cbiAgdmFyIHNlbGVjdG9yID0ge1xuICAgIHJ1bjogZnVuY3Rpb24gcnVuQ29tcG9uZW50U2VsZWN0b3IocHJvcHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBuZXh0UHJvcHMgPSBzb3VyY2VTZWxlY3RvcihzdG9yZS5nZXRTdGF0ZSgpLCBwcm9wcyk7XG4gICAgICAgIGlmIChuZXh0UHJvcHMgIT09IHNlbGVjdG9yLnByb3BzIHx8IHNlbGVjdG9yLmVycm9yKSB7XG4gICAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICBzZWxlY3Rvci5wcm9wcyA9IG5leHRQcm9wcztcbiAgICAgICAgICBzZWxlY3Rvci5lcnJvciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IHRydWU7XG4gICAgICAgIHNlbGVjdG9yLmVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gY29ubmVjdEFkdmFuY2VkKFxuLypcbiAgc2VsZWN0b3JGYWN0b3J5IGlzIGEgZnVuYyB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgdGhlIHNlbGVjdG9yIGZ1bmN0aW9uIHVzZWQgdG9cbiAgY29tcHV0ZSBuZXcgcHJvcHMgZnJvbSBzdGF0ZSwgcHJvcHMsIGFuZCBkaXNwYXRjaC4gRm9yIGV4YW1wbGU6XG4gICAgIGV4cG9ydCBkZWZhdWx0IGNvbm5lY3RBZHZhbmNlZCgoZGlzcGF0Y2gsIG9wdGlvbnMpID0+IChzdGF0ZSwgcHJvcHMpID0+ICh7XG4gICAgICB0aGluZzogc3RhdGUudGhpbmdzW3Byb3BzLnRoaW5nSWRdLFxuICAgICAgc2F2ZVRoaW5nOiBmaWVsZHMgPT4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvcnMuc2F2ZVRoaW5nKHByb3BzLnRoaW5nSWQsIGZpZWxkcykpLFxuICAgIH0pKShZb3VyQ29tcG9uZW50KVxuICAgQWNjZXNzIHRvIGRpc3BhdGNoIGlzIHByb3ZpZGVkIHRvIHRoZSBmYWN0b3J5IHNvIHNlbGVjdG9yRmFjdG9yaWVzIGNhbiBiaW5kIGFjdGlvbkNyZWF0b3JzXG4gIG91dHNpZGUgb2YgdGhlaXIgc2VsZWN0b3IgYXMgYW4gb3B0aW1pemF0aW9uLiBPcHRpb25zIHBhc3NlZCB0byBjb25uZWN0QWR2YW5jZWQgYXJlIHBhc3NlZCB0b1xuICB0aGUgc2VsZWN0b3JGYWN0b3J5LCBhbG9uZyB3aXRoIGRpc3BsYXlOYW1lIGFuZCBXcmFwcGVkQ29tcG9uZW50LCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgTm90ZSB0aGF0IHNlbGVjdG9yRmFjdG9yeSBpcyByZXNwb25zaWJsZSBmb3IgYWxsIGNhY2hpbmcvbWVtb2l6YXRpb24gb2YgaW5ib3VuZCBhbmQgb3V0Ym91bmRcbiAgcHJvcHMuIERvIG5vdCB1c2UgY29ubmVjdEFkdmFuY2VkIGRpcmVjdGx5IHdpdGhvdXQgbWVtb2l6aW5nIHJlc3VsdHMgYmV0d2VlbiBjYWxscyB0byB5b3VyXG4gIHNlbGVjdG9yLCBvdGhlcndpc2UgdGhlIENvbm5lY3QgY29tcG9uZW50IHdpbGwgcmUtcmVuZGVyIG9uIGV2ZXJ5IHN0YXRlIG9yIHByb3BzIGNoYW5nZS5cbiovXG5zZWxlY3RvckZhY3RvcnkpIHtcbiAgdmFyIF9jb250ZXh0VHlwZXMsIF9jaGlsZENvbnRleHRUeXBlcztcblxuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgdmFyIF9yZWYkZ2V0RGlzcGxheU5hbWUgPSBfcmVmLmdldERpc3BsYXlOYW1lLFxuICAgICAgZ2V0RGlzcGxheU5hbWUgPSBfcmVmJGdldERpc3BsYXlOYW1lID09PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnQ29ubmVjdEFkdmFuY2VkKCcgKyBuYW1lICsgJyknO1xuICB9IDogX3JlZiRnZXREaXNwbGF5TmFtZSxcbiAgICAgIF9yZWYkbWV0aG9kTmFtZSA9IF9yZWYubWV0aG9kTmFtZSxcbiAgICAgIG1ldGhvZE5hbWUgPSBfcmVmJG1ldGhvZE5hbWUgPT09IHVuZGVmaW5lZCA/ICdjb25uZWN0QWR2YW5jZWQnIDogX3JlZiRtZXRob2ROYW1lLFxuICAgICAgX3JlZiRyZW5kZXJDb3VudFByb3AgPSBfcmVmLnJlbmRlckNvdW50UHJvcCxcbiAgICAgIHJlbmRlckNvdW50UHJvcCA9IF9yZWYkcmVuZGVyQ291bnRQcm9wID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBfcmVmJHJlbmRlckNvdW50UHJvcCxcbiAgICAgIF9yZWYkc2hvdWxkSGFuZGxlU3RhdCA9IF9yZWYuc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzLFxuICAgICAgc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzID0gX3JlZiRzaG91bGRIYW5kbGVTdGF0ID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZiRzaG91bGRIYW5kbGVTdGF0LFxuICAgICAgX3JlZiRzdG9yZUtleSA9IF9yZWYuc3RvcmVLZXksXG4gICAgICBzdG9yZUtleSA9IF9yZWYkc3RvcmVLZXkgPT09IHVuZGVmaW5lZCA/ICdzdG9yZScgOiBfcmVmJHN0b3JlS2V5LFxuICAgICAgX3JlZiR3aXRoUmVmID0gX3JlZi53aXRoUmVmLFxuICAgICAgd2l0aFJlZiA9IF9yZWYkd2l0aFJlZiA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJHdpdGhSZWYsXG4gICAgICBjb25uZWN0T3B0aW9ucyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnZ2V0RGlzcGxheU5hbWUnLCAnbWV0aG9kTmFtZScsICdyZW5kZXJDb3VudFByb3AnLCAnc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzJywgJ3N0b3JlS2V5JywgJ3dpdGhSZWYnXSk7XG5cbiAgdmFyIHN1YnNjcmlwdGlvbktleSA9IHN0b3JlS2V5ICsgJ1N1YnNjcmlwdGlvbic7XG4gIHZhciB2ZXJzaW9uID0gaG90UmVsb2FkaW5nVmVyc2lvbisrO1xuXG4gIHZhciBjb250ZXh0VHlwZXMgPSAoX2NvbnRleHRUeXBlcyA9IHt9LCBfY29udGV4dFR5cGVzW3N0b3JlS2V5XSA9IHN0b3JlU2hhcGUsIF9jb250ZXh0VHlwZXNbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfY29udGV4dFR5cGVzKTtcbiAgdmFyIGNoaWxkQ29udGV4dFR5cGVzID0gKF9jaGlsZENvbnRleHRUeXBlcyA9IHt9LCBfY2hpbGRDb250ZXh0VHlwZXNbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfY2hpbGRDb250ZXh0VHlwZXMpO1xuXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwV2l0aENvbm5lY3QoV3JhcHBlZENvbXBvbmVudCkge1xuICAgIGludmFyaWFudCh0eXBlb2YgV3JhcHBlZENvbXBvbmVudCA9PSAnZnVuY3Rpb24nLCAnWW91IG11c3QgcGFzcyBhIGNvbXBvbmVudCB0byB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgYnkgJyArICgnY29ubmVjdC4gSW5zdGVhZCByZWNlaXZlZCAnICsgSlNPTi5zdHJpbmdpZnkoV3JhcHBlZENvbXBvbmVudCkpKTtcblxuICAgIHZhciB3cmFwcGVkQ29tcG9uZW50TmFtZSA9IFdyYXBwZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgV3JhcHBlZENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xuXG4gICAgdmFyIGRpc3BsYXlOYW1lID0gZ2V0RGlzcGxheU5hbWUod3JhcHBlZENvbXBvbmVudE5hbWUpO1xuXG4gICAgdmFyIHNlbGVjdG9yRmFjdG9yeU9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgY29ubmVjdE9wdGlvbnMsIHtcbiAgICAgIGdldERpc3BsYXlOYW1lOiBnZXREaXNwbGF5TmFtZSxcbiAgICAgIG1ldGhvZE5hbWU6IG1ldGhvZE5hbWUsXG4gICAgICByZW5kZXJDb3VudFByb3A6IHJlbmRlckNvdW50UHJvcCxcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlczogc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzLFxuICAgICAgc3RvcmVLZXk6IHN0b3JlS2V5LFxuICAgICAgd2l0aFJlZjogd2l0aFJlZixcbiAgICAgIGRpc3BsYXlOYW1lOiBkaXNwbGF5TmFtZSxcbiAgICAgIHdyYXBwZWRDb21wb25lbnROYW1lOiB3cmFwcGVkQ29tcG9uZW50TmFtZSxcbiAgICAgIFdyYXBwZWRDb21wb25lbnQ6IFdyYXBwZWRDb21wb25lbnRcbiAgICB9KTtcblxuICAgIHZhciBDb25uZWN0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICAgIGluaGVyaXRzKENvbm5lY3QsIF9Db21wb25lbnQpO1xuXG4gICAgICBmdW5jdGlvbiBDb25uZWN0KHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIENvbm5lY3QpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICAgICAgX3RoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgICAgIF90aGlzLnJlbmRlckNvdW50ID0gMDtcbiAgICAgICAgX3RoaXMuc3RvcmUgPSBwcm9wc1tzdG9yZUtleV0gfHwgY29udGV4dFtzdG9yZUtleV07XG4gICAgICAgIF90aGlzLnByb3BzTW9kZSA9IEJvb2xlYW4ocHJvcHNbc3RvcmVLZXldKTtcbiAgICAgICAgX3RoaXMuc2V0V3JhcHBlZEluc3RhbmNlID0gX3RoaXMuc2V0V3JhcHBlZEluc3RhbmNlLmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIGludmFyaWFudChfdGhpcy5zdG9yZSwgJ0NvdWxkIG5vdCBmaW5kIFwiJyArIHN0b3JlS2V5ICsgJ1wiIGluIGVpdGhlciB0aGUgY29udGV4dCBvciBwcm9wcyBvZiAnICsgKCdcIicgKyBkaXNwbGF5TmFtZSArICdcIi4gRWl0aGVyIHdyYXAgdGhlIHJvb3QgY29tcG9uZW50IGluIGEgPFByb3ZpZGVyPiwgJykgKyAoJ29yIGV4cGxpY2l0bHkgcGFzcyBcIicgKyBzdG9yZUtleSArICdcIiBhcyBhIHByb3AgdG8gXCInICsgZGlzcGxheU5hbWUgKyAnXCIuJykpO1xuXG4gICAgICAgIF90aGlzLmluaXRTZWxlY3RvcigpO1xuICAgICAgICBfdGhpcy5pbml0U3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgIH1cblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgICB2YXIgX3JlZjI7XG5cbiAgICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgcmVjZWl2ZWQgc3RvcmUgZnJvbSBwcm9wcywgaXRzIHN1YnNjcmlwdGlvbiBzaG91bGQgYmUgdHJhbnNwYXJlbnRcbiAgICAgICAgLy8gdG8gYW55IGRlc2NlbmRhbnRzIHJlY2VpdmluZyBzdG9yZStzdWJzY3JpcHRpb24gZnJvbSBjb250ZXh0OyBpdCBwYXNzZXMgYWxvbmdcbiAgICAgICAgLy8gc3Vic2NyaXB0aW9uIHBhc3NlZCB0byBpdC4gT3RoZXJ3aXNlLCBpdCBzaGFkb3dzIHRoZSBwYXJlbnQgc3Vic2NyaXB0aW9uLCB3aGljaCBhbGxvd3NcbiAgICAgICAgLy8gQ29ubmVjdCB0byBjb250cm9sIG9yZGVyaW5nIG9mIG5vdGlmaWNhdGlvbnMgdG8gZmxvdyB0b3AtZG93bi5cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMucHJvcHNNb2RlID8gbnVsbCA6IHRoaXMuc3Vic2NyaXB0aW9uO1xuICAgICAgICByZXR1cm4gX3JlZjIgPSB7fSwgX3JlZjJbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvbiB8fCB0aGlzLmNvbnRleHRbc3Vic2NyaXB0aW9uS2V5XSwgX3JlZjI7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAoIXNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykgcmV0dXJuO1xuXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudCBmaXJlcyBkdXJpbmcgc2VydmVyIHNpZGUgcmVuZGVyaW5nLCBidXQgY29tcG9uZW50RGlkTW91bnQgYW5kXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxVbm1vdW50IGRvIG5vdC4gQmVjYXVzZSBvZiB0aGlzLCB0cnlTdWJzY3JpYmUgaGFwcGVucyBkdXJpbmcgLi4uZGlkTW91bnQuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgdW5zdWJzY3JpcHRpb24gd291bGQgbmV2ZXIgdGFrZSBwbGFjZSBkdXJpbmcgU1NSLCBjYXVzaW5nIGEgbWVtb3J5IGxlYWsuXG4gICAgICAgIC8vIFRvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSBhIGNoaWxkIGNvbXBvbmVudCBtYXkgaGF2ZSB0cmlnZ2VyZWQgYSBzdGF0ZSBjaGFuZ2UgYnlcbiAgICAgICAgLy8gZGlzcGF0Y2hpbmcgYW4gYWN0aW9uIGluIGl0cyBjb21wb25lbnRXaWxsTW91bnQsIHdlIGhhdmUgdG8gcmUtcnVuIHRoZSBzZWxlY3QgYW5kIG1heWJlXG4gICAgICAgIC8vIHJlLXJlbmRlci5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5U3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUpIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bihuZXh0UHJvcHMpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGU7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzID0gbm9vcDtcbiAgICAgICAgdGhpcy5zdG9yZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuID0gbm9vcDtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmdldFdyYXBwZWRJbnN0YW5jZSA9IGZ1bmN0aW9uIGdldFdyYXBwZWRJbnN0YW5jZSgpIHtcbiAgICAgICAgaW52YXJpYW50KHdpdGhSZWYsICdUbyBhY2Nlc3MgdGhlIHdyYXBwZWQgaW5zdGFuY2UsIHlvdSBuZWVkIHRvIHNwZWNpZnkgJyArICgneyB3aXRoUmVmOiB0cnVlIH0gaW4gdGhlIG9wdGlvbnMgYXJndW1lbnQgb2YgdGhlICcgKyBtZXRob2ROYW1lICsgJygpIGNhbGwuJykpO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5zdGFuY2U7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5zZXRXcmFwcGVkSW5zdGFuY2UgPSBmdW5jdGlvbiBzZXRXcmFwcGVkSW5zdGFuY2UocmVmKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZEluc3RhbmNlID0gcmVmO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaW5pdFNlbGVjdG9yID0gZnVuY3Rpb24gaW5pdFNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgc291cmNlU2VsZWN0b3IgPSBzZWxlY3RvckZhY3RvcnkodGhpcy5zdG9yZS5kaXNwYXRjaCwgc2VsZWN0b3JGYWN0b3J5T3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBtYWtlU2VsZWN0b3JTdGF0ZWZ1bChzb3VyY2VTZWxlY3RvciwgdGhpcy5zdG9yZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaW5pdFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIGluaXRTdWJzY3JpcHRpb24oKSB7XG4gICAgICAgIGlmICghc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSByZXR1cm47XG5cbiAgICAgICAgLy8gcGFyZW50U3ViJ3Mgc291cmNlIHNob3VsZCBtYXRjaCB3aGVyZSBzdG9yZSBjYW1lIGZyb206IHByb3BzIHZzLiBjb250ZXh0LiBBIGNvbXBvbmVudFxuICAgICAgICAvLyBjb25uZWN0ZWQgdG8gdGhlIHN0b3JlIHZpYSBwcm9wcyBzaG91bGRuJ3QgdXNlIHN1YnNjcmlwdGlvbiBmcm9tIGNvbnRleHQsIG9yIHZpY2UgdmVyc2EuXG4gICAgICAgIHZhciBwYXJlbnRTdWIgPSAodGhpcy5wcm9wc01vZGUgPyB0aGlzLnByb3BzIDogdGhpcy5jb250ZXh0KVtzdWJzY3JpcHRpb25LZXldO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24odGhpcy5zdG9yZSwgcGFyZW50U3ViLCB0aGlzLm9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gYG5vdGlmeU5lc3RlZFN1YnNgIGlzIGR1cGxpY2F0ZWQgdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSBjb21wb25lbnQgaXMgIHVubW91bnRlZCBpblxuICAgICAgICAvLyB0aGUgbWlkZGxlIG9mIHRoZSBub3RpZmljYXRpb24gbG9vcCwgd2hlcmUgYHRoaXMuc3Vic2NyaXB0aW9uYCB3aWxsIHRoZW4gYmUgbnVsbC4gQW5cbiAgICAgICAgLy8gZXh0cmEgbnVsbCBjaGVjayBldmVyeSBjaGFuZ2UgY2FuIGJlIGF2b2lkZWQgYnkgY29weWluZyB0aGUgbWV0aG9kIG9udG8gYHRoaXNgIGFuZCB0aGVuXG4gICAgICAgIC8vIHJlcGxhY2luZyBpdCB3aXRoIGEgbm8tb3Agb24gdW5tb3VudC4gVGhpcyBjYW4gcHJvYmFibHkgYmUgYXZvaWRlZCBpZiBTdWJzY3JpcHRpb24nc1xuICAgICAgICAvLyBsaXN0ZW5lcnMgbG9naWMgaXMgY2hhbmdlZCB0byBub3QgY2FsbCBsaXN0ZW5lcnMgdGhhdCBoYXZlIGJlZW4gdW5zdWJzY3JpYmVkIGluIHRoZVxuICAgICAgICAvLyBtaWRkbGUgb2YgdGhlIG5vdGlmaWNhdGlvbiBsb29wLlxuICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMgPSB0aGlzLnN1YnNjcmlwdGlvbi5ub3RpZnlOZXN0ZWRTdWJzLmJpbmQodGhpcy5zdWJzY3JpcHRpb24pO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUub25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUpIHtcbiAgICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSA9IHRoaXMubm90aWZ5TmVzdGVkU3Vic09uQ29tcG9uZW50RGlkVXBkYXRlO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoZHVtbXlTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLm5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIG5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgLy8gYGNvbXBvbmVudERpZFVwZGF0ZWAgaXMgY29uZGl0aW9uYWxseSBpbXBsZW1lbnRlZCB3aGVuIGBvblN0YXRlQ2hhbmdlYCBkZXRlcm1pbmVzIGl0XG4gICAgICAgIC8vIG5lZWRzIHRvIG5vdGlmeSBuZXN0ZWQgc3Vicy4gT25jZSBjYWxsZWQsIGl0IHVuaW1wbGVtZW50cyBpdHNlbGYgdW50aWwgZnVydGhlciBzdGF0ZVxuICAgICAgICAvLyBjaGFuZ2VzIG9jY3VyLiBEb2luZyBpdCB0aGlzIHdheSB2cyBoYXZpbmcgYSBwZXJtYW5lbnQgYGNvbXBvbmVudERpZFVwZGF0ZWAgdGhhdCBkb2VzXG4gICAgICAgIC8vIGEgYm9vbGVhbiBjaGVjayBldmVyeSB0aW1lIGF2b2lkcyBhbiBleHRyYSBtZXRob2QgY2FsbCBtb3N0IG9mIHRoZSB0aW1lLCByZXN1bHRpbmdcbiAgICAgICAgLy8gaW4gc29tZSBwZXJmIGJvb3N0LlxuICAgICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5pc1N1YnNjcmliZWQgPSBmdW5jdGlvbiBpc1N1YnNjcmliZWQoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuc3Vic2NyaXB0aW9uKSAmJiB0aGlzLnN1YnNjcmlwdGlvbi5pc1N1YnNjcmliZWQoKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmFkZEV4dHJhUHJvcHMgPSBmdW5jdGlvbiBhZGRFeHRyYVByb3BzKHByb3BzKSB7XG4gICAgICAgIGlmICghd2l0aFJlZiAmJiAhcmVuZGVyQ291bnRQcm9wICYmICEodGhpcy5wcm9wc01vZGUgJiYgdGhpcy5zdWJzY3JpcHRpb24pKSByZXR1cm4gcHJvcHM7XG4gICAgICAgIC8vIG1ha2UgYSBzaGFsbG93IGNvcHkgc28gdGhhdCBmaWVsZHMgYWRkZWQgZG9uJ3QgbGVhayB0byB0aGUgb3JpZ2luYWwgc2VsZWN0b3IuXG4gICAgICAgIC8vIHRoaXMgaXMgZXNwZWNpYWxseSBpbXBvcnRhbnQgZm9yICdyZWYnIHNpbmNlIHRoYXQncyBhIHJlZmVyZW5jZSBiYWNrIHRvIHRoZSBjb21wb25lbnRcbiAgICAgICAgLy8gaW5zdGFuY2UuIGEgc2luZ2xldG9uIG1lbW9pemVkIHNlbGVjdG9yIHdvdWxkIHRoZW4gYmUgaG9sZGluZyBhIHJlZmVyZW5jZSB0byB0aGVcbiAgICAgICAgLy8gaW5zdGFuY2UsIHByZXZlbnRpbmcgdGhlIGluc3RhbmNlIGZyb20gYmVpbmcgZ2FyYmFnZSBjb2xsZWN0ZWQsIGFuZCB0aGF0IHdvdWxkIGJlIGJhZFxuICAgICAgICB2YXIgd2l0aEV4dHJhcyA9IF9leHRlbmRzKHt9LCBwcm9wcyk7XG4gICAgICAgIGlmICh3aXRoUmVmKSB3aXRoRXh0cmFzLnJlZiA9IHRoaXMuc2V0V3JhcHBlZEluc3RhbmNlO1xuICAgICAgICBpZiAocmVuZGVyQ291bnRQcm9wKSB3aXRoRXh0cmFzW3JlbmRlckNvdW50UHJvcF0gPSB0aGlzLnJlbmRlckNvdW50Kys7XG4gICAgICAgIGlmICh0aGlzLnByb3BzTW9kZSAmJiB0aGlzLnN1YnNjcmlwdGlvbikgd2l0aEV4dHJhc1tzdWJzY3JpcHRpb25LZXldID0gdGhpcy5zdWJzY3JpcHRpb247XG4gICAgICAgIHJldHVybiB3aXRoRXh0cmFzO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yO1xuICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IuZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBzZWxlY3Rvci5lcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcHJlYWN0LmgoV3JhcHBlZENvbXBvbmVudCwgdGhpcy5hZGRFeHRyYVByb3BzKHNlbGVjdG9yLnByb3BzKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb25uZWN0O1xuICAgIH0ocHJlYWN0LkNvbXBvbmVudCk7XG5cbiAgICBDb25uZWN0LldyYXBwZWRDb21wb25lbnQgPSBXcmFwcGVkQ29tcG9uZW50O1xuICAgIENvbm5lY3QuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgICBDb25uZWN0LmNoaWxkQ29udGV4dFR5cGVzID0gY2hpbGRDb250ZXh0VHlwZXM7XG4gICAgQ29ubmVjdC5jb250ZXh0VHlwZXMgPSBjb250ZXh0VHlwZXM7XG5cblxuICAgIHtcbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAvLyBXZSBhcmUgaG90IHJlbG9hZGluZyFcbiAgICAgICAgaWYgKHRoaXMudmVyc2lvbiAhPT0gdmVyc2lvbikge1xuICAgICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgICAgdGhpcy5pbml0U2VsZWN0b3IoKTtcblxuICAgICAgICAgIC8vIElmIGFueSBjb25uZWN0ZWQgZGVzY2VuZGFudHMgZG9uJ3QgaG90IHJlbG9hZCAoYW5kIHJlc3Vic2NyaWJlIGluIHRoZSBwcm9jZXNzKSwgdGhlaXJcbiAgICAgICAgICAvLyBsaXN0ZW5lcnMgd2lsbCBiZSBsb3N0IHdoZW4gd2UgdW5zdWJzY3JpYmUuIFVuZm9ydHVuYXRlbHksIGJ5IGNvcHlpbmcgb3ZlciBhbGxcbiAgICAgICAgICAvLyBsaXN0ZW5lcnMsIHRoaXMgZG9lcyBtZWFuIHRoYXQgdGhlIG9sZCB2ZXJzaW9ucyBvZiBjb25uZWN0ZWQgZGVzY2VuZGFudHMgd2lsbCBzdGlsbCBiZVxuICAgICAgICAgIC8vIG5vdGlmaWVkIG9mIHN0YXRlIGNoYW5nZXM7IGhvd2V2ZXIsIHRoZWlyIG9uU3RhdGVDaGFuZ2UgZnVuY3Rpb24gaXMgYSBuby1vcCBzbyB0aGlzXG4gICAgICAgICAgLy8gaXNuJ3QgYSBodWdlIGRlYWwuXG4gICAgICAgICAgdmFyIG9sZExpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBvbGRMaXN0ZW5lcnMgPSB0aGlzLnN1YnNjcmlwdGlvbi5saXN0ZW5lcnMuZ2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlVbnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmluaXRTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICBpZiAoc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlTdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIG9sZExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLnN1YnNjcmlwdGlvbi5saXN0ZW5lcnMuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaG9pc3ROb25SZWFjdFN0YXRpY3MoQ29ubmVjdCwgV3JhcHBlZENvbXBvbmVudCk7XG4gIH07XG59XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIGlmICh4ID09PSB5KSB7XG4gICAgcmV0dXJuIHggIT09IDAgfHwgeSAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaGFsbG93RXF1YWwob2JqQSwgb2JqQikge1xuICBpZiAoaXMob2JqQSwgb2JqQikpIHJldHVybiB0cnVlO1xuXG4gIGlmICgodHlwZW9mIG9iakEgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9iakEpKSAhPT0gJ29iamVjdCcgfHwgb2JqQSA9PT0gbnVsbCB8fCAodHlwZW9mIG9iakIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9iakIpKSAhPT0gJ29iamVjdCcgfHwgb2JqQiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKG9iakEpO1xuICB2YXIga2V5c0IgPSBPYmplY3Qua2V5cyhvYmpCKTtcblxuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzQi5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd24uY2FsbChvYmpCLCBrZXlzQVtpXSkgfHwgIWlzKG9iakFba2V5c0FbaV1dLCBvYmpCW2tleXNBW2ldXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gKHR5cGVvZiBnbG9iYWwgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGdsb2JhbCkpID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzZWxmKSkgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIF9TeW1ib2wgPSByb290LlN5bWJvbDtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvJDEgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSQxID0gb2JqZWN0UHJvdG8kMS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8kMS50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWckMSA9IF9TeW1ib2wgPyBfU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eSQxLmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnJDEpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWckMV07XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZyQxXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZyQxXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnJDFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8kMiA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyQxID0gb2JqZWN0UHJvdG8kMi50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZyQxLmNhbGwodmFsdWUpO1xufVxuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJztcbnZhciB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBfU3ltYm9sID8gX1N5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gICAgfVxuICAgIHJldHVybiBzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpID8gZ2V0UmF3VGFnKHZhbHVlKSA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09ICdvYmplY3QnO1xufVxuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IGJhc2VHZXRUYWcodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlQbGFpbk9iamVjdCh2YWx1ZSwgZGlzcGxheU5hbWUsIG1ldGhvZE5hbWUpIHtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgIHdhcm5pbmcobWV0aG9kTmFtZSArICcoKSBpbiAnICsgZGlzcGxheU5hbWUgKyAnIG11c3QgcmV0dXJuIGEgcGxhaW4gb2JqZWN0LiBJbnN0ZWFkIHJlY2VpdmVkICcgKyB2YWx1ZSArICcuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JhcE1hcFRvUHJvcHNDb25zdGFudChnZXRDb25zdGFudCkge1xuICByZXR1cm4gZnVuY3Rpb24gaW5pdENvbnN0YW50U2VsZWN0b3IoZGlzcGF0Y2gsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29uc3RhbnQgPSBnZXRDb25zdGFudChkaXNwYXRjaCwgb3B0aW9ucyk7XG5cbiAgICBmdW5jdGlvbiBjb25zdGFudFNlbGVjdG9yKCkge1xuICAgICAgcmV0dXJuIGNvbnN0YW50O1xuICAgIH1cbiAgICBjb25zdGFudFNlbGVjdG9yLmRlcGVuZHNPbk93blByb3BzID0gZmFsc2U7XG4gICAgcmV0dXJuIGNvbnN0YW50U2VsZWN0b3I7XG4gIH07XG59XG5cbi8vIGRlcGVuZHNPbk93blByb3BzIGlzIHVzZWQgYnkgY3JlYXRlTWFwVG9Qcm9wc1Byb3h5IHRvIGRldGVybWluZSB3aGV0aGVyIHRvIHBhc3MgcHJvcHMgYXMgYXJnc1xuLy8gdG8gdGhlIG1hcFRvUHJvcHMgZnVuY3Rpb24gYmVpbmcgd3JhcHBlZC4gSXQgaXMgYWxzbyB1c2VkIGJ5IG1ha2VQdXJlUHJvcHNTZWxlY3RvciB0byBkZXRlcm1pbmVcbi8vIHdoZXRoZXIgbWFwVG9Qcm9wcyBuZWVkcyB0byBiZSBpbnZva2VkIHdoZW4gcHJvcHMgaGF2ZSBjaGFuZ2VkLlxuLy8gXG4vLyBBIGxlbmd0aCBvZiBvbmUgc2lnbmFscyB0aGF0IG1hcFRvUHJvcHMgZG9lcyBub3QgZGVwZW5kIG9uIHByb3BzIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnQuXG4vLyBBIGxlbmd0aCBvZiB6ZXJvIGlzIGFzc3VtZWQgdG8gbWVhbiBtYXBUb1Byb3BzIGlzIGdldHRpbmcgYXJncyB2aWEgYXJndW1lbnRzIG9yIC4uLmFyZ3MgYW5kXG4vLyB0aGVyZWZvcmUgbm90IHJlcG9ydGluZyBpdHMgbGVuZ3RoIGFjY3VyYXRlbHkuLlxuZnVuY3Rpb24gZ2V0RGVwZW5kc09uT3duUHJvcHMobWFwVG9Qcm9wcykge1xuICByZXR1cm4gbWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcyAhPT0gbnVsbCAmJiBtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzICE9PSB1bmRlZmluZWQgPyBCb29sZWFuKG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIDogbWFwVG9Qcm9wcy5sZW5ndGggIT09IDE7XG59XG5cbi8vIFVzZWQgYnkgd2hlbk1hcFN0YXRlVG9Qcm9wc0lzRnVuY3Rpb24gYW5kIHdoZW5NYXBEaXNwYXRjaFRvUHJvcHNJc0Z1bmN0aW9uLFxuLy8gdGhpcyBmdW5jdGlvbiB3cmFwcyBtYXBUb1Byb3BzIGluIGEgcHJveHkgZnVuY3Rpb24gd2hpY2ggZG9lcyBzZXZlcmFsIHRoaW5nczpcbi8vIFxuLy8gICogRGV0ZWN0cyB3aGV0aGVyIHRoZSBtYXBUb1Byb3BzIGZ1bmN0aW9uIGJlaW5nIGNhbGxlZCBkZXBlbmRzIG9uIHByb3BzLCB3aGljaFxuLy8gICAgaXMgdXNlZCBieSBzZWxlY3RvckZhY3RvcnkgdG8gZGVjaWRlIGlmIGl0IHNob3VsZCByZWludm9rZSBvbiBwcm9wcyBjaGFuZ2VzLlxuLy8gICAgXG4vLyAgKiBPbiBmaXJzdCBjYWxsLCBoYW5kbGVzIG1hcFRvUHJvcHMgaWYgcmV0dXJucyBhbm90aGVyIGZ1bmN0aW9uLCBhbmQgdHJlYXRzIHRoYXRcbi8vICAgIG5ldyBmdW5jdGlvbiBhcyB0aGUgdHJ1ZSBtYXBUb1Byb3BzIGZvciBzdWJzZXF1ZW50IGNhbGxzLlxuLy8gICAgXG4vLyAgKiBPbiBmaXJzdCBjYWxsLCB2ZXJpZmllcyB0aGUgZmlyc3QgcmVzdWx0IGlzIGEgcGxhaW4gb2JqZWN0LCBpbiBvcmRlciB0byB3YXJuXG4vLyAgICB0aGUgZGV2ZWxvcGVyIHRoYXQgdGhlaXIgbWFwVG9Qcm9wcyBmdW5jdGlvbiBpcyBub3QgcmV0dXJuaW5nIGEgdmFsaWQgcmVzdWx0LlxuLy8gICAgXG5mdW5jdGlvbiB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwVG9Qcm9wcywgbWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gaW5pdFByb3h5U2VsZWN0b3IoZGlzcGF0Y2gsIF9yZWYpIHtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSBfcmVmLmRpc3BsYXlOYW1lO1xuXG4gICAgdmFyIHByb3h5ID0gZnVuY3Rpb24gbWFwVG9Qcm9wc1Byb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpIHtcbiAgICAgIHJldHVybiBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA/IHByb3h5Lm1hcFRvUHJvcHMoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykgOiBwcm94eS5tYXBUb1Byb3BzKHN0YXRlT3JEaXNwYXRjaCk7XG4gICAgfTtcblxuICAgIC8vIGFsbG93IGRldGVjdEZhY3RvcnlBbmRWZXJpZnkgdG8gZ2V0IG93blByb3BzXG4gICAgcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPSB0cnVlO1xuXG4gICAgcHJveHkubWFwVG9Qcm9wcyA9IGZ1bmN0aW9uIGRldGVjdEZhY3RvcnlBbmRWZXJpZnkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykge1xuICAgICAgcHJveHkubWFwVG9Qcm9wcyA9IG1hcFRvUHJvcHM7XG4gICAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IGdldERlcGVuZHNPbk93blByb3BzKG1hcFRvUHJvcHMpO1xuICAgICAgdmFyIHByb3BzID0gcHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICAgIGlmICh0eXBlb2YgcHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJveHkubWFwVG9Qcm9wcyA9IHByb3BzO1xuICAgICAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IGdldERlcGVuZHNPbk93blByb3BzKHByb3BzKTtcbiAgICAgICAgcHJvcHMgPSBwcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKTtcbiAgICAgIH1cblxuICAgICAgdmVyaWZ5UGxhaW5PYmplY3QocHJvcHMsIGRpc3BsYXlOYW1lLCBtZXRob2ROYW1lKTtcblxuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH07XG5cbiAgICByZXR1cm4gcHJveHk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdoZW5NYXBEaXNwYXRjaFRvUHJvcHNJc0Z1bmN0aW9uKG1hcERpc3BhdGNoVG9Qcm9wcykge1xuICByZXR1cm4gdHlwZW9mIG1hcERpc3BhdGNoVG9Qcm9wcyA9PT0gJ2Z1bmN0aW9uJyA/IHdyYXBNYXBUb1Byb3BzRnVuYyhtYXBEaXNwYXRjaFRvUHJvcHMsICdtYXBEaXNwYXRjaFRvUHJvcHMnKSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzTWlzc2luZyhtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuICFtYXBEaXNwYXRjaFRvUHJvcHMgPyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgIHJldHVybiB7IGRpc3BhdGNoOiBkaXNwYXRjaCB9O1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzT2JqZWN0KG1hcERpc3BhdGNoVG9Qcm9wcykge1xuICByZXR1cm4gbWFwRGlzcGF0Y2hUb1Byb3BzICYmICh0eXBlb2YgbWFwRGlzcGF0Y2hUb1Byb3BzID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihtYXBEaXNwYXRjaFRvUHJvcHMpKSA9PT0gJ29iamVjdCcgPyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgIHJldHVybiByZWR1eC5iaW5kQWN0aW9uQ3JlYXRvcnMobWFwRGlzcGF0Y2hUb1Byb3BzLCBkaXNwYXRjaCk7XG4gIH0pIDogdW5kZWZpbmVkO1xufVxuXG52YXIgZGVmYXVsdE1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA9IFt3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbiwgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzTWlzc2luZywgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzT2JqZWN0XTtcblxuZnVuY3Rpb24gd2hlbk1hcFN0YXRlVG9Qcm9wc0lzRnVuY3Rpb24obWFwU3RhdGVUb1Byb3BzKSB7XG4gIHJldHVybiB0eXBlb2YgbWFwU3RhdGVUb1Byb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1hcFRvUHJvcHNGdW5jKG1hcFN0YXRlVG9Qcm9wcywgJ21hcFN0YXRlVG9Qcm9wcycpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3aGVuTWFwU3RhdGVUb1Byb3BzSXNNaXNzaW5nKG1hcFN0YXRlVG9Qcm9wcykge1xuICByZXR1cm4gIW1hcFN0YXRlVG9Qcm9wcyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7fTtcbiAgfSkgOiB1bmRlZmluZWQ7XG59XG5cbnZhciBkZWZhdWx0TWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzID0gW3doZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwU3RhdGVUb1Byb3BzSXNNaXNzaW5nXTtcblxuZnVuY3Rpb24gZGVmYXVsdE1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpIHtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBvd25Qcm9wcywgc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcyk7XG59XG5cbmZ1bmN0aW9uIHdyYXBNZXJnZVByb3BzRnVuYyhtZXJnZVByb3BzKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0TWVyZ2VQcm9wc1Byb3h5KGRpc3BhdGNoLCBfcmVmKSB7XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gX3JlZi5kaXNwbGF5TmFtZSxcbiAgICAgICAgcHVyZSA9IF9yZWYucHVyZSxcbiAgICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbCA9IF9yZWYuYXJlTWVyZ2VkUHJvcHNFcXVhbDtcblxuICAgIHZhciBoYXNSdW5PbmNlID0gZmFsc2U7XG4gICAgdmFyIG1lcmdlZFByb3BzID0gdm9pZCAwO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlUHJvcHNQcm94eShzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICAgICAgdmFyIG5leHRNZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuXG4gICAgICBpZiAoaGFzUnVuT25jZSkge1xuICAgICAgICBpZiAoIXB1cmUgfHwgIWFyZU1lcmdlZFByb3BzRXF1YWwobmV4dE1lcmdlZFByb3BzLCBtZXJnZWRQcm9wcykpIG1lcmdlZFByb3BzID0gbmV4dE1lcmdlZFByb3BzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFzUnVuT25jZSA9IHRydWU7XG4gICAgICAgIG1lcmdlZFByb3BzID0gbmV4dE1lcmdlZFByb3BzO1xuXG4gICAgICAgIHZlcmlmeVBsYWluT2JqZWN0KG1lcmdlZFByb3BzLCBkaXNwbGF5TmFtZSwgJ21lcmdlUHJvcHMnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICAgIH07XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdoZW5NZXJnZVByb3BzSXNGdW5jdGlvbihtZXJnZVByb3BzKSB7XG4gIHJldHVybiB0eXBlb2YgbWVyZ2VQcm9wcyA9PT0gJ2Z1bmN0aW9uJyA/IHdyYXBNZXJnZVByb3BzRnVuYyhtZXJnZVByb3BzKSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gd2hlbk1lcmdlUHJvcHNJc09taXR0ZWQobWVyZ2VQcm9wcykge1xuICByZXR1cm4gIW1lcmdlUHJvcHMgPyBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNZXJnZVByb3BzO1xuICB9IDogdW5kZWZpbmVkO1xufVxuXG52YXIgZGVmYXVsdE1lcmdlUHJvcHNGYWN0b3JpZXMgPSBbd2hlbk1lcmdlUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWVyZ2VQcm9wc0lzT21pdHRlZF07XG5cbmZ1bmN0aW9uIHZlcmlmeShzZWxlY3RvciwgbWV0aG9kTmFtZSwgZGlzcGxheU5hbWUpIHtcbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCB2YWx1ZSBmb3IgJyArIG1ldGhvZE5hbWUgKyAnIGluICcgKyBkaXNwbGF5TmFtZSArICcuJyk7XG4gIH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ21hcFN0YXRlVG9Qcm9wcycgfHwgbWV0aG9kTmFtZSA9PT0gJ21hcERpc3BhdGNoVG9Qcm9wcycpIHtcbiAgICBpZiAoIXNlbGVjdG9yLmhhc093blByb3BlcnR5KCdkZXBlbmRzT25Pd25Qcm9wcycpKSB7XG4gICAgICB3YXJuaW5nKCdUaGUgc2VsZWN0b3IgZm9yICcgKyBtZXRob2ROYW1lICsgJyBvZiAnICsgZGlzcGxheU5hbWUgKyAnIGRpZCBub3Qgc3BlY2lmeSBhIHZhbHVlIGZvciBkZXBlbmRzT25Pd25Qcm9wcy4nKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmVyaWZ5U3Vic2VsZWN0b3JzKG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2ZXJpZnkobWFwU3RhdGVUb1Byb3BzLCAnbWFwU3RhdGVUb1Byb3BzJywgZGlzcGxheU5hbWUpO1xuICB2ZXJpZnkobWFwRGlzcGF0Y2hUb1Byb3BzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJywgZGlzcGxheU5hbWUpO1xuICB2ZXJpZnkobWVyZ2VQcm9wcywgJ21lcmdlUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG59XG5cbmZ1bmN0aW9uIGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbXB1cmVGaW5hbFByb3BzU2VsZWN0b3Ioc3RhdGUsIG93blByb3BzKSB7XG4gICAgcmV0dXJuIG1lcmdlUHJvcHMobWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyksIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpLCBvd25Qcm9wcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwYXRjaCwgX3JlZikge1xuICB2YXIgYXJlU3RhdGVzRXF1YWwgPSBfcmVmLmFyZVN0YXRlc0VxdWFsLFxuICAgICAgYXJlT3duUHJvcHNFcXVhbCA9IF9yZWYuYXJlT3duUHJvcHNFcXVhbCxcbiAgICAgIGFyZVN0YXRlUHJvcHNFcXVhbCA9IF9yZWYuYXJlU3RhdGVQcm9wc0VxdWFsO1xuXG4gIHZhciBoYXNSdW5BdExlYXN0T25jZSA9IGZhbHNlO1xuICB2YXIgc3RhdGUgPSB2b2lkIDA7XG4gIHZhciBvd25Qcm9wcyA9IHZvaWQgMDtcbiAgdmFyIHN0YXRlUHJvcHMgPSB2b2lkIDA7XG4gIHZhciBkaXNwYXRjaFByb3BzID0gdm9pZCAwO1xuICB2YXIgbWVyZ2VkUHJvcHMgPSB2b2lkIDA7XG5cbiAgZnVuY3Rpb24gaGFuZGxlRmlyc3RDYWxsKGZpcnN0U3RhdGUsIGZpcnN0T3duUHJvcHMpIHtcbiAgICBzdGF0ZSA9IGZpcnN0U3RhdGU7XG4gICAgb3duUHJvcHMgPSBmaXJzdE93blByb3BzO1xuICAgIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcbiAgICBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICBoYXNSdW5BdExlYXN0T25jZSA9IHRydWU7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3UHJvcHNBbmROZXdTdGF0ZSgpIHtcbiAgICBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG5cbiAgICBpZiAobWFwRGlzcGF0Y2hUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1Byb3BzKCkge1xuICAgIGlmIChtYXBTdGF0ZVRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcblxuICAgIGlmIChtYXBEaXNwYXRjaFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3U3RhdGUoKSB7XG4gICAgdmFyIG5leHRTdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG4gICAgdmFyIHN0YXRlUHJvcHNDaGFuZ2VkID0gIWFyZVN0YXRlUHJvcHNFcXVhbChuZXh0U3RhdGVQcm9wcywgc3RhdGVQcm9wcyk7XG4gICAgc3RhdGVQcm9wcyA9IG5leHRTdGF0ZVByb3BzO1xuXG4gICAgaWYgKHN0YXRlUHJvcHNDaGFuZ2VkKSBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuXG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlU3Vic2VxdWVudENhbGxzKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKSB7XG4gICAgdmFyIHByb3BzQ2hhbmdlZCA9ICFhcmVPd25Qcm9wc0VxdWFsKG5leHRPd25Qcm9wcywgb3duUHJvcHMpO1xuICAgIHZhciBzdGF0ZUNoYW5nZWQgPSAhYXJlU3RhdGVzRXF1YWwobmV4dFN0YXRlLCBzdGF0ZSk7XG4gICAgc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgb3duUHJvcHMgPSBuZXh0T3duUHJvcHM7XG5cbiAgICBpZiAocHJvcHNDaGFuZ2VkICYmIHN0YXRlQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1Byb3BzQW5kTmV3U3RhdGUoKTtcbiAgICBpZiAocHJvcHNDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3UHJvcHMoKTtcbiAgICBpZiAoc3RhdGVDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3U3RhdGUoKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykge1xuICAgIHJldHVybiBoYXNSdW5BdExlYXN0T25jZSA/IGhhbmRsZVN1YnNlcXVlbnRDYWxscyhuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgOiBoYW5kbGVGaXJzdENhbGwobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpO1xuICB9O1xufVxuXG4vLyBUT0RPOiBBZGQgbW9yZSBjb21tZW50c1xuXG4vLyBJZiBwdXJlIGlzIHRydWUsIHRoZSBzZWxlY3RvciByZXR1cm5lZCBieSBzZWxlY3RvckZhY3Rvcnkgd2lsbCBtZW1vaXplIGl0cyByZXN1bHRzLFxuLy8gYWxsb3dpbmcgY29ubmVjdEFkdmFuY2VkJ3Mgc2hvdWxkQ29tcG9uZW50VXBkYXRlIHRvIHJldHVybiBmYWxzZSBpZiBmaW5hbFxuLy8gcHJvcHMgaGF2ZSBub3QgY2hhbmdlZC4gSWYgZmFsc2UsIHRoZSBzZWxlY3RvciB3aWxsIGFsd2F5cyByZXR1cm4gYSBuZXdcbi8vIG9iamVjdCBhbmQgc2hvdWxkQ29tcG9uZW50VXBkYXRlIHdpbGwgYWx3YXlzIHJldHVybiB0cnVlLlxuXG5mdW5jdGlvbiBmaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5KGRpc3BhdGNoLCBfcmVmMikge1xuICB2YXIgaW5pdE1hcFN0YXRlVG9Qcm9wcyA9IF9yZWYyLmluaXRNYXBTdGF0ZVRvUHJvcHMsXG4gICAgICBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzID0gX3JlZjIuaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgICAgIGluaXRNZXJnZVByb3BzID0gX3JlZjIuaW5pdE1lcmdlUHJvcHMsXG4gICAgICBvcHRpb25zID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIsIFsnaW5pdE1hcFN0YXRlVG9Qcm9wcycsICdpbml0TWFwRGlzcGF0Y2hUb1Byb3BzJywgJ2luaXRNZXJnZVByb3BzJ10pO1xuXG4gIHZhciBtYXBTdGF0ZVRvUHJvcHMgPSBpbml0TWFwU3RhdGVUb1Byb3BzKGRpc3BhdGNoLCBvcHRpb25zKTtcbiAgdmFyIG1hcERpc3BhdGNoVG9Qcm9wcyA9IGluaXRNYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuICB2YXIgbWVyZ2VQcm9wcyA9IGluaXRNZXJnZVByb3BzKGRpc3BhdGNoLCBvcHRpb25zKTtcblxuICB7XG4gICAgdmVyaWZ5U3Vic2VsZWN0b3JzKG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBvcHRpb25zLmRpc3BsYXlOYW1lKTtcbiAgfVxuXG4gIHZhciBzZWxlY3RvckZhY3RvcnkgPSBvcHRpb25zLnB1cmUgPyBwdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeSA6IGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3Rvcnk7XG5cbiAgcmV0dXJuIHNlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gsIG9wdGlvbnMpO1xufVxuXG4vKlxuICBjb25uZWN0IGlzIGEgZmFjYWRlIG92ZXIgY29ubmVjdEFkdmFuY2VkLiBJdCB0dXJucyBpdHMgYXJncyBpbnRvIGEgY29tcGF0aWJsZVxuICBzZWxlY3RvckZhY3RvcnksIHdoaWNoIGhhcyB0aGUgc2lnbmF0dXJlOlxuXG4gICAgKGRpc3BhdGNoLCBvcHRpb25zKSA9PiAobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpID0+IG5leHRGaW5hbFByb3BzXG4gIFxuICBjb25uZWN0IHBhc3NlcyBpdHMgYXJncyB0byBjb25uZWN0QWR2YW5jZWQgYXMgb3B0aW9ucywgd2hpY2ggd2lsbCBpbiB0dXJuIHBhc3MgdGhlbSB0b1xuICBzZWxlY3RvckZhY3RvcnkgZWFjaCB0aW1lIGEgQ29ubmVjdCBjb21wb25lbnQgaW5zdGFuY2UgaXMgaW5zdGFudGlhdGVkIG9yIGhvdCByZWxvYWRlZC5cblxuICBzZWxlY3RvckZhY3RvcnkgcmV0dXJucyBhIGZpbmFsIHByb3BzIHNlbGVjdG9yIGZyb20gaXRzIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcywgbWVyZ2VQcm9wcyxcbiAgbWVyZ2VQcm9wc0ZhY3RvcmllcywgYW5kIHB1cmUgYXJncy5cblxuICBUaGUgcmVzdWx0aW5nIGZpbmFsIHByb3BzIHNlbGVjdG9yIGlzIGNhbGxlZCBieSB0aGUgQ29ubmVjdCBjb21wb25lbnQgaW5zdGFuY2Ugd2hlbmV2ZXJcbiAgaXQgcmVjZWl2ZXMgbmV3IHByb3BzIG9yIHN0b3JlIHN0YXRlLlxuICovXG5cbmZ1bmN0aW9uIG1hdGNoKGFyZywgZmFjdG9yaWVzLCBuYW1lKSB7XG4gIGZvciAodmFyIGkgPSBmYWN0b3JpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcmVzdWx0ID0gZmFjdG9yaWVzW2ldKGFyZyk7XG4gICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gsIG9wdGlvbnMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgb2YgdHlwZSAnICsgKHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGFyZykpICsgJyBmb3IgJyArIG5hbWUgKyAnIGFyZ3VtZW50IHdoZW4gY29ubmVjdGluZyBjb21wb25lbnQgJyArIG9wdGlvbnMud3JhcHBlZENvbXBvbmVudE5hbWUgKyAnLicpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHJpY3RFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhID09PSBiO1xufVxuXG4vLyBjcmVhdGVDb25uZWN0IHdpdGggZGVmYXVsdCBhcmdzIGJ1aWxkcyB0aGUgJ29mZmljaWFsJyBjb25uZWN0IGJlaGF2aW9yLiBDYWxsaW5nIGl0IHdpdGhcbi8vIGRpZmZlcmVudCBvcHRpb25zIG9wZW5zIHVwIHNvbWUgdGVzdGluZyBhbmQgZXh0ZW5zaWJpbGl0eSBzY2VuYXJpb3NcbmZ1bmN0aW9uIGNyZWF0ZUNvbm5lY3QoKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWYkY29ubmVjdEhPQyA9IF9yZWYuY29ubmVjdEhPQyxcbiAgICAgIGNvbm5lY3RIT0MgPSBfcmVmJGNvbm5lY3RIT0MgPT09IHVuZGVmaW5lZCA/IGNvbm5lY3RBZHZhbmNlZCA6IF9yZWYkY29ubmVjdEhPQyxcbiAgICAgIF9yZWYkbWFwU3RhdGVUb1Byb3BzRiA9IF9yZWYubWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzLFxuICAgICAgbWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzID0gX3JlZiRtYXBTdGF0ZVRvUHJvcHNGID09PSB1bmRlZmluZWQgPyBkZWZhdWx0TWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzIDogX3JlZiRtYXBTdGF0ZVRvUHJvcHNGLFxuICAgICAgX3JlZiRtYXBEaXNwYXRjaFRvUHJvID0gX3JlZi5tYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMsXG4gICAgICBtYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1hcERpc3BhdGNoVG9Qcm8gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1hcERpc3BhdGNoVG9Qcm8sXG4gICAgICBfcmVmJG1lcmdlUHJvcHNGYWN0b3IgPSBfcmVmLm1lcmdlUHJvcHNGYWN0b3JpZXMsXG4gICAgICBtZXJnZVByb3BzRmFjdG9yaWVzID0gX3JlZiRtZXJnZVByb3BzRmFjdG9yID09PSB1bmRlZmluZWQgPyBkZWZhdWx0TWVyZ2VQcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWVyZ2VQcm9wc0ZhY3RvcixcbiAgICAgIF9yZWYkc2VsZWN0b3JGYWN0b3J5ID0gX3JlZi5zZWxlY3RvckZhY3RvcnksXG4gICAgICBzZWxlY3RvckZhY3RvcnkgPSBfcmVmJHNlbGVjdG9yRmFjdG9yeSA9PT0gdW5kZWZpbmVkID8gZmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeSA6IF9yZWYkc2VsZWN0b3JGYWN0b3J5O1xuXG4gIHJldHVybiBmdW5jdGlvbiBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzKSB7XG4gICAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7fTtcblxuICAgIHZhciBfcmVmMiRwdXJlID0gX3JlZjIucHVyZSxcbiAgICAgICAgcHVyZSA9IF9yZWYyJHB1cmUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMiRwdXJlLFxuICAgICAgICBfcmVmMiRhcmVTdGF0ZXNFcXVhbCA9IF9yZWYyLmFyZVN0YXRlc0VxdWFsLFxuICAgICAgICBhcmVTdGF0ZXNFcXVhbCA9IF9yZWYyJGFyZVN0YXRlc0VxdWFsID09PSB1bmRlZmluZWQgPyBzdHJpY3RFcXVhbCA6IF9yZWYyJGFyZVN0YXRlc0VxdWFsLFxuICAgICAgICBfcmVmMiRhcmVPd25Qcm9wc0VxdWEgPSBfcmVmMi5hcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgICBhcmVPd25Qcm9wc0VxdWFsID0gX3JlZjIkYXJlT3duUHJvcHNFcXVhID09PSB1bmRlZmluZWQgPyBzaGFsbG93RXF1YWwgOiBfcmVmMiRhcmVPd25Qcm9wc0VxdWEsXG4gICAgICAgIF9yZWYyJGFyZVN0YXRlUHJvcHNFcSA9IF9yZWYyLmFyZVN0YXRlUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsID0gX3JlZjIkYXJlU3RhdGVQcm9wc0VxID09PSB1bmRlZmluZWQgPyBzaGFsbG93RXF1YWwgOiBfcmVmMiRhcmVTdGF0ZVByb3BzRXEsXG4gICAgICAgIF9yZWYyJGFyZU1lcmdlZFByb3BzRSA9IF9yZWYyLmFyZU1lcmdlZFByb3BzRXF1YWwsXG4gICAgICAgIGFyZU1lcmdlZFByb3BzRXF1YWwgPSBfcmVmMiRhcmVNZXJnZWRQcm9wc0UgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZU1lcmdlZFByb3BzRSxcbiAgICAgICAgZXh0cmFPcHRpb25zID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIsIFsncHVyZScsICdhcmVTdGF0ZXNFcXVhbCcsICdhcmVPd25Qcm9wc0VxdWFsJywgJ2FyZVN0YXRlUHJvcHNFcXVhbCcsICdhcmVNZXJnZWRQcm9wc0VxdWFsJ10pO1xuXG4gICAgdmFyIGluaXRNYXBTdGF0ZVRvUHJvcHMgPSBtYXRjaChtYXBTdGF0ZVRvUHJvcHMsIG1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcywgJ21hcFN0YXRlVG9Qcm9wcycpO1xuICAgIHZhciBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzID0gbWF0Y2gobWFwRGlzcGF0Y2hUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMsICdtYXBEaXNwYXRjaFRvUHJvcHMnKTtcbiAgICB2YXIgaW5pdE1lcmdlUHJvcHMgPSBtYXRjaChtZXJnZVByb3BzLCBtZXJnZVByb3BzRmFjdG9yaWVzLCAnbWVyZ2VQcm9wcycpO1xuXG4gICAgcmV0dXJuIGNvbm5lY3RIT0Moc2VsZWN0b3JGYWN0b3J5LCBfZXh0ZW5kcyh7XG4gICAgICAvLyB1c2VkIGluIGVycm9yIG1lc3NhZ2VzXG4gICAgICBtZXRob2ROYW1lOiAnY29ubmVjdCcsXG5cbiAgICAgIC8vIHVzZWQgdG8gY29tcHV0ZSBDb25uZWN0J3MgZGlzcGxheU5hbWUgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnQncyBkaXNwbGF5TmFtZS5cbiAgICAgIGdldERpc3BsYXlOYW1lOiBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZShuYW1lKSB7XG4gICAgICAgIHJldHVybiAnQ29ubmVjdCgnICsgbmFtZSArICcpJztcbiAgICAgIH0sXG5cbiAgICAgIC8vIGlmIG1hcFN0YXRlVG9Qcm9wcyBpcyBmYWxzeSwgdGhlIENvbm5lY3QgY29tcG9uZW50IGRvZXNuJ3Qgc3Vic2NyaWJlIHRvIHN0b3JlIHN0YXRlIGNoYW5nZXNcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlczogQm9vbGVhbihtYXBTdGF0ZVRvUHJvcHMpLFxuXG4gICAgICAvLyBwYXNzZWQgdGhyb3VnaCB0byBzZWxlY3RvckZhY3RvcnlcbiAgICAgIGluaXRNYXBTdGF0ZVRvUHJvcHM6IGluaXRNYXBTdGF0ZVRvUHJvcHMsXG4gICAgICBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzOiBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzLFxuICAgICAgaW5pdE1lcmdlUHJvcHM6IGluaXRNZXJnZVByb3BzLFxuICAgICAgcHVyZTogcHVyZSxcbiAgICAgIGFyZVN0YXRlc0VxdWFsOiBhcmVTdGF0ZXNFcXVhbCxcbiAgICAgIGFyZU93blByb3BzRXF1YWw6IGFyZU93blByb3BzRXF1YWwsXG4gICAgICBhcmVTdGF0ZVByb3BzRXF1YWw6IGFyZVN0YXRlUHJvcHNFcXVhbCxcbiAgICAgIGFyZU1lcmdlZFByb3BzRXF1YWw6IGFyZU1lcmdlZFByb3BzRXF1YWxcblxuICAgIH0sIGV4dHJhT3B0aW9ucykpO1xuICB9O1xufVxuXG52YXIgY29ubmVjdCA9IGNyZWF0ZUNvbm5lY3QoKTtcblxudmFyIGluZGV4ID0geyBQcm92aWRlcjogUHJvdmlkZXIsIGNvbm5lY3Q6IGNvbm5lY3QsIGNvbm5lY3RBZHZhbmNlZDogY29ubmVjdEFkdmFuY2VkIH07XG5cbnJldHVybiBpbmRleDtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC1yZWR1eC5qcy5tYXBcbiIsIiFmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZnVuY3Rpb24gVk5vZGUoKSB7fVxuICAgIGZ1bmN0aW9uIGgobm9kZU5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGxhc3RTaW1wbGUsIGNoaWxkLCBzaW1wbGUsIGksIGNoaWxkcmVuID0gRU1QVFlfQ0hJTERSRU47XG4gICAgICAgIGZvciAoaSA9IGFyZ3VtZW50cy5sZW5ndGg7IGktLSA+IDI7ICkgc3RhY2sucHVzaChhcmd1bWVudHNbaV0pO1xuICAgICAgICBpZiAoYXR0cmlidXRlcyAmJiBudWxsICE9IGF0dHJpYnV0ZXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICghc3RhY2subGVuZ3RoKSBzdGFjay5wdXNoKGF0dHJpYnV0ZXMuY2hpbGRyZW4pO1xuICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXMuY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkgaWYgKChjaGlsZCA9IHN0YWNrLnBvcCgpKSAmJiB2b2lkIDAgIT09IGNoaWxkLnBvcCkgZm9yIChpID0gY2hpbGQubGVuZ3RoOyBpLS07ICkgc3RhY2sucHVzaChjaGlsZFtpXSk7IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgY2hpbGQpIGNoaWxkID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChzaW1wbGUgPSAnZnVuY3Rpb24nICE9IHR5cGVvZiBub2RlTmFtZSkgaWYgKG51bGwgPT0gY2hpbGQpIGNoaWxkID0gJyc7IGVsc2UgaWYgKCdudW1iZXInID09IHR5cGVvZiBjaGlsZCkgY2hpbGQgPSBTdHJpbmcoY2hpbGQpOyBlbHNlIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgY2hpbGQpIHNpbXBsZSA9ICExO1xuICAgICAgICAgICAgaWYgKHNpbXBsZSAmJiBsYXN0U2ltcGxlKSBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSArPSBjaGlsZDsgZWxzZSBpZiAoY2hpbGRyZW4gPT09IEVNUFRZX0NISUxEUkVOKSBjaGlsZHJlbiA9IFsgY2hpbGQgXTsgZWxzZSBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIGxhc3RTaW1wbGUgPSBzaW1wbGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHAgPSBuZXcgVk5vZGUoKTtcbiAgICAgICAgcC5ub2RlTmFtZSA9IG5vZGVOYW1lO1xuICAgICAgICBwLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgIHAuYXR0cmlidXRlcyA9IG51bGwgPT0gYXR0cmlidXRlcyA/IHZvaWQgMCA6IGF0dHJpYnV0ZXM7XG4gICAgICAgIHAua2V5ID0gbnVsbCA9PSBhdHRyaWJ1dGVzID8gdm9pZCAwIDogYXR0cmlidXRlcy5rZXk7XG4gICAgICAgIGlmICh2b2lkIDAgIT09IG9wdGlvbnMudm5vZGUpIG9wdGlvbnMudm5vZGUocCk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHRlbmQob2JqLCBwcm9wcykge1xuICAgICAgICBmb3IgKHZhciBpIGluIHByb3BzKSBvYmpbaV0gPSBwcm9wc1tpXTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xvbmVFbGVtZW50KHZub2RlLCBwcm9wcykge1xuICAgICAgICByZXR1cm4gaCh2bm9kZS5ub2RlTmFtZSwgZXh0ZW5kKGV4dGVuZCh7fSwgdm5vZGUuYXR0cmlidXRlcyksIHByb3BzKSwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiB2bm9kZS5jaGlsZHJlbik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVucXVldWVSZW5kZXIoY29tcG9uZW50KSB7XG4gICAgICAgIGlmICghY29tcG9uZW50Ll9fZCAmJiAoY29tcG9uZW50Ll9fZCA9ICEwKSAmJiAxID09IGl0ZW1zLnB1c2goY29tcG9uZW50KSkgKG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmcgfHwgZGVmZXIpKHJlcmVuZGVyKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVyZW5kZXIoKSB7XG4gICAgICAgIHZhciBwLCBsaXN0ID0gaXRlbXM7XG4gICAgICAgIGl0ZW1zID0gW107XG4gICAgICAgIHdoaWxlIChwID0gbGlzdC5wb3AoKSkgaWYgKHAuX19kKSByZW5kZXJDb21wb25lbnQocCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzU2FtZU5vZGVUeXBlKG5vZGUsIHZub2RlLCBoeWRyYXRpbmcpIHtcbiAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB2bm9kZSB8fCAnbnVtYmVyJyA9PSB0eXBlb2Ygdm5vZGUpIHJldHVybiB2b2lkIDAgIT09IG5vZGUuc3BsaXRUZXh0O1xuICAgICAgICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHZub2RlLm5vZGVOYW1lKSByZXR1cm4gIW5vZGUuX2NvbXBvbmVudENvbnN0cnVjdG9yICYmIGlzTmFtZWROb2RlKG5vZGUsIHZub2RlLm5vZGVOYW1lKTsgZWxzZSByZXR1cm4gaHlkcmF0aW5nIHx8IG5vZGUuX2NvbXBvbmVudENvbnN0cnVjdG9yID09PSB2bm9kZS5ub2RlTmFtZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNOYW1lZE5vZGUobm9kZSwgbm9kZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuX19uID09PSBub2RlTmFtZSB8fCBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldE5vZGVQcm9wcyh2bm9kZSkge1xuICAgICAgICB2YXIgcHJvcHMgPSBleHRlbmQoe30sIHZub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICB2YXIgZGVmYXVsdFByb3BzID0gdm5vZGUubm9kZU5hbWUuZGVmYXVsdFByb3BzO1xuICAgICAgICBpZiAodm9pZCAwICE9PSBkZWZhdWx0UHJvcHMpIGZvciAodmFyIGkgaW4gZGVmYXVsdFByb3BzKSBpZiAodm9pZCAwID09PSBwcm9wc1tpXSkgcHJvcHNbaV0gPSBkZWZhdWx0UHJvcHNbaV07XG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlTm9kZShub2RlTmFtZSwgaXNTdmcpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBpc1N2ZyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBub2RlTmFtZSkgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGVOYW1lKTtcbiAgICAgICAgbm9kZS5fX24gPSBub2RlTmFtZTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSkge1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGUpIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldEFjY2Vzc29yKG5vZGUsIG5hbWUsIG9sZCwgdmFsdWUsIGlzU3ZnKSB7XG4gICAgICAgIGlmICgnY2xhc3NOYW1lJyA9PT0gbmFtZSkgbmFtZSA9ICdjbGFzcyc7XG4gICAgICAgIGlmICgna2V5JyA9PT0gbmFtZSkgOyBlbHNlIGlmICgncmVmJyA9PT0gbmFtZSkge1xuICAgICAgICAgICAgaWYgKG9sZCkgb2xkKG51bGwpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB2YWx1ZShub2RlKTtcbiAgICAgICAgfSBlbHNlIGlmICgnY2xhc3MnID09PSBuYW1lICYmICFpc1N2Zykgbm9kZS5jbGFzc05hbWUgPSB2YWx1ZSB8fCAnJzsgZWxzZSBpZiAoJ3N0eWxlJyA9PT0gbmFtZSkge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCAnc3RyaW5nJyA9PSB0eXBlb2YgdmFsdWUgfHwgJ3N0cmluZycgPT0gdHlwZW9mIG9sZCkgbm9kZS5zdHlsZS5jc3NUZXh0ID0gdmFsdWUgfHwgJyc7XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgJ29iamVjdCcgPT0gdHlwZW9mIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiBvbGQpIGZvciAodmFyIGkgaW4gb2xkKSBpZiAoIShpIGluIHZhbHVlKSkgbm9kZS5zdHlsZVtpXSA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdmFsdWUpIG5vZGUuc3R5bGVbaV0gPSAnbnVtYmVyJyA9PSB0eXBlb2YgdmFsdWVbaV0gJiYgITEgPT09IElTX05PTl9ESU1FTlNJT05BTC50ZXN0KGkpID8gdmFsdWVbaV0gKyAncHgnIDogdmFsdWVbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJyA9PT0gbmFtZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSBub2RlLmlubmVySFRNTCA9IHZhbHVlLl9faHRtbCB8fCAnJztcbiAgICAgICAgfSBlbHNlIGlmICgnbycgPT0gbmFtZVswXSAmJiAnbicgPT0gbmFtZVsxXSkge1xuICAgICAgICAgICAgdmFyIHVzZUNhcHR1cmUgPSBuYW1lICE9PSAobmFtZSA9IG5hbWUucmVwbGFjZSgvQ2FwdHVyZSQvLCAnJykpO1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5zdWJzdHJpbmcoMik7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9sZCkgbm9kZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50UHJveHksIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgfSBlbHNlIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudFByb3h5LCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgIChub2RlLl9fbCB8fCAobm9kZS5fX2wgPSB7fSkpW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2xpc3QnICE9PSBuYW1lICYmICd0eXBlJyAhPT0gbmFtZSAmJiAhaXNTdmcgJiYgbmFtZSBpbiBub2RlKSB7XG4gICAgICAgICAgICBzZXRQcm9wZXJ0eShub2RlLCBuYW1lLCBudWxsID09IHZhbHVlID8gJycgOiB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSB2YWx1ZSB8fCAhMSA9PT0gdmFsdWUpIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5zID0gaXNTdmcgJiYgbmFtZSAhPT0gKG5hbWUgPSBuYW1lLnJlcGxhY2UoL154bGluazo/LywgJycpKTtcbiAgICAgICAgICAgIGlmIChudWxsID09IHZhbHVlIHx8ICExID09PSB2YWx1ZSkgaWYgKG5zKSBub2RlLnJlbW92ZUF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgbmFtZS50b0xvd2VyQ2FzZSgpKTsgZWxzZSBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgZWxzZSBpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgdmFsdWUpIGlmIChucykgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIG5hbWUudG9Mb3dlckNhc2UoKSwgdmFsdWUpOyBlbHNlIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQcm9wZXJ0eShub2RlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm9kZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cbiAgICBmdW5jdGlvbiBldmVudFByb3h5KGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19sW2UudHlwZV0ob3B0aW9ucy5ldmVudCAmJiBvcHRpb25zLmV2ZW50KGUpIHx8IGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmbHVzaE1vdW50cygpIHtcbiAgICAgICAgdmFyIGM7XG4gICAgICAgIHdoaWxlIChjID0gbW91bnRzLnBvcCgpKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5hZnRlck1vdW50KSBvcHRpb25zLmFmdGVyTW91bnQoYyk7XG4gICAgICAgICAgICBpZiAoYy5jb21wb25lbnREaWRNb3VudCkgYy5jb21wb25lbnREaWRNb3VudCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpZmYoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwsIHBhcmVudCwgY29tcG9uZW50Um9vdCkge1xuICAgICAgICBpZiAoIWRpZmZMZXZlbCsrKSB7XG4gICAgICAgICAgICBpc1N2Z01vZGUgPSBudWxsICE9IHBhcmVudCAmJiB2b2lkIDAgIT09IHBhcmVudC5vd25lclNWR0VsZW1lbnQ7XG4gICAgICAgICAgICBoeWRyYXRpbmcgPSBudWxsICE9IGRvbSAmJiAhKCdfX3ByZWFjdGF0dHJfJyBpbiBkb20pO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQgPSBpZGlmZihkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCwgY29tcG9uZW50Um9vdCk7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgcmV0LnBhcmVudE5vZGUgIT09IHBhcmVudCkgcGFyZW50LmFwcGVuZENoaWxkKHJldCk7XG4gICAgICAgIGlmICghLS1kaWZmTGV2ZWwpIHtcbiAgICAgICAgICAgIGh5ZHJhdGluZyA9ICExO1xuICAgICAgICAgICAgaWYgKCFjb21wb25lbnRSb290KSBmbHVzaE1vdW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlkaWZmKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsLCBjb21wb25lbnRSb290KSB7XG4gICAgICAgIHZhciBvdXQgPSBkb20sIHByZXZTdmdNb2RlID0gaXNTdmdNb2RlO1xuICAgICAgICBpZiAobnVsbCA9PSB2bm9kZSB8fCAnYm9vbGVhbicgPT0gdHlwZW9mIHZub2RlKSB2bm9kZSA9ICcnO1xuICAgICAgICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHZub2RlIHx8ICdudW1iZXInID09IHR5cGVvZiB2bm9kZSkge1xuICAgICAgICAgICAgaWYgKGRvbSAmJiB2b2lkIDAgIT09IGRvbS5zcGxpdFRleHQgJiYgZG9tLnBhcmVudE5vZGUgJiYgKCFkb20uX2NvbXBvbmVudCB8fCBjb21wb25lbnRSb290KSkge1xuICAgICAgICAgICAgICAgIGlmIChkb20ubm9kZVZhbHVlICE9IHZub2RlKSBkb20ubm9kZVZhbHVlID0gdm5vZGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoZG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb20ucGFyZW50Tm9kZSkgZG9tLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG91dCwgZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgcmVjb2xsZWN0Tm9kZVRyZWUoZG9tLCAhMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0Ll9fcHJlYWN0YXR0cl8gPSAhMDtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZub2RlTmFtZSA9IHZub2RlLm5vZGVOYW1lO1xuICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygdm5vZGVOYW1lKSByZXR1cm4gYnVpbGRDb21wb25lbnRGcm9tVk5vZGUoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwpO1xuICAgICAgICBpc1N2Z01vZGUgPSAnc3ZnJyA9PT0gdm5vZGVOYW1lID8gITAgOiAnZm9yZWlnbk9iamVjdCcgPT09IHZub2RlTmFtZSA/ICExIDogaXNTdmdNb2RlO1xuICAgICAgICB2bm9kZU5hbWUgPSBTdHJpbmcodm5vZGVOYW1lKTtcbiAgICAgICAgaWYgKCFkb20gfHwgIWlzTmFtZWROb2RlKGRvbSwgdm5vZGVOYW1lKSkge1xuICAgICAgICAgICAgb3V0ID0gY3JlYXRlTm9kZSh2bm9kZU5hbWUsIGlzU3ZnTW9kZSk7XG4gICAgICAgICAgICBpZiAoZG9tKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGRvbS5maXJzdENoaWxkKSBvdXQuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChkb20ucGFyZW50Tm9kZSkgZG9tLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG91dCwgZG9tKTtcbiAgICAgICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShkb20sICEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZmMgPSBvdXQuZmlyc3RDaGlsZCwgcHJvcHMgPSBvdXQuX19wcmVhY3RhdHRyXywgdmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChudWxsID09IHByb3BzKSB7XG4gICAgICAgICAgICBwcm9wcyA9IG91dC5fX3ByZWFjdGF0dHJfID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBhID0gb3V0LmF0dHJpYnV0ZXMsIGkgPSBhLmxlbmd0aDsgaS0tOyApIHByb3BzW2FbaV0ubmFtZV0gPSBhW2ldLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaHlkcmF0aW5nICYmIHZjaGlsZHJlbiAmJiAxID09PSB2Y2hpbGRyZW4ubGVuZ3RoICYmICdzdHJpbmcnID09IHR5cGVvZiB2Y2hpbGRyZW5bMF0gJiYgbnVsbCAhPSBmYyAmJiB2b2lkIDAgIT09IGZjLnNwbGl0VGV4dCAmJiBudWxsID09IGZjLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICBpZiAoZmMubm9kZVZhbHVlICE9IHZjaGlsZHJlblswXSkgZmMubm9kZVZhbHVlID0gdmNoaWxkcmVuWzBdO1xuICAgICAgICB9IGVsc2UgaWYgKHZjaGlsZHJlbiAmJiB2Y2hpbGRyZW4ubGVuZ3RoIHx8IG51bGwgIT0gZmMpIGlubmVyRGlmZk5vZGUob3V0LCB2Y2hpbGRyZW4sIGNvbnRleHQsIG1vdW50QWxsLCBoeWRyYXRpbmcgfHwgbnVsbCAhPSBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCk7XG4gICAgICAgIGRpZmZBdHRyaWJ1dGVzKG91dCwgdm5vZGUuYXR0cmlidXRlcywgcHJvcHMpO1xuICAgICAgICBpc1N2Z01vZGUgPSBwcmV2U3ZnTW9kZTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5uZXJEaWZmTm9kZShkb20sIHZjaGlsZHJlbiwgY29udGV4dCwgbW91bnRBbGwsIGlzSHlkcmF0aW5nKSB7XG4gICAgICAgIHZhciBqLCBjLCBmLCB2Y2hpbGQsIGNoaWxkLCBvcmlnaW5hbENoaWxkcmVuID0gZG9tLmNoaWxkTm9kZXMsIGNoaWxkcmVuID0gW10sIGtleWVkID0ge30sIGtleWVkTGVuID0gMCwgbWluID0gMCwgbGVuID0gb3JpZ2luYWxDaGlsZHJlbi5sZW5ndGgsIGNoaWxkcmVuTGVuID0gMCwgdmxlbiA9IHZjaGlsZHJlbiA/IHZjaGlsZHJlbi5sZW5ndGggOiAwO1xuICAgICAgICBpZiAoMCAhPT0gbGVuKSBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2NoaWxkID0gb3JpZ2luYWxDaGlsZHJlbltpXSwgcHJvcHMgPSBfY2hpbGQuX19wcmVhY3RhdHRyXywga2V5ID0gdmxlbiAmJiBwcm9wcyA/IF9jaGlsZC5fY29tcG9uZW50ID8gX2NoaWxkLl9jb21wb25lbnQuX19rIDogcHJvcHMua2V5IDogbnVsbDtcbiAgICAgICAgICAgIGlmIChudWxsICE9IGtleSkge1xuICAgICAgICAgICAgICAgIGtleWVkTGVuKys7XG4gICAgICAgICAgICAgICAga2V5ZWRba2V5XSA9IF9jaGlsZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcHMgfHwgKHZvaWQgMCAhPT0gX2NoaWxkLnNwbGl0VGV4dCA/IGlzSHlkcmF0aW5nID8gX2NoaWxkLm5vZGVWYWx1ZS50cmltKCkgOiAhMCA6IGlzSHlkcmF0aW5nKSkgY2hpbGRyZW5bY2hpbGRyZW5MZW4rK10gPSBfY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDAgIT09IHZsZW4pIGZvciAodmFyIGkgPSAwOyBpIDwgdmxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2Y2hpbGQgPSB2Y2hpbGRyZW5baV07XG4gICAgICAgICAgICBjaGlsZCA9IG51bGw7XG4gICAgICAgICAgICB2YXIga2V5ID0gdmNoaWxkLmtleTtcbiAgICAgICAgICAgIGlmIChudWxsICE9IGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXllZExlbiAmJiB2b2lkIDAgIT09IGtleWVkW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSBrZXllZFtrZXldO1xuICAgICAgICAgICAgICAgICAgICBrZXllZFtrZXldID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBrZXllZExlbi0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNoaWxkICYmIG1pbiA8IGNoaWxkcmVuTGVuKSBmb3IgKGogPSBtaW47IGogPCBjaGlsZHJlbkxlbjsgaisrKSBpZiAodm9pZCAwICE9PSBjaGlsZHJlbltqXSAmJiBpc1NhbWVOb2RlVHlwZShjID0gY2hpbGRyZW5bal0sIHZjaGlsZCwgaXNIeWRyYXRpbmcpKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQgPSBjO1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2pdID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlmIChqID09PSBjaGlsZHJlbkxlbiAtIDEpIGNoaWxkcmVuTGVuLS07XG4gICAgICAgICAgICAgICAgaWYgKGogPT09IG1pbikgbWluKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZCA9IGlkaWZmKGNoaWxkLCB2Y2hpbGQsIGNvbnRleHQsIG1vdW50QWxsKTtcbiAgICAgICAgICAgIGYgPSBvcmlnaW5hbENoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkICYmIGNoaWxkICE9PSBkb20gJiYgY2hpbGQgIT09IGYpIGlmIChudWxsID09IGYpIGRvbS5hcHBlbmRDaGlsZChjaGlsZCk7IGVsc2UgaWYgKGNoaWxkID09PSBmLm5leHRTaWJsaW5nKSByZW1vdmVOb2RlKGYpOyBlbHNlIGRvbS5pbnNlcnRCZWZvcmUoY2hpbGQsIGYpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXllZExlbikgZm9yICh2YXIgaSBpbiBrZXllZCkgaWYgKHZvaWQgMCAhPT0ga2V5ZWRbaV0pIHJlY29sbGVjdE5vZGVUcmVlKGtleWVkW2ldLCAhMSk7XG4gICAgICAgIHdoaWxlIChtaW4gPD0gY2hpbGRyZW5MZW4pIGlmICh2b2lkIDAgIT09IChjaGlsZCA9IGNoaWxkcmVuW2NoaWxkcmVuTGVuLS1dKSkgcmVjb2xsZWN0Tm9kZVRyZWUoY2hpbGQsICExKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVjb2xsZWN0Tm9kZVRyZWUobm9kZSwgdW5tb3VudE9ubHkpIHtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5vZGUuX2NvbXBvbmVudDtcbiAgICAgICAgaWYgKGNvbXBvbmVudCkgdW5tb3VudENvbXBvbmVudChjb21wb25lbnQpOyBlbHNlIHtcbiAgICAgICAgICAgIGlmIChudWxsICE9IG5vZGUuX19wcmVhY3RhdHRyXyAmJiBub2RlLl9fcHJlYWN0YXR0cl8ucmVmKSBub2RlLl9fcHJlYWN0YXR0cl8ucmVmKG51bGwpO1xuICAgICAgICAgICAgaWYgKCExID09PSB1bm1vdW50T25seSB8fCBudWxsID09IG5vZGUuX19wcmVhY3RhdHRyXykgcmVtb3ZlTm9kZShub2RlKTtcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuKG5vZGUpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUubGFzdENoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBub2RlLnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKG5vZGUsICEwKTtcbiAgICAgICAgICAgIG5vZGUgPSBuZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKGRvbSwgYXR0cnMsIG9sZCkge1xuICAgICAgICB2YXIgbmFtZTtcbiAgICAgICAgZm9yIChuYW1lIGluIG9sZCkgaWYgKCghYXR0cnMgfHwgbnVsbCA9PSBhdHRyc1tuYW1lXSkgJiYgbnVsbCAhPSBvbGRbbmFtZV0pIHNldEFjY2Vzc29yKGRvbSwgbmFtZSwgb2xkW25hbWVdLCBvbGRbbmFtZV0gPSB2b2lkIDAsIGlzU3ZnTW9kZSk7XG4gICAgICAgIGZvciAobmFtZSBpbiBhdHRycykgaWYgKCEoJ2NoaWxkcmVuJyA9PT0gbmFtZSB8fCAnaW5uZXJIVE1MJyA9PT0gbmFtZSB8fCBuYW1lIGluIG9sZCAmJiBhdHRyc1tuYW1lXSA9PT0gKCd2YWx1ZScgPT09IG5hbWUgfHwgJ2NoZWNrZWQnID09PSBuYW1lID8gZG9tW25hbWVdIDogb2xkW25hbWVdKSkpIHNldEFjY2Vzc29yKGRvbSwgbmFtZSwgb2xkW25hbWVdLCBvbGRbbmFtZV0gPSBhdHRyc1tuYW1lXSwgaXNTdmdNb2RlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29sbGVjdENvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgKGNvbXBvbmVudHNbbmFtZV0gfHwgKGNvbXBvbmVudHNbbmFtZV0gPSBbXSkpLnB1c2goY29tcG9uZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KEN0b3IsIHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBpbnN0LCBsaXN0ID0gY29tcG9uZW50c1tDdG9yLm5hbWVdO1xuICAgICAgICBpZiAoQ3Rvci5wcm90b3R5cGUgJiYgQ3Rvci5wcm90b3R5cGUucmVuZGVyKSB7XG4gICAgICAgICAgICBpbnN0ID0gbmV3IEN0b3IocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgQ29tcG9uZW50LmNhbGwoaW5zdCwgcHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5zdCA9IG5ldyBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaW5zdC5jb25zdHJ1Y3RvciA9IEN0b3I7XG4gICAgICAgICAgICBpbnN0LnJlbmRlciA9IGRvUmVuZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0KSBmb3IgKHZhciBpID0gbGlzdC5sZW5ndGg7IGktLTsgKSBpZiAobGlzdFtpXS5jb25zdHJ1Y3RvciA9PT0gQ3Rvcikge1xuICAgICAgICAgICAgaW5zdC5fX2IgPSBsaXN0W2ldLl9fYjtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRvUmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldENvbXBvbmVudFByb3BzKGNvbXBvbmVudCwgcHJvcHMsIG9wdHMsIGNvbnRleHQsIG1vdW50QWxsKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50Ll9feCkge1xuICAgICAgICAgICAgY29tcG9uZW50Ll9feCA9ICEwO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5fX3IgPSBwcm9wcy5yZWYpIGRlbGV0ZSBwcm9wcy5yZWY7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50Ll9fayA9IHByb3BzLmtleSkgZGVsZXRlIHByb3BzLmtleTtcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50LmJhc2UgfHwgbW91bnRBbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCkgY29tcG9uZW50LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykgY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gY29tcG9uZW50LmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5fX2MpIGNvbXBvbmVudC5fX2MgPSBjb21wb25lbnQuY29udGV4dDtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5fX3ApIGNvbXBvbmVudC5fX3AgPSBjb21wb25lbnQucHJvcHM7XG4gICAgICAgICAgICBjb21wb25lbnQucHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgIGNvbXBvbmVudC5fX3ggPSAhMTtcbiAgICAgICAgICAgIGlmICgwICE9PSBvcHRzKSBpZiAoMSA9PT0gb3B0cyB8fCAhMSAhPT0gb3B0aW9ucy5zeW5jQ29tcG9uZW50VXBkYXRlcyB8fCAhY29tcG9uZW50LmJhc2UpIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQsIDEsIG1vdW50QWxsKTsgZWxzZSBlbnF1ZXVlUmVuZGVyKGNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50Ll9fcikgY29tcG9uZW50Ll9fcihjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQsIG9wdHMsIG1vdW50QWxsLCBpc0NoaWxkKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50Ll9feCkge1xuICAgICAgICAgICAgdmFyIHJlbmRlcmVkLCBpbnN0LCBjYmFzZSwgcHJvcHMgPSBjb21wb25lbnQucHJvcHMsIHN0YXRlID0gY29tcG9uZW50LnN0YXRlLCBjb250ZXh0ID0gY29tcG9uZW50LmNvbnRleHQsIHByZXZpb3VzUHJvcHMgPSBjb21wb25lbnQuX19wIHx8IHByb3BzLCBwcmV2aW91c1N0YXRlID0gY29tcG9uZW50Ll9fcyB8fCBzdGF0ZSwgcHJldmlvdXNDb250ZXh0ID0gY29tcG9uZW50Ll9fYyB8fCBjb250ZXh0LCBpc1VwZGF0ZSA9IGNvbXBvbmVudC5iYXNlLCBuZXh0QmFzZSA9IGNvbXBvbmVudC5fX2IsIGluaXRpYWxCYXNlID0gaXNVcGRhdGUgfHwgbmV4dEJhc2UsIGluaXRpYWxDaGlsZENvbXBvbmVudCA9IGNvbXBvbmVudC5fY29tcG9uZW50LCBza2lwID0gITE7XG4gICAgICAgICAgICBpZiAoaXNVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQucHJvcHMgPSBwcmV2aW91c1Byb3BzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdGF0ZSA9IHByZXZpb3VzU3RhdGU7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbnRleHQgPSBwcmV2aW91c0NvbnRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKDIgIT09IG9wdHMgJiYgY29tcG9uZW50LnNob3VsZENvbXBvbmVudFVwZGF0ZSAmJiAhMSA9PT0gY29tcG9uZW50LnNob3VsZENvbXBvbmVudFVwZGF0ZShwcm9wcywgc3RhdGUsIGNvbnRleHQpKSBza2lwID0gITA7IGVsc2UgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVXBkYXRlKSBjb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcywgc3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudC5fX3AgPSBjb21wb25lbnQuX19zID0gY29tcG9uZW50Ll9fYyA9IGNvbXBvbmVudC5fX2IgPSBudWxsO1xuICAgICAgICAgICAgY29tcG9uZW50Ll9fZCA9ICExO1xuICAgICAgICAgICAgaWYgKCFza2lwKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZWQgPSBjb21wb25lbnQucmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5nZXRDaGlsZENvbnRleHQpIGNvbnRleHQgPSBleHRlbmQoZXh0ZW5kKHt9LCBjb250ZXh0KSwgY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgdG9Vbm1vdW50LCBiYXNlLCBjaGlsZENvbXBvbmVudCA9IHJlbmRlcmVkICYmIHJlbmRlcmVkLm5vZGVOYW1lO1xuICAgICAgICAgICAgICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBjaGlsZENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRQcm9wcyA9IGdldE5vZGVQcm9wcyhyZW5kZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgIGluc3QgPSBpbml0aWFsQ2hpbGRDb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0ICYmIGluc3QuY29uc3RydWN0b3IgPT09IGNoaWxkQ29tcG9uZW50ICYmIGNoaWxkUHJvcHMua2V5ID09IGluc3QuX19rKSBzZXRDb21wb25lbnRQcm9wcyhpbnN0LCBjaGlsZFByb3BzLCAxLCBjb250ZXh0LCAhMSk7IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9Vbm1vdW50ID0gaW5zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fY29tcG9uZW50ID0gaW5zdCA9IGNyZWF0ZUNvbXBvbmVudChjaGlsZENvbXBvbmVudCwgY2hpbGRQcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0Ll9fYiA9IGluc3QuX19iIHx8IG5leHRCYXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdC5fX3UgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDb21wb25lbnRQcm9wcyhpbnN0LCBjaGlsZFByb3BzLCAwLCBjb250ZXh0LCAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb21wb25lbnQoaW5zdCwgMSwgbW91bnRBbGwsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBiYXNlID0gaW5zdC5iYXNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNiYXNlID0gaW5pdGlhbEJhc2U7XG4gICAgICAgICAgICAgICAgICAgIHRvVW5tb3VudCA9IGluaXRpYWxDaGlsZENvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvVW5tb3VudCkgY2Jhc2UgPSBjb21wb25lbnQuX2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsQmFzZSB8fCAxID09PSBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2Jhc2UpIGNiYXNlLl9jb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZSA9IGRpZmYoY2Jhc2UsIHJlbmRlcmVkLCBjb250ZXh0LCBtb3VudEFsbCB8fCAhaXNVcGRhdGUsIGluaXRpYWxCYXNlICYmIGluaXRpYWxCYXNlLnBhcmVudE5vZGUsICEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbEJhc2UgJiYgYmFzZSAhPT0gaW5pdGlhbEJhc2UgJiYgaW5zdCAhPT0gaW5pdGlhbENoaWxkQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiYXNlUGFyZW50ID0gaW5pdGlhbEJhc2UucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VQYXJlbnQgJiYgYmFzZSAhPT0gYmFzZVBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVBhcmVudC5yZXBsYWNlQ2hpbGQoYmFzZSwgaW5pdGlhbEJhc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0b1VubW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsQmFzZS5fY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShpbml0aWFsQmFzZSwgITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b1VubW91bnQpIHVubW91bnRDb21wb25lbnQodG9Vbm1vdW50KTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuYmFzZSA9IGJhc2U7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2UgJiYgIWlzQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudCwgdCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHQgPSB0Ll9fdSkgKGNvbXBvbmVudFJlZiA9IHQpLmJhc2UgPSBiYXNlO1xuICAgICAgICAgICAgICAgICAgICBiYXNlLl9jb21wb25lbnQgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICAgICAgICAgIGJhc2UuX2NvbXBvbmVudENvbnN0cnVjdG9yID0gY29tcG9uZW50UmVmLmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNVcGRhdGUgfHwgbW91bnRBbGwpIG1vdW50cy51bnNoaWZ0KGNvbXBvbmVudCk7IGVsc2UgaWYgKCFza2lwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUpIGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUocHJldmlvdXNQcm9wcywgcHJldmlvdXNTdGF0ZSwgcHJldmlvdXNDb250ZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hZnRlclVwZGF0ZSkgb3B0aW9ucy5hZnRlclVwZGF0ZShjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG51bGwgIT0gY29tcG9uZW50Ll9faCkgd2hpbGUgKGNvbXBvbmVudC5fX2gubGVuZ3RoKSBjb21wb25lbnQuX19oLnBvcCgpLmNhbGwoY29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmICghZGlmZkxldmVsICYmICFpc0NoaWxkKSBmbHVzaE1vdW50cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkQ29tcG9uZW50RnJvbVZOb2RlKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKSB7XG4gICAgICAgIHZhciBjID0gZG9tICYmIGRvbS5fY29tcG9uZW50LCBvcmlnaW5hbENvbXBvbmVudCA9IGMsIG9sZERvbSA9IGRvbSwgaXNEaXJlY3RPd25lciA9IGMgJiYgZG9tLl9jb21wb25lbnRDb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWUsIGlzT3duZXIgPSBpc0RpcmVjdE93bmVyLCBwcm9wcyA9IGdldE5vZGVQcm9wcyh2bm9kZSk7XG4gICAgICAgIHdoaWxlIChjICYmICFpc093bmVyICYmIChjID0gYy5fX3UpKSBpc093bmVyID0gYy5jb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWU7XG4gICAgICAgIGlmIChjICYmIGlzT3duZXIgJiYgKCFtb3VudEFsbCB8fCBjLl9jb21wb25lbnQpKSB7XG4gICAgICAgICAgICBzZXRDb21wb25lbnRQcm9wcyhjLCBwcm9wcywgMywgY29udGV4dCwgbW91bnRBbGwpO1xuICAgICAgICAgICAgZG9tID0gYy5iYXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsQ29tcG9uZW50ICYmICFpc0RpcmVjdE93bmVyKSB7XG4gICAgICAgICAgICAgICAgdW5tb3VudENvbXBvbmVudChvcmlnaW5hbENvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgZG9tID0gb2xkRG9tID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGMgPSBjcmVhdGVDb21wb25lbnQodm5vZGUubm9kZU5hbWUsIHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChkb20gJiYgIWMuX19iKSB7XG4gICAgICAgICAgICAgICAgYy5fX2IgPSBkb207XG4gICAgICAgICAgICAgICAgb2xkRG9tID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldENvbXBvbmVudFByb3BzKGMsIHByb3BzLCAxLCBjb250ZXh0LCBtb3VudEFsbCk7XG4gICAgICAgICAgICBkb20gPSBjLmJhc2U7XG4gICAgICAgICAgICBpZiAob2xkRG9tICYmIGRvbSAhPT0gb2xkRG9tKSB7XG4gICAgICAgICAgICAgICAgb2xkRG9tLl9jb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKG9sZERvbSwgITEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb207XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVubW91bnRDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmJlZm9yZVVubW91bnQpIG9wdGlvbnMuYmVmb3JlVW5tb3VudChjb21wb25lbnQpO1xuICAgICAgICB2YXIgYmFzZSA9IGNvbXBvbmVudC5iYXNlO1xuICAgICAgICBjb21wb25lbnQuX194ID0gITA7XG4gICAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQpIGNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgICAgICBjb21wb25lbnQuYmFzZSA9IG51bGw7XG4gICAgICAgIHZhciBpbm5lciA9IGNvbXBvbmVudC5fY29tcG9uZW50O1xuICAgICAgICBpZiAoaW5uZXIpIHVubW91bnRDb21wb25lbnQoaW5uZXIpOyBlbHNlIGlmIChiYXNlKSB7XG4gICAgICAgICAgICBpZiAoYmFzZS5fX3ByZWFjdGF0dHJfICYmIGJhc2UuX19wcmVhY3RhdHRyXy5yZWYpIGJhc2UuX19wcmVhY3RhdHRyXy5yZWYobnVsbCk7XG4gICAgICAgICAgICBjb21wb25lbnQuX19iID0gYmFzZTtcbiAgICAgICAgICAgIHJlbW92ZU5vZGUoYmFzZSk7XG4gICAgICAgICAgICBjb2xsZWN0Q29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICByZW1vdmVDaGlsZHJlbihiYXNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcG9uZW50Ll9fcikgY29tcG9uZW50Ll9fcihudWxsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX19kID0gITA7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGUgfHwge307XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlcih2bm9kZSwgcGFyZW50LCBtZXJnZSkge1xuICAgICAgICByZXR1cm4gZGlmZihtZXJnZSwgdm5vZGUsIHt9LCAhMSwgcGFyZW50LCAhMSk7XG4gICAgfVxuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgdmFyIHN0YWNrID0gW107XG4gICAgdmFyIEVNUFRZX0NISUxEUkVOID0gW107XG4gICAgdmFyIGRlZmVyID0gJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgUHJvbWlzZSA/IFByb21pc2UucmVzb2x2ZSgpLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSkgOiBzZXRUaW1lb3V0O1xuICAgIHZhciBJU19OT05fRElNRU5TSU9OQUwgPSAvYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmQvaTtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB2YXIgbW91bnRzID0gW107XG4gICAgdmFyIGRpZmZMZXZlbCA9IDA7XG4gICAgdmFyIGlzU3ZnTW9kZSA9ICExO1xuICAgIHZhciBoeWRyYXRpbmcgPSAhMTtcbiAgICB2YXIgY29tcG9uZW50cyA9IHt9O1xuICAgIGV4dGVuZChDb21wb25lbnQucHJvdG90eXBlLCB7XG4gICAgICAgIHNldFN0YXRlOiBmdW5jdGlvbihzdGF0ZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fX3MpIHRoaXMuX19zID0gZXh0ZW5kKHt9LCBzKTtcbiAgICAgICAgICAgIGV4dGVuZChzLCAnZnVuY3Rpb24nID09IHR5cGVvZiBzdGF0ZSA/IHN0YXRlKHMsIHRoaXMucHJvcHMpIDogc3RhdGUpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSAodGhpcy5fX2ggPSB0aGlzLl9faCB8fCBbXSkucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICBlbnF1ZXVlUmVuZGVyKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgKHRoaXMuX19oID0gdGhpcy5fX2ggfHwgW10pLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgcmVuZGVyQ29tcG9uZW50KHRoaXMsIDIpO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge31cbiAgICB9KTtcbiAgICB2YXIgcHJlYWN0ID0ge1xuICAgICAgICBoOiBoLFxuICAgICAgICBjcmVhdGVFbGVtZW50OiBoLFxuICAgICAgICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICByZXJlbmRlcjogcmVyZW5kZXIsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9O1xuICAgIGlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2YgbW9kdWxlKSBtb2R1bGUuZXhwb3J0cyA9IHByZWFjdDsgZWxzZSBzZWxmLnByZWFjdCA9IHByZWFjdDtcbn0oKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5qcy5tYXAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfcmVmKSB7XG5cdHZhciBfY2xhc3MsIF90ZW1wMjtcblxuXHR2YXIgQ29tcG9uZW50ID0gX3JlZi5Db21wb25lbnQsXG5cdCAgICBjcmVhdGVFbGVtZW50ID0gX3JlZi5jcmVhdGVFbGVtZW50O1xuXHRyZXR1cm4gX3RlbXAyID0gX2NsYXNzID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcblx0XHRfaW5oZXJpdHMoUmVhY3RIaW50LCBfQ29tcG9uZW50KTtcblxuXHRcdGZ1bmN0aW9uIFJlYWN0SGludCgpIHtcblx0XHRcdHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cblx0XHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWFjdEhpbnQpO1xuXG5cdFx0XHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuXHRcdFx0XHRhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbC5hcHBseShfQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuc3RhdGUgPSB7IHRhcmdldDogbnVsbCB9LCBfdGhpcy5fY29udGFpbmVyU3R5bGUgPSB7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH0sIF90aGlzLnRvZ2dsZUV2ZW50cyA9IGZ1bmN0aW9uIChfcmVmMiwgZmxhZykge1xuXHRcdFx0XHR2YXIgZXZlbnRzID0gX3JlZjIuZXZlbnRzLFxuXHRcdFx0XHQgICAgX3JlZjIkZXZlbnRzID0gX3JlZjIuZXZlbnRzLFxuXHRcdFx0XHQgICAgY2xpY2sgPSBfcmVmMiRldmVudHMuY2xpY2ssXG5cdFx0XHRcdCAgICBmb2N1cyA9IF9yZWYyJGV2ZW50cy5mb2N1cyxcblx0XHRcdFx0ICAgIGhvdmVyID0gX3JlZjIkZXZlbnRzLmhvdmVyO1xuXG5cdFx0XHRcdHZhciBhY3Rpb24gPSBmbGFnID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXHRcdFx0XHR2YXIgaGFzRXZlbnRzID0gZXZlbnRzID09PSB0cnVlOyhjbGljayB8fCBoYXNFdmVudHMpICYmIGRvY3VtZW50W2FjdGlvbl0oJ2NsaWNrJywgX3RoaXMudG9nZ2xlSGludCk7KGZvY3VzIHx8IGhhc0V2ZW50cykgJiYgZG9jdW1lbnRbYWN0aW9uXSgnZm9jdXNpbicsIF90aGlzLnRvZ2dsZUhpbnQpOyhob3ZlciB8fCBoYXNFdmVudHMpICYmIGRvY3VtZW50W2FjdGlvbl0oJ21vdXNlb3ZlcicsIF90aGlzLnRvZ2dsZUhpbnQpOyhjbGljayB8fCBob3ZlciB8fCBoYXNFdmVudHMpICYmIGRvY3VtZW50W2FjdGlvbl0oJ3RvdWNoZW5kJywgX3RoaXMudG9nZ2xlSGludCk7XG5cdFx0XHR9LCBfdGhpcy50b2dnbGVIaW50ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgX3JlZjMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuXHRcdFx0XHQgICAgX3JlZjMkdGFyZ2V0ID0gX3JlZjMudGFyZ2V0LFxuXHRcdFx0XHQgICAgdGFyZ2V0ID0gX3JlZjMkdGFyZ2V0ID09PSB1bmRlZmluZWQgPyBudWxsIDogX3JlZjMkdGFyZ2V0O1xuXG5cdFx0XHRcdGNsZWFyVGltZW91dChfdGhpcy5fdGltZW91dCk7XG5cdFx0XHRcdF90aGlzLl90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzLnNldFN0YXRlKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdHRhcmdldDogX3RoaXMuZ2V0SGludCh0YXJnZXQpXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LCBfdGhpcy5wcm9wcy5kZWxheSk7XG5cdFx0XHR9LCBfdGhpcy5nZXRIaW50ID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRcdHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuXHRcdFx0XHQgICAgYXR0cmlidXRlID0gX3RoaXMkcHJvcHMuYXR0cmlidXRlLFxuXHRcdFx0XHQgICAgcGVyc2lzdCA9IF90aGlzJHByb3BzLnBlcnNpc3Q7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBfdGhpcy5zdGF0ZS50YXJnZXQ7XG5cblxuXHRcdFx0XHR3aGlsZSAoZWwpIHtcblx0XHRcdFx0XHRpZiAoZWwgPT09IGRvY3VtZW50KSBicmVhaztcblx0XHRcdFx0XHRpZiAocGVyc2lzdCAmJiBlbCA9PT0gX3RoaXMuX2hpbnQpIHJldHVybiB0YXJnZXQ7XG5cdFx0XHRcdFx0aWYgKGVsLmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKSByZXR1cm4gZWw7XG5cdFx0XHRcdFx0ZWwgPSBlbC5wYXJlbnROb2RlO1xuXHRcdFx0XHR9cmV0dXJuIG51bGw7XG5cdFx0XHR9LCBfdGhpcy5zaGFsbG93RXF1YWwgPSBmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0XHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuXHRcdFx0XHRyZXR1cm4ga2V5cy5sZW5ndGggPT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCAmJiBrZXlzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBrZXkpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0ICYmICh0eXBlb2YgYVtrZXldID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiW2tleV0gPT09ICdmdW5jdGlvbicgfHwgYVtrZXldID09PSBiW2tleV0pO1xuXHRcdFx0XHR9LCB0cnVlKTtcblx0XHRcdH0sIF90aGlzLmdldEhpbnREYXRhID0gZnVuY3Rpb24gKF9yZWY0LCBfcmVmNSkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gX3JlZjQudGFyZ2V0O1xuXHRcdFx0XHR2YXIgYXR0cmlidXRlID0gX3JlZjUuYXR0cmlidXRlLFxuXHRcdFx0XHQgICAgYXV0b1Bvc2l0aW9uID0gX3JlZjUuYXV0b1Bvc2l0aW9uLFxuXHRcdFx0XHQgICAgcG9zaXRpb24gPSBfcmVmNS5wb3NpdGlvbjtcblxuXHRcdFx0XHR2YXIgY29udGVudCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSB8fCAnJztcblx0XHRcdFx0dmFyIGF0ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUgKyAnLWF0JykgfHwgcG9zaXRpb247XG5cblx0XHRcdFx0dmFyIF90aGlzJF9jb250YWluZXIkZ2V0QiA9IF90aGlzLl9jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRcdCAgICBjb250YWluZXJUb3AgPSBfdGhpcyRfY29udGFpbmVyJGdldEIudG9wLFxuXHRcdFx0XHQgICAgY29udGFpbmVyTGVmdCA9IF90aGlzJF9jb250YWluZXIkZ2V0Qi5sZWZ0O1xuXG5cdFx0XHRcdHZhciBfdGhpcyRfaGludCRnZXRCb3VuZGkgPSBfdGhpcy5faGludC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdFx0ICAgIGhpbnRXaWR0aCA9IF90aGlzJF9oaW50JGdldEJvdW5kaS53aWR0aCxcblx0XHRcdFx0ICAgIGhpbnRIZWlnaHQgPSBfdGhpcyRfaGludCRnZXRCb3VuZGkuaGVpZ2h0O1xuXG5cdFx0XHRcdHZhciBfdGFyZ2V0JGdldEJvdW5kaW5nQ2wgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRcdCAgICB0YXJnZXRUb3AgPSBfdGFyZ2V0JGdldEJvdW5kaW5nQ2wudG9wLFxuXHRcdFx0XHQgICAgdGFyZ2V0TGVmdCA9IF90YXJnZXQkZ2V0Qm91bmRpbmdDbC5sZWZ0LFxuXHRcdFx0XHQgICAgdGFyZ2V0V2lkdGggPSBfdGFyZ2V0JGdldEJvdW5kaW5nQ2wud2lkdGgsXG5cdFx0XHRcdCAgICB0YXJnZXRIZWlnaHQgPSBfdGFyZ2V0JGdldEJvdW5kaW5nQ2wuaGVpZ2h0O1xuXG5cdFx0XHRcdGlmIChhdXRvUG9zaXRpb24pIHtcblx0XHRcdFx0XHR2YXIgaXNIb3JpeiA9IFsnbGVmdCcsICdyaWdodCddLmluY2x1ZGVzKGF0KTtcblxuXHRcdFx0XHRcdHZhciBfZG9jdW1lbnQkZG9jdW1lbnRFbGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG5cdFx0XHRcdFx0ICAgIGNsaWVudEhlaWdodCA9IF9kb2N1bWVudCRkb2N1bWVudEVsZS5jbGllbnRIZWlnaHQsXG5cdFx0XHRcdFx0ICAgIGNsaWVudFdpZHRoID0gX2RvY3VtZW50JGRvY3VtZW50RWxlLmNsaWVudFdpZHRoO1xuXG5cblx0XHRcdFx0XHR2YXIgZGlyZWN0aW9ucyA9IHtcblx0XHRcdFx0XHRcdGxlZnQ6IChpc0hvcml6ID8gdGFyZ2V0TGVmdCAtIGhpbnRXaWR0aCA6IHRhcmdldExlZnQgKyAodGFyZ2V0V2lkdGggLSBoaW50V2lkdGggPj4gMSkpID4gMCxcblx0XHRcdFx0XHRcdHJpZ2h0OiAoaXNIb3JpeiA/IHRhcmdldExlZnQgKyB0YXJnZXRXaWR0aCArIGhpbnRXaWR0aCA6IHRhcmdldExlZnQgKyAodGFyZ2V0V2lkdGggKyBoaW50V2lkdGggPj4gMSkpIDwgY2xpZW50V2lkdGgsXG5cdFx0XHRcdFx0XHRib3R0b206IChpc0hvcml6ID8gdGFyZ2V0VG9wICsgKHRhcmdldEhlaWdodCArIGhpbnRIZWlnaHQgPj4gMSkgOiB0YXJnZXRUb3AgKyB0YXJnZXRIZWlnaHQgKyBoaW50SGVpZ2h0KSA8IGNsaWVudEhlaWdodCxcblx0XHRcdFx0XHRcdHRvcDogKGlzSG9yaXogPyB0YXJnZXRUb3AgLSAoaGludEhlaWdodCA+PiAxKSA6IHRhcmdldFRvcCAtIGhpbnRIZWlnaHQpID4gMFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRzd2l0Y2ggKGF0KSB7XG5cdFx0XHRcdFx0XHRjYXNlICdsZWZ0Jzpcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLmxlZnQpIGF0ID0gJ3JpZ2h0Jztcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLnRvcCkgYXQgPSAnYm90dG9tJztcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLmJvdHRvbSkgYXQgPSAndG9wJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdGNhc2UgJ3JpZ2h0Jzpcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLnJpZ2h0KSBhdCA9ICdsZWZ0Jztcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLnRvcCkgYXQgPSAnYm90dG9tJztcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLmJvdHRvbSkgYXQgPSAndG9wJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdGNhc2UgJ2JvdHRvbSc6XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5ib3R0b20pIGF0ID0gJ3RvcCc7XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5sZWZ0KSBhdCA9ICdyaWdodCc7XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5yaWdodCkgYXQgPSAnbGVmdCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRjYXNlICd0b3AnOlxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLnRvcCkgYXQgPSAnYm90dG9tJztcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLmxlZnQpIGF0ID0gJ3JpZ2h0Jztcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLnJpZ2h0KSBhdCA9ICdsZWZ0Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHRvcCA9IHZvaWQgMCxcblx0XHRcdFx0ICAgIGxlZnQgPSB2b2lkIDA7XG5cdFx0XHRcdHN3aXRjaCAoYXQpIHtcblx0XHRcdFx0XHRjYXNlICdsZWZ0Jzpcblx0XHRcdFx0XHRcdHRvcCA9IHRhcmdldEhlaWdodCAtIGhpbnRIZWlnaHQgPj4gMTtcblx0XHRcdFx0XHRcdGxlZnQgPSAtaGludFdpZHRoO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdyaWdodCc6XG5cdFx0XHRcdFx0XHR0b3AgPSB0YXJnZXRIZWlnaHQgLSBoaW50SGVpZ2h0ID4+IDE7XG5cdFx0XHRcdFx0XHRsZWZ0ID0gdGFyZ2V0V2lkdGg7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ2JvdHRvbSc6XG5cdFx0XHRcdFx0XHR0b3AgPSB0YXJnZXRIZWlnaHQ7XG5cdFx0XHRcdFx0XHRsZWZ0ID0gdGFyZ2V0V2lkdGggLSBoaW50V2lkdGggPj4gMTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAndG9wJzpcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0dG9wID0gLWhpbnRIZWlnaHQ7XG5cdFx0XHRcdFx0XHRsZWZ0ID0gdGFyZ2V0V2lkdGggLSBoaW50V2lkdGggPj4gMTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29udGVudDogY29udGVudCwgYXQ6IGF0LFxuXHRcdFx0XHRcdHRvcDogdG9wICsgdGFyZ2V0VG9wIC0gY29udGFpbmVyVG9wIHwgMCxcblx0XHRcdFx0XHRsZWZ0OiBsZWZ0ICsgdGFyZ2V0TGVmdCAtIGNvbnRhaW5lckxlZnQgfCAwXG5cdFx0XHRcdH07XG5cdFx0XHR9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcblx0XHR9XG5cblx0XHRSZWFjdEhpbnQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUV2ZW50cyh0aGlzLnByb3BzLCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0UmVhY3RIaW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdFx0dGhpcy50b2dnbGVFdmVudHModGhpcy5wcm9wcywgZmFsc2UpO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuXHRcdH07XG5cblx0XHRSZWFjdEhpbnQucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShwcm9wcywgc3RhdGUpIHtcblx0XHRcdHJldHVybiAhdGhpcy5zaGFsbG93RXF1YWwoc3RhdGUsIHRoaXMuc3RhdGUpIHx8ICF0aGlzLnNoYWxsb3dFcXVhbChwcm9wcywgdGhpcy5wcm9wcyk7XG5cdFx0fTtcblxuXHRcdFJlYWN0SGludC5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKCkge1xuXHRcdFx0aWYgKHRoaXMuc3RhdGUudGFyZ2V0KSB0aGlzLnNldFN0YXRlKHRoaXMuZ2V0SGludERhdGEpO1xuXHRcdH07XG5cblx0XHRSZWFjdEhpbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0XHR2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcblx0XHRcdCAgICBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lLFxuXHRcdFx0ICAgIG9uUmVuZGVyQ29udGVudCA9IF9wcm9wcy5vblJlbmRlckNvbnRlbnQ7XG5cdFx0XHR2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZSxcblx0XHRcdCAgICB0YXJnZXQgPSBfc3RhdGUudGFyZ2V0LFxuXHRcdFx0ICAgIGNvbnRlbnQgPSBfc3RhdGUuY29udGVudCxcblx0XHRcdCAgICBhdCA9IF9zdGF0ZS5hdCxcblx0XHRcdCAgICB0b3AgPSBfc3RhdGUudG9wLFxuXHRcdFx0ICAgIGxlZnQgPSBfc3RhdGUubGVmdDtcblxuXG5cdFx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgcmVmOiBmdW5jdGlvbiByZWYoX3JlZjcpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczIuX2NvbnRhaW5lciA9IF9yZWY3O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3R5bGU6IHRoaXMuX2NvbnRhaW5lclN0eWxlIH0sXG5cdFx0XHRcdHRhcmdldCAmJiBjcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgY2xhc3NOYW1lOiBjbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWUgKyAnLS0nICsgYXQsXG5cdFx0XHRcdFx0XHRyZWY6IGZ1bmN0aW9uIHJlZihfcmVmNikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMyLl9oaW50ID0gX3JlZjY7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3R5bGU6IHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfSB9LFxuXHRcdFx0XHRcdG9uUmVuZGVyQ29udGVudCA/IG9uUmVuZGVyQ29udGVudCh0YXJnZXQsIGNvbnRlbnQpIDogY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdFx0eyBjbGFzc05hbWU6IGNsYXNzTmFtZSArICdfX2NvbnRlbnQnIH0sXG5cdFx0XHRcdFx0XHRjb250ZW50XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gUmVhY3RIaW50O1xuXHR9KENvbXBvbmVudCksIF9jbGFzcy5kZWZhdWx0UHJvcHMgPSB7XG5cdFx0YXR0cmlidXRlOiAnZGF0YS1yaCcsXG5cdFx0YXV0b1Bvc2l0aW9uOiBmYWxzZSxcblx0XHRjbGFzc05hbWU6ICdyZWFjdC1oaW50Jyxcblx0XHRkZWxheTogMCxcblx0XHRldmVudHM6IGZhbHNlLFxuXHRcdG9uUmVuZGVyQ29udGVudDogbnVsbCxcblx0XHRwZXJzaXN0OiBmYWxzZSxcblx0XHRwb3NpdGlvbjogJ3RvcCdcblx0fSwgX3RlbXAyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/dChleHBvcnRzKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcImV4cG9ydHNcIl0sdCk6dChlLnJlZHV4TG9nZ2VyPWUucmVkdXhMb2dnZXJ8fHt9KX0odGhpcyxmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KGUsdCl7ZS5zdXBlcl89dCxlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6ZSxlbnVtZXJhYmxlOiExLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH19KX1mdW5jdGlvbiByKGUsdCl7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJraW5kXCIse3ZhbHVlOmUsZW51bWVyYWJsZTohMH0pLHQmJnQubGVuZ3RoJiZPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInBhdGhcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSl9ZnVuY3Rpb24gbihlLHQscil7bi5zdXBlcl8uY2FsbCh0aGlzLFwiRVwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwibGhzXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicmhzXCIse3ZhbHVlOnIsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIG8oZSx0KXtvLnN1cGVyXy5jYWxsKHRoaXMsXCJOXCIsZSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJyaHNcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSl9ZnVuY3Rpb24gaShlLHQpe2kuc3VwZXJfLmNhbGwodGhpcyxcIkRcIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImxoc1wiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBhKGUsdCxyKXthLnN1cGVyXy5jYWxsKHRoaXMsXCJBXCIsZSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJpbmRleFwiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcIml0ZW1cIix7dmFsdWU6cixlbnVtZXJhYmxlOiEwfSl9ZnVuY3Rpb24gZihlLHQscil7dmFyIG49ZS5zbGljZSgocnx8dCkrMXx8ZS5sZW5ndGgpO3JldHVybiBlLmxlbmd0aD10PDA/ZS5sZW5ndGgrdDp0LGUucHVzaC5hcHBseShlLG4pLGV9ZnVuY3Rpb24gdShlKXt2YXIgdD1cInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOk4oZSk7cmV0dXJuXCJvYmplY3RcIiE9PXQ/dDplPT09TWF0aD9cIm1hdGhcIjpudWxsPT09ZT9cIm51bGxcIjpBcnJheS5pc0FycmF5KGUpP1wiYXJyYXlcIjpcIltvYmplY3QgRGF0ZV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKT9cImRhdGVcIjpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnRvU3RyaW5nJiYvXlxcLy4qXFwvLy50ZXN0KGUudG9TdHJpbmcoKSk/XCJyZWdleHBcIjpcIm9iamVjdFwifWZ1bmN0aW9uIGwoZSx0LHIsYyxzLGQscCl7cz1zfHxbXSxwPXB8fFtdO3ZhciBnPXMuc2xpY2UoMCk7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGQpe2lmKGMpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGMmJmMoZyxkKSlyZXR1cm47aWYoXCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2YgYz9cInVuZGVmaW5lZFwiOk4oYykpKXtpZihjLnByZWZpbHRlciYmYy5wcmVmaWx0ZXIoZyxkKSlyZXR1cm47aWYoYy5ub3JtYWxpemUpe3ZhciBoPWMubm9ybWFsaXplKGcsZCxlLHQpO2gmJihlPWhbMF0sdD1oWzFdKX19fWcucHVzaChkKX1cInJlZ2V4cFwiPT09dShlKSYmXCJyZWdleHBcIj09PXUodCkmJihlPWUudG9TdHJpbmcoKSx0PXQudG9TdHJpbmcoKSk7dmFyIHk9XCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpOKGUpLHY9XCJ1bmRlZmluZWRcIj09dHlwZW9mIHQ/XCJ1bmRlZmluZWRcIjpOKHQpLGI9XCJ1bmRlZmluZWRcIiE9PXl8fHAmJnBbcC5sZW5ndGgtMV0ubGhzJiZwW3AubGVuZ3RoLTFdLmxocy5oYXNPd25Qcm9wZXJ0eShkKSxtPVwidW5kZWZpbmVkXCIhPT12fHxwJiZwW3AubGVuZ3RoLTFdLnJocyYmcFtwLmxlbmd0aC0xXS5yaHMuaGFzT3duUHJvcGVydHkoZCk7aWYoIWImJm0pcihuZXcgbyhnLHQpKTtlbHNlIGlmKCFtJiZiKXIobmV3IGkoZyxlKSk7ZWxzZSBpZih1KGUpIT09dSh0KSlyKG5ldyBuKGcsZSx0KSk7ZWxzZSBpZihcImRhdGVcIj09PXUoZSkmJmUtdCE9PTApcihuZXcgbihnLGUsdCkpO2Vsc2UgaWYoXCJvYmplY3RcIj09PXkmJm51bGwhPT1lJiZudWxsIT09dClpZihwLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4gdC5saHM9PT1lfSkubGVuZ3RoKWUhPT10JiZyKG5ldyBuKGcsZSx0KSk7ZWxzZXtpZihwLnB1c2goe2xoczplLHJoczp0fSksQXJyYXkuaXNBcnJheShlKSl7dmFyIHc7ZS5sZW5ndGg7Zm9yKHc9MDt3PGUubGVuZ3RoO3crKyl3Pj10Lmxlbmd0aD9yKG5ldyBhKGcsdyxuZXcgaSh2b2lkIDAsZVt3XSkpKTpsKGVbd10sdFt3XSxyLGMsZyx3LHApO2Zvcig7dzx0Lmxlbmd0aDspcihuZXcgYShnLHcsbmV3IG8odm9pZCAwLHRbdysrXSkpKX1lbHNle3ZhciB4PU9iamVjdC5rZXlzKGUpLFM9T2JqZWN0LmtleXModCk7eC5mb3JFYWNoKGZ1bmN0aW9uKG4sbyl7dmFyIGk9Uy5pbmRleE9mKG4pO2k+PTA/KGwoZVtuXSx0W25dLHIsYyxnLG4scCksUz1mKFMsaSkpOmwoZVtuXSx2b2lkIDAscixjLGcsbixwKX0pLFMuZm9yRWFjaChmdW5jdGlvbihlKXtsKHZvaWQgMCx0W2VdLHIsYyxnLGUscCl9KX1wLmxlbmd0aD1wLmxlbmd0aC0xfWVsc2UgZSE9PXQmJihcIm51bWJlclwiPT09eSYmaXNOYU4oZSkmJmlzTmFOKHQpfHxyKG5ldyBuKGcsZSx0KSkpfWZ1bmN0aW9uIGMoZSx0LHIsbil7cmV0dXJuIG49bnx8W10sbChlLHQsZnVuY3Rpb24oZSl7ZSYmbi5wdXNoKGUpfSxyKSxuLmxlbmd0aD9uOnZvaWQgMH1mdW5jdGlvbiBzKGUsdCxyKXtpZihyLnBhdGgmJnIucGF0aC5sZW5ndGgpe3ZhciBuLG89ZVt0XSxpPXIucGF0aC5sZW5ndGgtMTtmb3Iobj0wO248aTtuKyspbz1vW3IucGF0aFtuXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnMob1tyLnBhdGhbbl1dLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6ZGVsZXRlIG9bci5wYXRoW25dXTticmVhaztjYXNlXCJFXCI6Y2FzZVwiTlwiOm9bci5wYXRoW25dXT1yLnJoc319ZWxzZSBzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cyhlW3RdLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6ZT1mKGUsdCk7YnJlYWs7Y2FzZVwiRVwiOmNhc2VcIk5cIjplW3RdPXIucmhzfXJldHVybiBlfWZ1bmN0aW9uIGQoZSx0LHIpe2lmKGUmJnQmJnImJnIua2luZCl7Zm9yKHZhciBuPWUsbz0tMSxpPXIucGF0aD9yLnBhdGgubGVuZ3RoLTE6MDsrK288aTspXCJ1bmRlZmluZWRcIj09dHlwZW9mIG5bci5wYXRoW29dXSYmKG5bci5wYXRoW29dXT1cIm51bWJlclwiPT10eXBlb2Ygci5wYXRoW29dP1tdOnt9KSxuPW5bci5wYXRoW29dXTtzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cyhyLnBhdGg/bltyLnBhdGhbb11dOm4sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjpkZWxldGUgbltyLnBhdGhbb11dO2JyZWFrO2Nhc2VcIkVcIjpjYXNlXCJOXCI6bltyLnBhdGhbb11dPXIucmhzfX19ZnVuY3Rpb24gcChlLHQscil7aWYoci5wYXRoJiZyLnBhdGgubGVuZ3RoKXt2YXIgbixvPWVbdF0saT1yLnBhdGgubGVuZ3RoLTE7Zm9yKG49MDtuPGk7bisrKW89b1tyLnBhdGhbbl1dO3N3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpwKG9bci5wYXRoW25dXSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOm9bci5wYXRoW25dXT1yLmxoczticmVhaztjYXNlXCJFXCI6b1tyLnBhdGhbbl1dPXIubGhzO2JyZWFrO2Nhc2VcIk5cIjpkZWxldGUgb1tyLnBhdGhbbl1dfX1lbHNlIHN3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpwKGVbdF0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjplW3RdPXIubGhzO2JyZWFrO2Nhc2VcIkVcIjplW3RdPXIubGhzO2JyZWFrO2Nhc2VcIk5cIjplPWYoZSx0KX1yZXR1cm4gZX1mdW5jdGlvbiBnKGUsdCxyKXtpZihlJiZ0JiZyJiZyLmtpbmQpe3ZhciBuLG8saT1lO2ZvcihvPXIucGF0aC5sZW5ndGgtMSxuPTA7bjxvO24rKylcInVuZGVmaW5lZFwiPT10eXBlb2YgaVtyLnBhdGhbbl1dJiYoaVtyLnBhdGhbbl1dPXt9KSxpPWlbci5wYXRoW25dXTtzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cChpW3IucGF0aFtuXV0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjppW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiRVwiOmlbci5wYXRoW25dXT1yLmxoczticmVhaztjYXNlXCJOXCI6ZGVsZXRlIGlbci5wYXRoW25dXX19fWZ1bmN0aW9uIGgoZSx0LHIpe2lmKGUmJnQpe3ZhciBuPWZ1bmN0aW9uKG4pe3ImJiFyKGUsdCxuKXx8ZChlLHQsbil9O2woZSx0LG4pfX1mdW5jdGlvbiB5KGUpe3JldHVyblwiY29sb3I6IFwiK0ZbZV0uY29sb3IrXCI7IGZvbnQtd2VpZ2h0OiBib2xkXCJ9ZnVuY3Rpb24gdihlKXt2YXIgdD1lLmtpbmQscj1lLnBhdGgsbj1lLmxocyxvPWUucmhzLGk9ZS5pbmRleCxhPWUuaXRlbTtzd2l0Y2godCl7Y2FzZVwiRVwiOnJldHVybltyLmpvaW4oXCIuXCIpLG4sXCLihpJcIixvXTtjYXNlXCJOXCI6cmV0dXJuW3Iuam9pbihcIi5cIiksb107Y2FzZVwiRFwiOnJldHVybltyLmpvaW4oXCIuXCIpXTtjYXNlXCJBXCI6cmV0dXJuW3Iuam9pbihcIi5cIikrXCJbXCIraStcIl1cIixhXTtkZWZhdWx0OnJldHVybltdfX1mdW5jdGlvbiBiKGUsdCxyLG4pe3ZhciBvPWMoZSx0KTt0cnl7bj9yLmdyb3VwQ29sbGFwc2VkKFwiZGlmZlwiKTpyLmdyb3VwKFwiZGlmZlwiKX1jYXRjaChlKXtyLmxvZyhcImRpZmZcIil9bz9vLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIHQ9ZS5raW5kLG49dihlKTtyLmxvZy5hcHBseShyLFtcIiVjIFwiK0ZbdF0udGV4dCx5KHQpXS5jb25jYXQoUChuKSkpfSk6ci5sb2coXCLigJTigJQgbm8gZGlmZiDigJTigJRcIik7dHJ5e3IuZ3JvdXBFbmQoKX1jYXRjaChlKXtyLmxvZyhcIuKAlOKAlCBkaWZmIGVuZCDigJTigJQgXCIpfX1mdW5jdGlvbiBtKGUsdCxyLG4pe3N3aXRjaChcInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOk4oZSkpe2Nhc2VcIm9iamVjdFwiOnJldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGVbbl0/ZVtuXS5hcHBseShlLFAocikpOmVbbl07Y2FzZVwiZnVuY3Rpb25cIjpyZXR1cm4gZSh0KTtkZWZhdWx0OnJldHVybiBlfX1mdW5jdGlvbiB3KGUpe3ZhciB0PWUudGltZXN0YW1wLHI9ZS5kdXJhdGlvbjtyZXR1cm4gZnVuY3Rpb24oZSxuLG8pe3ZhciBpPVtcImFjdGlvblwiXTtyZXR1cm4gaS5wdXNoKFwiJWNcIitTdHJpbmcoZS50eXBlKSksdCYmaS5wdXNoKFwiJWNAIFwiK24pLHImJmkucHVzaChcIiVjKGluIFwiK28udG9GaXhlZCgyKStcIiBtcylcIiksaS5qb2luKFwiIFwiKX19ZnVuY3Rpb24geChlLHQpe3ZhciByPXQubG9nZ2VyLG49dC5hY3Rpb25UcmFuc2Zvcm1lcixvPXQudGl0bGVGb3JtYXR0ZXIsaT12b2lkIDA9PT1vP3codCk6byxhPXQuY29sbGFwc2VkLGY9dC5jb2xvcnMsdT10LmxldmVsLGw9dC5kaWZmLGM9XCJ1bmRlZmluZWRcIj09dHlwZW9mIHQudGl0bGVGb3JtYXR0ZXI7ZS5mb3JFYWNoKGZ1bmN0aW9uKG8scyl7dmFyIGQ9by5zdGFydGVkLHA9by5zdGFydGVkVGltZSxnPW8uYWN0aW9uLGg9by5wcmV2U3RhdGUseT1vLmVycm9yLHY9by50b29rLHc9by5uZXh0U3RhdGUseD1lW3MrMV07eCYmKHc9eC5wcmV2U3RhdGUsdj14LnN0YXJ0ZWQtZCk7dmFyIFM9bihnKSxrPVwiZnVuY3Rpb25cIj09dHlwZW9mIGE/YShmdW5jdGlvbigpe3JldHVybiB3fSxnLG8pOmEsaj1EKHApLEU9Zi50aXRsZT9cImNvbG9yOiBcIitmLnRpdGxlKFMpK1wiO1wiOlwiXCIsQT1bXCJjb2xvcjogZ3JheTsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XCJdO0EucHVzaChFKSx0LnRpbWVzdGFtcCYmQS5wdXNoKFwiY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyO1wiKSx0LmR1cmF0aW9uJiZBLnB1c2goXCJjb2xvcjogZ3JheTsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XCIpO3ZhciBPPWkoUyxqLHYpO3RyeXtrP2YudGl0bGUmJmM/ci5ncm91cENvbGxhcHNlZC5hcHBseShyLFtcIiVjIFwiK09dLmNvbmNhdChBKSk6ci5ncm91cENvbGxhcHNlZChPKTpmLnRpdGxlJiZjP3IuZ3JvdXAuYXBwbHkocixbXCIlYyBcIitPXS5jb25jYXQoQSkpOnIuZ3JvdXAoTyl9Y2F0Y2goZSl7ci5sb2coTyl9dmFyIE49bSh1LFMsW2hdLFwicHJldlN0YXRlXCIpLFA9bSh1LFMsW1NdLFwiYWN0aW9uXCIpLEM9bSh1LFMsW3ksaF0sXCJlcnJvclwiKSxGPW0odSxTLFt3XSxcIm5leHRTdGF0ZVwiKTtpZihOKWlmKGYucHJldlN0YXRlKXt2YXIgTD1cImNvbG9yOiBcIitmLnByZXZTdGF0ZShoKStcIjsgZm9udC13ZWlnaHQ6IGJvbGRcIjtyW05dKFwiJWMgcHJldiBzdGF0ZVwiLEwsaCl9ZWxzZSByW05dKFwicHJldiBzdGF0ZVwiLGgpO2lmKFApaWYoZi5hY3Rpb24pe3ZhciBUPVwiY29sb3I6IFwiK2YuYWN0aW9uKFMpK1wiOyBmb250LXdlaWdodDogYm9sZFwiO3JbUF0oXCIlYyBhY3Rpb24gICAgXCIsVCxTKX1lbHNlIHJbUF0oXCJhY3Rpb24gICAgXCIsUyk7aWYoeSYmQylpZihmLmVycm9yKXt2YXIgTT1cImNvbG9yOiBcIitmLmVycm9yKHksaCkrXCI7IGZvbnQtd2VpZ2h0OiBib2xkO1wiO3JbQ10oXCIlYyBlcnJvciAgICAgXCIsTSx5KX1lbHNlIHJbQ10oXCJlcnJvciAgICAgXCIseSk7aWYoRilpZihmLm5leHRTdGF0ZSl7dmFyIF89XCJjb2xvcjogXCIrZi5uZXh0U3RhdGUodykrXCI7IGZvbnQtd2VpZ2h0OiBib2xkXCI7cltGXShcIiVjIG5leHQgc3RhdGVcIixfLHcpfWVsc2UgcltGXShcIm5leHQgc3RhdGVcIix3KTtsJiZiKGgsdyxyLGspO3RyeXtyLmdyb3VwRW5kKCl9Y2F0Y2goZSl7ci5sb2coXCLigJTigJQgbG9nIGVuZCDigJTigJRcIil9fSl9ZnVuY3Rpb24gUygpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSx0PU9iamVjdC5hc3NpZ24oe30sTCxlKSxyPXQubG9nZ2VyLG49dC5zdGF0ZVRyYW5zZm9ybWVyLG89dC5lcnJvclRyYW5zZm9ybWVyLGk9dC5wcmVkaWNhdGUsYT10LmxvZ0Vycm9ycyxmPXQuZGlmZlByZWRpY2F0ZTtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgcilyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBlKHQpfX19O2lmKGUuZ2V0U3RhdGUmJmUuZGlzcGF0Y2gpcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJbcmVkdXgtbG9nZ2VyXSByZWR1eC1sb2dnZXIgbm90IGluc3RhbGxlZC4gTWFrZSBzdXJlIHRvIHBhc3MgbG9nZ2VyIGluc3RhbmNlIGFzIG1pZGRsZXdhcmU6XFxuLy8gTG9nZ2VyIHdpdGggZGVmYXVsdCBvcHRpb25zXFxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJ1xcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXFxuICByZWR1Y2VyLFxcbiAgYXBwbHlNaWRkbGV3YXJlKGxvZ2dlcilcXG4pXFxuLy8gT3IgeW91IGNhbiBjcmVhdGUgeW91ciBvd24gbG9nZ2VyIHdpdGggY3VzdG9tIG9wdGlvbnMgaHR0cDovL2JpdC5seS9yZWR1eC1sb2dnZXItb3B0aW9uc1xcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xcbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcih7XFxuICAvLyAuLi5vcHRpb25zXFxufSk7XFxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcXG4gIHJlZHVjZXIsXFxuICBhcHBseU1pZGRsZXdhcmUobG9nZ2VyKVxcbilcXG5cIiksZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBlKHQpfX19O3ZhciB1PVtdO3JldHVybiBmdW5jdGlvbihlKXt2YXIgcj1lLmdldFN0YXRlO3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24obCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgaSYmIWkocixsKSlyZXR1cm4gZShsKTt2YXIgYz17fTt1LnB1c2goYyksYy5zdGFydGVkPU8ubm93KCksYy5zdGFydGVkVGltZT1uZXcgRGF0ZSxjLnByZXZTdGF0ZT1uKHIoKSksYy5hY3Rpb249bDt2YXIgcz12b2lkIDA7aWYoYSl0cnl7cz1lKGwpfWNhdGNoKGUpe2MuZXJyb3I9byhlKX1lbHNlIHM9ZShsKTtjLnRvb2s9Ty5ub3coKS1jLnN0YXJ0ZWQsYy5uZXh0U3RhdGU9bihyKCkpO3ZhciBkPXQuZGlmZiYmXCJmdW5jdGlvblwiPT10eXBlb2YgZj9mKHIsbCk6dC5kaWZmO2lmKHgodSxPYmplY3QuYXNzaWduKHt9LHQse2RpZmY6ZH0pKSx1Lmxlbmd0aD0wLGMuZXJyb3IpdGhyb3cgYy5lcnJvcjtyZXR1cm4gc319fX12YXIgayxqLEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbmV3IEFycmF5KHQrMSkuam9pbihlKX0sQT1mdW5jdGlvbihlLHQpe3JldHVybiBFKFwiMFwiLHQtZS50b1N0cmluZygpLmxlbmd0aCkrZX0sRD1mdW5jdGlvbihlKXtyZXR1cm4gQShlLmdldEhvdXJzKCksMikrXCI6XCIrQShlLmdldE1pbnV0ZXMoKSwyKStcIjpcIitBKGUuZ2V0U2Vjb25kcygpLDIpK1wiLlwiK0EoZS5nZXRNaWxsaXNlY29uZHMoKSwzKX0sTz1cInVuZGVmaW5lZFwiIT10eXBlb2YgcGVyZm9ybWFuY2UmJm51bGwhPT1wZXJmb3JtYW5jZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgcGVyZm9ybWFuY2Uubm93P3BlcmZvcm1hbmNlOkRhdGUsTj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfSxQPWZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLHI9QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKXJbdF09ZVt0XTtyZXR1cm4gcn1yZXR1cm4gQXJyYXkuZnJvbShlKX0sQz1bXTtrPVwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGdsb2JhbD9cInVuZGVmaW5lZFwiOk4oZ2xvYmFsKSkmJmdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30saj1rLkRlZXBEaWZmLGomJkMucHVzaChmdW5jdGlvbigpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBqJiZrLkRlZXBEaWZmPT09YyYmKGsuRGVlcERpZmY9aixqPXZvaWQgMCl9KSx0KG4sciksdChvLHIpLHQoaSxyKSx0KGEsciksT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoYyx7ZGlmZjp7dmFsdWU6YyxlbnVtZXJhYmxlOiEwfSxvYnNlcnZhYmxlRGlmZjp7dmFsdWU6bCxlbnVtZXJhYmxlOiEwfSxhcHBseURpZmY6e3ZhbHVlOmgsZW51bWVyYWJsZTohMH0sYXBwbHlDaGFuZ2U6e3ZhbHVlOmQsZW51bWVyYWJsZTohMH0scmV2ZXJ0Q2hhbmdlOnt2YWx1ZTpnLGVudW1lcmFibGU6ITB9LGlzQ29uZmxpY3Q6e3ZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGp9LGVudW1lcmFibGU6ITB9LG5vQ29uZmxpY3Q6e3ZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIEMmJihDLmZvckVhY2goZnVuY3Rpb24oZSl7ZSgpfSksQz1udWxsKSxjfSxlbnVtZXJhYmxlOiEwfX0pO3ZhciBGPXtFOntjb2xvcjpcIiMyMTk2RjNcIix0ZXh0OlwiQ0hBTkdFRDpcIn0sTjp7Y29sb3I6XCIjNENBRjUwXCIsdGV4dDpcIkFEREVEOlwifSxEOntjb2xvcjpcIiNGNDQzMzZcIix0ZXh0OlwiREVMRVRFRDpcIn0sQTp7Y29sb3I6XCIjMjE5NkYzXCIsdGV4dDpcIkFSUkFZOlwifX0sTD17bGV2ZWw6XCJsb2dcIixsb2dnZXI6Y29uc29sZSxsb2dFcnJvcnM6ITAsY29sbGFwc2VkOnZvaWQgMCxwcmVkaWNhdGU6dm9pZCAwLGR1cmF0aW9uOiExLHRpbWVzdGFtcDohMCxzdGF0ZVRyYW5zZm9ybWVyOmZ1bmN0aW9uKGUpe3JldHVybiBlfSxhY3Rpb25UcmFuc2Zvcm1lcjpmdW5jdGlvbihlKXtyZXR1cm4gZX0sZXJyb3JUcmFuc2Zvcm1lcjpmdW5jdGlvbihlKXtyZXR1cm4gZX0sY29sb3JzOnt0aXRsZTpmdW5jdGlvbigpe3JldHVyblwiaW5oZXJpdFwifSxwcmV2U3RhdGU6ZnVuY3Rpb24oKXtyZXR1cm5cIiM5RTlFOUVcIn0sYWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuXCIjMDNBOUY0XCJ9LG5leHRTdGF0ZTpmdW5jdGlvbigpe3JldHVyblwiIzRDQUY1MFwifSxlcnJvcjpmdW5jdGlvbigpe3JldHVyblwiI0YyMDQwNFwifX0sZGlmZjohMSxkaWZmUHJlZGljYXRlOnZvaWQgMCx0cmFuc2Zvcm1lcjp2b2lkIDB9LFQ9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1lLmRpc3BhdGNoLHI9ZS5nZXRTdGF0ZTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0fHxcImZ1bmN0aW9uXCI9PXR5cGVvZiByP1MoKSh7ZGlzcGF0Y2g6dCxnZXRTdGF0ZTpyfSk6dm9pZCBjb25zb2xlLmVycm9yKFwiXFxuW3JlZHV4LWxvZ2dlciB2M10gQlJFQUtJTkcgQ0hBTkdFXFxuW3JlZHV4LWxvZ2dlciB2M10gU2luY2UgMy4wLjAgcmVkdXgtbG9nZ2VyIGV4cG9ydHMgYnkgZGVmYXVsdCBsb2dnZXIgd2l0aCBkZWZhdWx0IHNldHRpbmdzLlxcbltyZWR1eC1sb2dnZXIgdjNdIENoYW5nZVxcbltyZWR1eC1sb2dnZXIgdjNdIGltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xcbltyZWR1eC1sb2dnZXIgdjNdIHRvXFxuW3JlZHV4LWxvZ2dlciB2M10gaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJ1xcblwiKX07ZS5kZWZhdWx0cz1MLGUuY3JlYXRlTG9nZ2VyPVMsZS5sb2dnZXI9VCxlLmRlZmF1bHQ9VCxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5SRUpFQ1RFRCA9IGV4cG9ydHMuRlVMRklMTEVEID0gZXhwb3J0cy5QRU5ESU5HID0gdW5kZWZpbmVkO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHByb21pc2VNaWRkbGV3YXJlO1xuXG52YXIgX2lzUHJvbWlzZSA9IHJlcXVpcmUoJy4vaXNQcm9taXNlLmpzJyk7XG5cbnZhciBfaXNQcm9taXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUHJvbWlzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogTm90ZSB0byBjb250cmlidXRvcnM6IFBsZWFzZSBhbHNvIHJlbWVtYmVyIHRvIGNoZWNrIGFuZCBtYWtlIHN1cmVcbiAqIHRoYXQgYGluZGV4LmQudHNgIGlzIGFsc28gdXAgdG8gZGF0ZSB3aXRoIHRoZSBpbXBsZW1lbnRhdGlvbiB3aGVuXG4gKiB5b3UgYWRkIG5ldyBmZWF0dXJlcyBvciBtb2RpZnkgZXhpc3Rpbmcgb25lcy5cbiAqL1xuXG4vLyBUaGUgZGVmYXVsdCBhc3luYyBhY3Rpb24gdHlwZXNcbnZhciBQRU5ESU5HID0gZXhwb3J0cy5QRU5ESU5HID0gJ1BFTkRJTkcnO1xudmFyIEZVTEZJTExFRCA9IGV4cG9ydHMuRlVMRklMTEVEID0gJ0ZVTEZJTExFRCc7XG52YXIgUkVKRUNURUQgPSBleHBvcnRzLlJFSkVDVEVEID0gJ1JFSkVDVEVEJztcbnZhciBkZWZhdWx0VHlwZXMgPSBbUEVORElORywgRlVMRklMTEVELCBSRUpFQ1RFRF07XG5cbi8qKlxuICogRnVuY3Rpb246IHByb21pc2VNaWRkbGV3YXJlXG4gKiBEZXNjcmlwdGlvbjogVGhlIG1haW4gcHJvbWlzZU1pZGRsZXdhcmUgYWNjZXB0cyBhIGNvbmZpZ3VyYXRpb25cbiAqIG9iamVjdCBhbmQgcmV0dXJucyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZnVuY3Rpb24gcHJvbWlzZU1pZGRsZXdhcmUoKSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gIHZhciBQUk9NSVNFX1RZUEVfU1VGRklYRVMgPSBjb25maWcucHJvbWlzZVR5cGVTdWZmaXhlcyB8fCBkZWZhdWx0VHlwZXM7XG4gIHZhciBQUk9NSVNFX1RZUEVfREVMSU1JVEVSID0gY29uZmlnLnByb21pc2VUeXBlRGVsaW1pdGVyIHx8ICdfJztcblxuICByZXR1cm4gZnVuY3Rpb24gKHJlZikge1xuICAgIHZhciBkaXNwYXRjaCA9IHJlZi5kaXNwYXRjaDtcblxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnN0YW50aWF0ZSB2YXJpYWJsZXMgdG8gaG9sZDpcbiAgICAgICAgICogKDEpIHRoZSBwcm9taXNlXG4gICAgICAgICAqICgyKSB0aGUgZGF0YSBmb3Igb3B0aW1pc3RpYyB1cGRhdGVzXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHZvaWQgMDtcbiAgICAgICAgdmFyIGRhdGEgPSB2b2lkIDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZXJlIGFyZSBtdWx0aXBsZSB3YXlzIHRvIGRpc3BhdGNoIGEgcHJvbWlzZS4gVGhlIGZpcnN0IHN0ZXAgaXMgdG9cbiAgICAgICAgICogZGV0ZXJtaW5lIGlmIHRoZSBwcm9taXNlIGlzIGRlZmluZWQ6XG4gICAgICAgICAqIChhKSBleHBsaWNpdGx5IChhY3Rpb24ucGF5bG9hZC5wcm9taXNlIGlzIHRoZSBwcm9taXNlKVxuICAgICAgICAgKiAoYikgaW1wbGljaXRseSAoYWN0aW9uLnBheWxvYWQgaXMgdGhlIHByb21pc2UpXG4gICAgICAgICAqIChjKSBhcyBhbiBhc3luYyBmdW5jdGlvbiAocmV0dXJucyBhIHByb21pc2Ugd2hlbiBjYWxsZWQpXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHRoZSBwcm9taXNlIGlzIG5vdCBkZWZpbmVkIGluIG9uZSBvZiB0aGVzZSB0aHJlZSB3YXlzLCB3ZSBkb24ndCBkb1xuICAgICAgICAgKiBhbnl0aGluZyBhbmQgbW92ZSBvbiB0byB0aGUgbmV4dCBtaWRkbGV3YXJlIGluIHRoZSBtaWRkbGV3YXJlIGNoYWluLlxuICAgICAgICAgKi9cblxuICAgICAgICAvLyBTdGVwIDFhOiBJcyB0aGVyZSBhIHBheWxvYWQ/XG4gICAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgICAgIHZhciBQQVlMT0FEID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICAgICAgICAvLyBTdGVwIDEuMTogSXMgdGhlIHByb21pc2UgaW1wbGljaXRseSBkZWZpbmVkP1xuICAgICAgICAgIGlmICgoMCwgX2lzUHJvbWlzZTIuZGVmYXVsdCkoUEFZTE9BRCkpIHtcbiAgICAgICAgICAgIHByb21pc2UgPSBQQVlMT0FEO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFN0ZXAgMS4yOiBJcyB0aGUgcHJvbWlzZSBleHBsaWNpdGx5IGRlZmluZWQ/XG4gICAgICAgICAgZWxzZSBpZiAoKDAsIF9pc1Byb21pc2UyLmRlZmF1bHQpKFBBWUxPQUQucHJvbWlzZSkpIHtcbiAgICAgICAgICAgICAgcHJvbWlzZSA9IFBBWUxPQUQucHJvbWlzZTtcbiAgICAgICAgICAgICAgZGF0YSA9IFBBWUxPQUQuZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3RlcCAxLjM6IElzIHRoZSBwcm9taXNlIHJldHVybmVkIGJ5IGFuIGFzeW5jIGZ1bmN0aW9uP1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIFBBWUxPQUQgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIFBBWUxPQUQucHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHByb21pc2UgPSBQQVlMT0FELnByb21pc2UgPyBQQVlMT0FELnByb21pc2UoKSA6IFBBWUxPQUQoKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gUEFZTE9BRC5wcm9taXNlID8gUEFZTE9BRC5kYXRhIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgLy8gU3RlcCAxLjMuMTogSXMgdGhlIHJldHVybiBvZiBhY3Rpb24ucGF5bG9hZCBhIHByb21pc2U/XG4gICAgICAgICAgICAgICAgaWYgKCEoMCwgX2lzUHJvbWlzZTIuZGVmYXVsdCkocHJvbWlzZSkpIHtcblxuICAgICAgICAgICAgICAgICAgLy8gSWYgbm90LCBtb3ZlIG9uIHRvIHRoZSBuZXh0IG1pZGRsZXdhcmUuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChfZXh0ZW5kcyh7fSwgYWN0aW9uLCB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHByb21pc2VcbiAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBTdGVwIDEuNDogSWYgdGhlcmUncyBubyBwcm9taXNlLCBtb3ZlIG9uIHRvIHRoZSBuZXh0IG1pZGRsZXdhcmUuXG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTdGVwIDFiOiBJZiB0aGVyZSdzIG5vIHBheWxvYWQsIG1vdmUgb24gdG8gdGhlIG5leHQgbWlkZGxld2FyZS5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc3RhbnRpYXRlIGFuZCBkZWZpbmUgY29uc3RhbnRzIGZvcjpcbiAgICAgICAgICogKDEpIHRoZSBhY3Rpb24gdHlwZVxuICAgICAgICAgKiAoMikgdGhlIGFjdGlvbiBtZXRhXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgVFlQRSA9IGFjdGlvbi50eXBlO1xuICAgICAgICB2YXIgTUVUQSA9IGFjdGlvbi5tZXRhO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnN0YW50aWF0ZSBhbmQgZGVmaW5lIGNvbnN0YW50cyBmb3IgdGhlIGFjdGlvbiB0eXBlIHN1ZmZpeGVzLlxuICAgICAgICAgKiBUaGVzZSBhcmUgYXBwZW5kZWQgdG8gdGhlIGVuZCBvZiB0aGUgYWN0aW9uIHR5cGUuXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBfUFJPTUlTRV9UWVBFX1NVRkZJWEUgPSBfc2xpY2VkVG9BcnJheShQUk9NSVNFX1RZUEVfU1VGRklYRVMsIDMpLFxuICAgICAgICAgICAgX1BFTkRJTkcgPSBfUFJPTUlTRV9UWVBFX1NVRkZJWEVbMF0sXG4gICAgICAgICAgICBfRlVMRklMTEVEID0gX1BST01JU0VfVFlQRV9TVUZGSVhFWzFdLFxuICAgICAgICAgICAgX1JFSkVDVEVEID0gX1BST01JU0VfVFlQRV9TVUZGSVhFWzJdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbjogZ2V0QWN0aW9uXG4gICAgICAgICAqIERlc2NyaXB0aW9uOiBUaGlzIGZ1bmN0aW9uIGNvbnN0cnVjdHMgYW5kIHJldHVybnMgYSByZWplY3RlZFxuICAgICAgICAgKiBvciBmdWxmaWxsZWQgYWN0aW9uIG9iamVjdC4gVGhlIGFjdGlvbiBvYmplY3QgaXMgYmFzZWQgb2ZmIHRoZSBGbHV4XG4gICAgICAgICAqIFN0YW5kYXJkIEFjdGlvbiAoRlNBKS5cbiAgICAgICAgICpcbiAgICAgICAgICogR2l2ZW4gYW4gb3JpZ2luYWwgYWN0aW9uIHdpdGggdGhlIHR5cGUgRk9POlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgcmVqZWN0ZWQgb2JqZWN0IG1vZGVsIHdpbGwgYmU6XG4gICAgICAgICAqIHtcbiAgICAgICAgICogICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICogICB0eXBlOiAnRk9PX1JFSkVDVEVEJyxcbiAgICAgICAgICogICBwYXlsb2FkOiAuLi4sXG4gICAgICAgICAqICAgbWV0YTogLi4uIChvcHRpb25hbClcbiAgICAgICAgICogfVxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgZnVsZmlsbGVkIG9iamVjdCBtb2RlbCB3aWxsIGJlOlxuICAgICAgICAgKiB7XG4gICAgICAgICAqICAgdHlwZTogJ0ZPT19GVUxGSUxMRUQnLFxuICAgICAgICAgKiAgIHBheWxvYWQ6IC4uLixcbiAgICAgICAgICogICBtZXRhOiAuLi4gKG9wdGlvbmFsKVxuICAgICAgICAgKiB9XG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgdmFyIGdldEFjdGlvbiA9IGZ1bmN0aW9uIGdldEFjdGlvbihuZXdQYXlsb2FkLCBpc1JlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgICAgICAgIC8vIENvbmNhdGVudGF0ZSB0aGUgdHlwZSBzdHJpbmcgcHJvcGVydHkuXG4gICAgICAgICAgICB0eXBlOiBbVFlQRSwgaXNSZWplY3RlZCA/IF9SRUpFQ1RFRCA6IF9GVUxGSUxMRURdLmpvaW4oUFJPTUlTRV9UWVBFX0RFTElNSVRFUilcblxuICAgICAgICAgIH0sIG5ld1BheWxvYWQgPT09IG51bGwgfHwgdHlwZW9mIG5ld1BheWxvYWQgPT09ICd1bmRlZmluZWQnID8ge30gOiB7XG4gICAgICAgICAgICBwYXlsb2FkOiBuZXdQYXlsb2FkXG4gICAgICAgICAgfSwgTUVUQSAhPT0gdW5kZWZpbmVkID8geyBtZXRhOiBNRVRBIH0gOiB7fSwgaXNSZWplY3RlZCA/IHtcbiAgICAgICAgICAgIGVycm9yOiB0cnVlXG4gICAgICAgICAgfSA6IHt9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRnVuY3Rpb246IGhhbmRsZVJlamVjdFxuICAgICAgICAgKiBDYWxsczogZ2V0QWN0aW9uIHRvIGNvbnN0cnVjdCB0aGUgcmVqZWN0ZWQgYWN0aW9uXG4gICAgICAgICAqIERlc2NyaXB0aW9uOiBUaGlzIGZ1bmN0aW9uIGRpc3BhdGNoZXMgdGhlIHJlamVjdGVkIGFjdGlvbiBhbmQgcmV0dXJuc1xuICAgICAgICAgKiB0aGUgb3JpZ2luYWwgRXJyb3Igb2JqZWN0LiBQbGVhc2Ugbm90ZSB0aGUgZGV2ZWxvcGVyIGlzIHJlc3BvbnNpYmxlXG4gICAgICAgICAqIGZvciBjb25zdHJ1Y3RpbmcgYW5kIHRocm93aW5nIGFuIEVycm9yIG9iamVjdC4gVGhlIG1pZGRsZXdhcmUgZG9lcyBub3RcbiAgICAgICAgICogY29uc3RydWN0IGFueSBFcnJvcnMuXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaGFuZGxlUmVqZWN0ID0gZnVuY3Rpb24gaGFuZGxlUmVqZWN0KHJlYXNvbikge1xuICAgICAgICAgIHZhciByZWplY3RlZEFjdGlvbiA9IGdldEFjdGlvbihyZWFzb24sIHRydWUpO1xuICAgICAgICAgIGRpc3BhdGNoKHJlamVjdGVkQWN0aW9uKTtcblxuICAgICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRnVuY3Rpb246IGhhbmRsZUZ1bGZpbGxcbiAgICAgICAgICogQ2FsbHM6IGdldEFjdGlvbiB0byBjb25zdHJ1Y3QgdGhlIGZ1bGxmaWxsZWQgYWN0aW9uXG4gICAgICAgICAqIERlc2NyaXB0aW9uOiBUaGlzIGZ1bmN0aW9uIGRpc3BhdGNoZXMgdGhlIGZ1bGZpbGxlZCBhY3Rpb24gYW5kXG4gICAgICAgICAqIHJldHVybnMgdGhlIHN1Y2Nlc3Mgb2JqZWN0LiBUaGUgc3VjY2VzcyBvYmplY3Qgc2hvdWxkXG4gICAgICAgICAqIGNvbnRhaW4gdGhlIHZhbHVlIGFuZCB0aGUgZGlzcGF0Y2hlZCBhY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaGFuZGxlRnVsZmlsbCA9IGZ1bmN0aW9uIGhhbmRsZUZ1bGZpbGwoKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xuXG4gICAgICAgICAgdmFyIHJlc29sdmVkQWN0aW9uID0gZ2V0QWN0aW9uKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgZGlzcGF0Y2gocmVzb2x2ZWRBY3Rpb24pO1xuXG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBhY3Rpb246IHJlc29sdmVkQWN0aW9uIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpcnN0LCBkaXNwYXRjaCB0aGUgcGVuZGluZyBhY3Rpb246XG4gICAgICAgICAqIFRoaXMgb2JqZWN0IGRlc2NyaWJlcyB0aGUgcGVuZGluZyBzdGF0ZSBvZiBhIHByb21pc2UgYW5kIHdpbGwgaW5jbHVkZVxuICAgICAgICAgKiBhbnkgZGF0YSAoZm9yIG9wdGltaXN0aWMgdXBkYXRlcykgYW5kL29yIG1ldGEgZnJvbSB0aGUgb3JpZ2luYWwgYWN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgbmV4dChfZXh0ZW5kcyh7XG4gICAgICAgICAgLy8gQ29uY2F0ZW50YXRlIHRoZSB0eXBlIHN0cmluZy5cbiAgICAgICAgICB0eXBlOiBbVFlQRSwgX1BFTkRJTkddLmpvaW4oUFJPTUlTRV9UWVBFX0RFTElNSVRFUilcblxuICAgICAgICB9LCBkYXRhICE9PSB1bmRlZmluZWQgPyB7IHBheWxvYWQ6IGRhdGEgfSA6IHt9LCBNRVRBICE9PSB1bmRlZmluZWQgPyB7IG1ldGE6IE1FVEEgfSA6IHt9KSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlY29uZCwgZGlzcGF0Y2ggYSByZWplY3RlZCBvciBmdWxmaWxsZWQgYWN0aW9uIGFuZCBtb3ZlIG9uIHRvIHRoZVxuICAgICAgICAgKiBuZXh0IG1pZGRsZXdhcmUuXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGhhbmRsZUZ1bGZpbGwsIGhhbmRsZVJlamVjdCk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGlzUHJvbWlzZTtcbmZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZnVuY3Rpb24gY3JlYXRlVGh1bmtNaWRkbGV3YXJlKGV4dHJhQXJndW1lbnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGRpc3BhdGNoID0gX3JlZi5kaXNwYXRjaCxcbiAgICAgICAgZ2V0U3RhdGUgPSBfcmVmLmdldFN0YXRlO1xuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9uKGRpc3BhdGNoLCBnZXRTdGF0ZSwgZXh0cmFBcmd1bWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG52YXIgdGh1bmsgPSBjcmVhdGVUaHVua01pZGRsZXdhcmUoKTtcbnRodW5rLndpdGhFeHRyYUFyZ3VtZW50ID0gY3JlYXRlVGh1bmtNaWRkbGV3YXJlO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSB0aHVuazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgJCRvYnNlcnZhYmxlID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3N5bWJvbC1vYnNlcnZhYmxlJykpO1xuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xudmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpLFxuICBSRVBMQUNFOiAnQEByZWR1eC9SRVBMQUNFJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpXG59O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgYXJndW1lbnQgYXBwZWFycyB0byBiZSBhIHBsYWluIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgaWYgKCh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmopKSAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIHByb3RvID0gb2JqO1xuICB3aGlsZSAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKSAhPT0gbnVsbCkge1xuICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFJlZHV4IHN0b3JlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIHRyZWUuXG4gKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAqXG4gKiBUaGVyZSBzaG91bGQgb25seSBiZSBhIHNpbmdsZSBzdG9yZSBpbiB5b3VyIGFwcC4gVG8gc3BlY2lmeSBob3cgZGlmZmVyZW50XG4gKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gKlxuICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICogcHJldmlvdXNseSBzZXJpYWxpemVkIHVzZXIgc2Vzc2lvbi5cbiAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2VuaGFuY2VyXSBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gKiB0aW1lIHRyYXZlbCwgcGVyc2lzdGVuY2UsIGV0Yy4gVGhlIG9ubHkgc3RvcmUgZW5oYW5jZXIgdGhhdCBzaGlwcyB3aXRoIFJlZHV4XG4gKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICpcbiAqIEByZXR1cm5zIHtTdG9yZX0gQSBSZWR1eCBzdG9yZSB0aGF0IGxldHMgeW91IHJlYWQgdGhlIHN0YXRlLCBkaXNwYXRjaCBhY3Rpb25zXG4gKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICB2YXIgX3JlZjI7XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBwcmVsb2FkZWRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICB2YXIgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBzdGF0ZSB0cmVlIG1hbmFnZWQgYnkgdGhlIHN0b3JlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgY3VycmVudCBzdGF0ZSB0cmVlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCBjYWxsIHN0b3JlLmdldFN0YXRlKCkgd2hpbGUgdGhlIHJlZHVjZXIgaXMgZXhlY3V0aW5nLiAnICsgJ1RoZSByZWR1Y2VyIGhhcyBhbHJlYWR5IHJlY2VpdmVkIHRoZSBzdGF0ZSBhcyBhbiBhcmd1bWVudC4gJyArICdQYXNzIGl0IGRvd24gZnJvbSB0aGUgdG9wIHJlZHVjZXIgaW5zdGVhZCBvZiByZWFkaW5nIGl0IGZyb20gdGhlIHN0b3JlLicpO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IGNhbGwgc3RvcmUuc3Vic2NyaWJlKCkgd2hpbGUgdGhlIHJlZHVjZXIgaXMgZXhlY3V0aW5nLiAnICsgJ0lmIHlvdSB3b3VsZCBsaWtlIHRvIGJlIG5vdGlmaWVkIGFmdGVyIHRoZSBzdG9yZSBoYXMgYmVlbiB1cGRhdGVkLCBzdWJzY3JpYmUgZnJvbSBhICcgKyAnY29tcG9uZW50IGFuZCBpbnZva2Ugc3RvcmUuZ2V0U3RhdGUoKSBpbiB0aGUgY2FsbGJhY2sgdG8gYWNjZXNzIHRoZSBsYXRlc3Qgc3RhdGUuICcgKyAnU2VlIGh0dHBzOi8vcmVkdXguanMub3JnL2FwaS1yZWZlcmVuY2Uvc3RvcmUjc3Vic2NyaWJlKGxpc3RlbmVyKSBmb3IgbW9yZSBkZXRhaWxzLicpO1xuICAgIH1cblxuICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuXG4gICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgdW5zdWJzY3JpYmUgZnJvbSBhIHN0b3JlIGxpc3RlbmVyIHdoaWxlIHRoZSByZWR1Y2VyIGlzIGV4ZWN1dGluZy4gJyArICdTZWUgaHR0cHM6Ly9yZWR1eC5qcy5vcmcvYXBpLXJlZmVyZW5jZS9zdG9yZSNzdWJzY3JpYmUobGlzdGVuZXIpIGZvciBtb3JlIGRldGFpbHMuJyk7XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgICB2YXIgaW5kZXggPSBuZXh0TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgbmV4dExpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuICAgKlxuICAgKiBUaGUgYHJlZHVjZXJgIGZ1bmN0aW9uLCB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RvcmUsIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG4gICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgKiB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuICAgKiBkaXNwYXRjaCBhIFByb21pc2UsIGFuIE9ic2VydmFibGUsIGEgdGh1bmssIG9yIHNvbWV0aGluZyBlbHNlLCB5b3UgbmVlZCB0b1xuICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3JcbiAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuICAgKiBtaWRkbGV3YXJlIHdpbGwgZXZlbnR1YWxseSBkaXNwYXRjaCBwbGFpbiBvYmplY3QgYWN0aW9ucyB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuICAgKiBhIGdvb2QgaWRlYSB0byBrZWVwIGFjdGlvbnMgc2VyaWFsaXphYmxlIHNvIHlvdSBjYW4gcmVjb3JkIGFuZCByZXBsYXkgdXNlclxuICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2VcbiAgICogc3RyaW5nIGNvbnN0YW50cyBmb3IgYWN0aW9uIHR5cGVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cbiAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgICAgbGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuICAgKlxuICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG4gICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3VcbiAgICogaW1wbGVtZW50IGEgaG90IHJlbG9hZGluZyBtZWNoYW5pc20gZm9yIFJlZHV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBuZXh0UmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbmV4dFJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UmVkdWNlciA9IG5leHRSZWR1Y2VyO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuUkVQTEFDRSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm9wZXJhYmlsaXR5IHBvaW50IGZvciBvYnNlcnZhYmxlL3JlYWN0aXZlIGxpYnJhcmllcy5cbiAgICogQHJldHVybnMge29ic2VydmFibGV9IEEgbWluaW1hbCBvYnNlcnZhYmxlIG9mIHN0YXRlIGNoYW5nZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIG9ic2VydmFibGUgcHJvcG9zYWw6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9ic2VydmFibGVcbiAgICovXG4gIGZ1bmN0aW9uIG9ic2VydmFibGUoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgb3V0ZXJTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgcmV0dXJuIF9yZWYgPSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBtaW5pbWFsIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYnNlcnZlciBBbnkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gb2JzZXJ2ZXIuXG4gICAgICAgKiBUaGUgb2JzZXJ2ZXIgb2JqZWN0IHNob3VsZCBoYXZlIGEgYG5leHRgIG1ldGhvZC5cbiAgICAgICAqIEByZXR1cm5zIHtzdWJzY3JpcHRpb259IEFuIG9iamVjdCB3aXRoIGFuIGB1bnN1YnNjcmliZWAgbWV0aG9kIHRoYXQgY2FuXG4gICAgICAgKiBiZSB1c2VkIHRvIHVuc3Vic2NyaWJlIHRoZSBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgcHJldmVudCBmdXJ0aGVyXG4gICAgICAgKiBlbWlzc2lvbiBvZiB2YWx1ZXMgZnJvbSB0aGUgb2JzZXJ2YWJsZS5cbiAgICAgICAqL1xuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JzZXJ2ZXIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9ic2VydmVyKSkgIT09ICdvYmplY3QnIHx8IG9ic2VydmVyID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn1cblxuLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XG59XG5cbmZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuICB2YXIgYWN0aW9uRGVzY3JpcHRpb24gPSBhY3Rpb25UeXBlICYmICdhY3Rpb24gXCInICsgU3RyaW5nKGFjdGlvblR5cGUpICsgJ1wiJyB8fCAnYW4gYWN0aW9uJztcblxuICByZXR1cm4gJ0dpdmVuICcgKyBhY3Rpb25EZXNjcmlwdGlvbiArICcsIHJlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZC4gJyArICdUbyBpZ25vcmUgYW4gYWN0aW9uLCB5b3UgbXVzdCBleHBsaWNpdGx5IHJldHVybiB0aGUgcHJldmlvdXMgc3RhdGUuICcgKyAnSWYgeW91IHdhbnQgdGhpcyByZWR1Y2VyIHRvIGhvbGQgbm8gdmFsdWUsIHlvdSBjYW4gcmV0dXJuIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQuJztcbn1cblxuZnVuY3Rpb24gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShpbnB1dFN0YXRlLCByZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgYXJndW1lbnROYW1lID0gYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlcy5JTklUID8gJ3ByZWxvYWRlZFN0YXRlIGFyZ3VtZW50IHBhc3NlZCB0byBjcmVhdGVTdG9yZScgOiAncHJldmlvdXMgc3RhdGUgcmVjZWl2ZWQgYnkgdGhlIHJlZHVjZXInO1xuXG4gIGlmIChyZWR1Y2VyS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJ1N0b3JlIGRvZXMgbm90IGhhdmUgYSB2YWxpZCByZWR1Y2VyLiBNYWtlIHN1cmUgdGhlIGFyZ3VtZW50IHBhc3NlZCAnICsgJ3RvIGNvbWJpbmVSZWR1Y2VycyBpcyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSByZWR1Y2Vycy4nO1xuICB9XG5cbiAgaWYgKCFpc1BsYWluT2JqZWN0KGlucHV0U3RhdGUpKSB7XG4gICAgcmV0dXJuICdUaGUgJyArIGFyZ3VtZW50TmFtZSArICcgaGFzIHVuZXhwZWN0ZWQgdHlwZSBvZiBcIicgKyB7fS50b1N0cmluZy5jYWxsKGlucHV0U3RhdGUpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKVsxXSArICdcIi4gRXhwZWN0ZWQgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyAnICsgKCdrZXlzOiBcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIicpO1xuICB9XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gIXJlZHVjZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgIXVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldO1xuICB9KTtcblxuICB1bmV4cGVjdGVkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XSA9IHRydWU7XG4gIH0pO1xuXG4gIGlmIChhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLlJFUExBQ0UpIHJldHVybjtcblxuICBpZiAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiAnVW5leHBlY3RlZCAnICsgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDEgPyAna2V5cycgOiAna2V5JykgKyAnICcgKyAoJ1wiJyArIHVuZXhwZWN0ZWRLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiIGZvdW5kIGluICcgKyBhcmd1bWVudE5hbWUgKyAnLiAnKSArICdFeHBlY3RlZCB0byBmaW5kIG9uZSBvZiB0aGUga25vd24gcmVkdWNlciBrZXlzIGluc3RlYWQ6ICcgKyAoJ1wiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiLiBVbmV4cGVjdGVkIGtleXMgd2lsbCBiZSBpZ25vcmVkLicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFJlZHVjZXJTaGFwZShyZWR1Y2Vycykge1xuICBPYmplY3Qua2V5cyhyZWR1Y2VycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1trZXldO1xuICAgIHZhciBpbml0aWFsU3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuIElmIHlvdSBkb25cXCd0IHdhbnQgdG8gc2V0IGEgdmFsdWUgZm9yIHRoaXMgcmVkdWNlciwgJyArICd5b3UgY2FuIHVzZSBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLicpO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gJ0BAcmVkdXgvUFJPQkVfVU5LTk9XTl9BQ1RJT05fJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpO1xuICAgIGlmICh0eXBlb2YgcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogdHlwZSB9KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIHdoZW4gcHJvYmVkIHdpdGggYSByYW5kb20gdHlwZS4gJyArICgnRG9uXFwndCB0cnkgdG8gaGFuZGxlICcgKyBBY3Rpb25UeXBlcy5JTklUICsgJyBvciBvdGhlciBhY3Rpb25zIGluIFwicmVkdXgvKlwiICcpICsgJ25hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlICcgKyAnY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgJyArICdpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgJyArICdhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQsIGJ1dCBjYW4gYmUgbnVsbC4nKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGRpZmZlcmVudCByZWR1Y2VyIGZ1bmN0aW9ucywgaW50byBhIHNpbmdsZVxuICogcmVkdWNlciBmdW5jdGlvbi4gSXQgd2lsbCBjYWxsIGV2ZXJ5IGNoaWxkIHJlZHVjZXIsIGFuZCBnYXRoZXIgdGhlaXIgcmVzdWx0c1xuICogaW50byBhIHNpbmdsZSBzdGF0ZSBvYmplY3QsIHdob3NlIGtleXMgY29ycmVzcG9uZCB0byB0aGUga2V5cyBvZiB0aGUgcGFzc2VkXG4gKiByZWR1Y2VyIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVkdWNlcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBjb3JyZXNwb25kIHRvIGRpZmZlcmVudFxuICogcmVkdWNlciBmdW5jdGlvbnMgdGhhdCBuZWVkIHRvIGJlIGNvbWJpbmVkIGludG8gb25lLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpblxuICogaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXMgcmVkdWNlcnNgIHN5bnRheC4gVGhlIHJlZHVjZXJzIG1heSBuZXZlciByZXR1cm5cbiAqIHVuZGVmaW5lZCBmb3IgYW55IGFjdGlvbi4gSW5zdGVhZCwgdGhleSBzaG91bGQgcmV0dXJuIHRoZWlyIGluaXRpYWwgc3RhdGVcbiAqIGlmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlbSB3YXMgdW5kZWZpbmVkLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFueVxuICogdW5yZWNvZ25pemVkIGFjdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgcmVkdWNlciBmdW5jdGlvbiB0aGF0IGludm9rZXMgZXZlcnkgcmVkdWNlciBpbnNpZGUgdGhlXG4gKiBwYXNzZWQgb2JqZWN0LCBhbmQgYnVpbGRzIGEgc3RhdGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUuXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2Vycykge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBmaW5hbFJlZHVjZXJzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gcmVkdWNlcktleXNbaV07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3YXJuaW5nKCdObyByZWR1Y2VyIHByb3ZpZGVkIGZvciBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmaW5hbFJlZHVjZXJzW2tleV0gPSByZWR1Y2Vyc1trZXldO1xuICAgIH1cbiAgfVxuICB2YXIgZmluYWxSZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKGZpbmFsUmVkdWNlcnMpO1xuXG4gIHZhciB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB2b2lkIDA7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlID0ge307XG4gIH1cblxuICB2YXIgc2hhcGVBc3NlcnRpb25FcnJvciA9IHZvaWQgMDtcbiAgdHJ5IHtcbiAgICBhc3NlcnRSZWR1Y2VyU2hhcGUoZmluYWxSZWR1Y2Vycyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaGFwZUFzc2VydGlvbkVycm9yID0gZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBjb21iaW5hdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHNbMV07XG5cbiAgICBpZiAoc2hhcGVBc3NlcnRpb25FcnJvcikge1xuICAgICAgdGhyb3cgc2hhcGVBc3NlcnRpb25FcnJvcjtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHdhcm5pbmdNZXNzYWdlID0gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShzdGF0ZSwgZmluYWxSZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpO1xuICAgICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICAgIHdhcm5pbmcod2FybmluZ01lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIG5leHRTdGF0ZSA9IHt9O1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9rZXkgPSBmaW5hbFJlZHVjZXJLZXlzW19pXTtcbiAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1tfa2V5XTtcbiAgICAgIHZhciBwcmV2aW91c1N0YXRlRm9yS2V5ID0gc3RhdGVbX2tleV07XG4gICAgICB2YXIgbmV4dFN0YXRlRm9yS2V5ID0gcmVkdWNlcihwcmV2aW91c1N0YXRlRm9yS2V5LCBhY3Rpb24pO1xuICAgICAgaWYgKHR5cGVvZiBuZXh0U3RhdGVGb3JLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShfa2V5LCBhY3Rpb24pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG5leHRTdGF0ZVtfa2V5XSA9IG5leHRTdGF0ZUZvcktleTtcbiAgICAgIGhhc0NoYW5nZWQgPSBoYXNDaGFuZ2VkIHx8IG5leHRTdGF0ZUZvcktleSAhPT0gcHJldmlvdXNTdGF0ZUZvcktleTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NoYW5nZWQgPyBuZXh0U3RhdGUgOiBzdGF0ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKCh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGFjdGlvbkNyZWF0b3JzKSkgIT09ICdvYmplY3QnIHx8IGFjdGlvbkNyZWF0b3JzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWN0aW9uQ3JlYXRvcnMgZXhwZWN0ZWQgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24sIGluc3RlYWQgcmVjZWl2ZWQgJyArIChhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYWN0aW9uQ3JlYXRvcnMpKSArICcuICcgKyAnRGlkIHlvdSB3cml0ZSBcImltcG9ydCBBY3Rpb25DcmVhdG9ycyBmcm9tXCIgaW5zdGVhZCBvZiBcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cIj8nKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgYWN0aW9uQ3JlYXRvciA9IGFjdGlvbkNyZWF0b3JzW2tleV07XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufVxuXG4vKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0b3JlIGVuaGFuY2VyIHRoYXQgYXBwbGllcyBtaWRkbGV3YXJlIHRvIHRoZSBkaXNwYXRjaCBtZXRob2RcbiAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3NpbmdcbiAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG4gKlxuICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuICpcbiAqIEJlY2F1c2UgbWlkZGxld2FyZSBpcyBwb3RlbnRpYWxseSBhc3luY2hyb25vdXMsIHRoaXMgc2hvdWxkIGJlIHRoZSBmaXJzdFxuICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuICpcbiAqIE5vdGUgdGhhdCBlYWNoIG1pZGRsZXdhcmUgd2lsbCBiZSBnaXZlbiB0aGUgYGRpc3BhdGNoYCBhbmQgYGdldFN0YXRlYCBmdW5jdGlvbnNcbiAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBtaWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSBjaGFpbiB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuICovXG5mdW5jdGlvbiBhcHBseU1pZGRsZXdhcmUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtaWRkbGV3YXJlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICB2YXIgX2Rpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGlzcGF0Y2hpbmcgd2hpbGUgY29uc3RydWN0aW5nIHlvdXIgbWlkZGxld2FyZSBpcyBub3QgYWxsb3dlZC4gJyArICdPdGhlciBtaWRkbGV3YXJlIHdvdWxkIG5vdCBiZSBhcHBsaWVkIHRvIHRoaXMgZGlzcGF0Y2guJyk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IGNvbXBvc2UuYXBwbHkodW5kZWZpbmVkLCBjaGFpbikoc3RvcmUuZGlzcGF0Y2gpO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0b3JlLCB7XG4gICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59XG5cbi8qXG4gKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4gKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4gKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoXCJZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJy4gXCIgKyAnVGhpcyBtZWFucyB0aGF0IHlvdSBhcmUgcnVubmluZyBhIHNsb3dlciBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWR1eC4gJyArICdZb3UgY2FuIHVzZSBsb29zZS1lbnZpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2xvb3NlLWVudmlmeSkgZm9yIGJyb3dzZXJpZnkgJyArICdvciBEZWZpbmVQbHVnaW4gZm9yIHdlYnBhY2sgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAwMzAwMzEpICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0cy5jcmVhdGVTdG9yZSA9IGNyZWF0ZVN0b3JlO1xuZXhwb3J0cy5jb21iaW5lUmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnM7XG5leHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IGJpbmRBY3Rpb25DcmVhdG9ycztcbmV4cG9ydHMuYXBwbHlNaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlO1xuZXhwb3J0cy5jb21wb3NlID0gY29tcG9zZTtcbmV4cG9ydHMuX19ET19OT1RfVVNFX19BY3Rpb25UeXBlcyA9IEFjdGlvblR5cGVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3BvbnlmaWxsID0gcmVxdWlyZSgnLi9wb255ZmlsbC5qcycpO1xuXG52YXIgX3BvbnlmaWxsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BvbnlmaWxsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgcm9vdDsgLyogZ2xvYmFsIHdpbmRvdyAqL1xuXG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9ICgwLCBfcG9ueWZpbGwyWydkZWZhdWx0J10pKHJvb3QpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gcmVzdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN5bWJvbE9ic2VydmFibGVQb255ZmlsbDtcbmZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBfU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBfU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKF9TeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRfU3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IE1hdGNoZXMgZnJvbSAnLi9QcmVhY3RDbGFzc2VzL01hdGNoZXMnO1xuXG5jbGFzcyBMZWFndWVNYXRjaGVzQXBwIHtcblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy5iaW5kRXZlbnRzKCk7XG5cdH1cblxuXHRiaW5kRXZlbnRzKCkge1xuXHRcdHJlbmRlcig8TWF0Y2hlcyAvPiwgdGhpcy5lbGVtZW50KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBMZWFndWVNYXRjaGVzQXBwOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBNYWluTGVhZ3VlQXBwIGZyb20gJy4vUHJlYWN0Q2xhc3Nlcy9NYWluTGVhZ3VlQXBwJztcblxuY2xhc3MgTGVhZ3VlUmVhY3RBcHAge1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLmJpbmRFdmVudHMoKTtcblx0fVxuXG5cdGJpbmRFdmVudHMoKSB7XG5cdFx0Y29uc29sZS5sb2coJ3JlbmRlcmluZycpO1xuXHRcdHJlbmRlcig8TWFpbkxlYWd1ZUFwcCAvPiwgdGhpcy5lbGVtZW50KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBMZWFndWVSZWFjdEFwcDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgTWF0Y2hVcCBmcm9tICcuL01hdGNoVXAvaW5kZXguanMnO1xuaW1wb3J0IENoYW1wcyBmcm9tICcuL0NoYW1wcy9pbmRleC5qcyc7XG5pbXBvcnQgUGxheWVycyBmcm9tICcuL1BsYXllcnMvaW5kZXguanMnO1xuXG5jbGFzcyBBcHBNYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRnZXRTcGVjaWZpY0FwcCgpIHtcblx0XHRzd2l0Y2godGhpcy5wcm9wcy5hcHBUeXBlKSB7XG5cdFx0XHRjYXNlICdtYXRjaFVwJzpcblx0XHRcdFx0cmV0dXJuIDxNYXRjaFVwIHN0b3JlPXt0aGlzLnByb3BzLnN0b3JlfS8+O1xuXG5cdFx0XHRjYXNlICdjaGFtcHMnOlxuXHRcdFx0XHRyZXR1cm4gPENoYW1wcyAvPjtcblxuXHRcdFx0Y2FzZSAncGxheWVycyc6XG5cdFx0XHRcdHJldHVybiA8UGxheWVycyAvPlxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRTcGVjaWZpY0FwcCgpO1xuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwTWFpbjsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHM6IHN0b3JlLnN0YXRzLnN0YXRzLFxuICAgICAgICBsb2FkaW5nOiBzdG9yZS5zdGF0cy5sb2FkaW5nLFxuICAgIH1cbn0pXG5jbGFzcyBDYWxjdWxhdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gJ2NhbGMnO1xuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2FsY3VsYXRvcjsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWluUGxheWVkOiBzdG9yZS5zdGF0cy5taW5QbGF5ZWRcbiAgICB9XG59KVxuY2xhc3MgUGF0Y2hlcyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZShlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9NSU5QTEFZRUQnLFxuICAgICAgICAgICAgbWluUGxheWVkOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMucHJvcHMubWluUGxheWVkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk1pbiBHYW1lcyBQbGF5ZWRcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0Y2hlczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUGF0Y2hlczogc3RvcmUuc3RhdHMuYWN0aXZlUGF0Y2hlc1xuICAgIH1cbn0pXG5jbGFzcyBQYXRjaGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICAgICAgaWYod2luZG93LmxvY2FsU3RvcmFnZS5wYXRjaGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldExvY2FsUGF0Y2hlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0UGF0Y2hlcygpO1xuICAgICAgICB9XG5cdH1cblxuICAgIHNldERlZmF1bHRQYXRjaGVzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdTRVRfQUxMX1BBVENIRVMnLFxuICAgICAgICAgICAgcGF0Y2hlczogdGhpcy5wcm9wcy5wYXRjaGVzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldExvY2FsUGF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9QQVRDSEVTJyxcbiAgICAgICAgICAgIHBhdGNoZXM6IHdpbmRvdy5sb2NhbFN0b3JhZ2UucGF0Y2hlc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc1BhdGNoQWN0aXZlKHBhdGNoKSB7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlUGF0Y2hlcyAmJiB0aGlzLnByb3BzLmFjdGl2ZVBhdGNoZXMuaW5jbHVkZXMocGF0Y2gpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NoZWNrZWQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB0b2dnbGVQYXRjaChwYXRjaCkge1xuICAgICAgICBsZXQgYWN0aXZlUGF0Y2hlcyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMucHJvcHMuYWN0aXZlUGF0Y2hlcyk7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlUGF0Y2hlcy5pbmNsdWRlcyhwYXRjaCkpIHtcbiAgICAgICAgICAgIGFjdGl2ZVBhdGNoZXMgPSBhY3RpdmVQYXRjaGVzLmZpbHRlcihhY3RpdmVQYXRjaCA9PiBhY3RpdmVQYXRjaCAhPT0gcGF0Y2gpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVQYXRjaGVzLnB1c2gocGF0Y2gpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9BTExfUEFUQ0hFUycsXG4gICAgICAgICAgICBwYXRjaGVzOiBhY3RpdmVQYXRjaGVzXG4gICAgICAgIH0pXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucGF0Y2hlcyA9IGFjdGl2ZVBhdGNoZXM7XG4gICAgfVxuXG4gICAgcmVuZGVyUGF0Y2hlcygpIHtcbiAgICAgICAgbGV0IHBhdGNoZXMgPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3BzLnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHBhdGNoZXMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9faW5wdXQtaG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNoYW5nZT17KCkgPT4geyB0aGlzLnRvZ2dsZVBhdGNoKHBhdGNoKX19IGNoZWNrZWQ9e3RoaXMuaXNQYXRjaEFjdGl2ZShwYXRjaCl9IGlkPXtgcGF0Y2gtJHtwYXRjaH1gfSB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPXtgcGF0Y2gtJHtwYXRjaH1gfT57cGF0Y2h9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXRjaGVzO1xuICAgIH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0Y2hlczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUmVnaW9uczogc3RvcmUuc3RhdHMuYWN0aXZlUmVnaW9uc1xuICAgIH1cbn0pXG5jbGFzcyBSZWdpb25zIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0UmVnaW9ucygpO1xuXHR9XG5cbiAgICBzZXREZWZhdWx0UmVnaW9ucygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9SRUdJT05TJyxcbiAgICAgICAgICAgIHJlZ2lvbnM6IHRoaXMucHJvcHMucmVnaW9uc1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGlzUmVnaW9uQWN0aXZlKHJlZ2lvbikge1xuICAgICAgICBpZih0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMgJiYgdGhpcy5wcm9wcy5hY3RpdmVSZWdpb25zLmluY2x1ZGVzKHJlZ2lvbikpIHtcbiAgICAgICAgICAgIHJldHVybiAnY2hlY2tlZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHRvZ2dsZVJlZ2lvbihyZWdpb24pIHtcbiAgICAgICAgbGV0IGFjdGl2ZVJlZ2lvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMpO1xuICAgICAgICBpZih0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMuaW5jbHVkZXMocmVnaW9uKSkge1xuICAgICAgICAgICAgYWN0aXZlUmVnaW9ucyA9IGFjdGl2ZVJlZ2lvbnMuZmlsdGVyKGFjdGl2ZVJlZ2lvbiA9PiBhY3RpdmVSZWdpb24gIT09IHJlZ2lvbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZVJlZ2lvbnMucHVzaChyZWdpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9BTExfUkVHSU9OUycsXG4gICAgICAgICAgICByZWdpb25zOiBhY3RpdmVSZWdpb25zXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyUmVnaW9ucygpIHtcbiAgICAgICAgbGV0IHJlZ2lvbnMgPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3BzLnJlZ2lvbnMsIHJlZ2lvbiA9PiB7XG4gICAgICAgICAgICByZWdpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX2lucHV0LWhvbGRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgb25DaGFuZ2U9eygpID0+IHsgdGhpcy50b2dnbGVSZWdpb24ocmVnaW9uKX19IGNoZWNrZWQ9e3RoaXMuaXNSZWdpb25BY3RpdmUocmVnaW9uKX0gaWQ9e2ByZWdpb24tJHtyZWdpb259YH0gdHlwZT1cImNoZWNrYm94XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj17YHJlZ2lvbi0ke3JlZ2lvbn1gfT57cmVnaW9ufTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVnaW9ucztcbiAgICB9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclJlZ2lvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lvbnM7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBTdGF0cyBmcm9tICcuL21ldGhvZHMvU3RhdHMnO1xuaW1wb3J0IHsgaWRUb0NoYW1wIH0gZnJvbSAnLi9tZXRob2RzL0NoYW1wRnVuY3MnO1xuXG5pbXBvcnQgQ2FsY3VsYXRvciBmcm9tICcuL0NhbGN1bGF0b3InO1xuaW1wb3J0IFRhYmxlIGZyb20gJy4vVGFibGUnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0czogc3RvcmUuc3RhdHMuc3RhdHMsXG4gICAgICAgIGFjdGl2ZVJlZ2lvbnM6IHN0b3JlLnN0YXRzLmFjdGl2ZVJlZ2lvbnMsXG4gICAgICAgIGFjdGl2ZVBhdGNoZXM6IHN0b3JlLnN0YXRzLmFjdGl2ZVBhdGNoZXMsXG4gICAgICAgIGFjdGl2ZVZhcmlhYmxlczogc3RvcmUuc3RhdHMuYWN0aXZlVmFyaWFibGVzLFxuICAgICAgICBtaW5QbGF5ZWQ6IHN0b3JlLnN0YXRzLm1pblBsYXllZFxuICAgIH1cbn0pXG5jbGFzcyBTdGF0c0Jsb2NrIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmVSZWdpb25zOiB0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMsXG4gICAgICAgICAgICBhY3RpdmVQYXRjaGVzOiB0aGlzLnByb3BzLmFjdGl2ZVBhdGNoZXMsXG4gICAgICAgICAgICBhY3RpdmU6ICd0YWJsZSdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhdHNDbGFzcyA9IG5ldyBTdGF0cyh0aGlzLnByb3BzLnN0YXRzKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVTdGF0cygpO1xuXHR9XG5cbiAgICBjYWxjdWxhdGVTdGF0cygpIHtcbiAgICAgICAgdGhpcy5zdGF0c0NsYXNzLnNldFN0YXRlcyh0aGlzLnN0YXRlLmFjdGl2ZVJlZ2lvbnMsIHRoaXMuc3RhdGUuYWN0aXZlUGF0Y2hlcyk7XG4gICAgICAgIHRoaXMuc3RhdHNDbGFzcy5jYWxjdWxhdGUoKTtcbiAgICB9XG5cbiAgICBnZXRQZXJjZW50YWdlKGEsIGIpIHtcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChhIC8gYikgKiAxMDA7XG4gICAgICAgIHJldHVybiBgJHtNYXRoLmZsb29yKHBlcmNlbnRhZ2UpfSVgO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZUNvbHVtbih2YXJpYWJsZSkge1xuICAgICAgICB0aGlzLnN0YXRzQ2xhc3Muc2V0T3JkZXIodmFyaWFibGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNoYW1wUXVlcnkoKTtcbiAgICB9XG5cbiAgICBjaGVja0ZpcnN0Q2hhbXBzKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmNoYW1wcyk7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLmNoYW1wcyAmJiB0aGlzLnN0YXRzQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhbXBRdWVyeSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ2hhbXBRdWVyeSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjaGFtcHM6IHRoaXMuc3RhdHNDbGFzcy5nZXRDaGFtcHMoKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0NvbHVtbkFjdGl2ZSh2YXJpYWJsZSkge1xuICAgICAgICBpZih0aGlzLnN0YXRzQ2xhc3MgJiYgdmFyaWFibGUuc3RhdE5hbWUgPT09IHRoaXMuc3RhdHNDbGFzcy5nZXRPcmRlclZhcmlhYmxlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXJDaGFtcENvbHVtbnMoKSB7XG4gICAgICAgIGxldCBjb2x1bW5zID0gW107XG4gICAgICAgIEFycmF5LmZyb20odGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMsIHZhcmlhYmxlID0+IHtcbiAgICAgICAgICAgIGNvbHVtbnMucHVzaCg8dGggY2xhc3NOYW1lPXt0aGlzLmlzQ29sdW1uQWN0aXZlKHZhcmlhYmxlKSA/ICdpcy1hY3RpdmUnIDogJyd9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0QWN0aXZlQ29sdW1uKHZhcmlhYmxlKX0+e3ZhcmlhYmxlLmZyaWVuZGx5TmFtZX08L3RoPilcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNvbHVtbnM7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2hhbXBDZWxscyhjaGFtcCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyIG5ldycpO1xuICAgICAgICBsZXQgY2VsbHMgPSBbXTtcblxuICAgICAgICBBcnJheS5mcm9tKHRoaXMucHJvcHMuYWN0aXZlVmFyaWFibGVzLCB2YXJpYWJsZSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VsbCA9ICcnO1xuICAgICAgICAgICAgaWYodmFyaWFibGUudHlwZSA9PT0gJ3BlcmNlbnQnKSB7XG4gICAgICAgICAgICAgICAgY2VsbCA9IDx0ZD57dGhpcy5nZXRQZXJjZW50YWdlKGNoYW1wW3ZhcmlhYmxlLnN0YXROYW1lXSwgY2hhbXAucGxheWVkKX08L3RkPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodmFyaWFibGUudHlwZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICAgIGNlbGwgPSA8dGQ+e2NoYW1wW3ZhcmlhYmxlLnN0YXROYW1lXX08L3RkPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgIH1cblxuICAgIHJlbmRlcmZpcnN0Q2hhbXBzKCkge1xuICAgICAgICB0aGlzLmNoZWNrRmlyc3RDaGFtcHMoKTtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5jaGFtcHMpIHtcbiAgICAgICAgICAgIGxldCBmaXJzdEFycmF5ID0gW107XG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuc3RhdGUuY2hhbXBzLCBjaGFtcCA9PiB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5taW5QbGF5ZWQgJiYgdGhpcy5wcm9wcy5taW5QbGF5ZWQgPiBjaGFtcC5wbGF5ZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBmaXJzdEFycmF5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57aWRUb0NoYW1wKGNoYW1wLmlkKX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hhbXBDZWxscyhjaGFtcCl9XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBmaXJzdEFycmF5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU3dpdGNoZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxhIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiAndGFibGUnfSl9fT5UYWJsZTwvYT5cbiAgICAgICAgICAgICAgICA8YSBvbkNsaWNrPXsoKSA9PiB7IHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogJ2NhbGN1bGF0b3InfSl9fT5DYWxjdWxhdG9yPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgc3dpdGNoKHRoaXMuc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgICAgICBjYXNlICd0YWJsZSc6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmcgbmV3IHRhYmxlJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxUYWJsZSBzdGF0c0NsYXNzPXt0aGlzLnN0YXRzQ2xhc3N9Lz5cbiAgICAgICAgICAgIGNhc2UgJ2NhbGN1bGF0b3InOlxuICAgICAgICAgICAgICAgIHJldHVybiA8Q2FsY3VsYXRvciAvPlxuICAgICAgICAgICAgZGVmYXVsdDogXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTd2l0Y2hlcigpfVxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5hY3RpdmVQYXRjaGVzICE9PSBuZXdQcm9wcy5hY3RpdmVQYXRjaGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhY3RpdmVQYXRjaGVzOiBuZXdQcm9wcy5hY3RpdmVQYXRjaGVzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnN0YXRlLmFjdGl2ZVJlZ2lvbnMgIT09IG5ld1Byb3BzLmFjdGl2ZVJlZ2lvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGFjdGl2ZVJlZ2lvbnM6IG5ld1Byb3BzLmFjdGl2ZVJlZ2lvbnNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVN0YXRzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYW1wUXVlcnkoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBTdGF0c0Jsb2NrOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBpZFRvQ2hhbXAgfSBmcm9tICcuL21ldGhvZHMvQ2hhbXBGdW5jcyc7XG5cbkBjb25uZWN0KChzdG9yZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXRzOiBzdG9yZS5zdGF0cy5zdGF0cyxcbiAgICAgICAgYWN0aXZlUmVnaW9uczogc3RvcmUuc3RhdHMuYWN0aXZlUmVnaW9ucyxcbiAgICAgICAgYWN0aXZlUGF0Y2hlczogc3RvcmUuc3RhdHMuYWN0aXZlUGF0Y2hlcyxcbiAgICAgICAgYWN0aXZlVmFyaWFibGVzOiBzdG9yZS5zdGF0cy5hY3RpdmVWYXJpYWJsZXMsXG4gICAgICAgIG1pblBsYXllZDogc3RvcmUuc3RhdHMubWluUGxheWVkXG4gICAgfVxufSlcbmNsYXNzIFRhYmxlIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXG5cdGdldFBlcmNlbnRhZ2UoYSwgYikge1xuICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gKGEgLyBiKSAqIDEwMDtcbiAgICAgICAgcmV0dXJuIGAke01hdGguZmxvb3IocGVyY2VudGFnZSl9JWA7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlQ29sdW1uKHZhcmlhYmxlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3RhdHNDbGFzcy5zZXRPcmRlcih2YXJpYWJsZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2hhbXBRdWVyeSgpO1xuICAgIH1cblxuICAgIGNoZWNrRmlyc3RDaGFtcHMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuY2hhbXBzKTtcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUuY2hhbXBzICYmIHRoaXMucHJvcHMuc3RhdHNDbGFzcykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFtcFF1ZXJ5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDaGFtcFF1ZXJ5KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNoYW1wczogdGhpcy5wcm9wcy5zdGF0c0NsYXNzLmdldENoYW1wcygpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzQ29sdW1uQWN0aXZlKHZhcmlhYmxlKSB7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuc3RhdHNDbGFzcyAmJiB2YXJpYWJsZS5zdGF0TmFtZSA9PT0gdGhpcy5wcm9wcy5zdGF0c0NsYXNzLmdldE9yZGVyVmFyaWFibGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlckNoYW1wQ29sdW1ucygpIHtcbiAgICAgICAgbGV0IGNvbHVtbnMgPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3BzLmFjdGl2ZVZhcmlhYmxlcywgdmFyaWFibGUgPT4ge1xuICAgICAgICAgICAgY29sdW1ucy5wdXNoKDx0aCBjbGFzc05hbWU9e3RoaXMuaXNDb2x1bW5BY3RpdmUodmFyaWFibGUpID8gJ2lzLWFjdGl2ZScgOiAnJ30gb25DbGljaz17KCkgPT4gdGhpcy5zZXRBY3RpdmVDb2x1bW4odmFyaWFibGUpfT57dmFyaWFibGUuZnJpZW5kbHlOYW1lfTwvdGg+KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29sdW1ucztcbiAgICB9XG5cbiAgICByZW5kZXJDaGFtcENlbGxzKGNoYW1wKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXIgbmV3Jyk7XG4gICAgICAgIGxldCBjZWxscyA9IFtdO1xuXG4gICAgICAgIEFycmF5LmZyb20odGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMsIHZhcmlhYmxlID0+IHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gJyc7XG4gICAgICAgICAgICBpZih2YXJpYWJsZS50eXBlID09PSAncGVyY2VudCcpIHtcbiAgICAgICAgICAgICAgICBjZWxsID0gPHRkPnt0aGlzLmdldFBlcmNlbnRhZ2UoY2hhbXBbdmFyaWFibGUuc3RhdE5hbWVdLCBjaGFtcC5wbGF5ZWQpfTwvdGQ+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2YXJpYWJsZS50eXBlID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgY2VsbCA9IDx0ZD57Y2hhbXBbdmFyaWFibGUuc3RhdE5hbWVdfTwvdGQ+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZWxscy5wdXNoKGNlbGwpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgfVxuXG4gICAgcmVuZGVyZmlyc3RDaGFtcHMoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tGaXJzdENoYW1wcygpO1xuICAgICAgICBpZih0aGlzLnN0YXRlLmNoYW1wcykge1xuICAgICAgICAgICAgbGV0IGZpcnN0QXJyYXkgPSBbXTtcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5zdGF0ZS5jaGFtcHMsIGNoYW1wID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnByb3BzLm1pblBsYXllZCAmJiB0aGlzLnByb3BzLm1pblBsYXllZCA+IGNoYW1wLnBsYXllZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGZpcnN0QXJyYXkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpZFRvQ2hhbXAoY2hhbXAuaWQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGFtcENlbGxzKGNoYW1wKX1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0QXJyYXk7XG4gICAgICAgIH1cblx0fVxuXHRcblx0Y2hlY2tTdGF0c1VwZGF0ZWQoKSB7XG5cdFx0aWYoISh0aGlzLnByb3BzLnN0YXRzQ2xhc3MuZ2V0Q2hhbXBzKCkgPT09IHRoaXMuc3RhdGUuY2hhbXBzKSkge1xuXHRcdFx0dGhpcy51cGRhdGVDaGFtcFF1ZXJ5KCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2hlY2tTdGF0c1VwZGF0ZWQoKTtcbiAgICAgICAgY29uc3QgY2hhbXBDb2x1bW4gPSB7dHlwZSA6ICdhbHBoYWJldGljYWxseScsIGRlZmF1bHRPcmRlciA6ICdhc2MnLCBzdGF0TmFtZSA6ICdhbHBoYWJldGljYWxseSd9XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGVfX2hvbGRlclwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17dGhpcy5pc0NvbHVtbkFjdGl2ZShjaGFtcENvbHVtbikgPyAnaXMtYWN0aXZlJyA6ICcnfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldEFjdGl2ZUNvbHVtbihjaGFtcENvbHVtbil9PkNoYW1wPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGFtcENvbHVtbnMoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJmaXJzdENoYW1wcygpfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuXHR9XG5cdFxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRmlsdGVycyBmcm9tICcuL21ldGhvZHMvRmlsdGVycyc7XG5cbmltcG9ydCBQYXRjaGVzIGZyb20gJy4vUGF0Y2hlcyc7XG5pbXBvcnQgUmVnaW9ucyBmcm9tICcuL1JlZ2lvbnMnO1xuaW1wb3J0IFZhcmlhYmxlcyBmcm9tICcuL1ZhcmlhYmxlcyc7XG5pbXBvcnQgTWluUGxheWVkIGZyb20gJy4vTWluUGxheWVkJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHM6IHN0b3JlLnN0YXRzLnN0YXRzLFxuICAgICAgICBsb2FkaW5nOiBzdG9yZS5zdGF0cy5sb2FkaW5nLFxuICAgIH1cbn0pXG5jbGFzcyBUb3BOYXYgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IG5ldyBGaWx0ZXJzKHRoaXMucHJvcHMuc3RhdHMpO1xuXG4gICAgICAgIHRoaXMucmVnaW9ucyA9IHRoaXMuZmlsdGVycy5nZXRSZWdpb25zKCk7XG4gICAgICAgIHRoaXMucGF0Y2hlcyA9IHRoaXMuZmlsdGVycy5nZXRQYXRjaGVzKCk7XG4gICAgICAgIHRoaXMudmFyaWFibGVzID0gdGhpcy5maWx0ZXJzLmdldFZhcmlhYmxlcygpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9faG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX2Ryb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9fdGl0bGVcIj5QYXRjaGVzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGF0Y2hlcyBwYXRjaGVzPXt0aGlzLnBhdGNoZXN9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X19kcm9wZG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX3RpdGxlXCI+UmVnaW9uczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJlZ2lvbnMgcmVnaW9ucz17dGhpcy5yZWdpb25zfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9fZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X190aXRsZVwiPlZhcmlhYmxlczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFZhcmlhYmxlcyB2YXJpYWJsZXM9e3RoaXMudmFyaWFibGVzfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9fZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X190aXRsZVwiPk1pbiBQbGF5ZWQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNaW5QbGF5ZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wTmF2OyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVWYXJpYWJsZXM6IHN0b3JlLnN0YXRzLmFjdGl2ZVZhcmlhYmxlc1xuICAgIH1cbn0pXG5jbGFzcyBWYXJpYWJsZXMgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgICAgICBpZih3aW5kb3cubG9jYWxTdG9yYWdlLnZhcmlhYmxlcykge1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFZhcmlhYmxlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0VmFyaWFibGVzKCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgc2V0RGVmYXVsdFZhcmlhYmxlcygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9WQVJJQUJMRVMnLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB0aGlzLnByb3BzLnZhcmlhYmxlc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgc2V0TG9jYWxWYXJpYWJsZXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRpbmcgbG9jYWwnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9WQVJJQUJMRVMnLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UudmFyaWFibGVzKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc1ZhcmlhYmxlQWN0aXZlKHZhcmlhYmxlKSB7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlVmFyaWFibGVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tlcicsIHRoaXMucHJvcHMuYWN0aXZlVmFyaWFibGVzLnNvbWUoYWN0aXZlVmFyaWFibGUgPT4gYWN0aXZlVmFyaWFibGUuc3RhdE5hbWUgPT09IHZhcmlhYmxlLnN0YXROYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMgJiYgdGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMuc29tZShhY3RpdmVWYXJpYWJsZSA9PiBhY3RpdmVWYXJpYWJsZS5zdGF0TmFtZSA9PT0gdmFyaWFibGUuc3RhdE5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NoZWNrZWQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB0b2dnbGVWYXJpYWJsZSh2YXJpYWJsZSkge1xuICAgICAgICBsZXQgYWN0aXZlVmFyaWFibGVzID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMpO1xuICAgICAgICBpZih0aGlzLnByb3BzLmFjdGl2ZVZhcmlhYmxlcy5zb21lKGFjdGl2ZVZhcmlhYmxlID0+IGFjdGl2ZVZhcmlhYmxlLnN0YXROYW1lID09PSB2YXJpYWJsZS5zdGF0TmFtZSkpIHtcbiAgICAgICAgICAgIGFjdGl2ZVZhcmlhYmxlcyA9IGFjdGl2ZVZhcmlhYmxlcy5maWx0ZXIoYWN0aXZlVmFyaWFibGUgPT4gYWN0aXZlVmFyaWFibGUuc3RhdE5hbWUgIT09IHZhcmlhYmxlLnN0YXROYW1lKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlVmFyaWFibGVzLnB1c2godmFyaWFibGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9BTExfVkFSSUFCTEVTJyxcbiAgICAgICAgICAgIHZhcmlhYmxlczogYWN0aXZlVmFyaWFibGVzXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKCdhY3RpdmUgdmFycyBhcmUgJywgYWN0aXZlVmFyaWFibGVzKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS52YXJpYWJsZXMgPSBKU09OLnN0cmluZ2lmeShhY3RpdmVWYXJpYWJsZXMpO1xuICAgIH1cblxuICAgIHJlbmRlclZhcmlhYmxlcygpIHtcbiAgICAgICAgbGV0IHZhcmlhYmxlcyA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKHRoaXMucHJvcHMudmFyaWFibGVzLCB2YXJpYWJsZSA9PiB7XG4gICAgICAgICAgICB2YXJpYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9faW5wdXQtaG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNoYW5nZT17KCkgPT4geyB0aGlzLnRvZ2dsZVZhcmlhYmxlKHZhcmlhYmxlKX19IGNoZWNrZWQ9e3RoaXMuaXNWYXJpYWJsZUFjdGl2ZSh2YXJpYWJsZSl9IGlkPXtgdmFyaWFibGUtJHt2YXJpYWJsZS5mcmllbmRseU5hbWV9YH0gdHlwZT1cImNoZWNrYm94XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj17YHZhcmlhYmxlLSR7dmFyaWFibGUuZnJpZW5kbHlOYW1lfWB9Pnt2YXJpYWJsZS5mcmllbmRseU5hbWV9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YXJpYWJsZXM7XG4gICAgfVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWYXJpYWJsZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFZhcmlhYmxlczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IFN0YXRzQmxvY2sgZnJvbSAnLi9TdGF0c0Jsb2NrJztcbmltcG9ydCBUb3BOYXYgZnJvbSAnLi9Ub3BOYXYnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0czogc3RvcmUuc3RhdHMuc3RhdHMsXG4gICAgICAgIGxvYWRpbmc6IHN0b3JlLnN0YXRzLmxvYWRpbmcsXG4gICAgfVxufSlcbmNsYXNzIENoYW1wcyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5yZWdpb25zID0gWydOQUxDUycsICdFVUxDUycsICdDQkxPTCcsICdMQ0snLCAnTE1TJywgJ1RDTCcsICdPUEwnXVxuXHRcdGlmKCF0aGlzLnByb3BzLnN0YXRzKSB7XG5cdFx0XHR0aGlzLmZldGNoU3RhdHMoKTtcblx0XHR9XG5cdH1cblxuXHRmZXRjaFN0YXRzKCkge1xuXHRcdEFycmF5LmZyb20odGhpcy5yZWdpb25zLCByZWdpb24gPT4ge1xuXHRcdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6ICdGRVRDSF9TVEFUUycsXG5cdFx0XHRcdHBheWxvYWQ6IGZldGNoKGAvYXBpLyR7cmVnaW9ufS9mdWxsLmpzb25gKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSksXG5cdFx0XHRcdG1ldGE6IHJlZ2lvblxuXHRcdFx0fSk7XG5cdFx0fSlcblx0fVxuXG5cdGhhbmRsZVJlc2V0Q2xpY2soKSB7XG5cdFx0d2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd2YXJpYWJsZXMnKTtcblx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3BhdGNoZXMnKTtcblx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlZ2lvbnMnKTtcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHtcblx0XHRcdHR5cGU6ICdSRVNFVF9DSEFNUFMnXG5cdFx0fSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRyZXNldDogdHJ1ZVxuXHRcdH0pO1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdHJlc2V0OiBmYWxzZVxuXHRcdFx0fSk7XG5cdFx0fSwgMSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYodGhpcy5zdGF0ZS5yZXNldCkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRSZXNldHRpbmdcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmxvYWRpbmcgfHwgIXRoaXMucHJvcHMuc3RhdHMpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXY+bG9hZGluZzwvZGl2PlxuXHRcdFx0KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWIyMFwiPlxuXHRcdFx0XHRcdFx0PGEgb25DbGljaz17dGhpcy5oYW5kbGVSZXNldENsaWNrLmJpbmQodGhpcyl9PlJlc2V0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxUb3BOYXYgLz5cblx0XHRcdFx0XHQ8U3RhdHNCbG9jayAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaGFtcHM7IiwiZXhwb3J0IGZ1bmN0aW9uIGlkVG9DaGFtcChpZCkge1xuICAgIGNvbnN0IGNoYW1wZGljdCA9IHsnMTQ1JyA6ICdLYWlTYScsICc1NTUnIDogJ1B5a2UnLCAnNzcnOiAnVWR5cicsICc0MjcnOiAnSXZlcm4nLCAnODUnOiAnS2VubmVuJywgJzE4JzogJ1RyaXN0YW5hJywgJzc4JzogJ1BvcHB5JywgJzknOiAnRmlkZGxlc3RpY2tzJywgJzI2Nyc6ICdOYW1pJywgJzE1JzogJ1NpdmlyJywgJzE5JzogJ1dhcndpY2snLCAnNTQnOiAnTWFscGhpdGUnLCAnMTY0JzogJ0NhbWlsbGUnLCAnMTQnOiAnU2lvbicsICc2JzogJ1VyZ290JywgJzYxJzogJ09yaWFubmEnLCAnNDUnOiAnVmVpZ2FyJywgJzQ0JzogJ1RhcmljJywgJzYwJzogJ0VsaXNlJywgJzIwJzogJ051bnUnLCAnMTA2JzogJ1ZvbGliZWFyJywgJzExMCc6ICdWYXJ1cycsICc2Mic6ICdNb25rZXlLaW5nJywgJzE2MSc6ICdWZWxrb3onLCAnNDI5JzogJ0thbGlzdGEnLCAnMjcnOiAnU2luZ2VkJywgJzQ5OCc6ICdYYXlhaCcsICc4Myc6ICdZb3JpY2snLCAnNTMnOiAnQmxpdHpjcmFuaycsICcxMzMnOiAnUXVpbm4nLCAnMjQ1JzogJ0Vra28nLCAnNzQnOiAnSGVpbWVyZGluZ2VyJywgJzU3JzogJ01hb2thaScsICcyNSc6ICdNb3JnYW5hJywgJzE2Myc6ICdUYWxpeWFoJywgJzYzJzogJ0JyYW5kJywgJzEwNyc6ICdSZW5nYXInLCAnMTAnOiAnS2F5bGUnLCAnNDEnOiAnR2FuZ3BsYW5rJywgJzIwMyc6ICdLaW5kcmVkJywgJzIyMyc6ICdUYWhtS2VuY2gnLCAnMTI3JzogJ0xpc3NhbmRyYScsICcxMyc6ICdSeXplJywgJzEwNSc6ICdGaXp6JywgJzE3JzogJ1RlZW1vJywgJzExNyc6ICdMdWx1JywgJzI1NCc6ICdWaScsICczNCc6ICdBbml2aWEnLCAnMTAyJzogJ1NoeXZhbmEnLCAnNyc6ICdMZWJsYW5jJywgJzkyJzogJ1JpdmVuJywgJzMxJzogJ0Nob2dhdGgnLCAnNDMnOiAnS2FybWEnLCAnMjIyJzogJ0ppbngnLCAnMjM2JzogJ0x1Y2lhbicsICczOSc6ICdJcmVsaWEnLCAnMTQxJzogJ0theW4nLCAnODYnOiAnR2FyZW4nLCAnMjYnOiAnWmlsZWFuJywgJzk5JzogJ0x1eCcsICc0JzogJ1R3aXN0ZWRGYXRlJywgJzU4JzogJ1JlbmVrdG9uJywgJzY4JzogJ1J1bWJsZScsICcxMzQnOiAnU3luZHJhJywgJzUxJzogJ0NhaXRseW4nLCAnMjknOiAnVHdpdGNoJywgJzQyMSc6ICdSZWtTYWknLCAnNDk3JzogJ1Jha2FuJywgJzI0MCc6ICdLbGVkJywgJzI2Nic6ICdBYXRyb3gnLCAnMTExJzogJ05hdXRpbHVzJywgJzM2JzogJ0RyTXVuZG8nLCAnMzInOiAnQW11bXUnLCAnMTEzJzogJ1NlanVhbmknLCAnMTIxJzogJ0toYXppeCcsICc1MCc6ICdTd2FpbicsICc3Mic6ICdTa2FybmVyJywgJzEyNic6ICdKYXljZScsICcxMjAnOiAnSGVjYXJpbScsICcxMDQnOiAnR3JhdmVzJywgJzQ4JzogJ1RydW5kbGUnLCAnMTQzJzogJ1p5cmEnLCAnMzMnOiAnUmFtbXVzJywgJzI2OCc6ICdBemlyJywgJzIwMSc6ICdCcmF1bScsICcyMyc6ICdUcnluZGFtZXJlJywgJzY5JzogJ0Nhc3Npb3BlaWEnLCAnMTEyJzogJ1Zpa3RvcicsICczOCc6ICdLYXNzYWRpbicsICc4OSc6ICdMZW9uYScsICcyNCc6ICdKYXgnLCAnNTE2JzogJ09ybm4nLCAnMTMxJzogJ0RpYW5hJywgJzQzMic6ICdCYXJkJywgJzc2JzogJ05pZGFsZWUnLCAnNDInOiAnQ29ya2knLCAnOTAnOiAnTWFsemFoYXInLCAnMTQyJzogJ1pvZScsICcxJzogJ0FubmllJywgJzExOSc6ICdEcmF2ZW4nLCAnNjQnOiAnTGVlU2luJywgJzgnOiAnVmxhZGltaXInLCAnMzcnOiAnU29uYScsICcxMTQnOiAnRmlvcmEnLCAnNDAnOiAnSmFubmEnLCAnNTknOiAnSmFydmFuSVYnLCAnNDIwJzogJ0lsbGFvaScsICc1JzogJ1hpblpoYW8nLCAnMzUnOiAnU2hhY28nLCAnMTAzJzogJ0FocmknLCAnNjcnOiAnVmF5bmUnLCAnODQnOiAnQWthbGknLCAnMjAyJzogJ0poaW4nLCAnMTUwJzogJ0duYXInLCAnOTEnOiAnVGFsb24nLCAnNTUnOiAnS2F0YXJpbmEnLCAnMzAnOiAnS2FydGh1cycsICcyMzgnOiAnWmVkJywgJzInOiAnT2xhZicsICcyOCc6ICdFdmVseW5uJywgJzk4JzogJ1NoZW4nLCAnMTYnOiAnU29yYWthJywgJzU2JzogJ05vY3R1cm5lJywgJzExJzogJ01hc3RlcllpJywgJzEyMic6ICdEYXJpdXMnLCAnMTU3JzogJ1lhc3VvJywgJzk2JzogJ0tvZ01hdycsICcxMic6ICdBbGlzdGFyJywgJzQxMic6ICdUaHJlc2gnLCAnODInOiAnTW9yZGVrYWlzZXInLCAnMTE1JzogJ1ppZ2dzJywgJzgxJzogJ0V6cmVhbCcsICcxMDEnOiAnWGVyYXRoJywgJzc5JzogJ0dyYWdhcycsICc3NSc6ICdOYXN1cycsICcyMSc6ICdNaXNzRm9ydHVuZScsICcxMzYnOiAnQXVyZWxpb25Tb2wnLCAnMjInOiAnQXNoZScsICc4MCc6ICdQYW50aGVvbicsICczJzogJ0dhbGlvJywgJzE1NCc6ICdaYWMnfVxuXHRyZXR1cm4gY2hhbXBkaWN0W2lkXTtcbn0iLCJjbGFzcyBGaWx0ZXJzIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0cykge1xuICAgICAgICB0aGlzLnN0YXRzID0gc3RhdHM7XG4gICAgICAgIHRoaXMucmVnaW9ucyA9IE9iamVjdC5rZXlzKHN0YXRzKTtcbiAgICB9XG5cbiAgICBnZXRSZWdpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpb25zO1xuICAgIH1cblxuICAgIGdldFZhcmlhYmxlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ2ZiVGVhbScsIGZyaWVuZGx5TmFtZTogJ0ZpcnN0IEJsb29kIFRlYW0nLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJ30sXG4gICAgICAgICAgICB7c3RhdE5hbWU6ICdmYktpbGxlcicsIGZyaWVuZGx5TmFtZTogJ0ZpcnN0IEJsb29kIEtpbGxlcicsIHR5cGU6ICdwZXJjZW50JywgZGVmYXVsdE9yZGVyIDogJ2Rlc2MnfSxcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ2ZiQXNzaXN0JywgZnJpZW5kbHlOYW1lOiAnRmlyc3QgQmxvb2QgQXNzaXN0JywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYyd9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnZmlyc3REZWF0aCcsIGZyaWVuZGx5TmFtZTogJ0ZpcnN0IERlYXRoJywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYyd9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnZnRUZWFtJywgZnJpZW5kbHlOYW1lOiAnRmlyc3QgVG93ZXIgVGVhbScsIHR5cGU6ICdwZXJjZW50JywgZGVmYXVsdE9yZGVyIDogJ2Rlc2MnfSxcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ2Z0S2lsbGVyJywgZnJpZW5kbHlOYW1lOiAnRmlyc3QgVG93ZXIgS2lsbGVyJywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYyd9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnZmRUZWFtJywgZnJpZW5kbHlOYW1lOiAnRmlyc3QgRHJhZ29uIFRlYW0nLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJ30sXG4gICAgICAgICAgICB7c3RhdE5hbWU6ICdwbGF5ZWQnLCBmcmllbmRseU5hbWU6ICdHYW1lcyBQbGF5ZWQnLCB0eXBlOiAndmFsdWUnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYyd9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnd2luJywgZnJpZW5kbHlOYW1lOiAnV2luJywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYyd9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0UGF0Y2hlcygpIHtcbiAgICAgICAgaWYodGhpcy5wYXRjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRjaGVzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0Y2hlcyA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKHRoaXMucmVnaW9ucywgcmVnaW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2lvbk1hdGNoZXMgPSB0aGlzLnN0YXRzW3JlZ2lvbl07XG4gICAgICAgICAgICBBcnJheS5mcm9tKHJlZ2lvbk1hdGNoZXMsIG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5wYXRjaGVzLmluY2x1ZGVzKG1hdGNoLnBhdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdGNoZXMucHVzaChtYXRjaC5wYXRjaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaGVzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsdGVyczsiLCJpbXBvcnQgeyBpZFRvQ2hhbXAgfSBmcm9tICcuL0NoYW1wRnVuY3MnO1xuXG5jbGFzcyBTdGF0cyB7XG4gICAgY29uc3RydWN0b3Ioc3RhdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0cyA9IHN0YXRzO1xuICAgICAgICB0aGlzLm9yZGVyQnkgPSAnYWxwaGFiZXRpY2FsbHknO1xuICAgICAgICB0aGlzLm9yZGVyQnlWYXJpYWJsZSA9ICdhbHBoYWJldGljYWxseSc7XG4gICAgICAgIHRoaXMub3JkZXJEaXJlY3Rpb24gPSAnYXNjJztcbiAgICB9XG5cbiAgICBzZXRTdGF0ZXMocmVnaW9ucywgcGF0Y2hlcykge1xuICAgICAgICB0aGlzLnJlZ2lvbnMgPSByZWdpb25zO1xuICAgICAgICB0aGlzLnBhdGNoZXMgPSBwYXRjaGVzO1xuICAgIH1cblxuICAgIHNldE9yZGVyKHZhcmlhYmxlKSB7XG4gICAgICAgIHRoaXMub3JkZXJEaXJlY3Rpb1xuICAgICAgICBpZih0aGlzLm9yZGVyQnkgPT09IHZhcmlhYmxlLnR5cGUgJiYgdGhpcy5vcmRlckJ5VmFyaWFibGUgPT09IHZhcmlhYmxlLnN0YXROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm9yZGVyRGlyZWN0aW9uID0gKHRoaXMub3JkZXJEaXJlY3Rpb24gPT09ICdkZXNjJykgPyAnYXNjJyA6ICdkZXNjJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3JkZXJCeSA9IHZhcmlhYmxlLnR5cGU7XG4gICAgICAgICAgICB0aGlzLm9yZGVyQnlWYXJpYWJsZSA9IHZhcmlhYmxlLnN0YXROYW1lO1xuICAgICAgICAgICAgdGhpcy5vcmRlckRpcmVjdGlvbiA9IHZhcmlhYmxlLmRlZmF1bHRPcmRlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9yZGVyQ2hhbXBzKCk7XG4gICAgfVxuXG4gICAgZ2V0T3JkZXJWYXJpYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JkZXJCeVZhcmlhYmxlO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaGFtcHMoKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDaGFtcHMoKSB7XG4gICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3QgPSB7fVxuICAgICAgICBBcnJheS5mcm9tKHRoaXMucmVnaW9ucywgcmVnaW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2lvbk1hdGNoZXMgPSB0aGlzLnN0YXRzW3JlZ2lvbl07XG4gICAgICAgICAgICBBcnJheS5mcm9tKHJlZ2lvbk1hdGNoZXMsIG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhdGNoZXMuaW5jbHVkZXMobWF0Y2gucGF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RhdHMobWF0Y2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9yZGVyQ2hhbXBzKCk7XG4gICAgfVxuXG4gICAgZ2V0UGVyY2VudGFnZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAoYSAvIGIpICogMTAwO1xuICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihwZXJjZW50YWdlKX0lYDtcbiAgICB9XG5cbiAgICBvcmRlckNoYW1wcygpIHtcbiAgICAgICAgdGhpcy5mYkFycmF5ID0gW107XG4gICAgICAgIGZvcihjb25zdCBjaGFtcElkIGluIHRoaXMuZmlyc3RDaGFtcHNPYmplY3QpIHtcbiAgICAgICAgICAgIGxldCBjaGFtcCA9IHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF07XG4gICAgICAgICAgICBjaGFtcFsnaWQnXSA9IGNoYW1wSWQ7XG4gICAgICAgICAgICB0aGlzLmZiQXJyYXkucHVzaChjaGFtcCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mYkFycmF5LnNvcnQodGhpcy5zb3J0RnVuY3Rpb24uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc29ydEZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgbGV0IHZhbEEgPSAnJztcbiAgICAgICAgbGV0IHZhbEIgPSAnJztcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMub3JkZXJCeSA9PT0gJ3BlcmNlbnQnKSB7XG4gICAgICAgICAgICB2YWxBID0gYVt0aGlzLm9yZGVyQnlWYXJpYWJsZV0gLyBhLnBsYXllZDtcbiAgICAgICAgICAgIHZhbEIgPSBiW3RoaXMub3JkZXJCeVZhcmlhYmxlXSAvIGIucGxheWVkO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5vcmRlckJ5ID09PSAnYWxwaGFiZXRpY2FsbHknKSB7XG4gICAgICAgICAgICB2YWxBID0gaWRUb0NoYW1wKGEuaWQpO1xuICAgICAgICAgICAgdmFsQiA9IGlkVG9DaGFtcChiLmlkKTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMub3JkZXJCeSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgdmFsQSA9IGFbdGhpcy5vcmRlckJ5VmFyaWFibGVdO1xuICAgICAgICAgICAgdmFsQiA9IGJbdGhpcy5vcmRlckJ5VmFyaWFibGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbEEgPCB2YWxCKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMub3JkZXJEaXJlY3Rpb24gPT09ICdhc2MnKSA/IC0xIDogMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsQSA+IHZhbEIpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5vcmRlckRpcmVjdGlvbiA9PT0gJ2FzYycpID8gMSA6IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGFkZFN0YXRzKG1hdGNoKSB7XG4gICAgICAgIGZvciAobGV0IHBsYXllckluZGV4ID0gMDsgcGxheWVySW5kZXggPCAxMDsgcGxheWVySW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgcGxheWVyID0gbWF0Y2hbJ3BsYXllcnMnXVtwbGF5ZXJJbmRleF07XG4gICAgICAgICAgICBjb25zdCBjaGFtcElkID0gcGxheWVyLmNoYW1wSWQ7XG4gICAgICAgICAgICBpZih0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdID0gdGhpcy5nZXREZWZhdWx0U3RhdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsncGxheWVkJ10rKztcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVkR290VmFyaWFibGUobWF0Y2guZmlyc3RCbG9vZCwgcGxheWVySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZmJUZWFtJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllci5maXJzdEJsb29kS2lsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF1bJ2ZiS2lsbGVyJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllci5maXJzdEJsb29kQXNzaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZmJBc3Npc3QnXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyLmZpcnN0RGVhdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdWydmaXJzdERlYXRoJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVkR290VmFyaWFibGUobWF0Y2guZmlyc3RUb3dlciwgcGxheWVySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZnRUZWFtJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllci5maXJzdFRvd2VyS2lsbCB8fCBwbGF5ZXIuZmlyc3RUb3dlckFzc2lzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF1bJ2Z0S2lsbGVyJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVkR290VmFyaWFibGUobWF0Y2guZmlyc3REcmFnb24sIHBsYXllckluZGV4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF1bJ2ZkVGVhbSddKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnBsYXllZEdvdFZhcmlhYmxlKG1hdGNoLndpbiwgcGxheWVySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnd2luJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsYXllZEdvdFZhcmlhYmxlKGZpcnN0VGVhbSwgcGxheWVySW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIChmaXJzdFRlYW0gPT09IDAgJiYgcGxheWVySW5kZXggPCA1KSB8fCAoZmlyc3RUZWFtID09PSAxICYmIHBsYXllckluZGV4ID4gNClcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0U3RhdCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBsYXllZDogMCxcbiAgICAgICAgICAgIGZiVGVhbTogMCxcbiAgICAgICAgICAgIGZ0VGVhbTogMCxcbiAgICAgICAgICAgIGZkVGVhbTogMCxcbiAgICAgICAgICAgIGZiS2lsbGVyOiAwLFxuICAgICAgICAgICAgZmJBc3Npc3Q6IDAsXG4gICAgICAgICAgICBmaXJzdERlYXRoOiAwLFxuICAgICAgICAgICAgZnRLaWxsZXI6IDAsXG4gICAgICAgICAgICB3aW46IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENoYW1wcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmJBcnJheTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3ByZWFjdC1yZWR1eCdcbmltcG9ydCBhcHBTdG9yZSBmcm9tICcuL3JlZHVjZXJzL3N0b3JlJ1xuXG5cbmltcG9ydCBBcHBNYWluIGZyb20gJy4vQXBwTWFpbic7XG5pbXBvcnQgTmF2QmFyIGZyb20gJy4vTmF2QmFyJztcbmltcG9ydCBNYXRjaGVzIGZyb20gJy4vTWF0Y2hlcy9pbmRleC5qcyc7XG5cblxuXG4vL2h0dHBzOi8vd2lyZWZyYW1lLmNjL3hLT3ZDRVxuY2xhc3MgTWFpbkxlYWd1ZUFwcCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnN0b3JlID0gYXBwU3RvcmVcblx0XHRpZih3aW5kb3cubG9jYWxTdG9yYWdlLmFwcFR5cGUpIHtcblx0XHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRcdGFwcFR5cGU6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuYXBwVHlwZVxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdFx0YXBwVHlwZTogJ21hdGNoVXAnXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cblx0dXBkYXRlQXBwVHlwZSh0eXBlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7YXBwVHlwZSA6IHR5cGUgfSk7XG5cdFx0d2luZG93LmxvY2FsU3RvcmFnZS5hcHBUeXBlID0gdHlwZTtcblx0fVxuIFxuXHRyZW5kZXIocHJvcHMsIHN0YXRlKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxQcm92aWRlciBzdG9yZT17dGhpcy5zdG9yZX0+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHRcdDxuYXYgY2xhc3M9XCJuYXZcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm5hdl9fbG9nb1wiPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vZGF2aWR3ZWF0aGVyYWxsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+RGF2aWQgV2VhdGhlcmFsbDwvYT48L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm5hdl9fbGlua3MgIGpzLW5hdi1saW5rc1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxOYXZCYXIgdXBkYXRlQXBwVHlwZT17IHRoaXMudXBkYXRlQXBwVHlwZS5iaW5kKHRoaXMpIH0gYXBwVHlwZT17dGhpcy5zdGF0ZS5hcHBUeXBlfSAvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvbmF2PlxuXHRcdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYWdlXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWF0Y2hlc1wiPlxuXHRcdFx0XHRcdFx0XHQ8TWF0Y2hlcy8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxtYWluIGNsYXNzPVwibWFpblwiPlxuXHRcdFx0XHRcdFx0XHQ8QXBwTWFpbiBhcHBUeXBlPXt0aGlzLnN0YXRlLmFwcFR5cGV9IC8+XG5cdFx0XHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9Qcm92aWRlcj5cblx0XHQpO1xuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFpbkxlYWd1ZUFwcDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IFBsYXllcnMgZnJvbSAnLi9QbGF5ZXJzJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUmVnaW9uOiBzdG9yZS5jb25maWcuYWN0aXZlUmVnaW9uLFxuICAgICAgICByZWdpb25EYXRhOiBzdG9yZS5yZWdpb25zLnJlZ2lvbkRhdGEsXG4gICAgICAgIHRlYW0xOiBzdG9yZS5jb25maWcudGVhbTEsXG4gICAgICAgIHRlYW0yOiBzdG9yZS5jb25maWcudGVhbTIsXG4gICAgfVxufSlcbmNsYXNzIE1hdGNoQ2FyZCBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMudGVhbUNvbG91cnMgPSBbJ2JsdWUnLCAncmVkJ107XG5cdH1cblxuXHRnZXRJbmRleChnZXRFbmVteSA9IGZhbHNlKSB7XG5cdFx0aWYodGhpcy5wcm9wcy50ZWFtKSB7XG5cdFx0XHR0aGlzLmluZGV4ID0gMDtcblx0XHRcdHRoaXMuZW5lbXlJbmRleCA9IDE7XG5cdFx0XHRpZih0aGlzLnByb3BzLmdhbWUudGVhbU5hbWVzWzFdID09IHRoaXMucHJvcHMudGVhbSkge1xuXHRcdFx0XHR0aGlzLmluZGV4ID0gMTtcblx0XHRcdFx0dGhpcy5lbmVteUluZGV4ID0gMDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5pbmRleCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmKGdldEVuZW15KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbmVteUluZGV4O1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmluZGV4O1xuXG5cdH1cblxuXHRnZXRUaW1lKHVuaXgpIHtcblx0XHRjb25zdCBkYXRlID0gbmV3IERhdGUodW5peCk7XG5cdFx0cmV0dXJuIGRhdGUudG9Mb2NhbGVTdHJpbmcoW10sIHtkYXk6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgeWVhcjogJ251bWVyaWMnfSk7XG5cdH1cblxuXHR0b2dnbGVQbGF5ZXJzKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe3Nob3dQbGF5ZXJzOiAhdGhpcy5zdGF0ZS5zaG93UGxheWVyc30pO1xuXHR9XG5cblx0Z2V0QmFja2dyb3VuZCgpIHtcblx0XHRpZih0aGlzLnByb3BzLnRlYW0pIHtcblx0XHRcdHJldHVybiBgYmctY29sb3ItLSR7dGhpcy50ZWFtQ29sb3Vyc1t0aGlzLmdldEluZGV4KCldfWA7XG5cdFx0fVxuXHRcdHJldHVybiBgYmctY29sb3ItLWRlZmF1bHRgO1xuXHR9XG5cblx0Z2V0UmVzdWx0KCkge1xuXHRcdGlmKHRoaXMuZ2V0SW5kZXgoKSAhPT0gZmFsc2UpIHtcblx0XHRcdGlmKHRoaXMucHJvcHMuZ2FtZS53aW4gPT0gdGhpcy5nZXRJbmRleCgpKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19yZXN1bHQgIG1hdGNoZXNfX3Jlc3VsdC0td2luXCI+XG5cdFx0XHRcdFx0XHRXSU5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19yZXN1bHQgIG1hdGNoZXNfX3Jlc3VsdC0tbG9zZVwiPlxuXHRcdFx0XHRcdFx0TE9TRVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlckFjaGlldmVtZW50cyh0ZWFtTnVtLCBteVRlYW0gPSBmYWxzZSkge1xuXHRcdGxldCBpc015VGVhbSA9IGZhbHNlO1xuXHRcdGlmKG15VGVhbSkge1xuXHRcdFx0aWYodGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lc1t0ZWFtTnVtXSA9PSBteVRlYW0pIHtcblx0XHRcdFx0aXNNeVRlYW0gPSB0cnVlOyBcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc3QgY2hlY2tzID0gXHR7XG5cdFx0XHRcdFx0XHRcdCdmaXJzdEJhcm9uJyA6ICdGaXJzdCBCYXJvbicsXG5cdFx0XHRcdFx0XHRcdCdmaXJzdEJsb29kJyA6ICdGaXJzdCBCbG9vZCcsXG5cdFx0XHRcdFx0XHRcdCdmaXJzdERyYWdvbicgOiAnRmlyc3QgRHJhZ29uJyxcblx0XHRcdFx0XHRcdFx0J2ZpcnN0SW5oaWJpdG9yJyA6ICdGaXJzdCBJbmhpYml0b3InLFxuXHRcdFx0XHRcdFx0XHQnZmlyc3RUb3dlcicgOiAnRmlyc3QgVG93ZXInXG5cdFx0XHRcdFx0XHR9O1xuXHRcdGxldCBhY2hpZXZlbWVudHMgPSBbXTtcblx0XHRmb3IgKGNvbnN0IGNoZWNrIGluIGNoZWNrcykge1xuXHRcdFx0aWYodGhpcy5wcm9wcy5nYW1lW2NoZWNrXSA9PSB0ZWFtTnVtKSB7XG5cdFx0XHRcdGxldCBjbGFzc2VzID0gJyc7XG5cdFx0XHRcdGlmKG15VGVhbSkge1xuXHRcdFx0XHRcdGlmIChpc015VGVhbSkge1xuXHRcdFx0XHRcdFx0Y2xhc3NlcyA9ICd0LWNvbG91ci0tZ3JlZW4nO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzID0gJ3QtY29sb3VyLS1yZWQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjbGFzc2VzID0gJ3QtY29sb3VyLS0nICsgdGhpcy50ZWFtQ29sb3Vyc1t0ZWFtTnVtXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRhY2hpZXZlbWVudHMucHVzaCg8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+e2NoZWNrc1tjaGVja119PC9kaXY+KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjaGlldmVtZW50cztcblx0fVxuXG5cdHJlbmRlck1hdGNodXAoKSB7XG5cdFx0bGV0IHRlYW0xID0gdGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lc1swXTtcblx0XHRsZXQgdGVhbTIgPSB0aGlzLnByb3BzLmdhbWUudGVhbU5hbWVzWzFdO1xuXHRcdFxuXHRcdGlmKHRoaXMucHJvcHMudGVhbSkge1xuXHRcdFx0aWYodGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lc1swXSAhPSB0aGlzLnByb3BzLnRlYW0pIHtcblx0XHRcdFx0dGVhbTIgPSB0aGlzLnByb3BzLmdhbWUudGVhbU5hbWVzWzBdO1xuXHRcdFx0XHR0ZWFtMSA9IHRoaXMucHJvcHMuZ2FtZS50ZWFtTmFtZXNbMV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCAgZmxleC1qdXN0aWZ5LS1iZXR3ZWVuXCI+XG5cdFx0XHRcdFx0PGltZyBjbGFzc05hbWU9XCJjYXJkX19sb2dvXCIgIHNyYz17YC9hc3NldHMvaW1nL2xvZ29zLyR7dGhpcy5wcm9wcy5hY3RpdmVSZWdpb259LyR7dGVhbTF9LnBuZ2B9IC8+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2FyZF9fdnNcIj5cblx0XHRcdFx0XHRcdHZzXG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdDxpbWcgY2xhc3NOYW1lPVwiY2FyZF9fbG9nb1wiICBzcmM9e2AvYXNzZXRzL2ltZy9sb2dvcy8ke3RoaXMucHJvcHMuYWN0aXZlUmVnaW9ufS8ke3RlYW0yfS5wbmdgfSAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0e3RoaXMuZ2V0UmVzdWx0KCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyU2hvd01vcmUoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FyZF9fc2hvd21vcmVcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVBsYXllcnMuYmluZCh0aGlzKX0+U2hvdyBNb3JlPC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cmVuZGVyUGxheWVycygpIHtcblx0XHRpZih0aGlzLnN0YXRlLnNob3dQbGF5ZXJzKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGxheWVycyBnYW1lPXt0aGlzLnByb3BzLmdhbWV9IGluZGV4PXt0aGlzLmdldEluZGV4KCl9IGFjdGl2ZVJlZ2lvbj17dGhpcy5wcm9wcy5hY3RpdmVSZWdpb259Lz5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7c2hvd1BsYXllcnM6IGZhbHNlfSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtgY2FyZCAgJHt0aGlzLmdldEJhY2tncm91bmQoKX1gfSBkYXRhLWNvdW50PXt0aGlzLnByb3BzLmNvdW50fT4gXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FyZF9fZGF0ZVwiPlxuXHRcdFx0XHRcdHt0aGlzLmdldFRpbWUodGhpcy5wcm9wcy5nYW1lLnRpbWUpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5zICBmbGV4LWFsaWduLS1jZW50ZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbiAgdC1zaXplLS1zbWFsbFwiPlxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyQWNoaWV2ZW1lbnRzKHRoaXMuZ2V0SW5kZXgoKSwgdGhpcy5wcm9wcy50ZWFtKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJNYXRjaHVwKCl9XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW4gIHQtYWxpZ24tLXJpZ2h0ICB0LXNpemUtLXNtYWxsXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJBY2hpZXZlbWVudHModGhpcy5nZXRJbmRleCh0cnVlKSwgdGhpcy5wcm9wcy50ZWFtKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHt0aGlzLnJlbmRlclBsYXllcnMoKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyU2hvd01vcmUoKX1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoQ2FyZDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBNYXRjaENhcmQgZnJvbSAnLi9NYXRjaENhcmQnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVSZWdpb246IHN0b3JlLmNvbmZpZy5hY3RpdmVSZWdpb24sXG4gICAgICAgIHJlZ2lvbkRhdGE6IHN0b3JlLnJlZ2lvbnMucmVnaW9uRGF0YSxcbiAgICAgICAgdGVhbTE6IHN0b3JlLmNvbmZpZy50ZWFtMSxcbiAgICAgICAgdGVhbTI6IHN0b3JlLmNvbmZpZy50ZWFtMixcbiAgICB9XG59KVxuY2xhc3MgTWF0Y2hFbGVtZW50cyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cmVuZGVyQ2FyZHModGVhbSwgdGVhbTIgPSBmYWxzZSkge1xuXHRcdGxldCBjYXJkcyA9IFtdO1xuXG5cdFx0aWYodGVhbTIpIHtcblx0XHRcdEFycmF5LmZyb20odGhpcy5wcm9wcy5nYW1lcywgKGdhbWUpID0+IHtcblx0XHRcdFx0aWYoZ2FtZS50ZWFtTmFtZXMuaW5jbHVkZXModGVhbSkgJiYgZ2FtZS50ZWFtTmFtZXMuaW5jbHVkZXModGVhbTIpKSB7XG5cdFx0XHRcdFx0Y2FyZHMucHVzaCg8TWF0Y2hDYXJkIGdhbWU9e2dhbWV9IHRlYW09e2ZhbHNlfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRBcnJheS5mcm9tKHRoaXMucHJvcHMuZ2FtZXMsIChnYW1lKSA9PiB7XG5cdFx0XHRcdGlmKGdhbWUudGVhbU5hbWVzLmluY2x1ZGVzKHRlYW0pKSB7XG5cdFx0XHRcdFx0Y2FyZHMucHVzaCg8TWF0Y2hDYXJkIGdhbWU9e2dhbWV9IHRlYW09e3RlYW19IHN0b3JlPXt0aGlzLnByb3BzLnN0b3JlfS8+KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiBjYXJkcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cdFx0XHRcdFx0PGgyPnt0aGlzLnByb3BzLnRlYW0xfSdzIFJlY2VudCBNYXRjaGVzPC9oMj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDYXJkcyh0aGlzLnByb3BzLnRlYW0xKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cdFx0XHRcdFx0PGgyPkhlYWQgdG8gSGVhZDwvaDI+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyQ2FyZHModGhpcy5wcm9wcy50ZWFtMSwgdGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0PGgyPnt0aGlzLnByb3BzLnRlYW0yfSdzIFJlY2VudCBNYXRjaGVzPC9oMj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDYXJkcyh0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYXRjaEVsZW1lbnRzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuaW1wb3J0IFJlYWN0SGludEZhY3RvcnkgZnJvbSAncmVhY3QtaGludCdcbmNvbnN0IFJlYWN0SGludCA9IFJlYWN0SGludEZhY3Rvcnkoe2NyZWF0ZUVsZW1lbnQ6IGgsIENvbXBvbmVudH0pXG5cblxuY2xhc3MgUGxheWVycyBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGxheWVyRGF0YTogZmFsc2V9KTtcblx0fVxuXG5cdHJlbW92ZVRlYW0ocGxheWVyTmFtZSkge1xuXHRcdEFycmF5LmZyb20odGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lcywgKHRlYW1OYW1lKSA9PiB7XG5cdFx0XHRwbGF5ZXJOYW1lID0gcGxheWVyTmFtZS5yZXBsYWNlKHRlYW1OYW1lLCAnJyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHBsYXllck5hbWU7XG5cdH1cblxuXHRnZXRDaGFtcChjaGFtcElkKSB7XG5cdFx0Y29uc3QgY2hhbXBJZHMgPSB7JzE0NScgOiAnS2Fpc2EnLCAnNTU1JyA6ICdQeWtlJywgJzc3JzogJ1VkeXInLCAnNDI3JzogJ0l2ZXJuJywgJzg1JzogJ0tlbm5lbicsICcxOCc6ICdUcmlzdGFuYScsICc3OCc6ICdQb3BweScsICc5JzogJ0ZpZGRsZXN0aWNrcycsICcyNjcnOiAnTmFtaScsICcxNSc6ICdTaXZpcicsICcxOSc6ICdXYXJ3aWNrJywgJzU0JzogJ01hbHBoaXRlJywgJzE2NCc6ICdDYW1pbGxlJywgJzE0JzogJ1Npb24nLCAnNic6ICdVcmdvdCcsICc2MSc6ICdPcmlhbm5hJywgJzQ1JzogJ1ZlaWdhcicsICc0NCc6ICdUYXJpYycsICc2MCc6ICdFbGlzZScsICcyMCc6ICdOdW51JywgJzEwNic6ICdWb2xpYmVhcicsICcxMTAnOiAnVmFydXMnLCAnNjInOiAnTW9ua2V5S2luZycsICcxNjEnOiAnVmVsa296JywgJzQyOSc6ICdLYWxpc3RhJywgJzI3JzogJ1NpbmdlZCcsICc0OTgnOiAnWGF5YWgnLCAnODMnOiAnWW9yaWNrJywgJzUzJzogJ0JsaXR6Y3JhbmsnLCAnMTMzJzogJ1F1aW5uJywgJzI0NSc6ICdFa2tvJywgJzc0JzogJ0hlaW1lcmRpbmdlcicsICc1Nyc6ICdNYW9rYWknLCAnMjUnOiAnTW9yZ2FuYScsICcxNjMnOiAnVGFsaXlhaCcsICc2Myc6ICdCcmFuZCcsICcxMDcnOiAnUmVuZ2FyJywgJzEwJzogJ0theWxlJywgJzQxJzogJ0dhbmdwbGFuaycsICcyMDMnOiAnS2luZHJlZCcsICcyMjMnOiAnVGFobUtlbmNoJywgJzEyNyc6ICdMaXNzYW5kcmEnLCAnMTMnOiAnUnl6ZScsICcxMDUnOiAnRml6eicsICcxNyc6ICdUZWVtbycsICcxMTcnOiAnTHVsdScsICcyNTQnOiAnVmknLCAnMzQnOiAnQW5pdmlhJywgJzEwMic6ICdTaHl2YW5hJywgJzcnOiAnTGVibGFuYycsICc5Mic6ICdSaXZlbicsICczMSc6ICdDaG9nYXRoJywgJzQzJzogJ0thcm1hJywgJzIyMic6ICdKaW54JywgJzIzNic6ICdMdWNpYW4nLCAnMzknOiAnSXJlbGlhJywgJzE0MSc6ICdLYXluJywgJzg2JzogJ0dhcmVuJywgJzI2JzogJ1ppbGVhbicsICc5OSc6ICdMdXgnLCAnNCc6ICdUd2lzdGVkRmF0ZScsICc1OCc6ICdSZW5la3RvbicsICc2OCc6ICdSdW1ibGUnLCAnMTM0JzogJ1N5bmRyYScsICc1MSc6ICdDYWl0bHluJywgJzI5JzogJ1R3aXRjaCcsICc0MjEnOiAnUmVrU2FpJywgJzQ5Nyc6ICdSYWthbicsICcyNDAnOiAnS2xlZCcsICcyNjYnOiAnQWF0cm94JywgJzExMSc6ICdOYXV0aWx1cycsICczNic6ICdEck11bmRvJywgJzMyJzogJ0FtdW11JywgJzExMyc6ICdTZWp1YW5pJywgJzEyMSc6ICdLaGF6aXgnLCAnNTAnOiAnU3dhaW4nLCAnNzInOiAnU2thcm5lcicsICcxMjYnOiAnSmF5Y2UnLCAnMTIwJzogJ0hlY2FyaW0nLCAnMTA0JzogJ0dyYXZlcycsICc0OCc6ICdUcnVuZGxlJywgJzE0Myc6ICdaeXJhJywgJzMzJzogJ1JhbW11cycsICcyNjgnOiAnQXppcicsICcyMDEnOiAnQnJhdW0nLCAnMjMnOiAnVHJ5bmRhbWVyZScsICc2OSc6ICdDYXNzaW9wZWlhJywgJzExMic6ICdWaWt0b3InLCAnMzgnOiAnS2Fzc2FkaW4nLCAnODknOiAnTGVvbmEnLCAnMjQnOiAnSmF4JywgJzUxNic6ICdPcm5uJywgJzEzMSc6ICdEaWFuYScsICc0MzInOiAnQmFyZCcsICc3Nic6ICdOaWRhbGVlJywgJzQyJzogJ0NvcmtpJywgJzkwJzogJ01hbHphaGFyJywgJzE0Mic6ICdab2UnLCAnMSc6ICdBbm5pZScsICcxMTknOiAnRHJhdmVuJywgJzY0JzogJ0xlZVNpbicsICc4JzogJ1ZsYWRpbWlyJywgJzM3JzogJ1NvbmEnLCAnMTE0JzogJ0Zpb3JhJywgJzQwJzogJ0phbm5hJywgJzU5JzogJ0phcnZhbklWJywgJzQyMCc6ICdJbGxhb2knLCAnNSc6ICdYaW5aaGFvJywgJzM1JzogJ1NoYWNvJywgJzEwMyc6ICdBaHJpJywgJzY3JzogJ1ZheW5lJywgJzg0JzogJ0FrYWxpJywgJzIwMic6ICdKaGluJywgJzE1MCc6ICdHbmFyJywgJzkxJzogJ1RhbG9uJywgJzU1JzogJ0thdGFyaW5hJywgJzMwJzogJ0thcnRodXMnLCAnMjM4JzogJ1plZCcsICcyJzogJ09sYWYnLCAnMjgnOiAnRXZlbHlubicsICc5OCc6ICdTaGVuJywgJzE2JzogJ1NvcmFrYScsICc1Nic6ICdOb2N0dXJuZScsICcxMSc6ICdNYXN0ZXJZaScsICcxMjInOiAnRGFyaXVzJywgJzE1Nyc6ICdZYXN1bycsICc5Nic6ICdLb2dNYXcnLCAnMTInOiAnQWxpc3RhcicsICc0MTInOiAnVGhyZXNoJywgJzgyJzogJ01vcmRla2Fpc2VyJywgJzExNSc6ICdaaWdncycsICc4MSc6ICdFenJlYWwnLCAnMTAxJzogJ1hlcmF0aCcsICc3OSc6ICdHcmFnYXMnLCAnNzUnOiAnTmFzdXMnLCAnMjEnOiAnTWlzc0ZvcnR1bmUnLCAnMTM2JzogJ0F1cmVsaW9uU29sJywgJzIyJzogJ0FzaGUnLCAnODAnOiAnUGFudGhlb24nLCAnMyc6ICdHYWxpbycsICcxNTQnOiAnWmFjJ31cblx0XHRyZXR1cm4gY2hhbXBJZHNbY2hhbXBJZF07XG5cdH1cblxuXHRnZXRQbGF5ZXJEYXRhKCkge1xuXHRcdGZldGNoKGAvYXBpLyR7dGhpcy5wcm9wcy5hY3RpdmVSZWdpb259L2dhbWVzLyR7dGhpcy5wcm9wcy5nYW1lLmdhbWVJZH0vcGxheWVycy5qc29uYClcblx0XHQudGhlbihcblx0XHRcdHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKVxuXHRcdCkudGhlbihkYXRhID0+IHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3BsYXllckRhdGE6IGRhdGF9KTtcblx0XHR9KTtcdFx0XG5cdH1cblxuXHRnZXRGQihwbGF5ZXJEYXRhKSB7XG5cdFx0bGV0IGZpcnN0Qmxvb2QgPSAnJztcblx0XHRpZihwbGF5ZXJEYXRhLmZpcnN0Qmxvb2RLaWxsKSB7XG5cdFx0XHRmaXJzdEJsb29kID0gPGltZyBkYXRhLXJoPVwiRmlyc3QgS2lsbFwiIHNyYz1cIi9hc3NldHMvc3ZnL3N3b3JkLnN2Z1wiLz47XG5cdFx0fSBlbHNlIGlmKHBsYXllckRhdGEuZmlyc3RCbG9vZEFzc2lzdCkge1xuXHRcdFx0Zmlyc3RCbG9vZCA9IDxpbWcgZGF0YS1yaD1cIkZpcnN0IEtpbGwgQXNzaXN0XCIgc3JjPVwiL2Fzc2V0cy9zdmcvaGVscC5zdmdcIi8+OyBcblx0XHR9IGVsc2UgaWYocGxheWVyRGF0YS5maXJzdERlYXRoKSB7XG5cdFx0XHRmaXJzdEJsb29kID0gPGltZyBkYXRhLXJoPVwiRmlyc3QgRGVhdGhcIiBzcmM9XCIvYXNzZXRzL3N2Zy9za3VsbC5zdmdcIi8+O1xuXHRcdH1cblx0XHRyZXR1cm4gZmlyc3RCbG9vZDtcblx0fVxuXG5cdHJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSB7XG5cdFx0bGV0IHBsYXllck5hbWUgPSBwbGF5ZXJEYXRhLm5hbWVcblx0XHRwbGF5ZXJOYW1lID0gdGhpcy5yZW1vdmVUZWFtKHBsYXllck5hbWUpXG5cdFx0Y29uc3QgZmlyc3RCbG9vZCA9IHRoaXMuZ2V0RkIocGxheWVyRGF0YSk7XG5cdFx0Y29uc3QgS0RBID0gYCR7cGxheWVyRGF0YS5raWxsc30vJHtwbGF5ZXJEYXRhLmRlYXRoc30vJHtwbGF5ZXJEYXRhLmtpbGxzfWA7XG5cdFx0Y29uc3QgY2hhbXBOYW5lID0gdGhpcy5nZXRDaGFtcChwbGF5ZXJEYXRhLmNoYW1wSWQpO1xuXHRcdGNvbnN0IGNoYW1wSW1hZ2UgPSBgaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vOC4xNC4xL2ltZy9jaGFtcGlvbi8ke2NoYW1wTmFuZX0ucG5nYFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8dHIgY2xhc3M9XCJjYXJkX19wbGF5ZXJcIj5cblx0XHRcdFx0PHRkPntwbGF5ZXJOYW1lfTwvdGQ+XG5cdFx0XHRcdDx0ZCBjbGFzcz1cImNhcmRfX2NoYW1wXCI+PGltZyBzcmM9e2NoYW1wSW1hZ2V9Lz48L3RkPlxuXHRcdFx0XHQ8dGQ+e0tEQX08L3RkPlxuXHRcdFx0XHQ8dGQgY2xhc3M9XCJjYXJkX19zdmdcIj5cblx0XHRcdFx0XHQ8UmVhY3RIaW50IGF1dG9Qb3NpdGlvbiBldmVudHMgZGVsYXk9ezEwMH0gLz5cblx0XHRcdFx0XHQ8UmVhY3RIaW50IHBlcnNpc3Rcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZT1cImRhdGEtY3VzdG9tXCJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImN1c3RvbS1oaW50XCJcblx0XHRcdFx0XHRcdGV2ZW50cz17e2hvdmVyOiB0cnVlfX1cblx0XHRcdFx0XHRcdHJlZj17KHJlZikgPT4gdGhpcy5pbnN0YW5jZSA9IHJlZn0gLz5cblx0XHRcdFx0XHR7Zmlyc3RCbG9vZH1cblx0XHRcdFx0PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlclBsYXllcnMoKSB7XG5cdFx0aWYodGhpcy5zdGF0ZS5wbGF5ZXJEYXRhKSB7XG5cdFx0XHRsZXQgdGVhbTFQbGF5ZXJzID0gW107XG5cdFx0XHRsZXQgdGVhbTJQbGF5ZXJzID0gW107XG5cdFx0XHRsZXQgcGxheWVyQ291bnQgPSAwO1xuXHRcdFx0d2hpbGUocGxheWVyQ291bnQgPCA1KSB7XG5cdFx0XHRcdGNvbnN0IHBsYXllckRhdGEgPSB0aGlzLnN0YXRlLnBsYXllckRhdGFbcGxheWVyQ291bnRdO1xuXHRcdFx0XHR0ZWFtMVBsYXllcnMucHVzaCh0aGlzLnJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSk7XG5cdFx0XHRcdHBsYXllckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0XHR3aGlsZShwbGF5ZXJDb3VudCA8IDEwKSB7XG5cdFx0XHRcdGNvbnN0IHBsYXllckRhdGEgPSB0aGlzLnN0YXRlLnBsYXllckRhdGFbcGxheWVyQ291bnRdO1xuXHRcdFx0XHR0ZWFtMlBsYXllcnMucHVzaCh0aGlzLnJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSk7XG5cdFx0XHRcdHBsYXllckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZF9fcGxheWVyc1wiPlxuXHRcdFx0XHRcdDx0YWJsZSBjbGFzcz1cImNhcmRfX3RlYW1cIj5cblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmluZGV4ID09IDAgPyB0ZWFtMVBsYXllcnMgOiB0ZWFtMlBsYXllcnN9XG5cdFx0XHRcdFx0PC90YWJsZT5cblx0XHRcdFx0XHQ8dGFibGUgY2xhc3M9XCJjYXJkX190ZWFtXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5pbmRleCA9PSAwID8gdGVhbTJQbGF5ZXJzIDogdGVhbTFQbGF5ZXJzfVxuXHRcdFx0XHRcdDwvdGFibGU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICdnZXR0aW5nIHBsYXllcnMuLi4nO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX3BsYXllcnNcIj57dGhpcy5yZW5kZXJQbGF5ZXJzKCl9PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMuZ2V0UGxheWVyRGF0YSgpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcnM7IiwiLy8gQ3JlZGl0OiBodHRwczovL2NvZGVwZW4uaW8vc21sc3Zuc3NuL3Blbi9Gb2xhQVxuXG5pbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cblxuY2xhc3MgU3RhdENpcmNsZSBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjaXJjbGVUZXh0OiB0aGlzLnByb3BzLmZiVGV4dFxuXHRcdH0pXG5cdH1cblxuXHRjcmVhdGVTdmdBcmMoc3RhcnRQZXJjLCBleHRyYVBlcmMpIHtcblxuXHRcdGlmKCFOdW1iZXIuaXNJbnRlZ2VyKHN0YXJ0UGVyYykpIHtcblx0XHRcdHN0YXJ0UGVyYyA9IDA7XG5cdFx0fVxuXHRcdGlmKCFOdW1iZXIuaXNJbnRlZ2VyKGV4dHJhUGVyYykpIHtcblx0XHRcdGV4dHJhUGVyYyA9IDA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgeCA9IDA7XG5cdFx0Y29uc3QgeSA9IDA7XG5cdFx0Y29uc3QgciA9IDMwMDtcblxuXHRcdGxldCBzdGFydEFuZ2xlID0gKChzdGFydFBlcmMgLyAxMDApICogTWF0aC5QSSlcblxuXHRcdGxldCBlbmRBbmdsZSA9ICgoKGV4dHJhUGVyYyArIHN0YXJ0UGVyYykgLyAxMDApICogTWF0aC5QSSlcblx0XHRcblxuXHRcdGlmIChzdGFydEFuZ2xlID4gZW5kQW5nbGUpIHtcblx0XHRcdHZhciBzID0gc3RhcnRBbmdsZTtcblx0XHRcdHN0YXJ0QW5nbGUgPSBlbmRBbmdsZTtcblx0XHRcdGVuZEFuZ2xlID0gcztcblx0XHR9XG5cdFx0aWYgKGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA+IE1hdGguUEkgKiAyKSB7XG5cdFx0XHRlbmRBbmdsZSA9IE1hdGguUEkgKiAxLjk5OTk5O1xuXHRcdH1cblxuXHRcdHZhciBsYXJnZUFyYyA9IGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA8PSBNYXRoLlBJID8gMCA6IDE7XG5cdFx0Y29uc29sZS5sb2coJ251bXM6ICcpO1xuXHRcdGNvbnNvbGUubG9nKHN0YXJ0UGVyYyk7XG5cdFx0Y29uc29sZS5sb2coZXh0cmFQZXJjKTtcblx0XHRjb25zb2xlLmxvZyhlbmRBbmdsZSk7XG5cdFx0Y29uc29sZS5sb2coc3RhcnRBbmdsZSk7XG5cdFx0cmV0dXJuIFtcblx0XHRcdFwiTVwiLFxuXHRcdFx0eCxcblx0XHRcdHksXG5cdFx0XHRcIkxcIixcblx0XHRcdHggKyBNYXRoLmNvcyhzdGFydEFuZ2xlKSAqIHIsXG5cdFx0XHR5IC0gTWF0aC5zaW4oc3RhcnRBbmdsZSkgKiByLFxuXHRcdFx0XCJBXCIsXG5cdFx0XHRyLFxuXHRcdFx0cixcblx0XHRcdDAsXG5cdFx0XHRsYXJnZUFyYyxcblx0XHRcdDAsXG5cdFx0XHR4ICsgTWF0aC5jb3MoZW5kQW5nbGUpICogcixcblx0XHRcdHkgLSBNYXRoLnNpbihlbmRBbmdsZSkgKiByLFxuXHRcdFx0XCJMXCIsXG5cdFx0XHR4LFxuXHRcdFx0eVxuXHRcdF0uam9pbihcIiBcIik7XG5cdH1cblxuXHR1cGRhdGVDaXJjbGUocGVyYykge1xuXHRcdGNvbnN0IHRleHQgPSBgJHtwZXJjLnRvU3RyaW5nKCl9JWA7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjaXJjbGVUZXh0OiB0ZXh0XG5cdFx0fSlcblx0fVxuXG5cdHJlc2V0Q2lyY2xlKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y2lyY2xlVGV4dDogdGhpcy5wcm9wcy5mYlRleHRcblx0XHR9KVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNpcmNsZVwiPlxuXHRcdFx0XHQ8c3ZnIGlkPVwidGhlTWFwXCIgd2lkdGg9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA2MDAgNjAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIj5cblx0XHRcdFx0XHQ8Y2lyY2xlIGN4PVwiMzAwXCIgY3k9XCIzMDBcIiByPVwiMzAwXCIgZmlsbD1cInJnYmEoMjU1LCAyNTUsIDI1NSwgMClcIi8+XG5cdFx0XHRcdFx0PGcgaWQ9XCJhcmNzXCIgdHJhbnNmb3JtPVwiIHRyYW5zbGF0ZSgzMDAgMzAwKSByb3RhdGUoLTkwKSBzY2FsZSgxIC0xKVwiPlxuXHRcdFx0XHRcdFx0PHBhdGggb25Nb3VzZUVudGVyPXsoKSA9PiB7IHRoaXMudXBkYXRlQ2lyY2xlKHRoaXMucHJvcHMucmVkKSB9fSBvbk1vdXNlTGVhdmU9e3RoaXMucmVzZXRDaXJjbGUuYmluZCh0aGlzKX0gZD17dGhpcy5jcmVhdGVTdmdBcmMoMCwgdGhpcy5wcm9wcy5yZWQpfSBmaWxsPVwiI2ZmMDAwMFwiIG9wYWNpdHk9XCIwLjVcIj48L3BhdGg+XG5cdFx0XHRcdFx0XHQ8cGF0aCBvbk1vdXNlRW50ZXI9eygpID0+IHsgdGhpcy51cGRhdGVDaXJjbGUodGhpcy5wcm9wcy5ibHVlKSB9fSBvbk1vdXNlTGVhdmU9e3RoaXMucmVzZXRDaXJjbGUuYmluZCh0aGlzKX0gZD17dGhpcy5jcmVhdGVTdmdBcmModGhpcy5wcm9wcy5yZWQsIHRoaXMucHJvcHMuYmx1ZSl9IGZpbGw9XCIjMDAyM2ZmXCIgb3BhY2l0eT1cIjAuNVwiPjwvcGF0aD5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PGNpcmNsZSBjeD1cIjMwMFwiIGN5PVwiMzAwXCIgcj1cIjEwMFwiIGZpbGw9XCIjZmZmXCIvPlxuXHRcdFx0XHRcdDx0ZXh0IHg9XCI1MCVcIiB5PVwiNTAlXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBzdHJva2U9XCIjMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMnB4XCIgZHk9XCIuM2VtXCIgc3R5bGU9XCJmb250LXNpemU6IDU1cHg7XCI+e3RoaXMuc3RhdGUuY2lyY2xlVGV4dH08L3RleHQ+XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcblx0XHRpZihuZXdQcm9wcy5mYlRleHQgIT09IHRoaXMucHJvcHMuZmJUZXh0KSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Y2lyY2xlVGV4dDogbmV3UHJvcHMuZmJUZXh0XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0Q2lyY2xlOyAiLCJjbGFzcyBTdGF0c0NsYXNzIHtcblx0Y29uc3RydWN0b3Ioc3RhdHMpIHtcblx0XHR0aGlzLnN0YXRzID0gc3RhdHM7XG5cdH1cblxuXHRGQih0ZWFtKSB7XG5cdFx0Y29uc3QgZmIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmZpcnN0Qmxvb2RzIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gZmJcblx0fVxuXG5cdGJsdWVGQih0ZWFtKSB7XG5cdFx0Y29uc3QgZmIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdEJsb29kcyAvIHRoaXMuc3RhdHNbdGVhbV0uYmx1ZU1hdGNoZXNQbGF5ZWQpKVxuXHRcdHJldHVybiBmYlxuXHRcdFxuXHR9XG5cblx0cmVkRkIodGVhbSkge1xuXHRcdGNvbnN0IGZiID0gTWF0aC5yb3VuZCgxMDAgKiAodGhpcy5zdGF0c1t0ZWFtXS5yZWRGaXJzdEJsb29kcyAvIHRoaXMuc3RhdHNbdGVhbV0ucmVkTWF0Y2hlc1BsYXllZCkpXG5cdFx0cmV0dXJuIGZiXG5cdH1cblxuXHRUb3dlcih0ZWFtKSB7XG5cdFx0Y29uc3QgVG93ZXIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmZpcnN0VG93ZXJzIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gVG93ZXJcblx0fVxuXG5cdGJsdWVUb3dlcih0ZWFtKSB7XG5cdFx0Y29uc3QgVG93ZXIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdFRvd2VycyAvIHRoaXMuc3RhdHNbdGVhbV0uYmx1ZU1hdGNoZXNQbGF5ZWQpKVxuXHRcdHJldHVybiBUb3dlclxuXHR9XG5cblx0cmVkVG93ZXIodGVhbSkge1xuXHRcdGNvbnN0IFRvd2VyID0gTWF0aC5yb3VuZCgxMDAgKiAodGhpcy5zdGF0c1t0ZWFtXS5yZWRGaXJzdFRvd2VycyAvIHRoaXMuc3RhdHNbdGVhbV0ucmVkTWF0Y2hlc1BsYXllZCkpXG5cdFx0cmV0dXJuIFRvd2VyXG5cdH1cblxuXHREcmFnb24odGVhbSkge1xuXHRcdGNvbnN0IERyYWdvbiA9IE1hdGgucm91bmQoMTAwICogKHRoaXMuc3RhdHNbdGVhbV0uZmlyc3REcmFnb25zIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cblxuXHRibHVlRHJhZ29uKHRlYW0pIHtcblx0XHRjb25zdCBEcmFnb24gPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdERyYWdvbnMgLyB0aGlzLnN0YXRzW3RlYW1dLmJsdWVNYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cblxuXHRyZWREcmFnb24odGVhbSkge1xuXHRcdGNvbnN0IERyYWdvbiA9IE1hdGgucm91bmQoMTAwICogKHRoaXMuc3RhdHNbdGVhbV0ucmVkRmlyc3REcmFnb25zIC8gdGhpcy5zdGF0c1t0ZWFtXS5yZWRNYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHNDbGFzczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBTdGF0c0NsYXNzIGZyb20gJy4vU3RhdHNDbGFzcyc7XG5pbXBvcnQgU3RhdENpcmNsZSBmcm9tICcuL1N0YXRDaXJjbGUnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVSZWdpb246IHN0b3JlLmNvbmZpZy5hY3RpdmVSZWdpb24sXG4gICAgICAgIHJlZ2lvblN0YXRzOiBzdG9yZS5yZWdpb25zLnJlZ2lvblN0YXRzLFxuICAgICAgICB0ZWFtMTogc3RvcmUuY29uZmlnLnRlYW0xLFxuICAgICAgICB0ZWFtMjogc3RvcmUuY29uZmlnLnRlYW0yLFxuICAgIH1cbn0pXG5cbmNsYXNzIFRlYW1TdGF0cyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xhc3ModGhpcy5wcm9wcy5yZWdpb25TdGF0cyk7XG5cdH1cblxuXHRnZXRQbGF5ZXJGQlN0YXRzKHRlYW1OYW1lKSB7XG5cdFx0Y29uc3QgdGVhbSA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGVhbU5hbWVdO1xuXHRcdGxldCBwbGF5ZXJzID0gW107XG5cdFx0Zm9yIChjb25zdCBwbGF5ZXIgaW4gdGVhbS5wbGF5ZXJzTWF0Y2hlc1BsYXllZCkge1xuXHRcdFx0Y29uc3QgbWF0Y2hlc1BsYXllZCA9IHRlYW0ucGxheWVyc01hdGNoZXNQbGF5ZWRbcGxheWVyXTtcblx0XHRcdGNvbnN0IGZpcnN0Qmxvb2QgPSAxMDAgKiAoKHRlYW0uZmlyc3RCbG9vZFBsYXllcnNbcGxheWVyXSArIHRlYW0uZmlyc3RCbG9vZEFzc2lzdFBsYXllcnNbcGxheWVyXSkgLyBtYXRjaGVzUGxheWVkKTtcblx0XHRcdGNvbnN0IGZpcnN0Qmxvb2RTdHJpbmcgPSBwYXJzZUludChmaXJzdEJsb29kKTtcblx0XHRcdFxuXHRcdFx0Y29uc3QgZmlyc3REZWF0aCA9IDEwMCAqICh0ZWFtLmZpcnN0RGVhdGhQbGF5ZXJzW3BsYXllcl0gLyBtYXRjaGVzUGxheWVkKTtcblx0XHRcdGNvbnN0IGZpcnN0RGVhdGhTdHJpbmcgPSBwYXJzZUludChmaXJzdERlYXRoKTtcblxuXHRcdFx0cGxheWVycy5wdXNoKFxuXHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0PHRkPntwbGF5ZXIucmVwbGFjZSh0ZWFtTmFtZSwgJycpfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPntmaXJzdEJsb29kU3RyaW5nfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPntmaXJzdERlYXRoU3RyaW5nfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPnttYXRjaGVzUGxheWVkfTwvdGQ+XG5cdFx0XHRcdDwvdHI+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8dGFibGUgY2xhc3M9XCJtYXRjaGVzX190YWJsZVwiPlxuXHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0PHRoPjwvdGg+XG5cdFx0XHRcdFx0PHRoPkZCJTwvdGg+XG5cdFx0XHRcdFx0PHRoPkZEJTwvdGg+XG5cdFx0XHRcdFx0PHRoPlNTPC90aD5cblx0XHRcdFx0PC90cj5cblx0XHRcdFx0e3BsYXllcnN9XG5cdFx0XHQ8L3RhYmxlPlxuXG5cdFx0KTtcblx0fVxuXG5cdGdldERyYWdvblN0YXRzKCkge1xuXHRcdGNvbnN0IHRlYW0xU3RhdHMgPSB0aGlzLnByb3BzLnJlZ2lvblN0YXRzW3RoaXMucHJvcHMudGVhbTFdXG5cdFx0Y29uc3QgdGVhbTJTdGF0cyA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGhpcy5wcm9wcy50ZWFtMl1cblxuXHRcdHJldHVybiAnJztcblxuXHR9XG5cblx0Z2V0UG9zaXRpb25Ub3dlclN0YXRzKHRlYW1OYW1lKSB7XG5cdFx0Y29uc3QgdGVhbSA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGVhbU5hbWVdO1xuXHRcdGxldCBwb3NpdGlvbnMgPSBbXTtcblxuXHRcdHBvc2l0aW9ucyA9IHRoaXMuZ2V0UG9zaXRpb25Ub3dlclN0YXQocG9zaXRpb25zLCB0ZWFtLCAnZmlyc3RUb3dlclBvc2l0aW9uJywgJ2ZpcnN0RW5lbXlUb3dlclBvc2l0aW9uJywgJ21hdGNoZXNQbGF5ZWQnLCAnJylcblx0XHRwb3NpdGlvbnMgPSB0aGlzLmdldFBvc2l0aW9uVG93ZXJTdGF0KHBvc2l0aW9ucywgdGVhbSwgJ2ZpcnN0Qmx1ZVRvd2VyUG9zaXRpb24nLCAnZmlyc3RCbHVlRW5lbXlUb3dlclBvc2l0aW9uJywgJ2JsdWVNYXRjaGVzUGxheWVkJywgJ2NvbG91cl9fbGlnaHQtYmx1ZScpXG5cdFx0cG9zaXRpb25zID0gdGhpcy5nZXRQb3NpdGlvblRvd2VyU3RhdChwb3NpdGlvbnMsIHRlYW0sICdmaXJzdFJlZFRvd2VyUG9zaXRpb24nLCAnZmlyc3RSZWRFbmVteVRvd2VyUG9zaXRpb24nLCAncmVkTWF0Y2hlc1BsYXllZCcsICdjb2xvdXJfX3JlZCcpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHRhYmxlIGNsYXNzPVwibWF0Y2hlc19fdGFibGVcIj5cblx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdDx0aD48L3RoPlxuXHRcdFx0XHRcdDx0aD5HRVQlPC90aD5cblx0XHRcdFx0XHQ8dGg+TE9TRSU8L3RoPlxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHR7cG9zaXRpb25zfVxuXHRcdFx0PC90YWJsZT5cblxuXHRcdCk7XG5cdH1cblxuXHRnZXRQb3NpdGlvblRvd2VyU3RhdChwb3NpdGlvbnMsIHRlYW0sIHZhcjEsIHZhcjIsIHZhcjMsIGNsYXNzU3R5bGUpIHtcblx0XHRmb3IgKGNvbnN0IHBvc2l0aW9uIGluIHRlYW0uZmlyc3RUb3dlclBvc2l0aW9uKSB7XG5cblx0XHRcdGNvbnN0IG1hdGNoZXNQbGF5ZWQgPSB0ZWFtW3ZhcjNdO1xuXG5cdFx0XHRjb25zdCBmaXJzdFRvd2VyUGVyY2VudGFnZSA9IHBhcnNlSW50KCh0ZWFtW3ZhcjFdW3Bvc2l0aW9uXSAvIG1hdGNoZXNQbGF5ZWQpICogMTAwKVxuXHRcdFx0Y29uc3QgZmlyc3RFbmVteVRvd2VyUGVyY2VudGFnZSA9IHBhcnNlSW50KCh0ZWFtW3ZhcjJdW3Bvc2l0aW9uXSAvIG1hdGNoZXNQbGF5ZWQpICogMTAwKVxuXG5cdFx0XHRwb3NpdGlvbnMucHVzaChcblx0XHRcdFx0PHRyIGNsYXNzTmFtZT17Y2xhc3NTdHlsZX0+XG5cdFx0XHRcdFx0PHRkPntwb3NpdGlvbi5yZXBsYWNlKCdfTEFORScsICcnKX08L3RkPlxuXHRcdFx0XHRcdDx0ZD57YCR7Zmlyc3RUb3dlclBlcmNlbnRhZ2V9JWB9PC90ZD5cblx0XHRcdFx0XHQ8dGQ+e2Ake2ZpcnN0RW5lbXlUb3dlclBlcmNlbnRhZ2V9JWB9PC90ZD5cblx0XHRcdFx0PC90cj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBvc2l0aW9ucztcblx0fVxuXG5cdHJlbmRlckNpcmNsZVN0YXRzKCkge1xuXHRcdGlmKCF0aGlzLnByb3BzLnRlYW0xIHx8ICF0aGlzLnByb3BzLnRlYW0yKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxoMj5GaXJzdCBCbG9vZDo8L2gyPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbiAgbWF0Y2hlc19fY29sdW1uLS1oYWxmICBuby1icmVha1wiPlxuXG5cdFx0XHRcdFx0XHRcdDxoMz57dGhpcy5wcm9wcy50ZWFtMX08L2gzPlxuXG5cdFx0XHRcdFx0XHRcdDxTdGF0Q2lyY2xlXG5cdFx0XHRcdFx0XHRcdFx0Ymx1ZT17dGhpcy5zdGF0cy5ibHVlRkIodGhpcy5wcm9wcy50ZWFtMSl9XG5cdFx0XHRcdFx0XHRcdFx0cmVkPXt0aGlzLnN0YXRzLnJlZEZCKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdGZiVGV4dD17YCR7dGhpcy5zdGF0cy5GQih0aGlzLnByb3BzLnRlYW0xKX0lYH1cblx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblx0XHRcdFx0XHRcdFx0PGgzPnt0aGlzLnByb3BzLnRlYW0yfTwvaDM+XG5cblx0XHRcdFx0XHRcdFx0PFN0YXRDaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRibHVlPXt0aGlzLnN0YXRzLmJsdWVGQih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkRkIodGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLkZCKHRoaXMucHJvcHMudGVhbTIpfSVgfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0PGgyPkZpcnN0IERyYWdvbjo8L2gyPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbiAgbWF0Y2hlc19fY29sdW1uLS1oYWxmICBuby1icmVha1wiPlxuXG5cdFx0XHRcdFx0XHRcdDxoMz57dGhpcy5wcm9wcy50ZWFtMX08L2gzPlxuXG5cdFx0XHRcdFx0XHRcdDxTdGF0Q2lyY2xlXG5cdFx0XHRcdFx0XHRcdFx0Ymx1ZT17dGhpcy5zdGF0cy5ibHVlRHJhZ29uKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdHJlZD17dGhpcy5zdGF0cy5yZWREcmFnb24odGhpcy5wcm9wcy50ZWFtMSl9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLkRyYWdvbih0aGlzLnByb3BzLnRlYW0xKX0lYH1cblx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblxuXHRcdFx0XHRcdFx0XHQ8aDM+e3RoaXMucHJvcHMudGVhbTJ9PC9oMz5cblxuXHRcdFx0XHRcdFx0XHQ8U3RhdENpcmNsZVxuXHRcdFx0XHRcdFx0XHRcdGJsdWU9e3RoaXMuc3RhdHMuYmx1ZURyYWdvbih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkRHJhZ29uKHRoaXMucHJvcHMudGVhbTIpfVxuXHRcdFx0XHRcdFx0XHRcdGZiVGV4dD17YCR7dGhpcy5zdGF0cy5EcmFnb24odGhpcy5wcm9wcy50ZWFtMil9JWB9XG5cdFx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cblx0XHRcdFx0XHQ8aDI+Rmlyc3QgVG93ZXI6PC9oMj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblxuXHRcdFx0XHRcdFx0XHQ8aDM+e3RoaXMucHJvcHMudGVhbTF9PC9oMz5cblxuXHRcdFx0XHRcdFx0XHQ8U3RhdENpcmNsZVxuXHRcdFx0XHRcdFx0XHRcdGJsdWU9e3RoaXMuc3RhdHMuYmx1ZVRvd2VyKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdHJlZD17dGhpcy5zdGF0cy5yZWRUb3dlcih0aGlzLnByb3BzLnRlYW0xKX1cblx0XHRcdFx0XHRcdFx0XHRmYlRleHQ9e2Ake3RoaXMuc3RhdHMuVG93ZXIodGhpcy5wcm9wcy50ZWFtMSl9JWB9XG5cdFx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWF0Y2hlc19fY29sdW1uICBtYXRjaGVzX19jb2x1bW4tLWhhbGYgIG5vLWJyZWFrXCI+XG5cblx0XHRcdFx0XHRcdFx0PGgzPnt0aGlzLnByb3BzLnRlYW0yfTwvaDM+XG5cblx0XHRcdFx0XHRcdFx0PFN0YXRDaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRibHVlPXt0aGlzLnN0YXRzLmJsdWVUb3dlcih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkVG93ZXIodGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLlRvd2VyKHRoaXMucHJvcHMudGVhbTIpfSVgfVxuXHRcdFx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlclBsYXllclN0YXRzKCkge1xuXHRcdGlmKCF0aGlzLnByb3BzLnRlYW0xIHx8ICF0aGlzLnByb3BzLnRlYW0yKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgYmRyLXJpZ2h0XCI+XG5cblx0XHRcdFx0XHRcdFx0e3RoaXMuZ2V0UGxheWVyRkJTdGF0cyh0aGlzLnByb3BzLnRlYW0xKX1cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZlwiPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5nZXRQbGF5ZXJGQlN0YXRzKHRoaXMucHJvcHMudGVhbTIpfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0e3RoaXMuZ2V0RHJhZ29uU3RhdHMoKX1cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiBiZHItcmlnaHRcIj5cblxuXHRcdFx0XHRcdFx0XHR7dGhpcy5nZXRQb3NpdGlvblRvd2VyU3RhdHModGhpcy5wcm9wcy50ZWFtMSl9XHRcdFx0XHRcdFx0XHRcblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZlwiPlxuXG5cdFx0XHRcdFx0XHRcdHt0aGlzLmdldFBvc2l0aW9uVG93ZXJTdGF0cyh0aGlzLnByb3BzLnRlYW0yKX1cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXY+eyB0aGlzLnJlbmRlckNpcmNsZVN0YXRzKCkgfTwvZGl2PlxuXHRcdFx0XHQ8ZGl2PnsgdGhpcy5yZW5kZXJQbGF5ZXJTdGF0cygpIH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cdFxufVxuXG5leHBvcnQgZGVmYXVsdCBUZWFtU3RhdHMiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBNYXRjaEVsZW1lbnRzIGZyb20gJy4vTWF0Y2hFbGVtZW50cyc7XG5pbXBvcnQgVGVhbVN0YXRzIGZyb20gJy4vVGVhbVN0YXRzJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUmVnaW9uOiBzdG9yZS5jb25maWcuYWN0aXZlUmVnaW9uLFxuICAgICAgICByZWdpb25EYXRhOiBzdG9yZS5yZWdpb25zLnJlZ2lvbkRhdGEsXG4gICAgICAgIHRlYW0xOiBzdG9yZS5jb25maWcudGVhbTEsXG4gICAgICAgIHRlYW0yOiBzdG9yZS5jb25maWcudGVhbTIsXG4gICAgfVxufSlcbmNsYXNzIE1hdGNoVXAgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHVwZGF0ZVJlZ2lvbihlKSB7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiAnVVBEQVRFX1JFR0lPTicsXG5cdFx0XHRwYXlsb2FkOiBmZXRjaChgL2FwaS8ke2UudGFyZ2V0LnZhbHVlfS9saWdodC5qc29uYCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0fSk7XG5cblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHtcblx0XHRcdHR5cGU6ICdVUERBVEVfUkVHSU9OX1NUQVRTJyxcblx0XHRcdHBheWxvYWQ6IGZldGNoKGAvYXBpLyR7ZS50YXJnZXQudmFsdWV9L3N0YXRzLmpzb25gKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHR9KTtcblxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9SRUdJT05fVEVYVCcsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlVGVhbTEoZSkge1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9URUFNMScsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlVGVhbTIoZSkge1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9URUFNMicsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VGVhbXMoKSB7XG5cdFx0aWYodGhpcy5wcm9wcy5yZWdpb25EYXRhKSB7XG5cdFx0XHRsZXQgdGVhbXMgPSBbXTtcblx0XHRcdGxldCBvcHRpb25zID0gW107XG5cdFx0XHRBcnJheS5mcm9tKHRoaXMucHJvcHMucmVnaW9uRGF0YSwgKGdhbWUpID0+IHtcblx0XHRcdFx0Y29uc3QgdGVhbTEgPSBnYW1lWyd0ZWFtTmFtZXMnXVswXTtcblx0XHRcdFx0Y29uc3QgdGVhbTIgPSBnYW1lWyd0ZWFtTmFtZXMnXVsxXTtcblxuXHRcdFx0XHRpZighdGVhbXMuaW5jbHVkZXModGVhbTEpKSB7XG5cdFx0XHRcdFx0dGVhbXMucHVzaCh0ZWFtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXRlYW1zLmluY2x1ZGVzKHRlYW0yKSkge1xuXHRcdFx0XHRcdHRlYW1zLnB1c2godGVhbTIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGVhbXMuc29ydCgpO1xuXG5cdFx0XHRBcnJheS5mcm9tKHRlYW1zLCAodGVhbSkgPT4ge1xuXHRcdFx0XHRvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17dGVhbX0+e3RlYW19PC9vcHRpb24+KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZW5kZXJSZWdpb25zKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8c2VsZWN0IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVSZWdpb24oZSl9IHZhbHVlPXt0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbn0+XG5cdFx0XHRcdFx0PG9wdGlvbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZT1cIlwiPlNlbGVjdCBSZWdpb248L29wdGlvbj5cblx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPSdMQ0snPkxDSzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J0NCTE9MJz5DQkxPTDwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J0VVTENTJz5FVUxDUzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J05BTENTJz5OQUxDUzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J1RDTCc+VENMPC9vcHRpb24+XG5cdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT0nTE1TJz5MTVM8L29wdGlvbj5cblx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPSdPUEwnPk9QTDwvb3B0aW9uPlxuXHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJUZWFtcygpIHtcblx0XHRjb25zdCB0ZWFtcyA9IHRoaXMuZ2V0VGVhbXMoKTtcblx0XHRpZih0ZWFtcykge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8c2VsZWN0XG5cdFx0XHRcdFx0b25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVRlYW0xKGUpfSBcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy50ZWFtMSA/IHRoaXMucHJvcHMudGVhbTEgOiAnc2VsZWN0J30+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkIHZhbHVlPSdzZWxlY3QnPlNlbGVjdCBUZWFtPC9vcHRpb24+XG5cdFx0XHRcdFx0XHR7dGVhbXN9XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdFx0PHNlbGVjdFxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVUZWFtMihlKX1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy50ZWFtMiA/IHRoaXMucHJvcHMudGVhbTIgOiAnc2VsZWN0J30+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkIHZhbHVlPSdzZWxlY3QnPlNlbGVjdCBUZWFtPC9vcHRpb24+XG5cdFx0XHRcdFx0XHR7dGVhbXN9XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8c2VsZWN0IGRpc2FibGVkPjwvc2VsZWN0PlxuXHRcdFx0XHRcdDxzZWxlY3QgZGlzYWJsZWQ+PC9zZWxlY3Q+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJNYXRjaHVwKCkge1xuXHRcdGlmKHRoaXMucHJvcHMudGVhbTEgJiYgdGhpcy5wcm9wcy50ZWFtMikge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PE1hdGNoRWxlbWVudHMgdGVhbTE9e3RoaXMucHJvcHMudGVhbTF9IHRlYW0yPXt0aGlzLnByb3BzLnRlYW0yfSBnYW1lcz17dGhpcy5wcm9wcy5yZWdpb25EYXRhfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJTdGF0cygpIHtcblx0XHRpZih0aGlzLnByb3BzLnRlYW0xICYmIHRoaXMucHJvcHMudGVhbTIpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxUZWFtU3RhdHMgdGVhbTE9e3RoaXMucHJvcHMudGVhbTF9IHRlYW0yPXt0aGlzLnByb3BzLnRlYW0yfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJUZWFtc1ZTKCkge1xuXHRcdGlmKHRoaXMucHJvcHMudGVhbTEgJiYgdGhpcy5wcm9wcy50ZWFtMikge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy50ZWFtMX0gdnMge3RoaXMucHJvcHMudGVhbTJ9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX3NlbGVjdHNcIj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0eyB0aGlzLnJlbmRlclJlZ2lvbnMoKSB9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlclRlYW1zKCkgfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJUZWFtc1ZTKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclN0YXRzKCkgfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJNYXRjaHVwKCkgfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoVXA7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbkBjb25uZWN0KChzdG9yZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlYW0xOiBzdG9yZS5jb25maWcudGVhbTEsXG4gICAgICAgIHRlYW0yOiBzdG9yZS5jb25maWcudGVhbTIsXG4gICAgfVxufSlcblxuY2xhc3MgTWF0Y2hFbGVtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2FyZENsaWNrKCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdVUERBVEVfVEVBTVMnLFxuICAgICAgICAgICAgdGVhbTE6IHRoaXMucHJvcHMubWF0Y2gudGVhbTFhY3JvLFxuICAgICAgICAgICAgdGVhbTI6IHRoaXMucHJvcHMubWF0Y2gudGVhbTJhY3JvLFxuICAgICAgICAgICAgcmVnaW9uOiB0aGlzLnByb3BzLm1hdGNoLnJlZ2lvblxuICAgICAgICB9KVxuICAgIH1cbiBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLWNhcmRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLWNhcmRfX2JhY2tncm91bmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0Y2gtY2FyZF9fYmFja2dyb3VuZFwiIHN0eWxlPXtgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltZy9sb2dvcy8ke3RoaXMucHJvcHMubWF0Y2gucmVnaW9ufS8ke3RoaXMucHJvcHMubWF0Y2gudGVhbTFhY3JvfS5wbmcnKWB9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLWNhcmRfX2JhY2tncm91bmRcIiBzdHlsZT17YGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWcvbG9nb3MvJHt0aGlzLnByb3BzLm1hdGNoLnJlZ2lvbn0vJHt0aGlzLnByb3BzLm1hdGNoLnRlYW0yYWNyb30ucG5nJylgfT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLWNhcmRfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXRjaC1jYXJkX19sZWFndWVcIj57dGhpcy5wcm9wcy5tYXRjaC5yZWdpb259PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0Y2gtY2FyZF9fdGltZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMudGltZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoRWxlbWVudDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IE1hdGNoRWxlbWVudCBmcm9tICcuL01hdGNoRWxlbWVudCc7XG5cbkBjb25uZWN0KChzdG9yZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRpbmc6IHN0b3JlLm1hdGNoZXMubG9hZGluZyxcbiAgICAgICAgbWF0Y2hlczogc3RvcmUubWF0Y2hlcy5tYXRjaGVzLFxuICAgIH1cbn0pXG5jbGFzcyBNYXRjaGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIC8vIHNldCBpbml0aWFsIHRpbWU6XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mZXRjaE1hdGNoZXMoKTtcbiAgICB9XG5cbiAgICBmZXRjaE1hdGNoZXMoKSB7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiAnR0VUX01BVENIRVMnLFxuXHRcdFx0cGF5bG9hZDogZmV0Y2goYC9hcGkvc2NoZWR1bGUuanNvbmApLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdH0pO1xuICAgIH1cbiBcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgLy8gdXBkYXRlIHRpbWUgZXZlcnkgc2Vjb25kXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG4gXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIC8vIHN0b3Agd2hlbiBub3QgcmVuZGVyYWJsZVxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgIH1cblxuICAgIGdldFRpbWVEaWZmZXJlbmNlKHRpbWUxLCB0aW1lMikge1xuICAgICAgICBpZih0aW1lMSA+IHRpbWUyKSB7XG4gICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IHRpbWUxIC0gdGltZTI7XG4gICAgICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gKDM2MDAqMjQpKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZERheXMgPSAoXCIwXCIgKyBkYXlzKS5zbGljZSgtMik7XG4gICAgICAgICAgICBkaWZmZXJlbmNlICAtPSBkYXlzKjM2MDAqMjQ7XG4gICAgICAgICAgICBjb25zdCBocnMgICA9IE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvIDM2MDApO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkSHJzID0gKFwiMFwiICsgaHJzKS5zbGljZSgtMik7XG4gICAgICAgICAgICBkaWZmZXJlbmNlICAtPSBocnMqMzYwMDtcbiAgICAgICAgICAgIGNvbnN0IG1udHMgPSBNYXRoLmZsb29yKGRpZmZlcmVuY2UgLyA2MCk7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRNbnRzID0gKFwiMFwiICsgbW50cykuc2xpY2UoLTIpO1xuICAgICAgICAgICAgZGlmZmVyZW5jZSAgLT0gbW50cyo2MDtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IChcIjBcIiArIHNlY29uZHMpLnNsaWNlKC0yKTtcbiAgICAgICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWREYXlzfToke2Zvcm1hdHRlZEhyc306JHtmb3JtYXR0ZWRNbnRzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnMDA6MDA6MDA6MDAnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TmV4dE1hdGNoZXMobWF4ID0gMTApIHtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0xvYWRpbmcnO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMucHJvcHMubWF0Y2hlcykge1xuICAgICAgICAgICAgbGV0IG1hdGNoRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5wcm9wcy5tYXRjaGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy5wcm9wcy5tYXRjaGVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8IG1heCAmJiB0aGlzLnByb3BzLm1hdGNoZXNbaW5kZXhdLmRhdGV0aW1lID4gdGhpcy5zdGF0ZS50aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoRWxlbWVudHMucHVzaCg8TWF0Y2hFbGVtZW50IHN0b3JlPXt0aGlzLnByb3BzLnN0b3JlfSBtYXRjaD17dGhpcy5wcm9wcy5tYXRjaGVzW2luZGV4XX0gdGltZT17dGhpcy5nZXRUaW1lRGlmZmVyZW5jZSh0aGlzLnByb3BzLm1hdGNoZXNbaW5kZXhdLmRhdGV0aW1lLCB0aGlzLnN0YXRlLnRpbWUpfS8+KTtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hFbGVtZW50cztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuIFxuICAgIHJlbmRlcihwcm9wcywgc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIDxzcGFuPnsgdGhpcy5nZXROZXh0TWF0Y2hlcygyNSkgfTwvc3Bhbj47XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoZXM7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5jbGFzcyBOYXZCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGdldExpbmtzKCkge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0bWF0Y2hVcCA6ICdNYXRjaCBVcCcsXG5cdFx0XHRjaGFtcHMgOiAnQ2hhbXBzJyxcblx0XHRcdHBsYXllcnM6ICdQbGF5ZXJzJ1xuXHRcdH1cblx0XHRsZXQgbGlua3MgPSBbXVxuXG5cdFx0Zm9yIChjb25zdCBvcHRpb24gaW4gb3B0aW9ucykge1xuXHRcdFx0bGlua3MucHVzaCg8bGkgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy51cGRhdGVBcHBUeXBlKG9wdGlvbil9PntvcHRpb25zW29wdGlvbl19PC9saT4pO1xuXHRcdH1cblx0XHRyZXR1cm4gbGlua3M7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDx1bD5cblx0XHRcdFx0e3RoaXMuZ2V0TGlua3MoKSB9XG5cdFx0XHQ8L3VsPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBOYXZCYXI7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5jbGFzcyBBcHBNYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuICdwbGF5ZXJzJztcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcE1haW47IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlnKHN0YXRlID0gW10sIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cdGNhc2UgJ1VQREFURV9SRUdJT05fVEVYVCc6XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0YWN0aXZlUmVnaW9uIDogYWN0aW9uLnRleHQsXG5cdFx0XHR0ZWFtMSA6IGZhbHNlLFxuXHRcdFx0dGVhbTIgOiBmYWxzZSxcblx0XHR9XG5cdGNhc2UgJ1VQREFURV9URUFNMSc6XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0dGVhbTEgOiBhY3Rpb24udGV4dFxuXHRcdH1cblx0Y2FzZSAnVVBEQVRFX1RFQU0yJzpcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uc3RhdGUsXG5cdFx0XHR0ZWFtMiA6IGFjdGlvbi50ZXh0XG5cdFx0fVxuXG5cdGNhc2UgJ1VQREFURV9URUFNUyc6XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0dGVhbTE6IGFjdGlvbi50ZWFtMSxcblx0XHRcdHRlYW0yOiBhY3Rpb24udGVhbTIsXG5cdFx0XHRhY3RpdmVSZWdpb246IGFjdGlvbi5yZWdpb25cblx0XHR9XG5cblx0ZGVmYXVsdDpcblx0XHRyZXR1cm4gc3RhdGVcblx0fVxufVxuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgcmVnaW9ucyBmcm9tICcuL3JlZ2lvbnMnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IG1hdGNoZXMgZnJvbSAnLi9tYXRjaGVzJ1xuaW1wb3J0IHN0YXRzIGZyb20gJy4vc3RhdHMnXG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG5cdHJlZ2lvbnMsXG5cdGNvbmZpZyxcblx0bWF0Y2hlcyxcblx0c3RhdHNcbn0pXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRjaGVzKHN0YXRlID0gW10sIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgJ0dFVF9NQVRDSEVTX1BFTkRJTkcnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgIH1cbiAgICAgIGNhc2UgJ0dFVF9NQVRDSEVTX0ZVTEZJTExFRCc6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgIGxvYWRpbmcgOiBmYWxzZSxcbiAgICAgICAgICAgICAgbWF0Y2hlczogYWN0aW9uLnBheWxvYWRcbiAgICAgICAgICB9XG4gIFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgIH1cbiAgfVxuICAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpb25zKHN0YXRlID0gW10sIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gIFx0Y2FzZSAnVVBEQVRFX1JFR0lPTl9QRU5ESU5HJzpcbiAgXHRcdHJldHVybiB7XG4gIFx0XHRcdC4uLnN0YXRlLFxuICBcdFx0XHRyZWdpb25Mb2FkaW5nOiB0cnVlLFxuICBcdFx0fVxuXHRjYXNlICdVUERBVEVfUkVHSU9OX0ZVTEZJTExFRCc6XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0cmVnaW9uRGF0YSA6IGFjdGlvbi5wYXlsb2FkLFxuXHRcdFx0cmVnaW9uTG9hZGluZzogZmFsc2Vcblx0XHR9XG5cdGNhc2UgJ1VQREFURV9SRUdJT05fU1RBVFNfUEVORElORyc6XG4gIFx0XHRyZXR1cm4ge1xuICBcdFx0XHQuLi5zdGF0ZSxcbiAgXHRcdFx0c3RhdHNMb2FkaW5nOiB0cnVlLFxuICBcdFx0fVxuXHRjYXNlICdVUERBVEVfUkVHSU9OX1NUQVRTX0ZVTEZJTExFRCc6XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0cmVnaW9uU3RhdHMgOiBhY3Rpb24ucGF5bG9hZCxcblx0XHRcdHN0YXRzTG9hZGluZzogZmFsc2Vcblx0XHR9XG5cblx0ZGVmYXVsdDpcblx0XHRyZXR1cm4gc3RhdGVcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhdHMoc3RhdGUgPSB7bG9hZGluZzogMH0sIGFjdGlvbikge1xuXHRzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cdFx0Y2FzZSAnRkVUQ0hfU1RBVFNfUEVORElORyc6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5zdGF0ZSxcblx0XHRcdFx0bG9hZGluZzogc3RhdGUubG9hZGluZyArIDEsXG5cdFx0XHR9XG5cdFx0Y2FzZSAnRkVUQ0hfU1RBVFNfRlVMRklMTEVEJzpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0XHRsb2FkaW5nOiBzdGF0ZS5sb2FkaW5nIC0gMSxcblx0XHRcdFx0c3RhdHMgOiB7XG5cdFx0XHRcdFx0Li4uc3RhdGUuc3RhdHMsXG5cdFx0XHRcdFx0W2FjdGlvbi5tZXRhXSA6IGFjdGlvbi5wYXlsb2FkXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdGNhc2UgJ1NFVF9BTExfUEFUQ0hFUyc6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5zdGF0ZSxcblx0XHRcdFx0YWN0aXZlUGF0Y2hlczogYWN0aW9uLnBhdGNoZXNcblx0XHRcdH1cblxuXHRcdGNhc2UgJ1NFVF9BTExfUkVHSU9OUyc6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5zdGF0ZSxcblx0XHRcdFx0YWN0aXZlUmVnaW9uczogYWN0aW9uLnJlZ2lvbnNcblx0XHRcdH1cblxuXHRcdGNhc2UgJ1NFVF9BTExfVkFSSUFCTEVTJzpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0XHRhY3RpdmVWYXJpYWJsZXM6IGFjdGlvbi52YXJpYWJsZXNcblx0XHRcdH1cblxuXHRcdGNhc2UgJ1NFVF9NSU5QTEFZRUQnOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdG1pblBsYXllZDogYWN0aW9uLm1pblBsYXllZFxuXHRcdFx0fVxuXG5cdFx0Y2FzZSAnUkVTRVRfU1RBVFMnOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdGFjdGl2ZVBhdGNoZXM6IHVuZGVmaW5lZCxcblx0XHRcdFx0YWN0aXZlUmVnaW9uczogdW5kZWZpbmVkLFxuXHRcdFx0XHRhY3RpdmVWYXJpYWJsZXM6IHVuZGVmaW5lZCxcblx0XHRcdFx0bWluUGxheWVkOiB1bmRlZmluZWQsXG5cdFx0XHR9XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fVxufVxuIiwiaW1wb3J0IHsgYXBwbHlNaWRkbGV3YXJlLCBjcmVhdGVTdG9yZSB9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQgdGh1bmsgZnJvbSBcInJlZHV4LXRodW5rXCJcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCByZWR1eFByb21pc2VNaWRkbGV3YXJlIGZyb20gXCJyZWR1eC1wcm9taXNlLW1pZGRsZXdhcmVcIlxuaW1wb3J0IHJlZHVjZXIgZnJvbSBcIi4vaW5kZXhcIlxuXG5jb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHJlZHV4UHJvbWlzZU1pZGRsZXdhcmUoKSwgY3JlYXRlTG9nZ2VyKCkpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIG1pZGRsZXdhcmUpIiwiaW1wb3J0IExlYWd1ZVJlYWN0QXBwIGZyb20gJy4vY2xhc3Nlcy9MZWFndWVSZWFjdEFwcCc7XG5pbXBvcnQgTGVhZ3VlTWF0Y2hlc0FwcCBmcm9tICcuL2NsYXNzZXMvTGVhZ3VlTWF0Y2hlc0FwcCc7XG5cblxuXG5jb25zdCBsZWFndWVBcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbGVhZ3VlLWFwcCcpO1xuaWYobGVhZ3VlQXBwKSB7XG5cdG5ldyBMZWFndWVSZWFjdEFwcChsZWFndWVBcHApO1xufVxuXG5jb25zdCBsZWFndWVNYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWxlYWd1ZS1tYXRjaGVzJyk7XG5pZihsZWFndWVNYXRjaGVzKSB7XG5cdG5ldyBMZWFndWVNYXRjaGVzQXBwKGxlYWd1ZU1hdGNoZXMpO1xufSJdfQ==
