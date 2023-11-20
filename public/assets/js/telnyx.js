!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? t(exports)
        : "function" == typeof define && define.amd
        ? define(["exports"], t)
        : t(((e = e || self).TelnyxWebRTC = {}));
})(this, function (e) {
    "use strict";
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ function t(
        e,
        t
    ) {
        var i = {};
        for (var s in e)
            Object.prototype.hasOwnProperty.call(e, s) &&
                t.indexOf(s) < 0 &&
                (i[s] = e[s]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (s = Object.getOwnPropertySymbols(e); n < s.length; n++)
                t.indexOf(s[n]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, s[n]) &&
                    (i[s[n]] = e[s[n]]);
        }
        return i;
    }
    function i(e, t, i, s) {
        return new (i || (i = Promise))(function (n, o) {
            function r(e) {
                try {
                    c(s.next(e));
                } catch (e) {
                    o(e);
                }
            }
            function a(e) {
                try {
                    c(s.throw(e));
                } catch (e) {
                    o(e);
                }
            }
            function c(e) {
                var t;
                e.done
                    ? n(e.value)
                    : ((t = e.value),
                      t instanceof i
                          ? t
                          : new i(function (e) {
                                e(t);
                            })).then(r, a);
            }
            c((s = s.apply(e, t || [])).next());
        });
    }
    var s =
            ("undefined" != typeof crypto &&
                crypto.getRandomValues &&
                crypto.getRandomValues.bind(crypto)) ||
            ("undefined" != typeof msCrypto &&
                "function" == typeof msCrypto.getRandomValues &&
                msCrypto.getRandomValues.bind(msCrypto)),
        n = new Uint8Array(16);
    function o() {
        if (!s)
            throw new Error(
                "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
            );
        return s(n);
    }
    for (var r = [], a = 0; a < 256; ++a)
        r[a] = (a + 256).toString(16).substr(1);
    function c(e, t, i) {
        var s = (t && i) || 0;
        "string" == typeof e &&
            ((t = "binary" === e ? new Array(16) : null), (e = null));
        var n = (e = e || {}).random || (e.rng || o)();
        if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), t))
            for (var a = 0; a < 16; ++a) t[s + a] = n[a];
        return (
            t ||
            (function (e, t) {
                var i = t || 0,
                    s = r;
                return [
                    s[e[i++]],
                    s[e[i++]],
                    s[e[i++]],
                    s[e[i++]],
                    "-",
                    s[e[i++]],
                    s[e[i++]],
                    "-",
                    s[e[i++]],
                    s[e[i++]],
                    "-",
                    s[e[i++]],
                    s[e[i++]],
                    "-",
                    s[e[i++]],
                    s[e[i++]],
                    s[e[i++]],
                    s[e[i++]],
                    s[e[i++]],
                    s[e[i++]],
                ].join("");
            })(n)
        );
    }
    var l =
        "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {};
    var d = (function (e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    })(function (e) {
        var t, i;
        (t = l),
            (i = function () {
                var e = function () {},
                    t = "undefined",
                    i =
                        typeof window !== t &&
                        typeof window.navigator !== t &&
                        /Trident\/|MSIE /.test(window.navigator.userAgent),
                    s = ["trace", "debug", "info", "warn", "error"];
                function n(e, t) {
                    var i = e[t];
                    if ("function" == typeof i.bind) return i.bind(e);
                    try {
                        return Function.prototype.bind.call(i, e);
                    } catch (t) {
                        return function () {
                            return Function.prototype.apply.apply(i, [
                                e,
                                arguments,
                            ]);
                        };
                    }
                }
                function o() {
                    console.log &&
                        (console.log.apply
                            ? console.log.apply(console, arguments)
                            : Function.prototype.apply.apply(console.log, [
                                  console,
                                  arguments,
                              ])),
                        console.trace && console.trace();
                }
                function r(s) {
                    return (
                        "debug" === s && (s = "log"),
                        typeof console !== t &&
                            ("trace" === s && i
                                ? o
                                : void 0 !== console[s]
                                ? n(console, s)
                                : void 0 !== console.log
                                ? n(console, "log")
                                : e)
                    );
                }
                function a(t, i) {
                    for (var n = 0; n < s.length; n++) {
                        var o = s[n];
                        this[o] = n < t ? e : this.methodFactory(o, t, i);
                    }
                    this.log = this.debug;
                }
                function c(e, i, s) {
                    return function () {
                        typeof console !== t &&
                            (a.call(this, i, s),
                            this[e].apply(this, arguments));
                    };
                }
                function l(e, t, i) {
                    return r(e) || c.apply(this, arguments);
                }
                function d(e, i, n) {
                    var o,
                        r = this;
                    i = null == i ? "WARN" : i;
                    var c = "loglevel";
                    function d() {
                        var e;
                        if (typeof window !== t && c) {
                            try {
                                e = window.localStorage[c];
                            } catch (e) {}
                            if (typeof e === t)
                                try {
                                    var i = window.document.cookie,
                                        s = i.indexOf(
                                            encodeURIComponent(c) + "="
                                        );
                                    -1 !== s &&
                                        (e = /^([^;]+)/.exec(i.slice(s))[1]);
                                } catch (e) {}
                            return void 0 === r.levels[e] && (e = void 0), e;
                        }
                    }
                    "string" == typeof e
                        ? (c += ":" + e)
                        : "symbol" == typeof e && (c = void 0),
                        (r.name = e),
                        (r.levels = {
                            TRACE: 0,
                            DEBUG: 1,
                            INFO: 2,
                            WARN: 3,
                            ERROR: 4,
                            SILENT: 5,
                        }),
                        (r.methodFactory = n || l),
                        (r.getLevel = function () {
                            return o;
                        }),
                        (r.setLevel = function (i, n) {
                            if (
                                ("string" == typeof i &&
                                    void 0 !== r.levels[i.toUpperCase()] &&
                                    (i = r.levels[i.toUpperCase()]),
                                !(
                                    "number" == typeof i &&
                                    i >= 0 &&
                                    i <= r.levels.SILENT
                                ))
                            )
                                throw (
                                    "log.setLevel() called with invalid level: " +
                                    i
                                );
                            if (
                                ((o = i),
                                !1 !== n &&
                                    (function (e) {
                                        var i = (
                                            s[e] || "silent"
                                        ).toUpperCase();
                                        if (typeof window !== t && c) {
                                            try {
                                                return void (window.localStorage[
                                                    c
                                                ] = i);
                                            } catch (e) {}
                                            try {
                                                window.document.cookie =
                                                    encodeURIComponent(c) +
                                                    "=" +
                                                    i +
                                                    ";";
                                            } catch (e) {}
                                        }
                                    })(i),
                                a.call(r, i, e),
                                typeof console === t && i < r.levels.SILENT)
                            )
                                return "No console available for logging";
                        }),
                        (r.setDefaultLevel = function (e) {
                            (i = e), d() || r.setLevel(e, !1);
                        }),
                        (r.resetLevel = function () {
                            r.setLevel(i, !1),
                                (function () {
                                    if (typeof window !== t && c) {
                                        try {
                                            return void window.localStorage.removeItem(
                                                c
                                            );
                                        } catch (e) {}
                                        try {
                                            window.document.cookie =
                                                encodeURIComponent(c) +
                                                "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                                        } catch (e) {}
                                    }
                                })();
                        }),
                        (r.enableAll = function (e) {
                            r.setLevel(r.levels.TRACE, e);
                        }),
                        (r.disableAll = function (e) {
                            r.setLevel(r.levels.SILENT, e);
                        });
                    var u = d();
                    null == u && (u = i), r.setLevel(u, !1);
                }
                var u = new d(),
                    h = {};
                u.getLogger = function (e) {
                    if (
                        ("symbol" != typeof e && "string" != typeof e) ||
                        "" === e
                    )
                        throw new TypeError(
                            "You must supply a name when creating a logger."
                        );
                    var t = h[e];
                    return (
                        t ||
                            (t = h[e] =
                                new d(e, u.getLevel(), u.methodFactory)),
                        t
                    );
                };
                var p = typeof window !== t ? window.log : void 0;
                return (
                    (u.noConflict = function () {
                        return (
                            typeof window !== t &&
                                window.log === u &&
                                (window.log = p),
                            u
                        );
                    }),
                    (u.getLoggers = function () {
                        return h;
                    }),
                    (u.default = u),
                    u
                );
            }),
            e.exports ? (e.exports = i()) : (t.log = i());
    });
    const u = () => new Date().toISOString().replace("T", " ").replace("Z", ""),
        h = d.getLogger("telnyx"),
        p = h.methodFactory;
    (h.methodFactory = (e, t, i) => {
        const s = p(e, t, i);
        return function () {
            const e = [u(), "-"];
            for (let t = 0; t < arguments.length; t++) e.push(arguments[t]);
            s.apply(void 0, e);
        };
    }),
        h.setLevel(h.getLevel());
    const g = "sessId",
        f = "wss://rtc.telnyx.com",
        m = { urls: "stun:stun.telnyx.com:3478" },
        v = {
            urls: "turn:turn.telnyx.com:3478?transport=tcp",
            username: "testuser",
            credential: "testpassword",
        };
    var b;
    !(function (e) {
        (e.SocketOpen = "telnyx.socket.open"),
            (e.SocketClose = "telnyx.socket.close"),
            (e.SocketError = "telnyx.socket.error"),
            (e.SocketMessage = "telnyx.socket.message"),
            (e.SpeedTest = "telnyx.internal.speedtest"),
            (e.Ready = "telnyx.ready"),
            (e.Error = "telnyx.error"),
            (e.Notification = "telnyx.notification"),
            (e.Messages = "telnyx.messages"),
            (e.Calls = "telnyx.calls"),
            (e.MediaError = "telnyx.rtc.mediaError");
    })(b || (b = {}));
    const y = (e) => 0 === Object.keys(e).length,
        _ = (e) => `@telnyx:${e}`,
        w = (e) => {
            const [t, i, s, n, o, r] = e;
            let a = {};
            try {
                a = JSON.parse(o.replace(/ID"/g, 'Id"'));
            } catch (e) {
                h.warn("Verto LA invalid media JSON string:", o);
            }
            return {
                participantId: Number(t),
                participantNumber: i,
                participantName: s,
                codec: n,
                media: a,
                participantData: r,
            };
        },
        S = (e) => {
            if ("string" != typeof e) return e;
            try {
                return JSON.parse(e);
            } catch (t) {
                return e;
            }
        },
        I = (e) => e instanceof Function || "function" == typeof e,
        C = (e) =>
            "object" == typeof document && "getElementById" in document
                ? "string" == typeof e
                    ? document.getElementById(e) || null
                    : "function" == typeof e
                    ? e()
                    : e instanceof HTMLMediaElement
                    ? e
                    : null
                : null,
        E = /^(ws|wss):\/\//,
        k = (e, t = null) => {
            const { result: i = {}, error: s } = e;
            if (s) return { error: s };
            const { result: n = null } = i;
            if (null === n) return null !== t && (i.node_id = t), { result: i };
            const { code: o = null, node_id: r = null, result: a = null } = n;
            return o && "200" !== o
                ? { error: n }
                : a
                ? k(a, r)
                : { result: n };
        },
        x = (e, t) => Math.floor(Math.random() * (t - e + 1) + e),
        R = ({ login: e, passwd: t, password: i, login_token: s }) =>
            Boolean((e && (t || i)) || s),
        N = (e) => {
            var t, i, s, n, o, r;
            let a = "",
                c = "";
            (null ===
                (i =
                    null === (t = null == e ? void 0 : e.result) || void 0 === t
                        ? void 0
                        : t.params) || void 0 === i
                ? void 0
                : i.state) &&
                (a =
                    null ===
                        (n =
                            null === (s = null == e ? void 0 : e.result) ||
                            void 0 === s
                                ? void 0
                                : s.params) || void 0 === n
                        ? void 0
                        : n.state),
                (null === (o = null == e ? void 0 : e.params) || void 0 === o
                    ? void 0
                    : o.state) &&
                    (c =
                        null === (r = null == e ? void 0 : e.params) ||
                        void 0 === r
                            ? void 0
                            : r.state);
            return a || c;
        },
        A = "GLOBAL",
        T = {},
        O = (e, t) => `${e}|${t}`,
        D = (e, t = A) => O(e, t) in T,
        L = (e, t, i = A) => {
            const s = O(e, i);
            s in T || (T[s] = []), T[s].push(t);
        },
        P = (e, t, i = A) => {
            const s = function (n) {
                M(e, s, i), t(n);
            };
            return (s.prototype.targetRef = t), L(e, s, i);
        },
        M = (e, t, i = A) => {
            if (!D(e, i)) return !1;
            const s = O(e, i);
            if (I(t)) {
                for (let e = T[s].length - 1; e >= 0; e--) {
                    const i = T[s][e];
                    (t === i || (i.prototype && t === i.prototype.targetRef)) &&
                        T[s].splice(e, 1);
                }
            } else T[s] = [];
            return 0 === T[s].length && delete T[s], !0;
        },
        U = (e, t, i = A, s = !0) => {
            const n = s && i !== A;
            if (!D(e, i)) return n && U(e, t), !1;
            const o = O(e, i),
                r = T[o].length;
            if (!r) return n && U(e, t), !1;
            for (let e = r - 1; e >= 0; e--) T[o][e](t);
            return n && U(e, t), !0;
        },
        j = (e) => {
            const t = O(e, "");
            Object.keys(T)
                .filter((e) => 0 === e.indexOf(t))
                .forEach((e) => delete T[e]);
        };
    var V, B, F;
    !(function (e) {
        (e.Offer = "offer"), (e.Answer = "answer");
    })(V || (V = {})),
        (function (e) {
            (e.Inbound = "inbound"), (e.Outbound = "outbound");
        })(B || (B = {})),
        (function (e) {
            (e.Invite = "telnyx_rtc.invite"),
                (e.Attach = "telnyx_rtc.attach"),
                (e.Answer = "telnyx_rtc.answer"),
                (e.Info = "telnyx_rtc.info"),
                (e.Display = "telnyx_rtc.display"),
                (e.Media = "telnyx_rtc.media"),
                (e.Event = "telnyx_rtc.event"),
                (e.Bye = "telnyx_rtc.bye"),
                (e.Punt = "telnyx_rtc.punt"),
                (e.Broadcast = "telnyx_rtc.broadcast"),
                (e.Subscribe = "telnyx_rtc.subscribe"),
                (e.Unsubscribe = "telnyx_rtc.unsubscribe"),
                (e.ClientReady = "telnyx_rtc.clientReady"),
                (e.Modify = "telnyx_rtc.modify"),
                (e.Ringing = "telnyx_rtc.ringing"),
                (e.GatewayState = "telnyx_rtc.gatewayState"),
                (e.Ping = "telnyx_rtc.ping"),
                (e.Pong = "telnyx_rtc.pong");
        })(F || (F = {}));
    const $ = {
            generic: "event",
            [F.Display]: "participantData",
            [F.Attach]: "participantData",
            conferenceUpdate: "conferenceUpdate",
            callUpdate: "callUpdate",
            vertoClientReady: "vertoClientReady",
            userMediaError: "userMediaError",
        },
        G = {
            destinationNumber: "",
            remoteCallerName: "Outbound Call",
            remoteCallerNumber: "",
            callerName: "",
            callerNumber: "",
            audio: !0,
            video: !1,
            useStereo: !1,
            attach: !1,
            screenShare: !1,
            userVariables: {},
            mediaSettings: { useSdpASBandwidthKbps: !1, sdpASBandwidthKbps: 0 },
        };
    var H, W, q, K, J;
    !(function (e) {
        (e[(e.New = 0)] = "New"),
            (e[(e.Requesting = 1)] = "Requesting"),
            (e[(e.Trying = 2)] = "Trying"),
            (e[(e.Recovering = 3)] = "Recovering"),
            (e[(e.Ringing = 4)] = "Ringing"),
            (e[(e.Answering = 5)] = "Answering"),
            (e[(e.Early = 6)] = "Early"),
            (e[(e.Active = 7)] = "Active"),
            (e[(e.Held = 8)] = "Held"),
            (e[(e.Hangup = 9)] = "Hangup"),
            (e[(e.Destroy = 10)] = "Destroy"),
            (e[(e.Purge = 11)] = "Purge");
    })(H || (H = {})),
        (function (e) {
            (e.Participant = "participant"), (e.Moderator = "moderator");
        })(W || (W = {})),
        (function (e) {
            (e.Join = "join"),
                (e.Leave = "leave"),
                (e.Bootstrap = "bootstrap"),
                (e.Add = "add"),
                (e.Modify = "modify"),
                (e.Delete = "delete"),
                (e.Clear = "clear"),
                (e.ChatMessage = "chatMessage"),
                (e.LayerInfo = "layerInfo"),
                (e.LogoInfo = "logoInfo"),
                (e.LayoutInfo = "layoutInfo"),
                (e.LayoutList = "layoutList"),
                (e.ModCmdResponse = "modCommandResponse");
        })(q || (q = {})),
        (function (e) {
            (e.Video = "videoinput"),
                (e.AudioIn = "audioinput"),
                (e.AudioOut = "audiooutput");
        })(K || (K = {})),
        (function (e) {
            (e.REGED = "REGED"),
                (e.UNREGED = "UNREGED"),
                (e.NOREG = "NOREG"),
                (e.FAILED = "FAILED"),
                (e.FAIL_WAIT = "FAIL_WAIT"),
                (e.REGISTER = "REGISTER"),
                (e.TRYING = "TRYING"),
                (e.EXPIRED = "EXPIRED"),
                (e.UNREGISTER = "UNREGISTER");
        })(J || (J = {}));
    let z = "undefined" != typeof WebSocket ? WebSocket : null;
    const Q = 0,
        Y = 1,
        X = 2,
        Z = 3;
    class ee {
        constructor(e) {
            (this.session = e),
                (this.previousGatewayState = ""),
                (this._wsClient = null),
                (this._host = f),
                (this._timers = {}),
                (this.upDur = null),
                (this.downDur = null);
            const { host: t, env: i } = e.options;
            t && (this._host = ((e) => `${E.test(e) ? "" : "wss://"}${e}`)(t)),
                i &&
                    (this._host =
                        "development" === i ? "wss://rtcdev.telnyx.com" : f);
        }
        get connected() {
            return this._wsClient && this._wsClient.readyState === Y;
        }
        get connecting() {
            return this._wsClient && this._wsClient.readyState === Q;
        }
        get closing() {
            return this._wsClient && this._wsClient.readyState === X;
        }
        get closed() {
            return this._wsClient && this._wsClient.readyState === Z;
        }
        get isAlive() {
            return this.connecting || this.connected;
        }
        get isDead() {
            return this.closing || this.closed;
        }
        connect() {
            (this._wsClient = new z(this._host)),
                (this._wsClient.onopen = (e) =>
                    U(b.SocketOpen, e, this.session.uuid)),
                (this._wsClient.onclose = (e) =>
                    U(b.SocketClose, e, this.session.uuid)),
                (this._wsClient.onerror = (e) =>
                    U(b.SocketError, e, this.session.uuid)),
                (this._wsClient.onmessage = (e) => {
                    var t, i;
                    const s = S(e.data);
                    if ("string" != typeof s) {
                        if (
                            (this._unsetTimer(s.id),
                            h.debug(
                                "RECV: \n",
                                JSON.stringify(s, null, 2),
                                "\n"
                            ),
                            J[
                                `${
                                    null ===
                                        (i =
                                            null ===
                                                (t =
                                                    null == s
                                                        ? void 0
                                                        : s.result) ||
                                            void 0 === t
                                                ? void 0
                                                : t.params) || void 0 === i
                                        ? void 0
                                        : i.state
                                }`
                            ] || !U(s.id, s))
                        ) {
                            const e = N(s);
                            U(b.SocketMessage, s, this.session.uuid),
                                Boolean(e) && (this.previousGatewayState = e);
                        }
                    } else this._handleStringResponse(s);
                });
        }
        sendRawText(e) {
            this._wsClient.send(e);
        }
        send(e) {
            const { request: t } = e,
                i = new Promise((e, i) => {
                    if (t.hasOwnProperty("result")) return e();
                    P(t.id, (t) => {
                        const { result: s, error: n } = k(t);
                        return n ? i(n) : e(s);
                    }),
                        this._setTimer(t.id);
                });
            return (
                h.debug("SEND: \n", JSON.stringify(t, null, 2), "\n"),
                this._wsClient.send(JSON.stringify(t)),
                i
            );
        }
        close() {
            this._wsClient &&
                (I(this._wsClient._beginClose)
                    ? this._wsClient._beginClose()
                    : this._wsClient.close()),
                (this._wsClient = null);
        }
        _unsetTimer(e) {
            clearTimeout(this._timers[e]), delete this._timers[e];
        }
        _setTimer(e) {
            this._timers[e] = setTimeout(() => {
                U(e, {
                    error: {
                        code: this.session.timeoutErrorCode,
                        message: "Timeout",
                    },
                }),
                    this._unsetTimer(e);
            }, 1e4);
        }
        _handleStringResponse(e) {
            if (/^#SP/.test(e))
                switch (e[3]) {
                    case "U":
                        this.upDur = parseInt(e.substring(4));
                        break;
                    case "D":
                        (this.downDur = parseInt(e.substring(4))),
                            U(
                                b.SpeedTest,
                                { upDur: this.upDur, downDur: this.downDur },
                                this.session.uuid
                            );
                }
            else h.warn("Unknown message from socket", e);
        }
    }
    const te = () =>
            "undefined" == typeof window && "undefined" != typeof process,
        ie = (e) =>
            ((e, t) =>
                i(void 0, void 0, void 0, function* () {
                    if (te()) return null;
                    const i = window[e].getItem(_(t));
                    return S(i);
                }))("sessionStorage", e),
        se = (e, t) =>
            ((e, t, s) =>
                i(void 0, void 0, void 0, function* () {
                    if (te()) return null;
                    "object" == typeof s && (s = JSON.stringify(s)),
                        window[e].setItem(_(t), s);
                }))("sessionStorage", e, t),
        ne = (e) =>
            ((e, t) =>
                i(void 0, void 0, void 0, function* () {
                    return te() ? null : window[e].removeItem(_(t));
                }))("sessionStorage", e);
    const oe = (e) => navigator.mediaDevices.getUserMedia(e),
        re = (e) => e && e instanceof MediaStream,
        ae = (e, t) => {
            const i = C(e);
            null !== i &&
                (i.getAttribute("autoplay") ||
                    i.setAttribute("autoplay", "autoplay"),
                i.getAttribute("playsinline") ||
                    i.setAttribute("playsinline", "playsinline"),
                (i.srcObject = t));
        },
        ce = (e, t) =>
            i(void 0, void 0, void 0, function* () {
                const i = C(e);
                if (null === i)
                    return (
                        h.info("No HTMLMediaElement to attach the speakerId"),
                        !1
                    );
                if ("string" != typeof t)
                    return h.info(`Invalid speaker deviceId: '${t}'`), !1;
                try {
                    return yield i.setSinkId(t), !0;
                } catch (e) {
                    return !1;
                }
            }),
        le = (e) => {
            e && "live" === e.readyState && e.stop();
        },
        de = (e) => {
            re(e) && e.getTracks().forEach(le), (e = null);
        },
        ue = (e) =>
            i(void 0, void 0, void 0, function* () {
                h.info("RTCService.getUserMedia", e);
                const { audio: t, video: i } = e;
                if (!t && !i) return null;
                try {
                    return yield oe(e);
                } catch (e) {
                    throw (h.error("getUserMedia error: ", e), e);
                }
            }),
        he = (e = null, t = !1) =>
            i(void 0, void 0, void 0, function* () {
                let i = [];
                const s = yield navigator.mediaDevices
                    .getUserMedia(
                        ((e = null) => ({
                            audio: !e || e === K.AudioIn || e === K.AudioOut,
                            video: !e || e === K.Video,
                        }))(e)
                    )
                    .catch((e) => (console.error(e), null));
                if (s) {
                    if (
                        (de(s),
                        (i = yield navigator.mediaDevices.enumerateDevices()),
                        e && (i = i.filter((t) => t.kind === e)),
                        !0 === t)
                    )
                        return i;
                    const n = [];
                    i = i.filter((e) => {
                        if (!e.groupId) return !0;
                        const t = `${e.kind}-${e.groupId}`;
                        return !n.includes(t) && (n.push(t), !0);
                    });
                }
                return i;
            }),
        pe = [
            [320, 240],
            [640, 360],
            [640, 480],
            [1280, 720],
            [1920, 1080],
        ],
        ge = (e, t, s) =>
            i(void 0, void 0, void 0, function* () {
                const i = yield he(s, !0);
                for (let s = 0; s < i.length; s++) {
                    const { deviceId: n, label: o } = i[s];
                    if (e === n || t === o) return n;
                }
                return null;
            }),
        fe = (e) => {
            const t = navigator.mediaDevices.getSupportedConstraints();
            Object.keys(e).map((i) => {
                (t.hasOwnProperty(i) && null !== e[i] && void 0 !== e[i]) ||
                    delete e[i];
            });
        },
        me = (e, t, s, n) =>
            i(void 0, void 0, void 0, function* () {
                const { deviceId: i } = n;
                if (void 0 === i && (e || t)) {
                    const i = yield ge(e, t, s).catch((e) => null);
                    i && (n.deviceId = { exact: i });
                }
                return n;
            }),
        ve = (e) => {
            const t = "\r\n",
                i = e.split(t),
                s = i.findIndex(
                    (e) => /^a=rtpmap/.test(e) && /opus\/48000/.test(e)
                );
            if (s < 0) return e;
            const n = ((e) => {
                    const t = new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+"),
                        i = e.match(t);
                    return i && 2 == i.length ? i[1] : null;
                })(i[s]),
                o = new RegExp(`a=fmtp:${n}`),
                r = i.findIndex((e) => o.test(e));
            return (
                r >= 0
                    ? /stereo=1;/.test(i[r]) ||
                      (i[r] += "; stereo=1; sprop-stereo=1")
                    : (i[s] += `\r\na=fmtp:${n} stereo=1; sprop-stereo=1`),
                i.join(t)
            );
        },
        be = (e) => /^m=audio/.test(e),
        ye = (e) => /^m=video/.test(e),
        _e = (e, t) => {
            const i = "\r\n",
                s = t.split(i);
            if (s.findIndex(be) < s.findIndex(ye)) return e;
            const n = e.split(i),
                o = n.findIndex(be),
                r = n.findIndex(ye),
                a = n.slice(o, r),
                c = n.slice(r, n.length - 1);
            return [...n.slice(0, o), ...c, ...a, ""].join(i);
        },
        we = (e, t) => {
            if (!e) return !1;
            const { subscribed: i, alreadySubscribed: s } = Se(e);
            return i.includes(t) || s.includes(t);
        },
        Se = (e) => {
            const t = {
                subscribed: [],
                alreadySubscribed: [],
                unauthorized: [],
                unsubscribed: [],
                notSubscribed: [],
            };
            return (
                Object.keys(t).forEach((i) => {
                    t[i] = e[`${i}Channels`] || [];
                }),
                t
            );
        },
        Ie = (e, t = null, i = null) => {
            if (!re(e)) return null;
            let s = [];
            switch (t) {
                case "audio":
                    s = e.getAudioTracks();
                    break;
                case "video":
                    s = e.getVideoTracks();
                    break;
                default:
                    s = e.getTracks();
            }
            s.forEach((e) => {
                switch (i) {
                    case "on":
                    case !0:
                        e.enabled = !0;
                        break;
                    case "off":
                    case !1:
                        e.enabled = !1;
                        break;
                    default:
                        e.enabled = !e.enabled;
                }
            });
        },
        Ce = (e) => {
            Ie(e, "audio", !0);
        },
        Ee = (e) => {
            Ie(e, "audio", !1);
        },
        ke = (e) => {
            Ie(e, "audio", null);
        };
    function xe() {
        try {
            const {
                    browserInfo: e,
                    name: t,
                    version: i,
                    supportAudio: s,
                    supportVideo: n,
                } = (function () {
                    if (
                        !window ||
                        !window.navigator ||
                        !window.navigator.userAgent
                    )
                        throw new Error(
                            "You should use @telnyx/webrtc in a web browser such as Chrome|Firefox|Safari"
                        );
                    if (
                        navigator.userAgent.match(/chrom(e|ium)/gim) &&
                        !navigator.userAgent.match(/OPR\/[0-9]{2}/gi) &&
                        !navigator.userAgent.match(/edg/gim)
                    ) {
                        const e = navigator.userAgent
                                .match(/chrom(e|ium)\/[0-9]+\./gim)[0]
                                .split("/"),
                            t = e[0],
                            i = parseInt(e[1], 10);
                        return {
                            browserInfo: navigator.userAgent,
                            name: t,
                            version: i,
                            supportAudio: !0,
                            supportVideo: !0,
                        };
                    }
                    if (
                        navigator.userAgent.match(/firefox/gim) &&
                        !navigator.userAgent.match(/OPR\/[0-9]{2}/gi) &&
                        !navigator.userAgent.match(/edg/gim)
                    ) {
                        const e = navigator.userAgent
                                .match(/firefox\/[0-9]+\./gim)[0]
                                .split("/"),
                            t = e[0],
                            i = parseInt(e[1], 10);
                        return {
                            browserInfo: navigator.userAgent,
                            name: t,
                            version: i,
                            supportAudio: !0,
                            supportVideo: !1,
                        };
                    }
                    if (
                        navigator.userAgent.match(/safari/gim) &&
                        !navigator.userAgent.match(/OPR\/[0-9]{2}/gi) &&
                        !navigator.userAgent.match(/edg/gim)
                    ) {
                        const e = navigator.userAgent.match(/safari/gim)[0],
                            t = navigator.userAgent
                                .match(/version\/[0-9]+\./gim)[0]
                                .split("/"),
                            i = parseInt(t[1], 10);
                        return {
                            browserInfo: navigator.userAgent,
                            name: e,
                            version: i,
                            supportAudio: !0,
                            supportVideo: !0,
                        };
                    }
                    if (
                        navigator.userAgent.match(/edg/gim) &&
                        !navigator.userAgent.match(/OPR\/[0-9]{2}/gi)
                    ) {
                        const e = navigator.userAgent
                                .match(/edg\/[0-9]+\./gim)[0]
                                .split("/"),
                            t = e[0],
                            i = parseInt(e[1], 10);
                        return {
                            browserInfo: navigator.userAgent,
                            name: t,
                            version: i,
                            supportAudio: !0,
                            supportVideo: !0,
                        };
                    }
                    throw new Error(
                        "This browser does not support @telnyx/webrtc. To see browser support list: `TelnyxRTC.webRTCSupportedBrowserList()`"
                    );
                })(),
                o = window.RTCPeerConnection,
                r = window.RTCSessionDescription,
                a = window.RTCIceCandidate,
                c = window.navigator && window.navigator.mediaDevices,
                l =
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.msGetUserMedia ||
                    navigator.mozGetUserMedia;
            return {
                browserInfo: e,
                browserName: t,
                browserVersion: i,
                supportWebRTC: !!(o && r && a && c && l),
                supportWebRTCAudio: s,
                supportWebRTCVideo: n,
                supportRTCPeerConnection: !!o,
                supportSessionDescription: !!r,
                supportIceCandidate: !!a,
                supportMediaDevices: !!c,
                supportGetUserMedia: !!ue,
            };
        } catch (e) {
            return e.message;
        }
    }
    var Re;
    function Ne(e, t) {
        const i = document.getElementById(t);
        if (i) return i;
        if (e && t) {
            const i = document.createElement("audio");
            return (
                (i.id = t),
                (i.loop = !0),
                (i.src = e),
                (i.preload = "auto"),
                i.load(),
                document.body.appendChild(i),
                i
            );
        }
        return null;
    }
    function Ae(e) {
        e &&
            ((e._playFulfilled = !1),
            (e._promise = e.play()),
            e._promise
                .then(() => {
                    e._playFulfilled = !0;
                })
                .catch((t) => {
                    console.error("playAudio", t), (e._playFulfilled = !0);
                }));
    }
    function Te(e) {
        e &&
            (e._playFulfilled
                ? (e.pause(), (e.currentTime = 0))
                : e._promise && e._promise.then
                ? e._promise.then(() => {
                      e.pause(), (e.currentTime = 0);
                  })
                : setTimeout(() => {
                      e.pause(), (e.currentTime = 0);
                  }, 1e3));
    }
    !(function (e) {
        (e.not_supported = "not supported"),
            (e.full = "full"),
            (e.partial = "partial");
    })(Re || (Re = {}));
    const Oe = {
        id: "callID",
        destinationNumber: "destination_number",
        remoteCallerName: "remote_caller_id_name",
        remoteCallerNumber: "remote_caller_id_number",
        callerName: "caller_id_name",
        callerNumber: "caller_id_number",
    };
    class De extends class {
        buildRequest(e) {
            this.request = Object.assign({ jsonrpc: "2.0", id: c() }, e);
        }
    } {
        constructor(e = {}) {
            if ((super(), e.hasOwnProperty("dialogParams"))) {
                const i = t(e.dialogParams, [
                    "remoteSdp",
                    "localStream",
                    "remoteStream",
                    "onNotification",
                    "camId",
                    "micId",
                    "speakerId",
                ]);
                for (const e in Oe)
                    e &&
                        i.hasOwnProperty(e) &&
                        ((i[Oe[e]] = i[e]), delete i[e]);
                e.dialogParams = i;
            }
            this.buildRequest({ method: this.toString(), params: e });
        }
    }
    class Le extends De {
        constructor(e, t, i, s, n = {}) {
            super(), (this.method = "login");
            const o = {
                login: e,
                passwd: t,
                login_token: i,
                userVariables: n,
                loginParams: {},
            };
            s && (o.sessid = s),
                this.buildRequest({ method: this.method, params: o });
        }
    }
    class Pe extends De {
        constructor(e, t) {
            super(), this.buildRequest({ id: e, result: { method: t } });
        }
    }
    class Me extends De {
        toString() {
            return F.Invite;
        }
    }
    class Ue extends De {
        toString() {
            return F.Answer;
        }
    }
    class je extends De {
        toString() {
            return F.Attach;
        }
    }
    class Ve extends De {
        toString() {
            return F.Bye;
        }
    }
    class Be extends De {
        toString() {
            return F.Modify;
        }
    }
    class Fe extends De {
        toString() {
            return F.Info;
        }
    }
    class $e extends De {
        toString() {
            return F.Broadcast;
        }
    }
    class Ge extends De {
        toString() {
            return F.Subscribe;
        }
    }
    class He extends De {
        toString() {
            return F.Unsubscribe;
        }
    }
    class We {
        constructor(e, t) {
            (this.type = e),
                (this.options = t),
                (this.onSdpReadyTwice = null),
                (this._negotiating = !1),
                h.info(
                    "New Peer with type:",
                    this.type,
                    "Options:",
                    this.options
                ),
                (this._constraints = {
                    offerToReceiveAudio: !0,
                    offerToReceiveVideo: !0,
                }),
                (this._sdpReady = this._sdpReady.bind(this)),
                (this.handleSignalingStateChangeEvent =
                    this.handleSignalingStateChangeEvent.bind(this)),
                (this.handleNegotiationNeededEvent =
                    this.handleNegotiationNeededEvent.bind(this)),
                (this.handleTrackEvent = this.handleTrackEvent.bind(this)),
                (this.createPeerConnection =
                    this.createPeerConnection.bind(this)),
                this._init();
        }
        get isOffer() {
            return this.type === V.Offer;
        }
        get isAnswer() {
            return this.type === V.Answer;
        }
        startNegotiation() {
            (this._negotiating = !0),
                this._isOffer() ? this._createOffer() : this._createAnswer();
        }
        _logTransceivers() {
            h.info(
                "Number of transceivers:",
                this.instance.getTransceivers().length
            ),
                this.instance.getTransceivers().forEach((e, t) => {
                    h.info(
                        `>> Transceiver [${t}]:`,
                        e.mid,
                        e.direction,
                        e.stopped
                    ),
                        h.info(
                            `>> Sender Params [${t}]:`,
                            JSON.stringify(e.sender.getParameters(), null, 2)
                        );
                });
        }
        handleSignalingStateChangeEvent(e) {
            switch (
                (h.info("signalingState:", this.instance.signalingState),
                this.instance.signalingState)
            ) {
                case "stable":
                    this._negotiating = !1;
                    break;
                case "closed":
                    this.instance = null;
                    break;
                default:
                    this._negotiating = !0;
            }
        }
        handleNegotiationNeededEvent() {
            h.info("Negotiation needed event"),
                "stable" === this.instance.signalingState &&
                    this.startNegotiation();
        }
        handleTrackEvent(e) {
            const {
                    streams: [t],
                } = e,
                { remoteElement: i, screenShare: s } = this.options;
            let { remoteStream: n } = this.options;
            (n = t), !1 === s && ae(i, n);
        }
        createPeerConnection() {
            return i(this, void 0, void 0, function* () {
                var e;
                (this.instance =
                    ((e = this._config()), new window.RTCPeerConnection(e))),
                    (this.instance.onsignalingstatechange =
                        this.handleSignalingStateChangeEvent),
                    (this.instance.onnegotiationneeded =
                        this.handleNegotiationNeededEvent),
                    (this.instance.ontrack = this.handleTrackEvent),
                    this.instance.addEventListener("addstream", (e) => {
                        this.options.remoteStream = e.stream;
                    }),
                    (this.options.localStream =
                        yield this._retrieveLocalStream().catch(
                            (e) => (U(b.MediaError, e, this.options.id), null)
                        ));
            });
        }
        _init() {
            return i(this, void 0, void 0, function* () {
                yield this.createPeerConnection();
                const {
                    localElement: e,
                    localStream: t = null,
                    screenShare: i = !1,
                } = this.options;
                if (re(t)) {
                    const s = t.getAudioTracks();
                    h.info("Local audio tracks: ", s);
                    const n = t.getVideoTracks();
                    if (
                        (h.info("Local video tracks: ", n),
                        this.isOffer &&
                            "function" == typeof this.instance.addTransceiver)
                    ) {
                        s.forEach((e) => {
                            (this.options.userVariables.microphoneLabel =
                                e.label),
                                this.instance.addTransceiver(e, {
                                    direction: "sendrecv",
                                    streams: [t],
                                });
                        });
                        const e = { direction: "sendrecv", streams: [t] };
                        console.debug("Applying video transceiverParams", e),
                            n.forEach((t) => {
                                (this.options.userVariables.cameraLabel =
                                    t.label),
                                    this.instance.addTransceiver(t, e);
                            });
                    } else
                        "function" == typeof this.instance.addTrack
                            ? (s.forEach((e) => {
                                  (this.options.userVariables.microphoneLabel =
                                      e.label),
                                      this.instance.addTrack(e, t);
                              }),
                              n.forEach((e) => {
                                  (this.options.userVariables.cameraLabel =
                                      e.label),
                                      this.instance.addTrack(e, t);
                              }))
                            : this.instance.addStream(t);
                    !1 === i &&
                        (((e) => {
                            const t = C(e);
                            t && (t.muted = !0);
                        })(e),
                        ae(e, t));
                }
                this.isOffer
                    ? (this.options.negotiateAudio &&
                          this._checkMediaToNegotiate("audio"),
                      this.options.negotiateVideo &&
                          this._checkMediaToNegotiate("video"))
                    : this.startNegotiation(),
                    this._logTransceivers();
            });
        }
        _getSenderByKind(e) {
            return this.instance
                .getSenders()
                .find(({ track: t }) => t && t.kind === e);
        }
        _checkMediaToNegotiate(e) {
            if (!this._getSenderByKind(e)) {
                const t = this.instance.addTransceiver(e);
                h.info("Add transceiver", e, t);
            }
        }
        _createOffer() {
            this._isOffer() &&
                ((this._constraints.offerToReceiveAudio = Boolean(
                    this.options.audio
                )),
                (this._constraints.offerToReceiveVideo = Boolean(
                    this.options.video
                )),
                h.info("_createOffer - this._constraints", this._constraints),
                this.instance
                    .createOffer(this._constraints)
                    .then(this._setLocalDescription.bind(this))
                    .then(this._sdpReady)
                    .catch((e) => h.error("Peer _createOffer error:", e)));
        }
        _setRemoteDescription(e) {
            this.options.useStereo && (e.sdp = ve(e.sdp)),
                this.instance.localDescription &&
                    (e.sdp = _e(e.sdp, this.instance.localDescription.sdp));
            const t = e;
            return (
                h.info("REMOTE SDP \n", `Type: ${e.type}`, "\n\n", e.sdp),
                this.instance.setRemoteDescription(t)
            );
        }
        _createAnswer() {
            return i(this, void 0, void 0, function* () {
                if (!this._isAnswer()) return;
                if ("stable" !== this.instance.signalingState)
                    return (
                        console.log(
                            "  - But the signaling state isn't stable, so triggering rollback"
                        ),
                        void (yield Promise.all([
                            this.instance.setLocalDescription({
                                type: "rollback",
                            }),
                            this.instance.setRemoteDescription({
                                sdp: this.options.remoteSdp,
                                type: V.Offer,
                            }),
                        ]))
                    );
                yield this._setRemoteDescription({
                    sdp: this.options.remoteSdp,
                    type: V.Offer,
                }),
                    this._logTransceivers();
                const e = yield this.instance.createAnswer();
                yield this._setLocalDescription(e);
            });
        }
        _setLocalDescription(e) {
            const {
                useStereo: t,
                googleMaxBitrate: i,
                googleMinBitrate: s,
                googleStartBitrate: n,
                mediaSettings: o,
            } = this.options;
            return (
                t && (e.sdp = ve(e.sdp)),
                i &&
                    s &&
                    n &&
                    (e.sdp = ((e, t, i, s) => {
                        const n = e.split("\r\n");
                        return (
                            n.forEach((e, o) => {
                                /^a=fmtp:\d*/.test(e)
                                    ? (n[
                                          o
                                      ] += `;x-google-max-bitrate=${t};x-google-min-bitrate=${i};x-google-start-bitrate=${s}`)
                                    : /^a=mid:(1|video)/.test(e) &&
                                      (n[o] += `\r\nb=AS:${t}`);
                            }),
                            n.join("\r\n")
                        );
                    })(e.sdp, i, s, n)),
                o &&
                    o.useSdpASBandwidthKbps &&
                    null !== o.sdpASBandwidthKbps &&
                    (e.sdp = ((e, t) => {
                        let i = "AS",
                            s = t;
                        !navigator.userAgent.match(/firefox/gim) ||
                            navigator.userAgent.match(/OPR\/[0-9]{2}/gi) ||
                            navigator.userAgent.match(/edg/gim) ||
                            ((i = "TIAS"), (s = 1e3 * (t >>> 0)));
                        return -1 === e.indexOf("b=" + i + ":")
                            ? e.replace(
                                  /c=IN (.*)\r\n/,
                                  "c=IN $1\r\nb=" + i + ":" + s + "\r\n"
                              )
                            : e.replace(
                                  new RegExp("b=" + i + ":.*\r\n"),
                                  "b=" + i + ":" + s + "\r\n"
                              );
                    })(e.sdp, o.sdpASBandwidthKbps)),
                this.instance.setLocalDescription(e)
            );
        }
        _sdpReady() {
            I(this.onSdpReadyTwice) &&
                this.onSdpReadyTwice(this.instance.localDescription);
        }
        _retrieveLocalStream() {
            return i(this, void 0, void 0, function* () {
                if (re(this.options.localStream))
                    return this.options.localStream;
                const e = yield ((t = this.options),
                i(void 0, void 0, void 0, function* () {
                    let { audio: e = !0, micId: i } = t;
                    const { micLabel: s = "" } = t;
                    i &&
                        ((i = yield ge(i, s, K.AudioIn).catch((e) => null)),
                        i &&
                            ("boolean" == typeof e && (e = {}),
                            (e.deviceId = { exact: i })));
                    let { video: n = !1, camId: o } = t;
                    const { camLabel: r = "" } = t;
                    return (
                        o &&
                            ((o = yield ge(o, r, K.Video).catch((e) => null)),
                            o &&
                                ("boolean" == typeof n && (n = {}),
                                (n.deviceId = { exact: o }))),
                        { audio: e, video: n }
                    );
                }));
                var t;
                return ue(e);
            });
        }
        _isOffer() {
            return this.type === V.Offer;
        }
        _isAnswer() {
            return this.type === V.Answer;
        }
        _config() {
            const { iceServers: e = [] } = this.options,
                t = { bundlePolicy: "max-compat", iceServers: e };
            return h.info("RTC config", t), t;
        }
    }
    const qe = (e, t) => {
            const {
                contentType: i,
                canvasType: s,
                callID: n,
                canvasInfo: o = null,
                currentLayerIdx: r = -1,
            } = t;
            o && "mcu-personal-canvas" !== s && delete o.memberID;
            const a = {
                type: $.conferenceUpdate,
                call: e.calls[n],
                canvasInfo: Ke(o),
                currentLayerIdx: r,
            };
            switch (i) {
                case "layer-info": {
                    const t = Object.assign({ action: q.LayerInfo }, a);
                    U(b.Notification, t, e.uuid);
                    break;
                }
                case "layout-info": {
                    const t = Object.assign({ action: q.LayoutInfo }, a);
                    U(b.Notification, t, e.uuid);
                    break;
                }
            }
        },
        Ke = (e) => {
            const t = JSON.stringify(e)
                .replace(/memberID/g, "participantId")
                .replace(/ID"/g, 'Id"')
                .replace(/POS"/g, 'Pos"');
            return S(t);
        };
    var Je = "2.9.0";
    const ze = Je;
    class Qe {
        constructor(e, t) {
            (this.session = e),
                (this.id = ""),
                (this.state = H[H.New]),
                (this.prevState = ""),
                (this.channels = []),
                (this.role = W.Participant),
                (this.extension = null),
                (this._state = H.New),
                (this._prevState = H.New),
                (this.gotAnswer = !1),
                (this.gotEarly = !1),
                (this._lastSerno = 0),
                (this._targetNodeId = null),
                (this._iceTimeout = null),
                (this._iceDone = !1),
                (this._statsBindings = []),
                (this._statsIntervalId = null),
                (this._checkConferenceSerno = (e) => {
                    const t =
                        e < 0 ||
                        !this._lastSerno ||
                        (this._lastSerno && e === this._lastSerno + 1);
                    return t && e >= 0 && (this._lastSerno = e), t;
                }),
                (this._doStats = () => {
                    this.peer &&
                        this.peer.instance &&
                        0 !== this._statsBindings.length &&
                        this.peer.instance.getStats().then((e) => {
                            e.forEach((e) => {
                                this._statsBindings.forEach((t) => {
                                    if (t.callback) {
                                        if (t.constraints)
                                            for (var i in t.constraints)
                                                if (
                                                    t.constraints.hasOwnProperty(
                                                        i
                                                    ) &&
                                                    t.constraints[i] !== e[i]
                                                )
                                                    return;
                                        t.callback(e);
                                    }
                                });
                            });
                        });
                });
            const {
                iceServers: i,
                speaker: s,
                micId: n,
                micLabel: o,
                camId: r,
                camLabel: a,
                localElement: c,
                remoteElement: l,
                mediaConstraints: { audio: d, video: u },
                ringtoneFile: h,
                ringbackFile: p,
            } = e;
            (this.options = Object.assign(
                {},
                G,
                {
                    audio: d,
                    video: u,
                    iceServers: i,
                    localElement: c,
                    remoteElement: l,
                    micId: n,
                    micLabel: o,
                    camId: r,
                    camLabel: a,
                    speakerId: s,
                    ringtoneFile: h,
                    ringbackFile: p,
                },
                t
            )),
                (this._onMediaError = this._onMediaError.bind(this)),
                this._init(),
                this.options &&
                    ((this._ringtone = Ne(
                        this.options.ringtoneFile,
                        "_ringtone"
                    )),
                    (this._ringback = Ne(
                        this.options.ringbackFile,
                        "_ringback"
                    )));
        }
        get nodeId() {
            return this._targetNodeId;
        }
        set nodeId(e) {
            this._targetNodeId = e;
        }
        get telnyxIDs() {
            return {
                telnyxCallControlId: this.options.telnyxCallControlId,
                telnyxSessionId: this.options.telnyxSessionId,
                telnyxLegId: this.options.telnyxLegId,
            };
        }
        get localStream() {
            return this.options.localStream;
        }
        get remoteStream() {
            return this.options.remoteStream;
        }
        get memberChannel() {
            return `conference-member.${this.id}`;
        }
        invite() {
            (this.direction = B.Outbound),
                (this.peer = new We(V.Offer, this.options)),
                this._registerPeerEvents();
        }
        answer() {
            this.stopRingtone(),
                (this.direction = B.Inbound),
                (this.peer = new We(V.Answer, this.options)),
                this._registerPeerEvents();
        }
        playRingtone() {
            Ae(this._ringtone);
        }
        stopRingtone() {
            Te(this._ringtone);
        }
        playRingback() {
            Ae(this._ringback);
        }
        stopRingback() {
            Te(this._ringback);
        }
        hangup(e, t) {
            let i = e || {},
                s = !1 !== t;
            (this.cause = i.cause || "NORMAL_CLEARING"),
                (this.causeCode = i.causeCode || 16),
                (this.sipCode = i.sipCode || null),
                (this.sipReason = i.sipReason || null),
                (this.sipCallId = i.sip_call_id || null),
                this.setState(H.Hangup);
            const n = () => {
                this.peer && this.peer.instance.close(),
                    this.setState(H.Destroy);
            };
            if ((this.stopRingtone(), s)) {
                const e = new Ve({
                    sessid: this.session.sessionid,
                    dialogParams: this.options,
                    cause: "USER_BUSY",
                    causeCode: 17,
                });
                this._execute(e)
                    .catch((e) => {
                        h.error("telnyl_rtc.bye failed!", e),
                            U(b.Error, e, this.session.uuid);
                    })
                    .then(n.bind(this));
            } else n();
        }
        transfer(e) {
            console.warn(
                "The call.transfer method is not currently implemented."
            );
            const t = new Be({
                sessid: this.session.sessionid,
                action: "transfer",
                destination: e,
                dialogParams: this.options,
            });
            this._execute(t);
        }
        replace(e) {
            const t = new Be({
                sessid: this.session.sessionid,
                action: "replace",
                replaceCallID: e,
                dialogParams: this.options,
            });
            this._execute(t);
        }
        hold() {
            const e = new Be({
                sessid: this.session.sessionid,
                action: "hold",
                dialogParams: this.options,
            });
            return this._execute(e)
                .then(this._handleChangeHoldStateSuccess.bind(this))
                .catch(this._handleChangeHoldStateError.bind(this));
        }
        unhold() {
            const e = new Be({
                sessid: this.session.sessionid,
                action: "unhold",
                dialogParams: this.options,
            });
            return this._execute(e)
                .then(this._handleChangeHoldStateSuccess.bind(this))
                .catch(this._handleChangeHoldStateError.bind(this));
        }
        toggleHold() {
            const e = new Be({
                sessid: this.session.sessionid,
                action: "toggleHold",
                dialogParams: this.options,
            });
            return this._execute(e)
                .then(this._handleChangeHoldStateSuccess.bind(this))
                .catch(this._handleChangeHoldStateError.bind(this));
        }
        dtmf(e) {
            const t = new Fe({
                sessid: this.session.sessionid,
                dtmf: e,
                dialogParams: this.options,
            });
            this._execute(t);
        }
        message(e, t) {
            const i = { from: this.session.options.login, to: e, body: t },
                s = new Fe({
                    sessid: this.session.sessionid,
                    msg: i,
                    dialogParams: this.options,
                });
            this._execute(s);
        }
        muteAudio() {
            Ee(this.options.localStream);
        }
        unmuteAudio() {
            Ce(this.options.localStream);
        }
        toggleAudioMute() {
            ke(this.options.localStream);
        }
        setAudioInDevice(e) {
            return i(this, void 0, void 0, function* () {
                const { instance: t } = this.peer,
                    i = t
                        .getSenders()
                        .find(({ track: { kind: e } }) => "audio" === e);
                if (i) {
                    const t = yield oe({ audio: { deviceId: { exact: e } } }),
                        s = t.getAudioTracks()[0];
                    i.replaceTrack(s), (this.options.micId = e);
                    const { localStream: n } = this.options;
                    n.getAudioTracks().forEach((e) => e.stop()),
                        n.getVideoTracks().forEach((e) => t.addTrack(e)),
                        (this.options.localStream = t);
                }
            });
        }
        muteVideo() {
            var e;
            (e = this.options.localStream), Ie(e, "video", !1);
        }
        unmuteVideo() {
            var e;
            (e = this.options.localStream), Ie(e, "video", !0);
        }
        toggleVideoMute() {
            var e;
            (e = this.options.localStream), Ie(e, "video", null);
        }
        setVideoDevice(e) {
            return i(this, void 0, void 0, function* () {
                const { instance: t } = this.peer,
                    i = t
                        .getSenders()
                        .find(({ track: { kind: e } }) => "video" === e);
                if (i) {
                    const t = yield oe({ video: { deviceId: { exact: e } } }),
                        s = t.getVideoTracks()[0];
                    i.replaceTrack(s);
                    const { localElement: n, localStream: o } = this.options;
                    ae(n, t),
                        (this.options.camId = e),
                        o.getAudioTracks().forEach((e) => t.addTrack(e)),
                        o.getVideoTracks().forEach((e) => e.stop()),
                        (this.options.localStream = t);
                }
            });
        }
        deaf() {
            Ee(this.options.remoteStream);
        }
        undeaf() {
            Ce(this.options.remoteStream);
        }
        toggleDeaf() {
            ke(this.options.remoteStream);
        }
        setBandwidthEncodingsMaxBps(e, t) {
            return i(this, void 0, void 0, function* () {
                if (!this || !this.peer)
                    return void h.error(
                        "Could not set bandwidth (reason: no peer connection). Dynamic bandwidth can only be set when there is a call running - is there any call running?)"
                    );
                const { instance: i } = this.peer,
                    s = i.getSenders();
                if (!s)
                    return void h.error(
                        "Could not set bandwidth (reason: no senders). Dynamic bandwidth can only be set when there is a call running - is there any call running?)"
                    );
                const n = s.find(({ track: { kind: e } }) => e === t);
                if (n) {
                    const i = n.getParameters();
                    i.encodings || (i.encodings = [{ rid: "h" }]),
                        h.info("Parameters: ", i),
                        h.info(
                            "Setting max ",
                            "audio" === t ? "audio" : "video",
                            " bandwidth to: ",
                            e,
                            " [bps]"
                        ),
                        (i.encodings[0].maxBitrate = e),
                        yield n
                            .setParameters(i)
                            .then(() => {
                                h.info(
                                    "audio" === t ? "New audio" : "New video",
                                    " bandwidth settings in use: ",
                                    n.getParameters()
                                );
                            })
                            .catch((e) => console.error(e));
                } else h.error("Could not set bandwidth (reason: no " + t + " sender). Dynamic bandwidth can only be set when there is a call running - is there any call running?)");
            });
        }
        setAudioBandwidthEncodingsMaxBps(e) {
            this.setBandwidthEncodingsMaxBps(e, "audio");
        }
        setVideoBandwidthEncodingsMaxBps(e) {
            this.setBandwidthEncodingsMaxBps(e, "video");
        }
        getStats(e, t) {
            if (!e) return;
            const i = { callback: e, constraints: t };
            if ((this._statsBindings.push(i), !this._statsIntervalId)) {
                const e = 2e3;
                this._startStats(e);
            }
        }
        setState(e) {
            switch (
                ((this._prevState = this._state),
                (this._state = e),
                (this.state = H[this._state].toLowerCase()),
                (this.prevState = H[this._prevState].toLowerCase()),
                h.info(
                    `Call ${this.id} state change from ${this.prevState} to ${this.state}`
                ),
                this._dispatchNotification({ type: $.callUpdate, call: this }),
                e)
            ) {
                case H.Purge:
                    this.hangup({ cause: "PURGE", causeCode: "01" }, !1);
                    break;
                case H.Active:
                    setTimeout(() => {
                        const { remoteElement: e, speakerId: t } = this.options;
                        e && t && ce(e, t);
                    }, 0);
                    break;
                case H.Destroy:
                    this._finalize();
            }
        }
        handleMessage(e) {
            const { method: t, params: i } = e;
            switch (t) {
                case F.Answer:
                    if (((this.gotAnswer = !0), this._state >= H.Active))
                        return;
                    this._state >= H.Early && this.setState(H.Active),
                        this.gotEarly || this._onRemoteSdp(i.sdp),
                        this.stopRingback(),
                        this.stopRingtone();
                    break;
                case F.Media:
                    if (this._state >= H.Early) return;
                    (this.gotEarly = !0), this._onRemoteSdp(i.sdp);
                    break;
                case F.Display:
                case F.Attach: {
                    const {
                        display_name: e,
                        display_number: s,
                        display_direction: n,
                    } = i;
                    this.extension = s;
                    const o = n === B.Inbound ? B.Outbound : B.Inbound,
                        r = {
                            type: $[t],
                            call: this,
                            displayName: e,
                            displayNumber: s,
                            displayDirection: o,
                        };
                    U(b.Notification, r, this.id) ||
                        U(b.Notification, r, this.session.uuid);
                    break;
                }
                case F.Info:
                case F.Event: {
                    const e = Object.assign(Object.assign({}, i), {
                        type: $.generic,
                        call: this,
                    });
                    U(b.Notification, e, this.id) ||
                        U(b.Notification, e, this.session.uuid);
                    break;
                }
                case F.Ringing:
                    this.playRingback();
                    break;
                case F.Bye:
                    this.stopRingback(),
                        this.stopRingtone(),
                        this.hangup(i, !1);
            }
        }
        handleConferenceUpdate(e, t) {
            return i(this, void 0, void 0, function* () {
                if (
                    !this._checkConferenceSerno(e.wireSerno) &&
                    e.name !== t.laName
                )
                    return (
                        h.error(
                            "ConferenceUpdate invalid wireSerno or packet name:",
                            e
                        ),
                        "INVALID_PACKET"
                    );
                const {
                    action: i,
                    data: s,
                    hashKey: n = String(this._lastSerno),
                    arrIndex: o,
                } = e;
                switch (i) {
                    case "bootObj": {
                        this._lastSerno = 0;
                        const {
                            chatChannel: e,
                            infoChannel: i,
                            modChannel: n,
                            laName: o,
                            conferenceMemberID: r,
                            role: a,
                        } = t;
                        this._dispatchConferenceUpdate({
                            action: q.Join,
                            conferenceName: o,
                            participantId: Number(r),
                            role: a,
                        }),
                            e && (yield this._subscribeConferenceChat(e)),
                            i && (yield this._subscribeConferenceInfo(i)),
                            n &&
                                a === W.Moderator &&
                                (yield this._subscribeConferenceModerator(n));
                        const c = [];
                        for (const e in s)
                            c.push(
                                Object.assign(
                                    { callId: s[e][0], index: Number(e) },
                                    w(s[e][1])
                                )
                            );
                        this._dispatchConferenceUpdate({
                            action: q.Bootstrap,
                            participants: c,
                        });
                        break;
                    }
                    case "add":
                        this._dispatchConferenceUpdate(
                            Object.assign(
                                { action: q.Add, callId: n, index: o },
                                w(s)
                            )
                        );
                        break;
                    case "modify":
                        this._dispatchConferenceUpdate(
                            Object.assign(
                                { action: q.Modify, callId: n, index: o },
                                w(s)
                            )
                        );
                        break;
                    case "del":
                        this._dispatchConferenceUpdate(
                            Object.assign(
                                { action: q.Delete, callId: n, index: o },
                                w(s)
                            )
                        );
                        break;
                    case "clear":
                        this._dispatchConferenceUpdate({ action: q.Clear });
                        break;
                    default:
                        this._dispatchConferenceUpdate({
                            action: i,
                            data: s,
                            callId: n,
                            index: o,
                        });
                }
            });
        }
        _addChannel(e) {
            this.channels.includes(e) || this.channels.push(e);
            const t = this.session.relayProtocol;
            this.session._existsSubscription(t, e) &&
                (this.session.subscriptions[t][e] = Object.assign(
                    Object.assign({}, this.session.subscriptions[t][e]),
                    { callId: this.id }
                ));
        }
        _subscribeConferenceChat(e) {
            return i(this, void 0, void 0, function* () {
                const t = {
                        nodeId: this.nodeId,
                        channels: [e],
                        handler: (e) => {
                            const {
                                direction: t,
                                from: i,
                                fromDisplay: s,
                                message: n,
                                type: o,
                            } = e.data;
                            this._dispatchConferenceUpdate({
                                action: q.ChatMessage,
                                direction: t,
                                participantNumber: i,
                                participantName: s,
                                messageText: n,
                                messageType: o,
                                messageId: e.eventSerno,
                            });
                        },
                    },
                    i = yield this.session.vertoSubscribe(t).catch((e) => {
                        h.error("ConfChat subscription error:", e);
                    });
                we(i, e) &&
                    (this._addChannel(e),
                    Object.defineProperties(this, {
                        sendChatMessage: {
                            configurable: !0,
                            value: (t, i) => {
                                this.session.vertoBroadcast({
                                    nodeId: this.nodeId,
                                    channel: e,
                                    data: {
                                        action: "send",
                                        message: t,
                                        type: i,
                                    },
                                });
                            },
                        },
                    }));
            });
        }
        _subscribeConferenceInfo(e) {
            return i(this, void 0, void 0, function* () {
                const t = {
                        nodeId: this.nodeId,
                        channels: [e],
                        handler: (e) => {
                            const { eventData: t } = e;
                            if ("layout-info" === t.contentType)
                                (t.callID = this.id), qe(this.session, t);
                            else
                                h.error(
                                    "Conference-Info unknown contentType",
                                    e
                                );
                        },
                    },
                    i = yield this.session.vertoSubscribe(t).catch((e) => {
                        h.error("ConfInfo subscription error:", e);
                    });
                we(i, e) && this._addChannel(e);
            });
        }
        _confControl(e, t = {}) {
            const i = Object.assign(
                { application: "conf-control", callID: this.id, value: null },
                t
            );
            this.session.vertoBroadcast({
                nodeId: this.nodeId,
                channel: e,
                data: i,
            });
        }
        _subscribeConferenceModerator(e) {
            return i(this, void 0, void 0, function* () {
                const t = (t, i = null, s = null) => {
                        const n = parseInt(i) || null;
                        this._confControl(e, { command: t, id: n, value: s });
                    },
                    i = () => {
                        const { video: e } = this.options;
                        if (
                            ("boolean" == typeof e && !e) ||
                            ("object" == typeof e && y(e))
                        )
                            throw `Conference ${this.id} has no video!`;
                    },
                    s = {
                        nodeId: this.nodeId,
                        channels: [e],
                        handler: (e) => {
                            const { data: t } = e;
                            if ("list-videoLayouts" === t["conf-command"]) {
                                if (t.responseData) {
                                    const e = JSON.stringify(
                                        t.responseData
                                    ).replace(/IDS"/g, 'Ids"');
                                    this._dispatchConferenceUpdate({
                                        action: q.LayoutList,
                                        layouts: JSON.parse(e),
                                    });
                                }
                            } else
                                this._dispatchConferenceUpdate({
                                    action: q.ModCmdResponse,
                                    command: t["conf-command"],
                                    response: t.response,
                                });
                        },
                    },
                    n = yield this.session.vertoSubscribe(s).catch((e) => {
                        h.error("ConfMod subscription error:", e);
                    });
                we(n, e) &&
                    ((this.role = W.Moderator),
                    this._addChannel(e),
                    Object.defineProperties(this, {
                        listVideoLayouts: {
                            configurable: !0,
                            value: () => {
                                t("list-videoLayouts");
                            },
                        },
                        playMedia: {
                            configurable: !0,
                            value: (e) => {
                                t("play", null, e);
                            },
                        },
                        stopMedia: {
                            configurable: !0,
                            value: () => {
                                t("stop", null, "all");
                            },
                        },
                        deaf: {
                            configurable: !0,
                            value: (e) => {
                                t("deaf", e);
                            },
                        },
                        undeaf: {
                            configurable: !0,
                            value: (e) => {
                                t("undeaf", e);
                            },
                        },
                        startRecord: {
                            configurable: !0,
                            value: (e) => {
                                t("recording", null, ["start", e]);
                            },
                        },
                        stopRecord: {
                            configurable: !0,
                            value: () => {
                                t("recording", null, ["stop", "all"]);
                            },
                        },
                        snapshot: {
                            configurable: !0,
                            value: (e) => {
                                i(), t("vid-write-png", null, e);
                            },
                        },
                        setVideoLayout: {
                            configurable: !0,
                            value: (e, s) => {
                                i();
                                t("vid-layout", null, s ? [e, s] : e);
                            },
                        },
                        kick: {
                            configurable: !0,
                            value: (e) => {
                                t("kick", e);
                            },
                        },
                        muteMic: {
                            configurable: !0,
                            value: (e) => {
                                t("tmute", e);
                            },
                        },
                        muteVideo: {
                            configurable: !0,
                            value: (e) => {
                                i(), t("tvmute", e);
                            },
                        },
                        presenter: {
                            configurable: !0,
                            value: (e) => {
                                i(), t("vid-res-id", e, "presenter");
                            },
                        },
                        videoFloor: {
                            configurable: !0,
                            value: (e) => {
                                i(), t("vid-floor", e, "force");
                            },
                        },
                        banner: {
                            configurable: !0,
                            value: (e, s) => {
                                i(), t("vid-banner", e, encodeURI(s));
                            },
                        },
                        volumeDown: {
                            configurable: !0,
                            value: (e) => {
                                t("volume_out", e, "down");
                            },
                        },
                        volumeUp: {
                            configurable: !0,
                            value: (e) => {
                                t("volume_out", e, "up");
                            },
                        },
                        gainDown: {
                            configurable: !0,
                            value: (e) => {
                                t("volume_in", e, "down");
                            },
                        },
                        gainUp: {
                            configurable: !0,
                            value: (e) => {
                                t("volume_in", e, "up");
                            },
                        },
                        transfer: {
                            configurable: !0,
                            value: (e, i) => {
                                t("transfer", e, i);
                            },
                        },
                    }));
            });
        }
        _handleChangeHoldStateSuccess(e) {
            return (
                "active" === e.holdState
                    ? this.setState(H.Active)
                    : this.setState(H.Held),
                !0
            );
        }
        _handleChangeHoldStateError(e) {
            return h.error(`Failed to ${e.action} on call ${this.id}`), !1;
        }
        _onRemoteSdp(e) {
            let t = _e(e, this.peer.instance.localDescription.sdp);
            this.options.useStereo && (t = ve(t));
            const i = { sdp: t, type: V.Answer };
            this.peer.instance
                .setRemoteDescription(i)
                .then(() => {
                    this.gotEarly && this.setState(H.Early),
                        this.gotAnswer && this.setState(H.Active);
                })
                .catch((e) => {
                    h.error("Call setRemoteDescription Error: ", e),
                        this.hangup();
                });
        }
        _requestAnotherLocalDescription() {
            I(this.peer.onSdpReadyTwice)
                ? U(
                      b.Error,
                      new Error("SDP without candidates for the second time!"),
                      this.session.uuid
                  )
                : (Object.defineProperty(this.peer, "onSdpReadyTwice", {
                      value: this._onIceSdp.bind(this),
                  }),
                  (this._iceDone = !1),
                  this.peer.startNegotiation());
        }
        _onIceSdp(e) {
            this._iceTimeout && clearTimeout(this._iceTimeout),
                (this._iceTimeout = null),
                (this._iceDone = !0);
            const { sdp: t, type: i } = e;
            if (-1 === t.indexOf("candidate"))
                return (
                    h.info("No candidate - retry \n"),
                    void this._requestAnotherLocalDescription()
                );
            this.peer.instance.removeEventListener("icecandidate", this._onIce);
            let s = null;
            const n = {
                sessid: this.session.sessionid,
                sdp: t,
                dialogParams: this.options,
                "User-Agent": `Web-${ze}`,
            };
            switch (i) {
                case V.Offer:
                    this.setState(H.Requesting), (s = new Me(n));
                    break;
                case V.Answer:
                    this.setState(H.Answering),
                        (s =
                            !0 === this.options.attach ? new je(n) : new Ue(n));
                    break;
                default:
                    return (
                        h.error(`${this.id} - Unknown local SDP type:`, e),
                        this.hangup({}, !1)
                    );
            }
            this._execute(s)
                .then((e) => {
                    const { node_id: t = null } = e;
                    (this._targetNodeId = t),
                        i === V.Offer
                            ? this.setState(H.Trying)
                            : this.setState(H.Active);
                })
                .catch((e) => {
                    h.error(`${this.id} - Sending ${i} error:`, e),
                        this.hangup();
                });
        }
        _onIce(e) {
            const { instance: t } = this.peer;
            null === this._iceTimeout &&
                (this._iceTimeout = setTimeout(
                    () => this._onIceSdp(t.localDescription),
                    1e3
                )),
                e.candidate
                    ? h.debug("RTCPeer Candidate:", e.candidate)
                    : this._onIceSdp(t.localDescription);
        }
        _registerPeerEvents() {
            const { instance: e } = this.peer;
            (this._iceDone = !1),
                (e.onicecandidate = (e) => {
                    this._iceDone || this._onIce(e);
                }),
                e.addEventListener("addstream", (e) => {
                    this.options.remoteStream = e.stream;
                }),
                e.addEventListener("track", (e) => {
                    this.options.remoteStream = e.streams[0];
                    const {
                        remoteElement: t,
                        remoteStream: i,
                        screenShare: s,
                    } = this.options;
                    !1 === s && ae(t, i);
                });
        }
        _onMediaError(e) {
            this._dispatchNotification({ type: $.userMediaError, error: e }),
                this.hangup({}, !1);
        }
        _dispatchConferenceUpdate(e) {
            this._dispatchNotification(
                Object.assign({ type: $.conferenceUpdate, call: this }, e)
            );
        }
        _dispatchNotification(e) {
            !0 !== this.options.screenShare &&
                (U(b.Notification, e, this.id, !1) ||
                    U(b.Notification, e, this.session.uuid));
        }
        _execute(e) {
            return (
                this.nodeId && (e.targetNodeId = this.nodeId),
                this.session.execute(e)
            );
        }
        _init() {
            const {
                id: e,
                userVariables: t,
                remoteCallerNumber: i,
                onNotification: s,
            } = this.options;
            e || (this.options.id = c()),
                (this.id = this.options.id),
                (t && !y(t)) ||
                    (this.options.userVariables =
                        this.session.options.userVariables || {}),
                i ||
                    (this.options.remoteCallerNumber =
                        this.options.destinationNumber),
                (this.session.calls[this.id] = this),
                L(b.MediaError, this._onMediaError, this.id),
                I(s) && L(b.Notification, s.bind(this), this.id),
                this.setState(H.New),
                h.info("New Call with Options:", this.options);
        }
        _finalize() {
            this._stopStats(),
                this.peer &&
                    this.peer.instance &&
                    (this.peer.instance.close(), (this.peer = null));
            const { remoteStream: e, localStream: t } = this.options;
            de(e),
                de(t),
                M(b.MediaError, null, this.id),
                (this.session.calls[this.id] = null),
                delete this.session.calls[this.id];
        }
        _startStats(e) {
            (this._statsIntervalId = setInterval(this._doStats, e)),
                h.info("Stats started");
        }
        _stopStats() {
            this._statsIntervalId &&
                (clearInterval(this._statsIntervalId),
                (this._statsIntervalId = null)),
                h.info("Stats stopped");
        }
    }
    Qe.setStateTelnyx = (e) => {
        if (e) {
            switch (e._state) {
                case H.Requesting:
                case H.Recovering:
                case H.Trying:
                case H.Early:
                    e.state = "connecting";
                    break;
                case H.Active:
                    e.state = "active";
                    break;
                case H.Held:
                    e.state = "held";
                    break;
                case H.Hangup:
                case H.Destroy:
                    e.state = "done";
                    break;
                case H.Answering:
                    e.state = "ringing";
                    break;
                case H.New:
                    e.state = "new";
            }
            return e;
        }
    };
    class Ye extends Qe {
        constructor() {
            super(...arguments), (this._statsInterval = null);
        }
        hangup(e = {}, t = !0) {
            this.screenShare instanceof Ye && this.screenShare.hangup(e, t),
                super.hangup(e, t);
        }
        startScreenShare(e) {
            return i(this, void 0, void 0, function* () {
                const t = yield ((i = { video: !0 }),
                navigator.mediaDevices.getDisplayMedia(i));
                var i;
                t.getTracks().forEach((e) => {
                    e.addEventListener("ended", () => {
                        this.screenShare && this.screenShare.hangup();
                    });
                });
                const {
                        remoteCallerName: s,
                        remoteCallerNumber: n,
                        callerName: o,
                        callerNumber: r,
                    } = this.options,
                    a = Object.assign(
                        {
                            screenShare: !0,
                            localStream: t,
                            destinationNumber: `${this.extension}-screen`,
                            remoteCallerName: s,
                            remoteCallerNumber: `${n}-screen`,
                            callerName: `${o} (Screen)`,
                            callerNumber: `${r} (Screen)`,
                        },
                        e
                    );
                return (
                    (this.screenShare = new Ye(this.session, a)),
                    this.screenShare.invite(),
                    this.screenShare
                );
            });
        }
        stopScreenShare() {
            this.screenShare instanceof Ye && this.screenShare.hangup();
        }
        setAudioOutDevice(e) {
            return i(this, void 0, void 0, function* () {
                this.options.speakerId = e;
                const { remoteElement: t, speakerId: i } = this.options;
                return !(!t || !i) && ce(t, i);
            });
        }
        _finalize() {
            this._stats(!1), super._finalize();
        }
        _stats(e = !0) {
            if (!1 === e) return clearInterval(this._statsInterval);
            h.setLevel(2),
                (this._statsInterval = window.setInterval(
                    () =>
                        i(this, void 0, void 0, function* () {
                            const e = yield this.peer.instance.getStats(null);
                            let t = "";
                            const i = [
                                    "certificate",
                                    "codec",
                                    "peer-connection",
                                    "stream",
                                    "local-candidate",
                                    "remote-candidate",
                                ],
                                s = ["id", "type", "timestamp"];
                            e.forEach((e) => {
                                i.includes(e.type) ||
                                    ((t += `\n${e.type}\n`),
                                    Object.keys(e).forEach((i) => {
                                        s.includes(i) ||
                                            (t += `\t${i}: ${e[i]}\n`);
                                    }));
                            }),
                                h.info(t);
                        }),
                    2e3
                ));
        }
    }
    class Xe extends De {
        constructor() {
            super(), (this.method = F.GatewayState);
            this.buildRequest({ method: this.method, params: {} });
        }
    }
    class Ze {
        constructor(e, t) {
            (this.code = t), (this.message = e);
        }
    }
    class et extends De {
        constructor() {
            super(), (this.method = F.Ping);
            this.buildRequest({ method: this.method, params: {} });
        }
    }
    class tt {
        constructor(e) {
            this.session = e;
        }
        _ack(e, t) {
            const i = new Pe(e, t);
            this.nodeId && (i.targetNodeId = this.nodeId),
                this.session.execute(i);
        }
        reconnectDelay() {
            return 1e3 * x(2, 6);
        }
        handleMessage(e) {
            const { session: t } = this,
                { id: i, method: s, params: n = {} } = e,
                o = null == n ? void 0 : n.callID,
                r = null == n ? void 0 : n.eventChannel,
                a = null == n ? void 0 : n.eventType,
                c = s === F.Attach;
            if ("channelPvtData" === a) return this._handlePvtEvent(n.pvtData);
            if (o && t.calls.hasOwnProperty(o)) {
                if (!c)
                    return t.calls[o].handleMessage(e), void this._ack(i, s);
                t.calls[o].hangup({}, !1);
            }
            const l = () => {
                    const e = {
                        id: o,
                        remoteSdp: n.sdp,
                        destinationNumber: n.callee_id_number,
                        remoteCallerName: n.caller_id_name,
                        remoteCallerNumber: n.caller_id_number,
                        callerName: n.callee_id_name,
                        callerNumber: n.callee_id_number,
                        attach: c,
                        mediaSettings: n.mediaSettings,
                    };
                    n.telnyx_call_control_id &&
                        (e.telnyxCallControlId = n.telnyx_call_control_id),
                        n.telnyx_session_id &&
                            (e.telnyxSessionId = n.telnyx_session_id),
                        n.telnyx_leg_id && (e.telnyxLegId = n.telnyx_leg_id),
                        n.client_state && (e.clientState = n.client_state);
                    const i = new Ye(t, e);
                    return (i.nodeId = this.nodeId), i;
                },
                d = new Xe(),
                u = new et();
            switch (s) {
                case F.Ping:
                    this.session.execute(u);
                    break;
                case F.Punt:
                    t.disconnect();
                    break;
                case F.Invite: {
                    const e = l();
                    e.playRingtone(), e.setState(H.Ringing), this._ack(i, s);
                    break;
                }
                case F.Attach: {
                    const t = l();
                    this.session.autoRecoverCalls
                        ? t.answer()
                        : t.setState(H.Recovering),
                        t.handleMessage(e);
                    break;
                }
                case F.Event:
                case "webrtc.event":
                    if (!r)
                        return void h.error(
                            "Verto received an unknown event:",
                            n
                        );
                    const o = t.relayProtocol,
                        a = r.split(".")[0];
                    t._existsSubscription(o, r)
                        ? U(o, n, r)
                        : r === t.sessionid
                        ? this._handleSessionEvent(n.eventData)
                        : t._existsSubscription(o, a)
                        ? U(o, n, a)
                        : t.calls.hasOwnProperty(r)
                        ? t.calls[r].handleMessage(e)
                        : U(b.Notification, n, t.uuid);
                    break;
                case F.Info:
                    (n.type = $.generic), U(b.Notification, n, t.uuid);
                    break;
                case F.ClientReady:
                    this.session.execute(d);
                    break;
                default: {
                    const i = N(e);
                    if (i) {
                        switch (i) {
                            case J.REGISTER:
                            case J.REGED:
                                t.connection.previousGatewayState !== J.REGED &&
                                    t.connection.previousGatewayState !==
                                        J.REGISTER &&
                                    ((tt.retriedRegister = 0),
                                    (n.type = $.vertoClientReady),
                                    U(b.Ready, n, t.uuid));
                                break;
                            case J.UNREGED:
                            case J.NOREG:
                                if (
                                    ((tt.retriedRegister += 1),
                                    5 === tt.retriedRegister)
                                ) {
                                    (tt.retriedRegister = 0),
                                        U(
                                            b.Error,
                                            new Ze(
                                                "Fail to register the user, the server tried 5 times",
                                                "UNREGED|NOREG"
                                            ),
                                            t.uuid
                                        );
                                    break;
                                }
                                setTimeout(() => {
                                    this.session.execute(d);
                                }, this.reconnectDelay());
                                break;
                            case J.FAILED:
                            case J.FAIL_WAIT:
                                if (
                                    t.connection.previousGatewayState !==
                                        J.FAILED &&
                                    t.connection.previousGatewayState !==
                                        J.FAIL_WAIT
                                ) {
                                    if (!this.session.hasAutoReconnect()) {
                                        (tt.retriedConnect = 0),
                                            U(
                                                b.Error,
                                                new Ze(
                                                    "Fail to connect the server, the server tried 5 times",
                                                    "FAILED|FAIL_WAIT"
                                                ),
                                                t.uuid
                                            );
                                        break;
                                    }
                                    if (
                                        ((tt.retriedConnect += 1),
                                        5 === tt.retriedConnect)
                                    ) {
                                        (tt.retriedConnect = 0),
                                            U(b.Error, n, t.uuid);
                                        break;
                                    }
                                    setTimeout(() => {
                                        this.session.disconnect().then(() => {
                                            this.session.clearConnection(),
                                                this.session.connect();
                                        });
                                    }, this.reconnectDelay());
                                }
                                break;
                            default:
                                h.warn(
                                    "GatewayState message unknown method:",
                                    e
                                );
                        }
                        break;
                    }
                    h.warn("Verto message unknown method:", e);
                    break;
                }
            }
        }
        _retrieveCallId(e, t) {
            const i = Object.keys(this.session.calls);
            if ("bootObj" !== e.action)
                return i.find((e) =>
                    this.session.calls[e].channels.includes(t)
                );
            {
                const t = e.data.find((e) => i.includes(e[0]));
                if (t instanceof Array) return t[0];
            }
        }
        _handlePvtEvent(e) {
            return i(this, void 0, void 0, function* () {
                const { session: t } = this,
                    i = t.relayProtocol,
                    {
                        action: s,
                        laChannel: n,
                        laName: o,
                        chatChannel: r,
                        infoChannel: a,
                        modChannel: c,
                        conferenceMemberID: l,
                        role: d,
                        callID: u,
                    } = e;
                switch (s) {
                    case "conference-liveArray-join": {
                        const i = () => {
                                t.vertoBroadcast({
                                    nodeId: this.nodeId,
                                    channel: n,
                                    data: {
                                        liveArray: {
                                            command: "bootstrap",
                                            context: n,
                                            name: o,
                                        },
                                    },
                                });
                            },
                            s = {
                                nodeId: this.nodeId,
                                channels: [n],
                                handler: ({ data: s }) => {
                                    const r = u || this._retrieveCallId(s, n);
                                    if (r && t.calls.hasOwnProperty(r)) {
                                        const a = t.calls[r];
                                        a._addChannel(n),
                                            (a.extension = o),
                                            a
                                                .handleConferenceUpdate(s, e)
                                                .then((e) => {
                                                    "INVALID_PACKET" === e &&
                                                        i();
                                                });
                                    }
                                },
                            },
                            r = yield t.vertoSubscribe(s).catch((e) => {
                                h.error("liveArray subscription error:", e);
                            });
                        we(r, n) && i();
                        break;
                    }
                    case "conference-liveArray-part": {
                        let e = null;
                        if (n && t._existsSubscription(i, n)) {
                            const { callId: s = null } = t.subscriptions[i][n];
                            if (((e = t.calls[s] || null), null !== s)) {
                                const i = {
                                    type: $.conferenceUpdate,
                                    action: q.Leave,
                                    conferenceName: o,
                                    participantId: Number(l),
                                    role: d,
                                };
                                U(b.Notification, i, s, !1) ||
                                    U(b.Notification, i, t.uuid),
                                    null === e && M(b.Notification, null, s);
                            }
                        }
                        const s = [n, r, a, c];
                        t.vertoUnsubscribe({ nodeId: this.nodeId, channels: s })
                            .then(({ unsubscribedChannels: t = [] }) => {
                                e &&
                                    (e.channels = e.channels.filter(
                                        (e) => !t.includes(e)
                                    ));
                            })
                            .catch((e) => {
                                h.error("liveArray unsubscribe error:", e);
                            });
                        break;
                    }
                }
            });
        }
        _handleSessionEvent(e) {
            switch (e.contentType) {
                case "layout-info":
                case "layer-info":
                    qe(this.session, e);
                    break;
                case "logo-info": {
                    const t = {
                        type: $.conferenceUpdate,
                        action: q.LogoInfo,
                        logo: e.logoURL,
                    };
                    U(b.Notification, t, this.session.uuid);
                    break;
                }
            }
        }
    }
    (tt.retriedConnect = 0), (tt.retriedRegister = 0);
    (e.TelnyxRTC = class extends (
        class extends class extends class {
            constructor(e) {
                if (
                    ((this.options = e),
                    (this.uuid = c()),
                    (this.sessionid = ""),
                    (this.subscriptions = {}),
                    (this.signature = null),
                    (this.relayProtocol = null),
                    (this.contexts = []),
                    (this.timeoutErrorCode = -32e3),
                    (this.connection = null),
                    (this._jwtAuth = !1),
                    (this._doKeepAlive = !1),
                    (this._autoReconnect = !0),
                    (this._idle = !1),
                    (this._executeQueue = []),
                    !this.validateOptions())
                )
                    throw new Error("Invalid init options");
                (this._onSocketOpen = this._onSocketOpen.bind(this)),
                    (this._onSocketCloseOrError =
                        this._onSocketCloseOrError.bind(this)),
                    (this._onSocketMessage = this._onSocketMessage.bind(this)),
                    (this._handleLoginError =
                        this._handleLoginError.bind(this)),
                    this._attachListeners(),
                    (this.connection = new ee(this));
            }
            get __logger() {
                return h;
            }
            get connected() {
                return this.connection && this.connection.connected;
            }
            get reconnectDelay() {
                return 1e3 * x(2, 6);
            }
            execute(e) {
                return this._idle
                    ? new Promise((t) =>
                          this._executeQueue.push({ resolve: t, msg: e })
                      )
                    : this.connected
                    ? this.connection.send(e).catch((e) => {
                          throw (
                              (e.code &&
                                  e.code === this.timeoutErrorCode &&
                                  this._closeConnection(),
                              e)
                          );
                      })
                    : new Promise((t) => {
                          this._executeQueue.push({ resolve: t, msg: e }),
                              this.connect();
                      });
            }
            executeRaw(e) {
                this._idle
                    ? this._executeQueue.push({ msg: e })
                    : this.connection.sendRawText(e);
            }
            validateOptions() {
                return R(this.options);
            }
            broadcast(e) {}
            disconnect() {
                return i(this, void 0, void 0, function* () {
                    clearTimeout(this._reconnectTimeout),
                        (this.subscriptions = {}),
                        (this._autoReconnect = !1),
                        (this.relayProtocol = null),
                        this._closeConnection(),
                        yield ne(this.signature),
                        (this._executeQueue = []),
                        this._detachListeners();
                });
            }
            on(e, t) {
                return L(e, t, this.uuid), this;
            }
            off(e, t) {
                return M(e, t, this.uuid), this;
            }
            connect() {
                return i(this, void 0, void 0, function* () {
                    this.connection || (this.connection = new ee(this)),
                        this._attachListeners(),
                        this.connection.isAlive || this.connection.connect();
                });
            }
            _handleLoginError(e) {
                U(b.Error, e, this.uuid);
            }
            _onSocketOpen() {
                return i(this, void 0, void 0, function* () {});
            }
            _onSocketCloseOrError(e) {
                h.error(`Socket ${e.type} ${e.message}`),
                    this.relayProtocol && j(this.relayProtocol);
                for (const e in this.subscriptions) j(e);
                (this.subscriptions = {}),
                    (this.contexts = []),
                    this._autoReconnect &&
                        (this._reconnectTimeout = setTimeout(
                            () => this.connect(),
                            this.reconnectDelay
                        ));
            }
            _onSocketMessage(e) {}
            _removeSubscription(e, t) {
                this._existsSubscription(e, t) &&
                    (t
                        ? (delete this.subscriptions[e][t], M(e, null, t))
                        : (delete this.subscriptions[e], j(e)));
            }
            _addSubscription(e, t = null, i) {
                this._existsSubscription(e, i) ||
                    (this._existsSubscription(e) ||
                        (this.subscriptions[e] = {}),
                    (this.subscriptions[e][i] = {}),
                    I(t) && L(e, t, i));
            }
            _existsSubscription(e, t) {
                return !(
                    !this.subscriptions.hasOwnProperty(e) ||
                    !(!t || (t && this.subscriptions[e].hasOwnProperty(t)))
                );
            }
            _attachListeners() {
                this._detachListeners(),
                    this.on(b.SocketOpen, this._onSocketOpen),
                    this.on(b.SocketClose, this._onSocketCloseOrError),
                    this.on(b.SocketError, this._onSocketCloseOrError),
                    this.on(b.SocketMessage, this._onSocketMessage);
            }
            _detachListeners() {
                this.off(b.SocketOpen, this._onSocketOpen),
                    this.off(b.SocketClose, this._onSocketCloseOrError),
                    this.off(b.SocketError, this._onSocketCloseOrError),
                    this.off(b.SocketMessage, this._onSocketMessage);
            }
            _emptyExecuteQueues() {
                this._executeQueue.forEach(({ resolve: e, msg: t }) => {
                    "string" == typeof t
                        ? this.executeRaw(t)
                        : e(this.execute(t));
                });
            }
            _closeConnection() {
                (this._idle = !0),
                    clearTimeout(this._keepAliveTimeout),
                    this.connection && this.connection.close();
            }
            _keepAlive() {
                if (!0 === this._doKeepAlive) {
                    if (!1 === this._pong) return this._closeConnection();
                    (this._pong = !1),
                        (this._keepAliveTimeout = setTimeout(
                            () => this._keepAlive(),
                            1e4
                        ));
                }
            }
            static on(e, t) {
                L(e, t);
            }
            static off(e) {
                M(e);
            }
            static uuid() {
                return c();
            }
            clearConnection() {
                this.connection = null;
            }
            hasAutoReconnect() {
                return this._autoReconnect;
            }
        } {
            constructor(e) {
                super(e),
                    (this.calls = {}),
                    (this.autoRecoverCalls = !0),
                    (this._iceServers = []),
                    (this._localElement = null),
                    (this._remoteElement = null),
                    (this._jwtAuth = !0),
                    (this._audioConstraints = !0),
                    (this._videoConstraints = !1),
                    (this._speaker = null),
                    (this.iceServers = e.iceServers),
                    (this.ringtoneFile = e.ringtoneFile),
                    (this.ringbackFile = e.ringbackFile);
            }
            get reconnectDelay() {
                return 1e3;
            }
            connect() {
                const e = Object.create(null, {
                    connect: { get: () => super.connect },
                });
                return i(this, void 0, void 0, function* () {
                    (this.sessionid = yield ie(g)), e.connect.call(this);
                });
            }
            checkPermissions(e = !0, t = !0) {
                return i(this, void 0, void 0, function* () {
                    try {
                        const i = yield ue({ audio: e, video: t });
                        return de(i), !0;
                    } catch (e) {
                        return !1;
                    }
                });
            }
            logout() {
                this.disconnect();
            }
            disconnect() {
                const e = Object.create(null, {
                    disconnect: { get: () => super.disconnect },
                });
                return i(this, void 0, void 0, function* () {
                    Object.keys(this.calls).forEach((e) =>
                        this.calls[e].setState(H.Purge)
                    ),
                        (this.calls = {}),
                        yield e.disconnect.call(this);
                });
            }
            speedTest(e) {
                return new Promise((t, i) => {
                    if (
                        (P(
                            b.SpeedTest,
                            (i) => {
                                const { upDur: s, downDur: n } = i,
                                    o = n ? (8 * e) / (n / 1e3) / 1024 : 0;
                                t({
                                    upDur: s,
                                    downDur: n,
                                    upKps: (s
                                        ? (8 * e) / (s / 1e3) / 1024
                                        : 0
                                    ).toFixed(0),
                                    downKps: o.toFixed(0),
                                });
                            },
                            this.uuid
                        ),
                        !(e = Number(e)))
                    )
                        return i(`Invalid parameter 'bytes': ${e}`);
                    this.executeRaw(`#SPU ${e}`);
                    let s = e / 1024;
                    e % 1024 && s++;
                    const n = ".".repeat(1024);
                    for (let e = 0; e < s; e++) this.executeRaw(`#SPB ${n}`);
                    this.executeRaw("#SPE");
                });
            }
            getDevices() {
                return he().catch((e) => (U(b.MediaError, e, this.uuid), []));
            }
            getVideoDevices() {
                return he(K.Video).catch(
                    (e) => (U(b.MediaError, e, this.uuid), [])
                );
            }
            getAudioInDevices() {
                return he(K.AudioIn).catch(
                    (e) => (U(b.MediaError, e, this.uuid), [])
                );
            }
            getAudioOutDevices() {
                return he(K.AudioOut).catch(
                    (e) => (
                        console.error("getAudioOutDevices", e),
                        U(b.MediaError, e, this.uuid),
                        []
                    )
                );
            }
            validateDeviceId(e, t, i) {
                return ge(e, t, i);
            }
            getDeviceResolutions(e) {
                return i(this, void 0, void 0, function* () {
                    try {
                        return yield ((e) =>
                            i(void 0, void 0, void 0, function* () {
                                const t = [],
                                    i = yield ue({
                                        video: { deviceId: { exact: e } },
                                    }),
                                    s = i.getVideoTracks()[0];
                                for (let e = 0; e < pe.length; e++) {
                                    const [i, n] = pe[e];
                                    (yield s
                                        .applyConstraints({
                                            width: { exact: i },
                                            height: { exact: n },
                                        })
                                        .then(() => !0)
                                        .catch(() => !1)) &&
                                        t.push({
                                            resolution: `${i}x${n}`,
                                            width: i,
                                            height: n,
                                        });
                                }
                                return de(i), t;
                            }))(e);
                    } catch (e) {
                        throw e;
                    }
                });
            }
            get mediaConstraints() {
                return {
                    audio: this._audioConstraints,
                    video: this._videoConstraints,
                };
            }
            setAudioSettings(e) {
                return i(this, void 0, void 0, function* () {
                    if (!e)
                        throw new Error(
                            "You need to provide the settings object"
                        );
                    const { micId: i, micLabel: s } = e,
                        n = t(e, ["micId", "micLabel"]);
                    return (
                        fe(n),
                        (this._audioConstraints = yield me(
                            i,
                            s,
                            "audioinput",
                            n
                        )),
                        (this.micId = i),
                        (this.micLabel = s),
                        this._audioConstraints
                    );
                });
            }
            disableMicrophone() {
                this._audioConstraints = !1;
            }
            enableMicrophone() {
                this._audioConstraints = !0;
            }
            setVideoSettings(e) {
                return i(this, void 0, void 0, function* () {
                    if (!e)
                        throw new Error(
                            "You need to provide the settings object"
                        );
                    const { camId: i, camLabel: s } = e,
                        n = t(e, ["camId", "camLabel"]);
                    return (
                        fe(n),
                        (this._videoConstraints = yield me(
                            i,
                            s,
                            "videoinput",
                            n
                        )),
                        (this.camId = i),
                        (this.camLabel = s),
                        this._videoConstraints
                    );
                });
            }
            disableWebcam() {
                this._videoConstraints = !1;
            }
            enableWebcam() {
                this._videoConstraints = !0;
            }
            set iceServers(e) {
                this._iceServers =
                    "boolean" == typeof e
                        ? e
                            ? [{ urls: ["stun:stun.l.google.com:19302"] }]
                            : []
                        : e || [v, m];
            }
            get iceServers() {
                return this._iceServers;
            }
            set speaker(e) {
                this._speaker = e;
            }
            get speaker() {
                return this._speaker;
            }
            set localElement(e) {
                this._localElement = C(e);
            }
            get localElement() {
                return this._localElement;
            }
            set remoteElement(e) {
                this._remoteElement = C(e);
            }
            get remoteElement() {
                return this._remoteElement;
            }
            vertoBroadcast({ nodeId: e, channel: t = "", data: i }) {
                if (!t) throw new Error(`Invalid channel for broadcast: ${t}`);
                const s = new $e({
                    sessid: this.sessionid,
                    eventChannel: t,
                    data: i,
                });
                e && (s.targetNodeId = e), this.execute(s).catch((e) => e);
            }
            vertoSubscribe({ nodeId: e, channels: t = [], handler: s }) {
                return i(this, void 0, void 0, function* () {
                    if (
                        !(t = t.filter(
                            (e) =>
                                e &&
                                !this._existsSubscription(this.relayProtocol, e)
                        )).length
                    )
                        return {};
                    const i = new Ge({
                        sessid: this.sessionid,
                        eventChannel: t,
                    });
                    e && (i.targetNodeId = e);
                    const n = yield this.execute(i),
                        { unauthorized: o = [], subscribed: r = [] } = Se(n);
                    return (
                        o.length &&
                            o.forEach((e) =>
                                this._removeSubscription(this.relayProtocol, e)
                            ),
                        r.forEach((e) =>
                            this._addSubscription(this.relayProtocol, s, e)
                        ),
                        n
                    );
                });
            }
            vertoUnsubscribe({ nodeId: e, channels: t = [] }) {
                return i(this, void 0, void 0, function* () {
                    if (
                        !(t = t.filter(
                            (e) =>
                                e &&
                                this._existsSubscription(this.relayProtocol, e)
                        )).length
                    )
                        return {};
                    const i = new He({
                        sessid: this.sessionid,
                        eventChannel: t,
                    });
                    e && (i.targetNodeId = e);
                    const s = yield this.execute(i),
                        { unsubscribed: n = [], notSubscribed: o = [] } = Se(s);
                    return (
                        n.forEach((e) =>
                            this._removeSubscription(this.relayProtocol, e)
                        ),
                        o.forEach((e) =>
                            this._removeSubscription(this.relayProtocol, e)
                        ),
                        s
                    );
                });
            }
            static telnyxStateCall(e) {
                return Ye.setStateTelnyx(e);
            }
        } {
            constructor(e) {
                super(e),
                    (this.relayProtocol = "verto-protocol"),
                    (this.timeoutErrorCode = -329990),
                    window.addEventListener("beforeunload", (e) => {
                        this.calls &&
                            Object.keys(this.calls).forEach((e) => {
                                this.calls[e] && this.calls[e].hangup({}, !0);
                            });
                    });
            }
            validateOptions() {
                return R(this.options);
            }
            newCall(e) {
                if (!e || !e.destinationNumber)
                    throw new Error(
                        "Verto.newCall() error: destinationNumber is required."
                    );
                const t = new Ye(this, e);
                return t.invite(), t;
            }
            broadcast(e) {
                return this.vertoBroadcast(e);
            }
            subscribe(e) {
                return this.vertoSubscribe(e);
            }
            unsubscribe(e) {
                return this.vertoUnsubscribe(e);
            }
            _onSocketOpen() {
                return i(this, void 0, void 0, function* () {
                    this._idle = !1;
                    const {
                            login: e,
                            password: t,
                            passwd: i,
                            login_token: s,
                            userVariables: n,
                            autoReconnect: o = !0,
                        } = this.options,
                        r = new Le(e, t || i, s, this.sessionid, n),
                        a = yield this.execute(r).catch(this._handleLoginError);
                    a &&
                        ((this._autoReconnect = o),
                        (this.sessionid = a.sessid),
                        se(g, this.sessionid));
                });
            }
            _onSocketMessage(e) {
                new tt(this).handleMessage(e);
            }
        }
    ) {
        constructor(e) {
            super(e), console.log("SDK version: 2.9.0");
        }
        newCall(e) {
            return super.newCall(e);
        }
        static webRTCInfo() {
            return xe();
        }
        static webRTCSupportedBrowserList() {
            return [
                {
                    operationSystem: "Android",
                    supported: [
                        {
                            browserName: "Chrome",
                            features: ["audio"],
                            supported: Re.full,
                        },
                        {
                            browserName: "Firefox",
                            features: ["audio"],
                            supported: Re.partial,
                        },
                        { browserName: "Safari", supported: Re.not_supported },
                        { browserName: "Edge", supported: Re.not_supported },
                    ],
                },
                {
                    operationSystem: "iOS",
                    supported: [
                        { browserName: "Chrome", supported: Re.not_supported },
                        { browserName: "Firefox", supported: Re.not_supported },
                        {
                            browserName: "Safari",
                            features: ["video", "audio"],
                            supported: Re.full,
                        },
                        { browserName: "Edge", supported: Re.not_supported },
                    ],
                },
                {
                    operationSystem: "Linux",
                    supported: [
                        {
                            browserName: "Chrome",
                            features: ["video", "audio"],
                            supported: Re.full,
                        },
                        {
                            browserName: "Firefox",
                            features: ["audio"],
                            supported: Re.partial,
                        },
                        { browserName: "Safari", supported: Re.not_supported },
                        { browserName: "Edge", supported: Re.not_supported },
                    ],
                },
                {
                    operationSystem: "MacOS",
                    supported: [
                        {
                            browserName: "Chrome",
                            features: ["video", "audio"],
                            supported: Re.full,
                        },
                        {
                            browserName: "Firefox",
                            features: ["audio"],
                            supported: Re.partial,
                        },
                        {
                            browserName: "Safari",
                            features: ["video", "audio"],
                            supported: Re.full,
                        },
                        {
                            browserName: "Edge",
                            features: ["audio"],
                            supported: Re.partial,
                        },
                    ],
                },
                {
                    operationSystem: "Windows",
                    supported: [
                        {
                            browserName: "Chrome",
                            features: ["video", "audio"],
                            supported: Re.full,
                        },
                        {
                            browserName: "Firefox",
                            features: ["audio"],
                            supported: Re.partial,
                        },
                        { browserName: "Safari", supported: Re.not_supported },
                        {
                            browserName: "Edge",
                            features: ["audio"],
                            supported: Re.partial,
                        },
                    ],
                },
            ];
        }
    }),
        Object.defineProperty(e, "__esModule", { value: !0 });
});
