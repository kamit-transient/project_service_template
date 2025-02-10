import Pe from "react";
var M = { exports: {} }, D = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Te;
function fr() {
  if (Te) return D;
  Te = 1;
  var w = Pe, C = Symbol.for("react.element"), U = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, A = w.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, I = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(E, f, T) {
    var p, b = {}, h = null, $ = null;
    T !== void 0 && (h = "" + T), f.key !== void 0 && (h = "" + f.key), f.ref !== void 0 && ($ = f.ref);
    for (p in f) m.call(f, p) && !I.hasOwnProperty(p) && (b[p] = f[p]);
    if (E && E.defaultProps) for (p in f = E.defaultProps, f) b[p] === void 0 && (b[p] = f[p]);
    return { $$typeof: C, type: E, key: h, ref: $, props: b, _owner: A.current };
  }
  return D.Fragment = U, D.jsx = x, D.jsxs = x, D;
}
var F = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function cr() {
  return Oe || (Oe = 1, process.env.NODE_ENV !== "production" && function() {
    var w = Pe, C = Symbol.for("react.element"), U = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), I = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), E = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), $ = Symbol.for("react.offscreen"), H = Symbol.iterator, we = "@@iterator";
    function Ce(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = H && e[H] || e[we];
      return typeof r == "function" ? r : null;
    }
    var O = w.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function c(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        xe("error", e, t);
      }
    }
    function xe(e, r, t) {
      {
        var n = O.ReactDebugCurrentFrame, o = n.getStackAddendum();
        o !== "" && (r += "%s", t = t.concat([o]));
        var u = t.map(function(i) {
          return String(i);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var je = !1, ke = !1, De = !1, Fe = !1, Ae = !1, Z;
    Z = Symbol.for("react.module.reference");
    function Ie(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === I || Ae || e === A || e === T || e === p || Fe || e === $ || je || ke || De || typeof e == "object" && e !== null && (e.$$typeof === h || e.$$typeof === b || e.$$typeof === x || e.$$typeof === E || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Z || e.getModuleId !== void 0));
    }
    function $e(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var o = r.displayName || r.name || "";
      return o !== "" ? t + "(" + o + ")" : t;
    }
    function Q(e) {
      return e.displayName || "Context";
    }
    function y(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case U:
          return "Portal";
        case I:
          return "Profiler";
        case A:
          return "StrictMode";
        case T:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case E:
            var r = e;
            return Q(r) + ".Consumer";
          case x:
            var t = e;
            return Q(t._context) + ".Provider";
          case f:
            return $e(e, e.render, "ForwardRef");
          case b:
            var n = e.displayName || null;
            return n !== null ? n : y(e.type) || "Memo";
          case h: {
            var o = e, u = o._payload, i = o._init;
            try {
              return y(i(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var R = Object.assign, j = 0, ee, re, te, ne, ae, ie, oe;
    function ue() {
    }
    ue.__reactDisabledLog = !0;
    function We() {
      {
        if (j === 0) {
          ee = console.log, re = console.info, te = console.warn, ne = console.error, ae = console.group, ie = console.groupCollapsed, oe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ue,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        j++;
      }
    }
    function Ye() {
      {
        if (j--, j === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: R({}, e, {
              value: ee
            }),
            info: R({}, e, {
              value: re
            }),
            warn: R({}, e, {
              value: te
            }),
            error: R({}, e, {
              value: ne
            }),
            group: R({}, e, {
              value: ae
            }),
            groupCollapsed: R({}, e, {
              value: ie
            }),
            groupEnd: R({}, e, {
              value: oe
            })
          });
        }
        j < 0 && c("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var N = O.ReactCurrentDispatcher, J;
    function W(e, r, t) {
      {
        if (J === void 0)
          try {
            throw Error();
          } catch (o) {
            var n = o.stack.trim().match(/\n( *(at )?)/);
            J = n && n[1] || "";
          }
        return `
` + J + e;
      }
    }
    var q = !1, Y;
    {
      var Le = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new Le();
    }
    function se(e, r) {
      if (!e || q)
        return "";
      {
        var t = Y.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      q = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = N.current, N.current = null, We();
      try {
        if (r) {
          var i = function() {
            throw Error();
          };
          if (Object.defineProperty(i.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(i, []);
            } catch (d) {
              n = d;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (d) {
              n = d;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (d) {
            n = d;
          }
          e();
        }
      } catch (d) {
        if (d && n && typeof d.stack == "string") {
          for (var a = d.stack.split(`
`), v = n.stack.split(`
`), s = a.length - 1, l = v.length - 1; s >= 1 && l >= 0 && a[s] !== v[l]; )
            l--;
          for (; s >= 1 && l >= 0; s--, l--)
            if (a[s] !== v[l]) {
              if (s !== 1 || l !== 1)
                do
                  if (s--, l--, l < 0 || a[s] !== v[l]) {
                    var g = `
` + a[s].replace(" at new ", " at ");
                    return e.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", e.displayName)), typeof e == "function" && Y.set(e, g), g;
                  }
                while (s >= 1 && l >= 0);
              break;
            }
        }
      } finally {
        q = !1, N.current = u, Ye(), Error.prepareStackTrace = o;
      }
      var P = e ? e.displayName || e.name : "", _ = P ? W(P) : "";
      return typeof e == "function" && Y.set(e, _), _;
    }
    function Ve(e, r, t) {
      return se(e, !1);
    }
    function Me(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function L(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return se(e, Me(e));
      if (typeof e == "string")
        return W(e);
      switch (e) {
        case T:
          return W("Suspense");
        case p:
          return W("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return Ve(e.render);
          case b:
            return L(e.type, r, t);
          case h: {
            var n = e, o = n._payload, u = n._init;
            try {
              return L(u(o), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var k = Object.prototype.hasOwnProperty, le = {}, fe = O.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var r = e._owner, t = L(e.type, e._source, r ? r.type : null);
        fe.setExtraStackFrame(t);
      } else
        fe.setExtraStackFrame(null);
    }
    function Ue(e, r, t, n, o) {
      {
        var u = Function.call.bind(k);
        for (var i in e)
          if (u(e, i)) {
            var a = void 0;
            try {
              if (typeof e[i] != "function") {
                var v = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              a = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (s) {
              a = s;
            }
            a && !(a instanceof Error) && (V(o), c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof a), V(null)), a instanceof Error && !(a.message in le) && (le[a.message] = !0, V(o), c("Failed %s type: %s", t, a.message), V(null));
          }
      }
    }
    var Ne = Array.isArray;
    function B(e) {
      return Ne(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function qe(e) {
      try {
        return ce(e), !1;
      } catch {
        return !0;
      }
    }
    function ce(e) {
      return "" + e;
    }
    function ve(e) {
      if (qe(e))
        return c("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), ce(e);
    }
    var de = O.ReactCurrentOwner, Be = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, pe, ge;
    function Ke(e) {
      if (k.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ge(e) {
      if (k.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ze(e, r) {
      typeof e.ref == "string" && de.current;
    }
    function Xe(e, r) {
      {
        var t = function() {
          pe || (pe = !0, c("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function He(e, r) {
      {
        var t = function() {
          ge || (ge = !0, c("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var Ze = function(e, r, t, n, o, u, i) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: C,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function Qe(e, r, t, n, o) {
      {
        var u, i = {}, a = null, v = null;
        t !== void 0 && (ve(t), a = "" + t), Ge(r) && (ve(r.key), a = "" + r.key), Ke(r) && (v = r.ref, ze(r, o));
        for (u in r)
          k.call(r, u) && !Be.hasOwnProperty(u) && (i[u] = r[u]);
        if (e && e.defaultProps) {
          var s = e.defaultProps;
          for (u in s)
            i[u] === void 0 && (i[u] = s[u]);
        }
        if (a || v) {
          var l = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Xe(i, l), v && He(i, l);
        }
        return Ze(e, a, v, o, n, de.current, i);
      }
    }
    var K = O.ReactCurrentOwner, be = O.ReactDebugCurrentFrame;
    function S(e) {
      if (e) {
        var r = e._owner, t = L(e.type, e._source, r ? r.type : null);
        be.setExtraStackFrame(t);
      } else
        be.setExtraStackFrame(null);
    }
    var G;
    G = !1;
    function z(e) {
      return typeof e == "object" && e !== null && e.$$typeof === C;
    }
    function ye() {
      {
        if (K.current) {
          var e = y(K.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function er(e) {
      return "";
    }
    var Ee = {};
    function rr(e) {
      {
        var r = ye();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function he(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = rr(r);
        if (Ee[t])
          return;
        Ee[t] = !0;
        var n = "";
        e && e._owner && e._owner !== K.current && (n = " It was passed a child from " + y(e._owner.type) + "."), S(e), c('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), S(null);
      }
    }
    function Re(e, r) {
      {
        if (typeof e != "object")
          return;
        if (B(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            z(n) && he(n, r);
          }
        else if (z(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var o = Ce(e);
          if (typeof o == "function" && o !== e.entries)
            for (var u = o.call(e), i; !(i = u.next()).done; )
              z(i.value) && he(i.value, r);
        }
      }
    }
    function tr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === b))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = y(r);
          Ue(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !G) {
          G = !0;
          var o = y(r);
          c("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && c("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function nr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            S(e), c("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), S(null);
            break;
          }
        }
        e.ref !== null && (S(e), c("Invalid attribute `ref` supplied to `React.Fragment`."), S(null));
      }
    }
    var _e = {};
    function me(e, r, t, n, o, u) {
      {
        var i = Ie(e);
        if (!i) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var v = er();
          v ? a += v : a += ye();
          var s;
          e === null ? s = "null" : B(e) ? s = "array" : e !== void 0 && e.$$typeof === C ? (s = "<" + (y(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, c("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", s, a);
        }
        var l = Qe(e, r, t, o, u);
        if (l == null)
          return l;
        if (i) {
          var g = r.children;
          if (g !== void 0)
            if (n)
              if (B(g)) {
                for (var P = 0; P < g.length; P++)
                  Re(g[P], e);
                Object.freeze && Object.freeze(g);
              } else
                c("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Re(g, e);
        }
        if (k.call(r, "key")) {
          var _ = y(e), d = Object.keys(r).filter(function(lr) {
            return lr !== "key";
          }), X = d.length > 0 ? "{key: someKey, " + d.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!_e[_ + X]) {
            var sr = d.length > 0 ? "{" + d.join(": ..., ") + ": ...}" : "{}";
            c(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, X, _, sr, _), _e[_ + X] = !0;
          }
        }
        return e === m ? nr(l) : tr(l), l;
      }
    }
    function ar(e, r, t) {
      return me(e, r, t, !0);
    }
    function ir(e, r, t) {
      return me(e, r, t, !1);
    }
    var or = ir, ur = ar;
    F.Fragment = m, F.jsx = or, F.jsxs = ur;
  }()), F;
}
var Se;
function vr() {
  return Se || (Se = 1, process.env.NODE_ENV === "production" ? M.exports = fr() : M.exports = cr()), M.exports;
}
var dr = vr();
const gr = ({ children: w }) => /* @__PURE__ */ dr.jsx("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", children: w });
export {
  gr as Button
};
