/*
 Highcharts JS v8.1.2 (2020-06-16)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (T, O) {
    "object" === typeof module && module.exports ? (O["default"] = O, module.exports = T.document ? O(T) : O) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function () {
        return O(T)
    }) : (T.Highcharts && T.Highcharts.error(16, !0), T.Highcharts = O(T))
})("undefined" !== typeof window ? window : this, function (T) {
    function O(g, c, R, y) {
        g.hasOwnProperty(c) || (g[c] = y.apply(null, R))
    }
    var q = {};
    O(q, "parts/Globals.js", [], function () {
        var g = "undefined" !== typeof T ? T : "undefined" !== typeof window ? window : {},
            c = g.document,
            R = g.navigator && g.navigator.userAgent || "",
            y = c && c.createElementNS && !!c.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            q = /(edge|msie|trident)/i.test(R) && !g.opera,
            H = -1 !== R.indexOf("Firefox"),
            D = -1 !== R.indexOf("Chrome"),
            J = H && 4 > parseInt(R.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "8.1.2",
            deg2rad: 2 * Math.PI / 360,
            doc: c,
            hasBidiBug: J,
            hasTouch: !!g.TouchEvent,
            isMS: q,
            isWebKit: -1 !== R.indexOf("AppleWebKit"),
            isFirefox: H,
            isChrome: D,
            isSafari: !D && -1 !== R.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(R),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: y,
            win: g,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {},
            charts: [],
            dateFormats: {}
        }
    });
    O(q, "parts/Utilities.js", [q["parts/Globals.js"]], function (g) {
        function c(b, h, e, z) {
            var a = h ? "Highcharts error" : "Highcharts warning";
            32 === b && (b = a + ": Deprecated member");
            var x = I(b),
                f = x ? a + " #" + b + ": www.highcharts.com/errors/" + b + "/" : b.toString();
            a = function () {
                if (h) throw Error(f);
                G.console && -1 === c.messages.indexOf(f) &&
                    console.log(f)
            };
            if ("undefined" !== typeof z) {
                var d = "";
                x && (f += "?");
                W(z, function (b, h) {
                    d += "\n - " + h + ": " + b;
                    x && (f += encodeURI(h) + "=" + encodeURI(b))
                });
                f += d
            }
            e ? da(e, "displayError", {
                code: b,
                message: f,
                params: z
            }, a) : a();
            c.messages.push(f)
        }

        function R() {
            var b, h = arguments,
                e = {},
                z = function (b, h) {
                    "object" !== typeof b && (b = {});
                    W(h, function (e, a) {
                        !y(e, !0) || C(e) || r(e) ? b[a] = h[a] : b[a] = z(b[a] || {}, e)
                    });
                    return b
                };
            !0 === h[0] && (e = h[1], h = Array.prototype.slice.call(h, 2));
            var a = h.length;
            for (b = 0; b < a; b++) e = z(e, h[b]);
            return e
        }

        function y(b,
            h) {
            return !!b && "object" === typeof b && (!h || !n(b))
        }

        function q(b, h, e) {
            var a;
            K(h) ? m(e) ? b.setAttribute(h, e) : b && b.getAttribute && ((a = b.getAttribute(h)) || "class" !== h || (a = b.getAttribute(h + "Name"))) : W(h, function (h, e) {
                b.setAttribute(e, h)
            });
            return a
        }

        function H() {
            for (var b = arguments, h = b.length, e = 0; e < h; e++) {
                var a = b[e];
                if ("undefined" !== typeof a && null !== a) return a
            }
        }

        function D(b, h) {
            if (!b) return h;
            var e = b.split(".").reverse();
            if (1 === e.length) return h[b];
            for (b = e.pop();
                "undefined" !== typeof b && "undefined" !== typeof h && null !==
                h;) h = h[b], b = e.pop();
            return h
        }
        g.timers = [];
        var J = g.charts,
            t = g.doc,
            G = g.win;
        (c || (c = {})).messages = [];
        g.error = c;
        var L = function () {
            function b(b, h, e) {
                this.options = h;
                this.elem = b;
                this.prop = e
            }
            b.prototype.dSetter = function () {
                var b = this.paths,
                    h = b && b[0];
                b = b && b[1];
                var e = [],
                    a = this.now || 0;
                if (1 !== a && h && b)
                    if (h.length === b.length && 1 > a)
                        for (var z = 0; z < b.length; z++) {
                            for (var x = h[z], f = b[z], d = [], k = 0; k < f.length; k++) {
                                var N = x[k],
                                    l = f[k];
                                d[k] = "number" === typeof N && "number" === typeof l && ("A" !== f[0] || 4 !== k && 5 !== k) ? N + a * (l - N) : l
                            }
                            e.push(d)
                        } else e =
                            b;
                    else e = this.toD || [];
                this.elem.attr("d", e, void 0, !0)
            };
            b.prototype.update = function () {
                var b = this.elem,
                    h = this.prop,
                    e = this.now,
                    a = this.options.step;
                if (this[h + "Setter"]) this[h + "Setter"]();
                else b.attr ? b.element && b.attr(h, e, null, !0) : b.style[h] = e + this.unit;
                a && a.call(b, e, this)
            };
            b.prototype.run = function (b, h, e) {
                var a = this,
                    z = a.options,
                    x = function (b) {
                        return x.stopped ? !1 : a.step(b)
                    },
                    f = G.requestAnimationFrame || function (b) {
                        setTimeout(b, 13)
                    },
                    d = function () {
                        for (var b = 0; b < g.timers.length; b++) g.timers[b]() || g.timers.splice(b--,
                            1);
                        g.timers.length && f(d)
                    };
                b !== h || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = b, this.end = h, this.unit = e, this.now = this.start, this.pos = 0, x.elem = this.elem, x.prop = this.prop, x() && 1 === g.timers.push(x) && f(d)) : (delete z.curAnim[this.prop], z.complete && 0 === Object.keys(z.curAnim).length && z.complete.call(this.elem))
            };
            b.prototype.step = function (b) {
                var h = +new Date,
                    e = this.options,
                    a = this.elem,
                    z = e.complete,
                    x = e.duration,
                    f = e.curAnim;
                if (a.attr && !a.element) b = !1;
                else if (b || h >= x + this.startTime) {
                    this.now =
                        this.end;
                    this.pos = 1;
                    this.update();
                    var d = f[this.prop] = !0;
                    W(f, function (b) {
                        !0 !== b && (d = !1)
                    });
                    d && z && z.call(a);
                    b = !1
                } else this.pos = e.easing((h - this.startTime) / x), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0;
                return b
            };
            b.prototype.initPath = function (b, h, e) {
                function a(b, h) {
                    for (; b.length < u;) {
                        var e = b[0],
                            a = h[u - b.length];
                        a && "M" === e[0] && (b[0] = "C" === a[0] ? ["C", e[1], e[2], e[1], e[2], e[1], e[2]] : ["L", e[1], e[2]]);
                        b.unshift(e);
                        d && b.push(b[b.length - 1])
                    }
                }

                function z(b, h) {
                    for (; b.length < u;)
                        if (h = b[b.length /
                                k - 1].slice(), "C" === h[0] && (h[1] = h[5], h[2] = h[6]), d) {
                            var e = b[b.length / k].slice();
                            b.splice(b.length / 2, 0, h, e)
                        } else b.push(h)
                }
                var x = b.startX,
                    f = b.endX;
                h = h && h.slice();
                e = e.slice();
                var d = b.isArea,
                    k = d ? 2 : 1;
                if (!h) return [e, e];
                if (x && f) {
                    for (b = 0; b < x.length; b++)
                        if (x[b] === f[0]) {
                            var N = b;
                            break
                        } else if (x[0] === f[f.length - x.length + b]) {
                        N = b;
                        var l = !0;
                        break
                    } else if (x[x.length - 1] === f[f.length - x.length + b]) {
                        N = x.length - b;
                        break
                    }
                    "undefined" === typeof N && (h = [])
                }
                if (h.length && I(N)) {
                    var u = e.length + N * k;
                    l ? (a(h, e), z(e, h)) : (a(e, h), z(h, e))
                }
                return [h,
                    e
                ]
            };
            b.prototype.fillSetter = function () {
                b.prototype.strokeSetter.apply(this, arguments)
            };
            b.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, g.color(this.start).tweenTo(g.color(this.end), this.pos), null, !0)
            };
            return b
        }();
        g.Fx = L;
        g.merge = R;
        var v = g.pInt = function (b, h) {
                return parseInt(b, h || 10)
            },
            K = g.isString = function (b) {
                return "string" === typeof b
            },
            n = g.isArray = function (b) {
                b = Object.prototype.toString.call(b);
                return "[object Array]" === b || "[object Array Iterator]" === b
            };
        g.isObject = y;
        var r = g.isDOMElement = function (b) {
                return y(b) &&
                    "number" === typeof b.nodeType
            },
            C = g.isClass = function (b) {
                var h = b && b.constructor;
                return !(!y(b, !0) || r(b) || !h || !h.name || "Object" === h.name)
            },
            I = g.isNumber = function (b) {
                return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
            },
            p = g.erase = function (b, h) {
                for (var e = b.length; e--;)
                    if (b[e] === h) {
                        b.splice(e, 1);
                        break
                    }
            },
            m = g.defined = function (b) {
                return "undefined" !== typeof b && null !== b
            };
        g.attr = q;
        var d = g.splat = function (b) {
                return n(b) ? b : [b]
            },
            l = g.syncTimeout = function (b, h, e) {
                if (0 < h) return setTimeout(b, h, e);
                b.call(0, e);
                return -1
            },
            k = g.clearTimeout = function (b) {
                m(b) && clearTimeout(b)
            },
            f = g.extend = function (b, h) {
                var e;
                b || (b = {});
                for (e in h) b[e] = h[e];
                return b
            };
        g.pick = H;
        var a = g.css = function (b, h) {
                g.isMS && !g.svg && h && "undefined" !== typeof h.opacity && (h.filter = "alpha(opacity=" + 100 * h.opacity + ")");
                f(b.style, h)
            },
            A = g.createElement = function (b, h, e, z, x) {
                b = t.createElement(b);
                h && f(b, h);
                x && a(b, {
                    padding: "0",
                    border: "none",
                    margin: "0"
                });
                e && a(b, e);
                z && z.appendChild(b);
                return b
            },
            u = g.extendClass = function (b, h) {
                var e = function () {};
                e.prototype = new b;
                f(e.prototype,
                    h);
                return e
            },
            E = g.pad = function (b, h, e) {
                return Array((h || 2) + 1 - String(b).replace("-", "").length).join(e || "0") + b
            },
            P = g.relativeLength = function (b, h, e) {
                return /%$/.test(b) ? h * parseFloat(b) / 100 + (e || 0) : parseFloat(b)
            },
            w = g.wrap = function (b, h, e) {
                var a = b[h];
                b[h] = function () {
                    var b = Array.prototype.slice.call(arguments),
                        h = arguments,
                        z = this;
                    z.proceed = function () {
                        a.apply(z, arguments.length ? arguments : h)
                    };
                    b.unshift(a);
                    b = e.apply(this, b);
                    z.proceed = null;
                    return b
                }
            },
            M = g.format = function (b, h, e) {
                var a = "{",
                    z = !1,
                    x = [],
                    f = /f$/,
                    d = /\.([0-9])/,
                    k = g.defaultOptions.lang,
                    N = e && e.time || g.time;
                for (e = e && e.numberFormatter || Y; b;) {
                    var l = b.indexOf(a);
                    if (-1 === l) break;
                    var u = b.slice(0, l);
                    if (z) {
                        u = u.split(":");
                        a = D(u.shift() || "", h);
                        if (u.length && "number" === typeof a)
                            if (u = u.join(":"), f.test(u)) {
                                var m = parseInt((u.match(d) || ["", "-1"])[1], 10);
                                null !== a && (a = e(a, m, k.decimalPoint, -1 < u.indexOf(",") ? k.thousandsSep : ""))
                            } else a = N.dateFormat(u, a);
                        x.push(a)
                    } else x.push(u);
                    b = b.slice(l + 1);
                    a = (z = !z) ? "}" : "{"
                }
                x.push(b);
                return x.join("")
            },
            F = g.getMagnitude = function (b) {
                return Math.pow(10,
                    Math.floor(Math.log(b) / Math.LN10))
            },
            Q = g.normalizeTickInterval = function (b, h, e, a, z) {
                var x = b;
                e = H(e, 1);
                var f = b / e;
                h || (h = z ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === a && (1 === e ? h = h.filter(function (b) {
                    return 0 === b % 1
                }) : .1 >= e && (h = [1 / e])));
                for (a = 0; a < h.length && !(x = h[a], z && x * e >= b || !z && f <= (h[a] + (h[a + 1] || h[a])) / 2); a++);
                return x = N(x * e, -Math.round(Math.log(.001) / Math.LN10))
            },
            e = g.stableSort = function (b, h) {
                var e = b.length,
                    a, z;
                for (z = 0; z < e; z++) b[z].safeI = z;
                b.sort(function (b, e) {
                    a = h(b, e);
                    return 0 === a ? b.safeI - e.safeI :
                        a
                });
                for (z = 0; z < e; z++) delete b[z].safeI
            },
            b = g.arrayMin = function (b) {
                for (var h = b.length, e = b[0]; h--;) b[h] < e && (e = b[h]);
                return e
            },
            h = g.arrayMax = function (b) {
                for (var h = b.length, e = b[0]; h--;) b[h] > e && (e = b[h]);
                return e
            },
            z = g.destroyObjectProperties = function (b, h) {
                W(b, function (e, a) {
                    e && e !== h && e.destroy && e.destroy();
                    delete b[a]
                })
            },
            x = g.discardElement = function (b) {
                var h = g.garbageBin;
                h || (h = A("div"));
                b && h.appendChild(b);
                h.innerHTML = ""
            },
            N = g.correctFloat = function (b, h) {
                return parseFloat(b.toPrecision(h || 14))
            },
            aa = g.setAnimation =
            function (b, h) {
                h.renderer.globalAnimation = H(b, h.options.chart.animation, !0)
            },
            Z = g.animObject = function (b) {
                return y(b) ? R(b) : {
                    duration: b ? 500 : 0
                }
            },
            V = g.timeUnits = {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            Y = g.numberFormat = function (b, h, e, a) {
                b = +b || 0;
                h = +h;
                var z = g.defaultOptions.lang,
                    x = (b.toString().split(".")[1] || "").split("e")[0].length,
                    f = b.toString().split("e");
                if (-1 === h) h = Math.min(x, 20);
                else if (!I(h)) h = 2;
                else if (h && f[1] && 0 > f[1]) {
                    var d = h + +f[1];
                    0 <= d ? (f[0] =
                        (+f[0]).toExponential(d).split("e")[0], h = d) : (f[0] = f[0].split(".")[0] || 0, b = 20 > h ? (f[0] * Math.pow(10, f[1])).toFixed(h) : 0, f[1] = 0)
                }
                var k = (Math.abs(f[1] ? f[0] : b) + Math.pow(10, -Math.max(h, x) - 1)).toFixed(h);
                x = String(v(k));
                d = 3 < x.length ? x.length % 3 : 0;
                e = H(e, z.decimalPoint);
                a = H(a, z.thousandsSep);
                b = (0 > b ? "-" : "") + (d ? x.substr(0, d) + a : "");
                b += x.substr(d).replace(/(\d{3})(?=\d)/g, "$1" + a);
                h && (b += e + k.slice(-h));
                f[1] && 0 !== +b && (b += "e" + f[1]);
                return b
            };
        Math.easeInOutSine = function (b) {
            return -.5 * (Math.cos(Math.PI * b) - 1)
        };
        var ba = g.getStyle =
            function (b, h, e) {
                if ("width" === h) return h = Math.min(b.offsetWidth, b.scrollWidth), e = b.getBoundingClientRect && b.getBoundingClientRect().width, e < h && e >= h - 1 && (h = Math.floor(e)), Math.max(0, h - g.getStyle(b, "padding-left") - g.getStyle(b, "padding-right"));
                if ("height" === h) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - g.getStyle(b, "padding-top") - g.getStyle(b, "padding-bottom"));
                G.getComputedStyle || c(27, !0);
                if (b = G.getComputedStyle(b, void 0)) b = b.getPropertyValue(h), H(e, "opacity" !== h) && (b = v(b));
                return b
            },
            U = g.inArray = function (b, h, e) {
                c(32, !1, void 0, {
                    "Highcharts.inArray": "use Array.indexOf"
                });
                return h.indexOf(b, e)
            },
            X = g.find = Array.prototype.find ? function (b, h) {
                return b.find(h)
            } : function (b, h) {
                var e, a = b.length;
                for (e = 0; e < a; e++)
                    if (h(b[e], e)) return b[e]
            };
        g.keys = function (b) {
            c(32, !1, void 0, {
                "Highcharts.keys": "use Object.keys"
            });
            return Object.keys(b)
        };
        var ia = g.offset = function (b) {
                var h = t.documentElement;
                b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: b.top + (G.pageYOffset || h.scrollTop) -
                        (h.clientTop || 0),
                    left: b.left + (G.pageXOffset || h.scrollLeft) - (h.clientLeft || 0)
                }
            },
            S = g.stop = function (b, h) {
                for (var e = g.timers.length; e--;) g.timers[e].elem !== b || h && h !== g.timers[e].prop || (g.timers[e].stopped = !0)
            },
            W = g.objectEach = function (b, h, e) {
                for (var a in b) Object.hasOwnProperty.call(b, a) && h.call(e || b[a], b[a], a, b)
            };
        W({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function (b, h) {
            g[h] = function (e) {
                var a;
                c(32, !1, void 0, (a = {}, a["Highcharts." + h] = "use Array." + b, a));
                return Array.prototype[b].apply(e,
                    [].slice.call(arguments, 1))
            }
        });
        var ja = g.addEvent = function (b, h, e, a) {
                void 0 === a && (a = {});
                var z = b.addEventListener || g.addEventListenerPolyfill;
                var x = "function" === typeof b && b.prototype ? b.prototype.protoEvents = b.prototype.protoEvents || {} : b.hcEvents = b.hcEvents || {};
                g.Point && b instanceof g.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
                z && z.call(b, h, e, !1);
                x[h] || (x[h] = []);
                x[h].push({
                    fn: e,
                    order: "number" === typeof a.order ? a.order : Infinity
                });
                x[h].sort(function (b, h) {
                    return b.order - h.order
                });
                return function () {
                    ea(b, h, e)
                }
            },
            ea = g.removeEvent = function (b, h, e) {
                function a(h, e) {
                    var a = b.removeEventListener || g.removeEventListenerPolyfill;
                    a && a.call(b, h, e, !1)
                }

                function z(e) {
                    var z;
                    if (b.nodeName) {
                        if (h) {
                            var x = {};
                            x[h] = !0
                        } else x = e;
                        W(x, function (b, h) {
                            if (e[h])
                                for (z = e[h].length; z--;) a(h, e[h][z].fn)
                        })
                    }
                }
                var x;
                ["protoEvents", "hcEvents"].forEach(function (f, d) {
                    var k = (d = d ? b : b.prototype) && d[f];
                    k && (h ? (x = k[h] || [], e ? (k[h] = x.filter(function (b) {
                        return e !== b.fn
                    }), a(h, e)) : (z(k), k[h] = [])) : (z(k), d[f] = {}))
                })
            },
            da = g.fireEvent =
            function (b, h, e, a) {
                var z;
                e = e || {};
                if (t.createEvent && (b.dispatchEvent || b.fireEvent)) {
                    var x = t.createEvent("Events");
                    x.initEvent(h, !0, !0);
                    f(x, e);
                    b.dispatchEvent ? b.dispatchEvent(x) : b.fireEvent(h, x)
                } else e.target || f(e, {
                        preventDefault: function () {
                            e.defaultPrevented = !0
                        },
                        target: b,
                        type: h
                    }),
                    function (h, a) {
                        void 0 === h && (h = []);
                        void 0 === a && (a = []);
                        var x = 0,
                            f = 0,
                            d = h.length + a.length;
                        for (z = 0; z < d; z++) !1 === (h[x] ? a[f] ? h[x].order <= a[f].order ? h[x++] : a[f++] : h[x++] : a[f++]).fn.call(b, e) && e.preventDefault()
                    }(b.protoEvents && b.protoEvents[h],
                        b.hcEvents && b.hcEvents[h]);
                a && !e.defaultPrevented && a.call(b, e)
            },
            ka = g.animate = function (b, h, e) {
                var a, z = "",
                    x, f;
                if (!y(e)) {
                    var d = arguments;
                    e = {
                        duration: d[2],
                        easing: d[3],
                        complete: d[4]
                    }
                }
                I(e.duration) || (e.duration = 400);
                e.easing = "function" === typeof e.easing ? e.easing : Math[e.easing] || Math.easeInOutSine;
                e.curAnim = R(h);
                W(h, function (d, k) {
                    S(b, k);
                    f = new L(b, e, k);
                    x = null;
                    "d" === k && n(h.d) ? (f.paths = f.initPath(b, b.pathArray, h.d), f.toD = h.d, a = 0, x = 1) : b.attr ? a = b.attr(k) : (a = parseFloat(ba(b, k)) || 0, "opacity" !== k && (z = "px"));
                    x ||
                        (x = d);
                    x && x.match && x.match("px") && (x = x.replace(/px/g, ""));
                    f.run(a, x, z)
                })
            },
            la = g.seriesType = function (b, h, e, a, x) {
                var z = fa(),
                    f = g.seriesTypes;
                z.plotOptions[b] = R(z.plotOptions[h], e);
                f[b] = u(f[h] || function () {}, a);
                f[b].prototype.type = b;
                x && (f[b].prototype.pointClass = u(g.Point, x));
                return f[b]
            },
            ca, ha = g.uniqueKey = function () {
                var b = Math.random().toString(36).substring(2, 9) + "-",
                    h = 0;
                return function () {
                    return "highcharts-" + (ca ? "" : b) + h++
                }
            }(),
            ma = g.useSerialIds = function (b) {
                return ca = H(b, ca)
            },
            O = g.isFunction = function (b) {
                return "function" ===
                    typeof b
            },
            fa = g.getOptions = function () {
                return g.defaultOptions
            },
            na = g.setOptions = function (b) {
                g.defaultOptions = R(!0, g.defaultOptions, b);
                (b.time || b.global) && g.time.update(R(g.defaultOptions.global, g.defaultOptions.time, b.global, b.time));
                return g.defaultOptions
            };
        G.jQuery && (G.jQuery.fn.highcharts = function () {
            var b = [].slice.call(arguments);
            if (this[0]) return b[0] ? (new(g[K(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) : J[q(this[0], "data-highcharts-chart")]
        });
        return {
            Fx: g.Fx,
            addEvent: ja,
            animate: ka,
            animObject: Z,
            arrayMax: h,
            arrayMin: b,
            attr: q,
            clamp: function (b, h, e) {
                return b > h ? b < e ? b : e : h
            },
            clearTimeout: k,
            correctFloat: N,
            createElement: A,
            css: a,
            defined: m,
            destroyObjectProperties: z,
            discardElement: x,
            erase: p,
            error: c,
            extend: f,
            extendClass: u,
            find: X,
            fireEvent: da,
            format: M,
            getMagnitude: F,
            getNestedProperty: D,
            getOptions: fa,
            getStyle: ba,
            inArray: U,
            isArray: n,
            isClass: C,
            isDOMElement: r,
            isFunction: O,
            isNumber: I,
            isObject: y,
            isString: K,
            merge: R,
            normalizeTickInterval: Q,
            numberFormat: Y,
            objectEach: W,
            offset: ia,
            pad: E,
            pick: H,
            pInt: v,
            relativeLength: P,
            removeEvent: ea,
            seriesType: la,
            setAnimation: aa,
            setOptions: na,
            splat: d,
            stableSort: e,
            stop: S,
            syncTimeout: l,
            timeUnits: V,
            uniqueKey: ha,
            useSerialIds: ma,
            wrap: w
        }
    });
    O(q, "parts/Color.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c) {
        var R = c.isNumber,
            y = c.merge,
            q = c.pInt;
        c = function () {
            function c(g) {
                this.parsers = [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (c) {
                        return [q(c[1]), q(c[2]), q(c[3]), parseFloat(c[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function (c) {
                        return [q(c[1]), q(c[2]), q(c[3]), 1]
                    }
                }];
                this.rgba = [];
                if (!(this instanceof c)) return new c(g);
                this.init(g)
            }
            c.parse = function (g) {
                return new c(g)
            };
            c.prototype.init = function (g) {
                var J, t;
                if ((this.input = g = c.names[g && g.toLowerCase ? g.toLowerCase() : ""] || g) && g.stops) this.stops = g.stops.map(function (v) {
                    return new c(v[1])
                });
                else {
                    if (g && g.charAt && "#" === g.charAt()) {
                        var G = g.length;
                        g = parseInt(g.substr(1), 16);
                        7 === G ? J = [(g & 16711680) >> 16, (g & 65280) >> 8, g & 255, 1] : 4 === G && (J = [(g & 3840) >> 4 | (g & 3840) >> 8, (g & 240) >> 4 |
                            g & 240, (g & 15) << 4 | g & 15, 1
                        ])
                    }
                    if (!J)
                        for (t = this.parsers.length; t-- && !J;) {
                            var L = this.parsers[t];
                            (G = L.regex.exec(g)) && (J = L.parse(G))
                        }
                }
                this.rgba = J || []
            };
            c.prototype.get = function (c) {
                var g = this.input,
                    t = this.rgba;
                if ("undefined" !== typeof this.stops) {
                    var G = y(g);
                    G.stops = [].concat(G.stops);
                    this.stops.forEach(function (g, v) {
                        G.stops[v] = [G.stops[v][0], g.get(c)]
                    })
                } else G = t && R(t[0]) ? "rgb" === c || !c && 1 === t[3] ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")" : "a" === c ? t[3] : "rgba(" + t.join(",") + ")" : g;
                return G
            };
            c.prototype.brighten = function (c) {
                var g,
                    t = this.rgba;
                if (this.stops) this.stops.forEach(function (g) {
                    g.brighten(c)
                });
                else if (R(c) && 0 !== c)
                    for (g = 0; 3 > g; g++) t[g] += q(255 * c), 0 > t[g] && (t[g] = 0), 255 < t[g] && (t[g] = 255);
                return this
            };
            c.prototype.setOpacity = function (c) {
                this.rgba[3] = c;
                return this
            };
            c.prototype.tweenTo = function (c, g) {
                var t = this.rgba,
                    G = c.rgba;
                G.length && t && t.length ? (c = 1 !== G[3] || 1 !== t[3], g = (c ? "rgba(" : "rgb(") + Math.round(G[0] + (t[0] - G[0]) * (1 - g)) + "," + Math.round(G[1] + (t[1] - G[1]) * (1 - g)) + "," + Math.round(G[2] + (t[2] - G[2]) * (1 - g)) + (c ? "," + (G[3] + (t[3] - G[3]) * (1 -
                    g)) : "") + ")") : g = c.input || "none";
                return g
            };
            c.names = {
                white: "#ffffff",
                black: "#000000"
            };
            return c
        }();
        g.Color = c;
        g.color = c.parse;
        return g.Color
    });
    O(q, "parts/SVGElement.js", [q["parts/Color.js"], q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c, q) {
        var y = c.deg2rad,
            B = c.doc,
            H = c.hasTouch,
            D = c.isFirefox,
            J = c.noop,
            t = c.svg,
            G = c.SVG_NS,
            L = c.win,
            v = q.animate,
            K = q.animObject,
            n = q.attr,
            r = q.createElement,
            C = q.css,
            I = q.defined,
            p = q.erase,
            m = q.extend,
            d = q.fireEvent,
            l = q.isArray,
            k = q.isFunction,
            f = q.isNumber,
            a = q.isString,
            A = q.merge,
            u = q.objectEach,
            E = q.pick,
            P = q.pInt,
            w = q.stop,
            M = q.uniqueKey;
        "";
        q = function () {
            function F() {
                this.height = this.element = void 0;
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = G;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ");
                this.width = void 0
            }
            F.prototype._defaultGetter = function (a) {
                a = E(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            };
            F.prototype._defaultSetter = function (a, e, b) {
                b.setAttribute(e,
                    a)
            };
            F.prototype.add = function (a) {
                var e = this.renderer,
                    b = this.element;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && e.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) var h = this.zIndexSetter();
                h || (a ? a.element : e.box).appendChild(b);
                if (this.onAdd) this.onAdd();
                return this
            };
            F.prototype.addClass = function (a, e) {
                var b = e ? "" : this.attr("class") || "";
                a = (a || "").split(/ /g).reduce(function (h, e) {
                        -1 === b.indexOf(e) && h.push(e);
                        return h
                    },
                    b ? [b] : []).join(" ");
                a !== b && this.attr("class", a);
                return this
            };
            F.prototype.afterSetters = function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            };
            F.prototype.align = function (f, e, b) {
                var h, z = {};
                var x = this.renderer;
                var d = x.alignedObjects;
                var k, l;
                if (f) {
                    if (this.alignOptions = f, this.alignByTranslate = e, !b || a(b)) this.alignTo = h = b || "renderer", p(d, this), d.push(this), b = void 0
                } else f = this.alignOptions, e = this.alignByTranslate, h = this.alignTo;
                b = E(b, x[h], x);
                h = f.align;
                x = f.verticalAlign;
                d = (b.x || 0) + (f.x ||
                    0);
                var u = (b.y || 0) + (f.y || 0);
                "right" === h ? k = 1 : "center" === h && (k = 2);
                k && (d += (b.width - (f.width || 0)) / k);
                z[e ? "translateX" : "x"] = Math.round(d);
                "bottom" === x ? l = 1 : "middle" === x && (l = 2);
                l && (u += (b.height - (f.height || 0)) / l);
                z[e ? "translateY" : "y"] = Math.round(u);
                this[this.placed ? "animate" : "attr"](z);
                this.placed = !0;
                this.alignAttr = z;
                return this
            };
            F.prototype.alignSetter = function (a) {
                var e = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                e[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", e[a]))
            };
            F.prototype.animate =
                function (a, e, b) {
                    var h = K(E(e, this.renderer.globalAnimation, !0));
                    E(B.hidden, B.msHidden, B.webkitHidden, !1) && (h.duration = 0);
                    0 !== h.duration ? (b && (h.complete = b), v(this, a, h)) : (this.attr(a, void 0, b), u(a, function (b, e) {
                        h.step && h.step.call(this, b, {
                            prop: e,
                            pos: 1
                        })
                    }, this));
                    return this
                };
            F.prototype.applyTextOutline = function (a) {
                var e = this.element,
                    b; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(e.style.fill)));
                a = a.split(" ");
                var h = a[a.length - 1];
                if ((b = a[0]) && "none" !== b && c.svg) {
                    this.fakeTS = !0;
                    a = [].slice.call(e.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    b = b.replace(/(^[\d\.]+)(.*?)$/g, function (b, h, e) {
                        return 2 * h + e
                    });
                    this.removeTextOutline(a);
                    var z = e.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(e.textContent) : !1;
                    var x = e.firstChild;
                    a.forEach(function (a, f) {
                        0 === f && (a.setAttribute("x", e.getAttribute("x")), f = e.getAttribute("y"), a.setAttribute("y", f || 0), null === f && e.setAttribute("y", 0));
                        f = a.cloneNode(!0);
                        n(z && !D ? a : f, {
                            "class": "highcharts-text-outline",
                            fill: h,
                            stroke: h,
                            "stroke-width": b,
                            "stroke-linejoin": "round"
                        });
                        e.insertBefore(f, x)
                    });
                    z && D && a[0] && (a = a[0].cloneNode(!0), a.textContent = " ", e.insertBefore(a, x))
                }
            };
            F.prototype.attr = function (a, e, b, h) {
                var z = this.element,
                    x, f = this,
                    d, k, l = this.symbolCustomAttribs;
                if ("string" === typeof a && "undefined" !== typeof e) {
                    var m = a;
                    a = {};
                    a[m] = e
                }
                "string" === typeof a ? f = (this[a + "Getter"] || this._defaultGetter).call(this, a, z) : (u(a, function (b, e) {
                    d = !1;
                    h || w(this, e);
                    this.symbolName && -1 !== l.indexOf(e) && (x || (this.symbolAttr(a), x = !0), d = !0);
                    !this.rotation || "x" !== e && "y" !== e || (this.doTransform = !0);
                    d || (k = this[e + "Setter"] || this._defaultSetter, k.call(this, b, e, z), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(e) && this.updateShadows(e, b, k))
                }, this), this.afterSetters());
                b && b.call(this);
                return f
            };
            F.prototype.clip = function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            };
            F.prototype.crisp = function (a, e) {
                e = e || a.strokeWidth || 0;
                var b = Math.round(e) % 2 / 2;
                a.x = Math.floor(a.x ||
                    this.x || 0) + b;
                a.y = Math.floor(a.y || this.y || 0) + b;
                a.width = Math.floor((a.width || this.width || 0) - 2 * b);
                a.height = Math.floor((a.height || this.height || 0) - 2 * b);
                I(a.strokeWidth) && (a.strokeWidth = e);
                return a
            };
            F.prototype.complexColor = function (a, e, b) {
                var h = this.renderer,
                    z, x, f, k, m, p, w, C, Q, r, E = [],
                    S;
                d(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    a.radialGradient ? x = "radialGradient" : a.linearGradient && (x = "linearGradient");
                    if (x) {
                        f = a[x];
                        m = h.gradients;
                        p = a.stops;
                        Q = b.radialReference;
                        l(f) && (a[x] = f = {
                            x1: f[0],
                            y1: f[1],
                            x2: f[2],
                            y2: f[3],
                            gradientUnits: "userSpaceOnUse"
                        });
                        "radialGradient" === x && Q && !I(f.gradientUnits) && (k = f, f = A(f, h.getRadialAttr(Q, k), {
                            gradientUnits: "userSpaceOnUse"
                        }));
                        u(f, function (b, h) {
                            "id" !== h && E.push(h, b)
                        });
                        u(p, function (b) {
                            E.push(b)
                        });
                        E = E.join(",");
                        if (m[E]) r = m[E].attr("id");
                        else {
                            f.id = r = M();
                            var d = m[E] = h.createElement(x).attr(f).add(h.defs);
                            d.radAttr = k;
                            d.stops = [];
                            p.forEach(function (b) {
                                0 === b[1].indexOf("rgba") ? (z = g.parse(b[1]), w = z.get("rgb"), C = z.get("a")) : (w = b[1], C = 1);
                                b = h.createElement("stop").attr({
                                    offset: b[0],
                                    "stop-color": w,
                                    "stop-opacity": C
                                }).add(d);
                                d.stops.push(b)
                            })
                        }
                        S = "url(" + h.url + "#" + r + ")";
                        b.setAttribute(e, S);
                        b.gradient = E;
                        a.toString = function () {
                            return S
                        }
                    }
                })
            };
            F.prototype.css = function (a) {
                var e = this.styles,
                    b = {},
                    h = this.element,
                    z = "",
                    x = !e,
                    f = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                e && u(a, function (h, a) {
                    e && e[a] !== h && (b[a] = h, x = !0)
                });
                if (x) {
                    e && (a = m(e, b));
                    if (a)
                        if (null === a.width || "auto" === a.width) delete this.textWidth;
                        else if ("text" === h.nodeName.toLowerCase() && a.width) var d = this.textWidth =
                        P(a.width);
                    this.styles = a;
                    d && !t && this.renderer.forExport && delete a.width;
                    if (h.namespaceURI === this.SVG_NS) {
                        var k = function (b, h) {
                            return "-" + h.toLowerCase()
                        };
                        u(a, function (b, h) {
                            -1 === f.indexOf(h) && (z += h.replace(/([A-Z])/g, k) + ":" + b + ";")
                        });
                        z && n(h, "style", z)
                    } else C(h, a);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            };
            F.prototype.dashstyleSetter = function (a) {
                var e = this["stroke-width"];
                "inherit" === e && (e = 1);
                if (a = a && a.toLowerCase()) {
                    var b =
                        a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (a = b.length; a--;) b[a] = "" + P(b[a]) * E(e, NaN);
                    a = b.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            };
            F.prototype.destroy = function () {
                var a = this,
                    e = a.element || {},
                    b = a.renderer,
                    h = b.isSVG && "SPAN" === e.nodeName && a.parentGroup || void 0,
                    z = e.ownerSVGElement;
                e.onclick = e.onmouseout = e.onmouseover = e.onmousemove = e.point = null;
                w(a);
                if (a.clipPath && z) {
                    var x = a.clipPath;
                    [].forEach.call(z.querySelectorAll("[clip-path],[CLIP-PATH]"), function (b) {
                        -1 < b.getAttribute("clip-path").indexOf(x.element.id) && b.removeAttribute("clip-path")
                    });
                    a.clipPath = x.destroy()
                }
                if (a.stops) {
                    for (z = 0; z < a.stops.length; z++) a.stops[z].destroy();
                    a.stops.length = 0;
                    a.stops = void 0
                }
                a.safeRemoveChild(e);
                for (b.styledMode || a.destroyShadows(); h && h.div && 0 === h.div.childNodes.length;) e = h.parentGroup, a.safeRemoveChild(h.div),
                    delete h.div, h = e;
                a.alignTo && p(b.alignedObjects, a);
                u(a, function (b, h) {
                    a[h] && a[h].parentGroup === a && a[h].destroy && a[h].destroy();
                    delete a[h]
                })
            };
            F.prototype.destroyShadows = function () {
                (this.shadows || []).forEach(function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            };
            F.prototype.destroyTextPath = function (a, e) {
                var b = a.getElementsByTagName("text")[0];
                if (b) {
                    if (b.removeAttribute("dx"), b.removeAttribute("dy"), e.element.setAttribute("id", ""), this.textPathWrapper && b.getElementsByTagName("textPath").length) {
                        for (a =
                            this.textPathWrapper.element.childNodes; a.length;) b.appendChild(a[0]);
                        b.removeChild(this.textPathWrapper.element)
                    }
                } else if (a.getAttribute("dx") || a.getAttribute("dy")) a.removeAttribute("dx"), a.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            };
            F.prototype.dSetter = function (a, e, b) {
                l(a) && ("string" === typeof a[0] && (a = this.renderer.pathToSegments(a)), this.pathArray = a, a = a.reduce(function (b, a, e) {
                    return a && a.join ? (e ? b + " " : "") + a.join(" ") : (a || "").toString()
                }, ""));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[e] !== a && (b.setAttribute(e, a), this[e] = a)
            };
            F.prototype.fadeOut = function (a) {
                var e = this;
                e.animate({
                    opacity: 0
                }, {
                    duration: E(a, 150),
                    complete: function () {
                        e.attr({
                            y: -9999
                        }).hide()
                    }
                })
            };
            F.prototype.fillSetter = function (a, e, b) {
                "string" === typeof a ? b.setAttribute(e, a) : a && this.complexColor(a, e, b)
            };
            F.prototype.getBBox = function (a, e) {
                var b, h = this.renderer,
                    z = this.element,
                    x = this.styles,
                    f = this.textStr,
                    d = h.cache,
                    l = h.cacheKeys,
                    u = z.namespaceURI === this.SVG_NS;
                e = E(e, this.rotation, 0);
                var A = h.styledMode ? z && F.prototype.getStyle.call(z, "font-size") : x && x.fontSize;
                if (I(f)) {
                    var p = f.toString(); - 1 === p.indexOf("<") && (p = p.replace(/[0-9]/g, "0"));
                    p += ["", e, A, this.textWidth, x && x.textOverflow, x && x.fontWeight].join()
                }
                p && !a && (b = d[p]);
                if (!b) {
                    if (u || h.forExport) {
                        try {
                            var w = this.fakeTS && function (b) {
                                [].forEach.call(z.querySelectorAll(".highcharts-text-outline"), function (h) {
                                    h.style.display = b
                                })
                            };
                            k(w) && w("none");
                            b = z.getBBox ? m({}, z.getBBox()) : {
                                width: z.offsetWidth,
                                height: z.offsetHeight
                            };
                            k(w) && w("")
                        } catch (X) {
                            ""
                        }
                        if (!b ||
                            0 > b.width) b = {
                            width: 0,
                            height: 0
                        }
                    } else b = this.htmlGetBBox();
                    h.isSVG && (a = b.width, h = b.height, u && (b.height = h = {
                        "11px,17": 14,
                        "13px,20": 16
                    } [x && x.fontSize + "," + Math.round(h)] || h), e && (x = e * y, b.width = Math.abs(h * Math.sin(x)) + Math.abs(a * Math.cos(x)), b.height = Math.abs(h * Math.cos(x)) + Math.abs(a * Math.sin(x))));
                    if (p && 0 < b.height) {
                        for (; 250 < l.length;) delete d[l.shift()];
                        d[p] || l.push(p);
                        d[p] = b
                    }
                }
                return b
            };
            F.prototype.getStyle = function (a) {
                return L.getComputedStyle(this.element || this, "").getPropertyValue(a)
            };
            F.prototype.hasClass =
                function (a) {
                    return -1 !== ("" + this.attr("class")).split(" ").indexOf(a)
                };
            F.prototype.hide = function (a) {
                a ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            };
            F.prototype.htmlGetBBox = function () {
                return {
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            };
            F.prototype.init = function (a, e) {
                this.element = "span" === e ? r(e) : B.createElementNS(this.SVG_NS, e);
                this.renderer = a;
                d(this, "afterInit")
            };
            F.prototype.invert = function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            };
            F.prototype.on = function (a, e) {
                var b, h, z = this.element,
                    x;
                H && "click" === a ? (z.ontouchstart = function (a) {
                    b = a.touches[0].clientX;
                    h = a.touches[0].clientY
                }, z.ontouchend = function (a) {
                    b && 4 <= Math.sqrt(Math.pow(b - a.changedTouches[0].clientX, 2) + Math.pow(h - a.changedTouches[0].clientY, 2)) || e.call(z, a);
                    x = !0;
                    a.preventDefault()
                }, z.onclick = function (b) {
                    x || e.call(z, b)
                }) : z["on" + a] = e;
                return this
            };
            F.prototype.opacitySetter = function (a, e, b) {
                this[e] = a;
                b.setAttribute(e, a)
            };
            F.prototype.removeClass = function (f) {
                return this.attr("class", ("" + this.attr("class")).replace(a(f) ? new RegExp("(^| )" +
                    f + "( |$)") : f, " ").replace(/ +/g, " ").trim())
            };
            F.prototype.removeTextOutline = function (a) {
                for (var e = a.length, b; e--;) b = a[e], "highcharts-text-outline" === b.getAttribute("class") && p(a, this.element.removeChild(b))
            };
            F.prototype.safeRemoveChild = function (a) {
                var e = a.parentNode;
                e && e.removeChild(a)
            };
            F.prototype.setRadialReference = function (a) {
                var e = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                e && e.radAttr && e.animate(this.renderer.getRadialAttr(a, e.radAttr));
                return this
            };
            F.prototype.setTextPath = function (a, e) {
                var b = this.element,
                    h = {
                        textAnchor: "text-anchor"
                    },
                    z = !1,
                    x = this.textPathWrapper,
                    d = !x;
                e = A(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, e);
                var k = e.attributes;
                if (a && e && e.enabled) {
                    x && null === x.element.parentNode ? (d = !0, x = x.destroy()) : x && this.removeTextOutline.call(x.parentGroup, [].slice.call(b.getElementsByTagName("tspan")));
                    this.options && this.options.padding && (k.dx = -this.options.padding);
                    x || (this.textPathWrapper = x = this.renderer.createElement("textPath"),
                        z = !0);
                    var l = x.element;
                    (e = a.element.getAttribute("id")) || a.element.setAttribute("id", e = M());
                    if (d)
                        for (a = b.getElementsByTagName("tspan"); a.length;) a[0].setAttribute("y", 0), f(k.dx) && a[0].setAttribute("x", -k.dx), l.appendChild(a[0]);
                    z && x && x.add({
                        element: this.text ? this.text.element : b
                    });
                    l.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + e);
                    I(k.dy) && (l.parentNode.setAttribute("dy", k.dy), delete k.dy);
                    I(k.dx) && (l.parentNode.setAttribute("dx", k.dx), delete k.dx);
                    u(k, function (b, a) {
                        l.setAttribute(h[a] ||
                            a, b)
                    });
                    b.removeAttribute("transform");
                    this.removeTextOutline.call(x, [].slice.call(b.getElementsByTagName("tspan")));
                    this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    });
                    this.applyTextOutline = this.updateTransform = J
                } else x && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(b, a), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            };
            F.prototype.shadow = function (a, e, b) {
                var h = [],
                    z = this.element,
                    x = !1,
                    f = this.oldShadowOptions;
                var d = {
                    color: "#000000",
                    offsetX: 1,
                    offsetY: 1,
                    opacity: .15,
                    width: 3
                };
                var k;
                !0 === a ? k = d : "object" === typeof a && (k = m(d, a));
                k && (k && f && u(k, function (b, h) {
                    b !== f[h] && (x = !0)
                }), x && this.destroyShadows(), this.oldShadowOptions = k);
                if (!k) this.destroyShadows();
                else if (!this.shadows) {
                    var l = k.opacity / k.width;
                    var A = this.parentInverted ? "translate(-1,-1)" : "translate(" + k.offsetX + ", " + k.offsetY + ")";
                    for (d = 1; d <= k.width; d++) {
                        var p = z.cloneNode(!1);
                        var w = 2 * k.width + 1 - 2 * d;
                        n(p, {
                            stroke: a.color ||
                                "#000000",
                            "stroke-opacity": l * d,
                            "stroke-width": w,
                            transform: A,
                            fill: "none"
                        });
                        p.setAttribute("class", (p.getAttribute("class") || "") + " highcharts-shadow");
                        b && (n(p, "height", Math.max(n(p, "height") - w, 0)), p.cutHeight = w);
                        e ? e.element.appendChild(p) : z.parentNode && z.parentNode.insertBefore(p, z);
                        h.push(p)
                    }
                    this.shadows = h
                }
                return this
            };
            F.prototype.show = function (a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            };
            F.prototype.strokeSetter = function (a, e, b) {
                this[e] = a;
                this.stroke && this["stroke-width"] ? (F.prototype.fillSetter.call(this,
                    this.stroke, "stroke", b), b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === e && 0 === a && this.hasStroke ? (b.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
            };
            F.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width"),
                    e = 0;
                if (a.indexOf("px") === a.length - 2) e = P(a);
                else if ("" !== a) {
                    var b =
                        B.createElementNS(G, "rect");
                    n(b, {
                        width: a,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(b);
                    e = b.getBBox().width;
                    b.parentNode.removeChild(b)
                }
                return e
            };
            F.prototype.symbolAttr = function (a) {
                var e = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (b) {
                    e[b] = E(a[b], e[b])
                });
                e.attr({
                    d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
                })
            };
            F.prototype.textSetter = function (a) {
                a !== this.textStr && (delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this))
            };
            F.prototype.titleSetter = function (a) {
                var e = this.element.getElementsByTagName("title")[0];
                e || (e = B.createElementNS(this.SVG_NS, "title"), this.element.appendChild(e));
                e.firstChild && e.removeChild(e.firstChild);
                e.appendChild(B.createTextNode(String(E(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            };
            F.prototype.toFront = function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            };
            F.prototype.translate = function (a, e) {
                return this.attr({
                    translateX: a,
                    translateY: e
                })
            };
            F.prototype.updateShadows =
                function (a, e, b) {
                    var h = this.shadows;
                    if (h)
                        for (var z = h.length; z--;) b.call(h[z], "height" === a ? Math.max(e - (h[z].cutHeight || 0), 0) : "d" === a ? this.d : e, a, h[z])
                };
            F.prototype.updateTransform = function () {
                var a = this.translateX || 0,
                    e = this.translateY || 0,
                    b = this.scaleX,
                    h = this.scaleY,
                    z = this.inverted,
                    x = this.rotation,
                    f = this.matrix,
                    d = this.element;
                z && (a += this.width, e += this.height);
                a = ["translate(" + a + "," + e + ")"];
                I(f) && a.push("matrix(" + f.join(",") + ")");
                z ? a.push("rotate(90) scale(-1,1)") : x && a.push("rotate(" + x + " " + E(this.rotationOriginX,
                    d.getAttribute("x"), 0) + " " + E(this.rotationOriginY, d.getAttribute("y") || 0) + ")");
                (I(b) || I(h)) && a.push("scale(" + E(b, 1) + " " + E(h, 1) + ")");
                a.length && d.setAttribute("transform", a.join(" "))
            };
            F.prototype.visibilitySetter = function (a, e, b) {
                "inherit" === a ? b.removeAttribute(e) : this[e] !== a && b.setAttribute(e, a);
                this[e] = a
            };
            F.prototype.xGetter = function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            };
            F.prototype.zIndexSetter = function (a, e) {
                var b = this.renderer,
                    h = this.parentGroup,
                    z = (h || b).element || b.box,
                    x = this.element,
                    f = !1;
                b = z === b.box;
                var d = this.added;
                var k;
                I(a) ? (x.setAttribute("data-z-index", a), a = +a, this[e] === a && (d = !1)) : I(this[e]) && x.removeAttribute("data-z-index");
                this[e] = a;
                if (d) {
                    (a = this.zIndex) && h && (h.handleZ = !0);
                    e = z.childNodes;
                    for (k = e.length - 1; 0 <= k && !f; k--) {
                        h = e[k];
                        d = h.getAttribute("data-z-index");
                        var l = !I(d);
                        if (h !== x)
                            if (0 > a && l && !b && !k) z.insertBefore(x, e[k]), f = !0;
                            else if (P(d) <= a || l && (!I(a) || 0 <= a)) z.insertBefore(x, e[k + 1] || null), f = !0
                    }
                    f || (z.insertBefore(x, e[b ? 3 : 0] || null),
                        f = !0)
                }
                return f
            };
            return F
        }();
        q.prototype["stroke-widthSetter"] = q.prototype.strokeSetter;
        q.prototype.yGetter = q.prototype.xGetter;
        q.prototype.matrixSetter = q.prototype.rotationOriginXSetter = q.prototype.rotationOriginYSetter = q.prototype.rotationSetter = q.prototype.scaleXSetter = q.prototype.scaleYSetter = q.prototype.translateXSetter = q.prototype.translateYSetter = q.prototype.verticalAlignSetter = function (a, f) {
            this[f] = a;
            this.doTransform = !0
        };
        c.SVGElement = q;
        return c.SVGElement
    });
    O(q, "parts/SVGLabel.js", [q["parts/SVGElement.js"],
        q["parts/Utilities.js"]
    ], function (g, c) {
        var q = this && this.__extends || function () {
                var c = function (g, L) {
                    c = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (c, g) {
                        c.__proto__ = g
                    } || function (c, g) {
                        for (var n in g) g.hasOwnProperty(n) && (c[n] = g[n])
                    };
                    return c(g, L)
                };
                return function (g, L) {
                    function v() {
                        this.constructor = g
                    }
                    c(g, L);
                    g.prototype = null === L ? Object.create(L) : (v.prototype = L.prototype, new v)
                }
            }(),
            y = c.defined,
            B = c.extend,
            H = c.isNumber,
            D = c.merge,
            J = c.removeEvent;
        return function (c) {
            function t(g, v, K, n, r, C,
                I, p, m, d) {
                var l = c.call(this) || this;
                l.init(g, "g");
                l.textStr = v;
                l.x = K;
                l.y = n;
                l.anchorX = C;
                l.anchorY = I;
                l.baseline = m;
                l.className = d;
                "button" !== d && l.addClass("highcharts-label");
                d && l.addClass("highcharts-" + d);
                l.text = g.text("", 0, 0, p).attr({
                    zIndex: 1
                });
                if ("string" === typeof r) {
                    var k = /^url\((.*?)\)$/.test(r);
                    if (l.renderer.symbols[r] || k) l.symbolKey = r
                }
                l.bBox = t.emptyBBox;
                l.padding = 3;
                l.paddingLeft = 0;
                l.baselineOffset = 0;
                l.needsBox = g.styledMode || k;
                l.deferredAttr = {};
                l.alignFactor = 0;
                return l
            }
            q(t, c);
            t.prototype.alignSetter =
                function (c) {
                    c = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [c];
                    c !== this.alignFactor && (this.alignFactor = c, this.bBox && H(this.xSetting) && this.attr({
                        x: this.xSetting
                    }))
                };
            t.prototype.anchorXSetter = function (c, g) {
                this.anchorX = c;
                this.boxAttr(g, Math.round(c) - this.getCrispAdjust() - this.xSetting)
            };
            t.prototype.anchorYSetter = function (c, g) {
                this.anchorY = c;
                this.boxAttr(g, c - this.ySetting)
            };
            t.prototype.boxAttr = function (c, g) {
                this.box ? this.box.attr(c, g) : this.deferredAttr[c] = g
            };
            t.prototype.css = function (c) {
                if (c) {
                    var v = {};
                    c = D(c);
                    t.textProps.forEach(function (n) {
                        "undefined" !==
                        typeof c[n] && (v[n] = c[n], delete c[n])
                    });
                    this.text.css(v);
                    var L = "fontSize" in v || "fontWeight" in v;
                    if ("width" in v || L) this.updateBoxSize(), L && this.updateTextPadding()
                }
                return g.prototype.css.call(this, c)
            };
            t.prototype.destroy = function () {
                J(this.element, "mouseenter");
                J(this.element, "mouseleave");
                this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy());
                g.prototype.destroy.call(this)
            };
            t.prototype.fillSetter = function (c, g) {
                c && (this.needsBox = !0);
                this.fill = c;
                this.boxAttr(g, c)
            };
            t.prototype.getBBox =
                function () {
                    var c = this.bBox,
                        g = this.padding;
                    return {
                        width: c.width + 2 * g,
                        height: c.height + 2 * g,
                        x: c.x - g,
                        y: c.y - g
                    }
                };
            t.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
            };
            t.prototype.heightSetter = function (c) {
                this.heightSetting = c
            };
            t.prototype.on = function (c, v) {
                var t = this,
                    n = t.text,
                    r = n && "SPAN" === n.element.tagName ? n : void 0;
                if (r) {
                    var C = function (C) {
                        ("mouseenter" === c || "mouseleave" === c) && C.relatedTarget instanceof
                        Element && (t.element.contains(C.relatedTarget) || r.element.contains(C.relatedTarget)) || v.call(t.element, C)
                    };
                    r.on(c, C)
                }
                g.prototype.on.call(t, c, C || v);
                return t
            };
            t.prototype.onAdd = function () {
                var c = this.textStr;
                this.text.add(this);
                this.attr({
                    text: y(c) ? c : "",
                    x: this.x,
                    y: this.y
                });
                this.box && y(this.anchorX) && this.attr({
                    anchorX: this.anchorX,
                    anchorY: this.anchorY
                })
            };
            t.prototype.paddingSetter = function (c) {
                y(c) && c !== this.padding && (this.padding = c, this.updateTextPadding())
            };
            t.prototype.paddingLeftSetter = function (c) {
                y(c) &&
                    c !== this.paddingLeft && (this.paddingLeft = c, this.updateTextPadding())
            };
            t.prototype.rSetter = function (c, g) {
                this.boxAttr(g, c)
            };
            t.prototype.shadow = function (c) {
                c && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(c));
                return this
            };
            t.prototype.strokeSetter = function (c, g) {
                this.stroke = c;
                this.boxAttr(g, c)
            };
            t.prototype["stroke-widthSetter"] = function (c, g) {
                c && (this.needsBox = !0);
                this["stroke-width"] = c;
                this.boxAttr(g, c)
            };
            t.prototype["text-alignSetter"] = function (c) {
                this.textAlign = c
            };
            t.prototype.textSetter =
                function (c) {
                    "undefined" !== typeof c && this.text.attr({
                        text: c
                    });
                    this.updateBoxSize();
                    this.updateTextPadding()
                };
            t.prototype.updateBoxSize = function () {
                var c = this.text.element.style,
                    g = {},
                    G = this.padding,
                    n = this.paddingLeft,
                    r = H(this.widthSetting) && H(this.heightSetting) && !this.textAlign || !y(this.text.textStr) ? t.emptyBBox : this.text.getBBox();
                this.width = (this.widthSetting || r.width || 0) + 2 * G + n;
                this.height = (this.heightSetting || r.height || 0) + 2 * G;
                this.baselineOffset = G + Math.min(this.renderer.fontMetrics(c && c.fontSize,
                    this.text).b, r.height || Infinity);
                this.needsBox && (this.box || (c = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), c.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), c.add(this), c = this.getCrispAdjust(), g.x = c, g.y = (this.baseline ? -this.baselineOffset : 0) + c), g.width = Math.round(this.width), g.height = Math.round(this.height), this.box.attr(B(g, this.deferredAttr)), this.deferredAttr = {});
                this.bBox = r
            };
            t.prototype.updateTextPadding =
                function () {
                    var c = this.text,
                        g = this.baseline ? 0 : this.baselineOffset,
                        t = this.paddingLeft + this.padding;
                    y(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (t += {
                        center: .5,
                        right: 1
                    } [this.textAlign] * (this.widthSetting - this.bBox.width));
                    if (t !== c.x || g !== c.y) c.attr("x", t), c.hasBoxWidthChanged && (this.bBox = c.getBBox(!0), this.updateBoxSize()), "undefined" !== typeof g && c.attr("y", g);
                    c.x = t;
                    c.y = g
                };
            t.prototype.widthSetter = function (c) {
                this.widthSetting = H(c) ? c : void 0
            };
            t.prototype.xSetter =
                function (c) {
                    this.x = c;
                    this.alignFactor && (c -= this.alignFactor * ((this.widthSetting || this.bBox.width) + 2 * this.padding), this["forceAnimate:x"] = !0);
                    this.xSetting = Math.round(c);
                    this.attr("translateX", this.xSetting)
                };
            t.prototype.ySetter = function (c) {
                this.ySetting = this.y = Math.round(c);
                this.attr("translateY", this.ySetting)
            };
            t.emptyBBox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            t.textProps = "color cursor direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return t
        }(g)
    });
    O(q, "parts/SVGRenderer.js", [q["parts/Color.js"], q["parts/Globals.js"], q["parts/SVGElement.js"], q["parts/SVGLabel.js"], q["parts/Utilities.js"]], function (g, c, q, y, B) {
        var H = B.addEvent,
            D = B.attr,
            J = B.createElement,
            t = B.css,
            G = B.defined,
            L = B.destroyObjectProperties,
            v = B.extend,
            K = B.isArray,
            n = B.isNumber,
            r = B.isObject,
            C = B.isString,
            I = B.merge,
            p = B.objectEach,
            m = B.pick,
            d = B.pInt,
            l = B.splat,
            k = B.uniqueKey,
            f = c.charts,
            a = c.deg2rad,
            A = c.doc,
            u = c.isFirefox,
            E = c.isMS,
            P = c.isWebKit;
        B = c.noop;
        var w = c.svg,
            M = c.SVG_NS,
            F = c.symbolSizes,
            Q = c.win,
            e = function () {
                function b(b, a, e, f, d, k, l) {
                    this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                    this.init(b, a, e, f, d, k, l)
                }
                b.prototype.init = function (b, a, e, f, d, k, l) {
                    var h = this.createElement("svg").attr({
                        version: "1.1",
                        "class": "highcharts-root"
                    });
                    l || h.css(this.getStyle(f));
                    f = h.element;
                    b.appendChild(f);
                    D(b, "dir", "ltr"); - 1 === b.innerHTML.indexOf("xmlns") &&
                        D(f, "xmlns", this.SVG_NS);
                    this.isSVG = !0;
                    this.box = f;
                    this.boxWrapper = h;
                    this.alignedObjects = [];
                    this.url = (u || P) && A.getElementsByTagName("base").length ? Q.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                    this.createElement("desc").add().element.appendChild(A.createTextNode("Created with Highcharts 8.1.2"));
                    this.defs = this.createElement("defs").add();
                    this.allowHTML = k;
                    this.forExport = d;
                    this.styledMode = l;
                    this.gradients = {};
                    this.cache = {};
                    this.cacheKeys = [];
                    this.imgCount =
                        0;
                    this.setSize(a, e, !1);
                    var x;
                    u && b.getBoundingClientRect && (a = function () {
                        t(b, {
                            left: 0,
                            top: 0
                        });
                        x = b.getBoundingClientRect();
                        t(b, {
                            left: Math.ceil(x.left) - x.left + "px",
                            top: Math.ceil(x.top) - x.top + "px"
                        })
                    }, a(), this.unSubPixelFix = H(Q, "resize", a))
                };
                b.prototype.definition = function (b) {
                    function h(b, e) {
                        var f;
                        l(b).forEach(function (b) {
                            var x = a.createElement(b.tagName),
                                z = {};
                            p(b, function (b, h) {
                                "tagName" !== h && "children" !== h && "textContent" !== h && (z[h] = b)
                            });
                            x.attr(z);
                            x.add(e || a.defs);
                            b.textContent && x.element.appendChild(A.createTextNode(b.textContent));
                            h(b.children || [], x);
                            f = x
                        });
                        return f
                    }
                    var a = this;
                    return h(b)
                };
                b.prototype.getStyle = function (b) {
                    return this.style = v({
                        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                        fontSize: "12px"
                    }, b)
                };
                b.prototype.setStyle = function (b) {
                    this.boxWrapper.css(this.getStyle(b))
                };
                b.prototype.isHidden = function () {
                    return !this.boxWrapper.getBBox().width
                };
                b.prototype.destroy = function () {
                    var b = this.defs;
                    this.box = null;
                    this.boxWrapper = this.boxWrapper.destroy();
                    L(this.gradients || {});
                    this.gradients = null;
                    b && (this.defs = b.destroy());
                    this.unSubPixelFix && this.unSubPixelFix();
                    return this.alignedObjects = null
                };
                b.prototype.createElement = function (b) {
                    var h = new this.Element;
                    h.init(this, b);
                    return h
                };
                b.prototype.getRadialAttr = function (b, a) {
                    return {
                        cx: b[0] - b[2] / 2 + a.cx * b[2],
                        cy: b[1] - b[2] / 2 + a.cy * b[2],
                        r: a.r * b[2]
                    }
                };
                b.prototype.truncate = function (b, a, e, f, d, k, l) {
                    var h = this,
                        x = b.rotation,
                        z, u = f ? 1 : 0,
                        N = (e || f).length,
                        m = N,
                        p = [],
                        w = function (b) {
                            a.firstChild && a.removeChild(a.firstChild);
                            b && a.appendChild(A.createTextNode(b))
                        },
                        c = function (x,
                            z) {
                            z = z || x;
                            if ("undefined" === typeof p[z])
                                if (a.getSubStringLength) try {
                                    p[z] = d + a.getSubStringLength(0, f ? z + 1 : z)
                                } catch (ha) {
                                    ""
                                } else h.getSpanWidth && (w(l(e || f, x)), p[z] = d + h.getSpanWidth(b, a));
                            return p[z]
                        },
                        C;
                    b.rotation = 0;
                    var r = c(a.textContent.length);
                    if (C = d + r > k) {
                        for (; u <= N;) m = Math.ceil((u + N) / 2), f && (z = l(f, m)), r = c(m, z && z.length - 1), u === N ? u = N + 1 : r > k ? N = m - 1 : u = m;
                        0 === N ? w("") : e && N === e.length - 1 || w(z || l(e || f, m))
                    }
                    f && f.splice(0, m);
                    b.actualWidth = r;
                    b.rotation = x;
                    return C
                };
                b.prototype.buildText = function (b) {
                    var h = b.element,
                        a = this,
                        e = a.forExport,
                        f = m(b.textStr, "").toString(),
                        k = -1 !== f.indexOf("<"),
                        l = h.childNodes,
                        u, c = D(h, "x"),
                        r = b.styles,
                        E = b.textWidth,
                        n = r && r.lineHeight,
                        S = r && r.textOutline,
                        g = r && "ellipsis" === r.textOverflow,
                        I = r && "nowrap" === r.whiteSpace,
                        F = r && r.fontSize,
                        P, v = l.length;
                    r = E && !b.added && this.box;
                    var G = function (b) {
                            var e;
                            a.styledMode || (e = /(px|em)$/.test(b && b.style.fontSize) ? b.style.fontSize : F || a.style.fontSize || 12);
                            return n ? d(n) : a.fontMetrics(e, b.getAttribute("style") ? b : h).h
                        },
                        Q = function (b, h) {
                            p(a.escapes, function (a, e) {
                                h && -1 !==
                                    h.indexOf(a) || (b = b.toString().replace(new RegExp(a, "g"), e))
                            });
                            return b
                        },
                        q = function (b, h) {
                            var a = b.indexOf("<");
                            b = b.substring(a, b.indexOf(">") - a);
                            a = b.indexOf(h + "=");
                            if (-1 !== a && (a = a + h.length + 1, h = b.charAt(a), '"' === h || "'" === h)) return b = b.substring(a + 1), b.substring(0, b.indexOf(h))
                        },
                        K = /<br.*?>/g;
                    var J = [f, g, I, n, S, F, E].join();
                    if (J !== b.textCache) {
                        for (b.textCache = J; v--;) h.removeChild(l[v]);
                        k || S || g || E || -1 !== f.indexOf(" ") && (!I || K.test(f)) ? (r && r.appendChild(h), k ? (f = a.styledMode ? f.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g,
                            '<span class="highcharts-emphasized">') : f.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), f = f.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(K)) : f = [f], f = f.filter(function (b) {
                            return "" !== b
                        }), f.forEach(function (f, x) {
                            var z = 0,
                                d = 0;
                            f = f.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                            var k = f.split("|||");
                            k.forEach(function (f) {
                                if ("" !== f || 1 === k.length) {
                                    var l = {},
                                        N = A.createElementNS(a.SVG_NS,
                                            "tspan"),
                                        m, p;
                                    (m = q(f, "class")) && D(N, "class", m);
                                    if (m = q(f, "style")) m = m.replace(/(;| |^)color([ :])/, "$1fill$2"), D(N, "style", m);
                                    if ((p = q(f, "href")) && !e && -1 === p.split(":")[0].toLowerCase().indexOf("javascript")) {
                                        var C = A.createElementNS(a.SVG_NS, "a");
                                        D(C, "href", p);
                                        D(N, "class", "highcharts-anchor");
                                        C.appendChild(N);
                                        a.styledMode || t(N, {
                                            cursor: "pointer"
                                        })
                                    }
                                    f = Q(f.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== f) {
                                        N.appendChild(A.createTextNode(f));
                                        z ? l.dx = 0 : x && null !== c && (l.x = c);
                                        D(N, l);
                                        h.appendChild(C || N);
                                        !z &&
                                            P && (!w && e && t(N, {
                                                display: "block"
                                            }), D(N, "dy", G(N)));
                                        if (E) {
                                            var r = f.replace(/([^\^])-/g, "$1- ").split(" ");
                                            l = !I && (1 < k.length || x || 1 < r.length);
                                            C = 0;
                                            p = G(N);
                                            if (g) u = a.truncate(b, N, f, void 0, 0, Math.max(0, E - parseInt(F || 12, 10)), function (b, h) {
                                                return b.substring(0, h) + "\u2026"
                                            });
                                            else if (l)
                                                for (; r.length;) r.length && !I && 0 < C && (N = A.createElementNS(M, "tspan"), D(N, {
                                                    dy: p,
                                                    x: c
                                                }), m && D(N, "style", m), N.appendChild(A.createTextNode(r.join(" ").replace(/- /g, "-"))), h.appendChild(N)), a.truncate(b, N, null, r, 0 === C ? d : 0, E, function (b, h) {
                                                    return r.slice(0,
                                                        h).join(" ").replace(/- /g, "-")
                                                }), d = b.actualWidth, C++
                                        }
                                        z++
                                    }
                                }
                            });
                            P = P || h.childNodes.length
                        }), g && u && b.attr("title", Q(b.textStr || "", ["&lt;", "&gt;"])), r && r.removeChild(h), C(S) && b.applyTextOutline && b.applyTextOutline(S)) : h.appendChild(A.createTextNode(Q(f)))
                    }
                };
                b.prototype.getContrast = function (b) {
                    b = g.parse(b).rgba;
                    b[0] *= 1;
                    b[1] *= 1.2;
                    b[2] *= .5;
                    return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF"
                };
                b.prototype.button = function (b, a, e, f, d, k, l, u, m, p) {
                    var h = this.label(b, a, e, m, void 0, void 0, p, void 0, "button"),
                        x = 0,
                        z = this.styledMode;
                    b = d && d.style || {};
                    d && d.style && delete d.style;
                    h.attr(I({
                        padding: 8,
                        r: 2
                    }, d));
                    if (!z) {
                        d = I({
                            fill: "#f7f7f7",
                            stroke: "#cccccc",
                            "stroke-width": 1,
                            style: {
                                color: "#333333",
                                cursor: "pointer",
                                fontWeight: "normal"
                            }
                        }, {
                            style: b
                        }, d);
                        var N = d.style;
                        delete d.style;
                        k = I(d, {
                            fill: "#e6e6e6"
                        }, k);
                        var A = k.style;
                        delete k.style;
                        l = I(d, {
                            fill: "#e6ebf5",
                            style: {
                                color: "#000000",
                                fontWeight: "bold"
                            }
                        }, l);
                        var w = l.style;
                        delete l.style;
                        u = I(d, {
                            style: {
                                color: "#cccccc"
                            }
                        }, u);
                        var c = u.style;
                        delete u.style
                    }
                    H(h.element, E ? "mouseover" : "mouseenter", function () {
                        3 !==
                            x && h.setState(1)
                    });
                    H(h.element, E ? "mouseout" : "mouseleave", function () {
                        3 !== x && h.setState(x)
                    });
                    h.setState = function (b) {
                        1 !== b && (h.state = x = b);
                        h.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]);
                        z || h.attr([d, k, l, u][b || 0]).css([N, A, w, c][b || 0])
                    };
                    z || h.attr(d).css(v({
                        cursor: "default"
                    }, N));
                    return h.on("click", function (b) {
                        3 !== x && f.call(h, b)
                    })
                };
                b.prototype.crispLine = function (b, a, e) {
                    void 0 === e && (e = "round");
                    var h = b[0],
                        f = b[1];
                    h[1] === f[1] && (h[1] = f[1] = Math[e](h[1]) - a % 2 / 2);
                    h[2] === f[2] && (h[2] = f[2] = Math[e](h[2]) + a % 2 / 2);
                    return b
                };
                b.prototype.path = function (b) {
                    var h = this.styledMode ? {} : {
                        fill: "none"
                    };
                    K(b) ? h.d = b : r(b) && v(h, b);
                    return this.createElement("path").attr(h)
                };
                b.prototype.circle = function (b, a, e) {
                    b = r(b) ? b : "undefined" === typeof b ? {} : {
                        x: b,
                        y: a,
                        r: e
                    };
                    a = this.createElement("circle");
                    a.xSetter = a.ySetter = function (b, h, a) {
                        a.setAttribute("c" + h, b)
                    };
                    return a.attr(b)
                };
                b.prototype.arc = function (b, a, e, f, d, k) {
                    r(b) ? (f = b, a = f.y, e = f.r, b = f.x) : f = {
                        innerR: f,
                        start: d,
                        end: k
                    };
                    b = this.symbol("arc", b, a, e, e, f);
                    b.r = e;
                    return b
                };
                b.prototype.rect = function (b, a, e, f, d, k) {
                    d = r(b) ? b.r : d;
                    var h = this.createElement("rect");
                    b = r(b) ? b : "undefined" === typeof b ? {} : {
                        x: b,
                        y: a,
                        width: Math.max(e, 0),
                        height: Math.max(f, 0)
                    };
                    this.styledMode || ("undefined" !== typeof k && (b.strokeWidth = k, b = h.crisp(b)), b.fill = "none");
                    d && (b.r = d);
                    h.rSetter = function (b, a, e) {
                        h.r = b;
                        D(e, {
                            rx: b,
                            ry: b
                        })
                    };
                    h.rGetter = function () {
                        return h.r
                    };
                    return h.attr(b)
                };
                b.prototype.setSize = function (b, a, e) {
                    var h = this.alignedObjects,
                        f = h.length;
                    this.width = b;
                    this.height = a;
                    for (this.boxWrapper.animate({
                            width: b,
                            height: a
                        }, {
                            step: function () {
                                this.attr({
                                    viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                                })
                            },
                            duration: m(e, !0) ? void 0 : 0
                        }); f--;) h[f].align()
                };
                b.prototype.g = function (b) {
                    var h = this.createElement("g");
                    return b ? h.attr({
                        "class": "highcharts-" + b
                    }) : h
                };
                b.prototype.image = function (b, a, e, f, d, k) {
                    var h = {
                            preserveAspectRatio: "none"
                        },
                        x = function (b, h) {
                            b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", h) : b.setAttribute("hc-svg-href",
                                h)
                        },
                        z = function (h) {
                            x(l.element, b);
                            k.call(l, h)
                        };
                    1 < arguments.length && v(h, {
                        x: a,
                        y: e,
                        width: f,
                        height: d
                    });
                    var l = this.createElement("image").attr(h);
                    k ? (x(l.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), h = new Q.Image, H(h, "load", z), h.src = b, h.complete && z({})) : x(l.element, b);
                    return l
                };
                b.prototype.symbol = function (b, a, e, d, k, l) {
                    var h = this,
                        x = /^url\((.*?)\)$/,
                        z = x.test(b),
                        u = !z && (this.symbols[b] ? b : "circle"),
                        N = u && this.symbols[u],
                        p;
                    if (N) {
                        "number" === typeof a && (p = N.call(this.symbols,
                            Math.round(a || 0), Math.round(e || 0), d || 0, k || 0, l));
                        var w = this.path(p);
                        h.styledMode || w.attr("fill", "none");
                        v(w, {
                            symbolName: u,
                            x: a,
                            y: e,
                            width: d,
                            height: k
                        });
                        l && v(w, l)
                    } else if (z) {
                        var c = b.match(x)[1];
                        w = this.image(c);
                        w.imgwidth = m(F[c] && F[c].width, l && l.width);
                        w.imgheight = m(F[c] && F[c].height, l && l.height);
                        var C = function () {
                            w.attr({
                                width: w.width,
                                height: w.height
                            })
                        };
                        ["width", "height"].forEach(function (b) {
                            w[b + "Setter"] = function (b, h) {
                                var a = {},
                                    e = this["img" + h],
                                    f = "width" === h ? "translateX" : "translateY";
                                this[h] = b;
                                G(e) && (l &&
                                    "within" === l.backgroundSize && this.width && this.height && (e = Math.round(e * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(h, e), this.alignByTranslate || (a[f] = ((this[h] || 0) - e) / 2, this.attr(a)))
                            }
                        });
                        G(a) && w.attr({
                            x: a,
                            y: e
                        });
                        w.isImg = !0;
                        G(w.imgwidth) && G(w.imgheight) ? C() : (w.attr({
                            width: 0,
                            height: 0
                        }), J("img", {
                            onload: function () {
                                var b = f[h.chartIndex];
                                0 === this.width && (t(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), A.body.appendChild(this));
                                F[c] = {
                                    width: this.width,
                                    height: this.height
                                };
                                w.imgwidth = this.width;
                                w.imgheight = this.height;
                                w.element && C();
                                this.parentNode && this.parentNode.removeChild(this);
                                h.imgCount--;
                                if (!h.imgCount && b && !b.hasLoaded) b.onload()
                            },
                            src: c
                        }), this.imgCount++)
                    }
                    return w
                };
                b.prototype.clipRect = function (b, a, e, f) {
                    var h = k() + "-",
                        x = this.createElement("clipPath").attr({
                            id: h
                        }).add(this.defs);
                    b = this.rect(b, a, e, f, 0).add(x);
                    b.id = h;
                    b.clipPath = x;
                    b.count = 0;
                    return b
                };
                b.prototype.text = function (b, a, e, f) {
                    var h = {};
                    if (f && (this.allowHTML || !this.forExport)) return this.html(b, a, e);
                    h.x = Math.round(a ||
                        0);
                    e && (h.y = Math.round(e));
                    G(b) && (h.text = b);
                    b = this.createElement("text").attr(h);
                    f || (b.xSetter = function (b, h, a) {
                        var e = a.getElementsByTagName("tspan"),
                            f = a.getAttribute(h),
                            x;
                        for (x = 0; x < e.length; x++) {
                            var d = e[x];
                            d.getAttribute(h) === f && d.setAttribute(h, b)
                        }
                        a.setAttribute(h, b)
                    });
                    return b
                };
                b.prototype.fontMetrics = function (b, a) {
                    b = !this.styledMode && /px/.test(b) || !Q.getComputedStyle ? b || a && a.style && a.style.fontSize || this.style && this.style.fontSize : a && q.prototype.getStyle.call(a, "font-size");
                    b = /px/.test(b) ? d(b) :
                        12;
                    a = 24 > b ? b + 3 : Math.round(1.2 * b);
                    return {
                        h: a,
                        b: Math.round(.8 * a),
                        f: b
                    }
                };
                b.prototype.rotCorr = function (b, e, f) {
                    var h = b;
                    e && f && (h = Math.max(h * Math.cos(e * a), 4));
                    return {
                        x: -b / 3 * Math.sin(e * a),
                        y: h
                    }
                };
                b.prototype.pathToSegments = function (b) {
                    for (var h = [], a = [], e = {
                            A: 8,
                            C: 7,
                            H: 2,
                            L: 3,
                            M: 3,
                            Q: 5,
                            S: 5,
                            T: 3,
                            V: 2
                        }, f = 0; f < b.length; f++) C(a[0]) && n(b[f]) && a.length === e[a[0].toUpperCase()] && b.splice(f, 0, a[0].replace("M", "L").replace("m", "l")), "string" === typeof b[f] && (a.length && h.push(a.slice(0)), a.length = 0), a.push(b[f]);
                    h.push(a.slice(0));
                    return h
                };
                b.prototype.label = function (b, a, e, f, d, k, l, u, m) {
                    return new y(this, b, a, e, f, d, k, l, u, m)
                };
                return b
            }();
        e.prototype.Element = q;
        e.prototype.SVG_NS = M;
        e.prototype.draw = B;
        e.prototype.escapes = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        };
        e.prototype.symbols = {
            circle: function (b, h, a, e) {
                return this.arc(b + a / 2, h + e / 2, a / 2, e / 2, {
                    start: .5 * Math.PI,
                    end: 2.5 * Math.PI,
                    open: !1
                })
            },
            square: function (b, h, a, e) {
                return [
                    ["M", b, h],
                    ["L", b + a, h],
                    ["L", b + a, h + e],
                    ["L", b, h + e],
                    ["Z"]
                ]
            },
            triangle: function (b, h, a, e) {
                return [
                    ["M",
                        b + a / 2, h
                    ],
                    ["L", b + a, h + e],
                    ["L", b, h + e],
                    ["Z"]
                ]
            },
            "triangle-down": function (b, h, a, e) {
                return [
                    ["M", b, h],
                    ["L", b + a, h],
                    ["L", b + a / 2, h + e],
                    ["Z"]
                ]
            },
            diamond: function (b, h, a, e) {
                return [
                    ["M", b + a / 2, h],
                    ["L", b + a, h + e / 2],
                    ["L", b + a / 2, h + e],
                    ["L", b, h + e / 2],
                    ["Z"]
                ]
            },
            arc: function (b, h, a, e, f) {
                var d = [];
                if (f) {
                    var x = f.start || 0,
                        k = f.end || 0,
                        z = f.r || a;
                    a = f.r || e || a;
                    var l = .001 > Math.abs(k - x - 2 * Math.PI);
                    k -= .001;
                    e = f.innerR;
                    l = m(f.open, l);
                    var u = Math.cos(x),
                        p = Math.sin(x),
                        N = Math.cos(k),
                        A = Math.sin(k);
                    x = m(f.longArc, .001 > k - x - Math.PI ? 0 : 1);
                    d.push(["M", b + z * u,
                        h + a * p
                    ], ["A", z, a, 0, x, m(f.clockwise, 1), b + z * N, h + a * A]);
                    G(e) && d.push(l ? ["M", b + e * N, h + e * A] : ["L", b + e * N, h + e * A], ["A", e, e, 0, x, G(f.clockwise) ? 1 - f.clockwise : 0, b + e * u, h + e * p]);
                    l || d.push(["Z"])
                }
                return d
            },
            callout: function (b, h, a, e, f) {
                var d = Math.min(f && f.r || 0, a, e),
                    k = d + 6,
                    x = f && f.anchorX || 0;
                f = f && f.anchorY || 0;
                var z = [
                    ["M", b + d, h],
                    ["L", b + a - d, h],
                    ["C", b + a, h, b + a, h, b + a, h + d],
                    ["L", b + a, h + e - d],
                    ["C", b + a, h + e, b + a, h + e, b + a - d, h + e],
                    ["L", b + d, h + e],
                    ["C", b, h + e, b, h + e, b, h + e - d],
                    ["L", b, h + d],
                    ["C", b, h, b, h, b + d, h]
                ];
                x && x > a ? f > h + k && f < h + e - k ? z.splice(3, 1,
                    ["L", b + a, f - 6], ["L", b + a + 6, f], ["L", b + a, f + 6], ["L", b + a, h + e - d]) : z.splice(3, 1, ["L", b + a, e / 2], ["L", x, f], ["L", b + a, e / 2], ["L", b + a, h + e - d]) : x && 0 > x ? f > h + k && f < h + e - k ? z.splice(7, 1, ["L", b, f + 6], ["L", b - 6, f], ["L", b, f - 6], ["L", b, h + d]) : z.splice(7, 1, ["L", b, e / 2], ["L", x, f], ["L", b, e / 2], ["L", b, h + d]) : f && f > e && x > b + k && x < b + a - k ? z.splice(5, 1, ["L", x + 6, h + e], ["L", x, h + e + 6], ["L", x - 6, h + e], ["L", b + d, h + e]) : f && 0 > f && x > b + k && x < b + a - k && z.splice(1, 1, ["L", x - 6, h], ["L", x, h - 6], ["L", x + 6, h], ["L", a - d, h]);
                return z
            }
        };
        c.SVGRenderer = e;
        c.Renderer = c.SVGRenderer;
        return c.Renderer
    });
    O(q, "parts/Html.js", [q["parts/Globals.js"], q["parts/SVGElement.js"], q["parts/SVGRenderer.js"], q["parts/Utilities.js"]], function (g, c, q, y) {
        var B = y.attr,
            H = y.createElement,
            D = y.css,
            J = y.defined,
            t = y.extend,
            G = y.pick,
            L = y.pInt,
            v = g.isFirefox,
            K = g.isMS,
            n = g.isWebKit,
            r = g.win;
        t(c.prototype, {
            htmlCss: function (c) {
                var r = "SPAN" === this.element.tagName && c && "width" in c,
                    p = G(r && c.width, void 0);
                if (r) {
                    delete c.width;
                    this.textWidth = p;
                    var m = !0
                }
                c && "ellipsis" === c.textOverflow && (c.whiteSpace = "nowrap", c.overflow =
                    "hidden");
                this.styles = t(this.styles, c);
                D(this.element, c);
                m && this.htmlUpdateTransform();
                return this
            },
            htmlGetBBox: function () {
                var c = this.element;
                return {
                    x: c.offsetLeft,
                    y: c.offsetTop,
                    width: c.offsetWidth,
                    height: c.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var c = this.renderer,
                        r = this.element,
                        p = this.translateX || 0,
                        m = this.translateY || 0,
                        d = this.x || 0,
                        l = this.y || 0,
                        k = this.textAlign || "left",
                        f = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [k],
                        a = this.styles,
                        A = a && a.whiteSpace;
                    D(r, {
                        marginLeft: p,
                        marginTop: m
                    });
                    !c.styledMode &&
                        this.shadows && this.shadows.forEach(function (a) {
                            D(a, {
                                marginLeft: p + 1,
                                marginTop: m + 1
                            })
                        });
                    this.inverted && [].forEach.call(r.childNodes, function (a) {
                        c.invertChild(a, r)
                    });
                    if ("SPAN" === r.tagName) {
                        a = this.rotation;
                        var u = this.textWidth && L(this.textWidth),
                            E = [a, k, r.innerHTML, this.textWidth, this.textAlign].join(),
                            n;
                        (n = u !== this.oldTextWidth) && !(n = u > this.oldTextWidth) && ((n = this.textPxLength) || (D(r, {
                            width: "",
                            whiteSpace: A || "nowrap"
                        }), n = r.offsetWidth), n = n > u);
                        n && (/[ \-]/.test(r.textContent || r.innerText) || "ellipsis" === r.style.textOverflow) ?
                            (D(r, {
                                width: u + "px",
                                display: "block",
                                whiteSpace: A || "normal"
                            }), this.oldTextWidth = u, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        E !== this.cTT && (A = c.fontMetrics(r.style.fontSize, r).b, !J(a) || a === (this.oldRotation || 0) && k === this.oldAlign || this.setSpanRotation(a, f, A), this.getSpanCorrection(!J(a) && this.textPxLength || r.offsetWidth, A, f, a, k));
                        D(r, {
                            left: d + (this.xCorr || 0) + "px",
                            top: l + (this.yCorr || 0) + "px"
                        });
                        this.cTT = E;
                        this.oldRotation = a;
                        this.oldAlign = k
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (c,
                r, p) {
                var m = {},
                    d = this.renderer.getTransformKey();
                m[d] = m.transform = "rotate(" + c + "deg)";
                m[d + (v ? "Origin" : "-origin")] = m.transformOrigin = 100 * r + "% " + p + "px";
                D(this.element, m)
            },
            getSpanCorrection: function (c, r, p) {
                this.xCorr = -c * p;
                this.yCorr = -r
            }
        });
        t(q.prototype, {
            getTransformKey: function () {
                return K && !/Edge/.test(r.navigator.userAgent) ? "-ms-transform" : n ? "-webkit-transform" : v ? "MozTransform" : r.opera ? "-o-transform" : ""
            },
            html: function (r, n, p) {
                var m = this.createElement("span"),
                    d = m.element,
                    l = m.renderer,
                    k = l.isSVG,
                    f = function (a,
                        f) {
                        ["opacity", "visibility"].forEach(function (d) {
                            a[d + "Setter"] = function (k, l, u) {
                                var m = a.div ? a.div.style : f;
                                c.prototype[d + "Setter"].call(this, k, l, u);
                                m && (m[l] = k)
                            }
                        });
                        a.addedSetters = !0
                    };
                m.textSetter = function (a) {
                    a !== d.innerHTML && (delete this.bBox, delete this.oldTextWidth);
                    this.textStr = a;
                    d.innerHTML = G(a, "");
                    m.doTransform = !0
                };
                k && f(m, m.element.style);
                m.xSetter = m.ySetter = m.alignSetter = m.rotationSetter = function (a, f) {
                    "align" === f && (f = "textAlign");
                    m[f] = a;
                    m.doTransform = !0
                };
                m.afterSetters = function () {
                    this.doTransform &&
                        (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                m.attr({
                    text: r,
                    x: Math.round(n),
                    y: Math.round(p)
                }).css({
                    position: "absolute"
                });
                l.styledMode || m.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                d.style.whiteSpace = "nowrap";
                m.css = m.htmlCss;
                k && (m.add = function (a) {
                    var k = l.box.parentNode,
                        u = [];
                    if (this.parentGroup = a) {
                        var p = a.div;
                        if (!p) {
                            for (; a;) u.push(a), a = a.parentGroup;
                            u.reverse().forEach(function (a) {
                                function d(f, e) {
                                    a[e] = f;
                                    "translateX" === e ? A.left = f + "px" : A.top = f + "px";
                                    a.doTransform = !0
                                }
                                var l =
                                    B(a.element, "class");
                                p = a.div = a.div || H("div", l ? {
                                    className: l
                                } : void 0, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, p || k);
                                var A = p.style;
                                t(a, {
                                    classSetter: function (a) {
                                        return function (e) {
                                            this.element.setAttribute("class", e);
                                            a.className = e
                                        }
                                    }(p),
                                    on: function () {
                                        u[0].div && m.on.apply({
                                            element: u[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: d,
                                    translateYSetter: d
                                });
                                a.addedSetters || f(a)
                            })
                        }
                    } else p = k;
                    p.appendChild(d);
                    m.added = !0;
                    m.alignOnAdd && m.htmlUpdateTransform();
                    return m
                });
                return m
            }
        })
    });
    O(q, "parts/Tick.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = c.clamp,
            y = c.correctFloat,
            B = c.defined,
            H = c.destroyObjectProperties,
            D = c.extend,
            J = c.fireEvent,
            t = c.isNumber,
            G = c.merge,
            L = c.objectEach,
            v = c.pick,
            K = g.deg2rad;
        c = function () {
            function c(c, C, n, p, m) {
                this.isNewLabel = this.isNew = !0;
                this.axis = c;
                this.pos = C;
                this.type = n || "";
                this.parameters = m || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options =
                    this.parameters.options;
                J(this, "init");
                n || p || this.addLabel()
            }
            c.prototype.addLabel = function () {
                var c = this,
                    C = c.axis,
                    n = C.options,
                    p = C.chart,
                    m = C.categories,
                    d = C.logarithmic,
                    l = C.names,
                    k = c.pos,
                    f = v(c.options && c.options.labels, n.labels),
                    a = C.tickPositions,
                    A = k === a[0],
                    u = k === a[a.length - 1];
                l = this.parameters.category || (m ? v(m[k], l[k], k) : k);
                var E = c.label;
                m = (!f.step || 1 === f.step) && 1 === C.tickInterval;
                a = a.info;
                var g, w;
                if (C.dateTime && a) {
                    var M = p.time.resolveDTLFormat(n.dateTimeLabelFormats[!n.grid && a.higherRanks[k] || a.unitName]);
                    var F = M.main
                }
                c.isFirst = A;
                c.isLast = u;
                c.formatCtx = {
                    axis: C,
                    chart: p,
                    isFirst: A,
                    isLast: u,
                    dateTimeLabelFormat: F,
                    tickPositionInfo: a,
                    value: d ? y(d.lin2log(l)) : l,
                    pos: k
                };
                n = C.labelFormatter.call(c.formatCtx, this.formatCtx);
                if (w = M && M.list) c.shortenLabel = function () {
                    for (g = 0; g < w.length; g++)
                        if (E.attr({
                                text: C.labelFormatter.call(D(c.formatCtx, {
                                    dateTimeLabelFormat: w[g]
                                }))
                            }), E.getBBox().width < C.getSlotWidth(c) - 2 * v(f.padding, 5)) return;
                    E.attr({
                        text: ""
                    })
                };
                m && C._addedPlotLB && C.isXAxis && c.moveLabel(n, f);
                B(E) || c.movedLabel ?
                    E && E.textStr !== n && !m && (!E.textWidth || f.style && f.style.width || E.styles.width || E.css({
                        width: null
                    }), E.attr({
                        text: n
                    }), E.textPxLength = E.getBBox().width) : (c.label = E = c.createLabel({
                        x: 0,
                        y: 0
                    }, n, f), c.rotation = 0)
            };
            c.prototype.createLabel = function (c, C, n) {
                var p = this.axis,
                    m = p.chart;
                if (c = B(C) && n.enabled ? m.renderer.text(C, c.x, c.y, n.useHTML).add(p.labelGroup) : null) m.styledMode || c.css(G(n.style)), c.textPxLength = c.getBBox().width;
                return c
            };
            c.prototype.destroy = function () {
                H(this, this.axis)
            };
            c.prototype.getPosition = function (c,
                C, n, p) {
                var m = this.axis,
                    d = m.chart,
                    l = p && d.oldChartHeight || d.chartHeight;
                c = {
                    x: c ? y(m.translate(C + n, null, null, p) + m.transB) : m.left + m.offset + (m.opposite ? (p && d.oldChartWidth || d.chartWidth) - m.right - m.left : 0),
                    y: c ? l - m.bottom + m.offset - (m.opposite ? m.height : 0) : y(l - m.translate(C + n, null, null, p) - m.transB)
                };
                c.y = q(c.y, -1E5, 1E5);
                J(this, "afterGetPosition", {
                    pos: c
                });
                return c
            };
            c.prototype.getLabelPosition = function (c, C, n, p, m, d, l, k) {
                var f = this.axis,
                    a = f.transA,
                    A = f.isLinked && f.linkedParent ? f.linkedParent.reversed : f.reversed,
                    u = f.staggerLines,
                    r = f.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    g = m.y,
                    w = p || f.reserveSpaceDefault ? 0 : -f.labelOffset * ("center" === f.labelAlign ? .5 : 1),
                    M = {};
                B(g) || (g = 0 === f.side ? n.rotation ? -8 : -n.getBBox().height : 2 === f.side ? r.y + 8 : Math.cos(n.rotation * K) * (r.y - n.getBBox(!1, 0).height / 2));
                c = c + m.x + w + r.x - (d && p ? d * a * (A ? -1 : 1) : 0);
                C = C + g - (d && !p ? d * a * (A ? 1 : -1) : 0);
                u && (n = l / (k || 1) % u, f.opposite && (n = u - n - 1), C += f.labelOffset / u * n);
                M.x = c;
                M.y = Math.round(C);
                J(this, "afterGetLabelPosition", {
                    pos: M,
                    tickmarkOffset: d,
                    index: l
                });
                return M
            };
            c.prototype.getLabelSize =
                function () {
                    return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
                };
            c.prototype.getMarkPath = function (c, C, n, p, m, d) {
                return d.crispLine([
                    ["M", c, C],
                    ["L", c + (m ? 0 : -n), C + (m ? n : 0)]
                ], p)
            };
            c.prototype.handleOverflow = function (c) {
                var r = this.axis,
                    n = r.options.labels,
                    p = c.x,
                    m = r.chart.chartWidth,
                    d = r.chart.spacing,
                    l = v(r.labelLeft, Math.min(r.pos, d[3]));
                d = v(r.labelRight, Math.max(r.isRadial ? 0 : r.pos + r.len, m - d[1]));
                var k = this.label,
                    f = this.rotation,
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [r.labelAlign || k.attr("align")],
                    A = k.getBBox().width,
                    u = r.getSlotWidth(this),
                    E = u,
                    g = 1,
                    w, M = {};
                if (f || "justify" !== v(n.overflow, "justify")) 0 > f && p - a * A < l ? w = Math.round(p / Math.cos(f * K) - l) : 0 < f && p + a * A > d && (w = Math.round((m - p) / Math.cos(f * K)));
                else if (m = p + (1 - a) * A, p - a * A < l ? E = c.x + E * (1 - a) - l : m > d && (E = d - c.x + E * a, g = -1), E = Math.min(u, E), E < u && "center" === r.labelAlign && (c.x += g * (u - E - a * (u - Math.min(A, E)))), A > E || r.autoRotation && (k.styles || {}).width) w = E;
                w && (this.shortenLabel ? this.shortenLabel() : (M.width = Math.floor(w) + "px", (n.style || {}).textOverflow || (M.textOverflow =
                    "ellipsis"), k.css(M)))
            };
            c.prototype.moveLabel = function (c, C) {
                var r = this,
                    p = r.label,
                    m = !1,
                    d = r.axis,
                    l = d.reversed,
                    k = d.chart.inverted;
                p && p.textStr === c ? (r.movedLabel = p, m = !0, delete r.label) : L(d.ticks, function (a) {
                    m || a.isNew || a === r || !a.label || a.label.textStr !== c || (r.movedLabel = a.label, m = !0, a.labelPos = r.movedLabel.xy, delete a.label)
                });
                if (!m && (r.labelPos || p)) {
                    var f = r.labelPos || p.xy;
                    p = k ? f.x : l ? 0 : d.width + d.left;
                    d = k ? l ? d.width + d.left : 0 : f.y;
                    r.movedLabel = r.createLabel({
                        x: p,
                        y: d
                    }, c, C);
                    r.movedLabel && r.movedLabel.attr({
                        opacity: 0
                    })
                }
            };
            c.prototype.render = function (c, C, n) {
                var p = this.axis,
                    m = p.horiz,
                    d = this.pos,
                    l = v(this.tickmarkOffset, p.tickmarkOffset);
                d = this.getPosition(m, d, l, C);
                l = d.x;
                var k = d.y;
                p = m && l === p.pos + p.len || !m && k === p.pos ? -1 : 1;
                n = v(n, 1);
                this.isActive = !0;
                this.renderGridLine(C, n, p);
                this.renderMark(d, n, p);
                this.renderLabel(d, C, n, c);
                this.isNew = !1;
                J(this, "afterRender")
            };
            c.prototype.renderGridLine = function (c, C, n) {
                var p = this.axis,
                    m = p.options,
                    d = this.gridLine,
                    l = {},
                    k = this.pos,
                    f = this.type,
                    a = v(this.tickmarkOffset, p.tickmarkOffset),
                    A = p.chart.renderer,
                    u = f ? f + "Grid" : "grid",
                    r = m[u + "LineWidth"],
                    g = m[u + "LineColor"];
                m = m[u + "LineDashStyle"];
                d || (p.chart.styledMode || (l.stroke = g, l["stroke-width"] = r, m && (l.dashstyle = m)), f || (l.zIndex = 1), c && (C = 0), this.gridLine = d = A.path().attr(l).addClass("highcharts-" + (f ? f + "-" : "") + "grid-line").add(p.gridGroup));
                if (d && (n = p.getPlotLinePath({
                        value: k + a,
                        lineWidth: d.strokeWidth() * n,
                        force: "pass",
                        old: c
                    }))) d[c || this.isNew ? "attr" : "animate"]({
                    d: n,
                    opacity: C
                })
            };
            c.prototype.renderMark = function (c, n, g) {
                var p = this.axis,
                    m = p.options,
                    d = p.chart.renderer,
                    l = this.type,
                    k = l ? l + "Tick" : "tick",
                    f = p.tickSize(k),
                    a = this.mark,
                    A = !a,
                    u = c.x;
                c = c.y;
                var r = v(m[k + "Width"], !l && p.isXAxis ? 1 : 0);
                m = m[k + "Color"];
                f && (p.opposite && (f[0] = -f[0]), A && (this.mark = a = d.path().addClass("highcharts-" + (l ? l + "-" : "") + "tick").add(p.axisGroup), p.chart.styledMode || a.attr({
                    stroke: m,
                    "stroke-width": r
                })), a[A ? "attr" : "animate"]({
                    d: this.getMarkPath(u, c, f[0], a.strokeWidth() * g, p.horiz, d),
                    opacity: n
                }))
            };
            c.prototype.renderLabel = function (c, n, g, p) {
                var m = this.axis,
                    d = m.horiz,
                    l = m.options,
                    k = this.label,
                    f = l.labels,
                    a = f.step;
                m = v(this.tickmarkOffset, m.tickmarkOffset);
                var A = !0,
                    u = c.x;
                c = c.y;
                k && t(u) && (k.xy = c = this.getLabelPosition(u, c, k, d, f, m, p, a), this.isFirst && !this.isLast && !v(l.showFirstLabel, 1) || this.isLast && !this.isFirst && !v(l.showLastLabel, 1) ? A = !1 : !d || f.step || f.rotation || n || 0 === g || this.handleOverflow(c), a && p % a && (A = !1), A && t(c.y) ? (c.opacity = g, k[this.isNewLabel ? "attr" : "animate"](c), this.isNewLabel = !1) : (k.attr("y", -9999), this.isNewLabel = !0))
            };
            c.prototype.replaceMovedLabel = function () {
                var c = this.label,
                    n = this.axis,
                    g =
                    n.reversed,
                    p = this.axis.chart.inverted;
                if (c && !this.isNew) {
                    var m = p ? c.xy.x : g ? n.left : n.width + n.left;
                    g = p ? g ? n.width + n.top : n.top : c.xy.y;
                    c.animate({
                        x: m,
                        y: g,
                        opacity: 0
                    }, void 0, c.destroy);
                    delete this.label
                }
                n.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel
            };
            return c
        }();
        g.Tick = c;
        return g.Tick
    });
    O(q, "parts/Time.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = c.defined,
            y = c.error,
            B = c.extend,
            H = c.isObject,
            D = c.merge,
            J = c.objectEach,
            t = c.pad,
            G = c.pick,
            L = c.splat,
            v = c.timeUnits,
            K = g.win;
        c = function () {
            function c(c) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = K.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(c)
            }
            c.prototype.get = function (c, n) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var r = n.getTime(),
                        p = r - this.getTimezoneOffset(n);
                    n.setTime(p);
                    c = n["getUTC" + c]();
                    n.setTime(r);
                    return c
                }
                return this.useUTC ? n["getUTC" + c]() : n["get" + c]()
            };
            c.prototype.set = function (c, n, g) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === c || "Seconds" ===
                        c || "Minutes" === c) return n["setUTC" + c](g);
                    var p = this.getTimezoneOffset(n);
                    p = n.getTime() - p;
                    n.setTime(p);
                    n["setUTC" + c](g);
                    c = this.getTimezoneOffset(n);
                    p = n.getTime() + c;
                    return n.setTime(p)
                }
                return this.useUTC ? n["setUTC" + c](g) : n["set" + c](g)
            };
            c.prototype.update = function (c) {
                var n = G(c && c.useUTC, !0);
                this.options = c = D(!0, this.options || {}, c);
                this.Date = c.Date || K.Date || Date;
                this.timezoneOffset = (this.useUTC = n) && c.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = !(n && !c.getTimezoneOffset &&
                    !c.timezone)
            };
            c.prototype.makeTime = function (c, n, t, p, m, d) {
                if (this.useUTC) {
                    var l = this.Date.UTC.apply(0, arguments);
                    var k = this.getTimezoneOffset(l);
                    l += k;
                    var f = this.getTimezoneOffset(l);
                    k !== f ? l += f - k : k - 36E5 !== this.getTimezoneOffset(l - 36E5) || g.isSafari || (l -= 36E5)
                } else l = (new this.Date(c, n, G(t, 1), G(p, 0), G(m, 0), G(d, 0))).getTime();
                return l
            };
            c.prototype.timezoneOffsetFunction = function () {
                var c = this,
                    n = this.options,
                    g = K.moment;
                if (!this.useUTC) return function (c) {
                    return 6E4 * (new Date(c.toString())).getTimezoneOffset()
                };
                if (n.timezone) {
                    if (g) return function (c) {
                        return 6E4 * -g.tz(c, n.timezone).utcOffset()
                    };
                    y(25)
                }
                return this.useUTC && n.getTimezoneOffset ? function (c) {
                    return 6E4 * n.getTimezoneOffset(c.valueOf())
                } : function () {
                    return 6E4 * (c.timezoneOffset || 0)
                }
            };
            c.prototype.dateFormat = function (c, n, v) {
                var p;
                if (!q(n) || isNaN(n)) return (null === (p = g.defaultOptions.lang) || void 0 === p ? void 0 : p.invalidDate) || "";
                c = G(c, "%Y-%m-%d %H:%M:%S");
                var m = this;
                p = new this.Date(n);
                var d = this.get("Hours", p),
                    l = this.get("Day", p),
                    k = this.get("Date", p),
                    f = this.get("Month",
                        p),
                    a = this.get("FullYear", p),
                    A = g.defaultOptions.lang,
                    u = null === A || void 0 === A ? void 0 : A.weekdays,
                    E = null === A || void 0 === A ? void 0 : A.shortWeekdays;
                p = B({
                    a: E ? E[l] : u[l].substr(0, 3),
                    A: u[l],
                    d: t(k),
                    e: t(k, 2, " "),
                    w: l,
                    b: A.shortMonths[f],
                    B: A.months[f],
                    m: t(f + 1),
                    o: f + 1,
                    y: a.toString().substr(2, 2),
                    Y: a,
                    H: t(d),
                    k: d,
                    I: t(d % 12 || 12),
                    l: d % 12 || 12,
                    M: t(this.get("Minutes", p)),
                    p: 12 > d ? "AM" : "PM",
                    P: 12 > d ? "am" : "pm",
                    S: t(p.getSeconds()),
                    L: t(Math.floor(n % 1E3), 3)
                }, g.dateFormats);
                J(p, function (a, f) {
                    for (; - 1 !== c.indexOf("%" + f);) c = c.replace("%" + f,
                        "function" === typeof a ? a.call(m, n) : a)
                });
                return v ? c.substr(0, 1).toUpperCase() + c.substr(1) : c
            };
            c.prototype.resolveDTLFormat = function (c) {
                return H(c, !0) ? c : (c = L(c), {
                    main: c[0],
                    from: c[1],
                    to: c[2]
                })
            };
            c.prototype.getTimeTicks = function (c, n, g, p) {
                var m = this,
                    d = [],
                    l = {};
                var k = new m.Date(n);
                var f = c.unitRange,
                    a = c.count || 1,
                    A;
                p = G(p, 1);
                if (q(n)) {
                    m.set("Milliseconds", k, f >= v.second ? 0 : a * Math.floor(m.get("Milliseconds", k) / a));
                    f >= v.second && m.set("Seconds", k, f >= v.minute ? 0 : a * Math.floor(m.get("Seconds", k) / a));
                    f >= v.minute && m.set("Minutes",
                        k, f >= v.hour ? 0 : a * Math.floor(m.get("Minutes", k) / a));
                    f >= v.hour && m.set("Hours", k, f >= v.day ? 0 : a * Math.floor(m.get("Hours", k) / a));
                    f >= v.day && m.set("Date", k, f >= v.month ? 1 : Math.max(1, a * Math.floor(m.get("Date", k) / a)));
                    if (f >= v.month) {
                        m.set("Month", k, f >= v.year ? 0 : a * Math.floor(m.get("Month", k) / a));
                        var u = m.get("FullYear", k)
                    }
                    f >= v.year && m.set("FullYear", k, u - u % a);
                    f === v.week && (u = m.get("Day", k), m.set("Date", k, m.get("Date", k) - u + p + (u < p ? -7 : 0)));
                    u = m.get("FullYear", k);
                    p = m.get("Month", k);
                    var E = m.get("Date", k),
                        r = m.get("Hours",
                            k);
                    n = k.getTime();
                    m.variableTimezone && (A = g - n > 4 * v.month || m.getTimezoneOffset(n) !== m.getTimezoneOffset(g));
                    n = k.getTime();
                    for (k = 1; n < g;) d.push(n), n = f === v.year ? m.makeTime(u + k * a, 0) : f === v.month ? m.makeTime(u, p + k * a) : !A || f !== v.day && f !== v.week ? A && f === v.hour && 1 < a ? m.makeTime(u, p, E, r + k * a) : n + f * a : m.makeTime(u, p, E + k * a * (f === v.day ? 1 : 7)), k++;
                    d.push(n);
                    f <= v.hour && 1E4 > d.length && d.forEach(function (a) {
                        0 === a % 18E5 && "000000000" === m.dateFormat("%H%M%S%L", a) && (l[a] = "day")
                    })
                }
                d.info = B(c, {
                    higherRanks: l,
                    totalRange: f * a
                });
                return d
            };
            return c
        }();
        g.Time = c;
        return g.Time
    });
    O(q, "parts/Options.js", [q["parts/Globals.js"], q["parts/Time.js"], q["parts/Color.js"], q["parts/Utilities.js"]], function (g, c, q, y) {
        q = q.parse;
        y = y.merge;
        g.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: {
                Date: void 0,
                getTimezoneOffset: void 0,
                timezone: void 0,
                timezoneOffset: 0,
                useUTC: !0
            },
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            caption: {
                margin: 15,
                text: "",
                align: "left",
                verticalAlign: "bottom"
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: g.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: g.isTouchDevice ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: q("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        "";
        g.time = new c(y(g.defaultOptions.global, g.defaultOptions.time));
        g.dateFormat = function (c, q, y) {
            return g.time.dateFormat(c, q, y)
        };
        return {
            dateFormat: g.dateFormat,
            defaultOptions: g.defaultOptions,
            time: g.time
        }
    });
    O(q, "parts/Axis.js", [q["parts/Color.js"], q["parts/Globals.js"], q["parts/Tick.js"], q["parts/Utilities.js"], q["parts/Options.js"]], function (g, c, q, y, B) {
        var H = y.addEvent,
            D = y.animObject,
            J = y.arrayMax,
            t = y.arrayMin,
            G = y.clamp,
            L = y.correctFloat,
            v = y.defined,
            K = y.destroyObjectProperties,
            n = y.error,
            r = y.extend,
            C = y.fireEvent,
            I = y.format,
            p = y.getMagnitude,
            m = y.isArray,
            d = y.isFunction,
            l = y.isNumber,
            k = y.isString,
            f = y.merge,
            a = y.normalizeTickInterval,
            A = y.objectEach,
            u = y.pick,
            E = y.relativeLength,
            P = y.removeEvent,
            w = y.splat,
            M = y.syncTimeout,
            F = B.defaultOptions,
            Q = c.deg2rad;
        y = function () {
            function e(b, a) {
                this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap =
                    this.options = this.oldMin = this.oldMax = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                this.init(b, a)
            }
            e.prototype.init = function (b, a) {
                var h = a.isX,
                    e = this;
                e.chart = b;
                e.horiz = b.inverted && !e.isZAxis ? !h : h;
                e.isXAxis = h;
                e.coll =
                    e.coll || (h ? "xAxis" : "yAxis");
                C(this, "init", {
                    userOptions: a
                });
                e.opposite = a.opposite;
                e.side = a.side || (e.horiz ? e.opposite ? 0 : 2 : e.opposite ? 1 : 3);
                e.setOptions(a);
                var f = this.options,
                    k = f.type;
                e.labelFormatter = f.labels.formatter || e.defaultLabelFormatter;
                e.userOptions = a;
                e.minPixelPadding = 0;
                e.reversed = f.reversed;
                e.visible = !1 !== f.visible;
                e.zoomEnabled = !1 !== f.zoomEnabled;
                e.hasNames = "category" === k || !0 === f.categories;
                e.categories = f.categories || e.hasNames;
                e.names || (e.names = [], e.names.keys = {});
                e.plotLinesAndBandsGroups = {};
                e.positiveValuesOnly = !(!e.logarithmic || f.allowNegativeLog);
                e.isLinked = v(f.linkedTo);
                e.ticks = {};
                e.labelEdge = [];
                e.minorTicks = {};
                e.plotLinesAndBands = [];
                e.alternateBands = {};
                e.len = 0;
                e.minRange = e.userMinRange = f.minRange || f.maxZoom;
                e.range = f.range;
                e.offset = f.offset || 0;
                e.max = null;
                e.min = null;
                e.crosshair = u(f.crosshair, w(b.options.tooltip.crosshairs)[h ? 0 : 1], !1);
                a = e.options.events; - 1 === b.axes.indexOf(e) && (h ? b.axes.splice(b.xAxis.length, 0, e) : b.axes.push(e), b[e.coll].push(e));
                e.series = e.series || [];
                b.inverted &&
                    !e.isZAxis && h && "undefined" === typeof e.reversed && (e.reversed = !0);
                e.labelRotation = e.options.labels.rotation;
                A(a, function (b, a) {
                    d(b) && H(e, a, b)
                });
                C(this, "afterInit")
            };
            e.prototype.setOptions = function (b) {
                this.options = f(e.defaultOptions, "yAxis" === this.coll && e.defaultYAxisOptions, [e.defaultTopAxisOptions, e.defaultRightAxisOptions, e.defaultBottomAxisOptions, e.defaultLeftAxisOptions][this.side], f(F[this.coll], b));
                C(this, "afterSetOptions", {
                    userOptions: b
                })
            };
            e.prototype.defaultLabelFormatter = function () {
                var b = this.axis,
                    a = l(this.value) ? this.value : NaN,
                    e = b.chart.time,
                    f = b.categories,
                    d = this.dateTimeLabelFormat,
                    k = F.lang,
                    c = k.numericSymbols;
                k = k.numericSymbolMagnitude || 1E3;
                var u = c && c.length,
                    m = b.options.labels.format;
                b = b.logarithmic ? Math.abs(a) : b.tickInterval;
                var p = this.chart,
                    A = p.numberFormatter;
                if (m) var w = I(m, this, p);
                else if (f) w = "" + this.value;
                else if (d) w = e.dateFormat(d, a);
                else if (u && 1E3 <= b)
                    for (; u-- && "undefined" === typeof w;) e = Math.pow(k, u + 1), b >= e && 0 === 10 * a % e && null !== c[u] && 0 !== a && (w = A(a / e, -1) + c[u]);
                "undefined" === typeof w &&
                    (w = 1E4 <= Math.abs(a) ? A(a, -1) : A(a, -1, void 0, ""));
                return w
            };
            e.prototype.getSeriesExtremes = function () {
                var b = this,
                    a = b.chart,
                    e;
                C(this, "getSeriesExtremes", null, function () {
                    b.hasVisibleSeries = !1;
                    b.dataMin = b.dataMax = b.threshold = null;
                    b.softThreshold = !b.isXAxis;
                    b.stacking && b.stacking.buildStacks();
                    b.series.forEach(function (h) {
                        if (h.visible || !a.options.chart.ignoreHiddenSeries) {
                            var f = h.options,
                                d = f.threshold;
                            b.hasVisibleSeries = !0;
                            b.positiveValuesOnly && 0 >= d && (d = null);
                            if (b.isXAxis) {
                                if (f = h.xData, f.length) {
                                    e = h.getXExtremes(f);
                                    var k = e.min;
                                    var x = e.max;
                                    l(k) || k instanceof Date || (f = f.filter(l), e = h.getXExtremes(f), k = e.min, x = e.max);
                                    f.length && (b.dataMin = Math.min(u(b.dataMin, k), k), b.dataMax = Math.max(u(b.dataMax, x), x))
                                }
                            } else if (h = h.applyExtremes(), l(h.dataMin) && (k = h.dataMin, b.dataMin = Math.min(u(b.dataMin, k), k)), l(h.dataMax) && (x = h.dataMax, b.dataMax = Math.max(u(b.dataMax, x), x)), v(d) && (b.threshold = d), !f.softThreshold || b.positiveValuesOnly) b.softThreshold = !1
                        }
                    })
                });
                C(this, "afterGetSeriesExtremes")
            };
            e.prototype.translate = function (b, a, e,
                f, d, k) {
                var h = this.linkedParent || this,
                    x = 1,
                    z = 0,
                    c = f ? h.oldTransA : h.transA;
                f = f ? h.oldMin : h.min;
                var u = h.minPixelPadding;
                d = (h.isOrdinal || h.brokenAxis && h.brokenAxis.hasBreaks || h.logarithmic && d) && h.lin2val;
                c || (c = h.transA);
                e && (x *= -1, z = h.len);
                h.reversed && (x *= -1, z -= x * (h.sector || h.len));
                a ? (b = (b * x + z - u) / c + f, d && (b = h.lin2val(b))) : (d && (b = h.val2lin(b)), b = l(f) ? x * (b - f) * c + z + x * u + (l(k) ? c * k : 0) : void 0);
                return b
            };
            e.prototype.toPixels = function (b, a) {
                return this.translate(b, !1, !this.horiz, null, !0) + (a ? 0 : this.pos)
            };
            e.prototype.toValue =
                function (b, a) {
                    return this.translate(b - (a ? 0 : this.pos), !0, !this.horiz, null, !0)
                };
            e.prototype.getPlotLinePath = function (b) {
                function a(b, a, h) {
                    if ("pass" !== w && b < a || b > h) w ? b = G(b, a, h) : t = !0;
                    return b
                }
                var e = this,
                    f = e.chart,
                    d = e.left,
                    k = e.top,
                    c = b.old,
                    m = b.value,
                    p = b.translatedValue,
                    A = b.lineWidth,
                    w = b.force,
                    n, g, E, r, M = c && f.oldChartHeight || f.chartHeight,
                    F = c && f.oldChartWidth || f.chartWidth,
                    t, v = e.transB;
                b = {
                    value: m,
                    lineWidth: A,
                    old: c,
                    force: w,
                    acrossPanes: b.acrossPanes,
                    translatedValue: p
                };
                C(this, "getPlotLinePath", b, function (b) {
                    p =
                        u(p, e.translate(m, null, null, c));
                    p = G(p, -1E5, 1E5);
                    n = E = Math.round(p + v);
                    g = r = Math.round(M - p - v);
                    l(p) ? e.horiz ? (g = k, r = M - e.bottom, n = E = a(n, d, d + e.width)) : (n = d, E = F - e.right, g = r = a(g, k, k + e.height)) : (t = !0, w = !1);
                    b.path = t && !w ? null : f.renderer.crispLine([
                        ["M", n, g],
                        ["L", E, r]
                    ], A || 1)
                });
                return b.path
            };
            e.prototype.getLinearTickPositions = function (b, a, e) {
                var h = L(Math.floor(a / b) * b);
                e = L(Math.ceil(e / b) * b);
                var f = [],
                    d;
                L(h + b) === h && (d = 20);
                if (this.single) return [a];
                for (a = h; a <= e;) {
                    f.push(a);
                    a = L(a + b, d);
                    if (a === k) break;
                    var k = a
                }
                return f
            };
            e.prototype.getMinorTickInterval = function () {
                var b = this.options;
                return !0 === b.minorTicks ? u(b.minorTickInterval, "auto") : !1 === b.minorTicks ? null : b.minorTickInterval
            };
            e.prototype.getMinorTickPositions = function () {
                var b = this.options,
                    a = this.tickPositions,
                    e = this.minorTickInterval,
                    f = [],
                    d = this.pointRangePadding || 0,
                    k = this.min - d;
                d = this.max + d;
                var c = d - k;
                if (c && c / e < this.len / 3) {
                    var l = this.logarithmic;
                    if (l) this.paddedTicks.forEach(function (b, a, h) {
                        a && f.push.apply(f, l.getLogTickPositions(e, h[a - 1], h[a], !0))
                    });
                    else if (this.dateTime &&
                        "auto" === this.getMinorTickInterval()) f = f.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(e), k, d, b.startOfWeek));
                    else
                        for (b = k + (a[0] - k) % e; b <= d && b !== f[0]; b += e) f.push(b)
                }
                0 !== f.length && this.trimTicks(f);
                return f
            };
            e.prototype.adjustForMinRange = function () {
                var b = this.options,
                    a = this.min,
                    e = this.max,
                    f = this.logarithmic,
                    d, k, c, l, m;
                this.isXAxis && "undefined" === typeof this.minRange && !f && (v(b.min) || v(b.max) ? this.minRange = null : (this.series.forEach(function (b) {
                    l = b.xData;
                    for (k = m = b.xIncrement ? 1 : l.length -
                        1; 0 < k; k--)
                        if (c = l[k] - l[k - 1], "undefined" === typeof d || c < d) d = c
                }), this.minRange = Math.min(5 * d, this.dataMax - this.dataMin)));
                if (e - a < this.minRange) {
                    var p = this.dataMax - this.dataMin >= this.minRange;
                    var A = this.minRange;
                    var w = (A - e + a) / 2;
                    w = [a - w, u(b.min, a - w)];
                    p && (w[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                    a = J(w);
                    e = [a + A, u(b.max, a + A)];
                    p && (e[2] = f ? f.log2lin(this.dataMax) : this.dataMax);
                    e = t(e);
                    e - a < A && (w[0] = e - A, w[1] = u(b.min, e - A), a = J(w))
                }
                this.min = a;
                this.max = e
            };
            e.prototype.getClosest = function () {
                var b;
                this.categories ? b = 1 : this.series.forEach(function (a) {
                    var h = a.closestPointRange,
                        e = a.visible || !a.chart.options.chart.ignoreHiddenSeries;
                    !a.noSharedTooltip && v(h) && e && (b = v(b) ? Math.min(b, h) : h)
                });
                return b
            };
            e.prototype.nameToX = function (b) {
                var a = m(this.categories),
                    e = a ? this.categories : this.names,
                    f = b.options.x;
                b.series.requireSorting = !1;
                v(f) || (f = !1 === this.options.uniqueNames ? b.series.autoIncrement() : a ? e.indexOf(b.name) : u(e.keys[b.name], -1));
                if (-1 === f) {
                    if (!a) var d = e.length
                } else d = f;
                "undefined" !== typeof d && (this.names[d] =
                    b.name, this.names.keys[b.name] = d);
                return d
            };
            e.prototype.updateNames = function () {
                var b = this,
                    a = this.names;
                0 < a.length && (Object.keys(a.keys).forEach(function (b) {
                    delete a.keys[b]
                }), a.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) b.max = Math.max(b.max, a.xData.length - 1), a.processData(), a.generatePoints();
                    a.data.forEach(function (h, e) {
                        if (h && h.options && "undefined" !== typeof h.name) {
                            var f = b.nameToX(h);
                            "undefined" !== typeof f && f !== h.x &&
                                (h.x = f, a.xData[e] = f)
                        }
                    })
                }))
            };
            e.prototype.setAxisTranslation = function (b) {
                var a = this,
                    e = a.max - a.min,
                    f = a.axisPointRange || 0,
                    d = 0,
                    c = 0,
                    l = a.linkedParent,
                    m = !!a.categories,
                    p = a.transA,
                    A = a.isXAxis;
                if (A || m || f) {
                    var w = a.getClosest();
                    l ? (d = l.minPointOffset, c = l.pointRangePadding) : a.series.forEach(function (b) {
                        var h = m ? 1 : A ? u(b.options.pointRange, w, 0) : a.axisPointRange || 0,
                            e = b.options.pointPlacement;
                        f = Math.max(f, h);
                        if (!a.single || m) b = b.is("xrange") ? !A : A, d = Math.max(d, b && k(e) ? 0 : h / 2), c = Math.max(c, b && "on" === e ? 0 : h)
                    });
                    l = a.ordinal &&
                        a.ordinal.slope && w ? a.ordinal.slope / w : 1;
                    a.minPointOffset = d *= l;
                    a.pointRangePadding = c *= l;
                    a.pointRange = Math.min(f, a.single && m ? 1 : e);
                    A && (a.closestPointRange = w)
                }
                b && (a.oldTransA = p);
                a.translationSlope = a.transA = p = a.staticScale || a.len / (e + c || 1);
                a.transB = a.horiz ? a.left : a.bottom;
                a.minPixelPadding = p * d;
                C(this, "afterSetAxisTranslation")
            };
            e.prototype.minFromRange = function () {
                return this.max - this.range
            };
            e.prototype.setTickInterval = function (b) {
                var h = this,
                    e = h.chart,
                    f = h.logarithmic,
                    d = h.options,
                    k = h.isXAxis,
                    c = h.isLinked,
                    m = d.maxPadding,
                    A = d.minPadding,
                    w = d.tickInterval,
                    g = d.tickPixelInterval,
                    E = h.categories,
                    r = l(h.threshold) ? h.threshold : null,
                    S = h.softThreshold;
                h.dateTime || E || c || this.getTickAmount();
                var M = u(h.userMin, d.min);
                var F = u(h.userMax, d.max);
                if (c) {
                    h.linkedParent = e[h.coll][d.linkedTo];
                    var t = h.linkedParent.getExtremes();
                    h.min = u(t.min, t.dataMin);
                    h.max = u(t.max, t.dataMax);
                    d.type !== h.linkedParent.options.type && n(11, 1, e)
                } else {
                    if (!S && v(r))
                        if (h.dataMin >= r) t = r, A = 0;
                        else if (h.dataMax <= r) {
                        var P = r;
                        m = 0
                    }
                    h.min = u(M, t, h.dataMin);
                    h.max =
                        u(F, P, h.dataMax)
                }
                f && (h.positiveValuesOnly && !b && 0 >= Math.min(h.min, u(h.dataMin, h.min)) && n(10, 1, e), h.min = L(f.log2lin(h.min), 16), h.max = L(f.log2lin(h.max), 16));
                h.range && v(h.max) && (h.userMin = h.min = M = Math.max(h.dataMin, h.minFromRange()), h.userMax = F = h.max, h.range = null);
                C(h, "foundExtremes");
                h.beforePadding && h.beforePadding();
                h.adjustForMinRange();
                !(E || h.axisPointRange || h.stacking && h.stacking.usePercentage || c) && v(h.min) && v(h.max) && (e = h.max - h.min) && (!v(M) && A && (h.min -= e * A), !v(F) && m && (h.max += e * m));
                l(h.userMin) ||
                    (l(d.softMin) && d.softMin < h.min && (h.min = M = d.softMin), l(d.floor) && (h.min = Math.max(h.min, d.floor)));
                l(h.userMax) || (l(d.softMax) && d.softMax > h.max && (h.max = F = d.softMax), l(d.ceiling) && (h.max = Math.min(h.max, d.ceiling)));
                S && v(h.dataMin) && (r = r || 0, !v(M) && h.min < r && h.dataMin >= r ? h.min = h.options.minRange ? Math.min(r, h.max - h.minRange) : r : !v(F) && h.max > r && h.dataMax <= r && (h.max = h.options.minRange ? Math.max(r, h.min + h.minRange) : r));
                h.tickInterval = h.min === h.max || "undefined" === typeof h.min || "undefined" === typeof h.max ? 1 : c &&
                    !w && g === h.linkedParent.options.tickPixelInterval ? w = h.linkedParent.tickInterval : u(w, this.tickAmount ? (h.max - h.min) / Math.max(this.tickAmount - 1, 1) : void 0, E ? 1 : (h.max - h.min) * g / Math.max(h.len, g));
                k && !b && h.series.forEach(function (b) {
                    b.processData(h.min !== h.oldMin || h.max !== h.oldMax)
                });
                h.setAxisTranslation(!0);
                C(this, "initialAxisTranslation");
                h.pointRange && !w && (h.tickInterval = Math.max(h.pointRange, h.tickInterval));
                b = u(d.minTickInterval, h.dateTime && !h.series.some(function (b) {
                        return b.noSharedTooltip
                    }) ? h.closestPointRange :
                    0);
                !w && h.tickInterval < b && (h.tickInterval = b);
                h.dateTime || h.logarithmic || w || (h.tickInterval = a(h.tickInterval, void 0, p(h.tickInterval), u(d.allowDecimals, .5 > h.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                this.tickAmount || (h.tickInterval = h.unsquish());
                this.setTickPositions()
            };
            e.prototype.setTickPositions = function () {
                var b = this.options,
                    a = b.tickPositions;
                var e = this.getMinorTickInterval();
                var f = b.tickPositioner,
                    d = this.hasVerticalPanning(),
                    k = "colorAxis" === this.coll,
                    c = (k || !d) && b.startOnTick;
                d =
                    (k || !d) && b.endOnTick;
                this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === e && this.tickInterval ? this.tickInterval / 5 : e;
                this.single = this.min === this.max && v(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
                this.tickPositions = e = a && a.slice();
                !e && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? e = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval,
                    b.units), this.min, this.max, b.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (e = [this.min, this.max], n(19, !1, this.chart)), e.length > this.len && (e = [e[0], e.pop()], e[0] === e[1] && (e.length = 1)), this.tickPositions = e, f && (f = f.apply(this, [this.min, this.max]))) && (this.tickPositions = e = f);
                this.paddedTicks = e.slice(0);
                this.trimTicks(e,
                    c, d);
                this.isLinked || (this.single && 2 > e.length && !this.categories && !this.series.some(function (b) {
                    return b.is("heatmap") && "between" === b.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), a || f || this.adjustTickAmount());
                C(this, "afterSetTickPositions")
            };
            e.prototype.trimTicks = function (b, a, e) {
                var h = b[0],
                    f = b[b.length - 1],
                    d = !this.isOrdinal && this.minPointOffset || 0;
                C(this, "trimTicks");
                if (!this.isLinked) {
                    if (a && -Infinity !== h) this.min = h;
                    else
                        for (; this.min - d > b[0];) b.shift();
                    if (e) this.max = f;
                    else
                        for (; this.max + d <
                            b[b.length - 1];) b.pop();
                    0 === b.length && v(h) && !this.options.tickPositions && b.push((f + h) / 2)
                }
            };
            e.prototype.alignToOthers = function () {
                var b = {},
                    a, e = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === e.alignTicks || !1 === e.startOnTick || !1 === e.endOnTick || this.logarithmic || this.chart[this.coll].forEach(function (h) {
                    var e = h.options;
                    e = [h.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    h.series.length && (b[e] ? a = !0 : b[e] = 1)
                });
                return a
            };
            e.prototype.getTickAmount = function () {
                var b = this.options,
                    a = b.tickAmount,
                    e = b.tickPixelInterval;
                !v(b.tickInterval) && !a && this.len < e && !this.isRadial && !this.logarithmic && b.startOnTick && b.endOnTick && (a = 2);
                !a && this.alignToOthers() && (a = Math.ceil(this.len / e) + 1);
                4 > a && (this.finalTickAmt = a, a = 5);
                this.tickAmount = a
            };
            e.prototype.adjustTickAmount = function () {
                var b = this.options,
                    a = this.tickInterval,
                    e = this.tickPositions,
                    f = this.tickAmount,
                    d = this.finalTickAmt,
                    k = e && e.length,
                    c = u(this.threshold, this.softThreshold ? 0 : null),
                    l;
                if (this.hasData()) {
                    if (k < f) {
                        for (l = this.min; e.length < f;) e.length % 2 || l ===
                            c ? e.push(L(e[e.length - 1] + a)) : e.unshift(L(e[0] - a));
                        this.transA *= (k - 1) / (f - 1);
                        this.min = b.startOnTick ? e[0] : Math.min(this.min, e[0]);
                        this.max = b.endOnTick ? e[e.length - 1] : Math.max(this.max, e[e.length - 1])
                    } else k > f && (this.tickInterval *= 2, this.setTickPositions());
                    if (v(d)) {
                        for (a = b = e.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < b - 1) && e.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            };
            e.prototype.setScale = function () {
                var b, a = !1,
                    e = !1;
                this.series.forEach(function (b) {
                    var h;
                    a = a || b.isDirtyData || b.isDirty;
                    e = e || (null === (h = b.xAxis) ||
                        void 0 === h ? void 0 : h.isDirty) || !1
                });
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (b = this.len !== this.oldAxisLength) || a || e || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin ||
                    this.max !== this.oldMax)) : this.stacking && this.stacking.cleanStacks();
                a && this.panningState && (this.panningState.isDirty = !0);
                C(this, "afterSetScale")
            };
            e.prototype.setExtremes = function (b, a, e, f, d) {
                var h = this,
                    k = h.chart;
                e = u(e, !0);
                h.series.forEach(function (b) {
                    delete b.kdTree
                });
                d = r(d, {
                    min: b,
                    max: a
                });
                C(h, "setExtremes", d, function () {
                    h.userMin = b;
                    h.userMax = a;
                    h.eventArgs = d;
                    e && k.redraw(f)
                })
            };
            e.prototype.zoom = function (b, a) {
                var e = this,
                    h = this.dataMin,
                    f = this.dataMax,
                    d = this.options,
                    k = Math.min(h, u(d.min, h)),
                    c = Math.max(f,
                        u(d.max, f));
                b = {
                    newMin: b,
                    newMax: a
                };
                C(this, "zoom", b, function (b) {
                    var a = b.newMin,
                        d = b.newMax;
                    if (a !== e.min || d !== e.max) e.allowZoomOutside || (v(h) && (a < k && (a = k), a > c && (a = c)), v(f) && (d < k && (d = k), d > c && (d = c))), e.displayBtn = "undefined" !== typeof a || "undefined" !== typeof d, e.setExtremes(a, d, !1, void 0, {
                        trigger: "zoom"
                    });
                    b.zoomed = !0
                });
                return b.zoomed
            };
            e.prototype.setAxisSize = function () {
                var b = this.chart,
                    a = this.options,
                    e = a.offsets || [0, 0, 0, 0],
                    f = this.horiz,
                    d = this.width = Math.round(E(u(a.width, b.plotWidth - e[3] + e[1]), b.plotWidth)),
                    k = this.height = Math.round(E(u(a.height, b.plotHeight - e[0] + e[2]), b.plotHeight)),
                    c = this.top = Math.round(E(u(a.top, b.plotTop + e[0]), b.plotHeight, b.plotTop));
                a = this.left = Math.round(E(u(a.left, b.plotLeft + e[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - k - c;
                this.right = b.chartWidth - d - a;
                this.len = Math.max(f ? d : k, 0);
                this.pos = f ? a : c
            };
            e.prototype.getExtremes = function () {
                var b = this.logarithmic;
                return {
                    min: b ? L(b.lin2log(this.min)) : this.min,
                    max: b ? L(b.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            };
            e.prototype.getThreshold = function (b) {
                var a = this.logarithmic,
                    e = a ? a.lin2log(this.min) : this.min;
                a = a ? a.lin2log(this.max) : this.max;
                null === b || -Infinity === b ? b = e : Infinity === b ? b = a : e > b ? b = e : a < b && (b = a);
                return this.translate(b, 0, 1, 0, 1)
            };
            e.prototype.autoLabelAlign = function (b) {
                var a = (u(b, 0) - 90 * this.side + 720) % 360;
                b = {
                    align: "center"
                };
                C(this, "autoLabelAlign", b, function (b) {
                    15 < a && 165 > a ? b.align = "right" : 195 < a && 345 > a && (b.align = "left")
                });
                return b.align
            };
            e.prototype.tickSize = function (b) {
                var a =
                    this.options,
                    e = a["tick" === b ? "tickLength" : "minorTickLength"],
                    f = u(a["tick" === b ? "tickWidth" : "minorTickWidth"], "tick" === b && this.isXAxis && !this.categories ? 1 : 0);
                if (f && e) {
                    "inside" === a[b + "Position"] && (e = -e);
                    var d = [e, f]
                }
                b = {
                    tickSize: d
                };
                C(this, "afterTickSize", b);
                return b.tickSize
            };
            e.prototype.labelMetrics = function () {
                var b = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[b] && this.ticks[b].label)
            };
            e.prototype.unsquish =
                function () {
                    var b = this.options.labels,
                        a = this.horiz,
                        e = this.tickInterval,
                        f = e,
                        d = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e),
                        k, c = b.rotation,
                        l = this.labelMetrics(),
                        m, p = Number.MAX_VALUE,
                        A, w = this.max - this.min,
                        n = function (b) {
                            var a = b / (d || 1);
                            a = 1 < a ? Math.ceil(a) : 1;
                            a * e > w && Infinity !== b && Infinity !== d && w && (a = Math.ceil(w / e));
                            return L(a * e)
                        };
                    a ? (A = !b.staggerLines && !b.step && (v(c) ? [c] : d < u(b.autoRotationLimit, 80) && b.autoRotation)) && A.forEach(function (b) {
                        if (b === c || b && -90 <= b && 90 >= b) {
                            m = n(Math.abs(l.h / Math.sin(Q * b)));
                            var a = m + Math.abs(b / 360);
                            a < p && (p = a, k = b, f = m)
                        }
                    }) : b.step || (f = n(l.h));
                    this.autoRotation = A;
                    this.labelRotation = u(k, c);
                    return f
                };
            e.prototype.getSlotWidth = function (b) {
                var a, e = this.chart,
                    f = this.horiz,
                    d = this.options.labels,
                    k = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    c = e.margin[3];
                if (b && l(b.slotWidth)) return b.slotWidth;
                if (f && d && 2 > (d.step || 0)) return d.rotation ? 0 : (this.staggerLines || 1) * this.len / k;
                if (!f) {
                    b = null === (a = null === d || void 0 === d ? void 0 : d.style) || void 0 === a ? void 0 : a.width;
                    if (void 0 !== b) return parseInt(b,
                        10);
                    if (c) return c - e.spacing[3]
                }
                return .33 * e.chartWidth
            };
            e.prototype.renderUnsquish = function () {
                var b = this.chart,
                    a = b.renderer,
                    e = this.tickPositions,
                    f = this.ticks,
                    d = this.options.labels,
                    c = d && d.style || {},
                    l = this.horiz,
                    u = this.getSlotWidth(),
                    m = Math.max(1, Math.round(u - 2 * (d.padding || 5))),
                    p = {},
                    A = this.labelMetrics(),
                    w = d.style && d.style.textOverflow,
                    n = 0;
                k(d.rotation) || (p.rotation = d.rotation || 0);
                e.forEach(function (b) {
                    b = f[b];
                    b.movedLabel && b.replaceMovedLabel();
                    b && b.label && b.label.textPxLength > n && (n = b.label.textPxLength)
                });
                this.maxLabelLength = n;
                if (this.autoRotation) n > m && n > A.h ? p.rotation = this.labelRotation : this.labelRotation = 0;
                else if (u) {
                    var g = m;
                    if (!w) {
                        var E = "clip";
                        for (m = e.length; !l && m--;) {
                            var r = e[m];
                            if (r = f[r].label) r.styles && "ellipsis" === r.styles.textOverflow ? r.css({
                                textOverflow: "clip"
                            }) : r.textPxLength > u && r.css({
                                width: u + "px"
                            }), r.getBBox().height > this.len / e.length - (A.h - A.f) && (r.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                p.rotation && (g = n > .5 * b.chartHeight ? .33 * b.chartHeight : n, w || (E = "ellipsis"));
                if (this.labelAlign = d.align || this.autoLabelAlign(this.labelRotation)) p.align =
                    this.labelAlign;
                e.forEach(function (b) {
                    var a = (b = f[b]) && b.label,
                        e = c.width,
                        h = {};
                    a && (a.attr(p), b.shortenLabel ? b.shortenLabel() : g && !e && "nowrap" !== c.whiteSpace && (g < a.textPxLength || "SPAN" === a.element.tagName) ? (h.width = g + "px", w || (h.textOverflow = a.specificTextOverflow || E), a.css(h)) : a.styles && a.styles.width && !h.width && !e && a.css({
                        width: null
                    }), delete a.specificTextOverflow, b.rotation = p.rotation)
                }, this);
                this.tickRotCorr = a.rotCorr(A.b, this.labelRotation || 0, 0 !== this.side)
            };
            e.prototype.hasData = function () {
                return this.series.some(function (b) {
                        return b.hasData()
                    }) ||
                    this.options.showEmpty && v(this.min) && v(this.max)
            };
            e.prototype.addTitle = function (b) {
                var a = this.chart.renderer,
                    e = this.horiz,
                    d = this.opposite,
                    k = this.options.title,
                    c, l = this.chart.styledMode;
                this.axisTitle || ((c = k.textAlign) || (c = (e ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: d ? "right" : "left",
                        middle: "center",
                        high: d ? "left" : "right"
                    })[k.align]), this.axisTitle = a.text(k.text, 0, 0, k.useHTML).attr({
                        zIndex: 7,
                        rotation: k.rotation || 0,
                        align: c
                    }).addClass("highcharts-axis-title"), l || this.axisTitle.css(f(k.style)), this.axisTitle.add(this.axisGroup),
                    this.axisTitle.isNew = !0);
                l || k.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len + "px"
                });
                this.axisTitle[b ? "show" : "hide"](b)
            };
            e.prototype.generateTick = function (b) {
                var a = this.ticks;
                a[b] ? a[b].addLabel() : a[b] = new q(this, b)
            };
            e.prototype.getOffset = function () {
                var b = this,
                    a = b.chart,
                    e = a.renderer,
                    f = b.options,
                    d = b.tickPositions,
                    k = b.ticks,
                    c = b.horiz,
                    l = b.side,
                    m = a.inverted && !b.isZAxis ? [1, 0, 3, 2][l] : l,
                    p, w = 0,
                    n = 0,
                    g = f.title,
                    E = f.labels,
                    r = 0,
                    M = a.axisOffset;
                a = a.clipOffset;
                var F = [-1, 1, 1, -1][l],
                    t = f.className,
                    P = b.axisParent;
                var I = b.hasData();
                b.showAxis = p = I || u(f.showEmpty, !0);
                b.staggerLines = b.horiz && E.staggerLines;
                b.axisGroup || (b.gridGroup = e.g("grid").attr({
                    zIndex: f.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(P), b.axisGroup = e.g("axis").attr({
                    zIndex: f.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(P), b.labelGroup = e.g("axis-labels").attr({
                    zIndex: E.zIndex || 7
                }).addClass("highcharts-" + b.coll.toLowerCase() + "-labels " + (t || "")).add(P));
                I || b.isLinked ? (d.forEach(function (a,
                    e) {
                    b.generateTick(a, e)
                }), b.renderUnsquish(), b.reserveSpaceDefault = 0 === l || 2 === l || {
                    1: "left",
                    3: "right"
                } [l] === b.labelAlign, u(E.reserveSpace, "center" === b.labelAlign ? !0 : null, b.reserveSpaceDefault) && d.forEach(function (b) {
                    r = Math.max(k[b].getLabelSize(), r)
                }), b.staggerLines && (r *= b.staggerLines), b.labelOffset = r * (b.opposite ? -1 : 1)) : A(k, function (b, a) {
                    b.destroy();
                    delete k[a]
                });
                if (g && g.text && !1 !== g.enabled && (b.addTitle(p), p && !1 !== g.reserveSpace)) {
                    b.titleOffset = w = b.axisTitle.getBBox()[c ? "height" : "width"];
                    var q = g.offset;
                    n = v(q) ? 0 : u(g.margin, c ? 5 : 10)
                }
                b.renderLine();
                b.offset = F * u(f.offset, M[l] ? M[l] + (f.margin || 0) : 0);
                b.tickRotCorr = b.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                e = 0 === l ? -b.labelMetrics().h : 2 === l ? b.tickRotCorr.y : 0;
                n = Math.abs(r) + n;
                r && (n = n - e + F * (c ? u(E.y, b.tickRotCorr.y + 8 * F) : E.x));
                b.axisTitleMargin = u(q, n);
                b.getMaxLabelDimensions && (b.maxLabelDimensions = b.getMaxLabelDimensions(k, d));
                c = this.tickSize("tick");
                M[l] = Math.max(M[l], b.axisTitleMargin + w + F * b.offset, n, d && d.length && c ? c[0] + F * b.offset : 0);
                f = f.offset ? 0 : 2 * Math.floor(b.axisLine.strokeWidth() /
                    2);
                a[m] = Math.max(a[m], f);
                C(this, "afterGetOffset")
            };
            e.prototype.getLinePath = function (b) {
                var a = this.chart,
                    e = this.opposite,
                    f = this.offset,
                    d = this.horiz,
                    k = this.left + (e ? this.width : 0) + f;
                f = a.chartHeight - this.bottom - (e ? this.height : 0) + f;
                e && (b *= -1);
                return a.renderer.crispLine([
                    ["M", d ? this.left : k, d ? f : this.top],
                    ["L", d ? a.chartWidth - this.right : k, d ? f : a.chartHeight - this.bottom]
                ], b)
            };
            e.prototype.renderLine = function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.chart.styledMode || this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
            };
            e.prototype.getTitlePosition = function () {
                var b = this.horiz,
                    a = this.left,
                    e = this.top,
                    f = this.len,
                    d = this.options.title,
                    k = b ? a : e,
                    c = this.opposite,
                    l = this.offset,
                    u = d.x || 0,
                    m = d.y || 0,
                    p = this.axisTitle,
                    A = this.chart.renderer.fontMetrics(d.style && d.style.fontSize, p);
                p = Math.max(p.getBBox(null, 0).height - A.h - 1, 0);
                f = {
                    low: k + (b ? 0 : f),
                    middle: k + f / 2,
                    high: k + (b ? f : 0)
                } [d.align];
                a = (b ? e + this.height : a) + (b ? 1 : -1) *
                    (c ? -1 : 1) * this.axisTitleMargin + [-p, p, A.f, -p][this.side];
                b = {
                    x: b ? f + u : a + (c ? this.width : 0) + l + u,
                    y: b ? a + m - (c ? this.height : 0) + l : f + m
                };
                C(this, "afterGetTitlePosition", {
                    titlePosition: b
                });
                return b
            };
            e.prototype.renderMinorTick = function (b) {
                var a = this.chart.hasRendered && l(this.oldMin),
                    e = this.minorTicks;
                e[b] || (e[b] = new q(this, b, "minor"));
                a && e[b].isNew && e[b].render(null, !0);
                e[b].render(null, !1, 1)
            };
            e.prototype.renderTick = function (b, a) {
                var e = this.isLinked,
                    h = this.ticks,
                    f = this.chart.hasRendered && l(this.oldMin);
                if (!e || b >=
                    this.min && b <= this.max) h[b] || (h[b] = new q(this, b)), f && h[b].isNew && h[b].render(a, !0, -1), h[b].render(a)
            };
            e.prototype.render = function () {
                var b = this,
                    a = b.chart,
                    e = b.logarithmic,
                    f = b.options,
                    d = b.isLinked,
                    k = b.tickPositions,
                    u = b.axisTitle,
                    m = b.ticks,
                    p = b.minorTicks,
                    w = b.alternateBands,
                    n = f.stackLabels,
                    g = f.alternateGridColor,
                    E = b.tickmarkOffset,
                    r = b.axisLine,
                    F = b.showAxis,
                    t = D(a.renderer.globalAnimation),
                    v, P;
                b.labelEdge.length = 0;
                b.overlap = !1;
                [m, p, w].forEach(function (b) {
                    A(b, function (b) {
                        b.isActive = !1
                    })
                });
                if (b.hasData() ||
                    d) b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function (a) {
                    b.renderMinorTick(a)
                }), k.length && (k.forEach(function (a, e) {
                    b.renderTick(a, e)
                }), E && (0 === b.min || b.single) && (m[-1] || (m[-1] = new q(b, -1, null, !0)), m[-1].render(-1))), g && k.forEach(function (h, f) {
                    P = "undefined" !== typeof k[f + 1] ? k[f + 1] + E : b.max - E;
                    0 === f % 2 && h < b.max && P <= b.max + (a.polar ? -E : E) && (w[h] || (w[h] = new c.PlotLineOrBand(b)), v = h + E, w[h].options = {
                            from: e ? e.lin2log(v) : v,
                            to: e ? e.lin2log(P) : P,
                            color: g,
                            className: "highcharts-alternate-grid"
                        },
                        w[h].render(), w[h].isActive = !0)
                }), b._addedPlotLB || ((f.plotLines || []).concat(f.plotBands || []).forEach(function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                [m, p, w].forEach(function (b) {
                    var e, h = [],
                        f = t.duration;
                    A(b, function (b, a) {
                        b.isActive || (b.render(a, !1, 0), b.isActive = !1, h.push(a))
                    });
                    M(function () {
                        for (e = h.length; e--;) b[h[e]] && !b[h[e]].isActive && (b[h[e]].destroy(), delete b[h[e]])
                    }, b !== w && a.hasRendered && f ? f : 0)
                });
                r && (r[r.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(r.strokeWidth())
                }), r.isPlaced = !0, r[F ?
                    "show" : "hide"](F));
                u && F && (f = b.getTitlePosition(), l(f.y) ? (u[u.isNew ? "attr" : "animate"](f), u.isNew = !1) : (u.attr("y", -9999), u.isNew = !0));
                n && n.enabled && b.stacking && b.stacking.renderStackTotals();
                b.isDirty = !1;
                C(this, "afterRender")
            };
            e.prototype.redraw = function () {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function (b) {
                    b.render()
                }));
                this.series.forEach(function (b) {
                    b.isDirty = !0
                })
            };
            e.prototype.getKeepProps = function () {
                return this.keepProps || e.keepProps
            };
            e.prototype.destroy = function (b) {
                var a = this,
                    e = a.plotLinesAndBands,
                    f;
                C(this, "destroy", {
                    keepEvents: b
                });
                b || P(a);
                [a.ticks, a.minorTicks, a.alternateBands].forEach(function (b) {
                    K(b)
                });
                if (e)
                    for (b = e.length; b--;) e[b].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                for (f in a.plotLinesAndBandsGroups) a.plotLinesAndBandsGroups[f] = a.plotLinesAndBandsGroups[f].destroy();
                A(a, function (b, e) {
                    -1 === a.getKeepProps().indexOf(e) && delete a[e]
                })
            };
            e.prototype.drawCrosshair = function (b,
                a) {
                var e = this.crosshair,
                    h = u(e.snap, !0),
                    f, d = this.cross,
                    k = this.chart;
                C(this, "drawCrosshair", {
                    e: b,
                    point: a
                });
                b || (b = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (v(a) || !h)) {
                    h ? v(a) && (f = u("colorAxis" !== this.coll ? a.crosshairPos : null, this.isXAxis ? a.plotX : this.len - a.plotY)) : f = b && (this.horiz ? b.chartX - this.pos : this.len - b.chartY + this.pos);
                    if (v(f)) {
                        var c = {
                            value: a && (this.isXAxis ? a.x : u(a.stackY, a.y)),
                            translatedValue: f
                        };
                        k.polar && r(c, {
                            isCrosshair: !0,
                            chartX: b && b.chartX,
                            chartY: b && b.chartY,
                            point: a
                        });
                        c = this.getPlotLinePath(c) ||
                            null
                    }
                    if (!v(c)) {
                        this.hideCrosshair();
                        return
                    }
                    h = this.categories && !this.isRadial;
                    d || (this.cross = d = k.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (h ? "category " : "thin ") + e.className).attr({
                        zIndex: u(e.zIndex, 2)
                    }).add(), k.styledMode || (d.attr({
                        stroke: e.color || (h ? g.parse("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": u(e.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), e.dashStyle && d.attr({
                        dashstyle: e.dashStyle
                    })));
                    d.show().attr({
                        d: c
                    });
                    h && !e.width && d.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = b
                } else this.hideCrosshair();
                C(this, "afterDrawCrosshair", {
                    e: b,
                    point: a
                })
            };
            e.prototype.hideCrosshair = function () {
                this.cross && this.cross.hide();
                C(this, "afterHideCrosshair")
            };
            e.prototype.hasVerticalPanning = function () {
                var b, a;
                return /y/.test((null === (a = null === (b = this.chart.options.chart) || void 0 === b ? void 0 : b.panning) || void 0 === a ? void 0 : a.type) || "")
            };
            e.defaultOptions = {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            };
            e.defaultYAxisOptions = {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function () {
                        var b = this.axis.chart.numberFormatter;
                        return b(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            };
            e.defaultLeftAxisOptions = {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            };
            e.defaultRightAxisOptions = {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            };
            e.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            e.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            e.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return e
        }();
        c.Axis = y;
        return c.Axis
    });
    O(q, "parts/DateTimeAxis.js", [q["parts/Axis.js"], q["parts/Utilities.js"]],
        function (g, c) {
            var q = c.addEvent,
                y = c.getMagnitude,
                B = c.normalizeTickInterval,
                H = c.timeUnits,
                D = function () {
                    function c(c) {
                        this.axis = c
                    }
                    c.prototype.normalizeTimeTickInterval = function (c, g) {
                        var t = g || [
                            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                            ["second", [1, 2, 5, 10, 15, 30]],
                            ["minute", [1, 2, 5, 10, 15, 30]],
                            ["hour", [1, 2, 3, 4, 6, 8, 12]],
                            ["day", [1, 2]],
                            ["week", [1, 2]],
                            ["month", [1, 2, 3, 4, 6]],
                            ["year", null]
                        ];
                        g = t[t.length - 1];
                        var v = H[g[0]],
                            q = g[1],
                            n;
                        for (n = 0; n < t.length && !(g = t[n], v = H[g[0]], q = g[1], t[n + 1] && c <= (v * q[q.length - 1] + H[t[n +
                                1][0]]) / 2); n++);
                        v === H.year && c < 5 * v && (q = [1, 2, 5]);
                        c = B(c / v, q, "year" === g[0] ? Math.max(y(c / v), 1) : 1);
                        return {
                            unitRange: v,
                            count: c,
                            unitName: g[0]
                        }
                    };
                    return c
                }();
            c = function () {
                function c() {}
                c.compose = function (c) {
                    c.keepProps.push("dateTime");
                    c.prototype.getTimeTicks = function () {
                        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
                    };
                    q(c, "init", function (c) {
                        "datetime" !== c.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new D(this))
                    })
                };
                c.AdditionsClass = D;
                return c
            }();
            c.compose(g);
            return c
        });
    O(q, "parts/LogarithmicAxis.js", [q["parts/Axis.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = c.addEvent,
            y = c.getMagnitude,
            B = c.normalizeTickInterval,
            H = c.pick,
            D = function () {
                function c(c) {
                    this.axis = c
                }
                c.prototype.getLogTickPositions = function (c, g, q, v) {
                    var t = this.axis,
                        n = t.len,
                        r = t.options,
                        C = [];
                    v || (this.minorAutoInterval = void 0);
                    if (.5 <= c) c = Math.round(c), C = t.getLinearTickPositions(c, g, q);
                    else if (.08 <= c) {
                        r = Math.floor(g);
                        var I, p;
                        for (n = .3 < c ? [1, 2, 4] : .15 < c ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; r < q + 1 && !p; r++) {
                            var m =
                                n.length;
                            for (I = 0; I < m && !p; I++) {
                                var d = this.log2lin(this.lin2log(r) * n[I]);
                                d > g && (!v || l <= q) && "undefined" !== typeof l && C.push(l);
                                l > q && (p = !0);
                                var l = d
                            }
                        }
                    } else g = this.lin2log(g), q = this.lin2log(q), c = v ? t.getMinorTickInterval() : r.tickInterval, c = H("auto" === c ? null : c, this.minorAutoInterval, r.tickPixelInterval / (v ? 5 : 1) * (q - g) / ((v ? n / t.tickPositions.length : n) || 1)), c = B(c, void 0, y(c)), C = t.getLinearTickPositions(c, g, q).map(this.log2lin), v || (this.minorAutoInterval = c / 5);
                    v || (t.tickInterval = c);
                    return C
                };
                c.prototype.lin2log = function (c) {
                    return Math.pow(10,
                        c)
                };
                c.prototype.log2lin = function (c) {
                    return Math.log(c) / Math.LN10
                };
                return c
            }();
        c = function () {
            function c() {}
            c.compose = function (c) {
                c.keepProps.push("logarithmic");
                var g = c.prototype,
                    t = D.prototype;
                g.log2lin = t.log2lin;
                g.lin2log = t.lin2log;
                q(c, "init", function (c) {
                    var g = this.logarithmic;
                    "logarithmic" !== c.userOptions.type ? this.logarithmic = void 0 : (g || (g = this.logarithmic = new D(this)), this.log2lin !== g.log2lin && (g.log2lin = this.log2lin.bind(this)), this.lin2log !== g.lin2log && (g.lin2log = this.lin2log.bind(this)))
                });
                q(c,
                    "afterInit",
                    function () {
                        var c = this.logarithmic;
                        c && (this.lin2val = function (g) {
                            return c.lin2log(g)
                        }, this.val2lin = function (g) {
                            return c.log2lin(g)
                        })
                    })
            };
            return c
        }();
        c.compose(g);
        return c
    });
    O(q, "parts/PlotLineOrBand.js", [q["parts/Axis.js"], q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c, q) {
        var y = q.arrayMax,
            B = q.arrayMin,
            H = q.defined,
            D = q.destroyObjectProperties,
            J = q.erase,
            t = q.extend,
            G = q.merge,
            L = q.objectEach,
            v = q.pick,
            K = function () {
                function n(c, n) {
                    this.axis = c;
                    n && (this.options = n, this.id = n.id)
                }
                n.prototype.render =
                    function () {
                        c.fireEvent(this, "render");
                        var n = this,
                            g = n.axis,
                            t = g.horiz,
                            p = g.logarithmic,
                            m = n.options,
                            d = m.label,
                            l = n.label,
                            k = m.to,
                            f = m.from,
                            a = m.value,
                            A = H(f) && H(k),
                            u = H(a),
                            E = n.svgElem,
                            P = !E,
                            w = [],
                            M = m.color,
                            F = v(m.zIndex, 0),
                            q = m.events;
                        w = {
                            "class": "highcharts-plot-" + (A ? "band " : "line ") + (m.className || "")
                        };
                        var e = {},
                            b = g.chart.renderer,
                            h = A ? "bands" : "lines";
                        p && (f = p.log2lin(f), k = p.log2lin(k), a = p.log2lin(a));
                        g.chart.styledMode || (u ? (w.stroke = M || "#999999", w["stroke-width"] = v(m.width, 1), m.dashStyle && (w.dashstyle = m.dashStyle)) :
                            A && (w.fill = M || "#e6ebf5", m.borderWidth && (w.stroke = m.borderColor, w["stroke-width"] = m.borderWidth)));
                        e.zIndex = F;
                        h += "-" + F;
                        (p = g.plotLinesAndBandsGroups[h]) || (g.plotLinesAndBandsGroups[h] = p = b.g("plot-" + h).attr(e).add());
                        P && (n.svgElem = E = b.path().attr(w).add(p));
                        if (u) w = g.getPlotLinePath({
                            value: a,
                            lineWidth: E.strokeWidth(),
                            acrossPanes: m.acrossPanes
                        });
                        else if (A) w = g.getPlotBandPath(f, k, m);
                        else return;
                        !n.eventsAdded && q && (L(q, function (b, a) {
                            E.on(a, function (b) {
                                q[a].apply(n, [b])
                            })
                        }), n.eventsAdded = !0);
                        (P || !E.d) && w &&
                            w.length ? E.attr({
                                d: w
                            }) : E && (w ? (E.show(!0), E.animate({
                                d: w
                            })) : E.d && (E.hide(), l && (n.label = l = l.destroy())));
                        d && (H(d.text) || H(d.formatter)) && w && w.length && 0 < g.width && 0 < g.height && !w.isFlat ? (d = G({
                            align: t && A && "center",
                            x: t ? !A && 4 : 10,
                            verticalAlign: !t && A && "middle",
                            y: t ? A ? 16 : 10 : A ? 6 : -4,
                            rotation: t && !A && 90
                        }, d), this.renderLabel(d, w, A, F)) : l && l.hide();
                        return n
                    };
                n.prototype.renderLabel = function (c, n, g, p) {
                    var m = this.label,
                        d = this.axis.chart.renderer;
                    m || (m = {
                        align: c.textAlign || c.align,
                        rotation: c.rotation,
                        "class": "highcharts-plot-" +
                            (g ? "band" : "line") + "-label " + (c.className || "")
                    }, m.zIndex = p, p = this.getLabelText(c), this.label = m = d.text(p, 0, 0, c.useHTML).attr(m).add(), this.axis.chart.styledMode || m.css(c.style));
                    d = n.xBounds || [n[0][1], n[1][1], g ? n[2][1] : n[0][1]];
                    n = n.yBounds || [n[0][2], n[1][2], g ? n[2][2] : n[0][2]];
                    g = B(d);
                    p = B(n);
                    m.align(c, !1, {
                        x: g,
                        y: p,
                        width: y(d) - g,
                        height: y(n) - p
                    });
                    m.show(!0)
                };
                n.prototype.getLabelText = function (c) {
                    return H(c.formatter) ? c.formatter.call(this) : c.text
                };
                n.prototype.destroy = function () {
                    J(this.axis.plotLinesAndBands,
                        this);
                    delete this.axis;
                    D(this)
                };
                return n
            }();
        t(g.prototype, {
            getPlotBandPath: function (c, g) {
                var n = this.getPlotLinePath({
                        value: g,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    r = this.getPlotLinePath({
                        value: c,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    p = [],
                    m = this.horiz,
                    d = 1;
                c = c < this.min && g < this.min || c > this.max && g > this.max;
                if (r && n) {
                    if (c) {
                        var l = r.toString() === n.toString();
                        d = 0
                    }
                    for (c = 0; c < r.length; c += 2) {
                        g = r[c];
                        var k = r[c + 1],
                            f = n[c],
                            a = n[c + 1];
                        "M" !== g[0] && "L" !== g[0] || "M" !== k[0] && "L" !== k[0] || "M" !== f[0] && "L" !==
                            f[0] || "M" !== a[0] && "L" !== a[0] || (m && f[1] === g[1] ? (f[1] += d, a[1] += d) : m || f[2] !== g[2] || (f[2] += d, a[2] += d), p.push(["M", g[1], g[2]], ["L", k[1], k[2]], ["L", a[1], a[2]], ["L", f[1], f[2]], ["Z"]));
                        p.isFlat = l
                    }
                }
                return p
            },
            addPlotBand: function (c) {
                return this.addPlotBandOrLine(c, "plotBands")
            },
            addPlotLine: function (c) {
                return this.addPlotBandOrLine(c, "plotLines")
            },
            addPlotBandOrLine: function (c, g) {
                var n = (new K(this, c)).render(),
                    r = this.userOptions;
                if (n) {
                    if (g) {
                        var p = r[g] || [];
                        p.push(c);
                        r[g] = p
                    }
                    this.plotLinesAndBands.push(n);
                    this._addedPlotLB = !0
                }
                return n
            },
            removePlotBandOrLine: function (c) {
                for (var n = this.plotLinesAndBands, g = this.options, t = this.userOptions, p = n.length; p--;) n[p].id === c && n[p].destroy();
                [g.plotLines || [], t.plotLines || [], g.plotBands || [], t.plotBands || []].forEach(function (m) {
                    for (p = m.length; p--;)(m[p] || {}).id === c && J(m, m[p])
                })
            },
            removePlotBand: function (c) {
                this.removePlotBandOrLine(c)
            },
            removePlotLine: function (c) {
                this.removePlotBandOrLine(c)
            }
        });
        c.PlotLineOrBand = K;
        return c.PlotLineOrBand
    });
    O(q, "parts/Tooltip.js", [q["parts/Globals.js"],
        q["parts/Utilities.js"]
    ], function (g, c) {
        var q = g.doc,
            y = c.clamp,
            B = c.css,
            H = c.defined,
            D = c.discardElement,
            J = c.extend,
            t = c.fireEvent,
            G = c.format,
            L = c.isNumber,
            v = c.isString,
            K = c.merge,
            n = c.pick,
            r = c.splat,
            C = c.syncTimeout,
            I = c.timeUnits;
        "";
        var p = function () {
            function m(d, c) {
                this.container = void 0;
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = d;
                this.init(d, c)
            }
            m.prototype.applyFilter = function () {
                var d = this.chart;
                d.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + d.index,
                    opacity: .5,
                    children: [{
                        tagName: "feGaussianBlur",
                        "in": "SourceAlpha",
                        stdDeviation: 1
                    }, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            type: "linear",
                            slope: .3
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            "in": "SourceGraphic"
                        }]
                    }]
                });
                d.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + d.index + "{filter:url(#drop-shadow-" + d.index + ")}"
                })
            };
            m.prototype.bodyFormatter = function (d) {
                return d.map(function (d) {
                    var k =
                        d.series.tooltipOptions;
                    return (k[(d.point.formatPrefix || "point") + "Formatter"] || d.point.tooltipFormatter).call(d.point, k[(d.point.formatPrefix || "point") + "Format"] || "")
                })
            };
            m.prototype.cleanSplit = function (d) {
                this.chart.series.forEach(function (c) {
                    var k = c && c.tt;
                    k && (!k.isActive || d ? c.tt = k.destroy() : k.isActive = !1)
                })
            };
            m.prototype.defaultFormatter = function (d) {
                var c = this.points || r(this);
                var k = [d.tooltipFooterHeaderFormatter(c[0])];
                k = k.concat(d.bodyFormatter(c));
                k.push(d.tooltipFooterHeaderFormatter(c[0], !0));
                return k
            };
            m.prototype.destroy = function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), D(this.container));
                c.clearTimeout(this.hideTimer);
                c.clearTimeout(this.tooltipTimeout)
            };
            m.prototype.getAnchor = function (d, c) {
                var k = this.chart,
                    f = k.pointer,
                    a = k.inverted,
                    l = k.plotTop,
                    u = k.plotLeft,
                    m = 0,
                    p = 0,
                    w, n;
                d = r(d);
                this.followPointer && c ? ("undefined" === typeof c.chartX && (c = f.normalize(c)),
                    d = [c.chartX - u, c.chartY - l]) : d[0].tooltipPos ? d = d[0].tooltipPos : (d.forEach(function (f) {
                    w = f.series.yAxis;
                    n = f.series.xAxis;
                    m += f.plotX + (!a && n ? n.left - u : 0);
                    p += (f.plotLow ? (f.plotLow + f.plotHigh) / 2 : f.plotY) + (!a && w ? w.top - l : 0)
                }), m /= d.length, p /= d.length, d = [a ? k.plotWidth - p : m, this.shared && !a && 1 < d.length && c ? c.chartY - l : a ? k.plotHeight - m : p]);
                return d.map(Math.round)
            };
            m.prototype.getDateFormat = function (d, c, k, f) {
                var a = this.chart.time,
                    l = a.dateFormat("%m-%d %H:%M:%S.%L", c),
                    u = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    m = "millisecond";
                for (p in I) {
                    if (d === I.week && +a.dateFormat("%w", c) === k && "00:00:00.000" === l.substr(6)) {
                        var p = "week";
                        break
                    }
                    if (I[p] > d) {
                        p = m;
                        break
                    }
                    if (u[p] && l.substr(u[p]) !== "01-01 00:00:00.000".substr(u[p])) break;
                    "week" !== p && (m = p)
                }
                if (p) var w = a.resolveDTLFormat(f[p]).main;
                return w
            };
            m.prototype.getLabel = function () {
                var d, c, k = this,
                    f = this.chart.renderer,
                    a = this.chart.styledMode,
                    m = this.options,
                    u = "tooltip" + (H(m.className) ? " " + m.className : ""),
                    p = (null === (d = m.style) || void 0 === d ? void 0 : d.pointerEvents) || (!this.followPointer &&
                        m.stickOnContact ? "auto" : "none"),
                    n;
                d = function () {
                    k.inContact = !0
                };
                var w = function () {
                    var a = k.chart.hoverSeries;
                    k.inContact = !1;
                    if (a && a.onMouseOut) a.onMouseOut()
                };
                if (!this.label) {
                    this.outside && (this.container = n = g.doc.createElement("div"), n.className = "highcharts-tooltip-container", B(n, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: p,
                        zIndex: 3
                    }), g.doc.body.appendChild(n), this.renderer = f = new g.Renderer(n, 0, 0, null === (c = this.chart.options.chart) || void 0 === c ? void 0 : c.style, void 0, void 0, f.styledMode));
                    this.split ?
                        this.label = f.g(u) : (this.label = f.label("", 0, 0, m.shape || "callout", null, null, m.useHTML, null, u).attr({
                            padding: m.padding,
                            r: m.borderRadius
                        }), a || this.label.attr({
                            fill: m.backgroundColor,
                            "stroke-width": m.borderWidth
                        }).css(m.style).css({
                            pointerEvents: p
                        }).shadow(m.shadow));
                    a && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
                    if (k.outside && !k.split) {
                        var r = this.label,
                            F = r.xSetter,
                            t = r.ySetter;
                        r.xSetter = function (a) {
                            F.call(r, k.distance);
                            n.style.left = a + "px"
                        };
                        r.ySetter = function (a) {
                            t.call(r,
                                k.distance);
                            n.style.top = a + "px"
                        }
                    }
                    this.label.on("mouseenter", d).on("mouseleave", w).attr({
                        zIndex: 8
                    }).add()
                }
                return this.label
            };
            m.prototype.getPosition = function (d, c, k) {
                var f = this.chart,
                    a = this.distance,
                    l = {},
                    m = f.inverted && k.h || 0,
                    p, g = this.outside,
                    w = g ? q.documentElement.clientWidth - 2 * a : f.chartWidth,
                    r = g ? Math.max(q.body.scrollHeight, q.documentElement.scrollHeight, q.body.offsetHeight, q.documentElement.offsetHeight, q.documentElement.clientHeight) : f.chartHeight,
                    F = f.pointer.getChartPosition(),
                    t = f.containerScaling,
                    e = function (b) {
                        return t ? b * t.scaleX : b
                    },
                    b = function (b) {
                        return t ? b * t.scaleY : b
                    },
                    h = function (h) {
                        var l = "x" === h;
                        return [h, l ? w : r, l ? d : c].concat(g ? [l ? e(d) : b(c), l ? F.left - a + e(k.plotX + f.plotLeft) : F.top - a + b(k.plotY + f.plotTop), 0, l ? w : r] : [l ? d : c, l ? k.plotX + f.plotLeft : k.plotY + f.plotTop, l ? f.plotLeft : f.plotTop, l ? f.plotLeft + f.plotWidth : f.plotTop + f.plotHeight])
                    },
                    z = h("y"),
                    x = h("x"),
                    C = !this.followPointer && n(k.ttBelow, !f.inverted === !!k.negative),
                    v = function (h, f, d, c, k, u, p) {
                        var x = "y" === h ? b(a) : e(a),
                            w = (d - c) / 2,
                            n = c < k - a,
                            A = k + a + c < f,
                            g = k - x -
                            d + w;
                        k = k + x - w;
                        if (C && A) l[h] = k;
                        else if (!C && n) l[h] = g;
                        else if (n) l[h] = Math.min(p - c, 0 > g - m ? g : g - m);
                        else if (A) l[h] = Math.max(u, k + m + d > f ? k : k + m);
                        else return !1
                    },
                    I = function (b, e, h, f, d) {
                        var c;
                        d < a || d > e - a ? c = !1 : l[b] = d < h / 2 ? 1 : d > e - f / 2 ? e - f - 2 : d - h / 2;
                        return c
                    },
                    V = function (b) {
                        var a = z;
                        z = x;
                        x = a;
                        p = b
                    },
                    G = function () {
                        !1 !== v.apply(0, z) ? !1 !== I.apply(0, x) || p || (V(!0), G()) : p ? l.x = l.y = 0 : (V(!0), G())
                    };
                (f.inverted || 1 < this.len) && V();
                G();
                return l
            };
            m.prototype.getXDateFormat = function (d, c, k) {
                c = c.dateTimeLabelFormats;
                var f = k && k.closestPointRange;
                return (f ?
                    this.getDateFormat(f, d.x, k.options.startOfWeek, c) : c.day) || c.year
            };
            m.prototype.hide = function (d) {
                var l = this;
                c.clearTimeout(this.hideTimer);
                d = n(d, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = C(function () {
                    l.getLabel().fadeOut(d ? void 0 : d);
                    l.isHidden = !0
                }, d))
            };
            m.prototype.init = function (d, c) {
                this.chart = d;
                this.options = c;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = c.split && !d.inverted && !d.polar;
                this.shared = c.shared || this.split;
                this.outside = n(c.outside, !(!d.scrollablePixelsX &&
                    !d.scrollablePixelsY))
            };
            m.prototype.isStickyOnContact = function () {
                return !(this.followPointer || !this.options.stickOnContact || !this.inContact)
            };
            m.prototype.move = function (d, l, k, f) {
                var a = this,
                    m = a.now,
                    u = !1 !== a.options.animation && !a.isHidden && (1 < Math.abs(d - m.x) || 1 < Math.abs(l - m.y)),
                    p = a.followPointer || 1 < a.len;
                J(m, {
                    x: u ? (2 * m.x + d) / 3 : d,
                    y: u ? (m.y + l) / 2 : l,
                    anchorX: p ? void 0 : u ? (2 * m.anchorX + k) / 3 : k,
                    anchorY: p ? void 0 : u ? (m.anchorY + f) / 2 : f
                });
                a.getLabel().attr(m);
                a.drawTracker();
                u && (c.clearTimeout(this.tooltipTimeout), this.tooltipTimeout =
                    setTimeout(function () {
                        a && a.move(d, l, k, f)
                    }, 32))
            };
            m.prototype.refresh = function (d, l) {
                var k = this.chart,
                    f = this.options,
                    a = d,
                    m = {},
                    u = [],
                    p = f.formatter || this.defaultFormatter;
                m = this.shared;
                var g = k.styledMode;
                if (f.enabled) {
                    c.clearTimeout(this.hideTimer);
                    this.followPointer = r(a)[0].series.tooltipOptions.followPointer;
                    var w = this.getAnchor(a, l);
                    l = w[0];
                    var M = w[1];
                    !m || a.series && a.series.noSharedTooltip ? m = a.getLabelConfig() : (k.pointer.applyInactiveState(a), a.forEach(function (a) {
                            a.setState("hover");
                            u.push(a.getLabelConfig())
                        }),
                        m = {
                            x: a[0].category,
                            y: a[0].y
                        }, m.points = u, a = a[0]);
                    this.len = u.length;
                    k = p.call(m, this);
                    p = a.series;
                    this.distance = n(p.tooltipOptions.distance, 16);
                    !1 === k ? this.hide() : (this.split ? this.renderSplit(k, r(d)) : (d = this.getLabel(), f.style.width && !g || d.css({
                        width: this.chart.spacingBox.width + "px"
                    }), d.attr({
                        text: k && k.join ? k.join("") : k
                    }), d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + n(a.colorIndex, p.colorIndex)), g || d.attr({
                        stroke: f.borderColor || a.color || p.color || "#666666"
                    }), this.updatePosition({
                        plotX: l,
                        plotY: M,
                        negative: a.negative,
                        ttBelow: a.ttBelow,
                        h: w[2] || 0
                    })), this.isHidden && this.label && this.label.attr({
                        opacity: 1
                    }).show(), this.isHidden = !1);
                    t(this, "refresh")
                }
            };
            m.prototype.renderSplit = function (d, c) {
                function k(b, a, e, h, f) {
                    void 0 === f && (f = !0);
                    e ? (a = V ? 0 : D, b = y(b - h / 2, q.left, q.right - h)) : (a -= G, b = f ? b - h - z : b + z, b = y(b, f ? b : q.left, q.right));
                    return {
                        x: b,
                        y: a
                    }
                }
                var f = this,
                    a = f.chart,
                    l = f.chart,
                    m = l.plotHeight,
                    p = l.plotLeft,
                    r = l.plotTop,
                    w = l.pointer,
                    M = l.renderer,
                    F = l.scrollablePixelsY,
                    t = void 0 === F ? 0 : F;
                F = l.scrollingContainer;
                F =
                    void 0 === F ? {
                        scrollLeft: 0,
                        scrollTop: 0
                    } : F;
                var e = F.scrollLeft,
                    b = F.scrollTop,
                    h = l.styledMode,
                    z = f.distance,
                    x = f.options,
                    C = f.options.positioner,
                    q = {
                        left: e,
                        right: e + l.chartWidth,
                        top: b,
                        bottom: b + l.chartHeight
                    },
                    I = f.getLabel(),
                    V = !(!a.xAxis[0] || !a.xAxis[0].opposite),
                    G = r + b,
                    K = 0,
                    D = m - t;
                v(d) && (d = [!1, d]);
                d = d.slice(0, c.length + 1).reduce(function (a, e, d) {
                    if (!1 !== e && "" !== e) {
                        d = c[d - 1] || {
                            isHeader: !0,
                            plotX: c[0].plotX,
                            plotY: m,
                            series: {}
                        };
                        var l = d.isHeader,
                            u = l ? f : d.series,
                            w = u.tt,
                            g = d.isHeader;
                        var A = d.series;
                        var E = "highcharts-color-" +
                            n(d.colorIndex, A.colorIndex, "none");
                        w || (w = {
                            padding: x.padding,
                            r: x.borderRadius
                        }, h || (w.fill = x.backgroundColor, w["stroke-width"] = x.borderWidth), w = M.label("", 0, 0, x[g ? "headerShape" : "shape"] || "callout", void 0, void 0, x.useHTML).addClass((g ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + E).attr(w).add(I));
                        w.isActive = !0;
                        w.attr({
                            text: e
                        });
                        h || w.css(x.style).shadow(x.shadow).attr({
                            stroke: x.borderColor || d.color || A.color || "#333333"
                        });
                        e = u.tt = w;
                        g = e.getBBox();
                        u = g.width + e.strokeWidth();
                        l && (K = g.height, D +=
                            K, V && (G -= K));
                        A = d.plotX;
                        A = void 0 === A ? 0 : A;
                        E = d.plotY;
                        E = void 0 === E ? 0 : E;
                        var F = d.series;
                        if (d.isHeader) {
                            A = p + A;
                            var S = r + m / 2
                        } else w = F.xAxis, F = F.yAxis, A = w.pos + y(A, -z, w.len + z), F.pos + E >= b + r && F.pos + E <= b + r + m - t && (S = F.pos + E);
                        A = y(A, q.left - z, q.right + z);
                        "number" === typeof S ? (g = g.height + 1, E = C ? C.call(f, u, g, d) : k(A, S, l, u), a.push({
                            align: C ? 0 : void 0,
                            anchorX: A,
                            anchorY: S,
                            boxWidth: u,
                            point: d,
                            rank: n(E.rank, l ? 1 : 0),
                            size: g,
                            target: E.y,
                            tt: e,
                            x: E.x
                        })) : e.isActive = !1
                    }
                    return a
                }, []);
                !C && d.some(function (b) {
                    return b.x < q.left
                }) && (d = d.map(function (b) {
                    var a =
                        k(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
                    return J(b, {
                        target: a.y,
                        x: a.x
                    })
                }));
                f.cleanSplit();
                g.distribute(d, D);
                d.forEach(function (b) {
                    var a = b.pos;
                    b.tt.attr({
                        visibility: "undefined" === typeof a ? "hidden" : "inherit",
                        x: b.x,
                        y: a + G,
                        anchorX: b.anchorX,
                        anchorY: b.anchorY
                    })
                });
                d = f.container;
                a = f.renderer;
                f.outside && d && a && (l = I.getBBox(), a.setSize(l.width + l.x, l.height + l.y, !1), w = w.getChartPosition(), d.style.left = w.left + "px", d.style.top = w.top + "px")
            };
            m.prototype.drawTracker = function () {
                if (this.followPointer || !this.options.stickOnContact) this.tracker &&
                    this.tracker.destroy();
                else {
                    var d = this.chart,
                        c = this.label,
                        k = d.hoverPoint;
                    if (c && k) {
                        var f = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        };
                        k = this.getAnchor(k);
                        var a = c.getBBox();
                        k[0] += d.plotLeft - c.translateX;
                        k[1] += d.plotTop - c.translateY;
                        f.x = Math.min(0, k[0]);
                        f.y = Math.min(0, k[1]);
                        f.width = 0 > k[0] ? Math.max(Math.abs(k[0]), a.width - k[0]) : Math.max(Math.abs(k[0]), a.width);
                        f.height = 0 > k[1] ? Math.max(Math.abs(k[1]), a.height - Math.abs(k[1])) : Math.max(Math.abs(k[1]), a.height);
                        this.tracker ? this.tracker.attr(f) : (this.tracker = c.renderer.rect(f).addClass("highcharts-tracker").add(c),
                            d.styledMode || this.tracker.attr({
                                fill: "rgba(0,0,0,0)"
                            }))
                    }
                }
            };
            m.prototype.styledModeFormat = function (d) {
                return d.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
            };
            m.prototype.tooltipFooterHeaderFormatter = function (d, c) {
                var k = c ? "footer" : "header",
                    f = d.series,
                    a = f.tooltipOptions,
                    l = a.xDateFormat,
                    m = f.xAxis,
                    p = m && "datetime" === m.options.type && L(d.key),
                    n = a[k + "Format"];
                c = {
                    isFooter: c,
                    labelConfig: d
                };
                t(this, "headerFormatter",
                    c,
                    function (c) {
                        p && !l && (l = this.getXDateFormat(d, a, m));
                        p && l && (d.point && d.point.tooltipDateKeys || ["key"]).forEach(function (a) {
                            n = n.replace("{point." + a + "}", "{point." + a + ":" + l + "}")
                        });
                        f.chart.styledMode && (n = this.styledModeFormat(n));
                        c.text = G(n, {
                            point: d,
                            series: f
                        }, this.chart)
                    });
                return c.text
            };
            m.prototype.update = function (d) {
                this.destroy();
                K(!0, this.chart.options.tooltip.userOptions, d);
                this.init(this.chart, K(!0, this.options, d))
            };
            m.prototype.updatePosition = function (d) {
                var c = this.chart,
                    k = c.pointer,
                    f = this.getLabel(),
                    a = d.plotX + c.plotLeft,
                    m = d.plotY + c.plotTop;
                k = k.getChartPosition();
                d = (this.options.positioner || this.getPosition).call(this, f.width, f.height, d);
                if (this.outside) {
                    var p = (this.options.borderWidth || 0) + 2 * this.distance;
                    this.renderer.setSize(f.width + p, f.height + p, !1);
                    if (c = c.containerScaling) B(this.container, {
                        transform: "scale(" + c.scaleX + ", " + c.scaleY + ")"
                    }), a *= c.scaleX, m *= c.scaleY;
                    a += k.left - d.x;
                    m += k.top - d.y
                }
                this.move(Math.round(d.x), Math.round(d.y || 0), a, m)
            };
            return m
        }();
        g.Tooltip = p;
        return g.Tooltip
    });
    O(q, "parts/Pointer.js",
        [q["parts/Color.js"], q["parts/Globals.js"], q["parts/Tooltip.js"], q["parts/Utilities.js"]],
        function (g, c, q, y) {
            var B = g.parse,
                H = c.charts,
                D = c.noop,
                J = y.addEvent,
                t = y.attr,
                G = y.css,
                L = y.defined,
                v = y.extend,
                K = y.find,
                n = y.fireEvent,
                r = y.isNumber,
                C = y.isObject,
                I = y.objectEach,
                p = y.offset,
                m = y.pick,
                d = y.splat;
            "";
            g = function () {
                function l(d, f) {
                    this.lastValidTouch = {};
                    this.pinchDown = [];
                    this.runChartClick = !1;
                    this.chart = d;
                    this.hasDragged = !1;
                    this.options = f;
                    this.unbindContainerMouseLeave = function () {};
                    this.init(d, f)
                }
                l.prototype.applyInactiveState =
                    function (d) {
                        var f = [],
                            a;
                        (d || []).forEach(function (d) {
                            a = d.series;
                            f.push(a);
                            a.linkedParent && f.push(a.linkedParent);
                            a.linkedSeries && (f = f.concat(a.linkedSeries));
                            a.navigatorSeries && f.push(a.navigatorSeries)
                        });
                        this.chart.series.forEach(function (a) {
                            -1 === f.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
                        })
                    };
                l.prototype.destroy = function () {
                    var d = this;
                    "undefined" !== typeof d.unDocMouseMove && d.unDocMouseMove();
                    this.unbindContainerMouseLeave();
                    c.chartCount || (c.unbindDocumentMouseUp &&
                        (c.unbindDocumentMouseUp = c.unbindDocumentMouseUp()), c.unbindDocumentTouchEnd && (c.unbindDocumentTouchEnd = c.unbindDocumentTouchEnd()));
                    clearInterval(d.tooltipTimeout);
                    I(d, function (f, a) {
                        d[a] = void 0
                    })
                };
                l.prototype.drag = function (d) {
                    var f = this.chart,
                        a = f.options.chart,
                        c = d.chartX,
                        k = d.chartY,
                        l = this.zoomHor,
                        m = this.zoomVert,
                        p = f.plotLeft,
                        n = f.plotTop,
                        g = f.plotWidth,
                        r = f.plotHeight,
                        e = this.selectionMarker,
                        b = this.mouseDownX || 0,
                        h = this.mouseDownY || 0,
                        z = C(a.panning) ? a.panning && a.panning.enabled : a.panning,
                        x = a.panKey && d[a.panKey +
                            "Key"];
                    if (!e || !e.touch)
                        if (c < p ? c = p : c > p + g && (c = p + g), k < n ? k = n : k > n + r && (k = n + r), this.hasDragged = Math.sqrt(Math.pow(b - c, 2) + Math.pow(h - k, 2)), 10 < this.hasDragged) {
                            var t = f.isInsidePlot(b - p, h - n);
                            f.hasCartesianSeries && (this.zoomX || this.zoomY) && t && !x && !e && (this.selectionMarker = e = f.renderer.rect(p, n, l ? 1 : g, m ? 1 : r, 0).attr({
                                "class": "highcharts-selection-marker",
                                zIndex: 7
                            }).add(), f.styledMode || e.attr({
                                fill: a.selectionMarkerFill || B("#335cad").setOpacity(.25).get()
                            }));
                            e && l && (c -= b, e.attr({
                                width: Math.abs(c),
                                x: (0 < c ? 0 : c) + b
                            }));
                            e && m && (c = k - h, e.attr({
                                height: Math.abs(c),
                                y: (0 < c ? 0 : c) + h
                            }));
                            t && !e && z && f.pan(d, a.panning)
                        }
                };
                l.prototype.dragStart = function (d) {
                    var f = this.chart;
                    f.mouseIsDown = d.type;
                    f.cancelClick = !1;
                    f.mouseDownX = this.mouseDownX = d.chartX;
                    f.mouseDownY = this.mouseDownY = d.chartY
                };
                l.prototype.drop = function (d) {
                    var f = this,
                        a = this.chart,
                        c = this.hasPinched;
                    if (this.selectionMarker) {
                        var k = {
                                originalEvent: d,
                                xAxis: [],
                                yAxis: []
                            },
                            l = this.selectionMarker,
                            m = l.attr ? l.attr("x") : l.x,
                            p = l.attr ? l.attr("y") : l.y,
                            g = l.attr ? l.attr("width") : l.width,
                            F = l.attr ?
                            l.attr("height") : l.height,
                            t;
                        if (this.hasDragged || c) a.axes.forEach(function (a) {
                            if (a.zoomEnabled && L(a.min) && (c || f[{
                                    xAxis: "zoomX",
                                    yAxis: "zoomY"
                                } [a.coll]]) && r(m) && r(p)) {
                                var b = a.horiz,
                                    e = "touchend" === d.type ? a.minPixelPadding : 0,
                                    l = a.toValue((b ? m : p) + e);
                                b = a.toValue((b ? m + g : p + F) - e);
                                k[a.coll].push({
                                    axis: a,
                                    min: Math.min(l, b),
                                    max: Math.max(l, b)
                                });
                                t = !0
                            }
                        }), t && n(a, "selection", k, function (e) {
                            a.zoom(v(e, c ? {
                                animation: !1
                            } : null))
                        });
                        r(a.index) && (this.selectionMarker = this.selectionMarker.destroy());
                        c && this.scaleGroups()
                    }
                    a && r(a.index) &&
                        (G(a.container, {
                            cursor: a._cursor
                        }), a.cancelClick = 10 < this.hasDragged, a.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                };
                l.prototype.findNearestKDPoint = function (d, f, a) {
                    var c = this.chart,
                        k = c.hoverPoint;
                    c = c.tooltip;
                    if (k && c && c.isStickyOnContact()) return k;
                    var l;
                    d.forEach(function (d) {
                        var c = !(d.noSharedTooltip && f) && 0 > d.options.findNearestPointBy.indexOf("y");
                        d = d.searchPoint(a, c);
                        if ((c = C(d, !0)) && !(c = !C(l, !0))) {
                            c = l.distX - d.distX;
                            var k = l.dist - d.dist,
                                m = (d.series.group && d.series.group.zIndex) -
                                (l.series.group && l.series.group.zIndex);
                            c = 0 < (0 !== c && f ? c : 0 !== k ? k : 0 !== m ? m : l.series.index > d.series.index ? -1 : 1)
                        }
                        c && (l = d)
                    });
                    return l
                };
                l.prototype.getChartCoordinatesFromPoint = function (d, f) {
                    var a = d.series,
                        c = a.xAxis;
                    a = a.yAxis;
                    var k = m(d.clientX, d.plotX),
                        l = d.shapeArgs;
                    if (c && a) return f ? {
                        chartX: c.len + c.pos - k,
                        chartY: a.len + a.pos - d.plotY
                    } : {
                        chartX: k + c.pos,
                        chartY: d.plotY + a.pos
                    };
                    if (l && l.x && l.y) return {
                        chartX: l.x,
                        chartY: l.y
                    }
                };
                l.prototype.getChartPosition = function () {
                    return this.chartPosition || (this.chartPosition = p(this.chart.container))
                };
                l.prototype.getCoordinates = function (d) {
                    var f = {
                        xAxis: [],
                        yAxis: []
                    };
                    this.chart.axes.forEach(function (a) {
                        f[a.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: a,
                            value: a.toValue(d[a.horiz ? "chartX" : "chartY"])
                        })
                    });
                    return f
                };
                l.prototype.getHoverData = function (d, f, a, c, l, p) {
                    var k, u = [];
                    c = !(!c || !d);
                    var g = f && !f.stickyTracking,
                        A = {
                            chartX: p ? p.chartX : void 0,
                            chartY: p ? p.chartY : void 0,
                            shared: l
                        };
                    n(this, "beforeGetHoverData", A);
                    g = g ? [f] : a.filter(function (a) {
                        return A.filter ? A.filter(a) : a.visible && !(!l && a.directTouch) && m(a.options.enableMouseTracking,
                            !0) && a.stickyTracking
                    });
                    f = (k = c || !p ? d : this.findNearestKDPoint(g, l, p)) && k.series;
                    k && (l && !f.noSharedTooltip ? (g = a.filter(function (a) {
                        return A.filter ? A.filter(a) : a.visible && !(!l && a.directTouch) && m(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                    }), g.forEach(function (a) {
                        var e = K(a.points, function (b) {
                            return b.x === k.x && !b.isNull
                        });
                        C(e) && (a.chart.isBoosting && (e = a.getPoint(e)), u.push(e))
                    })) : u.push(k));
                    A = {
                        hoverPoint: k
                    };
                    n(this, "afterGetHoverData", A);
                    return {
                        hoverPoint: A.hoverPoint,
                        hoverSeries: f,
                        hoverPoints: u
                    }
                };
                l.prototype.getPointFromEvent = function (d) {
                    d = d.target;
                    for (var f; d && !f;) f = d.point, d = d.parentNode;
                    return f
                };
                l.prototype.onTrackerMouseOut = function (d) {
                    d = d.relatedTarget || d.toElement;
                    var f = this.chart.hoverSeries;
                    this.isDirectTouch = !1;
                    if (!(!f || !d || f.stickyTracking || this.inClass(d, "highcharts-tooltip") || this.inClass(d, "highcharts-series-" + f.index) && this.inClass(d, "highcharts-tracker"))) f.onMouseOut()
                };
                l.prototype.inClass = function (d, f) {
                    for (var a; d;) {
                        if (a = t(d, "class")) {
                            if (-1 !== a.indexOf(f)) return !0;
                            if (-1 !==
                                a.indexOf("highcharts-container")) return !1
                        }
                        d = d.parentNode
                    }
                };
                l.prototype.init = function (d, f) {
                    this.options = f;
                    this.chart = d;
                    this.runChartClick = f.chart.events && !!f.chart.events.click;
                    this.pinchDown = [];
                    this.lastValidTouch = {};
                    q && (d.tooltip = new q(d, f.tooltip), this.followTouchMove = m(f.tooltip.followTouchMove, !0));
                    this.setDOMEvents()
                };
                l.prototype.normalize = function (d, f) {
                    var a = d.touches,
                        c = a ? a.length ? a.item(0) : m(a.changedTouches, d.changedTouches)[0] : d;
                    f || (f = this.getChartPosition());
                    a = c.pageX - f.left;
                    f = c.pageY -
                        f.top;
                    if (c = this.chart.containerScaling) a /= c.scaleX, f /= c.scaleY;
                    return v(d, {
                        chartX: Math.round(a),
                        chartY: Math.round(f)
                    })
                };
                l.prototype.onContainerClick = function (d) {
                    var f = this.chart,
                        a = f.hoverPoint;
                    d = this.normalize(d);
                    var c = f.plotLeft,
                        k = f.plotTop;
                    f.cancelClick || (a && this.inClass(d.target, "highcharts-tracker") ? (n(a.series, "click", v(d, {
                        point: a
                    })), f.hoverPoint && a.firePointEvent("click", d)) : (v(d, this.getCoordinates(d)), f.isInsidePlot(d.chartX - c, d.chartY - k) && n(f, "click", d)))
                };
                l.prototype.onContainerMouseDown =
                    function (d) {
                        d = this.normalize(d);
                        if (c.isFirefox && 0 !== d.button) this.onContainerMouseMove(d);
                        if ("undefined" === typeof d.button || 1 === ((d.buttons || d.button) & 1)) this.zoomOption(d), this.dragStart(d)
                    };
                l.prototype.onContainerMouseLeave = function (d) {
                    var f = H[m(c.hoverChartIndex, -1)],
                        a = this.chart.tooltip;
                    d = this.normalize(d);
                    f && (d.relatedTarget || d.toElement) && (f.pointer.reset(), f.pointer.chartPosition = void 0);
                    a && !a.isHidden && this.reset()
                };
                l.prototype.onContainerMouseMove = function (d) {
                    var f = this.chart;
                    d = this.normalize(d);
                    this.setHoverChartIndex();
                    d.preventDefault || (d.returnValue = !1);
                    "mousedown" === f.mouseIsDown && this.drag(d);
                    f.openMenu || !this.inClass(d.target, "highcharts-tracker") && !f.isInsidePlot(d.chartX - f.plotLeft, d.chartY - f.plotTop) || this.runPointActions(d)
                };
                l.prototype.onDocumentTouchEnd = function (d) {
                    H[c.hoverChartIndex] && H[c.hoverChartIndex].pointer.drop(d)
                };
                l.prototype.onContainerTouchMove = function (d) {
                    this.touch(d)
                };
                l.prototype.onContainerTouchStart = function (d) {
                    this.zoomOption(d);
                    this.touch(d, !0)
                };
                l.prototype.onDocumentMouseMove =
                    function (d) {
                        var f = this.chart,
                            a = this.chartPosition;
                        d = this.normalize(d, a);
                        var c = f.tooltip;
                        !a || c && c.isStickyOnContact() || f.isInsidePlot(d.chartX - f.plotLeft, d.chartY - f.plotTop) || this.inClass(d.target, "highcharts-tracker") || this.reset()
                    };
                l.prototype.onDocumentMouseUp = function (d) {
                    var f = H[m(c.hoverChartIndex, -1)];
                    f && f.pointer.drop(d)
                };
                l.prototype.pinch = function (d) {
                    var f = this,
                        a = f.chart,
                        c = f.pinchDown,
                        k = d.touches || [],
                        l = k.length,
                        p = f.lastValidTouch,
                        n = f.hasZoom,
                        g = f.selectionMarker,
                        r = {},
                        t = 1 === l && (f.inClass(d.target,
                            "highcharts-tracker") && a.runTrackerClick || f.runChartClick),
                        e = {};
                    1 < l && (f.initiated = !0);
                    n && f.initiated && !t && d.preventDefault();
                    [].map.call(k, function (b) {
                        return f.normalize(b)
                    });
                    "touchstart" === d.type ? ([].forEach.call(k, function (b, a) {
                        c[a] = {
                            chartX: b.chartX,
                            chartY: b.chartY
                        }
                    }), p.x = [c[0].chartX, c[1] && c[1].chartX], p.y = [c[0].chartY, c[1] && c[1].chartY], a.axes.forEach(function (b) {
                        if (b.zoomEnabled) {
                            var e = a.bounds[b.horiz ? "h" : "v"],
                                f = b.minPixelPadding,
                                d = b.toPixels(Math.min(m(b.options.min, b.dataMin), b.dataMin)),
                                c = b.toPixels(Math.max(m(b.options.max, b.dataMax), b.dataMax)),
                                k = Math.max(d, c);
                            e.min = Math.min(b.pos, Math.min(d, c) - f);
                            e.max = Math.max(b.pos + b.len, k + f)
                        }
                    }), f.res = !0) : f.followTouchMove && 1 === l ? this.runPointActions(f.normalize(d)) : c.length && (g || (f.selectionMarker = g = v({
                        destroy: D,
                        touch: !0
                    }, a.plotBox)), f.pinchTranslate(c, k, r, g, e, p), f.hasPinched = n, f.scaleGroups(r, e), f.res && (f.res = !1, this.reset(!1, 0)))
                };
                l.prototype.pinchTranslate = function (d, f, a, c, l, m) {
                    this.zoomHor && this.pinchTranslateDirection(!0, d, f, a, c, l, m);
                    this.zoomVert && this.pinchTranslateDirection(!1, d, f, a, c, l, m)
                };
                l.prototype.pinchTranslateDirection = function (d, f, a, c, l, m, p, n) {
                    var k = this.chart,
                        u = d ? "x" : "y",
                        g = d ? "X" : "Y",
                        e = "chart" + g,
                        b = d ? "width" : "height",
                        h = k["plot" + (d ? "Left" : "Top")],
                        w, x, A = n || 1,
                        r = k.inverted,
                        E = k.bounds[d ? "h" : "v"],
                        t = 1 === f.length,
                        C = f[0][e],
                        v = a[0][e],
                        q = !t && f[1][e],
                        I = !t && a[1][e];
                    a = function () {
                        "number" === typeof I && 20 < Math.abs(C - q) && (A = n || Math.abs(v - I) / Math.abs(C - q));
                        x = (h - v) / A + C;
                        w = k["plot" + (d ? "Width" : "Height")] / A
                    };
                    a();
                    f = x;
                    if (f < E.min) {
                        f = E.min;
                        var P = !0
                    } else f + w > E.max && (f = E.max - w, P = !0);
                    P ? (v -= .8 * (v - p[u][0]), "number" === typeof I && (I -= .8 * (I - p[u][1])), a()) : p[u] = [v, I];
                    r || (m[u] = x - h, m[b] = w);
                    m = r ? 1 / A : A;
                    l[b] = w;
                    l[u] = f;
                    c[r ? d ? "scaleY" : "scaleX" : "scale" + g] = A;
                    c["translate" + g] = m * h + (v - m * C)
                };
                l.prototype.reset = function (c, f) {
                    var a = this.chart,
                        k = a.hoverSeries,
                        l = a.hoverPoint,
                        m = a.hoverPoints,
                        p = a.tooltip,
                        n = p && p.shared ? m : l;
                    c && n && d(n).forEach(function (a) {
                        a.series.isCartesian && "undefined" === typeof a.plotX && (c = !1)
                    });
                    if (c) p && n && d(n).length && (p.refresh(n), p.shared && m ? m.forEach(function (a) {
                        a.setState(a.state,
                            !0);
                        a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                    }) : l && (l.setState(l.state, !0), a.axes.forEach(function (a) {
                        a.crosshair && l.series[a.coll] === a && a.drawCrosshair(null, l)
                    })));
                    else {
                        if (l) l.onMouseOut();
                        m && m.forEach(function (a) {
                            a.setState()
                        });
                        if (k) k.onMouseOut();
                        p && p.hide(f);
                        this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                        a.axes.forEach(function (a) {
                            a.hideCrosshair()
                        });
                        this.hoverX = a.hoverPoints =
                            a.hoverPoint = null
                    }
                };
                l.prototype.runPointActions = function (d, f) {
                    var a = this.chart,
                        k = a.tooltip && a.tooltip.options.enabled ? a.tooltip : void 0,
                        l = k ? k.shared : !1,
                        p = f || a.hoverPoint,
                        n = p && p.series || a.hoverSeries;
                    n = this.getHoverData(p, n, a.series, (!d || "touchmove" !== d.type) && (!!f || n && n.directTouch && this.isDirectTouch), l, d);
                    p = n.hoverPoint;
                    var g = n.hoverPoints;
                    f = (n = n.hoverSeries) && n.tooltipOptions.followPointer;
                    l = l && n && !n.noSharedTooltip;
                    if (p && (p !== a.hoverPoint || k && k.isHidden)) {
                        (a.hoverPoints || []).forEach(function (a) {
                            -1 ===
                                g.indexOf(a) && a.setState()
                        });
                        if (a.hoverSeries !== n) n.onMouseOver();
                        this.applyInactiveState(g);
                        (g || []).forEach(function (a) {
                            a.setState("hover")
                        });
                        a.hoverPoint && a.hoverPoint.firePointEvent("mouseOut");
                        if (!p.series) return;
                        a.hoverPoints = g;
                        a.hoverPoint = p;
                        p.firePointEvent("mouseOver");
                        k && k.refresh(l ? g : p, d)
                    } else f && k && !k.isHidden && (p = k.getAnchor([{}], d), k.updatePosition({
                        plotX: p[0],
                        plotY: p[1]
                    }));
                    this.unDocMouseMove || (this.unDocMouseMove = J(a.container.ownerDocument, "mousemove", function (a) {
                        var f = H[c.hoverChartIndex];
                        if (f) f.pointer.onDocumentMouseMove(a)
                    }));
                    a.axes.forEach(function (f) {
                        var c = m((f.crosshair || {}).snap, !0),
                            k;
                        c && ((k = a.hoverPoint) && k.series[f.coll] === f || (k = K(g, function (a) {
                            return a.series[f.coll] === f
                        })));
                        k || !c ? f.drawCrosshair(d, k) : f.hideCrosshair()
                    })
                };
                l.prototype.scaleGroups = function (d, f) {
                    var a = this.chart,
                        c;
                    a.series.forEach(function (k) {
                        c = d || k.getPlotBox();
                        k.xAxis && k.xAxis.zoomEnabled && k.group && (k.group.attr(c), k.markerGroup && (k.markerGroup.attr(c), k.markerGroup.clip(f ? a.clipRect : null)), k.dataLabelsGroup &&
                            k.dataLabelsGroup.attr(c))
                    });
                    a.clipRect.attr(f || a.clipBox)
                };
                l.prototype.setDOMEvents = function () {
                    var d = this.chart.container,
                        f = d.ownerDocument;
                    d.onmousedown = this.onContainerMouseDown.bind(this);
                    d.onmousemove = this.onContainerMouseMove.bind(this);
                    d.onclick = this.onContainerClick.bind(this);
                    this.unbindContainerMouseLeave = J(d, "mouseleave", this.onContainerMouseLeave.bind(this));
                    c.unbindDocumentMouseUp || (c.unbindDocumentMouseUp = J(f, "mouseup", this.onDocumentMouseUp.bind(this)));
                    c.hasTouch && (J(d, "touchstart",
                        this.onContainerTouchStart.bind(this)), J(d, "touchmove", this.onContainerTouchMove.bind(this)), c.unbindDocumentTouchEnd || (c.unbindDocumentTouchEnd = J(f, "touchend", this.onDocumentTouchEnd.bind(this))))
                };
                l.prototype.setHoverChartIndex = function () {
                    var d = this.chart,
                        f = c.charts[m(c.hoverChartIndex, -1)];
                    if (f && f !== d) f.pointer.onContainerMouseLeave({
                        relatedTarget: !0
                    });
                    f && f.mouseIsDown || (c.hoverChartIndex = d.index)
                };
                l.prototype.touch = function (d, f) {
                    var a = this.chart,
                        c;
                    this.setHoverChartIndex();
                    if (1 === d.touches.length)
                        if (d =
                            this.normalize(d), (c = a.isInsidePlot(d.chartX - a.plotLeft, d.chartY - a.plotTop)) && !a.openMenu) {
                            f && this.runPointActions(d);
                            if ("touchmove" === d.type) {
                                f = this.pinchDown;
                                var k = f[0] ? 4 <= Math.sqrt(Math.pow(f[0].chartX - d.chartX, 2) + Math.pow(f[0].chartY - d.chartY, 2)) : !1
                            }
                            m(k, !0) && this.pinch(d)
                        } else f && this.reset();
                    else 2 === d.touches.length && this.pinch(d)
                };
                l.prototype.zoomOption = function (d) {
                    var f = this.chart,
                        a = f.options.chart,
                        c = a.zoomType || "";
                    f = f.inverted;
                    /touch/.test(d.type) && (c = m(a.pinchType, c));
                    this.zoomX = d = /x/.test(c);
                    this.zoomY = c = /y/.test(c);
                    this.zoomHor = d && !f || c && f;
                    this.zoomVert = c && !f || d && f;
                    this.hasZoom = d || c
                };
                return l
            }();
            return c.Pointer = g
        });
    O(q, "parts/MSPointer.js", [q["parts/Globals.js"], q["parts/Pointer.js"], q["parts/Utilities.js"]], function (g, c, q) {
        function y() {
            var c = [];
            c.item = function (c) {
                return this[c]
            };
            v(n, function (n) {
                c.push({
                    pageX: n.pageX,
                    pageY: n.pageY,
                    target: n.target
                })
            });
            return c
        }

        function B(c, n, p, m) {
            "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !D[g.hoverChartIndex] || (m(c), m = D[g.hoverChartIndex].pointer,
                m[n]({
                    type: p,
                    target: c.currentTarget,
                    preventDefault: t,
                    touches: y()
                }))
        }
        var H = this && this.__extends || function () {
                var c = function (n, p) {
                    c = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (c, d) {
                        c.__proto__ = d
                    } || function (c, d) {
                        for (var l in d) d.hasOwnProperty(l) && (c[l] = d[l])
                    };
                    return c(n, p)
                };
                return function (n, p) {
                    function m() {
                        this.constructor = n
                    }
                    c(n, p);
                    n.prototype = null === p ? Object.create(p) : (m.prototype = p.prototype, new m)
                }
            }(),
            D = g.charts,
            J = g.doc,
            t = g.noop,
            G = q.addEvent,
            L = q.css,
            v = q.objectEach,
            K = q.removeEvent,
            n = {},
            r = !!g.win.PointerEvent;
        return function (c) {
            function g() {
                return null !== c && c.apply(this, arguments) || this
            }
            H(g, c);
            g.prototype.batchMSEvents = function (c) {
                c(this.chart.container, r ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                c(this.chart.container, r ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                c(J, r ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            };
            g.prototype.destroy = function () {
                this.batchMSEvents(K);
                c.prototype.destroy.call(this)
            };
            g.prototype.init = function (p, m) {
                c.prototype.init.call(this,
                    p, m);
                this.hasZoom && L(p.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            };
            g.prototype.onContainerPointerDown = function (c) {
                B(c, "onContainerTouchStart", "touchstart", function (c) {
                    n[c.pointerId] = {
                        pageX: c.pageX,
                        pageY: c.pageY,
                        target: c.currentTarget
                    }
                })
            };
            g.prototype.onContainerPointerMove = function (c) {
                B(c, "onContainerTouchMove", "touchmove", function (c) {
                    n[c.pointerId] = {
                        pageX: c.pageX,
                        pageY: c.pageY
                    };
                    n[c.pointerId].target || (n[c.pointerId].target = c.currentTarget)
                })
            };
            g.prototype.onDocumentPointerUp = function (c) {
                B(c,
                    "onDocumentTouchEnd", "touchend",
                    function (c) {
                        delete n[c.pointerId]
                    })
            };
            g.prototype.setDOMEvents = function () {
                c.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(G)
            };
            return g
        }(c)
    });
    O(q, "parts/Legend.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = c.addEvent,
            y = c.animObject,
            B = c.css,
            H = c.defined,
            D = c.discardElement,
            J = c.find,
            t = c.fireEvent,
            G = c.format,
            L = c.isNumber,
            v = c.merge,
            K = c.pick,
            n = c.relativeLength,
            r = c.setAnimation,
            C = c.stableSort,
            I = c.syncTimeout;
        c = c.wrap;
        var p = g.isFirefox,
            m = g.marginNames,
            d = g.win,
            l = function () {
                function d(d, a) {
                    this.allItems = [];
                    this.contentGroup = this.box = void 0;
                    this.display = !1;
                    this.group = void 0;
                    this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                    this.options = {};
                    this.padding = 0;
                    this.pages = [];
                    this.proximate = !1;
                    this.scrollGroup = void 0;
                    this.widthOption = this.totalItemWidth =
                        this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                    this.chart = d;
                    this.init(d, a)
                }
                d.prototype.init = function (d, a) {
                    this.chart = d;
                    this.setOptions(a);
                    a.enabled && (this.render(), q(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes()
                    }), this.proximate ? this.unchartrender = q(this.chart, "render", function () {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
                };
                d.prototype.setOptions = function (d) {
                    var a = K(d.padding, 8);
                    this.options = d;
                    this.chart.styledMode ||
                        (this.itemStyle = d.itemStyle, this.itemHiddenStyle = v(this.itemStyle, d.itemHiddenStyle));
                    this.itemMarginTop = d.itemMarginTop || 0;
                    this.itemMarginBottom = d.itemMarginBottom || 0;
                    this.padding = a;
                    this.initialItemY = a - 5;
                    this.symbolWidth = K(d.symbolWidth, 16);
                    this.pages = [];
                    this.proximate = "proximate" === d.layout && !this.chart.inverted;
                    this.baseline = void 0
                };
                d.prototype.update = function (d, a) {
                    var f = this.chart;
                    this.setOptions(v(!0, this.options, d));
                    this.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    K(a, !0) && f.redraw();
                    t(this, "afterUpdate")
                };
                d.prototype.colorizeItem = function (d, a) {
                    d.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                    if (!this.chart.styledMode) {
                        var f = this.options,
                            c = d.legendItem,
                            l = d.legendLine,
                            k = d.legendSymbol,
                            m = this.itemHiddenStyle.color;
                        f = a ? f.itemStyle.color : m;
                        var p = a ? d.color || m : m,
                            n = d.options && d.options.marker,
                            g = {
                                fill: p
                            };
                        c && c.css({
                            fill: f,
                            color: f
                        });
                        l && l.attr({
                            stroke: p
                        });
                        k && (n && k.isMarker && (g = d.pointAttribs(), a || (g.stroke = g.fill = m)), k.attr(g))
                    }
                    t(this, "afterColorizeItem", {
                        item: d,
                        visible: a
                    })
                };
                d.prototype.positionItems =
                    function () {
                        this.allItems.forEach(this.positionItem, this);
                        this.chart.isResizing || this.positionCheckboxes()
                    };
                d.prototype.positionItem = function (d) {
                    var a = this,
                        f = this.options,
                        c = f.symbolPadding,
                        k = !f.rtl,
                        l = d._legendItemPos;
                    f = l[0];
                    l = l[1];
                    var m = d.checkbox,
                        p = d.legendGroup;
                    p && p.element && (c = {
                        translateX: k ? f : this.legendWidth - f - 2 * c - 4,
                        translateY: l
                    }, k = function () {
                        t(a, "afterPositionItem", {
                            item: d
                        })
                    }, H(p.translateY) ? p.animate(c, {
                        complete: k
                    }) : (p.attr(c), k()));
                    m && (m.x = f, m.y = l)
                };
                d.prototype.destroyItem = function (d) {
                    var a =
                        d.checkbox;
                    ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (a) {
                        d[a] && (d[a] = d[a].destroy())
                    });
                    a && D(d.checkbox)
                };
                d.prototype.destroy = function () {
                    function d(a) {
                        this[a] && (this[a] = this[a].destroy())
                    }
                    this.getAllItems().forEach(function (a) {
                        ["legendItem", "legendGroup"].forEach(d, a)
                    });
                    "clipRect up down pager nav box title group".split(" ").forEach(d, this);
                    this.display = null
                };
                d.prototype.positionCheckboxes = function () {
                    var d = this.group && this.group.alignAttr,
                        a = this.clipHeight || this.legendHeight,
                        c = this.titleHeight;
                    if (d) {
                        var l = d.translateY;
                        this.allItems.forEach(function (f) {
                            var k = f.checkbox;
                            if (k) {
                                var m = l + c + k.y + (this.scrollOffset || 0) + 3;
                                B(k, {
                                    left: d.translateX + f.checkboxOffset + k.x - 20 + "px",
                                    top: m + "px",
                                    display: this.proximate || m > l - 6 && m < l + a - 6 ? "" : "none"
                                })
                            }
                        }, this)
                    }
                };
                d.prototype.renderTitle = function () {
                    var d = this.options,
                        a = this.padding,
                        c = d.title,
                        k = 0;
                    c.text && (this.title || (this.title = this.chart.renderer.label(c.text, a - 3, a - 4, null, null, null, d.useHTML, null, "legend-title").attr({
                            zIndex: 1
                        }), this.chart.styledMode ||
                        this.title.css(c.style), this.title.add(this.group)), c.width || this.title.css({
                        width: this.maxLegendWidth + "px"
                    }), d = this.title.getBBox(), k = d.height, this.offsetWidth = d.width, this.contentGroup.attr({
                        translateY: k
                    }));
                    this.titleHeight = k
                };
                d.prototype.setText = function (d) {
                    var a = this.options;
                    d.legendItem.attr({
                        text: a.labelFormat ? G(a.labelFormat, d, this.chart) : a.labelFormatter.call(d)
                    })
                };
                d.prototype.renderItem = function (d) {
                    var a = this.chart,
                        f = a.renderer,
                        c = this.options,
                        k = this.symbolWidth,
                        l = c.symbolPadding,
                        m = this.itemStyle,
                        p = this.itemHiddenStyle,
                        n = "horizontal" === c.layout ? K(c.itemDistance, 20) : 0,
                        g = !c.rtl,
                        e = d.legendItem,
                        b = !d.series,
                        h = !b && d.series.drawLegendSymbol ? d.series : d,
                        z = h.options;
                    z = this.createCheckboxForItem && z && z.showCheckbox;
                    n = k + l + n + (z ? 20 : 0);
                    var x = c.useHTML,
                        r = d.options.className;
                    e || (d.legendGroup = f.g("legend-item").addClass("highcharts-" + h.type + "-series highcharts-color-" + d.colorIndex + (r ? " " + r : "") + (b ? " highcharts-series-" + d.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), d.legendItem = e = f.text("", g ? k + l : -l, this.baseline ||
                        0, x), a.styledMode || e.css(v(d.visible ? m : p)), e.attr({
                        align: g ? "left" : "right",
                        zIndex: 2
                    }).add(d.legendGroup), this.baseline || (this.fontMetrics = f.fontMetrics(a.styledMode ? 12 : m.fontSize, e), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, e.attr("y", this.baseline)), this.symbolHeight = c.symbolHeight || this.fontMetrics.f, h.drawLegendSymbol(this, d), this.setItemEvents && this.setItemEvents(d, e, x));
                    z && !d.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(d);
                    this.colorizeItem(d, d.visible);
                    !a.styledMode &&
                        m.width || e.css({
                            width: (c.itemWidth || this.widthOption || a.spacingBox.width) - n + "px"
                        });
                    this.setText(d);
                    a = e.getBBox();
                    d.itemWidth = d.checkboxOffset = c.itemWidth || d.legendItemWidth || a.width + n;
                    this.maxItemWidth = Math.max(this.maxItemWidth, d.itemWidth);
                    this.totalItemWidth += d.itemWidth;
                    this.itemHeight = d.itemHeight = Math.round(d.legendItemHeight || a.height || this.symbolHeight)
                };
                d.prototype.layoutItem = function (d) {
                    var a = this.options,
                        f = this.padding,
                        c = "horizontal" === a.layout,
                        k = d.itemHeight,
                        l = this.itemMarginBottom,
                        m =
                        this.itemMarginTop,
                        p = c ? K(a.itemDistance, 20) : 0,
                        n = this.maxLegendWidth;
                    a = a.alignColumns && this.totalItemWidth > n ? this.maxItemWidth : d.itemWidth;
                    c && this.itemX - f + a > n && (this.itemX = f, this.lastLineHeight && (this.itemY += m + this.lastLineHeight + l), this.lastLineHeight = 0);
                    this.lastItemY = m + this.itemY + l;
                    this.lastLineHeight = Math.max(k, this.lastLineHeight);
                    d._legendItemPos = [this.itemX, this.itemY];
                    c ? this.itemX += a : (this.itemY += m + k + l, this.lastLineHeight = k);
                    this.offsetWidth = this.widthOption || Math.max((c ? this.itemX - f - (d.checkbox ?
                        0 : p) : a) + f, this.offsetWidth)
                };
                d.prototype.getAllItems = function () {
                    var d = [];
                    this.chart.series.forEach(function (a) {
                        var f = a && a.options;
                        a && K(f.showInLegend, H(f.linkedTo) ? !1 : void 0, !0) && (d = d.concat(a.legendItems || ("point" === f.legendType ? a.data : a)))
                    });
                    t(this, "afterGetAllItems", {
                        allItems: d
                    });
                    return d
                };
                d.prototype.getAlignment = function () {
                    var d = this.options;
                    return this.proximate ? d.align.charAt(0) + "tv" : d.floating ? "" : d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0)
                };
                d.prototype.adjustMargins = function (d,
                    a) {
                    var c = this.chart,
                        f = this.options,
                        k = this.getAlignment();
                    k && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (l, p) {
                        l.test(k) && !H(d[p]) && (c[m[p]] = Math.max(c[m[p]], c.legend[(p + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][p] * f[p % 2 ? "x" : "y"] + K(f.margin, 12) + a[p] + (c.titleOffset[p] || 0)))
                    })
                };
                d.prototype.proximatePositions = function () {
                    var d = this.chart,
                        a = [],
                        c = "left" === this.options.align;
                    this.allItems.forEach(function (f) {
                        var k = c;
                        if (f.yAxis && f.points) {
                            f.xAxis.options.reversed && (k = !k);
                            var l = J(k ? f.points : f.points.slice(0).reverse(), function (a) {
                                return L(a.plotY)
                            });
                            k = this.itemMarginTop + f.legendItem.getBBox().height + this.itemMarginBottom;
                            var m = f.yAxis.top - d.plotTop;
                            f.visible ? (l = l ? l.plotY : f.yAxis.height, l += m - .3 * k) : l = m + f.yAxis.height;
                            a.push({
                                target: l,
                                size: k,
                                item: f
                            })
                        }
                    }, this);
                    g.distribute(a, d.plotHeight);
                    a.forEach(function (a) {
                        a.item._legendItemPos[1] = d.plotTop - d.spacing[0] + a.pos
                    })
                };
                d.prototype.render = function () {
                    var d = this.chart,
                        a = d.renderer,
                        c = this.group,
                        k = this.box,
                        l = this.options,
                        m =
                        this.padding;
                    this.itemX = m;
                    this.itemY = this.initialItemY;
                    this.lastItemY = this.offsetWidth = 0;
                    this.widthOption = n(l.width, d.spacingBox.width - m);
                    var p = d.spacingBox.width - 2 * m - l.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (p /= 2);
                    this.maxLegendWidth = this.widthOption || p;
                    c || (this.group = c = a.g("legend").attr({
                        zIndex: 7
                    }).add(), this.contentGroup = a.g().attr({
                        zIndex: 1
                    }).add(c), this.scrollGroup = a.g().add(this.contentGroup));
                    this.renderTitle();
                    var g = this.getAllItems();
                    C(g, function (a, e) {
                        return (a.options &&
                            a.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
                    });
                    l.reversed && g.reverse();
                    this.allItems = g;
                    this.display = p = !!g.length;
                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                    g.forEach(this.renderItem, this);
                    g.forEach(this.layoutItem, this);
                    g = (this.widthOption || this.offsetWidth) + m;
                    var r = this.lastItemY + this.lastLineHeight + this.titleHeight;
                    r = this.handleOverflow(r);
                    r += m;
                    k || (this.box = k = a.rect().addClass("highcharts-legend-box").attr({
                        r: l.borderRadius
                    }).add(c), k.isNew = !0);
                    d.styledMode || k.attr({
                        stroke: l.borderColor,
                        "stroke-width": l.borderWidth || 0,
                        fill: l.backgroundColor || "none"
                    }).shadow(l.shadow);
                    0 < g && 0 < r && (k[k.isNew ? "attr" : "animate"](k.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: g,
                        height: r
                    }, k.strokeWidth())), k.isNew = !1);
                    k[p ? "show" : "hide"]();
                    d.styledMode && "none" === c.getStyle("display") && (g = r = 0);
                    this.legendWidth = g;
                    this.legendHeight = r;
                    p && this.align();
                    this.proximate || this.positionItems();
                    t(this, "afterRender")
                };
                d.prototype.align = function (d) {
                    void 0 === d && (d = this.chart.spacingBox);
                    var a =
                        this.chart,
                        c = this.options,
                        f = d.y;
                    /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? f += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a.titleOffset[2] && (f -= a.titleOffset[2]);
                    f !== d.y && (d = v(d, {
                        y: f
                    }));
                    this.group.align(v(c, {
                        width: this.legendWidth,
                        height: this.legendHeight,
                        verticalAlign: this.proximate ? "top" : c.verticalAlign
                    }), !0, d)
                };
                d.prototype.handleOverflow = function (d) {
                    var a = this,
                        c = this.chart,
                        f = c.renderer,
                        k = this.options,
                        l = k.y,
                        m = this.padding;
                    l = c.spacingBox.height + ("top" === k.verticalAlign ?
                        -l : l) - m;
                    var p = k.maxHeight,
                        n, g = this.clipRect,
                        e = k.navigation,
                        b = K(e.animation, !0),
                        h = e.arrowSize || 12,
                        z = this.nav,
                        x = this.pages,
                        r, t = this.allItems,
                        v = function (b) {
                            "number" === typeof b ? g.attr({
                                height: b
                            }) : g && (a.clipRect = g.destroy(), a.contentGroup.clip());
                            a.contentGroup.div && (a.contentGroup.div.style.clip = b ? "rect(" + m + "px,9999px," + (m + b) + "px,0)" : "auto")
                        },
                        q = function (b) {
                            a[b] = f.circle(0, 0, 1.3 * h).translate(h / 2, h / 2).add(z);
                            c.styledMode || a[b].attr("fill", "rgba(0,0,0,0.0001)");
                            return a[b]
                        };
                    "horizontal" !== k.layout || "middle" ===
                        k.verticalAlign || k.floating || (l /= 2);
                    p && (l = Math.min(l, p));
                    x.length = 0;
                    d > l && !1 !== e.enabled ? (this.clipHeight = n = Math.max(l - 20 - this.titleHeight - m, 0), this.currentPage = K(this.currentPage, 1), this.fullHeight = d, t.forEach(function (b, a) {
                        var e = b._legendItemPos[1],
                            d = Math.round(b.legendItem.getBBox().height),
                            h = x.length;
                        if (!h || e - x[h - 1] > n && (r || e) !== x[h - 1]) x.push(r || e), h++;
                        b.pageIx = h - 1;
                        r && (t[a - 1].pageIx = h - 1);
                        a === t.length - 1 && e + d - x[h - 1] > n && e !== r && (x.push(e), b.pageIx = h);
                        e !== r && (r = e)
                    }), g || (g = a.clipRect = f.clipRect(0, m, 9999,
                        0), a.contentGroup.clip(g)), v(n), z || (this.nav = z = f.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = f.symbol("triangle", 0, 0, h, h).add(z), q("upTracker").on("click", function () {
                        a.scroll(-1, b)
                    }), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation"), c.styledMode || this.pager.css(e.style), this.pager.add(z), this.down = f.symbol("triangle-down", 0, 0, h, h).add(z), q("downTracker").on("click", function () {
                        a.scroll(1, b)
                    })), a.scroll(0), d = l) : z && (v(), this.nav = z.destroy(), this.scrollGroup.attr({
                            translateY: 1
                        }), this.clipHeight =
                        0);
                    return d
                };
                d.prototype.scroll = function (d, a) {
                    var c = this,
                        f = this.chart,
                        k = this.pages,
                        l = k.length,
                        m = this.currentPage + d;
                    d = this.clipHeight;
                    var p = this.options.navigation,
                        n = this.pager,
                        g = this.padding;
                    m > l && (m = l);
                    0 < m && ("undefined" !== typeof a && r(a, f), this.nav.attr({
                            translateX: g,
                            translateY: d + this.padding + 7 + this.titleHeight,
                            visibility: "visible"
                        }), [this.up, this.upTracker].forEach(function (a) {
                            a.attr({
                                "class": 1 === m ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                            })
                        }), n.attr({
                            text: m + "/" + l
                        }), [this.down,
                            this.downTracker
                        ].forEach(function (a) {
                            a.attr({
                                x: 18 + this.pager.getBBox().width,
                                "class": m === l ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                            })
                        }, this), f.styledMode || (this.up.attr({
                            fill: 1 === m ? p.inactiveColor : p.activeColor
                        }), this.upTracker.css({
                            cursor: 1 === m ? "default" : "pointer"
                        }), this.down.attr({
                            fill: m === l ? p.inactiveColor : p.activeColor
                        }), this.downTracker.css({
                            cursor: m === l ? "default" : "pointer"
                        })), this.scrollOffset = -k[m - 1] + this.initialItemY, this.scrollGroup.animate({
                            translateY: this.scrollOffset
                        }),
                        this.currentPage = m, this.positionCheckboxes(), a = y(K(a, f.renderer.globalAnimation, !0)), I(function () {
                            t(c, "afterScroll", {
                                currentPage: m
                            })
                        }, a.duration || 0))
                };
                return d
            }();
        (/Trident\/7\.0/.test(d.navigator && d.navigator.userAgent) || p) && c(l.prototype, "positionItem", function (d, c) {
            var a = this,
                f = function () {
                    c._legendItemPos && d.call(a, c)
                };
            f();
            a.bubbleLegend || setTimeout(f)
        });
        g.Legend = l;
        return g.Legend
    });
    O(q, "parts/Chart.js", [q["parts/Axis.js"], q["parts/Globals.js"], q["parts/Legend.js"], q["parts/MSPointer.js"], q["parts/Options.js"],
        q["parts/Pointer.js"], q["parts/Time.js"], q["parts/Utilities.js"]
    ], function (g, c, q, y, B, H, D, J) {
        var t = c.charts,
            G = c.doc,
            L = c.seriesTypes,
            v = c.win,
            K = B.defaultOptions,
            n = J.addEvent,
            r = J.animate,
            C = J.animObject,
            I = J.attr,
            p = J.createElement,
            m = J.css,
            d = J.defined,
            l = J.discardElement,
            k = J.erase,
            f = J.error,
            a = J.extend,
            A = J.find,
            u = J.fireEvent,
            E = J.getStyle,
            P = J.isArray,
            w = J.isFunction,
            M = J.isNumber,
            F = J.isObject,
            Q = J.isString,
            e = J.merge,
            b = J.numberFormat,
            h = J.objectEach,
            z = J.pick,
            x = J.pInt,
            N = J.relativeLength,
            aa = J.removeEvent,
            Z = J.setAnimation,
            V = J.splat,
            Y = J.syncTimeout,
            ba = J.uniqueKey,
            U = c.marginNames,
            X = function () {
                function B(b, a, e) {
                    this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.container = this.colorCounter = this.clipBox = this.chartWidth =
                        this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                    this.getArgs(b, a, e)
                }
                B.prototype.getArgs = function (b, a, e) {
                    Q(b) || b.nodeName ? (this.renderTo = b, this.init(a, e)) : this.init(b, a)
                };
                B.prototype.init = function (a, d) {
                    var f, l = a.series,
                        k = a.plotOptions || {};
                    u(this, "init", {
                        args: arguments
                    }, function () {
                        a.series = null;
                        f = e(K, a);
                        var m = f.chart || {};
                        h(f.plotOptions, function (b, a) {
                            F(b) && (b.tooltip = k[a] && e(k[a].tooltip) || void 0)
                        });
                        f.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip;
                        f.series =
                            a.series = l;
                        this.userOptions = a;
                        var p = m.events;
                        this.margin = [];
                        this.spacing = [];
                        this.bounds = {
                            h: {},
                            v: {}
                        };
                        this.labelCollectors = [];
                        this.callback = d;
                        this.isResizing = 0;
                        this.options = f;
                        this.axes = [];
                        this.series = [];
                        this.time = a.time && Object.keys(a.time).length ? new D(a.time) : c.time;
                        this.numberFormatter = m.numberFormatter || b;
                        this.styledMode = m.styledMode;
                        this.hasCartesianSeries = m.showAxes;
                        var g = this;
                        g.index = t.length;
                        t.push(g);
                        c.chartCount++;
                        p && h(p, function (b, a) {
                            w(b) && n(g, a, b)
                        });
                        g.xAxis = [];
                        g.yAxis = [];
                        g.pointCount = g.colorCounter =
                            g.symbolCounter = 0;
                        u(g, "afterInit");
                        g.firstRender()
                    })
                };
                B.prototype.initSeries = function (b) {
                    var a = this.options.chart;
                    a = b.type || a.type || a.defaultSeriesType;
                    var e = L[a];
                    e || f(17, !0, this, {
                        missingModuleFor: a
                    });
                    a = new e;
                    a.init(this, b);
                    return a
                };
                B.prototype.setSeriesData = function () {
                    this.getSeriesOrderByLinks().forEach(function (b) {
                        b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1)
                    })
                };
                B.prototype.getSeriesOrderByLinks = function () {
                    return this.series.concat().sort(function (b, a) {
                        return b.linkedSeries.length ||
                            a.linkedSeries.length ? a.linkedSeries.length - b.linkedSeries.length : 0
                    })
                };
                B.prototype.orderSeries = function (b) {
                    var a = this.series;
                    for (b = b || 0; b < a.length; b++) a[b] && (a[b].index = b, a[b].name = a[b].getName())
                };
                B.prototype.isInsidePlot = function (b, a, e) {
                    var d = e ? a : b;
                    b = e ? b : a;
                    d = {
                        x: d,
                        y: b,
                        isInsidePlot: 0 <= d && d <= this.plotWidth && 0 <= b && b <= this.plotHeight
                    };
                    u(this, "afterIsInsidePlot", d);
                    return d.isInsidePlot
                };
                B.prototype.redraw = function (b) {
                    u(this, "beforeRedraw");
                    var e = this,
                        d = e.axes,
                        h = e.series,
                        c = e.pointer,
                        f = e.legend,
                        l = e.userOptions.legend,
                        k = e.isDirtyLegend,
                        m = e.hasCartesianSeries,
                        p = e.isDirtyBox,
                        g = e.renderer,
                        n = g.isHidden(),
                        x = [];
                    e.setResponsive && e.setResponsive(!1);
                    Z(e.hasRendered ? b : !1, e);
                    n && e.temporaryDisplay();
                    e.layOutTitles();
                    for (b = h.length; b--;) {
                        var z = h[b];
                        if (z.options.stacking) {
                            var w = !0;
                            if (z.isDirty) {
                                var r = !0;
                                break
                            }
                        }
                    }
                    if (r)
                        for (b = h.length; b--;) z = h[b], z.options.stacking && (z.isDirty = !0);
                    h.forEach(function (b) {
                        b.isDirty && ("point" === b.options.legendType ? (b.updateTotals && b.updateTotals(), k = !0) : l && (l.labelFormatter || l.labelFormat) && (k = !0));
                        b.isDirtyData && u(b, "updatedData")
                    });
                    k && f && f.options.enabled && (f.render(), e.isDirtyLegend = !1);
                    w && e.getStacks();
                    m && d.forEach(function (b) {
                        e.isResizing && M(b.min) || (b.updateNames(), b.setScale())
                    });
                    e.getMargins();
                    m && (d.forEach(function (b) {
                        b.isDirty && (p = !0)
                    }), d.forEach(function (b) {
                        var e = b.min + "," + b.max;
                        b.extKey !== e && (b.extKey = e, x.push(function () {
                            u(b, "afterSetExtremes", a(b.eventArgs, b.getExtremes()));
                            delete b.eventArgs
                        }));
                        (p || w) && b.redraw()
                    }));
                    p && e.drawChartBox();
                    u(e, "predraw");
                    h.forEach(function (b) {
                        (p ||
                            b.isDirty) && b.visible && b.redraw();
                        b.isDirtyData = !1
                    });
                    c && c.reset(!0);
                    g.draw();
                    u(e, "redraw");
                    u(e, "render");
                    n && e.temporaryDisplay(!0);
                    x.forEach(function (b) {
                        b.call()
                    })
                };
                B.prototype.get = function (b) {
                    function a(a) {
                        return a.id === b || a.options && a.options.id === b
                    }
                    var e = this.series,
                        d;
                    var h = A(this.axes, a) || A(this.series, a);
                    for (d = 0; !h && d < e.length; d++) h = A(e[d].points || [], a);
                    return h
                };
                B.prototype.getAxes = function () {
                    var b = this,
                        a = this.options,
                        e = a.xAxis = V(a.xAxis || {});
                    a = a.yAxis = V(a.yAxis || {});
                    u(this, "getAxes");
                    e.forEach(function (b,
                        a) {
                        b.index = a;
                        b.isX = !0
                    });
                    a.forEach(function (b, a) {
                        b.index = a
                    });
                    e.concat(a).forEach(function (a) {
                        new g(b, a)
                    });
                    u(this, "afterGetAxes")
                };
                B.prototype.getSelectedPoints = function () {
                    var b = [];
                    this.series.forEach(function (a) {
                        b = b.concat(a.getPointsCollection().filter(function (b) {
                            return z(b.selectedStaging, b.selected)
                        }))
                    });
                    return b
                };
                B.prototype.getSelectedSeries = function () {
                    return this.series.filter(function (b) {
                        return b.selected
                    })
                };
                B.prototype.setTitle = function (b, a, e) {
                    this.applyDescription("title", b);
                    this.applyDescription("subtitle",
                        a);
                    this.applyDescription("caption", void 0);
                    this.layOutTitles(e)
                };
                B.prototype.applyDescription = function (b, a) {
                    var d = this,
                        h = "title" === b ? {
                            color: "#333333",
                            fontSize: this.options.isStock ? "16px" : "18px"
                        } : {
                            color: "#666666"
                        };
                    h = this.options[b] = e(!this.styledMode && {
                        style: h
                    }, this.options[b], a);
                    var c = this[b];
                    c && a && (this[b] = c = c.destroy());
                    h && !c && (c = this.renderer.text(h.text, 0, 0, h.useHTML).attr({
                        align: h.align,
                        "class": "highcharts-" + b,
                        zIndex: h.zIndex || 4
                    }).add(), c.update = function (a) {
                        d[{
                            title: "setTitle",
                            subtitle: "setSubtitle",
                            caption: "setCaption"
                        } [b]](a)
                    }, this.styledMode || c.css(h.style), this[b] = c)
                };
                B.prototype.layOutTitles = function (b) {
                    var e = [0, 0, 0],
                        d = this.renderer,
                        h = this.spacingBox;
                    ["title", "subtitle", "caption"].forEach(function (b) {
                        var c = this[b],
                            f = this.options[b],
                            l = f.verticalAlign || "top";
                        b = "title" === b ? -3 : "top" === l ? e[0] + 2 : 0;
                        if (c) {
                            if (!this.styledMode) var k = f.style.fontSize;
                            k = d.fontMetrics(k, c).b;
                            c.css({
                                width: (f.width || h.width + (f.widthAdjust || 0)) + "px"
                            });
                            var m = Math.round(c.getBBox(f.useHTML).height);
                            c.align(a({
                                y: "bottom" ===
                                    l ? k : b + k,
                                height: m
                            }, f), !1, "spacingBox");
                            f.floating || ("top" === l ? e[0] = Math.ceil(e[0] + m) : "bottom" === l && (e[2] = Math.ceil(e[2] + m)))
                        }
                    }, this);
                    e[0] && "top" === (this.options.title.verticalAlign || "top") && (e[0] += this.options.title.margin);
                    e[2] && "bottom" === this.options.caption.verticalAlign && (e[2] += this.options.caption.margin);
                    var c = !this.titleOffset || this.titleOffset.join(",") !== e.join(",");
                    this.titleOffset = e;
                    u(this, "afterLayOutTitles");
                    !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered &&
                        z(b, !0) && this.isDirtyBox && this.redraw())
                };
                B.prototype.getChartSize = function () {
                    var b = this.options.chart,
                        a = b.width;
                    b = b.height;
                    var e = this.renderTo;
                    d(a) || (this.containerWidth = E(e, "width"));
                    d(b) || (this.containerHeight = E(e, "height"));
                    this.chartWidth = Math.max(0, a || this.containerWidth || 600);
                    this.chartHeight = Math.max(0, N(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                };
                B.prototype.temporaryDisplay = function (b) {
                    var a = this.renderTo;
                    if (b)
                        for (; a && a.style;) a.hcOrigStyle && (m(a, a.hcOrigStyle),
                            delete a.hcOrigStyle), a.hcOrigDetached && (G.body.removeChild(a), a.hcOrigDetached = !1), a = a.parentNode;
                    else
                        for (; a && a.style;) {
                            G.body.contains(a) || a.parentNode || (a.hcOrigDetached = !0, G.body.appendChild(a));
                            if ("none" === E(a, "display", !1) || a.hcOricDetached) a.hcOrigStyle = {
                                display: a.style.display,
                                height: a.style.height,
                                overflow: a.style.overflow
                            }, b = {
                                display: "block",
                                overflow: "hidden"
                            }, a !== this.renderTo && (b.height = 0), m(a, b), a.offsetWidth || a.style.setProperty("display", "block", "important");
                            a = a.parentNode;
                            if (a ===
                                G.body) break
                        }
                };
                B.prototype.setClassName = function (b) {
                    this.container.className = "highcharts-container " + (b || "")
                };
                B.prototype.getContainer = function () {
                    var b = this.options,
                        e = b.chart;
                    var d = this.renderTo;
                    var h = ba(),
                        l, k;
                    d || (this.renderTo = d = e.renderTo);
                    Q(d) && (this.renderTo = d = G.getElementById(d));
                    d || f(13, !0, this);
                    var g = x(I(d, "data-highcharts-chart"));
                    M(g) && t[g] && t[g].hasRendered && t[g].destroy();
                    I(d, "data-highcharts-chart", this.index);
                    d.innerHTML = "";
                    e.skipClone || d.offsetWidth || this.temporaryDisplay();
                    this.getChartSize();
                    g = this.chartWidth;
                    var n = this.chartHeight;
                    m(d, {
                        overflow: "hidden"
                    });
                    this.styledMode || (l = a({
                        position: "relative",
                        overflow: "hidden",
                        width: g + "px",
                        height: n + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                        userSelect: "none"
                    }, e.style));
                    this.container = d = p("div", {
                        id: h
                    }, l, d);
                    this._cursor = d.style.cursor;
                    this.renderer = new(c[e.renderer] || c.Renderer)(d, g, n, null, e.forExport, b.exporting && b.exporting.allowHTML, this.styledMode);
                    Z(void 0, this);
                    this.setClassName(e.className);
                    if (this.styledMode)
                        for (k in b.defs) this.renderer.definition(b.defs[k]);
                    else this.renderer.setStyle(e.style);
                    this.renderer.chartIndex = this.index;
                    u(this, "afterGetContainer")
                };
                B.prototype.getMargins = function (b) {
                    var a = this.spacing,
                        e = this.margin,
                        h = this.titleOffset;
                    this.resetMargins();
                    h[0] && !d(e[0]) && (this.plotTop = Math.max(this.plotTop, h[0] + a[0]));
                    h[2] && !d(e[2]) && (this.marginBottom = Math.max(this.marginBottom, h[2] + a[2]));
                    this.legend && this.legend.display && this.legend.adjustMargins(e, a);
                    u(this, "getMargins");
                    b || this.getAxisMargins()
                };
                B.prototype.getAxisMargins = function () {
                    var b = this,
                        a = b.axisOffset = [0, 0, 0, 0],
                        e = b.colorAxis,
                        h = b.margin,
                        c = function (b) {
                            b.forEach(function (b) {
                                b.visible && b.getOffset()
                            })
                        };
                    b.hasCartesianSeries ? c(b.axes) : e && e.length && c(e);
                    U.forEach(function (e, c) {
                        d(h[c]) || (b[e] += a[c])
                    });
                    b.setChartSize()
                };
                B.prototype.reflow = function (b) {
                    var a = this,
                        e = a.options.chart,
                        h = a.renderTo,
                        c = d(e.width) && d(e.height),
                        f = e.width || E(h, "width");
                    e = e.height || E(h, "height");
                    h = b ? b.target : v;
                    if (!c && !a.isPrinting && f && e && (h ===
                            v || h === G)) {
                        if (f !== a.containerWidth || e !== a.containerHeight) J.clearTimeout(a.reflowTimeout), a.reflowTimeout = Y(function () {
                            a.container && a.setSize(void 0, void 0, !1)
                        }, b ? 100 : 0);
                        a.containerWidth = f;
                        a.containerHeight = e
                    }
                };
                B.prototype.setReflow = function (b) {
                    var a = this;
                    !1 === b || this.unbindReflow ? !1 === b && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = n(v, "resize", function (b) {
                        a.options && a.reflow(b)
                    }), n(this, "destroy", this.unbindReflow))
                };
                B.prototype.setSize = function (b, a, e) {
                    var d = this,
                        h = d.renderer;
                    d.isResizing += 1;
                    Z(e, d);
                    e = h.globalAnimation;
                    d.oldChartHeight = d.chartHeight;
                    d.oldChartWidth = d.chartWidth;
                    "undefined" !== typeof b && (d.options.chart.width = b);
                    "undefined" !== typeof a && (d.options.chart.height = a);
                    d.getChartSize();
                    d.styledMode || (e ? r : m)(d.container, {
                        width: d.chartWidth + "px",
                        height: d.chartHeight + "px"
                    }, e);
                    d.setChartSize(!0);
                    h.setSize(d.chartWidth, d.chartHeight, e);
                    d.axes.forEach(function (b) {
                        b.isDirty = !0;
                        b.setScale()
                    });
                    d.isDirtyLegend = !0;
                    d.isDirtyBox = !0;
                    d.layOutTitles();
                    d.getMargins();
                    d.redraw(e);
                    d.oldChartHeight = null;
                    u(d, "resize");
                    Y(function () {
                        d && u(d, "endResize", null, function () {
                            --d.isResizing
                        })
                    }, C(e).duration || 0)
                };
                B.prototype.setChartSize = function (b) {
                    var a = this.inverted,
                        e = this.renderer,
                        d = this.chartWidth,
                        h = this.chartHeight,
                        c = this.options.chart,
                        f = this.spacing,
                        l = this.clipOffset,
                        k, m, p, g;
                    this.plotLeft = k = Math.round(this.plotLeft);
                    this.plotTop = m = Math.round(this.plotTop);
                    this.plotWidth = p = Math.max(0, Math.round(d - k - this.marginRight));
                    this.plotHeight = g = Math.max(0, Math.round(h - m - this.marginBottom));
                    this.plotSizeX = a ? g : p;
                    this.plotSizeY = a ? p : g;
                    this.plotBorderWidth = c.plotBorderWidth || 0;
                    this.spacingBox = e.spacingBox = {
                        x: f[3],
                        y: f[0],
                        width: d - f[3] - f[1],
                        height: h - f[0] - f[2]
                    };
                    this.plotBox = e.plotBox = {
                        x: k,
                        y: m,
                        width: p,
                        height: g
                    };
                    d = 2 * Math.floor(this.plotBorderWidth / 2);
                    a = Math.ceil(Math.max(d, l[3]) / 2);
                    e = Math.ceil(Math.max(d, l[0]) / 2);
                    this.clipBox = {
                        x: a,
                        y: e,
                        width: Math.floor(this.plotSizeX - Math.max(d, l[1]) / 2 - a),
                        height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, l[2]) / 2 - e))
                    };
                    b || this.axes.forEach(function (b) {
                        b.setAxisSize();
                        b.setAxisTranslation()
                    });
                    u(this, "afterSetChartSize", {
                        skipAxes: b
                    })
                };
                B.prototype.resetMargins = function () {
                    u(this, "resetMargins");
                    var b = this,
                        a = b.options.chart;
                    ["margin", "spacing"].forEach(function (e) {
                        var d = a[e],
                            h = F(d) ? d : [d, d, d, d];
                        ["Top", "Right", "Bottom", "Left"].forEach(function (d, c) {
                            b[e][c] = z(a[e + d], h[c])
                        })
                    });
                    U.forEach(function (a, e) {
                        b[a] = z(b.margin[e], b.spacing[e])
                    });
                    b.axisOffset = [0, 0, 0, 0];
                    b.clipOffset = [0, 0, 0, 0]
                };
                B.prototype.drawChartBox = function () {
                    var b = this.options.chart,
                        a = this.renderer,
                        e = this.chartWidth,
                        d = this.chartHeight,
                        h = this.chartBackground,
                        c = this.plotBackground,
                        f = this.plotBorder,
                        l = this.styledMode,
                        k = this.plotBGImage,
                        m = b.backgroundColor,
                        p = b.plotBackgroundColor,
                        g = b.plotBackgroundImage,
                        n, x = this.plotLeft,
                        z = this.plotTop,
                        w = this.plotWidth,
                        r = this.plotHeight,
                        t = this.plotBox,
                        A = this.clipRect,
                        v = this.clipBox,
                        q = "animate";
                    h || (this.chartBackground = h = a.rect().addClass("highcharts-background").add(), q = "attr");
                    if (l) var C = n = h.strokeWidth();
                    else {
                        C = b.borderWidth || 0;
                        n = C + (b.shadow ? 8 : 0);
                        m = {
                            fill: m || "none"
                        };
                        if (C || h["stroke-width"]) m.stroke =
                            b.borderColor, m["stroke-width"] = C;
                        h.attr(m).shadow(b.shadow)
                    }
                    h[q]({
                        x: n / 2,
                        y: n / 2,
                        width: e - n - C % 2,
                        height: d - n - C % 2,
                        r: b.borderRadius
                    });
                    q = "animate";
                    c || (q = "attr", this.plotBackground = c = a.rect().addClass("highcharts-plot-background").add());
                    c[q](t);
                    l || (c.attr({
                        fill: p || "none"
                    }).shadow(b.plotShadow), g && (k ? (g !== k.attr("href") && k.attr("href", g), k.animate(t)) : this.plotBGImage = a.image(g, x, z, w, r).add()));
                    A ? A.animate({
                        width: v.width,
                        height: v.height
                    }) : this.clipRect = a.clipRect(v);
                    q = "animate";
                    f || (q = "attr", this.plotBorder =
                        f = a.rect().addClass("highcharts-plot-border").attr({
                            zIndex: 1
                        }).add());
                    l || f.attr({
                        stroke: b.plotBorderColor,
                        "stroke-width": b.plotBorderWidth || 0,
                        fill: "none"
                    });
                    f[q](f.crisp({
                        x: x,
                        y: z,
                        width: w,
                        height: r
                    }, -f.strokeWidth()));
                    this.isDirtyBox = !1;
                    u(this, "afterDrawChartBox")
                };
                B.prototype.propFromSeries = function () {
                    var b = this,
                        a = b.options.chart,
                        e, d = b.options.series,
                        h, c;
                    ["inverted", "angular", "polar"].forEach(function (f) {
                        e = L[a.type || a.defaultSeriesType];
                        c = a[f] || e && e.prototype[f];
                        for (h = d && d.length; !c && h--;)(e = L[d[h].type]) &&
                            e.prototype[f] && (c = !0);
                        b[f] = c
                    })
                };
                B.prototype.linkSeries = function () {
                    var b = this,
                        a = b.series;
                    a.forEach(function (b) {
                        b.linkedSeries.length = 0
                    });
                    a.forEach(function (a) {
                        var e = a.options.linkedTo;
                        Q(e) && (e = ":previous" === e ? b.series[a.index - 1] : b.get(e)) && e.linkedParent !== a && (e.linkedSeries.push(a), a.linkedParent = e, e.enabledDataSorting && a.setDataSortingOptions(), a.visible = z(a.options.visible, e.options.visible, a.visible))
                    });
                    u(this, "afterLinkSeries")
                };
                B.prototype.renderSeries = function () {
                    this.series.forEach(function (b) {
                        b.translate();
                        b.render()
                    })
                };
                B.prototype.renderLabels = function () {
                    var b = this,
                        e = b.options.labels;
                    e.items && e.items.forEach(function (d) {
                        var h = a(e.style, d.style),
                            c = x(h.left) + b.plotLeft,
                            f = x(h.top) + b.plotTop + 12;
                        delete h.left;
                        delete h.top;
                        b.renderer.text(d.html, c, f).attr({
                            zIndex: 2
                        }).css(h).add()
                    })
                };
                B.prototype.render = function () {
                    var b = this.axes,
                        a = this.colorAxis,
                        e = this.renderer,
                        d = this.options,
                        h = 0,
                        c = function (b) {
                            b.forEach(function (b) {
                                b.visible && b.render()
                            })
                        };
                    this.setTitle();
                    this.legend = new q(this, d.legend);
                    this.getStacks &&
                        this.getStacks();
                    this.getMargins(!0);
                    this.setChartSize();
                    d = this.plotWidth;
                    b.some(function (b) {
                        if (b.horiz && b.visible && b.options.labels.enabled && b.series.length) return h = 21, !0
                    });
                    var f = this.plotHeight = Math.max(this.plotHeight - h, 0);
                    b.forEach(function (b) {
                        b.setScale()
                    });
                    this.getAxisMargins();
                    var l = 1.1 < d / this.plotWidth;
                    var k = 1.05 < f / this.plotHeight;
                    if (l || k) b.forEach(function (b) {
                        (b.horiz && l || !b.horiz && k) && b.setTickInterval(!0)
                    }), this.getMargins();
                    this.drawChartBox();
                    this.hasCartesianSeries ? c(b) : a && a.length &&
                        c(a);
                    this.seriesGroup || (this.seriesGroup = e.g("series-group").attr({
                        zIndex: 3
                    }).add());
                    this.renderSeries();
                    this.renderLabels();
                    this.addCredits();
                    this.setResponsive && this.setResponsive();
                    this.updateContainerScaling();
                    this.hasRendered = !0
                };
                B.prototype.addCredits = function (b) {
                    var a = this,
                        d = e(!0, this.options.credits, b);
                    d.enabled && !this.credits && (this.credits = this.renderer.text(d.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        d.href && (v.location.href = d.href)
                    }).attr({
                        align: d.position.align,
                        zIndex: 8
                    }), a.styledMode || this.credits.css(d.style), this.credits.add().align(d.position), this.credits.update = function (b) {
                        a.credits = a.credits.destroy();
                        a.addCredits(b)
                    })
                };
                B.prototype.updateContainerScaling = function () {
                    var b = this.container;
                    if (2 < b.offsetWidth && 2 < b.offsetHeight && b.getBoundingClientRect) {
                        var a = b.getBoundingClientRect(),
                            e = a.width / b.offsetWidth;
                        b = a.height / b.offsetHeight;
                        1 !== e || 1 !== b ? this.containerScaling = {
                            scaleX: e,
                            scaleY: b
                        } : delete this.containerScaling
                    }
                };
                B.prototype.destroy = function () {
                    var b =
                        this,
                        a = b.axes,
                        e = b.series,
                        d = b.container,
                        f, m = d && d.parentNode;
                    u(b, "destroy");
                    b.renderer.forExport ? k(t, b) : t[b.index] = void 0;
                    c.chartCount--;
                    b.renderTo.removeAttribute("data-highcharts-chart");
                    aa(b);
                    for (f = a.length; f--;) a[f] = a[f].destroy();
                    this.scroller && this.scroller.destroy && this.scroller.destroy();
                    for (f = e.length; f--;) e[f] = e[f].destroy();
                    "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
                        var e =
                            b[a];
                        e && e.destroy && (b[a] = e.destroy())
                    });
                    d && (d.innerHTML = "", aa(d), m && l(d));
                    h(b, function (a, e) {
                        delete b[e]
                    })
                };
                B.prototype.firstRender = function () {
                    var b = this,
                        a = b.options;
                    if (!b.isReadyToRender || b.isReadyToRender()) {
                        b.getContainer();
                        b.resetMargins();
                        b.setChartSize();
                        b.propFromSeries();
                        b.getAxes();
                        (P(a.series) ? a.series : []).forEach(function (a) {
                            b.initSeries(a)
                        });
                        b.linkSeries();
                        b.setSeriesData();
                        u(b, "beforeRender");
                        H && (b.pointer = c.hasTouch || !v.PointerEvent && !v.MSPointerEvent ? new H(b, a) : new y(b, a));
                        b.render();
                        if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
                        b.temporaryDisplay(!0)
                    }
                };
                B.prototype.onload = function () {
                    this.callbacks.concat([this.callback]).forEach(function (b) {
                        b && "undefined" !== typeof this.index && b.apply(this, [this])
                    }, this);
                    u(this, "load");
                    u(this, "render");
                    d(this.index) && this.setReflow(this.options.chart.reflow);
                    this.hasLoaded = !0
                };
                return B
            }();
        X.prototype.callbacks = [];
        c.chart = function (b, a, e) {
            return new X(b, a, e)
        };
        return c.Chart = X
    });
    O(q, "parts/ScrollablePlotArea.js", [q["parts/Chart.js"], q["parts/Globals.js"],
        q["parts/Utilities.js"]
    ], function (g, c, q) {
        var y = q.addEvent,
            B = q.createElement,
            H = q.pick,
            D = q.stop;
        "";
        y(g, "afterSetChartSize", function (g) {
            var t = this.options.chart.scrollablePlotArea,
                q = t && t.minWidth;
            t = t && t.minHeight;
            if (!this.renderer.forExport) {
                if (q) {
                    if (this.scrollablePixelsX = q = Math.max(0, q - this.chartWidth)) {
                        this.plotWidth += q;
                        this.inverted ? (this.clipBox.height += q, this.plotBox.height += q) : (this.clipBox.width += q, this.plotBox.width += q);
                        var y = {
                            1: {
                                name: "right",
                                value: q
                            }
                        }
                    }
                } else t && (this.scrollablePixelsY = q = Math.max(0,
                    t - this.chartHeight)) && (this.plotHeight += q, this.inverted ? (this.clipBox.width += q, this.plotBox.width += q) : (this.clipBox.height += q, this.plotBox.height += q), y = {
                    2: {
                        name: "bottom",
                        value: q
                    }
                });
                y && !g.skipAxes && this.axes.forEach(function (g) {
                    y[g.side] ? g.getPlotLinePath = function () {
                        var t = y[g.side].name,
                            n = this[t];
                        this[t] = n - y[g.side].value;
                        var r = c.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this[t] = n;
                        return r
                    } : (g.setAxisSize(), g.setAxisTranslation())
                })
            }
        });
        y(g, "render", function () {
            this.scrollablePixelsX || this.scrollablePixelsY ?
                (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        g.prototype.setUpScrolling = function () {
            var c = this,
                g = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (g.overflowX = "auto");
            this.scrollablePixelsY && (g.overflowY = "auto");
            this.scrollingContainer = B("div", {
                className: "highcharts-scrolling"
            }, g, this.renderTo);
            y(this.scrollingContainer, "scroll", function () {
                c.pointer && delete c.pointer.chartPosition
            });
            this.innerContainer =
                B("div", {
                    className: "highcharts-inner-container"
                }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        g.prototype.moveFixedElements = function () {
            var c = this.container,
                g = this.fixedRenderer,
                q = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                y;
            this.scrollablePixelsX && !this.inverted ? y = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? y = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? y = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (y = ".highcharts-yaxis");
            q.push(y, y + "-labels");
            q.forEach(function (t) {
                [].forEach.call(c.querySelectorAll(t), function (c) {
                    (c.namespaceURI === g.SVG_NS ? g.box : g.box.parentNode).appendChild(c);
                    c.style.pointerEvents = "auto"
                })
            })
        };
        g.prototype.applyFixed = function () {
            var g, t, q = !this.fixedDiv,
                L =
                this.options.chart.scrollablePlotArea;
            q ? (this.fixedDiv = B("div", {
                className: "highcharts-fixed"
            }, {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 2
            }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = t = new c.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight, null === (g = this.options.chart) || void 0 === g ? void 0 : g.style), this.scrollableMask = t.path().attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": H(L.opacity, .85),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(), y(this, "afterShowResetZoom", this.moveFixedElements), y(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            g = this.chartWidth + (this.scrollablePixelsX || 0);
            t = this.chartHeight + (this.scrollablePixelsY || 0);
            D(this.container);
            this.container.style.width = g + "px";
            this.container.style.height = t + "px";
            this.renderer.boxWrapper.attr({
                width: g,
                height: t,
                viewBox: [0, 0, g, t].join(" ")
            });
            this.chartBackground.attr({
                width: g,
                height: t
            });
            this.scrollingContainer.style.height = this.chartHeight + "px";
            q && (L.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * L.scrollPositionX), L.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * L.scrollPositionY));
            t = this.axisOffset;
            q = this.plotTop - t[0] - 1;
            L = this.plotLeft - t[3] - 1;
            g = this.plotTop + this.plotHeight + t[2] + 1;
            t = this.plotLeft + this.plotWidth + t[1] + 1;
            var v = this.plotLeft + this.plotWidth -
                (this.scrollablePixelsX || 0),
                K = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            q = this.scrollablePixelsX ? [
                ["M", 0, q],
                ["L", this.plotLeft - 1, q],
                ["L", this.plotLeft - 1, g],
                ["L", 0, g],
                ["Z"],
                ["M", v, q],
                ["L", this.chartWidth, q],
                ["L", this.chartWidth, g],
                ["L", v, g],
                ["Z"]
            ] : this.scrollablePixelsY ? [
                ["M", L, 0],
                ["L", L, this.plotTop - 1],
                ["L", t, this.plotTop - 1],
                ["L", t, 0],
                ["Z"],
                ["M", L, K],
                ["L", L, this.chartHeight],
                ["L", t, this.chartHeight],
                ["L", t, K],
                ["Z"]
            ] : [
                ["M", 0, 0]
            ];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: q
            })
        }
    });
    O(q, "parts/StackingAxis.js", [q["parts/Utilities.js"]], function (g) {
        var c = g.addEvent,
            q = g.destroyObjectProperties,
            y = g.fireEvent,
            B = g.objectEach,
            H = g.pick,
            D = function () {
                function c(c) {
                    this.oldStacks = {};
                    this.stacks = {};
                    this.stacksTouched = 0;
                    this.axis = c
                }
                c.prototype.buildStacks = function () {
                    var c = this.axis,
                        g = c.series,
                        q = H(c.options.reversedStacks, !0),
                        v = g.length,
                        D;
                    if (!c.isXAxis) {
                        this.usePercentage = !1;
                        for (D = v; D--;) {
                            var n = g[q ? D : v - D - 1];
                            n.setStackedPoints();
                            n.setGroupedPoints()
                        }
                        for (D = 0; D < v; D++) g[D].modifyStacks();
                        y(c,
                            "afterBuildStacks")
                    }
                };
                c.prototype.cleanStacks = function () {
                    if (!this.axis.isXAxis) {
                        if (this.oldStacks) var c = this.stacks = this.oldStacks;
                        B(c, function (c) {
                            B(c, function (c) {
                                c.cumulative = c.total
                            })
                        })
                    }
                };
                c.prototype.resetStacks = function () {
                    var c = this,
                        g = c.stacks;
                    c.axis.isXAxis || B(g, function (g) {
                        B(g, function (q, t) {
                            q.touched < c.stacksTouched ? (q.destroy(), delete g[t]) : (q.total = null, q.cumulative = null)
                        })
                    })
                };
                c.prototype.renderStackTotals = function () {
                    var c = this.axis.chart,
                        g = c.renderer,
                        q = this.stacks,
                        v = this.stackTotalGroup = this.stackTotalGroup ||
                        g.g("stack-labels").attr({
                            visibility: "visible",
                            zIndex: 6
                        }).add();
                    v.translate(c.plotLeft, c.plotTop);
                    B(q, function (c) {
                        B(c, function (c) {
                            c.render(v)
                        })
                    })
                };
                return c
            }();
        return function () {
            function g() {}
            g.compose = function (q) {
                c(q, "init", g.onInit);
                c(q, "destroy", g.onDestroy)
            };
            g.onDestroy = function () {
                var c = this.stacking;
                if (c) {
                    var g = c.stacks;
                    B(g, function (c, t) {
                        q(c);
                        g[t] = null
                    });
                    c && c.stackTotalGroup && c.stackTotalGroup.destroy()
                }
            };
            g.onInit = function () {
                this.stacking || (this.stacking = new D(this))
            };
            return g
        }()
    });
    O(q, "mixins/legend-symbol.js",
        [q["parts/Globals.js"], q["parts/Utilities.js"]],
        function (g, c) {
            var q = c.merge,
                y = c.pick;
            g.LegendSymbolMixin = {
                drawRectangle: function (c, g) {
                    var q = c.symbolHeight,
                        B = c.options.squareSymbol;
                    g.legendSymbol = this.chart.renderer.rect(B ? (c.symbolWidth - q) / 2 : 0, c.baseline - q + 1, B ? q : c.symbolWidth, q, y(c.options.symbolRadius, q / 2)).addClass("highcharts-point").attr({
                        zIndex: 3
                    }).add(g.legendGroup)
                },
                drawLineMarker: function (c) {
                    var g = this.options,
                        D = g.marker,
                        B = c.symbolWidth,
                        t = c.symbolHeight,
                        G = t / 2,
                        L = this.chart.renderer,
                        v = this.legendGroup;
                    c = c.baseline - Math.round(.3 * c.fontMetrics.b);
                    var K = {};
                    this.chart.styledMode || (K = {
                        "stroke-width": g.lineWidth || 0
                    }, g.dashStyle && (K.dashstyle = g.dashStyle));
                    this.legendLine = L.path(["M", 0, c, "L", B, c]).addClass("highcharts-graph").attr(K).add(v);
                    D && !1 !== D.enabled && B && (g = Math.min(y(D.radius, G), G), 0 === this.symbol.indexOf("url") && (D = q(D, {
                        width: t,
                        height: t
                    }), g = 0), this.legendSymbol = D = L.symbol(this.symbol, B / 2 - g, c - g, 2 * g, 2 * g, D).addClass("highcharts-point").add(v), D.isMarker = !0)
                }
            };
            return g.LegendSymbolMixin
        });
    O(q, "parts/Point.js",
        [q["parts/Globals.js"], q["parts/Utilities.js"]],
        function (g, c) {
            var q = c.animObject,
                y = c.defined,
                B = c.erase,
                H = c.extend,
                D = c.fireEvent,
                J = c.format,
                t = c.getNestedProperty,
                G = c.isArray,
                L = c.isNumber,
                v = c.isObject,
                K = c.syncTimeout,
                n = c.pick,
                r = c.removeEvent,
                C = c.uniqueKey;
            "";
            c = function () {
                function c() {
                    this.colorIndex = this.category = void 0;
                    this.formatPrefix = "point";
                    this.id = void 0;
                    this.isNull = !1;
                    this.percentage = this.options = this.name = void 0;
                    this.selected = !1;
                    this.total = this.series = void 0;
                    this.visible = !0;
                    this.x = void 0
                }
                c.prototype.animateBeforeDestroy =
                    function () {
                        var c = this,
                            m = {
                                x: c.startXPos,
                                opacity: 0
                            },
                            d, l = c.getGraphicalProps();
                        l.singular.forEach(function (l) {
                            d = "dataLabel" === l;
                            c[l] = c[l].animate(d ? {
                                x: c[l].startXPos,
                                y: c[l].startYPos,
                                opacity: 0
                            } : m)
                        });
                        l.plural.forEach(function (d) {
                            c[d].forEach(function (d) {
                                d.element && d.animate(H({
                                    x: c.startXPos
                                }, d.startYPos ? {
                                    x: d.startXPos,
                                    y: d.startYPos
                                } : {}))
                            })
                        })
                    };
                c.prototype.applyOptions = function (p, m) {
                    var d = this.series,
                        l = d.options.pointValKey || d.pointValKey;
                    p = c.prototype.optionsToObject.call(this, p);
                    H(this, p);
                    this.options =
                        this.options ? H(this.options, p) : p;
                    p.group && delete this.group;
                    p.dataLabels && delete this.dataLabels;
                    l && (this.y = c.prototype.getNestedProperty.call(this, l));
                    this.formatPrefix = (this.isNull = n(this.isValid && !this.isValid(), null === this.x || !L(this.y))) ? "null" : "point";
                    this.selected && (this.state = "select");
                    "name" in this && "undefined" === typeof m && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                    "undefined" === typeof this.x && d && (this.x = "undefined" === typeof m ? d.autoIncrement(this) : m);
                    return this
                };
                c.prototype.destroy =
                    function () {
                        function c() {
                            if (m.graphic || m.dataLabel || m.dataLabels) r(m), m.destroyElements();
                            for (a in m) m[a] = null
                        }
                        var m = this,
                            d = m.series,
                            l = d.chart;
                        d = d.options.dataSorting;
                        var k = l.hoverPoints,
                            f = q(m.series.chart.renderer.globalAnimation),
                            a;
                        m.legendItem && l.legend.destroyItem(m);
                        k && (m.setState(), B(k, m), k.length || (l.hoverPoints = null));
                        if (m === l.hoverPoint) m.onMouseOut();
                        d && d.enabled ? (this.animateBeforeDestroy(), K(c, f.duration)) : c();
                        l.pointCount--
                    };
                c.prototype.destroyElements = function (c) {
                    var m = this;
                    c = m.getGraphicalProps(c);
                    c.singular.forEach(function (d) {
                        m[d] = m[d].destroy()
                    });
                    c.plural.forEach(function (d) {
                        m[d].forEach(function (d) {
                            d.element && d.destroy()
                        });
                        delete m[d]
                    })
                };
                c.prototype.firePointEvent = function (c, m, d) {
                    var l = this,
                        k = this.series.options;
                    (k.point.events[c] || l.options && l.options.events && l.options.events[c]) && l.importEvents();
                    "click" === c && k.allowPointSelect && (d = function (d) {
                        l.select && l.select(null, d.ctrlKey || d.metaKey || d.shiftKey)
                    });
                    D(l, c, m, d)
                };
                c.prototype.getClassName = function () {
                    return "highcharts-point" + (this.selected ?
                        " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                };
                c.prototype.getGraphicalProps = function (c) {
                    var m = this,
                        d = [],
                        l, k = {
                            singular: [],
                            plural: []
                        };
                    c = c || {
                        graphic: 1,
                        dataLabel: 1
                    };
                    c.graphic && d.push("graphic", "shadowGroup");
                    c.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                    for (l = d.length; l--;) {
                        var f = d[l];
                        m[f] && k.singular.push(f)
                    } ["dataLabel", "connector"].forEach(function (a) {
                        var d = a + "s";
                        c[a] && m[d] && k.plural.push(d)
                    });
                    return k
                };
                c.prototype.getLabelConfig = function () {
                    return {
                        x: this.category,
                        y: this.y,
                        color: this.color,
                        colorIndex: this.colorIndex,
                        key: this.name || this.category,
                        series: this.series,
                        point: this,
                        percentage: this.percentage,
                        total: this.total || this.stackTotal
                    }
                };
                c.prototype.getNestedProperty = function (c) {
                    if (c) return 0 ===
                        c.indexOf("custom.") ? t(c, this.options) : this[c]
                };
                c.prototype.getZone = function () {
                    var c = this.series,
                        m = c.zones;
                    c = c.zoneAxis || "y";
                    var d = 0,
                        l;
                    for (l = m[d]; this[c] >= l.value;) l = m[++d];
                    this.nonZonedColor || (this.nonZonedColor = this.color);
                    this.color = l && l.color && !this.options.color ? l.color : this.nonZonedColor;
                    return l
                };
                c.prototype.hasNewShapeType = function () {
                    return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
                };
                c.prototype.init = function (c, m, d) {
                    this.series = c;
                    this.applyOptions(m,
                        d);
                    this.id = y(this.id) ? this.id : C();
                    this.resolveColor();
                    c.chart.pointCount++;
                    D(this, "afterInit");
                    return this
                };
                c.prototype.optionsToObject = function (g) {
                    var m = {},
                        d = this.series,
                        l = d.options.keys,
                        k = l || d.pointArrayMap || ["y"],
                        f = k.length,
                        a = 0,
                        p = 0;
                    if (L(g) || null === g) m[k[0]] = g;
                    else if (G(g))
                        for (!l && g.length > f && (d = typeof g[0], "string" === d ? m.name = g[0] : "number" === d && (m.x = g[0]), a++); p < f;) l && "undefined" === typeof g[a] || (0 < k[p].indexOf(".") ? c.prototype.setNestedProperty(m, g[a], k[p]) : m[k[p]] = g[a]), a++, p++;
                    else "object" ===
                        typeof g && (m = g, g.dataLabels && (d._hasPointLabels = !0), g.marker && (d._hasPointMarkers = !0));
                    return m
                };
                c.prototype.resolveColor = function () {
                    var c = this.series;
                    var m = c.chart.options.chart.colorCount;
                    var d = c.chart.styledMode;
                    delete this.nonZonedColor;
                    d || this.options.color || (this.color = c.color);
                    c.options.colorByPoint ? (d || (m = c.options.colors || c.chart.options.colors, this.color = this.color || m[c.colorCounter], m = m.length), d = c.colorCounter, c.colorCounter++, c.colorCounter === m && (c.colorCounter = 0)) : d = c.colorIndex;
                    this.colorIndex =
                        n(this.colorIndex, d)
                };
                c.prototype.setNestedProperty = function (c, m, d) {
                    d.split(".").reduce(function (d, c, f, a) {
                        d[c] = a.length - 1 === f ? m : v(d[c], !0) ? d[c] : {};
                        return d[c]
                    }, c);
                    return c
                };
                c.prototype.tooltipFormatter = function (c) {
                    var m = this.series,
                        d = m.tooltipOptions,
                        l = n(d.valueDecimals, ""),
                        k = d.valuePrefix || "",
                        f = d.valueSuffix || "";
                    m.chart.styledMode && (c = m.chart.tooltip.styledModeFormat(c));
                    (m.pointArrayMap || ["y"]).forEach(function (a) {
                        a = "{point." + a;
                        if (k || f) c = c.replace(RegExp(a + "}", "g"), k + a + "}" + f);
                        c = c.replace(RegExp(a +
                            "}", "g"), a + ":,." + l + "f}")
                    });
                    return J(c, {
                        point: this,
                        series: this.series
                    }, m.chart)
                };
                return c
            }();
            return g.Point = c
        });
    O(q, "parts/Series.js", [q["parts/Globals.js"], q["mixins/legend-symbol.js"], q["parts/Options.js"], q["parts/Point.js"], q["parts/SVGElement.js"], q["parts/Utilities.js"]], function (g, c, q, y, B, H) {
        var D = q.defaultOptions,
            J = H.addEvent,
            t = H.animObject,
            G = H.arrayMax,
            L = H.arrayMin,
            v = H.clamp,
            K = H.correctFloat,
            n = H.defined,
            r = H.erase,
            C = H.error,
            I = H.extend,
            p = H.find,
            m = H.fireEvent,
            d = H.getNestedProperty,
            l = H.isArray,
            k = H.isFunction,
            f = H.isNumber,
            a = H.isString,
            A = H.merge,
            u = H.objectEach,
            E = H.pick,
            P = H.removeEvent;
        q = H.seriesType;
        var w = H.splat,
            M = H.syncTimeout;
        "";
        var F = g.seriesTypes,
            Q = g.win;
        g.Series = q("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: "#ffffff",
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function () {
                    var a = this.series.chart.numberFormatter;
                    return "number" !== typeof this.y ? "" : a(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            axisTypes: ["xAxis", "yAxis"],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            eventsToUnbind: [],
            isCartesian: !0,
            parallelArrays: ["x", "y"],
            pointClass: y,
            requireSorting: !0,
            sorted: !0,
            init: function (a, b) {
                m(this, "init", {
                    options: b
                });
                var e = this,
                    d = a.series,
                    c;
                this.eventOptions = this.eventOptions || {};
                e.chart = a;
                e.options = b = e.setOptions(b);
                e.linkedSeries = [];
                e.bindAxes();
                I(e, {
                    name: b.name,
                    state: "",
                    visible: !1 !==
                        b.visible,
                    selected: !0 === b.selected
                });
                var f = b.events;
                u(f, function (b, a) {
                    k(b) && e.eventOptions[a] !== b && (k(e.eventOptions[a]) && P(e, a, e.eventOptions[a]), e.eventOptions[a] = b, J(e, a, b))
                });
                if (f && f.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                e.getColor();
                e.getSymbol();
                e.parallelArrays.forEach(function (b) {
                    e[b + "Data"] || (e[b + "Data"] = [])
                });
                e.isCartesian && (a.hasCartesianSeries = !0);
                d.length && (c = d[d.length - 1]);
                e._i = E(c && c._i, -1) + 1;
                e.opacity = e.options.opacity;
                a.orderSeries(this.insert(d));
                b.dataSorting && b.dataSorting.enabled ? e.setDataSortingOptions() : e.points || e.data || e.setData(b.data, !1);
                m(this, "afterInit")
            },
            is: function (a) {
                return F[a] && this instanceof F[a]
            },
            insert: function (a) {
                var b = this.options.index,
                    e;
                if (f(b)) {
                    for (e = a.length; e--;)
                        if (b >= E(a[e].options.index, a[e]._i)) {
                            a.splice(e + 1, 0, this);
                            break
                        } - 1 === e && a.unshift(this);
                    e += 1
                } else a.push(this);
                return E(e, a.length - 1)
            },
            bindAxes: function () {
                var a = this,
                    b = a.options,
                    d = a.chart,
                    c;
                m(this, "bindAxes", null, function () {
                    (a.axisTypes || []).forEach(function (e) {
                        d[e].forEach(function (d) {
                            c =
                                d.options;
                            if (b[e] === c.index || "undefined" !== typeof b[e] && b[e] === c.id || "undefined" === typeof b[e] && 0 === c.index) a.insert(d.series), a[e] = d, d.isDirty = !0
                        });
                        a[e] || a.optionalAxis === e || C(18, !0, d)
                    })
                });
                m(this, "afterBindAxes")
            },
            updateParallelArrays: function (a, b) {
                var e = a.series,
                    d = arguments,
                    c = f(b) ? function (d) {
                        var c = "y" === d && e.toYData ? e.toYData(a) : a[d];
                        e[d + "Data"][b] = c
                    } : function (a) {
                        Array.prototype[b].apply(e[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                e.parallelArrays.forEach(c)
            },
            hasData: function () {
                return this.visible &&
                    "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
            },
            autoIncrement: function () {
                var a = this.options,
                    b = this.xIncrement,
                    d, c = a.pointIntervalUnit,
                    f = this.chart.time;
                b = E(b, a.pointStart, 0);
                this.pointInterval = d = E(this.pointInterval, a.pointInterval, 1);
                c && (a = new f.Date(b), "day" === c ? f.set("Date", a, f.get("Date", a) + d) : "month" === c ? f.set("Month", a, f.get("Month", a) + d) : "year" === c && f.set("FullYear", a, f.get("FullYear", a) + d), d = a.getTime() - b);
                this.xIncrement =
                    b + d;
                return b
            },
            setDataSortingOptions: function () {
                var a = this.options;
                I(this, {
                    requireSorting: !1,
                    sorted: !1,
                    enabledDataSorting: !0,
                    allowDG: !1
                });
                n(a.pointRange) || (a.pointRange = 1)
            },
            setOptions: function (a) {
                var b = this.chart,
                    e = b.options,
                    d = e.plotOptions,
                    c = b.userOptions || {};
                a = A(a);
                b = b.styledMode;
                var f = {
                    plotOptions: d,
                    userOptions: a
                };
                m(this, "setOptions", f);
                var l = f.plotOptions[this.type],
                    k = c.plotOptions || {};
                this.userOptions = f.userOptions;
                c = A(l, d.series, c.plotOptions && c.plotOptions[this.type], a);
                this.tooltipOptions =
                    A(D.tooltip, D.plotOptions.series && D.plotOptions.series.tooltip, D.plotOptions[this.type].tooltip, e.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip);
                this.stickyTracking = E(a.stickyTracking, k[this.type] && k[this.type].stickyTracking, k.series && k.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : c.stickyTracking);
                null === l.marker && delete c.marker;
                this.zoneAxis = c.zoneAxis;
                e = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones ||
                    (d = {
                        value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                        className: "highcharts-negative"
                    }, b || (d.color = c.negativeColor, d.fillColor = c.negativeFillColor), e.push(d));
                e.length && n(e[e.length - 1].value) && e.push(b ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                m(this, "afterSetOptions", {
                    options: c
                });
                return c
            },
            getName: function () {
                return E(this.options.name, "Series " + (this.index + 1))
            },
            getCyclic: function (a, b, d) {
                var e = this.chart,
                    c = this.userOptions,
                    h = a + "Index",
                    f = a + "Counter",
                    l = d ? d.length : E(e.options.chart[a + "Count"],
                        e[a + "Count"]);
                if (!b) {
                    var k = E(c[h], c["_" + h]);
                    n(k) || (e.series.length || (e[f] = 0), c["_" + h] = k = e[f] % l, e[f] += 1);
                    d && (b = d[k])
                }
                "undefined" !== typeof k && (this[h] = k);
                this[a] = b
            },
            getColor: function () {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || D.plotOptions[this.type].color, this.chart.options.colors)
            },
            getPointsCollection: function () {
                return (this.hasGroupedData ? this.points : this.data) || []
            },
            getSymbol: function () {
                this.getCyclic("symbol",
                    this.options.marker.symbol, this.chart.options.symbols)
            },
            findPointIndex: function (a, b) {
                var e = a.id,
                    d = a.x,
                    c = this.points,
                    l, k = this.options.dataSorting;
                if (e) var m = this.chart.get(e);
                else if (this.linkedParent || this.enabledDataSorting) {
                    var g = k && k.matchByName ? "name" : "index";
                    m = p(c, function (b) {
                        return !b.touched && b[g] === a[g]
                    });
                    if (!m) return
                }
                if (m) {
                    var n = m && m.index;
                    "undefined" !== typeof n && (l = !0)
                }
                "undefined" === typeof n && f(d) && (n = this.xData.indexOf(d, b)); - 1 !== n && "undefined" !== typeof n && this.cropped && (n = n >= this.cropStart ?
                    n - this.cropStart : n);
                !l && c[n] && c[n].touched && (n = void 0);
                return n
            },
            drawLegendSymbol: c.drawLineMarker,
            updateData: function (a, b) {
                var e = this.options,
                    d = e.dataSorting,
                    c = this.points,
                    l = [],
                    k, m, g, p = this.requireSorting,
                    u = a.length === c.length,
                    w = !0;
                this.xIncrement = null;
                a.forEach(function (b, a) {
                    var h = n(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b) || {};
                    var m = h.x;
                    if (h.id || f(m)) {
                        if (m = this.findPointIndex(h, g), -1 === m || "undefined" === typeof m ? l.push(b) : c[m] && b !== e.data[m] ? (c[m].update(b, !1, null, !1),
                                c[m].touched = !0, p && (g = m + 1)) : c[m] && (c[m].touched = !0), !u || a !== m || d && d.enabled || this.hasDerivedData) k = !0
                    } else l.push(b)
                }, this);
                if (k)
                    for (a = c.length; a--;)(m = c[a]) && !m.touched && m.remove && m.remove(!1, b);
                else !u || d && d.enabled ? w = !1 : (a.forEach(function (b, a) {
                    c[a].update && b !== c[a].y && c[a].update(b, !1, null, !1)
                }), l.length = 0);
                c.forEach(function (b) {
                    b && (b.touched = !1)
                });
                if (!w) return !1;
                l.forEach(function (b) {
                    this.addPoint(b, !1, null, null, !1)
                }, this);
                null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement =
                    G(this.xData), this.autoIncrement());
                return !0
            },
            setData: function (e, b, d, c) {
                var h = this,
                    k = h.points,
                    m = k && k.length || 0,
                    g, p = h.options,
                    n = h.chart,
                    u = p.dataSorting,
                    w = null,
                    z = h.xAxis;
                w = p.turboThreshold;
                var r = this.xData,
                    q = this.yData,
                    A = (g = h.pointArrayMap) && g.length,
                    t = p.keys,
                    v = 0,
                    F = 1,
                    M;
                e = e || [];
                g = e.length;
                b = E(b, !0);
                u && u.enabled && (e = this.sortData(e));
                !1 !== c && g && m && !h.cropped && !h.hasGroupedData && h.visible && !h.isSeriesBoosting && (M = this.updateData(e, d));
                if (!M) {
                    h.xIncrement = null;
                    h.colorCounter = 0;
                    this.parallelArrays.forEach(function (b) {
                        h[b +
                            "Data"].length = 0
                    });
                    if (w && g > w)
                        if (w = h.getFirstValidPoint(e), f(w))
                            for (d = 0; d < g; d++) r[d] = this.autoIncrement(), q[d] = e[d];
                        else if (l(w))
                        if (A)
                            for (d = 0; d < g; d++) c = e[d], r[d] = c[0], q[d] = c.slice(1, A + 1);
                        else
                            for (t && (v = t.indexOf("x"), F = t.indexOf("y"), v = 0 <= v ? v : 0, F = 0 <= F ? F : 1), d = 0; d < g; d++) c = e[d], r[d] = c[v], q[d] = c[F];
                    else C(12, !1, n);
                    else
                        for (d = 0; d < g; d++) "undefined" !== typeof e[d] && (c = {
                            series: h
                        }, h.pointClass.prototype.applyOptions.apply(c, [e[d]]), h.updateParallelArrays(c, d));
                    q && a(q[0]) && C(14, !0, n);
                    h.data = [];
                    h.options.data =
                        h.userOptions.data = e;
                    for (d = m; d--;) k[d] && k[d].destroy && k[d].destroy();
                    z && (z.minRange = z.userMinRange);
                    h.isDirty = n.isDirtyBox = !0;
                    h.isDirtyData = !!k;
                    d = !1
                }
                "point" === p.legendType && (this.processData(), this.generatePoints());
                b && n.redraw(d)
            },
            sortData: function (a) {
                var b = this,
                    e = b.options.dataSorting.sortKey || "y",
                    c = function (b, a) {
                        return n(a) && b.pointClass.prototype.optionsToObject.call({
                            series: b
                        }, a) || {}
                    };
                a.forEach(function (e, d) {
                    a[d] = c(b, e);
                    a[d].index = d
                }, this);
                a.concat().sort(function (b, a) {
                    b = d(e, b);
                    a = d(e, a);
                    return a <
                        b ? -1 : a > b ? 1 : 0
                }).forEach(function (b, a) {
                    b.x = a
                }, this);
                b.linkedSeries && b.linkedSeries.forEach(function (b) {
                    var e = b.options,
                        d = e.data;
                    e.dataSorting && e.dataSorting.enabled || !d || (d.forEach(function (e, h) {
                        d[h] = c(b, e);
                        a[h] && (d[h].x = a[h].x, d[h].index = h)
                    }), b.setData(d, !1))
                });
                return a
            },
            getProcessedData: function (a) {
                var b = this.xData,
                    e = this.yData,
                    d = b.length;
                var c = 0;
                var f = this.xAxis,
                    l = this.options;
                var k = l.cropThreshold;
                var m = a || this.getExtremesFromAll || l.getExtremesFromAll,
                    g = this.isCartesian;
                a = f && f.val2lin;
                l = !(!f || !f.logarithmic);
                var p = this.requireSorting;
                if (f) {
                    f = f.getExtremes();
                    var n = f.min;
                    var w = f.max
                }
                if (g && this.sorted && !m && (!k || d > k || this.forceCrop))
                    if (b[d - 1] < n || b[0] > w) b = [], e = [];
                    else if (this.yData && (b[0] < n || b[d - 1] > w)) {
                    c = this.cropData(this.xData, this.yData, n, w);
                    b = c.xData;
                    e = c.yData;
                    c = c.start;
                    var u = !0
                }
                for (k = b.length || 1; --k;)
                    if (d = l ? a(b[k]) - a(b[k - 1]) : b[k] - b[k - 1], 0 < d && ("undefined" === typeof r || d < r)) var r = d;
                    else 0 > d && p && (C(15, !1, this.chart), p = !1);
                return {
                    xData: b,
                    yData: e,
                    cropped: u,
                    cropStart: c,
                    closestPointRange: r
                }
            },
            processData: function (a) {
                var b =
                    this.xAxis;
                if (this.isCartesian && !this.isDirty && !b.isDirty && !this.yAxis.isDirty && !a) return !1;
                a = this.getProcessedData();
                this.cropped = a.cropped;
                this.cropStart = a.cropStart;
                this.processedXData = a.xData;
                this.processedYData = a.yData;
                this.closestPointRange = this.basePointRange = a.closestPointRange
            },
            cropData: function (a, b, d, c, f) {
                var e = a.length,
                    h = 0,
                    k = e,
                    l;
                f = E(f, this.cropShoulder);
                for (l = 0; l < e; l++)
                    if (a[l] >= d) {
                        h = Math.max(0, l - f);
                        break
                    } for (d = l; d < e; d++)
                    if (a[d] > c) {
                        k = d + f;
                        break
                    } return {
                    xData: a.slice(h, k),
                    yData: b.slice(h, k),
                    start: h,
                    end: k
                }
            },
            generatePoints: function () {
                var a = this.options,
                    b = a.data,
                    d = this.data,
                    c, f = this.processedXData,
                    k = this.processedYData,
                    l = this.pointClass,
                    g = f.length,
                    p = this.cropStart || 0,
                    n = this.hasGroupedData;
                a = a.keys;
                var u = [],
                    r;
                d || n || (d = [], d.length = b.length, d = this.data = d);
                a && n && (this.options.keys = !1);
                for (r = 0; r < g; r++) {
                    var q = p + r;
                    if (n) {
                        var A = (new l).init(this, [f[r]].concat(w(k[r])));
                        A.dataGroup = this.groupMap[r];
                        A.dataGroup.options && (A.options = A.dataGroup.options, I(A, A.dataGroup.options), delete A.dataLabels)
                    } else(A =
                        d[q]) || "undefined" === typeof b[q] || (d[q] = A = (new l).init(this, b[q], f[r]));
                    A && (A.index = q, u[r] = A)
                }
                this.options.keys = a;
                if (d && (g !== (c = d.length) || n))
                    for (r = 0; r < c; r++) r !== p || n || (r += g), d[r] && (d[r].destroyElements(), d[r].plotX = void 0);
                this.data = d;
                this.points = u;
                m(this, "afterGeneratePoints")
            },
            getXExtremes: function (a) {
                return {
                    min: L(a),
                    max: G(a)
                }
            },
            getExtremes: function (a, b) {
                var d = this.xAxis,
                    e = this.yAxis,
                    c = this.processedXData || this.xData,
                    k = [],
                    g = 0,
                    p = 0;
                var n = 0;
                var w = this.requireSorting ? this.cropShoulder : 0,
                    u = e ? e.positiveValuesOnly :
                    !1,
                    r;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                d && (n = d.getExtremes(), p = n.min, n = n.max);
                for (r = 0; r < e; r++) {
                    var q = c[r];
                    var A = a[r];
                    var t = (f(A) || l(A)) && (A.length || 0 < A || !u);
                    q = b || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !d || (c[r + w] || q) >= p && (c[r - w] || q) <= n;
                    if (t && q)
                        if (t = A.length)
                            for (; t--;) f(A[t]) && (k[g++] = A[t]);
                        else k[g++] = A
                }
                a = {
                    dataMin: L(k),
                    dataMax: G(k)
                };
                m(this, "afterGetExtremes", {
                    dataExtremes: a
                });
                return a
            },
            applyExtremes: function () {
                var a = this.getExtremes();
                this.dataMin =
                    a.dataMin;
                this.dataMax = a.dataMax;
                return a
            },
            getFirstValidPoint: function (a) {
                for (var b = null, d = a.length, e = 0; null === b && e < d;) b = a[e], e++;
                return b
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    d = this.xAxis,
                    c = d.categories,
                    k = this.enabledDataSorting,
                    g = this.yAxis,
                    p = this.points,
                    w = p.length,
                    u = !!this.modifyValue,
                    r, q = this.pointPlacementToXValue(),
                    A = !!q,
                    t = a.threshold,
                    C = a.startFromThreshold ? t : 0,
                    F, M = this.zoneAxis || "y",
                    y = Number.MAX_VALUE;
                for (r = 0; r <
                    w; r++) {
                    var I = p[r],
                        D = I.x,
                        B = I.y,
                        G = I.low,
                        P = b && g.stacking && g.stacking.stacks[(this.negStacks && B < (C ? 0 : t) ? "-" : "") + this.stackKey];
                    g.positiveValuesOnly && null !== B && 0 >= B && (I.isNull = !0);
                    I.plotX = F = K(v(d.translate(D, 0, 0, 0, 1, q, "flags" === this.type), -1E5, 1E5));
                    if (b && this.visible && P && P[D]) {
                        var H = this.getStackIndicator(H, D, this.index);
                        if (!I.isNull) {
                            var Q = P[D];
                            var J = Q.points[H.key]
                        }
                    }
                    l(J) && (G = J[0], B = J[1], G === C && H.key === P[D].base && (G = E(f(t) && t, g.min)), g.positiveValuesOnly && 0 >= G && (G = null), I.total = I.stackTotal = Q.total,
                        I.percentage = Q.total && I.y / Q.total * 100, I.stackY = B, this.irregularWidths || Q.setOffset(this.pointXOffset || 0, this.barW || 0));
                    I.yBottom = n(G) ? v(g.translate(G, 0, 1, 0, 1), -1E5, 1E5) : null;
                    u && (B = this.modifyValue(B, I));
                    I.plotY = "number" === typeof B && Infinity !== B ? v(g.translate(B, 0, 1, 0, 1), -1E5, 1E5) : void 0;
                    I.isInside = this.isPointInside(I);
                    I.clientX = A ? K(d.translate(D, 0, 0, 0, 1, q)) : F;
                    I.negative = I[M] < (a[M + "Threshold"] || t || 0);
                    I.category = c && "undefined" !== typeof c[I.x] ? c[I.x] : I.x;
                    if (!I.isNull && !1 !== I.visible) {
                        "undefined" !== typeof L &&
                            (y = Math.min(y, Math.abs(F - L)));
                        var L = F
                    }
                    I.zone = this.zones.length && I.getZone();
                    !I.graphic && this.group && k && (I.isNew = !0)
                }
                this.closestPointRangePx = y;
                m(this, "afterTranslate")
            },
            getValidPoints: function (a, b, d) {
                var e = this.chart;
                return (a || this.points || []).filter(function (a) {
                    return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : !1 !== a.visible && (d || !a.isNull)
                })
            },
            getClipBox: function (a, b) {
                var d = this.options,
                    e = this.chart,
                    c = e.inverted,
                    f = this.xAxis,
                    k = f && this.yAxis,
                    l = e.options.chart.scrollablePlotArea || {};
                a && !1 ===
                    d.clip && k ? a = c ? {
                        y: -e.chartWidth + k.len + k.pos,
                        height: e.chartWidth,
                        width: e.chartHeight,
                        x: -e.chartHeight + f.len + f.pos
                    } : {
                        y: -k.pos,
                        height: e.chartHeight,
                        width: e.chartWidth,
                        x: -f.pos
                    } : (a = this.clipBox || e.clipBox, b && (a.width = e.plotSizeX, a.x = (e.scrollablePixelsX || 0) * (l.scrollPositionX || 0)));
                return b ? {
                    width: a.width,
                    x: a.x
                } : a
            },
            setClip: function (a) {
                var b = this.chart,
                    d = this.options,
                    e = b.renderer,
                    c = b.inverted,
                    f = this.clipBox,
                    k = this.getClipBox(a),
                    l = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, k.height, d.xAxis,
                        d.yAxis
                    ].join(),
                    m = b[l],
                    g = b[l + "m"];
                a && (k.width = 0, c && (k.x = b.plotHeight + (!1 !== d.clip ? 0 : b.plotTop)));
                m ? b.hasLoaded || m.attr(k) : (a && (b[l + "m"] = g = e.clipRect(c ? b.plotSizeX + 99 : -99, c ? -b.plotLeft : -b.plotTop, 99, c ? b.chartWidth : b.chartHeight)), b[l] = m = e.clipRect(k), m.count = {
                    length: 0
                });
                a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                if (!1 !== d.clip || a) this.group.clip(a || f ? m : b.clipRect), this.markerGroup.clip(g), this.sharedClipKey = l;
                a || (m.count[this.index] && (delete m.count[this.index], --m.count.length),
                    0 === m.count.length && l && b[l] && (f || (b[l] = b[l].destroy()), b[l + "m"] && (b[l + "m"] = b[l + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    d = t(this.options.animation);
                if (!b.hasRendered)
                    if (a) this.setClip(d);
                    else {
                        var e = this.sharedClipKey;
                        a = b[e];
                        var c = this.getClipBox(d, !0);
                        a && a.animate(c, d);
                        b[e + "m"] && b[e + "m"].animate({
                            width: c.width + 99,
                            x: c.x - (b.inverted ? 0 : 99)
                        }, d)
                    }
            },
            afterAnimate: function () {
                this.setClip();
                m(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function () {
                var a = this.points,
                    b = this.chart,
                    d, c, f = this.options.marker,
                    k = this[this.specialGroup] || this.markerGroup,
                    l = this.xAxis,
                    m = E(f.enabled, !l || l.isRadial ? !0 : null, this.closestPointRangePx >= f.enabledThreshold * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers)
                    for (d = 0; d < a.length; d++) {
                        var g = a[d];
                        var p = (c = g.graphic) ? "animate" : "attr";
                        var n = g.marker || {};
                        var w = !!g.marker;
                        if ((m && "undefined" === typeof n.enabled || n.enabled) && !g.isNull && !1 !== g.visible) {
                            var u = E(n.symbol, this.symbol);
                            var r = this.markerAttribs(g, g.selected && "select");
                            this.enabledDataSorting &&
                                (g.startXPos = l.reversed ? -r.width : l.width);
                            var q = !1 !== g.isInside;
                            c ? c[q ? "show" : "hide"](q).animate(r) : q && (0 < r.width || g.hasImage) && (g.graphic = c = b.renderer.symbol(u, r.x, r.y, r.width, r.height, w ? n : f).add(k), this.enabledDataSorting && b.hasRendered && (c.attr({
                                x: g.startXPos
                            }), p = "animate"));
                            c && "animate" === p && c[q ? "show" : "hide"](q).animate(r);
                            if (c && !b.styledMode) c[p](this.pointAttribs(g, g.selected && "select"));
                            c && c.addClass(g.getClassName(), !0)
                        } else c && (g.graphic = c.destroy())
                    }
            },
            markerAttribs: function (a, b) {
                var d = this.options,
                    e = d.marker,
                    c = a.marker || {},
                    f = c.symbol || e.symbol,
                    k = E(c.radius, e.radius);
                b && (e = e.states[b], b = c.states && c.states[b], k = E(b && b.radius, e && e.radius, k + (e && e.radiusPlus || 0)));
                a.hasImage = f && 0 === f.indexOf("url");
                a.hasImage && (k = 0);
                a = {
                    x: d.crisp ? Math.floor(a.plotX) - k : a.plotX - k,
                    y: a.plotY - k
                };
                k && (a.width = a.height = 2 * k);
                return a
            },
            pointAttribs: function (a, b) {
                var d = this.options.marker,
                    e = a && a.options,
                    c = e && e.marker || {},
                    f = this.color,
                    k = e && e.color,
                    l = a && a.color;
                e = E(c.lineWidth, d.lineWidth);
                var m = a && a.zone && a.zone.color;
                a = 1;
                f =
                    k || m || l || f;
                k = c.fillColor || d.fillColor || f;
                f = c.lineColor || d.lineColor || f;
                b = b || "normal";
                d = d.states[b];
                b = c.states && c.states[b] || {};
                e = E(b.lineWidth, d.lineWidth, e + E(b.lineWidthPlus, d.lineWidthPlus, 0));
                k = b.fillColor || d.fillColor || k;
                f = b.lineColor || d.lineColor || f;
                a = E(b.opacity, d.opacity, a);
                return {
                    stroke: f,
                    "stroke-width": e,
                    fill: k,
                    opacity: a
                }
            },
            destroy: function (a) {
                var b = this,
                    d = b.chart,
                    e = /AppleWebKit\/533/.test(Q.navigator.userAgent),
                    c, f, k = b.data || [],
                    l, g;
                m(b, "destroy");
                this.removeEvents(a);
                (b.axisTypes || []).forEach(function (a) {
                    (g =
                        b[a]) && g.series && (r(g.series, b), g.isDirty = g.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (f = k.length; f--;)(l = k[f]) && l.destroy && l.destroy();
                b.points = null;
                H.clearTimeout(b.animationTimeout);
                u(b, function (b, a) {
                    b instanceof B && !b.survive && (c = e && "group" === a ? "hide" : "destroy", b[c]())
                });
                d.hoverSeries === b && (d.hoverSeries = null);
                r(d.series, b);
                d.orderSeries();
                u(b, function (d, e) {
                    a && "hcEvents" === e || delete b[e]
                })
            },
            getGraphPath: function (a, b, d) {
                var e = this,
                    c = e.options,
                    f = c.step,
                    h, k = [],
                    l = [],
                    m;
                a = a ||
                    e.points;
                (h = a.reversed) && a.reverse();
                (f = {
                    right: 1,
                    center: 2
                } [f] || f && 3) && h && (f = 4 - f);
                a = this.getValidPoints(a, !1, !(c.connectNulls && !b && !d));
                a.forEach(function (h, g) {
                    var p = h.plotX,
                        r = h.plotY,
                        w = a[g - 1];
                    (h.leftCliff || w && w.rightCliff) && !d && (m = !0);
                    h.isNull && !n(b) && 0 < g ? m = !c.connectNulls : h.isNull && !b ? m = !0 : (0 === g || m ? g = [
                        ["M", h.plotX, h.plotY]
                    ] : e.getPointSpline ? g = [e.getPointSpline(a, h, g)] : f ? (g = 1 === f ? [
                        ["L", w.plotX, r]
                    ] : 2 === f ? [
                        ["L", (w.plotX + p) / 2, w.plotY],
                        ["L", (w.plotX + p) / 2, r]
                    ] : [
                        ["L", p, w.plotY]
                    ], g.push(["L", p, r])) : g = [
                        ["L",
                            p, r
                        ]
                    ], l.push(h.x), f && (l.push(h.x), 2 === f && l.push(h.x)), k.push.apply(k, g), m = !1)
                });
                k.xMap = l;
                return e.graphPath = k
            },
            drawGraph: function () {
                var a = this,
                    b = this.options,
                    d = (this.gappedPath || this.getGraphPath).call(this),
                    c = this.chart.styledMode,
                    f = [
                        ["graph", "highcharts-graph"]
                    ];
                c || f[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
                f = a.getZonesGraphs(f);
                f.forEach(function (e, f) {
                    var h = e[0],
                        k = a[h],
                        l = k ? "animate" : "attr";
                    k ? (k.endX = a.preventGraphAnimation ? null : d.xMap, k.animate({
                        d: d
                    })) : d.length && (a[h] = k = a.chart.renderer.path(d).addClass(e[1]).attr({
                        zIndex: 1
                    }).add(a.group));
                    k && !c && (h = {
                        stroke: e[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, e[3] ? h.dashstyle = e[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), k[l](h).shadow(2 > f && b.shadow));
                    k && (k.startX = d.xMap, k.isArea = d.isArea)
                })
            },
            getZonesGraphs: function (a) {
                this.zones.forEach(function (b, d) {
                    d = ["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (b.className || "")];
                    this.chart.styledMode || d.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                    a.push(d)
                }, this);
                return a
            },
            applyZones: function () {
                var a = this,
                    b = this.chart,
                    d = b.renderer,
                    c = this.zones,
                    f, k, l = this.clips || [],
                    m, g = this.graph,
                    p = this.area,
                    n = Math.max(b.chartWidth, b.chartHeight),
                    r = this[(this.zoneAxis || "y") + "Axis"],
                    w = b.inverted,
                    u, q, A, t = !1,
                    C, F;
                if (c.length && (g || p) && r && "undefined" !== typeof r.min) {
                    var M = r.reversed;
                    var I = r.horiz;
                    g && !this.showLine && g.hide();
                    p && p.hide();
                    var y = r.getExtremes();
                    c.forEach(function (e, c) {
                        f = M ? I ? b.plotWidth : 0 : I ? 0 : r.toPixels(y.min) || 0;
                        f = v(E(k, f), 0, n);
                        k = v(Math.round(r.toPixels(E(e.value, y.max),
                            !0) || 0), 0, n);
                        t && (f = k = r.toPixels(y.max));
                        u = Math.abs(f - k);
                        q = Math.min(f, k);
                        A = Math.max(f, k);
                        r.isXAxis ? (m = {
                            x: w ? A : q,
                            y: 0,
                            width: u,
                            height: n
                        }, I || (m.x = b.plotHeight - m.x)) : (m = {
                            x: 0,
                            y: w ? A : q,
                            width: n,
                            height: u
                        }, I && (m.y = b.plotWidth - m.y));
                        w && d.isVML && (m = r.isXAxis ? {
                            x: 0,
                            y: M ? q : A,
                            height: m.width,
                            width: b.chartWidth
                        } : {
                            x: m.y - b.plotLeft - b.spacingBox.x,
                            y: 0,
                            width: m.height,
                            height: b.chartHeight
                        });
                        l[c] ? l[c].animate(m) : l[c] = d.clipRect(m);
                        C = a["zone-area-" + c];
                        F = a["zone-graph-" + c];
                        g && F && F.clip(l[c]);
                        p && C && C.clip(l[c]);
                        t = e.value > y.max;
                        a.resetZones && 0 === k && (k = void 0)
                    });
                    this.clips = l
                } else a.visible && (g && g.show(!0), p && p.show(!0))
            },
            invertGroups: function (a) {
                function b() {
                    ["group", "markerGroup"].forEach(function (b) {
                        d[b] && (e.renderer.isVML && d[b].attr({
                            width: d.yAxis.len,
                            height: d.xAxis.len
                        }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(d.isRadialSeries ? !1 : a))
                    })
                }
                var d = this,
                    e = d.chart;
                d.xAxis && (d.eventsToUnbind.push(J(e, "resize", b)), b(), d.invertGroups = b)
            },
            plotGroup: function (a, b, d, c, f) {
                var e = this[a],
                    h = !e;
                d = {
                    visibility: d,
                    zIndex: c ||
                        .1
                };
                "undefined" === typeof this.opacity || this.chart.styledMode || (d.opacity = this.opacity);
                h && (this[a] = e = this.chart.renderer.g().add(f));
                e.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (n(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                e.attr(d)[h ? "attr" : "animate"](this.getPlotBox());
                return e
            },
            getPlotBox: function () {
                var a = this.chart,
                    b = this.xAxis,
                    d = this.yAxis;
                a.inverted && (b = d, d = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: d ? d.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            removeEvents: function (a) {
                a ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (b) {
                    b()
                }), this.eventsToUnbind.length = 0) : P(this)
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    d = a.options,
                    c = !a.finishedAnimating && b.renderer.isSVG && t(d.animation).duration,
                    f = a.visible ? "inherit" : "hidden",
                    k = d.zIndex,
                    l = a.hasRendered,
                    g = b.seriesGroup,
                    p = b.inverted;
                m(this, "render");
                var n = a.plotGroup("group",
                    "series", f, k, g);
                a.markerGroup = a.plotGroup("markerGroup", "markers", f, k, g);
                c && a.animate && a.animate(!0);
                n.inverted = a.isCartesian || a.invertable ? p : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.visible && a.drawPoints();
                a.drawDataLabels && a.drawDataLabels();
                a.redrawPoints && a.redrawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(p);
                !1 === d.clip || a.sharedClipKey || l || n.clip(b.clipRect);
                c && a.animate && a.animate();
                l || (a.animationTimeout = M(function () {
                        a.afterAnimate()
                    },
                    c || 0));
                a.isDirty = !1;
                a.hasRendered = !0;
                m(a, "afterRender")
            },
            redraw: function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    d = this.group,
                    c = this.xAxis,
                    f = this.yAxis;
                d && (a.inverted && d.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), d.animate({
                    translateX: E(c && c.left, a.plotLeft),
                    translateY: E(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var d = this.xAxis,
                    e = this.yAxis,
                    c = this.chart.inverted;
                return this.searchKDTree({
                    clientX: c ?
                        d.len - a.chartY + d.pos : a.chartX - d.pos,
                    plotY: c ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b, a)
            },
            buildKDTree: function (a) {
                function b(a, e, c) {
                    var f;
                    if (f = a && a.length) {
                        var h = d.kdAxisArray[e % c];
                        a.sort(function (a, b) {
                            return a[h] - b[h]
                        });
                        f = Math.floor(f / 2);
                        return {
                            point: a[f],
                            left: b(a.slice(0, f), e + 1, c),
                            right: b(a.slice(f + 1), e + 1, c)
                        }
                    }
                }
                this.buildingKdTree = !0;
                var d = this,
                    e = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete d.kdTree;
                M(function () {
                        d.kdTree = b(d.getValidPoints(null, !d.directTouch), e, e);
                        d.buildingKdTree = !1
                    }, d.options.kdNow ||
                    a && "touchstart" === a.type ? 0 : 1)
            },
            searchKDTree: function (a, b, d) {
                function e(a, b, d, l) {
                    var m = b.point,
                        g = c.kdAxisArray[d % l],
                        p = m;
                    var r = n(a[f]) && n(m[f]) ? Math.pow(a[f] - m[f], 2) : null;
                    var w = n(a[h]) && n(m[h]) ? Math.pow(a[h] - m[h], 2) : null;
                    w = (r || 0) + (w || 0);
                    m.dist = n(w) ? Math.sqrt(w) : Number.MAX_VALUE;
                    m.distX = n(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    g = a[g] - m[g];
                    w = 0 > g ? "left" : "right";
                    r = 0 > g ? "right" : "left";
                    b[w] && (w = e(a, b[w], d + 1, l), p = w[k] < p[k] ? w : m);
                    b[r] && Math.sqrt(g * g) < p[k] && (a = e(a, b[r], d + 1, l), p = a[k] < p[k] ? a : p);
                    return p
                }
                var c = this,
                    f =
                    this.kdAxisArray[0],
                    h = this.kdAxisArray[1],
                    k = b ? "distX" : "dist";
                b = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(d);
                if (this.kdTree) return e(a, this.kdTree, b, b)
            },
            pointPlacementToXValue: function () {
                var a = this.options,
                    b = a.pointRange,
                    d = this.xAxis;
                a = a.pointPlacement;
                "between" === a && (a = d.reversed ? -.5 : .5);
                return f(a) ? a * E(b, d.pointRange) : 0
            },
            isPointInside: function (a) {
                return "undefined" !== typeof a.plotY && "undefined" !== typeof a.plotX && 0 <= a.plotY && a.plotY <= this.yAxis.len &&
                    0 <= a.plotX && a.plotX <= this.xAxis.len
            }
        });
        ""
    });
    O(q, "parts/Stacking.js", [q["parts/Axis.js"], q["parts/Chart.js"], q["parts/Globals.js"], q["parts/StackingAxis.js"], q["parts/Utilities.js"]], function (g, c, q, y, B) {
        var H = B.correctFloat,
            D = B.defined,
            J = B.destroyObjectProperties,
            t = B.format,
            G = B.isNumber,
            L = B.pick;
        "";
        var v = q.Series,
            K = function () {
                function c(c, g, n, p, m) {
                    var d = c.chart.inverted;
                    this.axis = c;
                    this.isNegative = n;
                    this.options = g = g || {};
                    this.x = p;
                    this.total = null;
                    this.points = {};
                    this.hasValidPoints = !1;
                    this.stack = m;
                    this.rightCliff =
                        this.leftCliff = 0;
                    this.alignOptions = {
                        align: g.align || (d ? n ? "left" : "right" : "center"),
                        verticalAlign: g.verticalAlign || (d ? "middle" : n ? "bottom" : "top"),
                        y: g.y,
                        x: g.x
                    };
                    this.textAlign = g.textAlign || (d ? n ? "right" : "left" : "center")
                }
                c.prototype.destroy = function () {
                    J(this, this.axis)
                };
                c.prototype.render = function (c) {
                    var g = this.axis.chart,
                        n = this.options,
                        p = n.format;
                    p = p ? t(p, this, g) : n.formatter.call(this);
                    this.label ? this.label.attr({
                        text: p,
                        visibility: "hidden"
                    }) : (this.label = g.renderer.label(p, null, null, n.shape, null, null, n.useHTML,
                        !1, "stack-labels"), p = {
                        r: n.borderRadius || 0,
                        text: p,
                        rotation: n.rotation,
                        padding: L(n.padding, 5),
                        visibility: "hidden"
                    }, g.styledMode || (p.fill = n.backgroundColor, p.stroke = n.borderColor, p["stroke-width"] = n.borderWidth, this.label.css(n.style)), this.label.attr(p), this.label.added || this.label.add(c));
                    this.label.labelrank = g.plotHeight
                };
                c.prototype.setOffset = function (c, g, n, p, m) {
                    var d = this.axis,
                        l = d.chart;
                    p = d.translate(d.stacking.usePercentage ? 100 : p ? p : this.total, 0, 0, 0, 1);
                    n = d.translate(n ? n : 0);
                    n = D(p) && Math.abs(p - n);
                    c = L(m, l.xAxis[0].translate(this.x)) + c;
                    d = D(p) && this.getStackBox(l, this, c, p, g, n, d);
                    g = this.label;
                    n = this.isNegative;
                    c = "justify" === L(this.options.overflow, "justify");
                    var k = this.textAlign;
                    g && d && (m = g.getBBox(), p = g.padding, k = "left" === k ? l.inverted ? -p : p : "right" === k ? m.width : l.inverted && "center" === k ? m.width / 2 : l.inverted ? n ? m.width + p : -p : m.width / 2, n = l.inverted ? m.height / 2 : n ? -p : m.height, this.alignOptions.x = L(this.options.x, 0), this.alignOptions.y = L(this.options.y, 0), d.x -= k, d.y -= n, g.align(this.alignOptions, null, d),
                        l.isInsidePlot(g.alignAttr.x + k - this.alignOptions.x, g.alignAttr.y + n - this.alignOptions.y) ? g.show() : (g.alignAttr.y = -9999, c = !1), c && v.prototype.justifyDataLabel.call(this.axis, g, this.alignOptions, g.alignAttr, m, d), g.attr({
                            x: g.alignAttr.x,
                            y: g.alignAttr.y
                        }), L(!c && this.options.crop, !0) && ((l = G(g.x) && G(g.y) && l.isInsidePlot(g.x - p + g.width, g.y) && l.isInsidePlot(g.x + p, g.y)) || g.hide()))
                };
                c.prototype.getStackBox = function (c, g, n, p, m, d, l) {
                    var k = g.axis.reversed,
                        f = c.inverted,
                        a = l.height + l.pos - (f ? c.plotLeft : c.plotTop);
                    g =
                        g.isNegative && !k || !g.isNegative && k;
                    return {
                        x: f ? g ? p - l.right : p - d + l.pos - c.plotLeft : n + c.xAxis[0].transB - c.plotLeft,
                        y: f ? l.height - n - m : g ? a - p - d : a - p,
                        width: f ? d : m,
                        height: f ? m : d
                    }
                };
                return c
            }();
        c.prototype.getStacks = function () {
            var c = this,
                g = c.inverted;
            c.yAxis.forEach(function (c) {
                c.stacking && c.stacking.stacks && c.hasVisibleSeries && (c.stacking.oldStacks = c.stacking.stacks)
            });
            c.series.forEach(function (n) {
                var r = n.xAxis && n.xAxis.options || {};
                !n.options.stacking || !0 !== n.visible && !1 !== c.options.chart.ignoreHiddenSeries || (n.stackKey = [n.type, L(n.options.stack, ""), g ? r.top : r.left, g ? r.height : r.width].join())
            })
        };
        y.compose(g);
        v.prototype.setGroupedPoints = function () {
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length && v.prototype.setStackedPoints.call(this, "group")
        };
        v.prototype.setStackedPoints = function (c) {
            var g = c || this.options.stacking;
            if (g && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var n = this.processedXData,
                    q = this.processedYData,
                    p = [],
                    m = q.length,
                    d = this.options,
                    l = d.threshold,
                    k = L(d.startFromThreshold && l, 0);
                d = d.stack;
                c = c ? this.type + "," + g : this.stackKey;
                var f = "-" + c,
                    a = this.negStacks,
                    A = this.yAxis,
                    u = A.stacking.stacks,
                    t = A.stacking.oldStacks,
                    v, w;
                A.stacking.stacksTouched += 1;
                for (w = 0; w < m; w++) {
                    var M = n[w];
                    var F = q[w];
                    var y = this.getStackIndicator(y, M, this.index);
                    var e = y.key;
                    var b = (v = a && F < (k ? 0 : l)) ? f : c;
                    u[b] || (u[b] = {});
                    u[b][M] || (t[b] && t[b][M] ? (u[b][M] = t[b][M], u[b][M].total = null) : u[b][M] = new K(A, A.options.stackLabels, v, M, d));
                    b = u[b][M];
                    null !== F ?
                        (b.points[e] = b.points[this.index] = [L(b.cumulative, k)], D(b.cumulative) || (b.base = e), b.touched = A.stacking.stacksTouched, 0 < y.index && !1 === this.singleStacks && (b.points[e][0] = b.points[this.index + "," + M + ",0"][0])) : b.points[e] = b.points[this.index] = null;
                    "percent" === g ? (v = v ? c : f, a && u[v] && u[v][M] ? (v = u[v][M], b.total = v.total = Math.max(v.total, b.total) + Math.abs(F) || 0) : b.total = H(b.total + (Math.abs(F) || 0))) : "group" === g ? null !== F && (b.total = (b.total || 0) + 1) : b.total = H(b.total + (F || 0));
                    b.cumulative = "group" === g ? (b.total || 1) - 1 :
                        L(b.cumulative, k) + (F || 0);
                    null !== F && (b.points[e].push(b.cumulative), p[w] = b.cumulative, b.hasValidPoints = !0)
                }
                "percent" === g && (A.stacking.usePercentage = !0);
                "group" !== g && (this.stackedYData = p);
                A.stacking.oldStacks = {}
            }
        };
        v.prototype.modifyStacks = function () {
            var c = this,
                g = c.stackKey,
                q = c.yAxis.stacking.stacks,
                t = c.processedXData,
                p, m = c.options.stacking;
            c[m + "Stacker"] && [g, "-" + g].forEach(function (d) {
                for (var l = t.length, k, f; l--;)
                    if (k = t[l], p = c.getStackIndicator(p, k, c.index, d), f = (k = q[d] && q[d][k]) && k.points[p.key]) c[m +
                        "Stacker"](f, k, l)
            })
        };
        v.prototype.percentStacker = function (c, g, q) {
            g = g.total ? 100 / g.total : 0;
            c[0] = H(c[0] * g);
            c[1] = H(c[1] * g);
            this.stackedYData[q] = c[1]
        };
        v.prototype.getStackIndicator = function (c, g, q, t) {
            !D(c) || c.x !== g || t && c.key !== t ? c = {
                x: g,
                index: 0,
                key: t
            } : c.index++;
            c.key = [q, g, c.index].join();
            return c
        };
        q.StackItem = K;
        return q.StackItem
    });
    O(q, "parts/Dynamics.js", [q["parts/Axis.js"], q["parts/Chart.js"], q["parts/Globals.js"], q["parts/Options.js"], q["parts/Point.js"], q["parts/Time.js"], q["parts/Utilities.js"]], function (g,
        c, q, y, B, H, D) {
        var J = y.time,
            t = D.addEvent,
            G = D.animate,
            L = D.createElement,
            v = D.css,
            K = D.defined,
            n = D.erase,
            r = D.error,
            C = D.extend,
            I = D.fireEvent,
            p = D.isArray,
            m = D.isNumber,
            d = D.isObject,
            l = D.isString,
            k = D.merge,
            f = D.objectEach,
            a = D.pick,
            A = D.relativeLength,
            u = D.setAnimation,
            E = D.splat;
        y = q.Series;
        var P = q.seriesTypes;
        q.cleanRecursively = function (a, c) {
            var k = {};
            f(a, function (f, e) {
                if (d(a[e], !0) && !a.nodeType && c[e]) f = q.cleanRecursively(a[e], c[e]), Object.keys(f).length && (k[e] = f);
                else if (d(a[e]) || a[e] !== c[e]) k[e] = a[e]
            });
            return k
        };
        C(c.prototype, {
            addSeries: function (d, c, f) {
                var k, e = this;
                d && (c = a(c, !0), I(e, "addSeries", {
                    options: d
                }, function () {
                    k = e.initSeries(d);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    k.enabledDataSorting && k.setData(d.data, !1);
                    I(e, "afterAddSeries", {
                        series: k
                    });
                    c && e.redraw(f)
                }));
                return k
            },
            addAxis: function (a, d, c, f) {
                return this.createAxis(d ? "xAxis" : "yAxis", {
                    axis: a,
                    redraw: c,
                    animation: f
                })
            },
            addColorAxis: function (a, d, c) {
                return this.createAxis("colorAxis", {
                    axis: a,
                    redraw: d,
                    animation: c
                })
            },
            createAxis: function (d, c) {
                var f = this.options,
                    l = "colorAxis" === d,
                    e = c.redraw,
                    b = c.animation;
                c = k(c.axis, {
                    index: this[d].length,
                    isX: "xAxis" === d
                });
                var h = l ? new q.ColorAxis(this, c) : new g(this, c);
                f[d] = E(f[d] || {});
                f[d].push(c);
                l && (this.isDirtyLegend = !0, this.axes.forEach(function (a) {
                    a.series = []
                }), this.series.forEach(function (a) {
                    a.bindAxes();
                    a.isDirtyData = !0
                }));
                a(e, !0) && this.redraw(b);
                return h
            },
            showLoading: function (d) {
                var c = this,
                    f = c.options,
                    k = c.loadingDiv,
                    e = f.loading,
                    b = function () {
                        k && v(k, {
                            left: c.plotLeft + "px",
                            top: c.plotTop + "px",
                            width: c.plotWidth + "px",
                            height: c.plotHeight +
                                "px"
                        })
                    };
                k || (c.loadingDiv = k = L("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, c.container), c.loadingSpan = L("span", {
                    className: "highcharts-loading-inner"
                }, null, k), t(c, "redraw", b));
                k.className = "highcharts-loading";
                c.loadingSpan.innerHTML = a(d, f.lang.loading, "");
                c.styledMode || (v(k, C(e.style, {
                    zIndex: 10
                })), v(c.loadingSpan, e.labelStyle), c.loadingShown || (v(k, {
                    opacity: 0,
                    display: ""
                }), G(k, {
                    opacity: e.style.opacity || .5
                }, {
                    duration: e.showDuration || 0
                })));
                c.loadingShown = !0;
                b()
            },
            hideLoading: function () {
                var a =
                    this.options,
                    d = this.loadingDiv;
                d && (d.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || G(d, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        v(d, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
            update: function (d, c, g, p) {
                var e = this,
                    b = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    h, n, u, r = d.isResponsiveOptions,
                    w = [];
                I(e, "update", {
                    options: d
                });
                r || e.setResponsive(!1, !0);
                d = q.cleanRecursively(d, e.options);
                k(!0, e.userOptions, d);
                if (h = d.chart) {
                    k(!0, e.options.chart, h);
                    "className" in
                    h && e.setClassName(h.className);
                    "reflow" in h && e.setReflow(h.reflow);
                    if ("inverted" in h || "polar" in h || "type" in h) {
                        e.propFromSeries();
                        var t = !0
                    }
                    "alignTicks" in h && (t = !0);
                    f(h, function (a, b) {
                        -1 !== e.propsRequireUpdateSeries.indexOf("chart." + b) && (n = !0); - 1 !== e.propsRequireDirtyBox.indexOf(b) && (e.isDirtyBox = !0); - 1 !== e.propsRequireReflow.indexOf(b) && (r ? e.isDirtyBox = !0 : u = !0)
                    });
                    !e.styledMode && "style" in h && e.renderer.setStyle(h.style)
                }!e.styledMode && d.colors && (this.options.colors = d.colors);
                d.plotOptions && k(!0, this.options.plotOptions,
                    d.plotOptions);
                d.time && this.time === J && (this.time = new H(d.time));
                f(d, function (a, d) {
                    if (e[d] && "function" === typeof e[d].update) e[d].update(a, !1);
                    else if ("function" === typeof e[b[d]]) e[b[d]](a);
                    "chart" !== d && -1 !== e.propsRequireUpdateSeries.indexOf(d) && (n = !0)
                });
                this.collectionsWithUpdate.forEach(function (b) {
                    if (d[b]) {
                        if ("series" === b) {
                            var c = [];
                            e[b].forEach(function (b, d) {
                                b.options.isInternal || c.push(a(b.options.index, d))
                            })
                        }
                        E(d[b]).forEach(function (a, d) {
                            var f = K(a.id),
                                h;
                            f && (h = e.get(a.id));
                            h || (h = e[b][c ? c[d] : d]) &&
                                f && K(h.options.id) && (h = void 0);
                            h && h.coll === b && (h.update(a, !1), g && (h.touched = !0));
                            !h && g && e.collectionsWithInit[b] && (e.collectionsWithInit[b][0].apply(e, [a].concat(e.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
                        });
                        g && e[b].forEach(function (a) {
                            a.touched || a.options.isInternal ? delete a.touched : w.push(a)
                        })
                    }
                });
                w.forEach(function (a) {
                    a.remove && a.remove(!1)
                });
                t && e.axes.forEach(function (a) {
                    a.update({}, !1)
                });
                n && e.getSeriesOrderByLinks().forEach(function (a) {
                    a.chart && a.update({}, !1)
                }, this);
                d.loading &&
                    k(!0, e.options.loading, d.loading);
                t = h && h.width;
                h = h && h.height;
                l(h) && (h = A(h, t || e.chartWidth));
                u || m(t) && t !== e.chartWidth || m(h) && h !== e.chartHeight ? e.setSize(t, h, p) : a(c, !0) && e.redraw(p);
                I(e, "afterUpdate", {
                    options: d,
                    redraw: c,
                    animation: p
                })
            },
            setSubtitle: function (a, d) {
                this.applyDescription("subtitle", a);
                this.layOutTitles(d)
            },
            setCaption: function (a, d) {
                this.applyDescription("caption", a);
                this.layOutTitles(d)
            }
        });
        c.prototype.collectionsWithInit = {
            xAxis: [c.prototype.addAxis, [!0]],
            yAxis: [c.prototype.addAxis, [!1]],
            series: [c.prototype.addSeries]
        };
        C(B.prototype, {
            update: function (c, f, k, l) {
                function e() {
                    b.applyOptions(c);
                    var e = g && b.hasDummyGraphic;
                    e = null === b.y ? !e : e;
                    g && e && (b.graphic = g.destroy(), delete b.hasDummyGraphic);
                    d(c, !0) && (g && g.element && c && c.marker && "undefined" !== typeof c.marker.symbol && (b.graphic = g.destroy()), c && c.dataLabels && b.dataLabel && (b.dataLabel = b.dataLabel.destroy()), b.connector && (b.connector = b.connector.destroy()));
                    m = b.index;
                    h.updateParallelArrays(b, m);
                    n.data[m] = d(n.data[m], !0) || d(c, !0) ? b.options :
                        a(c, n.data[m]);
                    h.isDirty = h.isDirtyData = !0;
                    !h.fixedBox && h.hasCartesianSeries && (p.isDirtyBox = !0);
                    "point" === n.legendType && (p.isDirtyLegend = !0);
                    f && p.redraw(k)
                }
                var b = this,
                    h = b.series,
                    g = b.graphic,
                    m, p = h.chart,
                    n = h.options;
                f = a(f, !0);
                !1 === l ? e() : b.firePointEvent("update", {
                    options: c
                }, e)
            },
            remove: function (a, d) {
                this.series.removePoint(this.series.data.indexOf(this), a, d)
            }
        });
        C(y.prototype, {
            addPoint: function (d, c, f, k, e) {
                var b = this.options,
                    h = this.data,
                    l = this.chart,
                    g = this.xAxis;
                g = g && g.hasNames && g.names;
                var m = b.data,
                    p =
                    this.xData,
                    n;
                c = a(c, !0);
                var u = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(u, [d]);
                var r = u.x;
                var w = p.length;
                if (this.requireSorting && r < p[w - 1])
                    for (n = !0; w && p[w - 1] > r;) w--;
                this.updateParallelArrays(u, "splice", w, 0, 0);
                this.updateParallelArrays(u, w);
                g && u.name && (g[r] = u.name);
                m.splice(w, 0, d);
                n && (this.data.splice(w, 0, null), this.processData());
                "point" === b.legendType && this.generatePoints();
                f && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(u, "shift"), m.shift()));
                !1 !== e && I(this,
                    "addPoint", {
                        point: u
                    });
                this.isDirtyData = this.isDirty = !0;
                c && l.redraw(k)
            },
            removePoint: function (d, c, f) {
                var k = this,
                    e = k.data,
                    b = e[d],
                    h = k.points,
                    l = k.chart,
                    g = function () {
                        h && h.length === e.length && h.splice(d, 1);
                        e.splice(d, 1);
                        k.options.data.splice(d, 1);
                        k.updateParallelArrays(b || {
                            series: k
                        }, "splice", d, 1);
                        b && b.destroy();
                        k.isDirty = !0;
                        k.isDirtyData = !0;
                        c && l.redraw()
                    };
                u(f, l);
                c = a(c, !0);
                b ? b.firePointEvent("remove", null, g) : g()
            },
            remove: function (d, c, f, k) {
                function e() {
                    b.destroy(k);
                    b.remove = null;
                    h.isDirtyLegend = h.isDirtyBox = !0;
                    h.linkSeries();
                    a(d, !0) && h.redraw(c)
                }
                var b = this,
                    h = b.chart;
                !1 !== f ? I(b, "remove", null, e) : e()
            },
            update: function (d, c) {
                d = q.cleanRecursively(d, this.userOptions);
                I(this, "update", {
                    options: d
                });
                var f = this,
                    l = f.chart,
                    e = f.userOptions,
                    b = f.initialType || f.type,
                    h = d.type || e.type || l.options.chart.type,
                    g = !(this.hasDerivedData || d.dataGrouping || h && h !== this.type || "undefined" !== typeof d.pointStart || d.pointInterval || d.pointIntervalUnit || d.keys),
                    m = P[b].prototype,
                    p, n = ["eventOptions", "navigatorSeries", "baseSeries"],
                    u = f.finishedAnimating && {
                        animation: !1
                    },
                    w = {};
                g && (n.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== d.visible && n.push("area", "graph"), f.parallelArrays.forEach(function (a) {
                    n.push(a + "Data")
                }), d.data && (d.dataSorting && C(f.options.dataSorting, d.dataSorting), this.setData(d.data, !1)));
                d = k(e, u, {
                        index: "undefined" === typeof e.index ? f.index : e.index,
                        pointStart: a(e.pointStart, f.xData[0])
                    }, !g && {
                        data: f.options.data
                    },
                    d);
                g && d.data && (d.data = f.options.data);
                n = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(n);
                n.forEach(function (a) {
                    n[a] = f[a];
                    delete f[a]
                });
                f.remove(!1, null, !1, !0);
                for (p in m) f[p] = void 0;
                P[h || b] ? C(f, P[h || b].prototype) : r(17, !0, l, {
                    missingModuleFor: h || b
                });
                n.forEach(function (a) {
                    f[a] = n[a]
                });
                f.init(l, d);
                if (g && this.points) {
                    var A = f.options;
                    !1 === A.visible ? (w.graphic = 1, w.dataLabel = 1) : f._hasPointLabels || (d = A.marker, e = A.dataLabels, d && (!1 === d.enabled || "symbol" in d) && (w.graphic = 1), e && !1 === e.enabled &&
                        (w.dataLabel = 1));
                    this.points.forEach(function (a) {
                        a && a.series && (a.resolveColor(), Object.keys(w).length && a.destroyElements(w), !1 === A.showInLegend && a.legendItem && l.legend.destroyItem(a))
                    }, this)
                }
                f.initialType = b;
                l.linkSeries();
                I(this, "afterUpdate");
                a(c, !0) && l.redraw(g ? void 0 : !1)
            },
            setName: function (a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        C(g.prototype, {
            update: function (d, c) {
                var l = this.chart,
                    g = d && d.events || {};
                d = k(this.userOptions, d);
                l.options[this.coll].indexOf &&
                    (l.options[this.coll][l.options[this.coll].indexOf(this.userOptions)] = d);
                f(l.options[this.coll].events, function (a, b) {
                    "undefined" === typeof g[b] && (g[b] = void 0)
                });
                this.destroy(!0);
                this.init(l, C(d, {
                    events: g
                }));
                l.isDirtyBox = !0;
                a(c, !0) && l.redraw()
            },
            remove: function (d) {
                for (var c = this.chart, f = this.coll, k = this.series, e = k.length; e--;) k[e] && k[e].remove(!1);
                n(c.axes, this);
                n(c[f], this);
                p(c.options[f]) ? c.options[f].splice(this.options.index, 1) : delete c.options[f];
                c[f].forEach(function (a, d) {
                    a.options.index = a.userOptions.index =
                        d
                });
                this.destroy();
                c.isDirtyBox = !0;
                a(d, !0) && c.redraw()
            },
            setTitle: function (a, d) {
                this.update({
                    title: a
                }, d)
            },
            setCategories: function (a, d) {
                this.update({
                    categories: a
                }, d)
            }
        })
    });
    O(q, "parts/AreaSeries.js", [q["parts/Globals.js"], q["parts/Color.js"], q["mixins/legend-symbol.js"], q["parts/Utilities.js"]], function (g, c, q, y) {
        var B = c.parse,
            H = y.objectEach,
            D = y.pick;
        c = y.seriesType;
        var J = g.Series;
        c("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function (c) {
                var g = [],
                    q = [],
                    t = this.xAxis,
                    y = this.yAxis,
                    n = y.stacking.stacks[this.stackKey],
                    r = {},
                    C = this.index,
                    I = y.series,
                    p = I.length,
                    m = D(y.options.reversedStacks, !0) ? 1 : -1,
                    d;
                c = c || this.points;
                if (this.options.stacking) {
                    for (d = 0; d < c.length; d++) c[d].leftNull = c[d].rightNull = void 0, r[c[d].x] = c[d];
                    H(n, function (d, c) {
                        null !== d.total && q.push(c)
                    });
                    q.sort(function (d, c) {
                        return d - c
                    });
                    var l = I.map(function (d) {
                        return d.visible
                    });
                    q.forEach(function (c, f) {
                        var a = 0,
                            k, u;
                        if (r[c] && !r[c].isNull) g.push(r[c]), [-1, 1].forEach(function (a) {
                            var g = 1 === a ? "rightNull" : "leftNull",
                                w = 0,
                                A = n[q[f + a]];
                            if (A)
                                for (d = C; 0 <= d && d < p;) k = A.points[d], k || (d === C ? r[c][g] = !0 : l[d] && (u = n[c].points[d]) && (w -= u[1] - u[0])), d += m;
                            r[c][1 === a ? "rightCliff" : "leftCliff"] = w
                        });
                        else {
                            for (d = C; 0 <= d && d < p;) {
                                if (k = n[c].points[d]) {
                                    a = k[1];
                                    break
                                }
                                d += m
                            }
                            a = y.translate(a, 0, 1, 0, 1);
                            g.push({
                                isNull: !0,
                                plotX: t.translate(c, 0, 0, 0, 1),
                                x: c,
                                plotY: a,
                                yBottom: a
                            })
                        }
                    })
                }
                return g
            },
            getGraphPath: function (c) {
                var g = J.prototype.getGraphPath,
                    q = this.options,
                    t = q.stacking,
                    y = this.yAxis,
                    n, r = [],
                    C = [],
                    I = this.index,
                    p = y.stacking.stacks[this.stackKey],
                    m = q.threshold,
                    d = Math.round(y.getThreshold(q.threshold));
                q = D(q.connectNulls, "percent" === t);
                var l = function (a, k, l) {
                    var g = c[a];
                    a = t && p[g.x].points[I];
                    var n = g[l + "Null"] || 0;
                    l = g[l + "Cliff"] || 0;
                    g = !0;
                    if (l || n) {
                        var u = (n ? a[0] : a[1]) + l;
                        var q = a[0] + l;
                        g = !!n
                    } else !t && c[k] && c[k].isNull && (u = q = m);
                    "undefined" !== typeof u && (C.push({
                        plotX: f,
                        plotY: null === u ? d : y.getThreshold(u),
                        isNull: g,
                        isCliff: !0
                    }), r.push({
                        plotX: f,
                        plotY: null === q ? d : y.getThreshold(q),
                        doCurve: !1
                    }))
                };
                c = c || this.points;
                t && (c = this.getStackPoints(c));
                for (n = 0; n < c.length; n++) {
                    t || (c[n].leftCliff = c[n].rightCliff = c[n].leftNull =
                        c[n].rightNull = void 0);
                    var k = c[n].isNull;
                    var f = D(c[n].rectPlotX, c[n].plotX);
                    var a = D(c[n].yBottom, d);
                    if (!k || q) q || l(n, n - 1, "left"), k && !t && q || (C.push(c[n]), r.push({
                        x: n,
                        plotX: f,
                        plotY: a
                    })), q || l(n, n + 1, "right")
                }
                n = g.call(this, C, !0, !0);
                r.reversed = !0;
                k = g.call(this, r, !0, !0);
                (a = k[0]) && "M" === a[0] && (k[0] = ["L", a[1], a[2]]);
                k = n.concat(k);
                g = g.call(this, C, !1, q);
                k.xMap = n.xMap;
                this.areaPath = k;
                return g
            },
            drawGraph: function () {
                this.areaPath = [];
                J.prototype.drawGraph.apply(this);
                var c = this,
                    g = this.areaPath,
                    q = this.options,
                    v = [
                        ["area",
                            "highcharts-area", this.color, q.fillColor
                        ]
                    ];
                this.zones.forEach(function (g, n) {
                    v.push(["zone-area-" + n, "highcharts-area highcharts-zone-area-" + n + " " + g.className, g.color || c.color, g.fillColor || q.fillColor])
                });
                v.forEach(function (t) {
                    var n = t[0],
                        r = c[n],
                        v = r ? "animate" : "attr",
                        y = {};
                    r ? (r.endX = c.preventGraphAnimation ? null : g.xMap, r.animate({
                        d: g
                    })) : (y.zIndex = 0, r = c[n] = c.chart.renderer.path(g).addClass(t[1]).add(c.group), r.isArea = !0);
                    c.chart.styledMode || (y.fill = D(t[3], B(t[2]).setOpacity(D(q.fillOpacity, .75)).get()));
                    r[v](y);
                    r.startX = g.xMap;
                    r.shiftUnit = q.step ? 2 : 1
                })
            },
            drawLegendSymbol: q.drawRectangle
        });
        ""
    });
    O(q, "parts/SplineSeries.js", [q["parts/Utilities.js"]], function (g) {
        var c = g.pick;
        g = g.seriesType;
        g("spline", "line", {}, {
            getPointSpline: function (g, q, B) {
                var y = q.plotX || 0,
                    D = q.plotY || 0,
                    J = g[B - 1];
                B = g[B + 1];
                if (J && !J.isNull && !1 !== J.doCurve && !q.isCliff && B && !B.isNull && !1 !== B.doCurve && !q.isCliff) {
                    g = J.plotY || 0;
                    var t = B.plotX || 0;
                    B = B.plotY || 0;
                    var G = 0;
                    var L = (1.5 * y + (J.plotX || 0)) / 2.5;
                    var v = (1.5 * D + g) / 2.5;
                    t = (1.5 * y + t) / 2.5;
                    var K = (1.5 *
                        D + B) / 2.5;
                    t !== L && (G = (K - v) * (t - y) / (t - L) + D - K);
                    v += G;
                    K += G;
                    v > g && v > D ? (v = Math.max(g, D), K = 2 * D - v) : v < g && v < D && (v = Math.min(g, D), K = 2 * D - v);
                    K > B && K > D ? (K = Math.max(B, D), v = 2 * D - K) : K < B && K < D && (K = Math.min(B, D), v = 2 * D - K);
                    q.rightContX = t;
                    q.rightContY = K
                }
                q = ["C", c(J.rightContX, J.plotX, 0), c(J.rightContY, J.plotY, 0), c(L, y, 0), c(v, D, 0), y, D];
                J.rightContX = J.rightContY = void 0;
                return q
            }
        });
        ""
    });
    O(q, "parts/AreaSplineSeries.js", [q["parts/Globals.js"], q["mixins/legend-symbol.js"], q["parts/Options.js"], q["parts/Utilities.js"]], function (g, c, q,
        y) {
        y = y.seriesType;
        g = g.seriesTypes.area.prototype;
        y("areaspline", "spline", q.defaultOptions.plotOptions.area, {
            getStackPoints: g.getStackPoints,
            getGraphPath: g.getGraphPath,
            drawGraph: g.drawGraph,
            drawLegendSymbol: c.drawRectangle
        });
        ""
    });
    O(q, "parts/ColumnSeries.js", [q["parts/Globals.js"], q["parts/Color.js"], q["mixins/legend-symbol.js"], q["parts/Utilities.js"]], function (g, c, q, y) {
        "";
        var B = c.parse,
            H = y.animObject,
            D = y.clamp,
            J = y.defined,
            t = y.extend,
            G = y.isNumber,
            L = y.merge,
            v = y.pick;
        c = y.seriesType;
        var K = g.Series;
        c("column",
            "line", {
                borderRadius: 0,
                centerInCategory: !1,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1
                    },
                    select: {
                        color: "#cccccc",
                        borderColor: "#000000"
                    }
                },
                dataLabels: {
                    align: void 0,
                    verticalAlign: void 0,
                    y: void 0
                },
                softThreshold: !1,
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: "#ffffff"
            }, {
                cropShoulder: 0,
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                negStacks: !0,
                init: function () {
                    K.prototype.init.apply(this,
                        arguments);
                    var c = this,
                        g = c.chart;
                    g.hasRendered && g.series.forEach(function (g) {
                        g.type === c.type && (g.isDirty = !0)
                    })
                },
                getColumnMetrics: function () {
                    var c = this,
                        g = c.options,
                        q = c.xAxis,
                        t = c.yAxis,
                        p = q.options.reversedStacks;
                    p = q.reversed && !p || !q.reversed && p;
                    var m, d = {},
                        l = 0;
                    !1 === g.grouping ? l = 1 : c.chart.series.forEach(function (a) {
                        var f = a.yAxis,
                            k = a.options;
                        if (a.type === c.type && (a.visible || !c.chart.options.chart.ignoreHiddenSeries) && t.len === f.len && t.pos === f.pos) {
                            if (k.stacking && "group" !== k.stacking) {
                                m = a.stackKey;
                                "undefined" ===
                                typeof d[m] && (d[m] = l++);
                                var g = d[m]
                            } else !1 !== k.grouping && (g = l++);
                            a.columnIndex = g
                        }
                    });
                    var k = Math.min(Math.abs(q.transA) * (q.ordinal && q.ordinal.slope || g.pointRange || q.closestPointRange || q.tickInterval || 1), q.len),
                        f = k * g.groupPadding,
                        a = (k - 2 * f) / (l || 1);
                    g = Math.min(g.maxPointWidth || q.len, v(g.pointWidth, a * (1 - 2 * g.pointPadding)));
                    c.columnMetrics = {
                        width: g,
                        offset: (a - g) / 2 + (f + ((c.columnIndex || 0) + (p ? 1 : 0)) * a - k / 2) * (p ? -1 : 1),
                        paddedWidth: a,
                        columnCount: l
                    };
                    return c.columnMetrics
                },
                crispCol: function (c, g, q, t) {
                    var p = this.chart,
                        m = this.borderWidth,
                        d = -(m % 2 ? .5 : 0);
                    m = m % 2 ? .5 : 1;
                    p.inverted && p.renderer.isVML && (m += 1);
                    this.options.crisp && (q = Math.round(c + q) + d, c = Math.round(c) + d, q -= c);
                    t = Math.round(g + t) + m;
                    d = .5 >= Math.abs(g) && .5 < t;
                    g = Math.round(g) + m;
                    t -= g;
                    d && t && (--g, t += 1);
                    return {
                        x: c,
                        y: g,
                        width: q,
                        height: t
                    }
                },
                adjustForMissingColumns: function (c, q, t, v) {
                    var p = this,
                        m = this.options.stacking;
                    if (!t.isNull && 1 < v.columnCount) {
                        var d = 0,
                            l = 0;
                        Highcharts.objectEach(this.yAxis.stacking && this.yAxis.stacking.stacks, function (c) {
                            if ("number" === typeof t.x && (c = c[t.x.toString()])) {
                                var f =
                                    c.points[p.index],
                                    a = c.total;
                                m ? (f && (d = l), c.hasValidPoints && l++) : g.isArray(f) && (d = f[1], l = a || 0)
                            }
                        });
                        c = (t.plotX || 0) + ((l - 1) * v.paddedWidth + q) / 2 - q - d * v.paddedWidth
                    }
                    return c
                },
                translate: function () {
                    var c = this,
                        g = c.chart,
                        q = c.options,
                        t = c.dense = 2 > c.closestPointRange * c.xAxis.transA;
                    t = c.borderWidth = v(q.borderWidth, t ? 0 : 1);
                    var p = c.xAxis,
                        m = c.yAxis,
                        d = q.threshold,
                        l = c.translatedThreshold = m.getThreshold(d),
                        k = v(q.minPointLength, 5),
                        f = c.getColumnMetrics(),
                        a = f.width,
                        A = c.barW = Math.max(a, 1 + 2 * t),
                        u = c.pointXOffset = f.offset,
                        E = c.dataMin,
                        y = c.dataMax;
                    g.inverted && (l -= .5);
                    q.pointPadding && (A = Math.ceil(A));
                    K.prototype.translate.apply(c);
                    c.points.forEach(function (n) {
                        var r = v(n.yBottom, l),
                            w = 999 + Math.abs(r),
                            t = a,
                            e = n.plotX || 0;
                        w = D(n.plotY, -w, m.len + w);
                        var b = e + u,
                            h = A,
                            z = Math.min(w, r),
                            x = Math.max(w, r) - z;
                        if (k && Math.abs(x) < k) {
                            x = k;
                            var C = !m.reversed && !n.negative || m.reversed && n.negative;
                            G(d) && G(y) && n.y === d && y <= d && (m.min || 0) < d && E !== y && (C = !C);
                            z = Math.abs(z - l) > k ? r - k : l - (C ? k : 0)
                        }
                        J(n.options.pointWidth) && (t = h = Math.ceil(n.options.pointWidth), b -= Math.round((t - a) /
                            2));
                        q.centerInCategory && (b = c.adjustForMissingColumns(b, t, n, f));
                        n.barX = b;
                        n.pointWidth = t;
                        n.tooltipPos = g.inverted ? [m.len + m.pos - g.plotLeft - w, p.len + p.pos - g.plotTop - (e || 0) - u - h / 2, x] : [b + h / 2, w + m.pos - g.plotTop, x];
                        n.shapeType = c.pointClass.prototype.shapeType || "rect";
                        n.shapeArgs = c.crispCol.apply(c, n.isNull ? [b, l, h, 0] : [b, z, h, x])
                    })
                },
                getSymbol: g.noop,
                drawLegendSymbol: q.drawRectangle,
                drawGraph: function () {
                    this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
                },
                pointAttribs: function (c, g) {
                    var n = this.options,
                        q = this.pointAttrToOptions || {};
                    var p = q.stroke || "borderColor";
                    var m = q["stroke-width"] || "borderWidth",
                        d = c && c.color || this.color,
                        l = c && c[p] || n[p] || this.color || d,
                        k = c && c[m] || n[m] || this[m] || 0;
                    q = c && c.options.dashStyle || n.dashStyle;
                    var f = v(c && c.opacity, n.opacity, 1);
                    if (c && this.zones.length) {
                        var a = c.getZone();
                        d = c.options.color || a && (a.color || c.nonZonedColor) || this.color;
                        a && (l = a.borderColor || l, q = a.dashStyle || q, k = a.borderWidth || k)
                    }
                    g && c && (c = L(n.states[g], c.options.states && c.options.states[g] || {}), g = c.brightness, d =
                        c.color || "undefined" !== typeof g && B(d).brighten(c.brightness).get() || d, l = c[p] || l, k = c[m] || k, q = c.dashStyle || q, f = v(c.opacity, f));
                    p = {
                        fill: d,
                        stroke: l,
                        "stroke-width": k,
                        opacity: f
                    };
                    q && (p.dashstyle = q);
                    return p
                },
                drawPoints: function () {
                    var c = this,
                        g = this.chart,
                        q = c.options,
                        t = g.renderer,
                        p = q.animationLimit || 250,
                        m;
                    c.points.forEach(function (d) {
                        var l = d.graphic,
                            k = !!l,
                            f = l && g.pointCount < p ? "animate" : "attr";
                        if (G(d.plotY) && null !== d.y) {
                            m = d.shapeArgs;
                            l && d.hasNewShapeType() && (l = l.destroy());
                            c.enabledDataSorting && (d.startXPos =
                                c.xAxis.reversed ? -(m ? m.width : 0) : c.xAxis.width);
                            l || (d.graphic = l = t[d.shapeType](m).add(d.group || c.group)) && c.enabledDataSorting && g.hasRendered && g.pointCount < p && (l.attr({
                                x: d.startXPos
                            }), k = !0, f = "animate");
                            if (l && k) l[f](L(m));
                            if (q.borderRadius) l[f]({
                                r: q.borderRadius
                            });
                            g.styledMode || l[f](c.pointAttribs(d, d.selected && "select")).shadow(!1 !== d.allowShadow && q.shadow, null, q.stacking && !q.borderRadius);
                            l.addClass(d.getClassName(), !0)
                        } else l && (d.graphic = l.destroy())
                    })
                },
                animate: function (c) {
                    var g = this,
                        n = this.yAxis,
                        q = g.options,
                        p = this.chart.inverted,
                        m = {},
                        d = p ? "translateX" : "translateY";
                    if (c) m.scaleY = .001, c = D(n.toPixels(q.threshold), n.pos, n.pos + n.len), p ? m.translateX = c - n.len : m.translateY = c, g.clipBox && g.setClip(), g.group.attr(m);
                    else {
                        var l = g.group.attr(d);
                        g.group.animate({
                            scaleY: 1
                        }, t(H(g.options.animation), {
                            step: function (c, f) {
                                g.group && (m[d] = l + f.pos * (n.pos - l), g.group.attr(m))
                            }
                        }))
                    }
                },
                remove: function () {
                    var c = this,
                        g = c.chart;
                    g.hasRendered && g.series.forEach(function (g) {
                        g.type === c.type && (g.isDirty = !0)
                    });
                    K.prototype.remove.apply(c,
                        arguments)
                }
            });
        ""
    });
    O(q, "parts/BarSeries.js", [q["parts/Utilities.js"]], function (g) {
        g = g.seriesType;
        g("bar", "column", null, {
            inverted: !0
        });
        ""
    });
    O(q, "parts/ScatterSeries.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = c.addEvent;
        c = c.seriesType;
        var y = g.Series;
        c("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            jitter: {
                x: 0,
                y: 0
            },
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && y.prototype.drawGraph.call(this)
            },
            applyJitter: function () {
                var c = this,
                    g = this.options.jitter,
                    q = this.points.length;
                g && this.points.forEach(function (y, t) {
                    ["x", "y"].forEach(function (D, B) {
                        var v = "plot" + D.toUpperCase();
                        if (g[D] && !y.isNull) {
                            var G = c[D + "Axis"];
                            var n = g[D] * G.transA;
                            if (G && !G.isLog) {
                                var r = Math.max(0, y[v] - n);
                                G = Math.min(G.len, y[v] +
                                    n);
                                B = 1E4 * Math.sin(t + B * q);
                                y[v] = r + (G - r) * (B - Math.floor(B));
                                "x" === D && (y.clientX = y.plotX)
                            }
                        }
                    })
                })
            }
        });
        q(y, "afterTranslate", function () {
            this.applyJitter && this.applyJitter()
        });
        ""
    });
    O(q, "mixins/centered-series.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = c.isNumber,
            y = c.pick,
            B = c.relativeLength,
            H = g.deg2rad;
        g.CenteredSeriesMixin = {
            getCenter: function () {
                var c = this.options,
                    q = this.chart,
                    t = 2 * (c.slicedOffset || 0),
                    G = q.plotWidth - 2 * t,
                    H = q.plotHeight - 2 * t,
                    v = c.center,
                    K = Math.min(G, H),
                    n = c.size,
                    r = c.innerSize ||
                    0;
                "string" === typeof n && (n = parseFloat(n));
                "string" === typeof r && (r = parseFloat(r));
                c = [y(v[0], "50%"), y(v[1], "50%"), y(n && 0 > n ? void 0 : c.size, "100%"), y(r && 0 > r ? void 0 : c.innerSize || 0, "0%")];
                !q.angular || this instanceof g.Series || (c[3] = 0);
                for (v = 0; 4 > v; ++v) n = c[v], q = 2 > v || 2 === v && /%$/.test(n), c[v] = B(n, [G, H, K, c[2]][v]) + (q ? t : 0);
                c[3] > c[2] && (c[3] = c[2]);
                return c
            },
            getStartAndEndRadians: function (c, g) {
                c = q(c) ? c : 0;
                g = q(g) && g > c && 360 > g - c ? g : c + 360;
                return {
                    start: H * (c + -90),
                    end: H * (g + -90)
                }
            }
        }
    });
    O(q, "parts/PieSeries.js", [q["parts/Globals.js"],
        q["mixins/legend-symbol.js"], q["parts/Point.js"], q["parts/Utilities.js"]
    ], function (g, c, q, y) {
        var B = y.addEvent,
            H = y.clamp,
            D = y.defined,
            J = y.fireEvent,
            t = y.isNumber,
            G = y.merge,
            L = y.pick,
            v = y.relativeLength,
            K = y.seriesType,
            n = y.setAnimation;
        y = g.CenteredSeriesMixin;
        var r = y.getStartAndEndRadians,
            C = g.noop,
            I = g.Series;
        K("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                connectorPadding: 5,
                connectorShape: "fixedOffset",
                crookDistance: "70%",
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return this.point.isNull ?
                        void 0 : this.point.name
                },
                softConnector: !0,
                x: 0
            },
            fillColor: void 0,
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            lineWidth: void 0,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: g.seriesTypes.column.prototype.pointAttribs,
            animate: function (c) {
                var g =
                    this,
                    d = g.points,
                    l = g.startAngleRad;
                c || d.forEach(function (d) {
                    var c = d.graphic,
                        a = d.shapeArgs;
                    c && a && (c.attr({
                        r: L(d.startR, g.center && g.center[3] / 2),
                        start: l,
                        end: l
                    }), c.animate({
                        r: a.r,
                        start: a.start,
                        end: a.end
                    }, g.options.animation))
                })
            },
            hasData: function () {
                return !!this.processedXData.length
            },
            updateTotals: function () {
                var c, g = 0,
                    d = this.points,
                    l = d.length,
                    k = this.options.ignoreHiddenPoint;
                for (c = 0; c < l; c++) {
                    var f = d[c];
                    g += k && !f.visible ? 0 : f.isNull ? 0 : f.y
                }
                this.total = g;
                for (c = 0; c < l; c++) f = d[c], f.percentage = 0 < g && (f.visible || !k) ?
                    f.y / g * 100 : 0, f.total = g
            },
            generatePoints: function () {
                I.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function (c, g, d) {
                var l = this.center,
                    k = this.radii ? this.radii[d.index] : l[2] / 2;
                c = Math.asin(H((c - l[1]) / (k + d.labelDistance), -1, 1));
                return l[0] + (g ? -1 : 1) * Math.cos(c) * (k + d.labelDistance) + (0 < d.labelDistance ? (g ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function (c) {
                this.generatePoints();
                var g = 0,
                    d = this.options,
                    l = d.slicedOffset,
                    k = l + (d.borderWidth || 0),
                    f = r(d.startAngle, d.endAngle),
                    a = this.startAngleRad =
                    f.start;
                f = (this.endAngleRad = f.end) - a;
                var p = this.points,
                    n = d.dataLabels.distance;
                d = d.ignoreHiddenPoint;
                var q, t = p.length;
                c || (this.center = c = this.getCenter());
                for (q = 0; q < t; q++) {
                    var w = p[q];
                    var y = a + g * f;
                    if (!d || w.visible) g += w.percentage / 100;
                    var F = a + g * f;
                    w.shapeType = "arc";
                    w.shapeArgs = {
                        x: c[0],
                        y: c[1],
                        r: c[2] / 2,
                        innerR: c[3] / 2,
                        start: Math.round(1E3 * y) / 1E3,
                        end: Math.round(1E3 * F) / 1E3
                    };
                    w.labelDistance = L(w.options.dataLabels && w.options.dataLabels.distance, n);
                    w.labelDistance = v(w.labelDistance, w.shapeArgs.r);
                    this.maxLabelDistance =
                        Math.max(this.maxLabelDistance || 0, w.labelDistance);
                    F = (F + y) / 2;
                    F > 1.5 * Math.PI ? F -= 2 * Math.PI : F < -Math.PI / 2 && (F += 2 * Math.PI);
                    w.slicedTranslation = {
                        translateX: Math.round(Math.cos(F) * l),
                        translateY: Math.round(Math.sin(F) * l)
                    };
                    var C = Math.cos(F) * c[2] / 2;
                    var e = Math.sin(F) * c[2] / 2;
                    w.tooltipPos = [c[0] + .7 * C, c[1] + .7 * e];
                    w.half = F < -Math.PI / 2 || F > Math.PI / 2 ? 1 : 0;
                    w.angle = F;
                    y = Math.min(k, w.labelDistance / 5);
                    w.labelPosition = {
                        natural: {
                            x: c[0] + C + Math.cos(F) * w.labelDistance,
                            y: c[1] + e + Math.sin(F) * w.labelDistance
                        },
                        "final": {},
                        alignment: 0 >
                            w.labelDistance ? "center" : w.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: c[0] + C + Math.cos(F) * y,
                                y: c[1] + e + Math.sin(F) * y
                            },
                            touchingSliceAt: {
                                x: c[0] + C,
                                y: c[1] + e
                            }
                        }
                    }
                }
                J(this, "afterTranslate")
            },
            drawEmpty: function () {
                var c = this.startAngleRad,
                    g = this.endAngleRad,
                    d = this.options;
                if (0 === this.total) {
                    var l = this.center[0];
                    var k = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.arc(l, k, this.center[1] / 2, 0, c, g).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({
                        d: Highcharts.SVGRenderer.prototype.symbols.arc(l,
                            k, this.center[2] / 2, 0, {
                                start: c,
                                end: g,
                                innerR: this.center[3] / 2
                            })
                    });
                    this.chart.styledMode || this.graph.attr({
                        "stroke-width": d.borderWidth,
                        fill: d.fillColor || "none",
                        stroke: d.color || "#cccccc"
                    })
                } else this.graph && (this.graph = this.graph.destroy())
            },
            redrawPoints: function () {
                var c = this,
                    g = c.chart,
                    d = g.renderer,
                    l, k, f, a, n = c.options.shadow;
                this.drawEmpty();
                !n || c.shadowGroup || g.styledMode || (c.shadowGroup = d.g("shadow").attr({
                    zIndex: -1
                }).add(c.group));
                c.points.forEach(function (m) {
                    var p = {};
                    k = m.graphic;
                    if (!m.isNull && k) {
                        a =
                            m.shapeArgs;
                        l = m.getTranslate();
                        if (!g.styledMode) {
                            var q = m.shadowGroup;
                            n && !q && (q = m.shadowGroup = d.g("shadow").add(c.shadowGroup));
                            q && q.attr(l);
                            f = c.pointAttribs(m, m.selected && "select")
                        }
                        m.delayedRendering ? (k.setRadialReference(c.center).attr(a).attr(l), g.styledMode || k.attr(f).attr({
                            "stroke-linejoin": "round"
                        }).shadow(n, q), m.delayedRendering = !1) : (k.setRadialReference(c.center), g.styledMode || G(!0, p, f), G(!0, p, a, l), k.animate(p));
                        k.attr({
                            visibility: m.visible ? "inherit" : "hidden"
                        });
                        k.addClass(m.getClassName())
                    } else k &&
                        (m.graphic = k.destroy())
                })
            },
            drawPoints: function () {
                var c = this.chart.renderer;
                this.points.forEach(function (g) {
                    g.graphic && g.hasNewShapeType() && (g.graphic = g.graphic.destroy());
                    g.graphic || (g.graphic = c[g.shapeType](g.shapeArgs).add(g.series.group), g.delayedRendering = !0)
                })
            },
            searchPoint: C,
            sortByAngle: function (c, g) {
                c.sort(function (c, l) {
                    return "undefined" !== typeof c.angle && (l.angle - c.angle) * g
                })
            },
            drawLegendSymbol: c.drawRectangle,
            getCenter: y.getCenter,
            getSymbol: C,
            drawGraph: null
        }, {
            init: function () {
                q.prototype.init.apply(this,
                    arguments);
                var c = this;
                c.name = L(c.name, "Slice");
                var g = function (d) {
                    c.slice("select" === d.type)
                };
                B(c, "select", g);
                B(c, "unselect", g);
                return c
            },
            isValid: function () {
                return t(this.y) && 0 <= this.y
            },
            setVisible: function (c, g) {
                var d = this,
                    l = d.series,
                    k = l.chart,
                    f = l.options.ignoreHiddenPoint;
                g = L(g, f);
                c !== d.visible && (d.visible = d.options.visible = c = "undefined" === typeof c ? !d.visible : c, l.options.data[l.data.indexOf(d)] = d.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (a) {
                        if (d[a]) d[a][c ? "show" : "hide"](!0)
                    }),
                    d.legendItem && k.legend.colorizeItem(d, c), c || "hover" !== d.state || d.setState(""), f && (l.isDirty = !0), g && k.redraw())
            },
            slice: function (c, g, d) {
                var l = this.series;
                n(d, l.chart);
                L(g, !0);
                this.sliced = this.options.sliced = D(c) ? c : !this.sliced;
                l.options.data[l.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function (c) {
                var g =
                    this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(g.x, g.y, g.r + c, g.r + c, {
                    innerR: g.r - 1,
                    start: g.start,
                    end: g.end
                })
            },
            connectorShapes: {
                fixedOffset: function (c, g, d) {
                    var l = g.breakAt;
                    g = g.touchingSliceAt;
                    return [
                        ["M", c.x, c.y], d.softConnector ? ["C", c.x + ("left" === c.alignment ? -5 : 5), c.y, 2 * l.x - g.x, 2 * l.y - g.y, l.x, l.y] : ["L", l.x, l.y],
                        ["L", g.x, g.y]
                    ]
                },
                straight: function (c, g) {
                    g = g.touchingSliceAt;
                    return [
                        ["M", c.x, c.y],
                        ["L", g.x, g.y]
                    ]
                },
                crookedLine: function (c, g, d) {
                    g = g.touchingSliceAt;
                    var l =
                        this.series,
                        k = l.center[0],
                        f = l.chart.plotWidth,
                        a = l.chart.plotLeft;
                    l = c.alignment;
                    var m = this.shapeArgs.r;
                    d = v(d.crookDistance, 1);
                    f = "left" === l ? k + m + (f + a - k - m) * (1 - d) : a + (k - m) * d;
                    d = ["L", f, c.y];
                    k = !0;
                    if ("left" === l ? f > c.x || f < g.x : f < c.x || f > g.x) k = !1;
                    c = [
                        ["M", c.x, c.y]
                    ];
                    k && c.push(d);
                    c.push(["L", g.x, g.y]);
                    return c
                }
            },
            getConnectorPath: function () {
                var c = this.labelPosition,
                    g = this.series.options.dataLabels,
                    d = g.connectorShape,
                    l = this.connectorShapes;
                l[d] && (d = l[d]);
                return d.call(this, {
                        x: c.final.x,
                        y: c.final.y,
                        alignment: c.alignment
                    },
                    c.connectorPosition, g)
            }
        });
        ""
    });
    O(q, "parts/DataLabels.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = g.noop,
            y = g.seriesTypes,
            B = c.animObject,
            H = c.arrayMax,
            D = c.clamp,
            J = c.defined,
            t = c.extend,
            G = c.fireEvent,
            L = c.format,
            v = c.isArray,
            K = c.merge,
            n = c.objectEach,
            r = c.pick,
            C = c.relativeLength,
            I = c.splat,
            p = c.stableSort,
            m = g.Series;
        g.distribute = function (c, l, k) {
            function d(a, c) {
                return a.target - c.target
            }
            var a, m = !0,
                n = c,
                q = [];
            var t = 0;
            var w = n.reducedLen || l;
            for (a = c.length; a--;) t += c[a].size;
            if (t > w) {
                p(c, function (a,
                    c) {
                    return (c.rank || 0) - (a.rank || 0)
                });
                for (t = a = 0; t <= w;) t += c[a].size, a++;
                q = c.splice(a - 1, c.length)
            }
            p(c, d);
            for (c = c.map(function (a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: r(a.align, .5)
                    }
                }); m;) {
                for (a = c.length; a--;) m = c[a], t = (Math.min.apply(0, m.targets) + Math.max.apply(0, m.targets)) / 2, m.pos = D(t - m.size * m.align, 0, l - m.size);
                a = c.length;
                for (m = !1; a--;) 0 < a && c[a - 1].pos + c[a - 1].size > c[a].pos && (c[a - 1].size += c[a].size, c[a - 1].targets = c[a - 1].targets.concat(c[a].targets), c[a - 1].align = .5, c[a - 1].pos + c[a - 1].size > l && (c[a - 1].pos =
                    l - c[a - 1].size), c.splice(a, 1), m = !0)
            }
            n.push.apply(n, q);
            a = 0;
            c.some(function (c) {
                var d = 0;
                if (c.targets.some(function () {
                        n[a].pos = c.pos + d;
                        if ("undefined" !== typeof k && Math.abs(n[a].pos - n[a].target) > k) return n.slice(0, a + 1).forEach(function (a) {
                            delete a.pos
                        }), n.reducedLen = (n.reducedLen || l) - .1 * l, n.reducedLen > .1 * l && g.distribute(n, l, k), !0;
                        d += n[a].size;
                        a++
                    })) return !0
            });
            p(n, d)
        };
        m.prototype.drawDataLabels = function () {
            function c(a, c) {
                var b = c.filter;
                return b ? (c = b.operator, a = a[b.property], b = b.value, ">" === c && a > b || "<" ===
                    c && a < b || ">=" === c && a >= b || "<=" === c && a <= b || "==" === c && a == b || "===" === c && a === b ? !0 : !1) : !0
            }

            function g(a, c) {
                var b = [],
                    d;
                if (v(a) && !v(c)) b = a.map(function (a) {
                    return K(a, c)
                });
                else if (v(c) && !v(a)) b = c.map(function (b) {
                    return K(a, b)
                });
                else if (v(a) || v(c))
                    for (d = Math.max(a.length, c.length); d--;) b[d] = K(a[d], c[d]);
                else b = K(a, c);
                return b
            }
            var k = this,
                f = k.chart,
                a = k.options,
                m = a.dataLabels,
                p = k.points,
                q, t = k.hasRendered || 0,
                w = B(a.animation).duration,
                y = Math.min(w, 200),
                F = !f.renderer.forExport && r(m.defer, 0 < y),
                C = f.renderer;
            m = g(g(f.options.plotOptions &&
                f.options.plotOptions.series && f.options.plotOptions.series.dataLabels, f.options.plotOptions && f.options.plotOptions[k.type] && f.options.plotOptions[k.type].dataLabels), m);
            G(this, "drawDataLabels");
            if (v(m) || m.enabled || k._hasPointLabels) {
                var e = k.plotGroup("dataLabelsGroup", "data-labels", F && !t ? "hidden" : "inherit", m.zIndex || 6);
                F && (e.attr({
                    opacity: +t
                }), t || setTimeout(function () {
                    var b = k.dataLabelsGroup;
                    b && (k.visible && e.show(!0), b[a.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: y
                    }))
                }, w - y));
                p.forEach(function (b) {
                    q =
                        I(g(m, b.dlOptions || b.options && b.options.dataLabels));
                    q.forEach(function (d, g) {
                        var h = d.enabled && (!b.isNull || b.dataLabelOnNull) && c(b, d),
                            l = b.dataLabels ? b.dataLabels[g] : b.dataLabel,
                            m = b.connectors ? b.connectors[g] : b.connector,
                            p = r(d.distance, b.labelDistance),
                            q = !l;
                        if (h) {
                            var u = b.getLabelConfig();
                            var w = r(d[b.formatPrefix + "Format"], d.format);
                            u = J(w) ? L(w, u, f) : (d[b.formatPrefix + "Formatter"] || d.formatter).call(u, d);
                            w = d.style;
                            var t = d.rotation;
                            f.styledMode || (w.color = r(d.color, w.color, k.color, "#000000"), "contrast" ===
                                w.color ? (b.contrastColor = C.getContrast(b.color || k.color), w.color = !J(p) && d.inside || 0 > p || a.stacking ? b.contrastColor : "#000000") : delete b.contrastColor, a.cursor && (w.cursor = a.cursor));
                            var A = {
                                r: d.borderRadius || 0,
                                rotation: t,
                                padding: d.padding,
                                zIndex: 1
                            };
                            f.styledMode || (A.fill = d.backgroundColor, A.stroke = d.borderColor, A["stroke-width"] = d.borderWidth);
                            n(A, function (a, b) {
                                "undefined" === typeof a && delete A[b]
                            })
                        }!l || h && J(u) ? h && J(u) && (l ? A.text = u : (b.dataLabels = b.dataLabels || [], l = b.dataLabels[g] = t ? C.text(u, 0, -9999, d.useHTML).addClass("highcharts-data-label") :
                            C.label(u, 0, -9999, d.shape, null, null, d.useHTML, null, "data-label"), g || (b.dataLabel = l), l.addClass(" highcharts-data-label-color-" + b.colorIndex + " " + (d.className || "") + (d.useHTML ? " highcharts-tracker" : ""))), l.options = d, l.attr(A), f.styledMode || l.css(w).shadow(d.shadow), l.added || l.add(e), d.textPath && !d.useHTML && (l.setTextPath(b.getDataLabelPath && b.getDataLabelPath(l) || b.graphic, d.textPath), b.dataLabelPath && !d.textPath.enabled && (b.dataLabelPath = b.dataLabelPath.destroy())), k.alignDataLabel(b, l, d, null, q)) : (b.dataLabel =
                            b.dataLabel && b.dataLabel.destroy(), b.dataLabels && (1 === b.dataLabels.length ? delete b.dataLabels : delete b.dataLabels[g]), g || delete b.dataLabel, m && (b.connector = b.connector.destroy(), b.connectors && (1 === b.connectors.length ? delete b.connectors : delete b.connectors[g])))
                    })
                })
            }
            G(this, "afterDrawDataLabels")
        };
        m.prototype.alignDataLabel = function (c, g, k, f, a) {
            var d = this,
                l = this.chart,
                m = this.isCartesian && l.inverted,
                n = this.enabledDataSorting,
                p = r(c.dlBox && c.dlBox.centerX, c.plotX, -9999),
                q = r(c.plotY, -9999),
                v = g.getBBox(),
                y = k.rotation,
                e = k.align,
                b = l.isInsidePlot(p, Math.round(q), m),
                h = "justify" === r(k.overflow, n ? "none" : "justify"),
                z = this.visible && !1 !== c.visible && (c.series.forceDL || n && !h || b || k.inside && f && l.isInsidePlot(p, m ? f.x + 1 : f.y + f.height - 1, m));
            var x = function (e) {
                n && d.xAxis && !h && d.setDataLabelStartPos(c, g, a, b, e)
            };
            if (z) {
                var C = l.renderer.fontMetrics(l.styledMode ? void 0 : k.style.fontSize, g).b;
                f = t({
                    x: m ? this.yAxis.len - q : p,
                    y: Math.round(m ? this.xAxis.len - p : q),
                    width: 0,
                    height: 0
                }, f);
                t(k, {
                    width: v.width,
                    height: v.height
                });
                y ? (h = !1, p =
                    l.renderer.rotCorr(C, y), p = {
                        x: f.x + (k.x || 0) + f.width / 2 + p.x,
                        y: f.y + (k.y || 0) + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        } [k.verticalAlign] * f.height
                    }, x(p), g[a ? "attr" : "animate"](p).attr({
                        align: e
                    }), x = (y + 720) % 360, x = 180 < x && 360 > x, "left" === e ? p.y -= x ? v.height : 0 : "center" === e ? (p.x -= v.width / 2, p.y -= v.height / 2) : "right" === e && (p.x -= v.width, p.y -= x ? 0 : v.height), g.placed = !0, g.alignAttr = p) : (x(f), g.align(k, null, f), p = g.alignAttr);
                h && 0 <= f.height ? this.justifyDataLabel(g, k, p, v, f, a) : r(k.crop, !0) && (z = l.isInsidePlot(p.x, p.y) && l.isInsidePlot(p.x + v.width,
                    p.y + v.height));
                if (k.shape && !y) g[a ? "attr" : "animate"]({
                    anchorX: m ? l.plotWidth - c.plotY : c.plotX,
                    anchorY: m ? l.plotHeight - c.plotX : c.plotY
                })
            }
            a && n && (g.placed = !1);
            z || n && !h || (g.hide(!0), g.placed = !1)
        };
        m.prototype.setDataLabelStartPos = function (c, g, k, f, a) {
            var d = this.chart,
                l = d.inverted,
                m = this.xAxis,
                n = m.reversed,
                p = l ? g.height / 2 : g.width / 2;
            c = (c = c.pointWidth) ? c / 2 : 0;
            m = l ? a.x : n ? -p - c : m.width - p + c;
            a = l ? n ? this.yAxis.height - p + c : -p - c : a.y;
            g.startXPos = m;
            g.startYPos = a;
            f ? "hidden" === g.visibility && (g.show(), g.attr({
                    opacity: 0
                }).animate({
                    opacity: 1
                })) :
                g.attr({
                    opacity: 1
                }).animate({
                    opacity: 0
                }, void 0, g.hide);
            d.hasRendered && (k && g.attr({
                x: g.startXPos,
                y: g.startYPos
            }), g.placed = !0)
        };
        m.prototype.justifyDataLabel = function (c, g, k, f, a, m) {
            var d = this.chart,
                l = g.align,
                n = g.verticalAlign,
                p = c.box ? 0 : c.padding || 0,
                q = g.x;
            q = void 0 === q ? 0 : q;
            var r = g.y;
            var t = void 0 === r ? 0 : r;
            r = k.x + p;
            if (0 > r) {
                "right" === l && 0 <= q ? (g.align = "left", g.inside = !0) : q -= r;
                var e = !0
            }
            r = k.x + f.width - p;
            r > d.plotWidth && ("left" === l && 0 >= q ? (g.align = "right", g.inside = !0) : q += d.plotWidth - r, e = !0);
            r = k.y + p;
            0 > r && ("bottom" ===
                n && 0 <= t ? (g.verticalAlign = "top", g.inside = !0) : t -= r, e = !0);
            r = k.y + f.height - p;
            r > d.plotHeight && ("top" === n && 0 >= t ? (g.verticalAlign = "bottom", g.inside = !0) : t += d.plotHeight - r, e = !0);
            e && (g.x = q, g.y = t, c.placed = !m, c.align(g, void 0, a));
            return e
        };
        y.pie && (y.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function (c) {
                return c.top + c.distributeBox.pos
            },
            radialDistributionX: function (c, g, k, f) {
                return c.getX(k < g.top + 2 || k > g.bottom - 2 ? f : k, g.half, g)
            },
            justify: function (c, g, k) {
                return k[0] + (c.half ? -1 : 1) * (g + c.labelDistance)
            },
            alignToPlotEdges: function (c, g, k, f) {
                c = c.getBBox().width;
                return g ? c + f : k - c - f
            },
            alignToConnectors: function (c, g, k, f) {
                var a = 0,
                    d;
                c.forEach(function (c) {
                    d = c.dataLabel.getBBox().width;
                    d > a && (a = d)
                });
                return g ? a + f : k - a - f
            }
        }, y.pie.prototype.drawDataLabels = function () {
            var c = this,
                l = c.data,
                k, f = c.chart,
                a = c.options.dataLabels || {},
                n = a.connectorPadding,
                p, q = f.plotWidth,
                t = f.plotHeight,
                w = f.plotLeft,
                v = Math.round(f.chartWidth / 3),
                y, C = c.center,
                e = C[2] / 2,
                b = C[1],
                h, z, x, B, D = [
                    [],
                    []
                ],
                G, I, L, O, U = [0, 0, 0, 0],
                R = c.dataLabelPositioners,
                T;
            c.visible &&
                (a.enabled || c._hasPointLabels) && (l.forEach(function (a) {
                    a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), a.dataLabel.shortened = !1)
                }), m.prototype.drawDataLabels.apply(c), l.forEach(function (b) {
                    b.dataLabel && (b.visible ? (D[b.half].push(b), b.dataLabel._pos = null, !J(a.style.width) && !J(b.options.dataLabels && b.options.dataLabels.style && b.options.dataLabels.style.width) && b.dataLabel.getBBox().width > v && (b.dataLabel.css({
                        width: Math.round(.7 *
                            v) + "px"
                    }), b.dataLabel.shortened = !0)) : (b.dataLabel = b.dataLabel.destroy(), b.dataLabels && 1 === b.dataLabels.length && delete b.dataLabels))
                }), D.forEach(function (d, l) {
                    var m = d.length,
                        p = [],
                        u;
                    if (m) {
                        c.sortByAngle(d, l - .5);
                        if (0 < c.maxLabelDistance) {
                            var v = Math.max(0, b - e - c.maxLabelDistance);
                            var A = Math.min(b + e + c.maxLabelDistance, f.plotHeight);
                            d.forEach(function (a) {
                                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, b - e - a.labelDistance), a.bottom = Math.min(b + e + a.labelDistance, f.plotHeight), u = a.dataLabel.getBBox().height ||
                                    21, a.distributeBox = {
                                        target: a.labelPosition.natural.y - a.top + u / 2,
                                        size: u,
                                        rank: a.y
                                    }, p.push(a.distributeBox))
                            });
                            v = A + u - v;
                            g.distribute(p, v, v / 5)
                        }
                        for (O = 0; O < m; O++) {
                            k = d[O];
                            x = k.labelPosition;
                            h = k.dataLabel;
                            L = !1 === k.visible ? "hidden" : "inherit";
                            I = v = x.natural.y;
                            p && J(k.distributeBox) && ("undefined" === typeof k.distributeBox.pos ? L = "hidden" : (B = k.distributeBox.size, I = R.radialDistributionY(k)));
                            delete k.positionIndex;
                            if (a.justify) G = R.justify(k, e, C);
                            else switch (a.alignTo) {
                                case "connectors":
                                    G = R.alignToConnectors(d, l, q, w);
                                    break;
                                case "plotEdges":
                                    G = R.alignToPlotEdges(h, l, q, w);
                                    break;
                                default:
                                    G = R.radialDistributionX(c, k, I, v)
                            }
                            h._attr = {
                                visibility: L,
                                align: x.alignment
                            };
                            T = k.options.dataLabels || {};
                            h._pos = {
                                x: G + r(T.x, a.x) + ({
                                    left: n,
                                    right: -n
                                } [x.alignment] || 0),
                                y: I + r(T.y, a.y) - 10
                            };
                            x.final.x = G;
                            x.final.y = I;
                            r(a.crop, !0) && (z = h.getBBox().width, v = null, G - z < n && 1 === l ? (v = Math.round(z - G + n), U[3] = Math.max(v, U[3])) : G + z > q - n && 0 === l && (v = Math.round(G + z - q + n), U[1] = Math.max(v, U[1])), 0 > I - B / 2 ? U[0] = Math.max(Math.round(-I + B / 2), U[0]) : I + B / 2 > t && (U[2] = Math.max(Math.round(I +
                                B / 2 - t), U[2])), h.sideOverflow = v)
                        }
                    }
                }), 0 === H(U) || this.verifyDataLabelOverflow(U)) && (this.placeDataLabels(), this.points.forEach(function (b) {
                    T = K(a, b.options.dataLabels);
                    if (p = r(T.connectorWidth, 1)) {
                        var d;
                        y = b.connector;
                        if ((h = b.dataLabel) && h._pos && b.visible && 0 < b.labelDistance) {
                            L = h._attr.visibility;
                            if (d = !y) b.connector = y = f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b.colorIndex + (b.className ? " " + b.className : "")).add(c.dataLabelsGroup), f.styledMode || y.attr({
                                "stroke-width": p,
                                stroke: T.connectorColor || b.color || "#666666"
                            });
                            y[d ? "attr" : "animate"]({
                                d: b.getConnectorPath()
                            });
                            y.attr("visibility", L)
                        } else y && (b.connector = y.destroy())
                    }
                }))
        }, y.pie.prototype.placeDataLabels = function () {
            this.points.forEach(function (c) {
                var d = c.dataLabel,
                    g;
                d && c.visible && ((g = d._pos) ? (d.sideOverflow && (d._attr.width = Math.max(d.getBBox().width - d.sideOverflow, 0), d.css({
                    width: d._attr.width + "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), d.shortened = !0), d.attr(d._attr), d[d.moved ?
                    "animate" : "attr"](g), d.moved = !0) : d && d.attr({
                    y: -9999
                }));
                delete c.distributeBox
            }, this)
        }, y.pie.prototype.alignDataLabel = q, y.pie.prototype.verifyDataLabelOverflow = function (c) {
            var d = this.center,
                g = this.options,
                f = g.center,
                a = g.minSize || 80,
                m = null !== g.size;
            if (!m) {
                if (null !== f[0]) var n = Math.max(d[2] - Math.max(c[1], c[3]), a);
                else n = Math.max(d[2] - c[1] - c[3], a), d[0] += (c[3] - c[1]) / 2;
                null !== f[1] ? n = D(n, a, d[2] - Math.max(c[0], c[2])) : (n = D(n, a, d[2] - c[0] - c[2]), d[1] += (c[0] - c[2]) / 2);
                n < d[2] ? (d[2] = n, d[3] = Math.min(C(g.innerSize ||
                    0, n), n), this.translate(d), this.drawDataLabels && this.drawDataLabels()) : m = !0
            }
            return m
        });
        y.column && (y.column.prototype.alignDataLabel = function (c, g, k, f, a) {
            var d = this.chart.inverted,
                l = c.series,
                n = c.dlBox || c.shapeArgs,
                p = r(c.below, c.plotY > r(this.translatedThreshold, l.yAxis.len)),
                q = r(k.inside, !!this.options.stacking);
            n && (f = K(n), 0 > f.y && (f.height += f.y, f.y = 0), n = f.y + f.height - l.yAxis.len, 0 < n && n < f.height && (f.height -= n), d && (f = {
                    x: l.yAxis.len - f.y - f.height,
                    y: l.xAxis.len - f.x - f.width,
                    width: f.height,
                    height: f.width
                }), q ||
                (d ? (f.x += p ? 0 : f.width, f.width = 0) : (f.y += p ? f.height : 0, f.height = 0)));
            k.align = r(k.align, !d || q ? "center" : p ? "right" : "left");
            k.verticalAlign = r(k.verticalAlign, d || q ? "middle" : p ? "top" : "bottom");
            m.prototype.alignDataLabel.call(this, c, g, k, f, a);
            k.inside && c.contrastColor && g.css({
                color: c.contrastColor
            })
        })
    });
    O(q, "modules/overlapping-datalabels.src.js", [q["parts/Chart.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = c.addEvent,
            y = c.fireEvent,
            B = c.isArray,
            H = c.isNumber,
            D = c.objectEach,
            J = c.pick;
        q(g, "render", function () {
            var c = [];
            (this.labelCollectors || []).forEach(function (g) {
                c = c.concat(g())
            });
            (this.yAxis || []).forEach(function (g) {
                g.stacking && g.options.stackLabels && !g.options.stackLabels.allowOverlap && D(g.stacking.stacks, function (g) {
                    D(g, function (g) {
                        c.push(g.label)
                    })
                })
            });
            (this.series || []).forEach(function (g) {
                var q = g.options.dataLabels;
                g.visible && (!1 !== q.enabled || g._hasPointLabels) && (g.nodes || g.points).forEach(function (g) {
                    g.visible && (B(g.dataLabels) ? g.dataLabels : g.dataLabel ? [g.dataLabel] : []).forEach(function (q) {
                        var n = q.options;
                        q.labelrank = J(n.labelrank, g.labelrank, g.shapeArgs && g.shapeArgs.height);
                        n.allowOverlap || c.push(q)
                    })
                })
            });
            this.hideOverlappingLabels(c)
        });
        g.prototype.hideOverlappingLabels = function (c) {
            var g = this,
                q = c.length,
                t = g.renderer,
                B, n, r, C = !1;
            var D = function (c) {
                var d, g = c.box ? 0 : c.padding || 0,
                    f = d = 0,
                    a;
                if (c && (!c.alignAttr || c.placed)) {
                    var m = c.alignAttr || {
                        x: c.attr("x"),
                        y: c.attr("y")
                    };
                    var n = c.parentGroup;
                    c.width || (d = c.getBBox(), c.width = d.width, c.height = d.height, d = t.fontMetrics(null, c.element).h);
                    var p = c.width - 2 * g;
                    (a = {
                        left: "0",
                        center: "0.5",
                        right: "1"
                    } [c.alignValue]) ? f = +a * p: H(c.x) && Math.round(c.x) !== c.translateX && (f = c.x - c.translateX);
                    return {
                        x: m.x + (n.translateX || 0) + g - f,
                        y: m.y + (n.translateY || 0) + g - d,
                        width: c.width - 2 * g,
                        height: c.height - 2 * g
                    }
                }
            };
            for (n = 0; n < q; n++)
                if (B = c[n]) B.oldOpacity = B.opacity, B.newOpacity = 1, B.absoluteBox = D(B);
            c.sort(function (c, g) {
                return (g.labelrank || 0) - (c.labelrank || 0)
            });
            for (n = 0; n < q; n++) {
                var p = (D = c[n]) && D.absoluteBox;
                for (B = n + 1; B < q; ++B) {
                    var m = (r = c[B]) && r.absoluteBox;
                    !p || !m || D === r || 0 === D.newOpacity || 0 === r.newOpacity ||
                        m.x > p.x + p.width || m.x + m.width < p.x || m.y > p.y + p.height || m.y + m.height < p.y || ((D.labelrank < r.labelrank ? D : r).newOpacity = 0)
                }
            }
            c.forEach(function (c) {
                if (c) {
                    var d = c.newOpacity;
                    c.oldOpacity !== d && (c.alignAttr && c.placed ? (c[d ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), C = !0, c.alignAttr.opacity = d, c[c.isOld ? "animate" : "attr"](c.alignAttr, null, function () {
                        g.styledMode || c.css({
                            pointerEvents: d ? "auto" : "none"
                        });
                        c.visibility = d ? "inherit" : "hidden";
                        c.placed = !!d
                    }), y(g, "afterHideOverlappingLabel")) : c.attr({
                        opacity: d
                    }));
                    c.isOld = !0
                }
            });
            C && y(g, "afterHideAllOverlappingLabels")
        }
    });
    O(q, "parts/Interaction.js", [q["parts/Chart.js"], q["parts/Globals.js"], q["parts/Legend.js"], q["parts/Options.js"], q["parts/Point.js"], q["parts/Utilities.js"]], function (g, c, q, y, B, H) {
        var D = y.defaultOptions,
            J = H.addEvent,
            t = H.createElement,
            G = H.css,
            L = H.defined,
            v = H.extend,
            K = H.fireEvent,
            n = H.isArray,
            r = H.isFunction,
            C = H.isNumber,
            I = H.isObject,
            p = H.merge,
            m = H.objectEach,
            d = H.pick,
            l = c.hasTouch;
        y = c.Series;
        H = c.seriesTypes;
        var k = c.svg;
        var f = c.TrackerMixin = {
            drawTrackerPoint: function () {
                var a =
                    this,
                    c = a.chart,
                    d = c.pointer,
                    f = function (a) {
                        var c = d.getPointFromEvent(a);
                        "undefined" !== typeof c && (d.isDirectTouch = !0, c.onMouseOver(a))
                    },
                    g;
                a.points.forEach(function (a) {
                    g = n(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    g.forEach(function (c) {
                        c.div ? c.div.point = a : c.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function (g) {
                    if (a[g]) {
                        a[g].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                            d.onTrackerMouseOut(a)
                        });
                        if (l) a[g].on("touchstart",
                            f);
                        !c.styledMode && a.options.cursor && a[g].css(G).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                K(this, "afterDrawTracker")
            },
            drawTrackerGraph: function () {
                var a = this,
                    c = a.options,
                    d = c.trackByArea,
                    f = [].concat(d ? a.areaPath : a.graphPath),
                    g = a.chart,
                    m = g.pointer,
                    n = g.renderer,
                    p = g.options.tooltip.snap,
                    q = a.tracker,
                    e = function (b) {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    },
                    b = "rgba(192,192,192," + (k ? .0001 : .002) + ")";
                q ? q.attr({
                    d: f
                }) : a.graph && (a.tracker = n.path(f).attr({
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(d ?
                    "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), g.styledMode || a.tracker.attr({
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    stroke: b,
                    fill: d ? b : "none",
                    "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * p)
                }), [a.tracker, a.markerGroup].forEach(function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function (a) {
                        m.onTrackerMouseOut(a)
                    });
                    c.cursor && !g.styledMode && a.css({
                        cursor: c.cursor
                    });
                    if (l) a.on("touchstart", e)
                }));
                K(this, "afterDrawTracker")
            }
        };
        H.column && (H.column.prototype.drawTracker =
            f.drawTrackerPoint);
        H.pie && (H.pie.prototype.drawTracker = f.drawTrackerPoint);
        H.scatter && (H.scatter.prototype.drawTracker = f.drawTrackerPoint);
        v(q.prototype, {
            setItemEvents: function (a, c, d) {
                var f = this,
                    g = f.chart.renderer.boxWrapper,
                    k = a instanceof B,
                    l = "highcharts-legend-" + (k ? "point" : "series") + "-active",
                    m = f.chart.styledMode;
                (d ? [c, a.legendSymbol] : [a.legendGroup]).forEach(function (d) {
                    if (d) d.on("mouseover", function () {
                        a.visible && f.allItems.forEach(function (c) {
                            a !== c && c.setState("inactive", !k)
                        });
                        a.setState("hover");
                        a.visible && g.addClass(l);
                        m || c.css(f.options.itemHoverStyle)
                    }).on("mouseout", function () {
                        f.chart.styledMode || c.css(p(a.visible ? f.itemStyle : f.itemHiddenStyle));
                        f.allItems.forEach(function (c) {
                            a !== c && c.setState("", !k)
                        });
                        g.removeClass(l);
                        a.setState()
                    }).on("click", function (c) {
                        var b = function () {
                            a.setVisible && a.setVisible();
                            f.allItems.forEach(function (b) {
                                a !== b && b.setState(a.visible ? "inactive" : "", !k)
                            })
                        };
                        g.removeClass(l);
                        c = {
                            browserEvent: c
                        };
                        a.firePointEvent ? a.firePointEvent("legendItemClick", c, b) : K(a, "legendItemClick",
                            c, b)
                    })
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = t("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                J(a.checkbox, "click", function (c) {
                    K(a.series || a, "checkboxClick", {
                        checked: c.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        v(g.prototype, {
            showResetZoom: function () {
                function a() {
                    c.zoomOut()
                }
                var c = this,
                    d = D.lang,
                    f = c.options.chart.resetZoomButton,
                    g = f.theme,
                    k = g.states,
                    l = "chart" === f.relativeTo ||
                    "spaceBox" === f.relativeTo ? null : "plotBox";
                K(this, "beforeShowResetZoom", null, function () {
                    c.resetZoomButton = c.renderer.button(d.resetZoom, null, null, a, g, k && k.hover).attr({
                        align: f.position.align,
                        title: d.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(f.position, !1, l)
                });
                K(this, "afterShowResetZoom")
            },
            zoomOut: function () {
                K(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function (a) {
                var c = this,
                    f, g = c.pointer,
                    k = !1,
                    l = c.inverted ? g.mouseDownX : g.mouseDownY;
                !a || a.resetSelection ? (c.axes.forEach(function (a) {
                    f =
                        a.zoom()
                }), g.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                    var d = a.axis,
                        e = c.inverted ? d.left : d.top,
                        b = c.inverted ? e + d.width : e + d.height,
                        h = d.isXAxis,
                        m = !1;
                    if (!h && l >= e && l <= b || h || !L(l)) m = !0;
                    g[h ? "zoomX" : "zoomY"] && m && (f = d.zoom(a.min, a.max), d.displayBtn && (k = !0))
                });
                var m = c.resetZoomButton;
                k && !m ? c.showResetZoom() : !k && I(m) && (c.resetZoomButton = m.destroy());
                f && c.redraw(d(c.options.chart.animation, a && a.animation, 100 > c.pointCount))
            },
            pan: function (a, d) {
                var f = this,
                    g = f.hoverPoints,
                    k = f.options.chart,
                    l = f.options.mapNavigation &&
                    f.options.mapNavigation.enabled,
                    m;
                d = "object" === typeof d ? d : {
                    enabled: d,
                    type: "x"
                };
                k && k.panning && (k.panning = d);
                var n = d.type;
                K(this, "pan", {
                    originalEvent: a
                }, function () {
                    g && g.forEach(function (a) {
                        a.setState()
                    });
                    var d = [1];
                    "xy" === n ? d = [1, 0] : "y" === n && (d = [0]);
                    d.forEach(function (d) {
                        var b = f[d ? "xAxis" : "yAxis"][0],
                            e = b.horiz,
                            g = a[e ? "chartX" : "chartY"];
                        e = e ? "mouseDownX" : "mouseDownY";
                        var k = f[e],
                            p = (b.pointRange || 0) / 2,
                            q = b.reversed && !f.inverted || !b.reversed && f.inverted ? -1 : 1,
                            r = b.getExtremes(),
                            u = b.toValue(k - g, !0) + p * q;
                        q = b.toValue(k +
                            b.len - g, !0) - p * q;
                        var t = q < u;
                        k = t ? q : u;
                        u = t ? u : q;
                        var w = b.hasVerticalPanning(),
                            v = b.panningState;
                        b.series.forEach(function (a) {
                            if (w && !d && (!v || v.isDirty)) {
                                var b = a.getProcessedData(!0);
                                a = a.getExtremes(b.yData, !0);
                                v || (v = {
                                    startMin: Number.MAX_VALUE,
                                    startMax: -Number.MAX_VALUE
                                });
                                C(a.dataMin) && C(a.dataMax) && (v.startMin = Math.min(a.dataMin, v.startMin), v.startMax = Math.max(a.dataMax, v.startMax))
                            }
                        });
                        q = Math.min(c.pick(null === v || void 0 === v ? void 0 : v.startMin, r.dataMin), p ? r.min : b.toValue(b.toPixels(r.min) - b.minPixelPadding));
                        p = Math.max(c.pick(null === v || void 0 === v ? void 0 : v.startMax, r.dataMax), p ? r.max : b.toValue(b.toPixels(r.max) + b.minPixelPadding));
                        b.panningState = v;
                        b.isOrdinal || (t = q - k, 0 < t && (u += t, k = q), t = u - p, 0 < t && (u = p, k -= t), b.series.length && k !== r.min && u !== r.max && k >= q && u <= p && (b.setExtremes(k, u, !1, !1, {
                            trigger: "pan"
                        }), f.resetZoomButton || l || k === q || u === p || !n.match("y") || (f.showResetZoom(), b.displayBtn = !1), m = !0), f[e] = g)
                    });
                    m && f.redraw(!1);
                    G(f.container, {
                        cursor: "move"
                    })
                })
            }
        });
        v(B.prototype, {
            select: function (a, c) {
                var f = this,
                    g = f.series,
                    k = g.chart;
                this.selectedStaging = a = d(a, !f.selected);
                f.firePointEvent(a ? "select" : "unselect", {
                    accumulate: c
                }, function () {
                    f.selected = f.options.selected = a;
                    g.options.data[g.data.indexOf(f)] = f.options;
                    f.setState(a && "select");
                    c || k.getSelectedPoints().forEach(function (a) {
                        var c = a.series;
                        a.selected && a !== f && (a.selected = a.options.selected = !1, c.options.data[c.data.indexOf(a)] = a.options, a.setState(k.hoverPoints && c.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            },
            onMouseOver: function (a) {
                var c = this.series.chart,
                    d = c.pointer;
                a = a ? d.normalize(a) : d.getChartCoordinatesFromPoint(this, c.inverted);
                d.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a = this,
                        c = p(a.series.options.point, a.options).events;
                    a.events = c;
                    m(c, function (c, d) {
                        r(c) &&
                            J(a, d, c)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function (a, c) {
                var f = this.series,
                    g = this.state,
                    k = f.options.states[a || "normal"] || {},
                    l = D.plotOptions[f.type].marker && f.options.marker,
                    m = l && !1 === l.enabled,
                    n = l && l.states && l.states[a || "normal"] || {},
                    p = !1 === n.enabled,
                    e = f.stateMarkerGraphic,
                    b = this.marker || {},
                    h = f.chart,
                    q = f.halo,
                    r, t = l && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !c || this.selected && "select" !== a || !1 === k.enabled || a && (p || m && !1 === n.enabled) || a && b.states && b.states[a] && !1 === b.states[a].enabled)) {
                    this.state =
                        a;
                    t && (r = f.markerAttribs(this, a));
                    if (this.graphic) {
                        g && this.graphic.removeClass("highcharts-point-" + g);
                        a && this.graphic.addClass("highcharts-point-" + a);
                        if (!h.styledMode) {
                            var y = f.pointAttribs(this, a);
                            var A = d(h.options.chart.animation, k.animation);
                            f.options.inactiveOtherPoints && y.opacity && ((this.dataLabels || []).forEach(function (a) {
                                a && a.animate({
                                    opacity: y.opacity
                                }, A)
                            }), this.connector && this.connector.animate({
                                opacity: y.opacity
                            }, A));
                            this.graphic.animate(y, A)
                        }
                        r && this.graphic.animate(r, d(h.options.chart.animation,
                            n.animation, l.animation));
                        e && e.hide()
                    } else {
                        if (a && n) {
                            g = b.symbol || f.symbol;
                            e && e.currentSymbol !== g && (e = e.destroy());
                            if (r)
                                if (e) e[c ? "animate" : "attr"]({
                                    x: r.x,
                                    y: r.y
                                });
                                else g && (f.stateMarkerGraphic = e = h.renderer.symbol(g, r.x, r.y, r.width, r.height).add(f.markerGroup), e.currentSymbol = g);
                            !h.styledMode && e && e.attr(f.pointAttribs(this, a))
                        }
                        e && (e[a && this.isInside ? "show" : "hide"](), e.element.point = this)
                    }
                    a = k.halo;
                    k = (e = this.graphic || e) && e.visibility || "inherit";
                    a && a.size && e && "hidden" !== k && !this.isCluster ? (q || (f.halo = q =
                        h.renderer.path().add(e.parentGroup)), q.show()[c ? "animate" : "attr"]({
                        d: this.haloPath(a.size)
                    }), q.attr({
                        "class": "highcharts-halo highcharts-color-" + d(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : ""),
                        visibility: k,
                        zIndex: -1
                    }), q.point = this, h.styledMode || q.attr(v({
                        fill: this.color || f.color,
                        "fill-opacity": a.opacity
                    }, a.attributes))) : q && q.point && q.point.haloPath && q.animate({
                        d: q.point.haloPath(0)
                    }, null, q.hide);
                    K(this, "afterSetState")
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        v(y.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    c = a.hoverSeries;
                a.pointer.setHoverChartIndex();
                if (c && c !== this) c.onMouseOut();
                this.options.events.mouseOver && K(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    c = this.chart,
                    d = c.tooltip,
                    f = c.hoverPoint;
                c.hoverSeries = null;
                if (f) f.onMouseOut();
                this && a.events.mouseOut && K(this, "mouseOut");
                !d || this.stickyTracking || d.shared && !this.noSharedTooltip || d.hide();
                c.series.forEach(function (a) {
                    a.setState("",
                        !0)
                })
            },
            setState: function (a, c) {
                var f = this,
                    g = f.options,
                    k = f.graph,
                    l = g.inactiveOtherPoints,
                    m = g.states,
                    n = g.lineWidth,
                    p = g.opacity,
                    e = d(m[a || "normal"] && m[a || "normal"].animation, f.chart.options.chart.animation);
                g = 0;
                a = a || "";
                if (f.state !== a && ([f.group, f.markerGroup, f.dataLabelsGroup].forEach(function (b) {
                        b && (f.state && b.removeClass("highcharts-series-" + f.state), a && b.addClass("highcharts-series-" + a))
                    }), f.state = a, !f.chart.styledMode)) {
                    if (m[a] && !1 === m[a].enabled) return;
                    a && (n = m[a].lineWidth || n + (m[a].lineWidthPlus ||
                        0), p = d(m[a].opacity, p));
                    if (k && !k.dashstyle)
                        for (m = {
                                "stroke-width": n
                            }, k.animate(m, e); f["zone-graph-" + g];) f["zone-graph-" + g].attr(m), g += 1;
                    l || [f.group, f.markerGroup, f.dataLabelsGroup, f.labelBySeries].forEach(function (a) {
                        a && a.animate({
                            opacity: p
                        }, e)
                    })
                }
                c && l && f.points && f.setAllPointsToState(a)
            },
            setAllPointsToState: function (a) {
                this.points.forEach(function (c) {
                    c.setState && c.setState(a)
                })
            },
            setVisible: function (a, c) {
                var d = this,
                    f = d.chart,
                    g = d.legendItem,
                    k = f.options.chart.ignoreHiddenSeries,
                    l = d.visible;
                var m = (d.visible =
                    a = d.options.visible = d.userOptions.visible = "undefined" === typeof a ? !l : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
                    if (d[a]) d[a][m]()
                });
                if (f.hoverSeries === d || (f.hoverPoint && f.hoverPoint.series) === d) d.onMouseOut();
                g && f.legend.colorizeItem(d, a);
                d.isDirty = !0;
                d.options.stacking && f.series.forEach(function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                d.linkedSeries.forEach(function (c) {
                    c.setVisible(a, !1)
                });
                k && (f.isDirtyBox = !0);
                K(d, m);
                !1 !== c && f.redraw()
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                K(this, a ? "select" : "unselect")
            },
            drawTracker: f.drawTrackerGraph
        })
    });
    O(q, "parts/Responsive.js", [q["parts/Chart.js"], q["parts/Utilities.js"]], function (g, c) {
        var q = c.find,
            y = c.isArray,
            B = c.isObject,
            H = c.merge,
            D = c.objectEach,
            J = c.pick,
            t = c.splat,
            G = c.uniqueKey;
        g.prototype.setResponsive = function (c, g) {
            var t =
                this.options.responsive,
                n = [],
                r = this.currentResponsive;
            !g && t && t.rules && t.rules.forEach(function (c) {
                "undefined" === typeof c._id && (c._id = G());
                this.matchResponsiveRule(c, n)
            }, this);
            g = H.apply(0, n.map(function (c) {
                return q(t.rules, function (g) {
                    return g._id === c
                }).chartOptions
            }));
            g.isResponsiveOptions = !0;
            n = n.toString() || void 0;
            n !== (r && r.ruleIds) && (r && this.update(r.undoOptions, c, !0), n ? (r = this.currentOptions(g), r.isResponsiveOptions = !0, this.currentResponsive = {
                ruleIds: n,
                mergedOptions: g,
                undoOptions: r
            }, this.update(g,
                c, !0)) : this.currentResponsive = void 0)
        };
        g.prototype.matchResponsiveRule = function (c, g) {
            var q = c.condition;
            (q.callback || function () {
                return this.chartWidth <= J(q.maxWidth, Number.MAX_VALUE) && this.chartHeight <= J(q.maxHeight, Number.MAX_VALUE) && this.chartWidth >= J(q.minWidth, 0) && this.chartHeight >= J(q.minHeight, 0)
            }).call(this) && g.push(c._id)
        };
        g.prototype.currentOptions = function (c) {
            function g(c, n, v, p) {
                var m;
                D(c, function (c, l) {
                    if (!p && -1 < q.collectionsWithUpdate.indexOf(l))
                        for (c = t(c), v[l] = [], m = 0; m < Math.max(c.length,
                                n[l].length); m++) n[l][m] && (void 0 === c[m] ? v[l][m] = n[l][m] : (v[l][m] = {}, g(c[m], n[l][m], v[l][m], p + 1)));
                    else B(c) ? (v[l] = y(c) ? [] : {}, g(c, n[l] || {}, v[l], p + 1)) : v[l] = "undefined" === typeof n[l] ? null : n[l]
                })
            }
            var q = this,
                n = {};
            g(c, this.options, n, 0);
            return n
        }
    });
    O(q, "masters/highcharts.src.js", [q["parts/Globals.js"]], function (g) {
        return g
    });
    q["masters/highcharts.src.js"]._modules = q;
    return q["masters/highcharts.src.js"]
});
//# sourceMappingURL=highcharts.js.map
