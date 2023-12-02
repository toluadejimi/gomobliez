!(function (e, t) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define([], t)
        : "object" == typeof exports
        ? (exports.Africastalking = t())
        : (e.Africastalking = t());
})(window, function () {
    return (function (e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var i = (t[n] = { i: n, l: !1, exports: {} });
            return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
        }
        return (
            (r.m = e),
            (r.c = t),
            (r.d = function (e, t, n) {
                r.o(e, t) ||
                    Object.defineProperty(e, t, { enumerable: !0, get: n });
            }),
            (r.r = function (e) {
                "undefined" != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module",
                    }),
                    Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (r.t = function (e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule)
                    return e;
                var n = Object.create(null);
                if (
                    (r.r(n),
                    Object.defineProperty(n, "default", {
                        enumerable: !0,
                        value: e,
                    }),
                    2 & t && "string" != typeof e)
                )
                    for (var i in e)
                        r.d(
                            n,
                            i,
                            function (t) {
                                return e[t];
                            }.bind(null, i)
                        );
                return n;
            }),
            (r.n = function (e) {
                var t =
                    e && e.__esModule
                        ? function () {
                              return e.default;
                          }
                        : function () {
                              return e;
                          };
                return r.d(t, "a", t), t;
            }),
            (r.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.p = ""),
            r((r.s = 3))
        );
    })([
        function (e, t, r) {
            "use strict";
            (function (t) {
                var n = r(6);
                e.exports = n({ window: t.window });
            }).call(this, r(5));
        },
        function (e, t, r) {
            "use strict";
            var n = !0,
                i = !0;
            function a(e, t, r) {
                var n = e.match(t);
                return n && n.length >= r && parseInt(n[r], 10);
            }
            e.exports = {
                extractVersion: a,
                wrapPeerConnectionEvent: function (e, t, r) {
                    if (e.RTCPeerConnection) {
                        var n = e.RTCPeerConnection.prototype,
                            i = n.addEventListener;
                        n.addEventListener = function (e, n) {
                            if (e !== t) return i.apply(this, arguments);
                            var a = function (e) {
                                var t = r(e);
                                t && n(t);
                            };
                            return (
                                (this._eventMap = this._eventMap || {}),
                                (this._eventMap[n] = a),
                                i.apply(this, [e, a])
                            );
                        };
                        var a = n.removeEventListener;
                        (n.removeEventListener = function (e, r) {
                            if (
                                e !== t ||
                                !this._eventMap ||
                                !this._eventMap[r]
                            )
                                return a.apply(this, arguments);
                            var n = this._eventMap[r];
                            return (
                                delete this._eventMap[r], a.apply(this, [e, n])
                            );
                        }),
                            Object.defineProperty(n, "on" + t, {
                                get: function () {
                                    return this["_on" + t];
                                },
                                set: function (e) {
                                    this["_on" + t] &&
                                        (this.removeEventListener(
                                            t,
                                            this["_on" + t]
                                        ),
                                        delete this["_on" + t]),
                                        e &&
                                            this.addEventListener(
                                                t,
                                                (this["_on" + t] = e)
                                            );
                                },
                                enumerable: !0,
                                configurable: !0,
                            });
                    }
                },
                disableLog: function (e) {
                    return "boolean" != typeof e
                        ? new Error(
                              "Argument type: " +
                                  typeof e +
                                  ". Please use a boolean."
                          )
                        : ((n = e),
                          e
                              ? "adapter.js logging disabled"
                              : "adapter.js logging enabled");
                },
                disableWarnings: function (e) {
                    return "boolean" != typeof e
                        ? new Error(
                              "Argument type: " +
                                  typeof e +
                                  ". Please use a boolean."
                          )
                        : ((i = !e),
                          "adapter.js deprecation warnings " +
                              (e ? "disabled" : "enabled"));
                },
                log: function () {
                    if ("object" == typeof window) {
                        if (n) return;
                        "undefined" != typeof console &&
                            "function" == typeof console.log &&
                            console.log.apply(console, arguments);
                    }
                },
                deprecated: function (e, t) {
                    i &&
                        console.warn(
                            e + " is deprecated, please use " + t + " instead."
                        );
                },
                detectBrowser: function (e) {
                    var t = e && e.navigator,
                        r = { browser: null, version: null };
                    if (void 0 === e || !e.navigator)
                        return (r.browser = "Not a browser."), r;
                    if (t.mozGetUserMedia)
                        (r.browser = "firefox"),
                            (r.version = a(t.userAgent, /Firefox\/(\d+)\./, 1));
                    else if (t.webkitGetUserMedia)
                        (r.browser = "chrome"),
                            (r.version = a(
                                t.userAgent,
                                /Chrom(e|ium)\/(\d+)\./,
                                2
                            ));
                    else if (
                        t.mediaDevices &&
                        t.userAgent.match(/Edge\/(\d+).(\d+)$/)
                    )
                        (r.browser = "edge"),
                            (r.version = a(
                                t.userAgent,
                                /Edge\/(\d+).(\d+)$/,
                                2
                            ));
                    else {
                        if (
                            !e.RTCPeerConnection ||
                            !t.userAgent.match(/AppleWebKit\/(\d+)\./)
                        )
                            return (r.browser = "Not a supported browser."), r;
                        (r.browser = "safari"),
                            (r.version = a(
                                t.userAgent,
                                /AppleWebKit\/(\d+)\./,
                                1
                            ));
                    }
                    return r;
                },
            };
        },
        function (e, t, r) {
            "use strict";
            var n = {
                generateIdentifier: function () {
                    return Math.random().toString(36).substr(2, 10);
                },
            };
            (n.localCName = n.generateIdentifier()),
                (n.splitLines = function (e) {
                    return e
                        .trim()
                        .split("\n")
                        .map(function (e) {
                            return e.trim();
                        });
                }),
                (n.splitSections = function (e) {
                    return e.split("\nm=").map(function (e, t) {
                        return (t > 0 ? "m=" + e : e).trim() + "\r\n";
                    });
                }),
                (n.getDescription = function (e) {
                    var t = n.splitSections(e);
                    return t && t[0];
                }),
                (n.getMediaSections = function (e) {
                    var t = n.splitSections(e);
                    return t.shift(), t;
                }),
                (n.matchPrefix = function (e, t) {
                    return n.splitLines(e).filter(function (e) {
                        return 0 === e.indexOf(t);
                    });
                }),
                (n.parseCandidate = function (e) {
                    for (
                        var t,
                            r = {
                                foundation: (t =
                                    0 === e.indexOf("a=candidate:")
                                        ? e.substring(12).split(" ")
                                        : e.substring(10).split(" "))[0],
                                component: parseInt(t[1], 10),
                                protocol: t[2].toLowerCase(),
                                priority: parseInt(t[3], 10),
                                ip: t[4],
                                address: t[4],
                                port: parseInt(t[5], 10),
                                type: t[7],
                            },
                            n = 8;
                        n < t.length;
                        n += 2
                    )
                        switch (t[n]) {
                            case "raddr":
                                r.relatedAddress = t[n + 1];
                                break;
                            case "rport":
                                r.relatedPort = parseInt(t[n + 1], 10);
                                break;
                            case "tcptype":
                                r.tcpType = t[n + 1];
                                break;
                            case "ufrag":
                                (r.ufrag = t[n + 1]),
                                    (r.usernameFragment = t[n + 1]);
                                break;
                            default:
                                r[t[n]] = t[n + 1];
                        }
                    return r;
                }),
                (n.writeCandidate = function (e) {
                    var t = [];
                    t.push(e.foundation),
                        t.push(e.component),
                        t.push(e.protocol.toUpperCase()),
                        t.push(e.priority),
                        t.push(e.address || e.ip),
                        t.push(e.port);
                    var r = e.type;
                    return (
                        t.push("typ"),
                        t.push(r),
                        "host" !== r &&
                            e.relatedAddress &&
                            e.relatedPort &&
                            (t.push("raddr"),
                            t.push(e.relatedAddress),
                            t.push("rport"),
                            t.push(e.relatedPort)),
                        e.tcpType &&
                            "tcp" === e.protocol.toLowerCase() &&
                            (t.push("tcptype"), t.push(e.tcpType)),
                        (e.usernameFragment || e.ufrag) &&
                            (t.push("ufrag"),
                            t.push(e.usernameFragment || e.ufrag)),
                        "candidate:" + t.join(" ")
                    );
                }),
                (n.parseIceOptions = function (e) {
                    return e.substr(14).split(" ");
                }),
                (n.parseRtpMap = function (e) {
                    var t = e.substr(9).split(" "),
                        r = { payloadType: parseInt(t.shift(), 10) };
                    return (
                        (t = t[0].split("/")),
                        (r.name = t[0]),
                        (r.clockRate = parseInt(t[1], 10)),
                        (r.channels = 3 === t.length ? parseInt(t[2], 10) : 1),
                        (r.numChannels = r.channels),
                        r
                    );
                }),
                (n.writeRtpMap = function (e) {
                    var t = e.payloadType;
                    void 0 !== e.preferredPayloadType &&
                        (t = e.preferredPayloadType);
                    var r = e.channels || e.numChannels || 1;
                    return (
                        "a=rtpmap:" +
                        t +
                        " " +
                        e.name +
                        "/" +
                        e.clockRate +
                        (1 !== r ? "/" + r : "") +
                        "\r\n"
                    );
                }),
                (n.parseExtmap = function (e) {
                    var t = e.substr(9).split(" ");
                    return {
                        id: parseInt(t[0], 10),
                        direction:
                            t[0].indexOf("/") > 0
                                ? t[0].split("/")[1]
                                : "sendrecv",
                        uri: t[1],
                    };
                }),
                (n.writeExtmap = function (e) {
                    return (
                        "a=extmap:" +
                        (e.id || e.preferredId) +
                        (e.direction && "sendrecv" !== e.direction
                            ? "/" + e.direction
                            : "") +
                        " " +
                        e.uri +
                        "\r\n"
                    );
                }),
                (n.parseFmtp = function (e) {
                    for (
                        var t,
                            r = {},
                            n = e.substr(e.indexOf(" ") + 1).split(";"),
                            i = 0;
                        i < n.length;
                        i++
                    )
                        r[(t = n[i].trim().split("="))[0].trim()] = t[1];
                    return r;
                }),
                (n.writeFmtp = function (e) {
                    var t = "",
                        r = e.payloadType;
                    if (
                        (void 0 !== e.preferredPayloadType &&
                            (r = e.preferredPayloadType),
                        e.parameters && Object.keys(e.parameters).length)
                    ) {
                        var n = [];
                        Object.keys(e.parameters).forEach(function (t) {
                            e.parameters[t]
                                ? n.push(t + "=" + e.parameters[t])
                                : n.push(t);
                        }),
                            (t += "a=fmtp:" + r + " " + n.join(";") + "\r\n");
                    }
                    return t;
                }),
                (n.parseRtcpFb = function (e) {
                    var t = e.substr(e.indexOf(" ") + 1).split(" ");
                    return { type: t.shift(), parameter: t.join(" ") };
                }),
                (n.writeRtcpFb = function (e) {
                    var t = "",
                        r = e.payloadType;
                    return (
                        void 0 !== e.preferredPayloadType &&
                            (r = e.preferredPayloadType),
                        e.rtcpFeedback &&
                            e.rtcpFeedback.length &&
                            e.rtcpFeedback.forEach(function (e) {
                                t +=
                                    "a=rtcp-fb:" +
                                    r +
                                    " " +
                                    e.type +
                                    (e.parameter && e.parameter.length
                                        ? " " + e.parameter
                                        : "") +
                                    "\r\n";
                            }),
                        t
                    );
                }),
                (n.parseSsrcMedia = function (e) {
                    var t = e.indexOf(" "),
                        r = { ssrc: parseInt(e.substr(7, t - 7), 10) },
                        n = e.indexOf(":", t);
                    return (
                        n > -1
                            ? ((r.attribute = e.substr(t + 1, n - t - 1)),
                              (r.value = e.substr(n + 1)))
                            : (r.attribute = e.substr(t + 1)),
                        r
                    );
                }),
                (n.parseSsrcGroup = function (e) {
                    var t = e.substr(13).split(" ");
                    return {
                        semantics: t.shift(),
                        ssrcs: t.map(function (e) {
                            return parseInt(e, 10);
                        }),
                    };
                }),
                (n.getMid = function (e) {
                    var t = n.matchPrefix(e, "a=mid:")[0];
                    if (t) return t.substr(6);
                }),
                (n.parseFingerprint = function (e) {
                    var t = e.substr(14).split(" ");
                    return { algorithm: t[0].toLowerCase(), value: t[1] };
                }),
                (n.getDtlsParameters = function (e, t) {
                    return {
                        role: "auto",
                        fingerprints: n
                            .matchPrefix(e + t, "a=fingerprint:")
                            .map(n.parseFingerprint),
                    };
                }),
                (n.writeDtlsParameters = function (e, t) {
                    var r = "a=setup:" + t + "\r\n";
                    return (
                        e.fingerprints.forEach(function (e) {
                            r +=
                                "a=fingerprint:" +
                                e.algorithm +
                                " " +
                                e.value +
                                "\r\n";
                        }),
                        r
                    );
                }),
                (n.getIceParameters = function (e, t) {
                    var r = n.splitLines(e);
                    return {
                        usernameFragment: (r = r.concat(n.splitLines(t)))
                            .filter(function (e) {
                                return 0 === e.indexOf("a=ice-ufrag:");
                            })[0]
                            .substr(12),
                        password: r
                            .filter(function (e) {
                                return 0 === e.indexOf("a=ice-pwd:");
                            })[0]
                            .substr(10),
                    };
                }),
                (n.writeIceParameters = function (e) {
                    return (
                        "a=ice-ufrag:" +
                        e.usernameFragment +
                        "\r\na=ice-pwd:" +
                        e.password +
                        "\r\n"
                    );
                }),
                (n.parseRtpParameters = function (e) {
                    for (
                        var t = {
                                codecs: [],
                                headerExtensions: [],
                                fecMechanisms: [],
                                rtcp: [],
                            },
                            r = n.splitLines(e)[0].split(" "),
                            i = 3;
                        i < r.length;
                        i++
                    ) {
                        var a = r[i],
                            o = n.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
                        if (o) {
                            var s = n.parseRtpMap(o),
                                c = n.matchPrefix(e, "a=fmtp:" + a + " ");
                            switch (
                                ((s.parameters = c.length
                                    ? n.parseFmtp(c[0])
                                    : {}),
                                (s.rtcpFeedback = n
                                    .matchPrefix(e, "a=rtcp-fb:" + a + " ")
                                    .map(n.parseRtcpFb)),
                                t.codecs.push(s),
                                s.name.toUpperCase())
                            ) {
                                case "RED":
                                case "ULPFEC":
                                    t.fecMechanisms.push(s.name.toUpperCase());
                            }
                        }
                    }
                    return (
                        n.matchPrefix(e, "a=extmap:").forEach(function (e) {
                            t.headerExtensions.push(n.parseExtmap(e));
                        }),
                        t
                    );
                }),
                (n.writeRtpDescription = function (e, t) {
                    var r = "";
                    (r += "m=" + e + " "),
                        (r += t.codecs.length > 0 ? "9" : "0"),
                        (r += " UDP/TLS/RTP/SAVPF "),
                        (r +=
                            t.codecs
                                .map(function (e) {
                                    return void 0 !== e.preferredPayloadType
                                        ? e.preferredPayloadType
                                        : e.payloadType;
                                })
                                .join(" ") + "\r\n"),
                        (r += "c=IN IP4 0.0.0.0\r\n"),
                        (r += "a=rtcp:9 IN IP4 0.0.0.0\r\n"),
                        t.codecs.forEach(function (e) {
                            (r += n.writeRtpMap(e)),
                                (r += n.writeFmtp(e)),
                                (r += n.writeRtcpFb(e));
                        });
                    var i = 0;
                    return (
                        t.codecs.forEach(function (e) {
                            e.maxptime > i && (i = e.maxptime);
                        }),
                        i > 0 && (r += "a=maxptime:" + i + "\r\n"),
                        (r += "a=rtcp-mux\r\n"),
                        t.headerExtensions &&
                            t.headerExtensions.forEach(function (e) {
                                r += n.writeExtmap(e);
                            }),
                        r
                    );
                }),
                (n.parseRtpEncodingParameters = function (e) {
                    var t,
                        r = [],
                        i = n.parseRtpParameters(e),
                        a = -1 !== i.fecMechanisms.indexOf("RED"),
                        o = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
                        s = n
                            .matchPrefix(e, "a=ssrc:")
                            .map(function (e) {
                                return n.parseSsrcMedia(e);
                            })
                            .filter(function (e) {
                                return "cname" === e.attribute;
                            }),
                        c = s.length > 0 && s[0].ssrc,
                        d = n
                            .matchPrefix(e, "a=ssrc-group:FID")
                            .map(function (e) {
                                return e
                                    .substr(17)
                                    .split(" ")
                                    .map(function (e) {
                                        return parseInt(e, 10);
                                    });
                            });
                    d.length > 0 &&
                        d[0].length > 1 &&
                        d[0][0] === c &&
                        (t = d[0][1]),
                        i.codecs.forEach(function (e) {
                            if (
                                "RTX" === e.name.toUpperCase() &&
                                e.parameters.apt
                            ) {
                                var n = {
                                    ssrc: c,
                                    codecPayloadType: parseInt(
                                        e.parameters.apt,
                                        10
                                    ),
                                };
                                c && t && (n.rtx = { ssrc: t }),
                                    r.push(n),
                                    a &&
                                        (((n = JSON.parse(
                                            JSON.stringify(n)
                                        )).fec = {
                                            ssrc: c,
                                            mechanism: o ? "red+ulpfec" : "red",
                                        }),
                                        r.push(n));
                            }
                        }),
                        0 === r.length && c && r.push({ ssrc: c });
                    var u = n.matchPrefix(e, "b=");
                    return (
                        u.length &&
                            ((u =
                                0 === u[0].indexOf("b=TIAS:")
                                    ? parseInt(u[0].substr(7), 10)
                                    : 0 === u[0].indexOf("b=AS:")
                                    ? 1e3 *
                                          parseInt(u[0].substr(5), 10) *
                                          0.95 -
                                      16e3
                                    : void 0),
                            r.forEach(function (e) {
                                e.maxBitrate = u;
                            })),
                        r
                    );
                }),
                (n.parseRtcpParameters = function (e) {
                    var t = {},
                        r = n
                            .matchPrefix(e, "a=ssrc:")
                            .map(function (e) {
                                return n.parseSsrcMedia(e);
                            })
                            .filter(function (e) {
                                return "cname" === e.attribute;
                            })[0];
                    r && ((t.cname = r.value), (t.ssrc = r.ssrc));
                    var i = n.matchPrefix(e, "a=rtcp-rsize");
                    (t.reducedSize = i.length > 0),
                        (t.compound = 0 === i.length);
                    var a = n.matchPrefix(e, "a=rtcp-mux");
                    return (t.mux = a.length > 0), t;
                }),
                (n.parseMsid = function (e) {
                    var t,
                        r = n.matchPrefix(e, "a=msid:");
                    if (1 === r.length)
                        return {
                            stream: (t = r[0].substr(7).split(" "))[0],
                            track: t[1],
                        };
                    var i = n
                        .matchPrefix(e, "a=ssrc:")
                        .map(function (e) {
                            return n.parseSsrcMedia(e);
                        })
                        .filter(function (e) {
                            return "msid" === e.attribute;
                        });
                    return i.length > 0
                        ? {
                              stream: (t = i[0].value.split(" "))[0],
                              track: t[1],
                          }
                        : void 0;
                }),
                (n.generateSessionId = function () {
                    return Math.random().toString().substr(2, 21);
                }),
                (n.writeSessionBoilerplate = function (e, t, r) {
                    var i = void 0 !== t ? t : 2;
                    return (
                        "v=0\r\no=" +
                        (r || "thisisadapterortc") +
                        " " +
                        (e || n.generateSessionId()) +
                        " " +
                        i +
                        " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
                    );
                }),
                (n.writeMediaSection = function (e, t, r, i) {
                    var a = n.writeRtpDescription(e.kind, t);
                    if (
                        ((a += n.writeIceParameters(
                            e.iceGatherer.getLocalParameters()
                        )),
                        (a += n.writeDtlsParameters(
                            e.dtlsTransport.getLocalParameters(),
                            "offer" === r ? "actpass" : "active"
                        )),
                        (a += "a=mid:" + e.mid + "\r\n"),
                        e.direction
                            ? (a += "a=" + e.direction + "\r\n")
                            : e.rtpSender && e.rtpReceiver
                            ? (a += "a=sendrecv\r\n")
                            : e.rtpSender
                            ? (a += "a=sendonly\r\n")
                            : e.rtpReceiver
                            ? (a += "a=recvonly\r\n")
                            : (a += "a=inactive\r\n"),
                        e.rtpSender)
                    ) {
                        var o =
                            "msid:" +
                            i.id +
                            " " +
                            e.rtpSender.track.id +
                            "\r\n";
                        (a += "a=" + o),
                            (a +=
                                "a=ssrc:" +
                                e.sendEncodingParameters[0].ssrc +
                                " " +
                                o),
                            e.sendEncodingParameters[0].rtx &&
                                ((a +=
                                    "a=ssrc:" +
                                    e.sendEncodingParameters[0].rtx.ssrc +
                                    " " +
                                    o),
                                (a +=
                                    "a=ssrc-group:FID " +
                                    e.sendEncodingParameters[0].ssrc +
                                    " " +
                                    e.sendEncodingParameters[0].rtx.ssrc +
                                    "\r\n"));
                    }
                    return (
                        (a +=
                            "a=ssrc:" +
                            e.sendEncodingParameters[0].ssrc +
                            " cname:" +
                            n.localCName +
                            "\r\n"),
                        e.rtpSender &&
                            e.sendEncodingParameters[0].rtx &&
                            (a +=
                                "a=ssrc:" +
                                e.sendEncodingParameters[0].rtx.ssrc +
                                " cname:" +
                                n.localCName +
                                "\r\n"),
                        a
                    );
                }),
                (n.getDirection = function (e, t) {
                    for (var r = n.splitLines(e), i = 0; i < r.length; i++)
                        switch (r[i]) {
                            case "a=sendrecv":
                            case "a=sendonly":
                            case "a=recvonly":
                            case "a=inactive":
                                return r[i].substr(2);
                        }
                    return t ? n.getDirection(t) : "sendrecv";
                }),
                (n.getKind = function (e) {
                    return n.splitLines(e)[0].split(" ")[0].substr(2);
                }),
                (n.isRejected = function (e) {
                    return "0" === e.split(" ", 2)[1];
                }),
                (n.parseMLine = function (e) {
                    var t = n.splitLines(e)[0].substr(2).split(" ");
                    return {
                        kind: t[0],
                        port: parseInt(t[1], 10),
                        protocol: t[2],
                        fmt: t.slice(3).join(" "),
                    };
                }),
                (n.parseOLine = function (e) {
                    var t = n.matchPrefix(e, "o=")[0].substr(2).split(" ");
                    return {
                        username: t[0],
                        sessionId: t[1],
                        sessionVersion: parseInt(t[2], 10),
                        netType: t[3],
                        addressType: t[4],
                        address: t[5],
                    };
                }),
                (n.isValidSDP = function (e) {
                    if ("string" != typeof e || 0 === e.length) return !1;
                    for (var t = n.splitLines(e), r = 0; r < t.length; r++)
                        if (t[r].length < 2 || "=" !== t[r].charAt(1))
                            return !1;
                    return !0;
                }),
                (e.exports = n);
        },
        function (e, t, r) {
            r(4), (e.exports = r(17));
        },
        function (e, t, r) {
            var n = (function (e) {
                "use strict";
                var t = Object.prototype,
                    r = t.hasOwnProperty,
                    n = "function" == typeof Symbol ? Symbol : {},
                    i = n.iterator || "@@iterator",
                    a = n.asyncIterator || "@@asyncIterator",
                    o = n.toStringTag || "@@toStringTag";
                function s(e, t, r, n) {
                    var i = t && t.prototype instanceof u ? t : u,
                        a = Object.create(i.prototype),
                        o = new b(n || []);
                    return (
                        (a._invoke = (function (e, t, r) {
                            var n = "suspendedStart";
                            return function (i, a) {
                                if ("executing" === n)
                                    throw new Error(
                                        "Generator is already running"
                                    );
                                if ("completed" === n) {
                                    if ("throw" === i) throw a;
                                    return w();
                                }
                                for (r.method = i, r.arg = a; ; ) {
                                    var o = r.delegate;
                                    if (o) {
                                        var s = S(o, r);
                                        if (s) {
                                            if (s === d) continue;
                                            return s;
                                        }
                                    }
                                    if ("next" === r.method)
                                        r.sent = r._sent = r.arg;
                                    else if ("throw" === r.method) {
                                        if ("suspendedStart" === n)
                                            throw ((n = "completed"), r.arg);
                                        r.dispatchException(r.arg);
                                    } else
                                        "return" === r.method &&
                                            r.abrupt("return", r.arg);
                                    n = "executing";
                                    var u = c(e, t, r);
                                    if ("normal" === u.type) {
                                        if (
                                            ((n = r.done
                                                ? "completed"
                                                : "suspendedYield"),
                                            u.arg === d)
                                        )
                                            continue;
                                        return { value: u.arg, done: r.done };
                                    }
                                    "throw" === u.type &&
                                        ((n = "completed"),
                                        (r.method = "throw"),
                                        (r.arg = u.arg));
                                }
                            };
                        })(e, r, o)),
                        a
                    );
                }
                function c(e, t, r) {
                    try {
                        return { type: "normal", arg: e.call(t, r) };
                    } catch (e) {
                        return { type: "throw", arg: e };
                    }
                }
                e.wrap = s;
                var d = {};
                function u() {}
                function l() {}
                function p() {}
                var f = {};
                f[i] = function () {
                    return this;
                };
                var m = Object.getPrototypeOf,
                    v = m && m(m(k([])));
                v && v !== t && r.call(v, i) && (f = v);
                var h = (p.prototype = u.prototype = Object.create(f));
                function g(e) {
                    ["next", "throw", "return"].forEach(function (t) {
                        e[t] = function (e) {
                            return this._invoke(t, e);
                        };
                    });
                }
                function y(e, t) {
                    var n;
                    this._invoke = function (i, a) {
                        function o() {
                            return new t(function (n, o) {
                                !(function n(i, a, o, s) {
                                    var d = c(e[i], e, a);
                                    if ("throw" !== d.type) {
                                        var u = d.arg,
                                            l = u.value;
                                        return l &&
                                            "object" == typeof l &&
                                            r.call(l, "__await")
                                            ? t.resolve(l.__await).then(
                                                  function (e) {
                                                      n("next", e, o, s);
                                                  },
                                                  function (e) {
                                                      n("throw", e, o, s);
                                                  }
                                              )
                                            : t.resolve(l).then(
                                                  function (e) {
                                                      (u.value = e), o(u);
                                                  },
                                                  function (e) {
                                                      return n(
                                                          "throw",
                                                          e,
                                                          o,
                                                          s
                                                      );
                                                  }
                                              );
                                    }
                                    s(d.arg);
                                })(i, a, n, o);
                            });
                        }
                        return (n = n ? n.then(o, o) : o());
                    };
                }
                function S(e, t) {
                    var r = e.iterator[t.method];
                    if (void 0 === r) {
                        if (((t.delegate = null), "throw" === t.method)) {
                            if (
                                e.iterator.return &&
                                ((t.method = "return"),
                                (t.arg = void 0),
                                S(e, t),
                                "throw" === t.method)
                            )
                                return d;
                            (t.method = "throw"),
                                (t.arg = new TypeError(
                                    "The iterator does not provide a 'throw' method"
                                ));
                        }
                        return d;
                    }
                    var n = c(r, e.iterator, t.arg);
                    if ("throw" === n.type)
                        return (
                            (t.method = "throw"),
                            (t.arg = n.arg),
                            (t.delegate = null),
                            d
                        );
                    var i = n.arg;
                    return i
                        ? i.done
                            ? ((t[e.resultName] = i.value),
                              (t.next = e.nextLoc),
                              "return" !== t.method &&
                                  ((t.method = "next"), (t.arg = void 0)),
                              (t.delegate = null),
                              d)
                            : i
                        : ((t.method = "throw"),
                          (t.arg = new TypeError(
                              "iterator result is not an object"
                          )),
                          (t.delegate = null),
                          d);
                }
                function C(e) {
                    var t = { tryLoc: e[0] };
                    1 in e && (t.catchLoc = e[1]),
                        2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                        this.tryEntries.push(t);
                }
                function T(e) {
                    var t = e.completion || {};
                    (t.type = "normal"), delete t.arg, (e.completion = t);
                }
                function b(e) {
                    (this.tryEntries = [{ tryLoc: "root" }]),
                        e.forEach(C, this),
                        this.reset(!0);
                }
                function k(e) {
                    if (e) {
                        var t = e[i];
                        if (t) return t.call(e);
                        if ("function" == typeof e.next) return e;
                        if (!isNaN(e.length)) {
                            var n = -1,
                                a = function t() {
                                    for (; ++n < e.length; )
                                        if (r.call(e, n))
                                            return (
                                                (t.value = e[n]),
                                                (t.done = !1),
                                                t
                                            );
                                    return (t.value = void 0), (t.done = !0), t;
                                };
                            return (a.next = a);
                        }
                    }
                    return { next: w };
                }
                function w() {
                    return { value: void 0, done: !0 };
                }
                return (
                    (l.prototype = h.constructor = p),
                    (p.constructor = l),
                    (p[o] = l.displayName = "GeneratorFunction"),
                    (e.isGeneratorFunction = function (e) {
                        var t = "function" == typeof e && e.constructor;
                        return (
                            !!t &&
                            (t === l ||
                                "GeneratorFunction" ===
                                    (t.displayName || t.name))
                        );
                    }),
                    (e.mark = function (e) {
                        return (
                            Object.setPrototypeOf
                                ? Object.setPrototypeOf(e, p)
                                : ((e.__proto__ = p),
                                  o in e || (e[o] = "GeneratorFunction")),
                            (e.prototype = Object.create(h)),
                            e
                        );
                    }),
                    (e.awrap = function (e) {
                        return { __await: e };
                    }),
                    g(y.prototype),
                    (y.prototype[a] = function () {
                        return this;
                    }),
                    (e.AsyncIterator = y),
                    (e.async = function (t, r, n, i, a) {
                        void 0 === a && (a = Promise);
                        var o = new y(s(t, r, n, i), a);
                        return e.isGeneratorFunction(r)
                            ? o
                            : o.next().then(function (e) {
                                  return e.done ? e.value : o.next();
                              });
                    }),
                    g(h),
                    (h[o] = "Generator"),
                    (h[i] = function () {
                        return this;
                    }),
                    (h.toString = function () {
                        return "[object Generator]";
                    }),
                    (e.keys = function (e) {
                        var t = [];
                        for (var r in e) t.push(r);
                        return (
                            t.reverse(),
                            function r() {
                                for (; t.length; ) {
                                    var n = t.pop();
                                    if (n in e)
                                        return (r.value = n), (r.done = !1), r;
                                }
                                return (r.done = !0), r;
                            }
                        );
                    }),
                    (e.values = k),
                    (b.prototype = {
                        constructor: b,
                        reset: function (e) {
                            if (
                                ((this.prev = 0),
                                (this.next = 0),
                                (this.sent = this._sent = void 0),
                                (this.done = !1),
                                (this.delegate = null),
                                (this.method = "next"),
                                (this.arg = void 0),
                                this.tryEntries.forEach(T),
                                !e)
                            )
                                for (var t in this)
                                    "t" === t.charAt(0) &&
                                        r.call(this, t) &&
                                        !isNaN(+t.slice(1)) &&
                                        (this[t] = void 0);
                        },
                        stop: function () {
                            this.done = !0;
                            var e = this.tryEntries[0].completion;
                            if ("throw" === e.type) throw e.arg;
                            return this.rval;
                        },
                        dispatchException: function (e) {
                            if (this.done) throw e;
                            var t = this;
                            function n(r, n) {
                                return (
                                    (o.type = "throw"),
                                    (o.arg = e),
                                    (t.next = r),
                                    n &&
                                        ((t.method = "next"), (t.arg = void 0)),
                                    !!n
                                );
                            }
                            for (
                                var i = this.tryEntries.length - 1;
                                i >= 0;
                                --i
                            ) {
                                var a = this.tryEntries[i],
                                    o = a.completion;
                                if ("root" === a.tryLoc) return n("end");
                                if (a.tryLoc <= this.prev) {
                                    var s = r.call(a, "catchLoc"),
                                        c = r.call(a, "finallyLoc");
                                    if (s && c) {
                                        if (this.prev < a.catchLoc)
                                            return n(a.catchLoc, !0);
                                        if (this.prev < a.finallyLoc)
                                            return n(a.finallyLoc);
                                    } else if (s) {
                                        if (this.prev < a.catchLoc)
                                            return n(a.catchLoc, !0);
                                    } else {
                                        if (!c)
                                            throw new Error(
                                                "try statement without catch or finally"
                                            );
                                        if (this.prev < a.finallyLoc)
                                            return n(a.finallyLoc);
                                    }
                                }
                            }
                        },
                        abrupt: function (e, t) {
                            for (
                                var n = this.tryEntries.length - 1;
                                n >= 0;
                                --n
                            ) {
                                var i = this.tryEntries[n];
                                if (
                                    i.tryLoc <= this.prev &&
                                    r.call(i, "finallyLoc") &&
                                    this.prev < i.finallyLoc
                                ) {
                                    var a = i;
                                    break;
                                }
                            }
                            a &&
                                ("break" === e || "continue" === e) &&
                                a.tryLoc <= t &&
                                t <= a.finallyLoc &&
                                (a = null);
                            var o = a ? a.completion : {};
                            return (
                                (o.type = e),
                                (o.arg = t),
                                a
                                    ? ((this.method = "next"),
                                      (this.next = a.finallyLoc),
                                      d)
                                    : this.complete(o)
                            );
                        },
                        complete: function (e, t) {
                            if ("throw" === e.type) throw e.arg;
                            return (
                                "break" === e.type || "continue" === e.type
                                    ? (this.next = e.arg)
                                    : "return" === e.type
                                    ? ((this.rval = this.arg = e.arg),
                                      (this.method = "return"),
                                      (this.next = "end"))
                                    : "normal" === e.type &&
                                      t &&
                                      (this.next = t),
                                d
                            );
                        },
                        finish: function (e) {
                            for (
                                var t = this.tryEntries.length - 1;
                                t >= 0;
                                --t
                            ) {
                                var r = this.tryEntries[t];
                                if (r.finallyLoc === e)
                                    return (
                                        this.complete(r.completion, r.afterLoc),
                                        T(r),
                                        d
                                    );
                            }
                        },
                        catch: function (e) {
                            for (
                                var t = this.tryEntries.length - 1;
                                t >= 0;
                                --t
                            ) {
                                var r = this.tryEntries[t];
                                if (r.tryLoc === e) {
                                    var n = r.completion;
                                    if ("throw" === n.type) {
                                        var i = n.arg;
                                        T(r);
                                    }
                                    return i;
                                }
                            }
                            throw new Error("illegal catch attempt");
                        },
                        delegateYield: function (e, t, r) {
                            return (
                                (this.delegate = {
                                    iterator: k(e),
                                    resultName: t,
                                    nextLoc: r,
                                }),
                                "next" === this.method && (this.arg = void 0),
                                d
                            );
                        },
                    }),
                    e
                );
            })(e.exports);
            try {
                regeneratorRuntime = n;
            } catch (e) {
                Function("r", "regeneratorRuntime = r")(n);
            }
        },
        function (e, t) {
            var r;
            r = (function () {
                return this;
            })();
            try {
                r = r || new Function("return this")();
            } catch (e) {
                "object" == typeof window && (r = window);
            }
            e.exports = r;
        },
        function (e, t, r) {
            "use strict";
            var n = r(1);
            e.exports = function (e, t) {
                var i = e && e.window,
                    a = {
                        shimChrome: !0,
                        shimFirefox: !0,
                        shimEdge: !0,
                        shimSafari: !0,
                    };
                for (var o in t) hasOwnProperty.call(t, o) && (a[o] = t[o]);
                var s = n.log,
                    c = n.detectBrowser(i),
                    d = r(7) || null,
                    u = r(9) || null,
                    l = r(13) || null,
                    p = r(15) || null,
                    f = r(16) || null,
                    m = {
                        browserDetails: c,
                        commonShim: f,
                        extractVersion: n.extractVersion,
                        disableLog: n.disableLog,
                        disableWarnings: n.disableWarnings,
                    };
                switch (c.browser) {
                    case "chrome":
                        if (!d || !d.shimPeerConnection || !a.shimChrome)
                            return (
                                s(
                                    "Chrome shim is not included in this adapter release."
                                ),
                                m
                            );
                        s("adapter.js shimming chrome."),
                            (m.browserShim = d),
                            f.shimCreateObjectURL(i),
                            d.shimGetUserMedia(i),
                            d.shimMediaStream(i),
                            d.shimSourceObject(i),
                            d.shimPeerConnection(i),
                            d.shimOnTrack(i),
                            d.shimAddTrackRemoveTrack(i),
                            d.shimGetSendersWithDtmf(i),
                            d.shimSenderReceiverGetStats(i),
                            d.fixNegotiationNeeded(i),
                            f.shimRTCIceCandidate(i),
                            f.shimMaxMessageSize(i),
                            f.shimSendThrowTypeError(i);
                        break;
                    case "firefox":
                        if (!l || !l.shimPeerConnection || !a.shimFirefox)
                            return (
                                s(
                                    "Firefox shim is not included in this adapter release."
                                ),
                                m
                            );
                        s("adapter.js shimming firefox."),
                            (m.browserShim = l),
                            f.shimCreateObjectURL(i),
                            l.shimGetUserMedia(i),
                            l.shimSourceObject(i),
                            l.shimPeerConnection(i),
                            l.shimOnTrack(i),
                            l.shimRemoveStream(i),
                            l.shimSenderGetStats(i),
                            l.shimReceiverGetStats(i),
                            l.shimRTCDataChannel(i),
                            f.shimRTCIceCandidate(i),
                            f.shimMaxMessageSize(i),
                            f.shimSendThrowTypeError(i);
                        break;
                    case "edge":
                        if (!u || !u.shimPeerConnection || !a.shimEdge)
                            return (
                                s(
                                    "MS edge shim is not included in this adapter release."
                                ),
                                m
                            );
                        s("adapter.js shimming edge."),
                            (m.browserShim = u),
                            f.shimCreateObjectURL(i),
                            u.shimGetUserMedia(i),
                            u.shimPeerConnection(i),
                            u.shimReplaceTrack(i),
                            u.shimGetDisplayMedia(i),
                            f.shimMaxMessageSize(i),
                            f.shimSendThrowTypeError(i);
                        break;
                    case "safari":
                        if (!p || !a.shimSafari)
                            return (
                                s(
                                    "Safari shim is not included in this adapter release."
                                ),
                                m
                            );
                        s("adapter.js shimming safari."),
                            (m.browserShim = p),
                            f.shimCreateObjectURL(i),
                            p.shimRTCIceServerUrls(i),
                            p.shimCreateOfferLegacy(i),
                            p.shimCallbacksAPI(i),
                            p.shimLocalStreamsAPI(i),
                            p.shimRemoteStreamsAPI(i),
                            p.shimTrackEventTransceiver(i),
                            p.shimGetUserMedia(i),
                            f.shimRTCIceCandidate(i),
                            f.shimMaxMessageSize(i),
                            f.shimSendThrowTypeError(i);
                        break;
                    default:
                        s("Unsupported browser!");
                }
                return m;
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(1),
                i = n.log;
            function a(e, t, r) {
                var n = r ? "outbound-rtp" : "inbound-rtp",
                    i = new Map();
                if (null === t) return i;
                var a = [];
                return (
                    e.forEach(function (e) {
                        "track" === e.type &&
                            e.trackIdentifier === t.id &&
                            a.push(e);
                    }),
                    a.forEach(function (t) {
                        e.forEach(function (r) {
                            r.type === n &&
                                r.trackId === t.id &&
                                (function e(t, r, n) {
                                    r &&
                                        !n.has(r.id) &&
                                        (n.set(r.id, r),
                                        Object.keys(r).forEach(function (i) {
                                            i.endsWith("Id")
                                                ? e(t, t.get(r[i]), n)
                                                : i.endsWith("Ids") &&
                                                  r[i].forEach(function (r) {
                                                      e(t, t.get(r), n);
                                                  });
                                        }));
                                })(e, r, i);
                        });
                    }),
                    i
                );
            }
            e.exports = {
                shimGetUserMedia: r(8),
                shimMediaStream: function (e) {
                    e.MediaStream = e.MediaStream || e.webkitMediaStream;
                },
                shimOnTrack: function (e) {
                    if (
                        "object" == typeof e &&
                        e.RTCPeerConnection &&
                        !("ontrack" in e.RTCPeerConnection.prototype)
                    ) {
                        Object.defineProperty(
                            e.RTCPeerConnection.prototype,
                            "ontrack",
                            {
                                get: function () {
                                    return this._ontrack;
                                },
                                set: function (e) {
                                    this._ontrack &&
                                        this.removeEventListener(
                                            "track",
                                            this._ontrack
                                        ),
                                        this.addEventListener(
                                            "track",
                                            (this._ontrack = e)
                                        );
                                },
                                enumerable: !0,
                                configurable: !0,
                            }
                        );
                        var t =
                            e.RTCPeerConnection.prototype.setRemoteDescription;
                        e.RTCPeerConnection.prototype.setRemoteDescription =
                            function () {
                                var r = this;
                                return (
                                    r._ontrackpoly ||
                                        ((r._ontrackpoly = function (t) {
                                            t.stream.addEventListener(
                                                "addtrack",
                                                function (n) {
                                                    var i;
                                                    i = e.RTCPeerConnection
                                                        .prototype.getReceivers
                                                        ? r
                                                              .getReceivers()
                                                              .find(function (
                                                                  e
                                                              ) {
                                                                  return (
                                                                      e.track &&
                                                                      e.track
                                                                          .id ===
                                                                          n
                                                                              .track
                                                                              .id
                                                                  );
                                                              })
                                                        : { track: n.track };
                                                    var a = new Event("track");
                                                    (a.track = n.track),
                                                        (a.receiver = i),
                                                        (a.transceiver = {
                                                            receiver: i,
                                                        }),
                                                        (a.streams = [
                                                            t.stream,
                                                        ]),
                                                        r.dispatchEvent(a);
                                                }
                                            ),
                                                t.stream
                                                    .getTracks()
                                                    .forEach(function (n) {
                                                        var i;
                                                        i = e.RTCPeerConnection
                                                            .prototype
                                                            .getReceivers
                                                            ? r
                                                                  .getReceivers()
                                                                  .find(
                                                                      function (
                                                                          e
                                                                      ) {
                                                                          return (
                                                                              e.track &&
                                                                              e
                                                                                  .track
                                                                                  .id ===
                                                                                  n.id
                                                                          );
                                                                      }
                                                                  )
                                                            : { track: n };
                                                        var a = new Event(
                                                            "track"
                                                        );
                                                        (a.track = n),
                                                            (a.receiver = i),
                                                            (a.transceiver = {
                                                                receiver: i,
                                                            }),
                                                            (a.streams = [
                                                                t.stream,
                                                            ]),
                                                            r.dispatchEvent(a);
                                                    });
                                        }),
                                        r.addEventListener(
                                            "addstream",
                                            r._ontrackpoly
                                        )),
                                    t.apply(r, arguments)
                                );
                            };
                    } else
                        n.wrapPeerConnectionEvent(e, "track", function (e) {
                            return (
                                e.transceiver ||
                                    Object.defineProperty(e, "transceiver", {
                                        value: { receiver: e.receiver },
                                    }),
                                e
                            );
                        });
                },
                shimGetSendersWithDtmf: function (e) {
                    if (
                        "object" == typeof e &&
                        e.RTCPeerConnection &&
                        !("getSenders" in e.RTCPeerConnection.prototype) &&
                        "createDTMFSender" in e.RTCPeerConnection.prototype
                    ) {
                        var t = function (e, t) {
                            return {
                                track: t,
                                get dtmf() {
                                    return (
                                        void 0 === this._dtmf &&
                                            ("audio" === t.kind
                                                ? (this._dtmf =
                                                      e.createDTMFSender(t))
                                                : (this._dtmf = null)),
                                        this._dtmf
                                    );
                                },
                                _pc: e,
                            };
                        };
                        if (!e.RTCPeerConnection.prototype.getSenders) {
                            e.RTCPeerConnection.prototype.getSenders =
                                function () {
                                    return (
                                        (this._senders = this._senders || []),
                                        this._senders.slice()
                                    );
                                };
                            var r = e.RTCPeerConnection.prototype.addTrack;
                            e.RTCPeerConnection.prototype.addTrack = function (
                                e,
                                n
                            ) {
                                var i = this,
                                    a = r.apply(i, arguments);
                                return (
                                    a || ((a = t(i, e)), i._senders.push(a)), a
                                );
                            };
                            var n = e.RTCPeerConnection.prototype.removeTrack;
                            e.RTCPeerConnection.prototype.removeTrack =
                                function (e) {
                                    var t = this;
                                    n.apply(t, arguments);
                                    var r = t._senders.indexOf(e);
                                    -1 !== r && t._senders.splice(r, 1);
                                };
                        }
                        var i = e.RTCPeerConnection.prototype.addStream;
                        e.RTCPeerConnection.prototype.addStream = function (e) {
                            var r = this;
                            (r._senders = r._senders || []),
                                i.apply(r, [e]),
                                e.getTracks().forEach(function (e) {
                                    r._senders.push(t(r, e));
                                });
                        };
                        var a = e.RTCPeerConnection.prototype.removeStream;
                        e.RTCPeerConnection.prototype.removeStream = function (
                            e
                        ) {
                            var t = this;
                            (t._senders = t._senders || []),
                                a.apply(t, [e]),
                                e.getTracks().forEach(function (e) {
                                    var r = t._senders.find(function (t) {
                                        return t.track === e;
                                    });
                                    r &&
                                        t._senders.splice(
                                            t._senders.indexOf(r),
                                            1
                                        );
                                });
                        };
                    } else if (
                        "object" == typeof e &&
                        e.RTCPeerConnection &&
                        "getSenders" in e.RTCPeerConnection.prototype &&
                        "createDTMFSender" in e.RTCPeerConnection.prototype &&
                        e.RTCRtpSender &&
                        !("dtmf" in e.RTCRtpSender.prototype)
                    ) {
                        var o = e.RTCPeerConnection.prototype.getSenders;
                        (e.RTCPeerConnection.prototype.getSenders =
                            function () {
                                var e = this,
                                    t = o.apply(e, []);
                                return (
                                    t.forEach(function (t) {
                                        t._pc = e;
                                    }),
                                    t
                                );
                            }),
                            Object.defineProperty(
                                e.RTCRtpSender.prototype,
                                "dtmf",
                                {
                                    get: function () {
                                        return (
                                            void 0 === this._dtmf &&
                                                ("audio" === this.track.kind
                                                    ? (this._dtmf =
                                                          this._pc.createDTMFSender(
                                                              this.track
                                                          ))
                                                    : (this._dtmf = null)),
                                            this._dtmf
                                        );
                                    },
                                }
                            );
                    }
                },
                shimSenderReceiverGetStats: function (e) {
                    if (
                        "object" == typeof e &&
                        e.RTCPeerConnection &&
                        e.RTCRtpSender &&
                        e.RTCRtpReceiver
                    ) {
                        if (!("getStats" in e.RTCRtpSender.prototype)) {
                            var t = e.RTCPeerConnection.prototype.getSenders;
                            t &&
                                (e.RTCPeerConnection.prototype.getSenders =
                                    function () {
                                        var e = this,
                                            r = t.apply(e, []);
                                        return (
                                            r.forEach(function (t) {
                                                t._pc = e;
                                            }),
                                            r
                                        );
                                    });
                            var r = e.RTCPeerConnection.prototype.addTrack;
                            r &&
                                (e.RTCPeerConnection.prototype.addTrack =
                                    function () {
                                        var e = r.apply(this, arguments);
                                        return (e._pc = this), e;
                                    }),
                                (e.RTCRtpSender.prototype.getStats =
                                    function () {
                                        var e = this;
                                        return this._pc
                                            .getStats()
                                            .then(function (t) {
                                                return a(t, e.track, !0);
                                            });
                                    });
                        }
                        if (!("getStats" in e.RTCRtpReceiver.prototype)) {
                            var i = e.RTCPeerConnection.prototype.getReceivers;
                            i &&
                                (e.RTCPeerConnection.prototype.getReceivers =
                                    function () {
                                        var e = this,
                                            t = i.apply(e, []);
                                        return (
                                            t.forEach(function (t) {
                                                t._pc = e;
                                            }),
                                            t
                                        );
                                    }),
                                n.wrapPeerConnectionEvent(
                                    e,
                                    "track",
                                    function (e) {
                                        return (
                                            (e.receiver._pc = e.srcElement), e
                                        );
                                    }
                                ),
                                (e.RTCRtpReceiver.prototype.getStats =
                                    function () {
                                        var e = this;
                                        return this._pc
                                            .getStats()
                                            .then(function (t) {
                                                return a(t, e.track, !1);
                                            });
                                    });
                        }
                        if (
                            "getStats" in e.RTCRtpSender.prototype &&
                            "getStats" in e.RTCRtpReceiver.prototype
                        ) {
                            var o = e.RTCPeerConnection.prototype.getStats;
                            e.RTCPeerConnection.prototype.getStats =
                                function () {
                                    var t = this;
                                    if (
                                        arguments.length > 0 &&
                                        arguments[0] instanceof
                                            e.MediaStreamTrack
                                    ) {
                                        var r,
                                            n,
                                            i,
                                            a = arguments[0];
                                        return (
                                            t
                                                .getSenders()
                                                .forEach(function (e) {
                                                    e.track === a &&
                                                        (r
                                                            ? (i = !0)
                                                            : (r = e));
                                                }),
                                            t
                                                .getReceivers()
                                                .forEach(function (e) {
                                                    return (
                                                        e.track === a &&
                                                            (n
                                                                ? (i = !0)
                                                                : (n = e)),
                                                        e.track === a
                                                    );
                                                }),
                                            i || (r && n)
                                                ? Promise.reject(
                                                      new DOMException(
                                                          "There are more than one sender or receiver for the track.",
                                                          "InvalidAccessError"
                                                      )
                                                  )
                                                : r
                                                ? r.getStats()
                                                : n
                                                ? n.getStats()
                                                : Promise.reject(
                                                      new DOMException(
                                                          "There is no sender or receiver for the track.",
                                                          "InvalidAccessError"
                                                      )
                                                  )
                                        );
                                    }
                                    return o.apply(t, arguments);
                                };
                        }
                    }
                },
                shimSourceObject: function (e) {
                    var t = e && e.URL;
                    "object" == typeof e &&
                        e.HTMLMediaElement &&
                        !("srcObject" in e.HTMLMediaElement.prototype) &&
                        Object.defineProperty(
                            e.HTMLMediaElement.prototype,
                            "srcObject",
                            {
                                get: function () {
                                    return this._srcObject;
                                },
                                set: function (e) {
                                    var r = this;
                                    (this._srcObject = e),
                                        this.src && t.revokeObjectURL(this.src),
                                        e
                                            ? ((this.src =
                                                  t.createObjectURL(e)),
                                              e.addEventListener(
                                                  "addtrack",
                                                  function () {
                                                      r.src &&
                                                          t.revokeObjectURL(
                                                              r.src
                                                          ),
                                                          (r.src =
                                                              t.createObjectURL(
                                                                  e
                                                              ));
                                                  }
                                              ),
                                              e.addEventListener(
                                                  "removetrack",
                                                  function () {
                                                      r.src &&
                                                          t.revokeObjectURL(
                                                              r.src
                                                          ),
                                                          (r.src =
                                                              t.createObjectURL(
                                                                  e
                                                              ));
                                                  }
                                              ))
                                            : (this.src = "");
                                },
                            }
                        );
                },
                shimAddTrackRemoveTrackWithNative: function (e) {
                    e.RTCPeerConnection.prototype.getLocalStreams =
                        function () {
                            var e = this;
                            return (
                                (this._shimmedLocalStreams =
                                    this._shimmedLocalStreams || {}),
                                Object.keys(this._shimmedLocalStreams).map(
                                    function (t) {
                                        return e._shimmedLocalStreams[t][0];
                                    }
                                )
                            );
                        };
                    var t = e.RTCPeerConnection.prototype.addTrack;
                    e.RTCPeerConnection.prototype.addTrack = function (e, r) {
                        if (!r) return t.apply(this, arguments);
                        this._shimmedLocalStreams =
                            this._shimmedLocalStreams || {};
                        var n = t.apply(this, arguments);
                        return (
                            this._shimmedLocalStreams[r.id]
                                ? -1 ===
                                      this._shimmedLocalStreams[r.id].indexOf(
                                          n
                                      ) &&
                                  this._shimmedLocalStreams[r.id].push(n)
                                : (this._shimmedLocalStreams[r.id] = [r, n]),
                            n
                        );
                    };
                    var r = e.RTCPeerConnection.prototype.addStream;
                    e.RTCPeerConnection.prototype.addStream = function (e) {
                        var t = this;
                        (this._shimmedLocalStreams =
                            this._shimmedLocalStreams || {}),
                            e.getTracks().forEach(function (e) {
                                if (
                                    t.getSenders().find(function (t) {
                                        return t.track === e;
                                    })
                                )
                                    throw new DOMException(
                                        "Track already exists.",
                                        "InvalidAccessError"
                                    );
                            });
                        var n = t.getSenders();
                        r.apply(this, arguments);
                        var i = t.getSenders().filter(function (e) {
                            return -1 === n.indexOf(e);
                        });
                        this._shimmedLocalStreams[e.id] = [e].concat(i);
                    };
                    var n = e.RTCPeerConnection.prototype.removeStream;
                    e.RTCPeerConnection.prototype.removeStream = function (e) {
                        return (
                            (this._shimmedLocalStreams =
                                this._shimmedLocalStreams || {}),
                            delete this._shimmedLocalStreams[e.id],
                            n.apply(this, arguments)
                        );
                    };
                    var i = e.RTCPeerConnection.prototype.removeTrack;
                    e.RTCPeerConnection.prototype.removeTrack = function (e) {
                        var t = this;
                        return (
                            (this._shimmedLocalStreams =
                                this._shimmedLocalStreams || {}),
                            e &&
                                Object.keys(this._shimmedLocalStreams).forEach(
                                    function (r) {
                                        var n =
                                            t._shimmedLocalStreams[r].indexOf(
                                                e
                                            );
                                        -1 !== n &&
                                            t._shimmedLocalStreams[r].splice(
                                                n,
                                                1
                                            ),
                                            1 ===
                                                t._shimmedLocalStreams[r]
                                                    .length &&
                                                delete t._shimmedLocalStreams[
                                                    r
                                                ];
                                    }
                                ),
                            i.apply(this, arguments)
                        );
                    };
                },
                shimAddTrackRemoveTrack: function (e) {
                    if (e.RTCPeerConnection) {
                        var t = n.detectBrowser(e);
                        if (
                            e.RTCPeerConnection.prototype.addTrack &&
                            t.version >= 65
                        )
                            return this.shimAddTrackRemoveTrackWithNative(e);
                        var r = e.RTCPeerConnection.prototype.getLocalStreams;
                        e.RTCPeerConnection.prototype.getLocalStreams =
                            function () {
                                var e = this,
                                    t = r.apply(this);
                                return (
                                    (e._reverseStreams =
                                        e._reverseStreams || {}),
                                    t.map(function (t) {
                                        return e._reverseStreams[t.id];
                                    })
                                );
                            };
                        var i = e.RTCPeerConnection.prototype.addStream;
                        e.RTCPeerConnection.prototype.addStream = function (t) {
                            var r = this;
                            if (
                                ((r._streams = r._streams || {}),
                                (r._reverseStreams = r._reverseStreams || {}),
                                t.getTracks().forEach(function (e) {
                                    if (
                                        r.getSenders().find(function (t) {
                                            return t.track === e;
                                        })
                                    )
                                        throw new DOMException(
                                            "Track already exists.",
                                            "InvalidAccessError"
                                        );
                                }),
                                !r._reverseStreams[t.id])
                            ) {
                                var n = new e.MediaStream(t.getTracks());
                                (r._streams[t.id] = n),
                                    (r._reverseStreams[n.id] = t),
                                    (t = n);
                            }
                            i.apply(r, [t]);
                        };
                        var a = e.RTCPeerConnection.prototype.removeStream;
                        (e.RTCPeerConnection.prototype.removeStream = function (
                            e
                        ) {
                            var t = this;
                            (t._streams = t._streams || {}),
                                (t._reverseStreams = t._reverseStreams || {}),
                                a.apply(t, [t._streams[e.id] || e]),
                                delete t._reverseStreams[
                                    t._streams[e.id]
                                        ? t._streams[e.id].id
                                        : e.id
                                ],
                                delete t._streams[e.id];
                        }),
                            (e.RTCPeerConnection.prototype.addTrack = function (
                                t,
                                r
                            ) {
                                var n = this;
                                if ("closed" === n.signalingState)
                                    throw new DOMException(
                                        "The RTCPeerConnection's signalingState is 'closed'.",
                                        "InvalidStateError"
                                    );
                                var i = [].slice.call(arguments, 1);
                                if (
                                    1 !== i.length ||
                                    !i[0].getTracks().find(function (e) {
                                        return e === t;
                                    })
                                )
                                    throw new DOMException(
                                        "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
                                        "NotSupportedError"
                                    );
                                var a = n.getSenders().find(function (e) {
                                    return e.track === t;
                                });
                                if (a)
                                    throw new DOMException(
                                        "Track already exists.",
                                        "InvalidAccessError"
                                    );
                                (n._streams = n._streams || {}),
                                    (n._reverseStreams =
                                        n._reverseStreams || {});
                                var o = n._streams[r.id];
                                if (o)
                                    o.addTrack(t),
                                        Promise.resolve().then(function () {
                                            n.dispatchEvent(
                                                new Event("negotiationneeded")
                                            );
                                        });
                                else {
                                    var s = new e.MediaStream([t]);
                                    (n._streams[r.id] = s),
                                        (n._reverseStreams[s.id] = r),
                                        n.addStream(s);
                                }
                                return n.getSenders().find(function (e) {
                                    return e.track === t;
                                });
                            }),
                            ["createOffer", "createAnswer"].forEach(function (
                                t
                            ) {
                                var r = e.RTCPeerConnection.prototype[t];
                                e.RTCPeerConnection.prototype[t] = function () {
                                    var e = this,
                                        t = arguments,
                                        n =
                                            arguments.length &&
                                            "function" == typeof arguments[0];
                                    return n
                                        ? r.apply(e, [
                                              function (r) {
                                                  var n = c(e, r);
                                                  t[0].apply(null, [n]);
                                              },
                                              function (e) {
                                                  t[1] && t[1].apply(null, e);
                                              },
                                              arguments[2],
                                          ])
                                        : r
                                              .apply(e, arguments)
                                              .then(function (t) {
                                                  return c(e, t);
                                              });
                                };
                            });
                        var o =
                            e.RTCPeerConnection.prototype.setLocalDescription;
                        e.RTCPeerConnection.prototype.setLocalDescription =
                            function () {
                                var e = this;
                                return arguments.length && arguments[0].type
                                    ? ((arguments[0] = d(e, arguments[0])),
                                      o.apply(e, arguments))
                                    : o.apply(e, arguments);
                            };
                        var s = Object.getOwnPropertyDescriptor(
                            e.RTCPeerConnection.prototype,
                            "localDescription"
                        );
                        Object.defineProperty(
                            e.RTCPeerConnection.prototype,
                            "localDescription",
                            {
                                get: function () {
                                    var e = s.get.apply(this);
                                    return "" === e.type ? e : c(this, e);
                                },
                            }
                        ),
                            (e.RTCPeerConnection.prototype.removeTrack =
                                function (e) {
                                    var t,
                                        r = this;
                                    if ("closed" === r.signalingState)
                                        throw new DOMException(
                                            "The RTCPeerConnection's signalingState is 'closed'.",
                                            "InvalidStateError"
                                        );
                                    if (!e._pc)
                                        throw new DOMException(
                                            "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
                                            "TypeError"
                                        );
                                    if (!(e._pc === r))
                                        throw new DOMException(
                                            "Sender was not created by this connection.",
                                            "InvalidAccessError"
                                        );
                                    (r._streams = r._streams || {}),
                                        Object.keys(r._streams).forEach(
                                            function (n) {
                                                r._streams[n]
                                                    .getTracks()
                                                    .find(function (t) {
                                                        return e.track === t;
                                                    }) && (t = r._streams[n]);
                                            }
                                        ),
                                        t &&
                                            (1 === t.getTracks().length
                                                ? r.removeStream(
                                                      r._reverseStreams[t.id]
                                                  )
                                                : t.removeTrack(e.track),
                                            r.dispatchEvent(
                                                new Event("negotiationneeded")
                                            ));
                                });
                    }
                    function c(e, t) {
                        var r = t.sdp;
                        return (
                            Object.keys(e._reverseStreams || []).forEach(
                                function (t) {
                                    var n = e._reverseStreams[t],
                                        i = e._streams[n.id];
                                    r = r.replace(new RegExp(i.id, "g"), n.id);
                                }
                            ),
                            new RTCSessionDescription({ type: t.type, sdp: r })
                        );
                    }
                    function d(e, t) {
                        var r = t.sdp;
                        return (
                            Object.keys(e._reverseStreams || []).forEach(
                                function (t) {
                                    var n = e._reverseStreams[t],
                                        i = e._streams[n.id];
                                    r = r.replace(new RegExp(n.id, "g"), i.id);
                                }
                            ),
                            new RTCSessionDescription({ type: t.type, sdp: r })
                        );
                    }
                },
                shimPeerConnection: function (e) {
                    var t = n.detectBrowser(e);
                    if (
                        (!e.RTCPeerConnection &&
                            e.webkitRTCPeerConnection &&
                            ((e.RTCPeerConnection = function (t, r) {
                                return (
                                    i("PeerConnection"),
                                    t &&
                                        t.iceTransportPolicy &&
                                        (t.iceTransports =
                                            t.iceTransportPolicy),
                                    new e.webkitRTCPeerConnection(t, r)
                                );
                            }),
                            (e.RTCPeerConnection.prototype =
                                e.webkitRTCPeerConnection.prototype),
                            e.webkitRTCPeerConnection.generateCertificate &&
                                Object.defineProperty(
                                    e.RTCPeerConnection,
                                    "generateCertificate",
                                    {
                                        get: function () {
                                            return e.webkitRTCPeerConnection
                                                .generateCertificate;
                                        },
                                    }
                                )),
                        e.RTCPeerConnection)
                    ) {
                        var r = e.RTCPeerConnection.prototype.getStats;
                        (e.RTCPeerConnection.prototype.getStats = function (
                            e,
                            t,
                            n
                        ) {
                            var i = this,
                                a = arguments;
                            if (arguments.length > 0 && "function" == typeof e)
                                return r.apply(this, arguments);
                            if (
                                0 === r.length &&
                                (0 === arguments.length ||
                                    "function" != typeof arguments[0])
                            )
                                return r.apply(this, []);
                            var o = function (e) {
                                    var t = {};
                                    return (
                                        e.result().forEach(function (e) {
                                            var r = {
                                                id: e.id,
                                                timestamp: e.timestamp,
                                                type:
                                                    {
                                                        localcandidate:
                                                            "local-candidate",
                                                        remotecandidate:
                                                            "remote-candidate",
                                                    }[e.type] || e.type,
                                            };
                                            e.names().forEach(function (t) {
                                                r[t] = e.stat(t);
                                            }),
                                                (t[r.id] = r);
                                        }),
                                        t
                                    );
                                },
                                s = function (e) {
                                    return new Map(
                                        Object.keys(e).map(function (t) {
                                            return [t, e[t]];
                                        })
                                    );
                                };
                            if (arguments.length >= 2) {
                                var c = function (e) {
                                    a[1](s(o(e)));
                                };
                                return r.apply(this, [c, arguments[0]]);
                            }
                            return new Promise(function (e, t) {
                                r.apply(i, [
                                    function (t) {
                                        e(s(o(t)));
                                    },
                                    t,
                                ]);
                            }).then(t, n);
                        }),
                            t.version < 51 &&
                                [
                                    "setLocalDescription",
                                    "setRemoteDescription",
                                    "addIceCandidate",
                                ].forEach(function (t) {
                                    var r = e.RTCPeerConnection.prototype[t];
                                    e.RTCPeerConnection.prototype[t] =
                                        function () {
                                            var e = arguments,
                                                t = this,
                                                n = new Promise(function (
                                                    n,
                                                    i
                                                ) {
                                                    r.apply(t, [e[0], n, i]);
                                                });
                                            return e.length < 2
                                                ? n
                                                : n.then(
                                                      function () {
                                                          e[1].apply(null, []);
                                                      },
                                                      function (t) {
                                                          e.length >= 3 &&
                                                              e[2].apply(null, [
                                                                  t,
                                                              ]);
                                                      }
                                                  );
                                        };
                                }),
                            t.version < 52 &&
                                ["createOffer", "createAnswer"].forEach(
                                    function (t) {
                                        var r =
                                            e.RTCPeerConnection.prototype[t];
                                        e.RTCPeerConnection.prototype[t] =
                                            function () {
                                                var e = this;
                                                if (
                                                    arguments.length < 1 ||
                                                    (1 === arguments.length &&
                                                        "object" ==
                                                            typeof arguments[0])
                                                ) {
                                                    var t =
                                                        1 === arguments.length
                                                            ? arguments[0]
                                                            : void 0;
                                                    return new Promise(
                                                        function (n, i) {
                                                            r.apply(e, [
                                                                n,
                                                                i,
                                                                t,
                                                            ]);
                                                        }
                                                    );
                                                }
                                                return r.apply(this, arguments);
                                            };
                                    }
                                ),
                            [
                                "setLocalDescription",
                                "setRemoteDescription",
                                "addIceCandidate",
                            ].forEach(function (t) {
                                var r = e.RTCPeerConnection.prototype[t];
                                e.RTCPeerConnection.prototype[t] = function () {
                                    return (
                                        (arguments[0] = new (
                                            "addIceCandidate" === t
                                                ? e.RTCIceCandidate
                                                : e.RTCSessionDescription
                                        )(arguments[0])),
                                        r.apply(this, arguments)
                                    );
                                };
                            });
                        var a = e.RTCPeerConnection.prototype.addIceCandidate;
                        e.RTCPeerConnection.prototype.addIceCandidate =
                            function () {
                                return arguments[0]
                                    ? a.apply(this, arguments)
                                    : (arguments[1] && arguments[1].apply(null),
                                      Promise.resolve());
                            };
                    }
                },
                fixNegotiationNeeded: function (e) {
                    n.wrapPeerConnectionEvent(
                        e,
                        "negotiationneeded",
                        function (e) {
                            if ("stable" === e.target.signalingState) return e;
                        }
                    );
                },
                shimGetDisplayMedia: function (e, t) {
                    e.navigator &&
                        e.navigator.mediaDevices &&
                        !("getDisplayMedia" in e.navigator.mediaDevices) &&
                        ("function" == typeof t
                            ? ((e.navigator.mediaDevices.getDisplayMedia =
                                  function (r) {
                                      return t(r).then(function (t) {
                                          var n = r.video && r.video.width,
                                              i = r.video && r.video.height,
                                              a = r.video && r.video.frameRate;
                                          return (
                                              (r.video = {
                                                  mandatory: {
                                                      chromeMediaSource:
                                                          "desktop",
                                                      chromeMediaSourceId: t,
                                                      maxFrameRate: a || 3,
                                                  },
                                              }),
                                              n &&
                                                  (r.video.mandatory.maxWidth =
                                                      n),
                                              i &&
                                                  (r.video.mandatory.maxHeight =
                                                      i),
                                              e.navigator.mediaDevices.getUserMedia(
                                                  r
                                              )
                                          );
                                      });
                                  }),
                              (e.navigator.getDisplayMedia = function (t) {
                                  return (
                                      n.deprecated(
                                          "navigator.getDisplayMedia",
                                          "navigator.mediaDevices.getDisplayMedia"
                                      ),
                                      e.navigator.mediaDevices.getDisplayMedia(
                                          t
                                      )
                                  );
                              }))
                            : console.error(
                                  "shimGetDisplayMedia: getSourceId argument is not a function"
                              ));
                },
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(1),
                i = n.log;
            e.exports = function (e) {
                var t = n.detectBrowser(e),
                    r = e && e.navigator,
                    a = function (e) {
                        if ("object" != typeof e || e.mandatory || e.optional)
                            return e;
                        var t = {};
                        return (
                            Object.keys(e).forEach(function (r) {
                                if (
                                    "require" !== r &&
                                    "advanced" !== r &&
                                    "mediaSource" !== r
                                ) {
                                    var n =
                                        "object" == typeof e[r]
                                            ? e[r]
                                            : { ideal: e[r] };
                                    void 0 !== n.exact &&
                                        "number" == typeof n.exact &&
                                        (n.min = n.max = n.exact);
                                    var i = function (e, t) {
                                        return e
                                            ? e +
                                                  t.charAt(0).toUpperCase() +
                                                  t.slice(1)
                                            : "deviceId" === t
                                            ? "sourceId"
                                            : t;
                                    };
                                    if (void 0 !== n.ideal) {
                                        t.optional = t.optional || [];
                                        var a = {};
                                        "number" == typeof n.ideal
                                            ? ((a[i("min", r)] = n.ideal),
                                              t.optional.push(a),
                                              ((a = {})[i("max", r)] = n.ideal),
                                              t.optional.push(a))
                                            : ((a[i("", r)] = n.ideal),
                                              t.optional.push(a));
                                    }
                                    void 0 !== n.exact &&
                                    "number" != typeof n.exact
                                        ? ((t.mandatory = t.mandatory || {}),
                                          (t.mandatory[i("", r)] = n.exact))
                                        : ["min", "max"].forEach(function (e) {
                                              void 0 !== n[e] &&
                                                  ((t.mandatory =
                                                      t.mandatory || {}),
                                                  (t.mandatory[i(e, r)] =
                                                      n[e]));
                                          });
                                }
                            }),
                            e.advanced &&
                                (t.optional = (t.optional || []).concat(
                                    e.advanced
                                )),
                            t
                        );
                    },
                    o = function (e, n) {
                        if (t.version >= 61) return n(e);
                        if (
                            (e = JSON.parse(JSON.stringify(e))) &&
                            "object" == typeof e.audio
                        ) {
                            var o = function (e, t, r) {
                                t in e &&
                                    !(r in e) &&
                                    ((e[r] = e[t]), delete e[t]);
                            };
                            o(
                                (e = JSON.parse(JSON.stringify(e))).audio,
                                "autoGainControl",
                                "googAutoGainControl"
                            ),
                                o(
                                    e.audio,
                                    "noiseSuppression",
                                    "googNoiseSuppression"
                                ),
                                (e.audio = a(e.audio));
                        }
                        if (e && "object" == typeof e.video) {
                            var s = e.video.facingMode;
                            s = s && ("object" == typeof s ? s : { ideal: s });
                            var c,
                                d = t.version < 66;
                            if (
                                s &&
                                ("user" === s.exact ||
                                    "environment" === s.exact ||
                                    "user" === s.ideal ||
                                    "environment" === s.ideal) &&
                                (!r.mediaDevices.getSupportedConstraints ||
                                    !r.mediaDevices.getSupportedConstraints()
                                        .facingMode ||
                                    d)
                            )
                                if (
                                    (delete e.video.facingMode,
                                    "environment" === s.exact ||
                                    "environment" === s.ideal
                                        ? (c = ["back", "rear"])
                                        : ("user" !== s.exact &&
                                              "user" !== s.ideal) ||
                                          (c = ["front"]),
                                    c)
                                )
                                    return r.mediaDevices
                                        .enumerateDevices()
                                        .then(function (t) {
                                            var r = (t = t.filter(function (e) {
                                                return "videoinput" === e.kind;
                                            })).find(function (e) {
                                                return c.some(function (t) {
                                                    return (
                                                        -1 !==
                                                        e.label
                                                            .toLowerCase()
                                                            .indexOf(t)
                                                    );
                                                });
                                            });
                                            return (
                                                !r &&
                                                    t.length &&
                                                    -1 !== c.indexOf("back") &&
                                                    (r = t[t.length - 1]),
                                                r &&
                                                    (e.video.deviceId = s.exact
                                                        ? { exact: r.deviceId }
                                                        : {
                                                              ideal: r.deviceId,
                                                          }),
                                                (e.video = a(e.video)),
                                                i(
                                                    "chrome: " +
                                                        JSON.stringify(e)
                                                ),
                                                n(e)
                                            );
                                        });
                            e.video = a(e.video);
                        }
                        return i("chrome: " + JSON.stringify(e)), n(e);
                    },
                    s = function (e) {
                        return t.version >= 64
                            ? e
                            : {
                                  name:
                                      {
                                          PermissionDeniedError:
                                              "NotAllowedError",
                                          PermissionDismissedError:
                                              "NotAllowedError",
                                          InvalidStateError: "NotAllowedError",
                                          DevicesNotFoundError: "NotFoundError",
                                          ConstraintNotSatisfiedError:
                                              "OverconstrainedError",
                                          TrackStartError: "NotReadableError",
                                          MediaDeviceFailedDueToShutdown:
                                              "NotAllowedError",
                                          MediaDeviceKillSwitchOn:
                                              "NotAllowedError",
                                          TabCaptureError: "AbortError",
                                          ScreenCaptureError: "AbortError",
                                          DeviceCaptureError: "AbortError",
                                      }[e.name] || e.name,
                                  message: e.message,
                                  constraint: e.constraint || e.constraintName,
                                  toString: function () {
                                      return (
                                          this.name +
                                          (this.message && ": ") +
                                          this.message
                                      );
                                  },
                              };
                    };
                r.getUserMedia = function (e, t, n) {
                    o(e, function (e) {
                        r.webkitGetUserMedia(e, t, function (e) {
                            n && n(s(e));
                        });
                    });
                };
                var c = function (e) {
                    return new Promise(function (t, n) {
                        r.getUserMedia(e, t, n);
                    });
                };
                if (
                    (r.mediaDevices ||
                        (r.mediaDevices = {
                            getUserMedia: c,
                            enumerateDevices: function () {
                                return new Promise(function (t) {
                                    var r = {
                                        audio: "audioinput",
                                        video: "videoinput",
                                    };
                                    return e.MediaStreamTrack.getSources(
                                        function (e) {
                                            t(
                                                e.map(function (e) {
                                                    return {
                                                        label: e.label,
                                                        kind: r[e.kind],
                                                        deviceId: e.id,
                                                        groupId: "",
                                                    };
                                                })
                                            );
                                        }
                                    );
                                });
                            },
                            getSupportedConstraints: function () {
                                return {
                                    deviceId: !0,
                                    echoCancellation: !0,
                                    facingMode: !0,
                                    frameRate: !0,
                                    height: !0,
                                    width: !0,
                                };
                            },
                        }),
                    r.mediaDevices.getUserMedia)
                ) {
                    var d = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
                    r.mediaDevices.getUserMedia = function (e) {
                        return o(e, function (e) {
                            return d(e).then(
                                function (t) {
                                    if (
                                        (e.audio &&
                                            !t.getAudioTracks().length) ||
                                        (e.video && !t.getVideoTracks().length)
                                    )
                                        throw (
                                            (t
                                                .getTracks()
                                                .forEach(function (e) {
                                                    e.stop();
                                                }),
                                            new DOMException(
                                                "",
                                                "NotFoundError"
                                            ))
                                        );
                                    return t;
                                },
                                function (e) {
                                    return Promise.reject(s(e));
                                }
                            );
                        });
                    };
                } else
                    r.mediaDevices.getUserMedia = function (e) {
                        return c(e);
                    };
                void 0 === r.mediaDevices.addEventListener &&
                    (r.mediaDevices.addEventListener = function () {
                        i("Dummy mediaDevices.addEventListener called.");
                    }),
                    void 0 === r.mediaDevices.removeEventListener &&
                        (r.mediaDevices.removeEventListener = function () {
                            i("Dummy mediaDevices.removeEventListener called.");
                        });
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(1),
                i = r(10),
                a = r(11);
            e.exports = {
                shimGetUserMedia: r(12),
                shimPeerConnection: function (e) {
                    var t = n.detectBrowser(e);
                    if (
                        e.RTCIceGatherer &&
                        (e.RTCIceCandidate ||
                            (e.RTCIceCandidate = function (e) {
                                return e;
                            }),
                        e.RTCSessionDescription ||
                            (e.RTCSessionDescription = function (e) {
                                return e;
                            }),
                        t.version < 15025)
                    ) {
                        var r = Object.getOwnPropertyDescriptor(
                            e.MediaStreamTrack.prototype,
                            "enabled"
                        );
                        Object.defineProperty(
                            e.MediaStreamTrack.prototype,
                            "enabled",
                            {
                                set: function (e) {
                                    r.set.call(this, e);
                                    var t = new Event("enabled");
                                    (t.enabled = e), this.dispatchEvent(t);
                                },
                            }
                        );
                    }
                    e.RTCRtpSender &&
                        !("dtmf" in e.RTCRtpSender.prototype) &&
                        Object.defineProperty(
                            e.RTCRtpSender.prototype,
                            "dtmf",
                            {
                                get: function () {
                                    return (
                                        void 0 === this._dtmf &&
                                            ("audio" === this.track.kind
                                                ? (this._dtmf =
                                                      new e.RTCDtmfSender(this))
                                                : "video" === this.track.kind &&
                                                  (this._dtmf = null)),
                                        this._dtmf
                                    );
                                },
                            }
                        ),
                        e.RTCDtmfSender &&
                            !e.RTCDTMFSender &&
                            (e.RTCDTMFSender = e.RTCDtmfSender);
                    var o = a(e, t.version);
                    (e.RTCPeerConnection = function (e) {
                        return (
                            e &&
                                e.iceServers &&
                                (e.iceServers = i(e.iceServers)),
                            new o(e)
                        );
                    }),
                        (e.RTCPeerConnection.prototype = o.prototype);
                },
                shimReplaceTrack: function (e) {
                    e.RTCRtpSender &&
                        !("replaceTrack" in e.RTCRtpSender.prototype) &&
                        (e.RTCRtpSender.prototype.replaceTrack =
                            e.RTCRtpSender.prototype.setTrack);
                },
                shimGetDisplayMedia: function (e, t) {
                    if (
                        "getDisplayMedia" in e.navigator &&
                        e.navigator.mediaDevices &&
                        !("getDisplayMedia" in e.navigator.mediaDevices)
                    ) {
                        var r = e.navigator.getDisplayMedia;
                        (e.navigator.mediaDevices.getDisplayMedia = function (
                            t
                        ) {
                            return r.call(e.navigator, t);
                        }),
                            (e.navigator.getDisplayMedia = function (t) {
                                return (
                                    n.deprecated(
                                        "navigator.getDisplayMedia",
                                        "navigator.mediaDevices.getDisplayMedia"
                                    ),
                                    r.call(e.navigator, t)
                                );
                            });
                    }
                },
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(1);
            e.exports = function (e, t) {
                var r = !1;
                return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
                    if (e && (e.urls || e.url)) {
                        var i = e.urls || e.url;
                        e.url &&
                            !e.urls &&
                            n.deprecated(
                                "RTCIceServer.url",
                                "RTCIceServer.urls"
                            );
                        var a = "string" == typeof i;
                        return (
                            a && (i = [i]),
                            (i = i.filter(function (e) {
                                return 0 === e.indexOf("turn:") &&
                                    -1 !== e.indexOf("transport=udp") &&
                                    -1 === e.indexOf("turn:[") &&
                                    !r
                                    ? ((r = !0), !0)
                                    : 0 === e.indexOf("stun:") &&
                                          t >= 14393 &&
                                          -1 === e.indexOf("?transport=udp");
                            })),
                            delete e.url,
                            (e.urls = a ? i[0] : i),
                            !!i.length
                        );
                    }
                });
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(2);
            function i(e, t, r, i, a) {
                var o = n.writeRtpDescription(e.kind, t);
                if (
                    ((o += n.writeIceParameters(
                        e.iceGatherer.getLocalParameters()
                    )),
                    (o += n.writeDtlsParameters(
                        e.dtlsTransport.getLocalParameters(),
                        "offer" === r ? "actpass" : a || "active"
                    )),
                    (o += "a=mid:" + e.mid + "\r\n"),
                    e.rtpSender && e.rtpReceiver
                        ? (o += "a=sendrecv\r\n")
                        : e.rtpSender
                        ? (o += "a=sendonly\r\n")
                        : e.rtpReceiver
                        ? (o += "a=recvonly\r\n")
                        : (o += "a=inactive\r\n"),
                    e.rtpSender)
                ) {
                    var s = e.rtpSender._initialTrackId || e.rtpSender.track.id;
                    e.rtpSender._initialTrackId = s;
                    var c = "msid:" + (i ? i.id : "-") + " " + s + "\r\n";
                    (o += "a=" + c),
                        (o +=
                            "a=ssrc:" +
                            e.sendEncodingParameters[0].ssrc +
                            " " +
                            c),
                        e.sendEncodingParameters[0].rtx &&
                            ((o +=
                                "a=ssrc:" +
                                e.sendEncodingParameters[0].rtx.ssrc +
                                " " +
                                c),
                            (o +=
                                "a=ssrc-group:FID " +
                                e.sendEncodingParameters[0].ssrc +
                                " " +
                                e.sendEncodingParameters[0].rtx.ssrc +
                                "\r\n"));
                }
                return (
                    (o +=
                        "a=ssrc:" +
                        e.sendEncodingParameters[0].ssrc +
                        " cname:" +
                        n.localCName +
                        "\r\n"),
                    e.rtpSender &&
                        e.sendEncodingParameters[0].rtx &&
                        (o +=
                            "a=ssrc:" +
                            e.sendEncodingParameters[0].rtx.ssrc +
                            " cname:" +
                            n.localCName +
                            "\r\n"),
                    o
                );
            }
            function a(e, t) {
                var r = { codecs: [], headerExtensions: [], fecMechanisms: [] },
                    n = function (e, t) {
                        e = parseInt(e, 10);
                        for (var r = 0; r < t.length; r++)
                            if (
                                t[r].payloadType === e ||
                                t[r].preferredPayloadType === e
                            )
                                return t[r];
                    },
                    i = function (e, t, r, i) {
                        var a = n(e.parameters.apt, r),
                            o = n(t.parameters.apt, i);
                        return (
                            a &&
                            o &&
                            a.name.toLowerCase() === o.name.toLowerCase()
                        );
                    };
                return (
                    e.codecs.forEach(function (n) {
                        for (var a = 0; a < t.codecs.length; a++) {
                            var o = t.codecs[a];
                            if (
                                n.name.toLowerCase() === o.name.toLowerCase() &&
                                n.clockRate === o.clockRate
                            ) {
                                if (
                                    "rtx" === n.name.toLowerCase() &&
                                    n.parameters &&
                                    o.parameters.apt &&
                                    !i(n, o, e.codecs, t.codecs)
                                )
                                    continue;
                                ((o = JSON.parse(
                                    JSON.stringify(o)
                                )).numChannels = Math.min(
                                    n.numChannels,
                                    o.numChannels
                                )),
                                    r.codecs.push(o),
                                    (o.rtcpFeedback = o.rtcpFeedback.filter(
                                        function (e) {
                                            for (
                                                var t = 0;
                                                t < n.rtcpFeedback.length;
                                                t++
                                            )
                                                if (
                                                    n.rtcpFeedback[t].type ===
                                                        e.type &&
                                                    n.rtcpFeedback[t]
                                                        .parameter ===
                                                        e.parameter
                                                )
                                                    return !0;
                                            return !1;
                                        }
                                    ));
                                break;
                            }
                        }
                    }),
                    e.headerExtensions.forEach(function (e) {
                        for (var n = 0; n < t.headerExtensions.length; n++) {
                            var i = t.headerExtensions[n];
                            if (e.uri === i.uri) {
                                r.headerExtensions.push(i);
                                break;
                            }
                        }
                    }),
                    r
                );
            }
            function o(e, t, r) {
                return (
                    -1 !==
                    {
                        offer: {
                            setLocalDescription: ["stable", "have-local-offer"],
                            setRemoteDescription: [
                                "stable",
                                "have-remote-offer",
                            ],
                        },
                        answer: {
                            setLocalDescription: [
                                "have-remote-offer",
                                "have-local-pranswer",
                            ],
                            setRemoteDescription: [
                                "have-local-offer",
                                "have-remote-pranswer",
                            ],
                        },
                    }[t][e].indexOf(r)
                );
            }
            function s(e, t) {
                var r = e.getRemoteCandidates().find(function (e) {
                    return (
                        t.foundation === e.foundation &&
                        t.ip === e.ip &&
                        t.port === e.port &&
                        t.priority === e.priority &&
                        t.protocol === e.protocol &&
                        t.type === e.type
                    );
                });
                return r || e.addRemoteCandidate(t), !r;
            }
            function c(e, t) {
                var r = new Error(t);
                return (
                    (r.name = e),
                    (r.code = {
                        NotSupportedError: 9,
                        InvalidStateError: 11,
                        InvalidAccessError: 15,
                        TypeError: void 0,
                        OperationError: void 0,
                    }[e]),
                    r
                );
            }
            e.exports = function (e, t) {
                function r(t, r) {
                    r.addTrack(t),
                        r.dispatchEvent(
                            new e.MediaStreamTrackEvent("addtrack", {
                                track: t,
                            })
                        );
                }
                function d(t, r, n, i) {
                    var a = new Event("track");
                    (a.track = r),
                        (a.receiver = n),
                        (a.transceiver = { receiver: n }),
                        (a.streams = i),
                        e.setTimeout(function () {
                            t._dispatchEvent("track", a);
                        });
                }
                var u = function (r) {
                    var i = this,
                        a = document.createDocumentFragment();
                    if (
                        ([
                            "addEventListener",
                            "removeEventListener",
                            "dispatchEvent",
                        ].forEach(function (e) {
                            i[e] = a[e].bind(a);
                        }),
                        (this.canTrickleIceCandidates = null),
                        (this.needNegotiation = !1),
                        (this.localStreams = []),
                        (this.remoteStreams = []),
                        (this._localDescription = null),
                        (this._remoteDescription = null),
                        (this.signalingState = "stable"),
                        (this.iceConnectionState = "new"),
                        (this.connectionState = "new"),
                        (this.iceGatheringState = "new"),
                        (r = JSON.parse(JSON.stringify(r || {}))),
                        (this.usingBundle = "max-bundle" === r.bundlePolicy),
                        "negotiate" === r.rtcpMuxPolicy)
                    )
                        throw c(
                            "NotSupportedError",
                            "rtcpMuxPolicy 'negotiate' is not supported"
                        );
                    switch (
                        (r.rtcpMuxPolicy || (r.rtcpMuxPolicy = "require"),
                        r.iceTransportPolicy)
                    ) {
                        case "all":
                        case "relay":
                            break;
                        default:
                            r.iceTransportPolicy = "all";
                    }
                    switch (r.bundlePolicy) {
                        case "balanced":
                        case "max-compat":
                        case "max-bundle":
                            break;
                        default:
                            r.bundlePolicy = "balanced";
                    }
                    if (
                        ((r.iceServers = (function (e, t) {
                            var r = !1;
                            return (e = JSON.parse(JSON.stringify(e))).filter(
                                function (e) {
                                    if (e && (e.urls || e.url)) {
                                        var n = e.urls || e.url;
                                        e.url &&
                                            !e.urls &&
                                            console.warn(
                                                "RTCIceServer.url is deprecated! Use urls instead."
                                            );
                                        var i = "string" == typeof n;
                                        return (
                                            i && (n = [n]),
                                            (n = n.filter(function (e) {
                                                return 0 ===
                                                    e.indexOf("turn:") &&
                                                    -1 !==
                                                        e.indexOf(
                                                            "transport=udp"
                                                        ) &&
                                                    -1 ===
                                                        e.indexOf("turn:[") &&
                                                    !r
                                                    ? ((r = !0), !0)
                                                    : 0 ===
                                                          e.indexOf("stun:") &&
                                                          t >= 14393 &&
                                                          -1 ===
                                                              e.indexOf(
                                                                  "?transport=udp"
                                                              );
                                            })),
                                            delete e.url,
                                            (e.urls = i ? n[0] : n),
                                            !!n.length
                                        );
                                    }
                                }
                            );
                        })(r.iceServers || [], t)),
                        (this._iceGatherers = []),
                        r.iceCandidatePoolSize)
                    )
                        for (var o = r.iceCandidatePoolSize; o > 0; o--)
                            this._iceGatherers.push(
                                new e.RTCIceGatherer({
                                    iceServers: r.iceServers,
                                    gatherPolicy: r.iceTransportPolicy,
                                })
                            );
                    else r.iceCandidatePoolSize = 0;
                    (this._config = r),
                        (this.transceivers = []),
                        (this._sdpSessionId = n.generateSessionId()),
                        (this._sdpSessionVersion = 0),
                        (this._dtlsRole = void 0),
                        (this._isClosed = !1);
                };
                Object.defineProperty(u.prototype, "localDescription", {
                    configurable: !0,
                    get: function () {
                        return this._localDescription;
                    },
                }),
                    Object.defineProperty(u.prototype, "remoteDescription", {
                        configurable: !0,
                        get: function () {
                            return this._remoteDescription;
                        },
                    }),
                    (u.prototype.onicecandidate = null),
                    (u.prototype.onaddstream = null),
                    (u.prototype.ontrack = null),
                    (u.prototype.onremovestream = null),
                    (u.prototype.onsignalingstatechange = null),
                    (u.prototype.oniceconnectionstatechange = null),
                    (u.prototype.onconnectionstatechange = null),
                    (u.prototype.onicegatheringstatechange = null),
                    (u.prototype.onnegotiationneeded = null),
                    (u.prototype.ondatachannel = null),
                    (u.prototype._dispatchEvent = function (e, t) {
                        this._isClosed ||
                            (this.dispatchEvent(t),
                            "function" == typeof this["on" + e] &&
                                this["on" + e](t));
                    }),
                    (u.prototype._emitGatheringStateChange = function () {
                        var e = new Event("icegatheringstatechange");
                        this._dispatchEvent("icegatheringstatechange", e);
                    }),
                    (u.prototype.getConfiguration = function () {
                        return this._config;
                    }),
                    (u.prototype.getLocalStreams = function () {
                        return this.localStreams;
                    }),
                    (u.prototype.getRemoteStreams = function () {
                        return this.remoteStreams;
                    }),
                    (u.prototype._createTransceiver = function (e, t) {
                        var r = this.transceivers.length > 0,
                            n = {
                                track: null,
                                iceGatherer: null,
                                iceTransport: null,
                                dtlsTransport: null,
                                localCapabilities: null,
                                remoteCapabilities: null,
                                rtpSender: null,
                                rtpReceiver: null,
                                kind: e,
                                mid: null,
                                sendEncodingParameters: null,
                                recvEncodingParameters: null,
                                stream: null,
                                associatedRemoteMediaStreams: [],
                                wantReceive: !0,
                            };
                        if (this.usingBundle && r)
                            (n.iceTransport =
                                this.transceivers[0].iceTransport),
                                (n.dtlsTransport =
                                    this.transceivers[0].dtlsTransport);
                        else {
                            var i = this._createIceAndDtlsTransports();
                            (n.iceTransport = i.iceTransport),
                                (n.dtlsTransport = i.dtlsTransport);
                        }
                        return t || this.transceivers.push(n), n;
                    }),
                    (u.prototype.addTrack = function (t, r) {
                        if (this._isClosed)
                            throw c(
                                "InvalidStateError",
                                "Attempted to call addTrack on a closed peerconnection."
                            );
                        var n;
                        if (
                            this.transceivers.find(function (e) {
                                return e.track === t;
                            })
                        )
                            throw c(
                                "InvalidAccessError",
                                "Track already exists."
                            );
                        for (var i = 0; i < this.transceivers.length; i++)
                            this.transceivers[i].track ||
                                this.transceivers[i].kind !== t.kind ||
                                (n = this.transceivers[i]);
                        return (
                            n || (n = this._createTransceiver(t.kind)),
                            this._maybeFireNegotiationNeeded(),
                            -1 === this.localStreams.indexOf(r) &&
                                this.localStreams.push(r),
                            (n.track = t),
                            (n.stream = r),
                            (n.rtpSender = new e.RTCRtpSender(
                                t,
                                n.dtlsTransport
                            )),
                            n.rtpSender
                        );
                    }),
                    (u.prototype.addStream = function (e) {
                        var r = this;
                        if (t >= 15025)
                            e.getTracks().forEach(function (t) {
                                r.addTrack(t, e);
                            });
                        else {
                            var n = e.clone();
                            e.getTracks().forEach(function (e, t) {
                                var r = n.getTracks()[t];
                                e.addEventListener("enabled", function (e) {
                                    r.enabled = e.enabled;
                                });
                            }),
                                n.getTracks().forEach(function (e) {
                                    r.addTrack(e, n);
                                });
                        }
                    }),
                    (u.prototype.removeTrack = function (t) {
                        if (this._isClosed)
                            throw c(
                                "InvalidStateError",
                                "Attempted to call removeTrack on a closed peerconnection."
                            );
                        if (!(t instanceof e.RTCRtpSender))
                            throw new TypeError(
                                "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender."
                            );
                        var r = this.transceivers.find(function (e) {
                            return e.rtpSender === t;
                        });
                        if (!r)
                            throw c(
                                "InvalidAccessError",
                                "Sender was not created by this connection."
                            );
                        var n = r.stream;
                        r.rtpSender.stop(),
                            (r.rtpSender = null),
                            (r.track = null),
                            (r.stream = null),
                            -1 ===
                                this.transceivers
                                    .map(function (e) {
                                        return e.stream;
                                    })
                                    .indexOf(n) &&
                                this.localStreams.indexOf(n) > -1 &&
                                this.localStreams.splice(
                                    this.localStreams.indexOf(n),
                                    1
                                ),
                            this._maybeFireNegotiationNeeded();
                    }),
                    (u.prototype.removeStream = function (e) {
                        var t = this;
                        e.getTracks().forEach(function (e) {
                            var r = t.getSenders().find(function (t) {
                                return t.track === e;
                            });
                            r && t.removeTrack(r);
                        });
                    }),
                    (u.prototype.getSenders = function () {
                        return this.transceivers
                            .filter(function (e) {
                                return !!e.rtpSender;
                            })
                            .map(function (e) {
                                return e.rtpSender;
                            });
                    }),
                    (u.prototype.getReceivers = function () {
                        return this.transceivers
                            .filter(function (e) {
                                return !!e.rtpReceiver;
                            })
                            .map(function (e) {
                                return e.rtpReceiver;
                            });
                    }),
                    (u.prototype._createIceGatherer = function (t, r) {
                        var n = this;
                        if (r && t > 0) return this.transceivers[0].iceGatherer;
                        if (this._iceGatherers.length)
                            return this._iceGatherers.shift();
                        var i = new e.RTCIceGatherer({
                            iceServers: this._config.iceServers,
                            gatherPolicy: this._config.iceTransportPolicy,
                        });
                        return (
                            Object.defineProperty(i, "state", {
                                value: "new",
                                writable: !0,
                            }),
                            (this.transceivers[t].bufferedCandidateEvents = []),
                            (this.transceivers[t].bufferCandidates = function (
                                e
                            ) {
                                var r =
                                    !e.candidate ||
                                    0 === Object.keys(e.candidate).length;
                                (i.state = r ? "completed" : "gathering"),
                                    null !==
                                        n.transceivers[t]
                                            .bufferedCandidateEvents &&
                                        n.transceivers[
                                            t
                                        ].bufferedCandidateEvents.push(e);
                            }),
                            i.addEventListener(
                                "localcandidate",
                                this.transceivers[t].bufferCandidates
                            ),
                            i
                        );
                    }),
                    (u.prototype._gather = function (t, r) {
                        var i = this,
                            a = this.transceivers[r].iceGatherer;
                        if (!a.onlocalcandidate) {
                            var o =
                                this.transceivers[r].bufferedCandidateEvents;
                            (this.transceivers[r].bufferedCandidateEvents =
                                null),
                                a.removeEventListener(
                                    "localcandidate",
                                    this.transceivers[r].bufferCandidates
                                ),
                                (a.onlocalcandidate = function (e) {
                                    if (!(i.usingBundle && r > 0)) {
                                        var o = new Event("icecandidate");
                                        o.candidate = {
                                            sdpMid: t,
                                            sdpMLineIndex: r,
                                        };
                                        var s = e.candidate,
                                            c =
                                                !s ||
                                                0 === Object.keys(s).length;
                                        if (c)
                                            ("new" !== a.state &&
                                                "gathering" !== a.state) ||
                                                (a.state = "completed");
                                        else {
                                            "new" === a.state &&
                                                (a.state = "gathering"),
                                                (s.component = 1),
                                                (s.ufrag =
                                                    a.getLocalParameters().usernameFragment);
                                            var d = n.writeCandidate(s);
                                            (o.candidate = Object.assign(
                                                o.candidate,
                                                n.parseCandidate(d)
                                            )),
                                                (o.candidate.candidate = d),
                                                (o.candidate.toJSON =
                                                    function () {
                                                        return {
                                                            candidate:
                                                                o.candidate
                                                                    .candidate,
                                                            sdpMid: o.candidate
                                                                .sdpMid,
                                                            sdpMLineIndex:
                                                                o.candidate
                                                                    .sdpMLineIndex,
                                                            usernameFragment:
                                                                o.candidate
                                                                    .usernameFragment,
                                                        };
                                                    });
                                        }
                                        var u = n.getMediaSections(
                                            i._localDescription.sdp
                                        );
                                        (u[o.candidate.sdpMLineIndex] += c
                                            ? "a=end-of-candidates\r\n"
                                            : "a=" +
                                              o.candidate.candidate +
                                              "\r\n"),
                                            (i._localDescription.sdp =
                                                n.getDescription(
                                                    i._localDescription.sdp
                                                ) + u.join(""));
                                        var l = i.transceivers.every(function (
                                            e
                                        ) {
                                            return (
                                                e.iceGatherer &&
                                                "completed" ===
                                                    e.iceGatherer.state
                                            );
                                        });
                                        "gathering" !== i.iceGatheringState &&
                                            ((i.iceGatheringState =
                                                "gathering"),
                                            i._emitGatheringStateChange()),
                                            c ||
                                                i._dispatchEvent(
                                                    "icecandidate",
                                                    o
                                                ),
                                            l &&
                                                (i._dispatchEvent(
                                                    "icecandidate",
                                                    new Event("icecandidate")
                                                ),
                                                (i.iceGatheringState =
                                                    "complete"),
                                                i._emitGatheringStateChange());
                                    }
                                }),
                                e.setTimeout(function () {
                                    o.forEach(function (e) {
                                        a.onlocalcandidate(e);
                                    });
                                }, 0);
                        }
                    }),
                    (u.prototype._createIceAndDtlsTransports = function () {
                        var t = this,
                            r = new e.RTCIceTransport(null);
                        r.onicestatechange = function () {
                            t._updateIceConnectionState(),
                                t._updateConnectionState();
                        };
                        var n = new e.RTCDtlsTransport(r);
                        return (
                            (n.ondtlsstatechange = function () {
                                t._updateConnectionState();
                            }),
                            (n.onerror = function () {
                                Object.defineProperty(n, "state", {
                                    value: "failed",
                                    writable: !0,
                                }),
                                    t._updateConnectionState();
                            }),
                            { iceTransport: r, dtlsTransport: n }
                        );
                    }),
                    (u.prototype._disposeIceAndDtlsTransports = function (e) {
                        var t = this.transceivers[e].iceGatherer;
                        t &&
                            (delete t.onlocalcandidate,
                            delete this.transceivers[e].iceGatherer);
                        var r = this.transceivers[e].iceTransport;
                        r &&
                            (delete r.onicestatechange,
                            delete this.transceivers[e].iceTransport);
                        var n = this.transceivers[e].dtlsTransport;
                        n &&
                            (delete n.ondtlsstatechange,
                            delete n.onerror,
                            delete this.transceivers[e].dtlsTransport);
                    }),
                    (u.prototype._transceive = function (e, r, i) {
                        var o = a(e.localCapabilities, e.remoteCapabilities);
                        r &&
                            e.rtpSender &&
                            ((o.encodings = e.sendEncodingParameters),
                            (o.rtcp = {
                                cname: n.localCName,
                                compound: e.rtcpParameters.compound,
                            }),
                            e.recvEncodingParameters.length &&
                                (o.rtcp.ssrc =
                                    e.recvEncodingParameters[0].ssrc),
                            e.rtpSender.send(o)),
                            i &&
                                e.rtpReceiver &&
                                o.codecs.length > 0 &&
                                ("video" === e.kind &&
                                    e.recvEncodingParameters &&
                                    t < 15019 &&
                                    e.recvEncodingParameters.forEach(function (
                                        e
                                    ) {
                                        delete e.rtx;
                                    }),
                                e.recvEncodingParameters.length
                                    ? (o.encodings = e.recvEncodingParameters)
                                    : (o.encodings = [{}]),
                                (o.rtcp = {
                                    compound: e.rtcpParameters.compound,
                                }),
                                e.rtcpParameters.cname &&
                                    (o.rtcp.cname = e.rtcpParameters.cname),
                                e.sendEncodingParameters.length &&
                                    (o.rtcp.ssrc =
                                        e.sendEncodingParameters[0].ssrc),
                                e.rtpReceiver.receive(o));
                    }),
                    (u.prototype.setLocalDescription = function (e) {
                        var t,
                            r,
                            i = this;
                        if (-1 === ["offer", "answer"].indexOf(e.type))
                            return Promise.reject(
                                c(
                                    "TypeError",
                                    'Unsupported type "' + e.type + '"'
                                )
                            );
                        if (
                            !o(
                                "setLocalDescription",
                                e.type,
                                i.signalingState
                            ) ||
                            i._isClosed
                        )
                            return Promise.reject(
                                c(
                                    "InvalidStateError",
                                    "Can not set local " +
                                        e.type +
                                        " in state " +
                                        i.signalingState
                                )
                            );
                        if ("offer" === e.type)
                            (t = n.splitSections(e.sdp)),
                                (r = t.shift()),
                                t.forEach(function (e, t) {
                                    var r = n.parseRtpParameters(e);
                                    i.transceivers[t].localCapabilities = r;
                                }),
                                i.transceivers.forEach(function (e, t) {
                                    i._gather(e.mid, t);
                                });
                        else if ("answer" === e.type) {
                            (t = n.splitSections(i._remoteDescription.sdp)),
                                (r = t.shift());
                            var s = n.matchPrefix(r, "a=ice-lite").length > 0;
                            t.forEach(function (e, t) {
                                var o = i.transceivers[t],
                                    c = o.iceGatherer,
                                    d = o.iceTransport,
                                    u = o.dtlsTransport,
                                    l = o.localCapabilities,
                                    p = o.remoteCapabilities;
                                if (
                                    !(
                                        n.isRejected(e) &&
                                        0 ===
                                            n.matchPrefix(e, "a=bundle-only")
                                                .length
                                    ) &&
                                    !o.rejected
                                ) {
                                    var f = n.getIceParameters(e, r),
                                        m = n.getDtlsParameters(e, r);
                                    s && (m.role = "server"),
                                        (i.usingBundle && 0 !== t) ||
                                            (i._gather(o.mid, t),
                                            "new" === d.state &&
                                                d.start(
                                                    c,
                                                    f,
                                                    s
                                                        ? "controlling"
                                                        : "controlled"
                                                ),
                                            "new" === u.state && u.start(m));
                                    var v = a(l, p);
                                    i._transceive(o, v.codecs.length > 0, !1);
                                }
                            });
                        }
                        return (
                            (i._localDescription = {
                                type: e.type,
                                sdp: e.sdp,
                            }),
                            "offer" === e.type
                                ? i._updateSignalingState("have-local-offer")
                                : i._updateSignalingState("stable"),
                            Promise.resolve()
                        );
                    }),
                    (u.prototype.setRemoteDescription = function (i) {
                        var u = this;
                        if (-1 === ["offer", "answer"].indexOf(i.type))
                            return Promise.reject(
                                c(
                                    "TypeError",
                                    'Unsupported type "' + i.type + '"'
                                )
                            );
                        if (
                            !o(
                                "setRemoteDescription",
                                i.type,
                                u.signalingState
                            ) ||
                            u._isClosed
                        )
                            return Promise.reject(
                                c(
                                    "InvalidStateError",
                                    "Can not set remote " +
                                        i.type +
                                        " in state " +
                                        u.signalingState
                                )
                            );
                        var l = {};
                        u.remoteStreams.forEach(function (e) {
                            l[e.id] = e;
                        });
                        var p = [],
                            f = n.splitSections(i.sdp),
                            m = f.shift(),
                            v = n.matchPrefix(m, "a=ice-lite").length > 0,
                            h = n.matchPrefix(m, "a=group:BUNDLE ").length > 0;
                        u.usingBundle = h;
                        var g = n.matchPrefix(m, "a=ice-options:")[0];
                        return (
                            (u.canTrickleIceCandidates =
                                !!g &&
                                g.substr(14).split(" ").indexOf("trickle") >=
                                    0),
                            f.forEach(function (o, c) {
                                var d = n.splitLines(o),
                                    f = n.getKind(o),
                                    g =
                                        n.isRejected(o) &&
                                        0 ===
                                            n.matchPrefix(o, "a=bundle-only")
                                                .length,
                                    y = d[0].substr(2).split(" ")[2],
                                    S = n.getDirection(o, m),
                                    C = n.parseMsid(o),
                                    T = n.getMid(o) || n.generateIdentifier();
                                if (
                                    g ||
                                    ("application" === f &&
                                        ("DTLS/SCTP" === y ||
                                            "UDP/DTLS/SCTP" === y))
                                )
                                    u.transceivers[c] = {
                                        mid: T,
                                        kind: f,
                                        protocol: y,
                                        rejected: !0,
                                    };
                                else {
                                    var b, k, w, R, P, E, D, x, _;
                                    !g &&
                                        u.transceivers[c] &&
                                        u.transceivers[c].rejected &&
                                        (u.transceivers[c] =
                                            u._createTransceiver(f, !0));
                                    var M,
                                        O,
                                        I = n.parseRtpParameters(o);
                                    g ||
                                        ((M = n.getIceParameters(o, m)),
                                        ((O = n.getDtlsParameters(o, m)).role =
                                            "client")),
                                        (D = n.parseRtpEncodingParameters(o));
                                    var L = n.parseRtcpParameters(o),
                                        A =
                                            n.matchPrefix(
                                                o,
                                                "a=end-of-candidates",
                                                m
                                            ).length > 0,
                                        j = n
                                            .matchPrefix(o, "a=candidate:")
                                            .map(function (e) {
                                                return n.parseCandidate(e);
                                            })
                                            .filter(function (e) {
                                                return 1 === e.component;
                                            });
                                    if (
                                        (("offer" === i.type ||
                                            "answer" === i.type) &&
                                            !g &&
                                            h &&
                                            c > 0 &&
                                            u.transceivers[c] &&
                                            (u._disposeIceAndDtlsTransports(c),
                                            (u.transceivers[c].iceGatherer =
                                                u.transceivers[0].iceGatherer),
                                            (u.transceivers[c].iceTransport =
                                                u.transceivers[0].iceTransport),
                                            (u.transceivers[c].dtlsTransport =
                                                u.transceivers[0].dtlsTransport),
                                            u.transceivers[c].rtpSender &&
                                                u.transceivers[
                                                    c
                                                ].rtpSender.setTransport(
                                                    u.transceivers[0]
                                                        .dtlsTransport
                                                ),
                                            u.transceivers[c].rtpReceiver &&
                                                u.transceivers[
                                                    c
                                                ].rtpReceiver.setTransport(
                                                    u.transceivers[0]
                                                        .dtlsTransport
                                                )),
                                        "offer" !== i.type || g)
                                    ) {
                                        if ("answer" === i.type && !g) {
                                            (k = (b = u.transceivers[c])
                                                .iceGatherer),
                                                (w = b.iceTransport),
                                                (R = b.dtlsTransport),
                                                (P = b.rtpReceiver),
                                                (E = b.sendEncodingParameters),
                                                (x = b.localCapabilities),
                                                (u.transceivers[
                                                    c
                                                ].recvEncodingParameters = D),
                                                (u.transceivers[
                                                    c
                                                ].remoteCapabilities = I),
                                                (u.transceivers[
                                                    c
                                                ].rtcpParameters = L),
                                                j.length &&
                                                    "new" === w.state &&
                                                    ((!v && !A) ||
                                                    (h && 0 !== c)
                                                        ? j.forEach(function (
                                                              e
                                                          ) {
                                                              s(
                                                                  b.iceTransport,
                                                                  e
                                                              );
                                                          })
                                                        : w.setRemoteCandidates(
                                                              j
                                                          )),
                                                (h && 0 !== c) ||
                                                    ("new" === w.state &&
                                                        w.start(
                                                            k,
                                                            M,
                                                            "controlling"
                                                        ),
                                                    "new" === R.state &&
                                                        R.start(O)),
                                                !a(
                                                    b.localCapabilities,
                                                    b.remoteCapabilities
                                                ).codecs.filter(function (e) {
                                                    return (
                                                        "rtx" ===
                                                        e.name.toLowerCase()
                                                    );
                                                }).length &&
                                                    b.sendEncodingParameters[0]
                                                        .rtx &&
                                                    delete b
                                                        .sendEncodingParameters[0]
                                                        .rtx,
                                                u._transceive(
                                                    b,
                                                    "sendrecv" === S ||
                                                        "recvonly" === S,
                                                    "sendrecv" === S ||
                                                        "sendonly" === S
                                                ),
                                                !P ||
                                                ("sendrecv" !== S &&
                                                    "sendonly" !== S)
                                                    ? delete b.rtpReceiver
                                                    : ((_ = P.track),
                                                      C
                                                          ? (l[C.stream] ||
                                                                (l[C.stream] =
                                                                    new e.MediaStream()),
                                                            r(_, l[C.stream]),
                                                            p.push([
                                                                _,
                                                                P,
                                                                l[C.stream],
                                                            ]))
                                                          : (l.default ||
                                                                (l.default =
                                                                    new e.MediaStream()),
                                                            r(_, l.default),
                                                            p.push([
                                                                _,
                                                                P,
                                                                l.default,
                                                            ])));
                                        }
                                    } else {
                                        ((b =
                                            u.transceivers[c] ||
                                            u._createTransceiver(f)).mid = T),
                                            b.iceGatherer ||
                                                (b.iceGatherer =
                                                    u._createIceGatherer(c, h)),
                                            j.length &&
                                                "new" ===
                                                    b.iceTransport.state &&
                                                (!A || (h && 0 !== c)
                                                    ? j.forEach(function (e) {
                                                          s(b.iceTransport, e);
                                                      })
                                                    : b.iceTransport.setRemoteCandidates(
                                                          j
                                                      )),
                                            (x =
                                                e.RTCRtpReceiver.getCapabilities(
                                                    f
                                                )),
                                            t < 15019 &&
                                                (x.codecs = x.codecs.filter(
                                                    function (e) {
                                                        return "rtx" !== e.name;
                                                    }
                                                )),
                                            (E = b.sendEncodingParameters || [
                                                { ssrc: 1001 * (2 * c + 2) },
                                            ]);
                                        var N,
                                            G = !1;
                                        if (
                                            "sendrecv" === S ||
                                            "sendonly" === S
                                        ) {
                                            if (
                                                ((G = !b.rtpReceiver),
                                                (P =
                                                    b.rtpReceiver ||
                                                    new e.RTCRtpReceiver(
                                                        b.dtlsTransport,
                                                        f
                                                    )),
                                                G)
                                            )
                                                (_ = P.track),
                                                    (C && "-" === C.stream) ||
                                                        (C
                                                            ? (l[C.stream] ||
                                                                  ((l[
                                                                      C.stream
                                                                  ] =
                                                                      new e.MediaStream()),
                                                                  Object.defineProperty(
                                                                      l[
                                                                          C
                                                                              .stream
                                                                      ],
                                                                      "id",
                                                                      {
                                                                          get: function () {
                                                                              return C.stream;
                                                                          },
                                                                      }
                                                                  )),
                                                              Object.defineProperty(
                                                                  _,
                                                                  "id",
                                                                  {
                                                                      get: function () {
                                                                          return C.track;
                                                                      },
                                                                  }
                                                              ),
                                                              (N = l[C.stream]))
                                                            : (l.default ||
                                                                  (l.default =
                                                                      new e.MediaStream()),
                                                              (N = l.default))),
                                                    N &&
                                                        (r(_, N),
                                                        b.associatedRemoteMediaStreams.push(
                                                            N
                                                        )),
                                                    p.push([_, P, N]);
                                        } else
                                            b.rtpReceiver &&
                                                b.rtpReceiver.track &&
                                                (b.associatedRemoteMediaStreams.forEach(
                                                    function (t) {
                                                        var r = t
                                                            .getTracks()
                                                            .find(function (e) {
                                                                return (
                                                                    e.id ===
                                                                    b
                                                                        .rtpReceiver
                                                                        .track
                                                                        .id
                                                                );
                                                            });
                                                        r &&
                                                            (function (t, r) {
                                                                r.removeTrack(
                                                                    t
                                                                ),
                                                                    r.dispatchEvent(
                                                                        new e.MediaStreamTrackEvent(
                                                                            "removetrack",
                                                                            {
                                                                                track: t,
                                                                            }
                                                                        )
                                                                    );
                                                            })(r, t);
                                                    }
                                                ),
                                                (b.associatedRemoteMediaStreams =
                                                    []));
                                        (b.localCapabilities = x),
                                            (b.remoteCapabilities = I),
                                            (b.rtpReceiver = P),
                                            (b.rtcpParameters = L),
                                            (b.sendEncodingParameters = E),
                                            (b.recvEncodingParameters = D),
                                            u._transceive(
                                                u.transceivers[c],
                                                !1,
                                                G
                                            );
                                    }
                                }
                            }),
                            void 0 === u._dtlsRole &&
                                (u._dtlsRole =
                                    "offer" === i.type ? "active" : "passive"),
                            (u._remoteDescription = {
                                type: i.type,
                                sdp: i.sdp,
                            }),
                            "offer" === i.type
                                ? u._updateSignalingState("have-remote-offer")
                                : u._updateSignalingState("stable"),
                            Object.keys(l).forEach(function (t) {
                                var r = l[t];
                                if (r.getTracks().length) {
                                    if (-1 === u.remoteStreams.indexOf(r)) {
                                        u.remoteStreams.push(r);
                                        var n = new Event("addstream");
                                        (n.stream = r),
                                            e.setTimeout(function () {
                                                u._dispatchEvent(
                                                    "addstream",
                                                    n
                                                );
                                            });
                                    }
                                    p.forEach(function (e) {
                                        var t = e[0],
                                            n = e[1];
                                        r.id === e[2].id && d(u, t, n, [r]);
                                    });
                                }
                            }),
                            p.forEach(function (e) {
                                e[2] || d(u, e[0], e[1], []);
                            }),
                            e.setTimeout(function () {
                                u &&
                                    u.transceivers &&
                                    u.transceivers.forEach(function (e) {
                                        e.iceTransport &&
                                            "new" === e.iceTransport.state &&
                                            e.iceTransport.getRemoteCandidates()
                                                .length > 0 &&
                                            (console.warn(
                                                "Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"
                                            ),
                                            e.iceTransport.addRemoteCandidate(
                                                {}
                                            ));
                                    });
                            }, 4e3),
                            Promise.resolve()
                        );
                    }),
                    (u.prototype.close = function () {
                        this.transceivers.forEach(function (e) {
                            e.iceTransport && e.iceTransport.stop(),
                                e.dtlsTransport && e.dtlsTransport.stop(),
                                e.rtpSender && e.rtpSender.stop(),
                                e.rtpReceiver && e.rtpReceiver.stop();
                        }),
                            (this._isClosed = !0),
                            this._updateSignalingState("closed");
                    }),
                    (u.prototype._updateSignalingState = function (e) {
                        this.signalingState = e;
                        var t = new Event("signalingstatechange");
                        this._dispatchEvent("signalingstatechange", t);
                    }),
                    (u.prototype._maybeFireNegotiationNeeded = function () {
                        var t = this;
                        "stable" === this.signalingState &&
                            !0 !== this.needNegotiation &&
                            ((this.needNegotiation = !0),
                            e.setTimeout(function () {
                                if (t.needNegotiation) {
                                    t.needNegotiation = !1;
                                    var e = new Event("negotiationneeded");
                                    t._dispatchEvent("negotiationneeded", e);
                                }
                            }, 0));
                    }),
                    (u.prototype._updateIceConnectionState = function () {
                        var e,
                            t = {
                                new: 0,
                                closed: 0,
                                checking: 0,
                                connected: 0,
                                completed: 0,
                                disconnected: 0,
                                failed: 0,
                            };
                        if (
                            (this.transceivers.forEach(function (e) {
                                e.iceTransport &&
                                    !e.rejected &&
                                    t[e.iceTransport.state]++;
                            }),
                            (e = "new"),
                            t.failed > 0
                                ? (e = "failed")
                                : t.checking > 0
                                ? (e = "checking")
                                : t.disconnected > 0
                                ? (e = "disconnected")
                                : t.new > 0
                                ? (e = "new")
                                : t.connected > 0
                                ? (e = "connected")
                                : t.completed > 0 && (e = "completed"),
                            e !== this.iceConnectionState)
                        ) {
                            this.iceConnectionState = e;
                            var r = new Event("iceconnectionstatechange");
                            this._dispatchEvent("iceconnectionstatechange", r);
                        }
                    }),
                    (u.prototype._updateConnectionState = function () {
                        var e,
                            t = {
                                new: 0,
                                closed: 0,
                                connecting: 0,
                                connected: 0,
                                completed: 0,
                                disconnected: 0,
                                failed: 0,
                            };
                        if (
                            (this.transceivers.forEach(function (e) {
                                e.iceTransport &&
                                    e.dtlsTransport &&
                                    !e.rejected &&
                                    (t[e.iceTransport.state]++,
                                    t[e.dtlsTransport.state]++);
                            }),
                            (t.connected += t.completed),
                            (e = "new"),
                            t.failed > 0
                                ? (e = "failed")
                                : t.connecting > 0
                                ? (e = "connecting")
                                : t.disconnected > 0
                                ? (e = "disconnected")
                                : t.new > 0
                                ? (e = "new")
                                : t.connected > 0 && (e = "connected"),
                            e !== this.connectionState)
                        ) {
                            this.connectionState = e;
                            var r = new Event("connectionstatechange");
                            this._dispatchEvent("connectionstatechange", r);
                        }
                    }),
                    (u.prototype.createOffer = function () {
                        var r = this;
                        if (r._isClosed)
                            return Promise.reject(
                                c(
                                    "InvalidStateError",
                                    "Can not call createOffer after close"
                                )
                            );
                        var a = r.transceivers.filter(function (e) {
                                return "audio" === e.kind;
                            }).length,
                            o = r.transceivers.filter(function (e) {
                                return "video" === e.kind;
                            }).length,
                            s = arguments[0];
                        if (s) {
                            if (s.mandatory || s.optional)
                                throw new TypeError(
                                    "Legacy mandatory/optional constraints not supported."
                                );
                            void 0 !== s.offerToReceiveAudio &&
                                (a =
                                    !0 === s.offerToReceiveAudio
                                        ? 1
                                        : !1 === s.offerToReceiveAudio
                                        ? 0
                                        : s.offerToReceiveAudio),
                                void 0 !== s.offerToReceiveVideo &&
                                    (o =
                                        !0 === s.offerToReceiveVideo
                                            ? 1
                                            : !1 === s.offerToReceiveVideo
                                            ? 0
                                            : s.offerToReceiveVideo);
                        }
                        for (
                            r.transceivers.forEach(function (e) {
                                "audio" === e.kind
                                    ? --a < 0 && (e.wantReceive = !1)
                                    : "video" === e.kind &&
                                      --o < 0 &&
                                      (e.wantReceive = !1);
                            });
                            a > 0 || o > 0;

                        )
                            a > 0 && (r._createTransceiver("audio"), a--),
                                o > 0 && (r._createTransceiver("video"), o--);
                        var d = n.writeSessionBoilerplate(
                            r._sdpSessionId,
                            r._sdpSessionVersion++
                        );
                        r.transceivers.forEach(function (i, a) {
                            var o = i.track,
                                s = i.kind,
                                c = i.mid || n.generateIdentifier();
                            (i.mid = c),
                                i.iceGatherer ||
                                    (i.iceGatherer = r._createIceGatherer(
                                        a,
                                        r.usingBundle
                                    ));
                            var d = e.RTCRtpSender.getCapabilities(s);
                            t < 15019 &&
                                (d.codecs = d.codecs.filter(function (e) {
                                    return "rtx" !== e.name;
                                })),
                                d.codecs.forEach(function (e) {
                                    "H264" === e.name &&
                                        void 0 ===
                                            e.parameters[
                                                "level-asymmetry-allowed"
                                            ] &&
                                        (e.parameters[
                                            "level-asymmetry-allowed"
                                        ] = "1"),
                                        i.remoteCapabilities &&
                                            i.remoteCapabilities.codecs &&
                                            i.remoteCapabilities.codecs.forEach(
                                                function (t) {
                                                    e.name.toLowerCase() ===
                                                        t.name.toLowerCase() &&
                                                        e.clockRate ===
                                                            t.clockRate &&
                                                        (e.preferredPayloadType =
                                                            t.payloadType);
                                                }
                                            );
                                }),
                                d.headerExtensions.forEach(function (e) {
                                    (
                                        (i.remoteCapabilities &&
                                            i.remoteCapabilities
                                                .headerExtensions) ||
                                        []
                                    ).forEach(function (t) {
                                        e.uri === t.uri && (e.id = t.id);
                                    });
                                });
                            var u = i.sendEncodingParameters || [
                                { ssrc: 1001 * (2 * a + 1) },
                            ];
                            o &&
                                t >= 15019 &&
                                "video" === s &&
                                !u[0].rtx &&
                                (u[0].rtx = { ssrc: u[0].ssrc + 1 }),
                                i.wantReceive &&
                                    (i.rtpReceiver = new e.RTCRtpReceiver(
                                        i.dtlsTransport,
                                        s
                                    )),
                                (i.localCapabilities = d),
                                (i.sendEncodingParameters = u);
                        }),
                            "max-compat" !== r._config.bundlePolicy &&
                                (d +=
                                    "a=group:BUNDLE " +
                                    r.transceivers
                                        .map(function (e) {
                                            return e.mid;
                                        })
                                        .join(" ") +
                                    "\r\n"),
                            (d += "a=ice-options:trickle\r\n"),
                            r.transceivers.forEach(function (e, t) {
                                (d += i(
                                    e,
                                    e.localCapabilities,
                                    "offer",
                                    e.stream,
                                    r._dtlsRole
                                )),
                                    (d += "a=rtcp-rsize\r\n"),
                                    !e.iceGatherer ||
                                        "new" === r.iceGatheringState ||
                                        (0 !== t && r.usingBundle) ||
                                        (e.iceGatherer
                                            .getLocalCandidates()
                                            .forEach(function (e) {
                                                (e.component = 1),
                                                    (d +=
                                                        "a=" +
                                                        n.writeCandidate(e) +
                                                        "\r\n");
                                            }),
                                        "completed" === e.iceGatherer.state &&
                                            (d += "a=end-of-candidates\r\n"));
                            });
                        var u = new e.RTCSessionDescription({
                            type: "offer",
                            sdp: d,
                        });
                        return Promise.resolve(u);
                    }),
                    (u.prototype.createAnswer = function () {
                        var r = this;
                        if (r._isClosed)
                            return Promise.reject(
                                c(
                                    "InvalidStateError",
                                    "Can not call createAnswer after close"
                                )
                            );
                        if (
                            "have-remote-offer" !== r.signalingState &&
                            "have-local-pranswer" !== r.signalingState
                        )
                            return Promise.reject(
                                c(
                                    "InvalidStateError",
                                    "Can not call createAnswer in signalingState " +
                                        r.signalingState
                                )
                            );
                        var o = n.writeSessionBoilerplate(
                            r._sdpSessionId,
                            r._sdpSessionVersion++
                        );
                        r.usingBundle &&
                            (o +=
                                "a=group:BUNDLE " +
                                r.transceivers
                                    .map(function (e) {
                                        return e.mid;
                                    })
                                    .join(" ") +
                                "\r\n"),
                            (o += "a=ice-options:trickle\r\n");
                        var s = n.getMediaSections(
                            r._remoteDescription.sdp
                        ).length;
                        r.transceivers.forEach(function (e, n) {
                            if (!(n + 1 > s)) {
                                if (e.rejected)
                                    return (
                                        "application" === e.kind
                                            ? "DTLS/SCTP" === e.protocol
                                                ? (o +=
                                                      "m=application 0 DTLS/SCTP 5000\r\n")
                                                : (o +=
                                                      "m=application 0 " +
                                                      e.protocol +
                                                      " webrtc-datachannel\r\n")
                                            : "audio" === e.kind
                                            ? (o +=
                                                  "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n")
                                            : "video" === e.kind &&
                                              (o +=
                                                  "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                                        void (o +=
                                            "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" +
                                            e.mid +
                                            "\r\n")
                                    );
                                var c;
                                if (e.stream)
                                    "audio" === e.kind
                                        ? (c = e.stream.getAudioTracks()[0])
                                        : "video" === e.kind &&
                                          (c = e.stream.getVideoTracks()[0]),
                                        c &&
                                            t >= 15019 &&
                                            "video" === e.kind &&
                                            !e.sendEncodingParameters[0].rtx &&
                                            (e.sendEncodingParameters[0].rtx = {
                                                ssrc:
                                                    e.sendEncodingParameters[0]
                                                        .ssrc + 1,
                                            });
                                var d = a(
                                    e.localCapabilities,
                                    e.remoteCapabilities
                                );
                                !d.codecs.filter(function (e) {
                                    return "rtx" === e.name.toLowerCase();
                                }).length &&
                                    e.sendEncodingParameters[0].rtx &&
                                    delete e.sendEncodingParameters[0].rtx,
                                    (o += i(
                                        e,
                                        d,
                                        "answer",
                                        e.stream,
                                        r._dtlsRole
                                    )),
                                    e.rtcpParameters &&
                                        e.rtcpParameters.reducedSize &&
                                        (o += "a=rtcp-rsize\r\n");
                            }
                        });
                        var d = new e.RTCSessionDescription({
                            type: "answer",
                            sdp: o,
                        });
                        return Promise.resolve(d);
                    }),
                    (u.prototype.addIceCandidate = function (e) {
                        var t,
                            r = this;
                        return e && void 0 === e.sdpMLineIndex && !e.sdpMid
                            ? Promise.reject(
                                  new TypeError(
                                      "sdpMLineIndex or sdpMid required"
                                  )
                              )
                            : new Promise(function (i, a) {
                                  if (!r._remoteDescription)
                                      return a(
                                          c(
                                              "InvalidStateError",
                                              "Can not add ICE candidate without a remote description"
                                          )
                                      );
                                  if (e && "" !== e.candidate) {
                                      var o = e.sdpMLineIndex;
                                      if (e.sdpMid)
                                          for (
                                              var d = 0;
                                              d < r.transceivers.length;
                                              d++
                                          )
                                              if (
                                                  r.transceivers[d].mid ===
                                                  e.sdpMid
                                              ) {
                                                  o = d;
                                                  break;
                                              }
                                      var u = r.transceivers[o];
                                      if (!u)
                                          return a(
                                              c(
                                                  "OperationError",
                                                  "Can not add ICE candidate"
                                              )
                                          );
                                      if (u.rejected) return i();
                                      var l =
                                          Object.keys(e.candidate).length > 0
                                              ? n.parseCandidate(e.candidate)
                                              : {};
                                      if (
                                          "tcp" === l.protocol &&
                                          (0 === l.port || 9 === l.port)
                                      )
                                          return i();
                                      if (l.component && 1 !== l.component)
                                          return i();
                                      if (
                                          (0 === o ||
                                              (o > 0 &&
                                                  u.iceTransport !==
                                                      r.transceivers[0]
                                                          .iceTransport)) &&
                                          !s(u.iceTransport, l)
                                      )
                                          return a(
                                              c(
                                                  "OperationError",
                                                  "Can not add ICE candidate"
                                              )
                                          );
                                      var p = e.candidate.trim();
                                      0 === p.indexOf("a=") &&
                                          (p = p.substr(2)),
                                          ((t = n.getMediaSections(
                                              r._remoteDescription.sdp
                                          ))[o] +=
                                              "a=" +
                                              (l.type
                                                  ? p
                                                  : "end-of-candidates") +
                                              "\r\n"),
                                          (r._remoteDescription.sdp =
                                              n.getDescription(
                                                  r._remoteDescription.sdp
                                              ) + t.join(""));
                                  } else for (var f = 0; f < r.transceivers.length && (r.transceivers[f].rejected || (r.transceivers[f].iceTransport.addRemoteCandidate({}), ((t = n.getMediaSections(r._remoteDescription.sdp))[f] += "a=end-of-candidates\r\n"), (r._remoteDescription.sdp = n.getDescription(r._remoteDescription.sdp) + t.join("")), !r.usingBundle)); f++);
                                  i();
                              });
                    }),
                    (u.prototype.getStats = function (t) {
                        if (t && t instanceof e.MediaStreamTrack) {
                            var r = null;
                            if (
                                (this.transceivers.forEach(function (e) {
                                    e.rtpSender && e.rtpSender.track === t
                                        ? (r = e.rtpSender)
                                        : e.rtpReceiver &&
                                          e.rtpReceiver.track === t &&
                                          (r = e.rtpReceiver);
                                }),
                                !r)
                            )
                                throw c(
                                    "InvalidAccessError",
                                    "Invalid selector."
                                );
                            return r.getStats();
                        }
                        var n = [];
                        return (
                            this.transceivers.forEach(function (e) {
                                [
                                    "rtpSender",
                                    "rtpReceiver",
                                    "iceGatherer",
                                    "iceTransport",
                                    "dtlsTransport",
                                ].forEach(function (t) {
                                    e[t] && n.push(e[t].getStats());
                                });
                            }),
                            Promise.all(n).then(function (e) {
                                var t = new Map();
                                return (
                                    e.forEach(function (e) {
                                        e.forEach(function (e) {
                                            t.set(e.id, e);
                                        });
                                    }),
                                    t
                                );
                            })
                        );
                    });
                [
                    "RTCRtpSender",
                    "RTCRtpReceiver",
                    "RTCIceGatherer",
                    "RTCIceTransport",
                    "RTCDtlsTransport",
                ].forEach(function (t) {
                    var r = e[t];
                    if (r && r.prototype && r.prototype.getStats) {
                        var n = r.prototype.getStats;
                        r.prototype.getStats = function () {
                            return n.apply(this).then(function (e) {
                                var t = new Map();
                                return (
                                    Object.keys(e).forEach(function (r) {
                                        var n;
                                        (e[r].type =
                                            {
                                                inboundrtp: "inbound-rtp",
                                                outboundrtp: "outbound-rtp",
                                                candidatepair: "candidate-pair",
                                                localcandidate:
                                                    "local-candidate",
                                                remotecandidate:
                                                    "remote-candidate",
                                            }[(n = e[r]).type] || n.type),
                                            t.set(r, e[r]);
                                    }),
                                    t
                                );
                            });
                        };
                    }
                });
                var l = ["createOffer", "createAnswer"];
                return (
                    l.forEach(function (e) {
                        var t = u.prototype[e];
                        u.prototype[e] = function () {
                            var e = arguments;
                            return "function" == typeof e[0] ||
                                "function" == typeof e[1]
                                ? t.apply(this, [arguments[2]]).then(
                                      function (t) {
                                          "function" == typeof e[0] &&
                                              e[0].apply(null, [t]);
                                      },
                                      function (t) {
                                          "function" == typeof e[1] &&
                                              e[1].apply(null, [t]);
                                      }
                                  )
                                : t.apply(this, arguments);
                        };
                    }),
                    (l = [
                        "setLocalDescription",
                        "setRemoteDescription",
                        "addIceCandidate",
                    ]).forEach(function (e) {
                        var t = u.prototype[e];
                        u.prototype[e] = function () {
                            var e = arguments;
                            return "function" == typeof e[1] ||
                                "function" == typeof e[2]
                                ? t.apply(this, arguments).then(
                                      function () {
                                          "function" == typeof e[1] &&
                                              e[1].apply(null);
                                      },
                                      function (t) {
                                          "function" == typeof e[2] &&
                                              e[2].apply(null, [t]);
                                      }
                                  )
                                : t.apply(this, arguments);
                        };
                    }),
                    ["getStats"].forEach(function (e) {
                        var t = u.prototype[e];
                        u.prototype[e] = function () {
                            var e = arguments;
                            return "function" == typeof e[1]
                                ? t.apply(this, arguments).then(function () {
                                      "function" == typeof e[1] &&
                                          e[1].apply(null);
                                  })
                                : t.apply(this, arguments);
                        };
                    }),
                    u
                );
            };
        },
        function (e, t, r) {
            "use strict";
            e.exports = function (e) {
                var t = e && e.navigator,
                    r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
                t.mediaDevices.getUserMedia = function (e) {
                    return r(e).catch(function (e) {
                        return Promise.reject(
                            (function (e) {
                                return {
                                    name:
                                        {
                                            PermissionDeniedError:
                                                "NotAllowedError",
                                        }[e.name] || e.name,
                                    message: e.message,
                                    constraint: e.constraint,
                                    toString: function () {
                                        return this.name;
                                    },
                                };
                            })(e)
                        );
                    });
                };
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(1);
            e.exports = {
                shimGetUserMedia: r(14),
                shimOnTrack: function (e) {
                    "object" == typeof e &&
                        e.RTCPeerConnection &&
                        !("ontrack" in e.RTCPeerConnection.prototype) &&
                        Object.defineProperty(
                            e.RTCPeerConnection.prototype,
                            "ontrack",
                            {
                                get: function () {
                                    return this._ontrack;
                                },
                                set: function (e) {
                                    this._ontrack &&
                                        (this.removeEventListener(
                                            "track",
                                            this._ontrack
                                        ),
                                        this.removeEventListener(
                                            "addstream",
                                            this._ontrackpoly
                                        )),
                                        this.addEventListener(
                                            "track",
                                            (this._ontrack = e)
                                        ),
                                        this.addEventListener(
                                            "addstream",
                                            (this._ontrackpoly = function (e) {
                                                e.stream.getTracks().forEach(
                                                    function (t) {
                                                        var r = new Event(
                                                            "track"
                                                        );
                                                        (r.track = t),
                                                            (r.receiver = {
                                                                track: t,
                                                            }),
                                                            (r.transceiver = {
                                                                receiver:
                                                                    r.receiver,
                                                            }),
                                                            (r.streams = [
                                                                e.stream,
                                                            ]),
                                                            this.dispatchEvent(
                                                                r
                                                            );
                                                    }.bind(this)
                                                );
                                            }.bind(this))
                                        );
                                },
                                enumerable: !0,
                                configurable: !0,
                            }
                        ),
                        "object" == typeof e &&
                            e.RTCTrackEvent &&
                            "receiver" in e.RTCTrackEvent.prototype &&
                            !("transceiver" in e.RTCTrackEvent.prototype) &&
                            Object.defineProperty(
                                e.RTCTrackEvent.prototype,
                                "transceiver",
                                {
                                    get: function () {
                                        return { receiver: this.receiver };
                                    },
                                }
                            );
                },
                shimSourceObject: function (e) {
                    "object" == typeof e &&
                        e.HTMLMediaElement &&
                        !("srcObject" in e.HTMLMediaElement.prototype) &&
                        Object.defineProperty(
                            e.HTMLMediaElement.prototype,
                            "srcObject",
                            {
                                get: function () {
                                    return this.mozSrcObject;
                                },
                                set: function (e) {
                                    this.mozSrcObject = e;
                                },
                            }
                        );
                },
                shimPeerConnection: function (e) {
                    var t = n.detectBrowser(e);
                    if (
                        "object" == typeof e &&
                        (e.RTCPeerConnection || e.mozRTCPeerConnection)
                    ) {
                        e.RTCPeerConnection ||
                            ((e.RTCPeerConnection = function (r, n) {
                                if (t.version < 38 && r && r.iceServers) {
                                    for (
                                        var i = [], a = 0;
                                        a < r.iceServers.length;
                                        a++
                                    ) {
                                        var o = r.iceServers[a];
                                        if (o.hasOwnProperty("urls"))
                                            for (
                                                var s = 0;
                                                s < o.urls.length;
                                                s++
                                            ) {
                                                var c = { url: o.urls[s] };
                                                0 ===
                                                    o.urls[s].indexOf("turn") &&
                                                    ((c.username = o.username),
                                                    (c.credential =
                                                        o.credential)),
                                                    i.push(c);
                                            }
                                        else i.push(r.iceServers[a]);
                                    }
                                    r.iceServers = i;
                                }
                                return new e.mozRTCPeerConnection(r, n);
                            }),
                            (e.RTCPeerConnection.prototype =
                                e.mozRTCPeerConnection.prototype),
                            e.mozRTCPeerConnection.generateCertificate &&
                                Object.defineProperty(
                                    e.RTCPeerConnection,
                                    "generateCertificate",
                                    {
                                        get: function () {
                                            return e.mozRTCPeerConnection
                                                .generateCertificate;
                                        },
                                    }
                                ),
                            (e.RTCSessionDescription =
                                e.mozRTCSessionDescription),
                            (e.RTCIceCandidate = e.mozRTCIceCandidate)),
                            [
                                "setLocalDescription",
                                "setRemoteDescription",
                                "addIceCandidate",
                            ].forEach(function (t) {
                                var r = e.RTCPeerConnection.prototype[t];
                                e.RTCPeerConnection.prototype[t] = function () {
                                    return (
                                        (arguments[0] = new (
                                            "addIceCandidate" === t
                                                ? e.RTCIceCandidate
                                                : e.RTCSessionDescription
                                        )(arguments[0])),
                                        r.apply(this, arguments)
                                    );
                                };
                            });
                        var r = e.RTCPeerConnection.prototype.addIceCandidate;
                        e.RTCPeerConnection.prototype.addIceCandidate =
                            function () {
                                return arguments[0]
                                    ? r.apply(this, arguments)
                                    : (arguments[1] && arguments[1].apply(null),
                                      Promise.resolve());
                            };
                        var i = {
                                inboundrtp: "inbound-rtp",
                                outboundrtp: "outbound-rtp",
                                candidatepair: "candidate-pair",
                                localcandidate: "local-candidate",
                                remotecandidate: "remote-candidate",
                            },
                            a = e.RTCPeerConnection.prototype.getStats;
                        e.RTCPeerConnection.prototype.getStats = function (
                            e,
                            r,
                            n
                        ) {
                            return a
                                .apply(this, [e || null])
                                .then(function (e) {
                                    if (
                                        (t.version < 48 &&
                                            (e = (function (e) {
                                                var t = new Map();
                                                return (
                                                    Object.keys(e).forEach(
                                                        function (r) {
                                                            t.set(r, e[r]),
                                                                (t[r] = e[r]);
                                                        }
                                                    ),
                                                    t
                                                );
                                            })(e)),
                                        t.version < 53 && !r)
                                    )
                                        try {
                                            e.forEach(function (e) {
                                                e.type = i[e.type] || e.type;
                                            });
                                        } catch (t) {
                                            if ("TypeError" !== t.name) throw t;
                                            e.forEach(function (t, r) {
                                                e.set(
                                                    r,
                                                    Object.assign({}, t, {
                                                        type:
                                                            i[t.type] || t.type,
                                                    })
                                                );
                                            });
                                        }
                                    return e;
                                })
                                .then(r, n);
                        };
                    }
                },
                shimSenderGetStats: function (e) {
                    if (
                        "object" == typeof e &&
                        e.RTCPeerConnection &&
                        e.RTCRtpSender &&
                        (!e.RTCRtpSender ||
                            !("getStats" in e.RTCRtpSender.prototype))
                    ) {
                        var t = e.RTCPeerConnection.prototype.getSenders;
                        t &&
                            (e.RTCPeerConnection.prototype.getSenders =
                                function () {
                                    var e = this,
                                        r = t.apply(e, []);
                                    return (
                                        r.forEach(function (t) {
                                            t._pc = e;
                                        }),
                                        r
                                    );
                                });
                        var r = e.RTCPeerConnection.prototype.addTrack;
                        r &&
                            (e.RTCPeerConnection.prototype.addTrack =
                                function () {
                                    var e = r.apply(this, arguments);
                                    return (e._pc = this), e;
                                }),
                            (e.RTCRtpSender.prototype.getStats = function () {
                                return this.track
                                    ? this._pc.getStats(this.track)
                                    : Promise.resolve(new Map());
                            });
                    }
                },
                shimReceiverGetStats: function (e) {
                    if (
                        "object" == typeof e &&
                        e.RTCPeerConnection &&
                        e.RTCRtpSender &&
                        (!e.RTCRtpSender ||
                            !("getStats" in e.RTCRtpReceiver.prototype))
                    ) {
                        var t = e.RTCPeerConnection.prototype.getReceivers;
                        t &&
                            (e.RTCPeerConnection.prototype.getReceivers =
                                function () {
                                    var e = this,
                                        r = t.apply(e, []);
                                    return (
                                        r.forEach(function (t) {
                                            t._pc = e;
                                        }),
                                        r
                                    );
                                }),
                            n.wrapPeerConnectionEvent(e, "track", function (e) {
                                return (e.receiver._pc = e.srcElement), e;
                            }),
                            (e.RTCRtpReceiver.prototype.getStats = function () {
                                return this._pc.getStats(this.track);
                            });
                    }
                },
                shimRemoveStream: function (e) {
                    e.RTCPeerConnection &&
                        !("removeStream" in e.RTCPeerConnection.prototype) &&
                        (e.RTCPeerConnection.prototype.removeStream = function (
                            e
                        ) {
                            var t = this;
                            n.deprecated("removeStream", "removeTrack"),
                                this.getSenders().forEach(function (r) {
                                    r.track &&
                                        -1 !== e.getTracks().indexOf(r.track) &&
                                        t.removeTrack(r);
                                });
                        });
                },
                shimRTCDataChannel: function (e) {
                    e.DataChannel &&
                        !e.RTCDataChannel &&
                        (e.RTCDataChannel = e.DataChannel);
                },
                shimGetDisplayMedia: function (e, t) {
                    e.navigator &&
                        e.navigator.mediaDevices &&
                        !("getDisplayMedia" in e.navigator.mediaDevices) &&
                        ((e.navigator.mediaDevices.getDisplayMedia = function (
                            r
                        ) {
                            if (!r || !r.video) {
                                var n = new DOMException(
                                    "getDisplayMedia without video constraints is undefined"
                                );
                                return (
                                    (n.name = "NotFoundError"),
                                    (n.code = 8),
                                    Promise.reject(n)
                                );
                            }
                            return (
                                !0 === r.video
                                    ? (r.video = { mediaSource: t })
                                    : (r.video.mediaSource = t),
                                e.navigator.mediaDevices.getUserMedia(r)
                            );
                        }),
                        (e.navigator.getDisplayMedia = function (t) {
                            return (
                                n.deprecated(
                                    "navigator.getDisplayMedia",
                                    "navigator.mediaDevices.getDisplayMedia"
                                ),
                                e.navigator.mediaDevices.getDisplayMedia(t)
                            );
                        }));
                },
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(1),
                i = n.log;
            e.exports = function (e) {
                var t = n.detectBrowser(e),
                    r = e && e.navigator,
                    a = e && e.MediaStreamTrack,
                    o = function (e) {
                        return {
                            name:
                                {
                                    InternalError: "NotReadableError",
                                    NotSupportedError: "TypeError",
                                    PermissionDeniedError: "NotAllowedError",
                                    SecurityError: "NotAllowedError",
                                }[e.name] || e.name,
                            message:
                                {
                                    "The operation is insecure.":
                                        "The request is not allowed by the user agent or the platform in the current context.",
                                }[e.message] || e.message,
                            constraint: e.constraint,
                            toString: function () {
                                return (
                                    this.name +
                                    (this.message && ": ") +
                                    this.message
                                );
                            },
                        };
                    },
                    s = function (e, n, a) {
                        var s = function (e) {
                            if ("object" != typeof e || e.require) return e;
                            var t = [];
                            return (
                                Object.keys(e).forEach(function (r) {
                                    if (
                                        "require" !== r &&
                                        "advanced" !== r &&
                                        "mediaSource" !== r
                                    ) {
                                        var n = (e[r] =
                                            "object" == typeof e[r]
                                                ? e[r]
                                                : { ideal: e[r] });
                                        if (
                                            ((void 0 === n.min &&
                                                void 0 === n.max &&
                                                void 0 === n.exact) ||
                                                t.push(r),
                                            void 0 !== n.exact &&
                                                ("number" == typeof n.exact
                                                    ? (n.min = n.max = n.exact)
                                                    : (e[r] = n.exact),
                                                delete n.exact),
                                            void 0 !== n.ideal)
                                        ) {
                                            e.advanced = e.advanced || [];
                                            var i = {};
                                            "number" == typeof n.ideal
                                                ? (i[r] = {
                                                      min: n.ideal,
                                                      max: n.ideal,
                                                  })
                                                : (i[r] = n.ideal),
                                                e.advanced.push(i),
                                                delete n.ideal,
                                                Object.keys(n).length ||
                                                    delete e[r];
                                        }
                                    }
                                }),
                                t.length && (e.require = t),
                                e
                            );
                        };
                        return (
                            (e = JSON.parse(JSON.stringify(e))),
                            t.version < 38 &&
                                (i("spec: " + JSON.stringify(e)),
                                e.audio && (e.audio = s(e.audio)),
                                e.video && (e.video = s(e.video)),
                                i("ff37: " + JSON.stringify(e))),
                            r.mozGetUserMedia(e, n, function (e) {
                                a(o(e));
                            })
                        );
                    };
                if (
                    (r.mediaDevices ||
                        (r.mediaDevices = {
                            getUserMedia: function (e) {
                                return new Promise(function (t, r) {
                                    s(e, t, r);
                                });
                            },
                            addEventListener: function () {},
                            removeEventListener: function () {},
                        }),
                    (r.mediaDevices.enumerateDevices =
                        r.mediaDevices.enumerateDevices ||
                        function () {
                            return new Promise(function (e) {
                                e([
                                    {
                                        kind: "audioinput",
                                        deviceId: "default",
                                        label: "",
                                        groupId: "",
                                    },
                                    {
                                        kind: "videoinput",
                                        deviceId: "default",
                                        label: "",
                                        groupId: "",
                                    },
                                ]);
                            });
                        }),
                    t.version < 41)
                ) {
                    var c = r.mediaDevices.enumerateDevices.bind(
                        r.mediaDevices
                    );
                    r.mediaDevices.enumerateDevices = function () {
                        return c().then(void 0, function (e) {
                            if ("NotFoundError" === e.name) return [];
                            throw e;
                        });
                    };
                }
                if (t.version < 49) {
                    var d = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
                    r.mediaDevices.getUserMedia = function (e) {
                        return d(e).then(
                            function (t) {
                                if (
                                    (e.audio && !t.getAudioTracks().length) ||
                                    (e.video && !t.getVideoTracks().length)
                                )
                                    throw (
                                        (t.getTracks().forEach(function (e) {
                                            e.stop();
                                        }),
                                        new DOMException(
                                            "The object can not be found here.",
                                            "NotFoundError"
                                        ))
                                    );
                                return t;
                            },
                            function (e) {
                                return Promise.reject(o(e));
                            }
                        );
                    };
                }
                if (
                    !(
                        t.version > 55 &&
                        "autoGainControl" in
                            r.mediaDevices.getSupportedConstraints()
                    )
                ) {
                    var u = function (e, t, r) {
                            t in e && !(r in e) && ((e[r] = e[t]), delete e[t]);
                        },
                        l = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
                    if (
                        ((r.mediaDevices.getUserMedia = function (e) {
                            return (
                                "object" == typeof e &&
                                    "object" == typeof e.audio &&
                                    ((e = JSON.parse(JSON.stringify(e))),
                                    u(
                                        e.audio,
                                        "autoGainControl",
                                        "mozAutoGainControl"
                                    ),
                                    u(
                                        e.audio,
                                        "noiseSuppression",
                                        "mozNoiseSuppression"
                                    )),
                                l(e)
                            );
                        }),
                        a && a.prototype.getSettings)
                    ) {
                        var p = a.prototype.getSettings;
                        a.prototype.getSettings = function () {
                            var e = p.apply(this, arguments);
                            return (
                                u(e, "mozAutoGainControl", "autoGainControl"),
                                u(e, "mozNoiseSuppression", "noiseSuppression"),
                                e
                            );
                        };
                    }
                    if (a && a.prototype.applyConstraints) {
                        var f = a.prototype.applyConstraints;
                        a.prototype.applyConstraints = function (e) {
                            return (
                                "audio" === this.kind &&
                                    "object" == typeof e &&
                                    ((e = JSON.parse(JSON.stringify(e))),
                                    u(
                                        e,
                                        "autoGainControl",
                                        "mozAutoGainControl"
                                    ),
                                    u(
                                        e,
                                        "noiseSuppression",
                                        "mozNoiseSuppression"
                                    )),
                                f.apply(this, [e])
                            );
                        };
                    }
                }
                r.getUserMedia = function (e, i, a) {
                    if (t.version < 44) return s(e, i, a);
                    n.deprecated(
                        "navigator.getUserMedia",
                        "navigator.mediaDevices.getUserMedia"
                    ),
                        r.mediaDevices.getUserMedia(e).then(i, a);
                };
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(1);
            e.exports = {
                shimLocalStreamsAPI: function (e) {
                    if ("object" == typeof e && e.RTCPeerConnection) {
                        if (
                            ("getLocalStreams" in
                                e.RTCPeerConnection.prototype ||
                                (e.RTCPeerConnection.prototype.getLocalStreams =
                                    function () {
                                        return (
                                            this._localStreams ||
                                                (this._localStreams = []),
                                            this._localStreams
                                        );
                                    }),
                            "getStreamById" in e.RTCPeerConnection.prototype ||
                                (e.RTCPeerConnection.prototype.getStreamById =
                                    function (e) {
                                        var t = null;
                                        return (
                                            this._localStreams &&
                                                this._localStreams.forEach(
                                                    function (r) {
                                                        r.id === e && (t = r);
                                                    }
                                                ),
                                            this._remoteStreams &&
                                                this._remoteStreams.forEach(
                                                    function (r) {
                                                        r.id === e && (t = r);
                                                    }
                                                ),
                                            t
                                        );
                                    }),
                            !("addStream" in e.RTCPeerConnection.prototype))
                        ) {
                            var t = e.RTCPeerConnection.prototype.addTrack;
                            (e.RTCPeerConnection.prototype.addStream =
                                function (e) {
                                    this._localStreams ||
                                        (this._localStreams = []),
                                        -1 === this._localStreams.indexOf(e) &&
                                            this._localStreams.push(e);
                                    var r = this;
                                    e.getTracks().forEach(function (n) {
                                        t.call(r, n, e);
                                    });
                                }),
                                (e.RTCPeerConnection.prototype.addTrack =
                                    function (e, r) {
                                        return (
                                            r &&
                                                (this._localStreams
                                                    ? -1 ===
                                                          this._localStreams.indexOf(
                                                              r
                                                          ) &&
                                                      this._localStreams.push(r)
                                                    : (this._localStreams = [
                                                          r,
                                                      ])),
                                            t.call(this, e, r)
                                        );
                                    });
                        }
                        "removeStream" in e.RTCPeerConnection.prototype ||
                            (e.RTCPeerConnection.prototype.removeStream =
                                function (e) {
                                    this._localStreams ||
                                        (this._localStreams = []);
                                    var t = this._localStreams.indexOf(e);
                                    if (-1 !== t) {
                                        this._localStreams.splice(t, 1);
                                        var r = this,
                                            n = e.getTracks();
                                        this.getSenders().forEach(function (e) {
                                            -1 !== n.indexOf(e.track) &&
                                                r.removeTrack(e);
                                        });
                                    }
                                });
                    }
                },
                shimRemoteStreamsAPI: function (e) {
                    if (
                        "object" == typeof e &&
                        e.RTCPeerConnection &&
                        ("getRemoteStreams" in e.RTCPeerConnection.prototype ||
                            (e.RTCPeerConnection.prototype.getRemoteStreams =
                                function () {
                                    return this._remoteStreams
                                        ? this._remoteStreams
                                        : [];
                                }),
                        !("onaddstream" in e.RTCPeerConnection.prototype))
                    ) {
                        Object.defineProperty(
                            e.RTCPeerConnection.prototype,
                            "onaddstream",
                            {
                                get: function () {
                                    return this._onaddstream;
                                },
                                set: function (e) {
                                    this._onaddstream &&
                                        this.removeEventListener(
                                            "addstream",
                                            this._onaddstream
                                        ),
                                        this.addEventListener(
                                            "addstream",
                                            (this._onaddstream = e)
                                        );
                                },
                            }
                        );
                        var t =
                            e.RTCPeerConnection.prototype.setRemoteDescription;
                        e.RTCPeerConnection.prototype.setRemoteDescription =
                            function () {
                                var e = this;
                                return (
                                    this._onaddstreampoly ||
                                        this.addEventListener(
                                            "track",
                                            (this._onaddstreampoly = function (
                                                t
                                            ) {
                                                t.streams.forEach(function (t) {
                                                    if (
                                                        (e._remoteStreams ||
                                                            (e._remoteStreams =
                                                                []),
                                                        !(
                                                            e._remoteStreams.indexOf(
                                                                t
                                                            ) >= 0
                                                        ))
                                                    ) {
                                                        e._remoteStreams.push(
                                                            t
                                                        );
                                                        var r = new Event(
                                                            "addstream"
                                                        );
                                                        (r.stream = t),
                                                            e.dispatchEvent(r);
                                                    }
                                                });
                                            })
                                        ),
                                    t.apply(e, arguments)
                                );
                            };
                    }
                },
                shimCallbacksAPI: function (e) {
                    if ("object" == typeof e && e.RTCPeerConnection) {
                        var t = e.RTCPeerConnection.prototype,
                            r = t.createOffer,
                            n = t.createAnswer,
                            i = t.setLocalDescription,
                            a = t.setRemoteDescription,
                            o = t.addIceCandidate;
                        (t.createOffer = function (e, t) {
                            var n =
                                    arguments.length >= 2
                                        ? arguments[2]
                                        : arguments[0],
                                i = r.apply(this, [n]);
                            return t ? (i.then(e, t), Promise.resolve()) : i;
                        }),
                            (t.createAnswer = function (e, t) {
                                var r =
                                        arguments.length >= 2
                                            ? arguments[2]
                                            : arguments[0],
                                    i = n.apply(this, [r]);
                                return t
                                    ? (i.then(e, t), Promise.resolve())
                                    : i;
                            });
                        var s = function (e, t, r) {
                            var n = i.apply(this, [e]);
                            return r ? (n.then(t, r), Promise.resolve()) : n;
                        };
                        (t.setLocalDescription = s),
                            (s = function (e, t, r) {
                                var n = a.apply(this, [e]);
                                return r
                                    ? (n.then(t, r), Promise.resolve())
                                    : n;
                            }),
                            (t.setRemoteDescription = s),
                            (s = function (e, t, r) {
                                var n = o.apply(this, [e]);
                                return r
                                    ? (n.then(t, r), Promise.resolve())
                                    : n;
                            }),
                            (t.addIceCandidate = s);
                    }
                },
                shimGetUserMedia: function (e) {
                    var t = e && e.navigator;
                    t.getUserMedia ||
                        (t.webkitGetUserMedia
                            ? (t.getUserMedia = t.webkitGetUserMedia.bind(t))
                            : t.mediaDevices &&
                              t.mediaDevices.getUserMedia &&
                              (t.getUserMedia = function (e, r, n) {
                                  t.mediaDevices.getUserMedia(e).then(r, n);
                              }.bind(t)));
                },
                shimRTCIceServerUrls: function (e) {
                    var t = e.RTCPeerConnection;
                    (e.RTCPeerConnection = function (e, r) {
                        if (e && e.iceServers) {
                            for (
                                var i = [], a = 0;
                                a < e.iceServers.length;
                                a++
                            ) {
                                var o = e.iceServers[a];
                                !o.hasOwnProperty("urls") &&
                                o.hasOwnProperty("url")
                                    ? (n.deprecated(
                                          "RTCIceServer.url",
                                          "RTCIceServer.urls"
                                      ),
                                      ((o = JSON.parse(
                                          JSON.stringify(o)
                                      )).urls = o.url),
                                      delete o.url,
                                      i.push(o))
                                    : i.push(e.iceServers[a]);
                            }
                            e.iceServers = i;
                        }
                        return new t(e, r);
                    }),
                        (e.RTCPeerConnection.prototype = t.prototype),
                        "generateCertificate" in e.RTCPeerConnection &&
                            Object.defineProperty(
                                e.RTCPeerConnection,
                                "generateCertificate",
                                {
                                    get: function () {
                                        return t.generateCertificate;
                                    },
                                }
                            );
                },
                shimTrackEventTransceiver: function (e) {
                    "object" == typeof e &&
                        e.RTCPeerConnection &&
                        "receiver" in e.RTCTrackEvent.prototype &&
                        !e.RTCTransceiver &&
                        Object.defineProperty(
                            e.RTCTrackEvent.prototype,
                            "transceiver",
                            {
                                get: function () {
                                    return { receiver: this.receiver };
                                },
                            }
                        );
                },
                shimCreateOfferLegacy: function (e) {
                    var t = e.RTCPeerConnection.prototype.createOffer;
                    e.RTCPeerConnection.prototype.createOffer = function (e) {
                        var r = this;
                        if (e) {
                            void 0 !== e.offerToReceiveAudio &&
                                (e.offerToReceiveAudio =
                                    !!e.offerToReceiveAudio);
                            var n = r.getTransceivers().find(function (e) {
                                return (
                                    e.sender.track &&
                                    "audio" === e.sender.track.kind
                                );
                            });
                            !1 === e.offerToReceiveAudio && n
                                ? "sendrecv" === n.direction
                                    ? n.setDirection
                                        ? n.setDirection("sendonly")
                                        : (n.direction = "sendonly")
                                    : "recvonly" === n.direction &&
                                      (n.setDirection
                                          ? n.setDirection("inactive")
                                          : (n.direction = "inactive"))
                                : !0 !== e.offerToReceiveAudio ||
                                  n ||
                                  r.addTransceiver("audio"),
                                void 0 !== e.offerToReceiveVideo &&
                                    (e.offerToReceiveVideo =
                                        !!e.offerToReceiveVideo);
                            var i = r.getTransceivers().find(function (e) {
                                return (
                                    e.sender.track &&
                                    "video" === e.sender.track.kind
                                );
                            });
                            !1 === e.offerToReceiveVideo && i
                                ? "sendrecv" === i.direction
                                    ? i.setDirection("sendonly")
                                    : "recvonly" === i.direction &&
                                      i.setDirection("inactive")
                                : !0 !== e.offerToReceiveVideo ||
                                  i ||
                                  r.addTransceiver("video");
                        }
                        return t.apply(r, arguments);
                    };
                },
            };
        },
        function (e, t, r) {
            "use strict";
            var n = r(2),
                i = r(1);
            e.exports = {
                shimRTCIceCandidate: function (e) {
                    if (
                        !(
                            !e.RTCIceCandidate ||
                            (e.RTCIceCandidate &&
                                "foundation" in e.RTCIceCandidate.prototype)
                        )
                    ) {
                        var t = e.RTCIceCandidate;
                        (e.RTCIceCandidate = function (e) {
                            if (
                                ("object" == typeof e &&
                                    e.candidate &&
                                    0 === e.candidate.indexOf("a=") &&
                                    ((e = JSON.parse(
                                        JSON.stringify(e)
                                    )).candidate = e.candidate.substr(2)),
                                e.candidate && e.candidate.length)
                            ) {
                                var r = new t(e),
                                    i = n.parseCandidate(e.candidate),
                                    a = Object.assign(r, i);
                                return (
                                    (a.toJSON = function () {
                                        return {
                                            candidate: a.candidate,
                                            sdpMid: a.sdpMid,
                                            sdpMLineIndex: a.sdpMLineIndex,
                                            usernameFragment:
                                                a.usernameFragment,
                                        };
                                    }),
                                    a
                                );
                            }
                            return new t(e);
                        }),
                            (e.RTCIceCandidate.prototype = t.prototype),
                            i.wrapPeerConnectionEvent(
                                e,
                                "icecandidate",
                                function (t) {
                                    return (
                                        t.candidate &&
                                            Object.defineProperty(
                                                t,
                                                "candidate",
                                                {
                                                    value: new e.RTCIceCandidate(
                                                        t.candidate
                                                    ),
                                                    writable: "false",
                                                }
                                            ),
                                        t
                                    );
                                }
                            );
                    }
                },
                shimCreateObjectURL: function (e) {
                    var t = e && e.URL;
                    if (
                        "object" == typeof e &&
                        e.HTMLMediaElement &&
                        "srcObject" in e.HTMLMediaElement.prototype &&
                        t.createObjectURL &&
                        t.revokeObjectURL
                    ) {
                        var r = t.createObjectURL.bind(t),
                            n = t.revokeObjectURL.bind(t),
                            a = new Map(),
                            o = 0;
                        (t.createObjectURL = function (e) {
                            if ("getTracks" in e) {
                                var t = "polyblob:" + ++o;
                                return (
                                    a.set(t, e),
                                    i.deprecated(
                                        "URL.createObjectURL(stream)",
                                        "elem.srcObject = stream"
                                    ),
                                    t
                                );
                            }
                            return r(e);
                        }),
                            (t.revokeObjectURL = function (e) {
                                n(e), a.delete(e);
                            });
                        var s = Object.getOwnPropertyDescriptor(
                            e.HTMLMediaElement.prototype,
                            "src"
                        );
                        Object.defineProperty(
                            e.HTMLMediaElement.prototype,
                            "src",
                            {
                                get: function () {
                                    return s.get.apply(this);
                                },
                                set: function (e) {
                                    return (
                                        (this.srcObject = a.get(e) || null),
                                        s.set.apply(this, [e])
                                    );
                                },
                            }
                        );
                        var c = e.HTMLMediaElement.prototype.setAttribute;
                        e.HTMLMediaElement.prototype.setAttribute =
                            function () {
                                return (
                                    2 === arguments.length &&
                                        "src" ===
                                            ("" + arguments[0]).toLowerCase() &&
                                        (this.srcObject =
                                            a.get(arguments[1]) || null),
                                    c.apply(this, arguments)
                                );
                            };
                    }
                },
                shimMaxMessageSize: function (e) {
                    if (!e.RTCSctpTransport && e.RTCPeerConnection) {
                        var t = i.detectBrowser(e);
                        "sctp" in e.RTCPeerConnection.prototype ||
                            Object.defineProperty(
                                e.RTCPeerConnection.prototype,
                                "sctp",
                                {
                                    get: function () {
                                        return void 0 === this._sctp
                                            ? null
                                            : this._sctp;
                                    },
                                }
                            );
                        var r = function (e) {
                                var t = n.splitSections(e.sdp);
                                return (
                                    t.shift(),
                                    t.some(function (e) {
                                        var t = n.parseMLine(e);
                                        return (
                                            t &&
                                            "application" === t.kind &&
                                            -1 !== t.protocol.indexOf("SCTP")
                                        );
                                    })
                                );
                            },
                            a = function (e) {
                                var t = e.sdp.match(
                                    /mozilla...THIS_IS_SDPARTA-(\d+)/
                                );
                                if (null === t || t.length < 2) return -1;
                                var r = parseInt(t[1], 10);
                                return r != r ? -1 : r;
                            },
                            o = function (e) {
                                var r = 65536;
                                return (
                                    "firefox" === t.browser &&
                                        (r =
                                            t.version < 57
                                                ? -1 === e
                                                    ? 16384
                                                    : 2147483637
                                                : t.version < 60
                                                ? 57 === t.version
                                                    ? 65535
                                                    : 65536
                                                : 2147483637),
                                    r
                                );
                            },
                            s = function (e, r) {
                                var i = 65536;
                                "firefox" === t.browser &&
                                    57 === t.version &&
                                    (i = 65535);
                                var a = n.matchPrefix(
                                    e.sdp,
                                    "a=max-message-size:"
                                );
                                return (
                                    a.length > 0
                                        ? (i = parseInt(a[0].substr(19), 10))
                                        : "firefox" === t.browser &&
                                          -1 !== r &&
                                          (i = 2147483637),
                                    i
                                );
                            },
                            c =
                                e.RTCPeerConnection.prototype
                                    .setRemoteDescription;
                        e.RTCPeerConnection.prototype.setRemoteDescription =
                            function () {
                                var e = this;
                                if (((e._sctp = null), r(arguments[0]))) {
                                    var t,
                                        n = a(arguments[0]),
                                        i = o(n),
                                        d = s(arguments[0], n);
                                    t =
                                        0 === i && 0 === d
                                            ? Number.POSITIVE_INFINITY
                                            : 0 === i || 0 === d
                                            ? Math.max(i, d)
                                            : Math.min(i, d);
                                    var u = {};
                                    Object.defineProperty(u, "maxMessageSize", {
                                        get: function () {
                                            return t;
                                        },
                                    }),
                                        (e._sctp = u);
                                }
                                return c.apply(e, arguments);
                            };
                    }
                },
                shimSendThrowTypeError: function (e) {
                    if (
                        e.RTCPeerConnection &&
                        "createDataChannel" in e.RTCPeerConnection.prototype
                    ) {
                        var t = e.RTCPeerConnection.prototype.createDataChannel;
                        (e.RTCPeerConnection.prototype.createDataChannel =
                            function () {
                                var e = this,
                                    n = t.apply(e, arguments);
                                return r(n, e), n;
                            }),
                            i.wrapPeerConnectionEvent(
                                e,
                                "datachannel",
                                function (e) {
                                    return r(e.channel, e.target), e;
                                }
                            );
                    }
                    function r(e, t) {
                        var r = e.send;
                        e.send = function () {
                            var n = arguments[0],
                                i = n.length || n.size || n.byteLength;
                            if (
                                "open" === e.readyState &&
                                t.sctp &&
                                i > t.sctp.maxMessageSize
                            )
                                throw new TypeError(
                                    "Message too large (can send a maximum of " +
                                        t.sctp.maxMessageSize +
                                        " bytes)"
                                );
                            return r.apply(e, arguments);
                        };
                    }
                },
            };
        },
        function (e, t, r) {
            "use strict";
            r.r(t);
            ("undefined" != typeof console && void 0 !== console.log) ||
                (console = { log: function () {} });
            var n = function () {},
                i = function () {},
                a = function () {},
                o = function () {},
                s = function () {},
                c = function () {};
            c = console.error.bind(console);
            var d = {
                    trace: n,
                    debug: i,
                    vdebug: a,
                    log: o,
                    warn: s,
                    error: c,
                },
                u = r(0),
                l = r.n(u);
            function p(e) {
                return (p =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                        ? function (e) {
                              return typeof e;
                          }
                        : function (e) {
                              return e &&
                                  "function" == typeof Symbol &&
                                  e.constructor === Symbol &&
                                  e !== Symbol.prototype
                                  ? "symbol"
                                  : typeof e;
                          })(e);
            }
            var f = null,
                m = null,
                v = null,
                h = !1,
                g = null,
                y = null,
                S = null,
                C = function (e) {
                    switch (e.response) {
                        case "keepalive":
                            d.vdebug("Got a keepalive");
                            break;
                        case "ack":
                            d.debug("Got an ack"), d.debug(e);
                            break;
                        case "success":
                            d.debug("Got a success"), d.debug(e), y(e);
                            break;
                        case "closed":
                            d.debug("Got a closed connection"), d.debug(e), S();
                            break;
                        case "offline":
                            d.debug("Connection is offline, token expired"),
                                d.debug(e),
                                m("offline");
                            break;
                        case "trickle":
                            if (!G() && !U())
                                return void d.debug(
                                    "This handle is not attached to this session"
                                );
                            var t = e.candidate,
                                r = g.webrtcConfig;
                            d.debug("Got a trickled candidate"),
                                d.debug(t),
                                r.pc && r.remoteSdp
                                    ? (d.debug("Adding remote candidate:", t),
                                      t && !0 !== t.completed
                                          ? r.pc.addIceCandidate(
                                                new RTCIceCandidate(t)
                                            )
                                          : r.pc.addIceCandidate())
                                    : (d.debug(
                                          "We didn't do setRemoteDescription (trickle got here before the offer?), caching candidate"
                                      ),
                                      r.candidates || (r.candidates = []),
                                      r.candidates.push(t),
                                      d.debug(r.candidates));
                            break;
                        case "webrtcup":
                            if (!G())
                                return void d.debug(
                                    "This handle is not attached"
                                );
                            g.webrtcState(!0);
                            break;
                        case "hangup":
                            if (
                                (d.debug("Got a hangup event"),
                                d.debug(e),
                                !G())
                            )
                                return void d.debug(
                                    "This handle is not attached"
                                );
                            g.webrtcState(!1, e.reason), g.hangup();
                            break;
                        case "media":
                            if (
                                (d.debug("Got a media event"), d.debug(e), !G())
                            )
                                return void d.debug(
                                    "This handle is not attached"
                                );
                            g.mediaState(e.type, e.receiving);
                            break;
                        case "slowlink":
                            if (
                                (d.debug("Got a slowlink event"),
                                d.debug(e),
                                !G())
                            )
                                return void d.debug(
                                    "This handle is not attached"
                                );
                            g.slowLink(e.uplink, e.nacks);
                            break;
                        case "error":
                            d.error(
                                "AfricasTalking Client Error: " +
                                    e.error.code +
                                    " " +
                                    e.error.reason
                            ),
                                d.debug(e);
                            break;
                        case "event":
                            if (
                                (d.log("Got an event"),
                                d.log(e),
                                void 0 === e.eventdata || null === e.eventdata)
                            )
                                return void d.warn("Missing eventdata...");
                            if ((d.log(e.eventdata), !G()))
                                return void d.warn(
                                    "This handle is not attachedddd"
                                );
                            void 0 !== e.jsep &&
                                null !== e.jsep &&
                                (d.log("Handling SDP as well..."),
                                d.log(e.jsep)),
                                null !== g.onmessage && void 0 !== g.onmessage
                                    ? (d.log("Notifying application..."),
                                      g.onmessage(e.eventdata, e.jsep))
                                    : d.debug(
                                          "No provided notification callback"
                                      );
                            break;
                        default:
                            d.warn("Unknown message/event  " + e), d.debug(e);
                    }
                },
                T = function (e) {
                    if (!h)
                        return (
                            d.warn("Is the gateway down? (connected=false)"),
                            void e.error(
                                "Is the gateway down? (connected=false)"
                            )
                        );
                    if (!G() && !U())
                        return (
                            d.warn("Invalid handle"),
                            void e.error("Invalid handle")
                        );
                    var t = e.message,
                        r = e.jsep,
                        n = { command: "message", body: t };
                    null != r && (n.jsep = r),
                        d.debug("Sending message to web socket"),
                        d.debug(n),
                        d.debug("Sending a request to Africa's Talking" + n),
                        f.send(JSON.stringify(n));
                },
                b = function (e) {
                    if (!G() && !U())
                        return (
                            d.warn("Invalid handle"),
                            void e.error("Invalid handle")
                        );
                    var t = g.webrtcConfig,
                        r = e.text;
                    if (null == r)
                        return (
                            d.warn("Invalid text"), void e.error("Invalid text")
                        );
                    d.log("Sending string on data channel: " + r),
                        t.dataChannel.send(r),
                        e.success();
                },
                k = function (e) {
                    var t = e.jsep;
                    e.media = e.media || { audio: !0 };
                    var r = e.media;
                    if (!G() && !U())
                        return (
                            d.warn("Invalid handle"),
                            void e.error("Invalid handle")
                        );
                    var n = g.webrtcConfig;
                    if (void 0 === n.pc || null === n.pc)
                        d.log("Creating a new media session"), (r.update = !1);
                    else if (void 0 !== n.pc && null !== n.pc)
                        if (
                            (d.log("Updating existing media session"),
                            (r.update = !0),
                            null !== e.stream && void 0 !== e.stream)
                        )
                            e.stream !== n.myStream &&
                                d.log(
                                    "Renegotiation involves a new external stream"
                                );
                        else {
                            if (r.addAudio) {
                                if (
                                    ((r.replaceAudio = !1),
                                    (r.removeAudio = !1),
                                    (r.audioSend = !0),
                                    n.myStream &&
                                        n.myStream.getAudioTracks() &&
                                        n.myStream.getAudioTracks().length)
                                )
                                    return (
                                        d.error(
                                            "AfricasTalking Client Error: Can't add audio stream, there already is one"
                                        ),
                                        void e.error(
                                            "AfricasTalking Client Error: Can't add audio stream, there already is one"
                                        )
                                    );
                            } else
                                r.removeAudio
                                    ? ((r.replaceAudio = !1),
                                      (r.addAudio = !1),
                                      (r.audioSend = !1))
                                    : r.replaceAudio &&
                                      ((r.addAudio = !1),
                                      (r.removeAudio = !1),
                                      (r.audioSend = !0));
                            null === n.myStream || void 0 === n.myStream
                                ? (r.replaceAudio &&
                                      ((r.replaceAudio = !1),
                                      (r.addAudio = !0),
                                      (r.audioSend = !0)),
                                  L(r) && (r.addAudio = !0))
                                : (null !== n.myStream.getAudioTracks() &&
                                      void 0 !== n.myStream.getAudioTracks() &&
                                      0 !==
                                          n.myStream.getAudioTracks().length) ||
                                  (r.replaceAudio &&
                                      ((r.replaceAudio = !1),
                                      (r.addAudio = !0),
                                      (r.audioSend = !0)),
                                  L(r) && (r.addAudio = !0));
                        }
                    if (
                        r.update &&
                        !n.streamExternal &&
                        (r.removeAudio || r.replaceAudio)
                    ) {
                        if (
                            n.myStream &&
                            n.myStream.getAudioTracks() &&
                            n.myStream.getAudioTracks().length
                        ) {
                            var i = n.myStream.getAudioTracks()[0];
                            d.log("Removing audio track:", i),
                                n.myStream.removeTrack(i);
                            try {
                                i.stop();
                            } catch (e) {
                                d.log("Error removing audio track:", e);
                            }
                        }
                        if (
                            n.pc.getSenders() &&
                            n.pc.getSenders().length &&
                            !r.replaceAudio &&
                            "firefox" === l.a.browserDetails.browser
                        )
                            for (var a in n.pc.getSenders()) {
                                var o = n.pc.getSenders()[a];
                                o &&
                                    o.track &&
                                    "audio" === o.track.kind &&
                                    (d.log("Removing audio sender:", o),
                                    n.pc.removeTrack(o));
                            }
                    }
                    if (null !== e.stream && void 0 !== e.stream) {
                        var s = e.stream;
                        if (
                            (d.log("MediaStream provided by the application"),
                            d.debug(s),
                            r.update &&
                                n.myStream &&
                                n.myStream !== e.stream &&
                                !n.streamExternal)
                        ) {
                            try {
                                var c = n.myStream.getTracks();
                                for (var u in c) {
                                    var f = c[u];
                                    d.log(f), null != f && f.stop();
                                }
                            } catch (e) {}
                            n.myStream = null;
                        }
                        return (n.streamExternal = !0), void D(t, r, e, s);
                    }
                    if ((d.log("Executing isAudioSendEnabled"), L(r))) {
                        g.consentDialog(!0);
                        var m = L(r);
                        !0 === m &&
                            null != r &&
                            null != r &&
                            "object" === p(r.audio) &&
                            (m = r.audio),
                            (null != r && "screen" === r.video) ||
                                navigator.mediaDevices
                                    .enumerateDevices()
                                    .then(function (n) {
                                        var i = n.some(function (e) {
                                                return "audioinput" === e.kind;
                                            }),
                                            a = L(r),
                                            o = A(r);
                                        if ((a || o) && !(!!a && i) && o)
                                            return (
                                                g.consentDialog(!1),
                                                e.error(
                                                    "Audio capture is required, but no capture device found"
                                                ),
                                                !1
                                            );
                                        var s = { audio: !!i && m, video: !1 };
                                        d.debug("getUserMedia constraints", s),
                                            navigator.mediaDevices
                                                .getUserMedia(s)
                                                .then(function (n) {
                                                    g.consentDialog(!1),
                                                        D(t, r, e, n);
                                                })
                                                .catch(function (t) {
                                                    g.consentDialog(!1),
                                                        e.error({
                                                            code: t.code,
                                                            name: t.name,
                                                            message: t.message,
                                                        });
                                                });
                                    })
                                    .catch(function (t) {
                                        g.consentDialog(!1),
                                            e.error(
                                                "enumerateDevices error",
                                                t
                                            );
                                    });
                    } else D(t, r, e);
                },
                w = function (e) {
                    var t = e.jsep;
                    if (!G() && !U())
                        return (
                            d.warn("Invalid handle"),
                            void e.error("Invalid handle")
                        );
                    var r = g.webrtcConfig;
                    if (null != t) {
                        if (null === r.pc)
                            return (
                                d.warn(
                                    "Wait, no PeerConnection?? if this is an answer, use createAnswer and not handleRemoteJsep"
                                ),
                                void e.error(
                                    "No PeerConnection: if this is an answer, use createAnswer and not handleRemoteJsep"
                                )
                            );
                        r.pc.setRemoteDescription(
                            new RTCSessionDescription(t),
                            function () {
                                if (
                                    (d.log("Remote description accepted!"),
                                    (r.remoteSdp = t.sdp),
                                    r.candidates && r.candidates.length > 0)
                                ) {
                                    for (var e in r.candidates) {
                                        var n = r.candidates[e];
                                        d.debug("Adding remote candidate:", n),
                                            n && !0 !== n.completed
                                                ? r.pc.addIceCandidate(
                                                      new RTCIceCandidate(n)
                                                  )
                                                : r.pc.addIceCandidate();
                                    }
                                    r.candidates = [];
                                }
                            },
                            e.error
                        );
                    } else e.error("Invalid JSEP");
                },
                R = function () {
                    if (!G() && !U())
                        return d.warn("Invalid handle"), "Invalid handle";
                    var e = g.webrtcConfig;
                    return null === e.pc || void 0 === e.pc
                        ? "Invalid PeerConnection"
                        : e.pc.getStats
                        ? null === e.bitrate.timer || void 0 === e.bitrate.timer
                            ? (d.log("Starting bitrate timer (via getStats)"),
                              (e.bitrate.timer = setInterval(function () {
                                  e.pc.getStats().then(function (t) {
                                      t.forEach(function (t) {
                                          if (t) {
                                              var r = !1;
                                              if (
                                                  (("video" === t.mediaType ||
                                                      t.id
                                                          .toLowerCase()
                                                          .indexOf("video") >
                                                          -1) &&
                                                  "inbound-rtp" === t.type &&
                                                  t.id.indexOf("rtcp") < 0
                                                      ? (r = !0)
                                                      : "ssrc" != t.type ||
                                                        !t.bytesReceived ||
                                                        ("VP8" !==
                                                            t.googCodecName &&
                                                            "" !==
                                                                t.googCodecName) ||
                                                        (r = !0),
                                                  r)
                                              )
                                                  if (
                                                      ((e.bitrate.bsnow =
                                                          t.bytesReceived),
                                                      (e.bitrate.tsnow =
                                                          t.timestamp),
                                                      null ===
                                                          e.bitrate.bsbefore ||
                                                          null ===
                                                              e.bitrate
                                                                  .tsbefore)
                                                  )
                                                      (e.bitrate.bsbefore =
                                                          e.bitrate.bsnow),
                                                          (e.bitrate.tsbefore =
                                                              e.bitrate.tsnow);
                                                  else {
                                                      var n =
                                                          e.bitrate.tsnow -
                                                          e.bitrate.tsbefore;
                                                      "safari" ==
                                                          l.a.browserDetails
                                                              .browser &&
                                                          (n /= 1e3);
                                                      var i = Math.round(
                                                          (8 *
                                                              (e.bitrate.bsnow -
                                                                  e.bitrate
                                                                      .bsbefore)) /
                                                              n
                                                      );
                                                      (e.bitrate.value =
                                                          i + " kbits/sec"),
                                                          (e.bitrate.bsbefore =
                                                              e.bitrate.bsnow),
                                                          (e.bitrate.tsbefore =
                                                              e.bitrate.tsnow);
                                                  }
                                          }
                                      });
                                  });
                              }, 1e3)),
                              "0 kbits/sec")
                            : e.bitrate.value
                        : (d.warn(
                              "Getting the video bitrate unsupported by browser"
                          ),
                          "Feature unsupported by browser");
                },
                P = function (e) {
                    if (!G() && !U())
                        return (
                            d.warn("Invalid handle"),
                            void e.error("Invalid handle")
                        );
                    var t = g.webrtcConfig;
                    if (null === t.dtmfSender || void 0 === t.dtmfSender) {
                        if (void 0 !== t.pc && null !== t.pc) {
                            var r = t.pc.getSenders().find(function (e) {
                                return e.track && "audio" === e.track.kind;
                            });
                            if (!r)
                                return (
                                    d.warn(
                                        "Invalid DTMF configuration (no audio track)"
                                    ),
                                    void e.error(
                                        "Invalid DTMF configuration (no audio track)"
                                    )
                                );
                            (t.dtmfSender = r.dtmf),
                                t.dtmfSender &&
                                    (d.log("Created DTMF Sender"),
                                    (t.dtmfSender.ontonechange = function (e) {
                                        d.debug("Sent DTMF tone: " + e.tone);
                                    })),
                                d.log({ "config.dtmfSender": t.dtmfSender });
                        }
                        if (null === t.dtmfSender || void 0 === t.dtmfSender)
                            return (
                                d.warn("Invalid DTMF configuration"),
                                void e.error("Invalid DTMF configuration")
                            );
                    }
                    var n = e.dtmf;
                    if (null == n)
                        return (
                            d.warn("Invalid DTMF parameters"),
                            void e.error("Invalid DTMF parameters")
                        );
                    var i = n.tones;
                    if (null == i)
                        return (
                            d.warn("Invalid DTMF string"),
                            void e.error("Invalid DTMF string")
                        );
                    var a = n.duration;
                    null == a && (a = 500);
                    var o = n.gap;
                    null == o && (o = 50),
                        d.debug(
                            "Sending DTMF string " +
                                i +
                                " (duration " +
                                a +
                                "ms, gap " +
                                o +
                                "ms)"
                        ),
                        t.dtmfSender.insertDTMF(i, a, o);
                },
                E = function (e) {
                    if ((d.log("Cleaning WebRTC stuff"), G())) {
                        var t = g.webrtcConfig;
                        if (null != t) {
                            if (!0 === e) {
                                var r = { command: "hangup" };
                                d.debug("Sending hangup request"),
                                    d.debug(r),
                                    f.send(JSON.stringify(r));
                            }
                            (t.remoteStream = null),
                                t.volume.timer && clearInterval(t.volume.timer),
                                (t.volume.value = null),
                                t.bitrate.timer &&
                                    clearInterval(t.bitrate.timer),
                                (t.bitrate.timer = null),
                                (t.bitrate.bsnow = null),
                                (t.bitrate.bsbefore = null),
                                (t.bitrate.tsnow = null),
                                (t.bitrate.tsbefore = null),
                                (t.bitrate.value = null);
                            try {
                                if (
                                    !t.streamExternal &&
                                    null !== t.myStream &&
                                    void 0 !== t.myStream
                                ) {
                                    d.log("Stopping local stream tracks");
                                    var n = t.myStream.getTracks();
                                    for (var i in n) {
                                        var a = n[i];
                                        d.log(a), null != a && a.stop();
                                    }
                                }
                            } catch (e) {}
                            (t.streamExternal = !1), (t.myStream = null);
                            try {
                                t.pc.close();
                            } catch (e) {}
                            (t.pc = null),
                                (t.candidates = null),
                                (t.mySdp = null),
                                (t.remoteSdp = null),
                                (t.iceDone = !1),
                                (t.dataChannel = null),
                                (t.dtmfSender = null);
                        }
                        g.oncleanup();
                    }
                },
                D = function (e, t, r, n) {
                    if (!G() && !U())
                        return (
                            d.warn("Invalid handle"),
                            void r.error("Invalid handle")
                        );
                    var i = g.webrtcConfig;
                    d.log("streamsDone:", n),
                        n &&
                            (d.debug("  -- Audio tracks:", n.getAudioTracks()),
                            d.debug("  -- Video tracks:", n.getVideoTracks()));
                    var a = !1;
                    if (i.myStream && t.update && !i.streamExternal) {
                        if (
                            ((!t.update && L(t)) ||
                                (t.update && (t.addAudio || t.replaceAudio))) &&
                            n.getAudioTracks() &&
                            n.getAudioTracks().length
                        )
                            if (
                                (i.myStream.addTrack(n.getAudioTracks()[0]),
                                t.replaceAudio &&
                                    "firefox" === l.a.browserDetails.browser)
                            )
                                for (var o in (d.log(
                                    "Adding audio track:",
                                    n.getAudioTracks()[0]
                                ),
                                i.pc.getSenders())) {
                                    var s = i.pc.getSenders()[o];
                                    s &&
                                        s.track &&
                                        "audio" === s.track.kind &&
                                        s.replaceTrack(n.getAudioTracks()[0]);
                                }
                            else
                                d.log(
                                    (t.replaceAudio ? "Replacing" : "Adding") +
                                        " audio track:",
                                    n.getAudioTracks()[0]
                                ),
                                    i.pc.addTrack(n.getAudioTracks()[0], n);
                    } else (i.myStream = n), (a = !0);
                    if (!i.pc) {
                        var c = {
                                iceServers: r.iceServers,
                                iceTransportPolicy: void 0,
                                bundlePolicy: "balanced",
                            },
                            u = { optional: [{ DtlsSrtpKeyAgreement: !0 }] };
                        if (
                            r.rtcConstraints &&
                            "object" === p(r.rtcConstraints)
                        )
                            for (var f in (d.debug(
                                "Adding custom PeerConnection constraints:",
                                r.rtcConstraints
                            ),
                            r.rtcConstraints))
                                u.optional.push(r.rtcConstraints[f]);
                        "edge" === l.a.browserDetails.browser &&
                            (c.bundlePolicy = "max-bundle"),
                            d.log("Creating PeerConnection"),
                            d.debug(u),
                            d.log(
                                "new RTCPeerConnection" +
                                    JSON.stringify({
                                        iceServers: c.iceServers,
                                        pc_constraints: u,
                                    })
                            ),
                            (i.pc = new RTCPeerConnection(c, u)),
                            d.log(
                                "This is the peer connection created " +
                                    JSON.stringify(i.pc)
                            ),
                            i.pc.getStats &&
                                ((i.volume.value = 0),
                                (i.bitrate.value = "0 kbits/sec")),
                            d.log(
                                "Preparing local SDP and gathering candidates (trickle=" +
                                    i.trickle +
                                    ")"
                            ),
                            (i.pc.oniceconnectionstatechange = function () {
                                i.pc && g.iceState(i.pc.iceConnectionState);
                            }),
                            (i.pc.onicecandidate = function (e) {
                                if (
                                    null == e.candidate ||
                                    ("edge" === l.a.browserDetails.browser &&
                                        e.candidate.candidate.indexOf(
                                            "endOfCandidates"
                                        ) > 0)
                                )
                                    d.log("End of candidates."),
                                        (i.iceDone = !0),
                                        !0 === i.trickle
                                            ? x(r, { completed: !0 })
                                            : (function (e) {
                                                  if (G() || U()) {
                                                      var t = g.webrtcConfig;
                                                      d.log(
                                                          "Sending offer/answer SDP..."
                                                      ),
                                                          null !== t.mySdp &&
                                                          void 0 !== t.mySdp
                                                              ? ((t.mySdp = {
                                                                    type: t.pc
                                                                        .localDescription
                                                                        .type,
                                                                    sdp: t.pc
                                                                        .localDescription
                                                                        .sdp,
                                                                }),
                                                                !1 ===
                                                                    t.trickle &&
                                                                    (t.mySdp.trickle =
                                                                        !1),
                                                                d.debug(e),
                                                                (t.sdpSent =
                                                                    !0),
                                                                e.success(
                                                                    t.mySdp
                                                                ))
                                                              : d.warn(
                                                                    "Local SDP instance is invalid, not sending anything..."
                                                                );
                                                  } else
                                                      d.warn(
                                                          "Invalid handle, not sending anything"
                                                      );
                                              })(r);
                                else {
                                    var t = {
                                        candidate: e.candidate.candidate,
                                        sdpMid: e.candidate.sdpMid,
                                        sdpMLineIndex:
                                            e.candidate.sdpMLineIndex,
                                    };
                                    !0 === i.trickle && x(r, t);
                                }
                            }),
                            (i.pc.ontrack = function (e) {
                                d.log("Handling Remote Track"),
                                    d.debug(e),
                                    e.streams &&
                                        ((i.remoteStream = e.streams[0]),
                                        g.onremotestream(i.remoteStream),
                                        e.track &&
                                            !e.track.onended &&
                                            (d.log(
                                                "Adding onended callback to track:",
                                                e.track
                                            ),
                                            (e.track.onended = function (e) {
                                                d.log(
                                                    "Remote track removed:",
                                                    e
                                                ),
                                                    i.remoteStream &&
                                                        (i.remoteStream.removeTrack(
                                                            e.target
                                                        ),
                                                        g.onremotestream(
                                                            i.remoteStream
                                                        ));
                                            })));
                            });
                    }
                    a &&
                        null != n &&
                        (d.log("Adding local stream"),
                        n.getTracks().forEach(function (e) {
                            i.pc.addTrack(e, n);
                        })),
                        i.myStream && g.onlocalstream(i.myStream),
                        null == e
                            ? (function (e, t) {
                                  if (!G() && !U())
                                      return (
                                          d.warn("Invalid handle"),
                                          void t.error("Invalid handle")
                                      );
                                  var r = g.webrtcConfig,
                                      n = !0 === t.simulcast;
                                  n
                                      ? d.log(
                                            "Creating offer (iceDone=" +
                                                r.iceDone +
                                                ", simulcast=" +
                                                n +
                                                ")"
                                        )
                                      : d.log(
                                            "Creating offer (iceDone=" +
                                                r.iceDone +
                                                ")"
                                        );
                                  var i = { offerToReceiveAudio: j(e) };
                                  !0 === t.iceRestart && (i.iceRestart = !0),
                                      d.log(i),
                                      r.pc.createOffer(
                                          function (e) {
                                              if (
                                                  (d.debug(e),
                                                  d.log(
                                                      "Setting local description"
                                                  ),
                                                  (r.mySdp = e.sdp),
                                                  r.pc.setLocalDescription(e),
                                                  (r.mediaConstraints = i),
                                                  r.iceDone || r.trickle)
                                              ) {
                                                  d.log("Offer ready"),
                                                      d.debug(t);
                                                  var n = {
                                                      type: e.type,
                                                      sdp: e.sdp,
                                                  };
                                                  t.success(n);
                                              } else
                                                  d.log(
                                                      "Waiting for all candidates..."
                                                  );
                                          },
                                          t.error,
                                          i
                                      );
                              })(t, r)
                            : i.pc.setRemoteDescription(
                                  new RTCSessionDescription(e),
                                  function () {
                                      if (
                                          (d.log(
                                              "Remote description accepted!"
                                          ),
                                          (i.remoteSdp = e.sdp),
                                          i.candidates &&
                                              i.candidates.length > 0)
                                      ) {
                                          for (var n in i.candidates) {
                                              var a = i.candidates[n];
                                              d.debug(
                                                  "Adding remote candidate:",
                                                  a
                                              ),
                                                  a && !0 !== a.completed
                                                      ? i.pc.addIceCandidate(
                                                            new RTCIceCandidate(
                                                                a
                                                            )
                                                        )
                                                      : i.pc.addIceCandidate();
                                          }
                                          i.candidates = [];
                                      }
                                      !(function (e, t) {
                                          if (!G() && !U())
                                              return (
                                                  d.warn("Invalid handle"),
                                                  void t.error("Invalid handle")
                                              );
                                          var r = g.webrtcConfig,
                                              n = !0 === t.simulcast;
                                          n
                                              ? d.log(
                                                    "Creating answer (iceDone=" +
                                                        r.iceDone +
                                                        ", simulcast=" +
                                                        n +
                                                        ")"
                                                )
                                              : d.log(
                                                    "Creating answer (iceDone=" +
                                                        r.iceDone +
                                                        ")"
                                                );
                                          var i = null;
                                          (i =
                                              "firefox" ==
                                                  l.a.browserDetails.browser ||
                                              "edge" ==
                                                  l.a.browserDetails.browser
                                                  ? {
                                                        offerToReceiveAudio:
                                                            j(e),
                                                    }
                                                  : {
                                                        mandatory: {
                                                            OfferToReceiveAudio:
                                                                j(e),
                                                        },
                                                    }),
                                              d.debug(i),
                                              r.pc.createAnswer(
                                                  function (e) {
                                                      if (
                                                          (d.debug(e),
                                                          d.log(
                                                              "Setting local description"
                                                          ),
                                                          (r.mySdp = e.sdp),
                                                          r.pc.setLocalDescription(
                                                              e
                                                          ),
                                                          (r.mediaConstraints =
                                                              i),
                                                          r.iceDone ||
                                                              r.trickle)
                                                      ) {
                                                          var n = {
                                                              type: e.type,
                                                              sdp: e.sdp,
                                                          };
                                                          t.success(n);
                                                      } else
                                                          d.log(
                                                              "Waiting for all candidates..."
                                                          );
                                                  },
                                                  t.error,
                                                  i
                                              );
                                      })(t, r);
                                  },
                                  r.error
                              );
                },
                x = function (e, t) {
                    if (h) {
                        if (!G() && !U())
                            return (
                                d.warn("Invalid handle"),
                                void e.error("Invalid handle")
                            );
                        var r = { command: "trickle", candidate: t };
                        d.vdebug("Sending trickle candidate"),
                            d.vdebug(r),
                            f.send(JSON.stringify(r));
                    } else d.warn("Is the gateway down? (connected=false)");
                },
                _ = function () {
                    if (!G() && !U()) return d.warn("Invalid handle"), !0;
                    var e = g.webrtcConfig;
                    return null === e.pc || void 0 === e.pc
                        ? (d.warn("Invalid PeerConnection"), !0)
                        : void 0 === e.myStream || null === e.myStream
                        ? (d.warn("Invalid local MediaStream"), !0)
                        : null === e.myStream.getAudioTracks() ||
                          void 0 === e.myStream.getAudioTracks() ||
                          0 === e.myStream.getAudioTracks().length
                        ? (d.warn("No audio track"), !0)
                        : !e.myStream.getAudioTracks()[0].enabled;
                },
                M = function (e) {
                    if (!G() && !U()) return d.warn("Invalid handle"), !1;
                    var t = g.webrtcConfig;
                    return null === t.pc || void 0 === t.pc
                        ? (d.warn("Invalid PeerConnection"), !1)
                        : void 0 === t.myStream || null === t.myStream
                        ? (d.warn("Invalid local MediaStream"), !1)
                        : null === t.myStream.getAudioTracks() ||
                          void 0 === t.myStream.getAudioTracks() ||
                          0 === t.myStream.getAudioTracks().length
                        ? (d.warn("No audio track"), !1)
                        : (d.log({
                              "config.myStream.getAudioTracks()[0].enabled":
                                  t.myStream.getAudioTracks()[0].enabled,
                          }),
                          (t.myStream.getAudioTracks()[0].enabled = !e),
                          !0);
                },
                O = function () {
                    if (!G() && !U()) return d.warn("Invalid handle"), !1;
                    var e = g.webrtcConfig;
                    return e.pc.getStats &&
                        "chrome" == l.a.browserDetails.browser
                        ? null === e.remoteStream || void 0 === e.remoteStream
                            ? (d.warn("Remote stream unavailable"), 0)
                            : null === e.volume.timer ||
                              void 0 === e.volume.timer
                            ? (d.log("Starting volume monitor"),
                              (e.volume.timer = setInterval(function () {
                                  e.pc.getStats(function (t) {
                                      for (
                                          var r = t.result(), n = 0;
                                          n < r.length;
                                          n++
                                      ) {
                                          var i = r[n];
                                          "ssrc" == i.type &&
                                              i.stat("audioOutputLevel") &&
                                              (e.volume.value =
                                                  i.stat("audioOutputLevel"));
                                      }
                                  });
                              }, 200)),
                              0)
                            : e.volume.value
                        : (d.log(
                              "Getting the remote volume unsupported by browser"
                          ),
                          0);
                },
                I = function () {
                    var e = function () {
                            f.removeEventListener("message", t),
                                f.removeEventListener("error", r),
                                v && clearTimeout(v),
                                f.close();
                        },
                        t = function () {
                            d.log("websocket closed successfully"), e();
                        },
                        r = function () {
                            d.log("closing websocket on error"), e();
                        };
                    m("closed"),
                        1 == f.readyState
                            ? (f.addEventListener("message", t),
                              f.addEventListener("error", r),
                              f.send(JSON.stringify({ command: "destroy" })))
                            : r();
                },
                L = function (e) {
                    return (
                        d.debug("isAudioSendEnabled:", e),
                        null == e ||
                            (!1 !== e.audio &&
                                (void 0 === e.audioSend ||
                                    null === e.audioSend ||
                                    !0 === e.audioSend))
                    );
                },
                A = function (e) {
                    return (
                        d.debug("isAudioSendRequired:", e),
                        null != e &&
                            !1 !== e.audio &&
                            !1 !== e.audioSend &&
                            void 0 !== e.failIfNoAudio &&
                            null !== e.failIfNoAudio &&
                            !0 === e.failIfNoAudio
                    );
                },
                j = function (e) {
                    return (
                        d.debug("isAudioRecvEnabled:", e),
                        null == e ||
                            (!1 !== e.audio &&
                                (void 0 === e.audioRecv ||
                                    null === e.audioRecv ||
                                    !0 === e.audioRecv))
                    );
                },
                N = function e() {
                    if (h) {
                        v = setTimeout(e, 3e4);
                        d.log("keepalive"),
                            f.send(JSON.stringify({ command: "keepalive" }));
                    }
                },
                G = function () {
                    var e = !1;
                    return g && (e = !0), e;
                },
                U = function () {
                    var e = !1;
                    return g.webrtcConfig && (e = !0), e;
                };
            function F(e, t, r, n, i, a, o) {
                try {
                    var s = e[a](o),
                        c = s.value;
                } catch (e) {
                    return void r(e);
                }
                s.done ? t(c) : Promise.resolve(c).then(n, i);
            }
            var J = (function () {
                var e,
                    t =
                        ((e = regeneratorRuntime.mark(function e(t, r) {
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            return e.abrupt(
                                                "return",
                                                new Promise(function (e, n) {
                                                    (J.server = new WebSocket(
                                                        t.server,
                                                        [
                                                            "at-protocol",
                                                            t.capabilityToken,
                                                        ]
                                                    )),
                                                        (J.server.onopen =
                                                            function () {
                                                                var t, n;
                                                                d.log(
                                                                    "Sending initial request to Africa's Talking APIs "
                                                                ),
                                                                    (t = r),
                                                                    (n =
                                                                        J.server),
                                                                    (f = n),
                                                                    (m =
                                                                        t.emitEvent),
                                                                    (S =
                                                                        function () {
                                                                            d.error(
                                                                                "AfricasTalking Client Error: error occured on session creation"
                                                                            ),
                                                                                I();
                                                                        }),
                                                                    (y =
                                                                        function () {
                                                                            d.log(
                                                                                "Creating Session... "
                                                                            );
                                                                            var e =
                                                                                {
                                                                                    webrtcConfig:
                                                                                        {
                                                                                            started:
                                                                                                !1,
                                                                                            myStream:
                                                                                                null,
                                                                                            streamExternal:
                                                                                                !1,
                                                                                            remoteStream:
                                                                                                null,
                                                                                            mySdp: null,
                                                                                            mediaConstraints:
                                                                                                null,
                                                                                            pc: null,
                                                                                            dataChannel:
                                                                                                null,
                                                                                            dtmfSender:
                                                                                                null,
                                                                                            trickle:
                                                                                                !0,
                                                                                            iceDone:
                                                                                                !1,
                                                                                            volume: {
                                                                                                value: null,
                                                                                                timer: null,
                                                                                            },
                                                                                            bitrate:
                                                                                                {
                                                                                                    value: null,
                                                                                                    bsnow: null,
                                                                                                    bsbefore:
                                                                                                        null,
                                                                                                    tsnow: null,
                                                                                                    tsbefore:
                                                                                                        null,
                                                                                                    timer: null,
                                                                                                },
                                                                                        },
                                                                                    consentDialog:
                                                                                        t.consentDialog,
                                                                                    iceState:
                                                                                        t.iceState,
                                                                                    mediaState:
                                                                                        t.mediaState,
                                                                                    webrtcState:
                                                                                        t.webrtcState,
                                                                                    slowLink:
                                                                                        t.slowLink,
                                                                                    onmessage:
                                                                                        t.onmessage,
                                                                                    onlocalstream:
                                                                                        t.onlocalstream,
                                                                                    onremotestream:
                                                                                        t.onremotestream,
                                                                                    ondata: t.ondata,
                                                                                    ondataopen:
                                                                                        t.ondataopen,
                                                                                    oncleanup:
                                                                                        t.oncleanup,
                                                                                    getVolume:
                                                                                        function () {
                                                                                            return O();
                                                                                        },
                                                                                    isAudioMuted:
                                                                                        function () {
                                                                                            return _();
                                                                                        },
                                                                                    muteAudio:
                                                                                        function () {
                                                                                            return M(
                                                                                                !0
                                                                                            );
                                                                                        },
                                                                                    unmuteAudio:
                                                                                        function () {
                                                                                            return M(
                                                                                                !1
                                                                                            );
                                                                                        },
                                                                                    getBitrate:
                                                                                        function () {
                                                                                            return R();
                                                                                        },
                                                                                    send: function (
                                                                                        e
                                                                                    ) {
                                                                                        T(
                                                                                            e
                                                                                        );
                                                                                    },
                                                                                    data: function (
                                                                                        e
                                                                                    ) {
                                                                                        b(
                                                                                            e
                                                                                        );
                                                                                    },
                                                                                    dtmf: function (
                                                                                        e
                                                                                    ) {
                                                                                        P(
                                                                                            e
                                                                                        );
                                                                                    },
                                                                                    createOffer:
                                                                                        function (
                                                                                            e
                                                                                        ) {
                                                                                            k(
                                                                                                e
                                                                                            );
                                                                                        },
                                                                                    createAnswer:
                                                                                        function (
                                                                                            e
                                                                                        ) {
                                                                                            k(
                                                                                                e
                                                                                            );
                                                                                        },
                                                                                    handleRemoteJsep:
                                                                                        function (
                                                                                            e
                                                                                        ) {
                                                                                            w(
                                                                                                e
                                                                                            );
                                                                                        },
                                                                                    hangup: function (
                                                                                        e
                                                                                    ) {
                                                                                        E(
                                                                                            !0 ===
                                                                                                e
                                                                                        );
                                                                                    },
                                                                                };
                                                                            d.log(
                                                                                {
                                                                                    "my handle is":
                                                                                        e,
                                                                                }
                                                                            ),
                                                                                (v =
                                                                                    setTimeout(
                                                                                        N,
                                                                                        3e4
                                                                                    )),
                                                                                (h =
                                                                                    !0),
                                                                                (g =
                                                                                    e),
                                                                                t.setHandle(
                                                                                    e
                                                                                );
                                                                            var r =
                                                                                [
                                                                                    "iPad",
                                                                                    "iPhone",
                                                                                    "iPod",
                                                                                ].indexOf(
                                                                                    navigator.platform
                                                                                ) >=
                                                                                0;
                                                                            window.addEventListener(
                                                                                r
                                                                                    ? "pagehide"
                                                                                    : "unload",
                                                                                function () {
                                                                                    f.close();
                                                                                }
                                                                            );
                                                                        }),
                                                                    e(J.server);
                                                            }),
                                                        (J.server.onmessage =
                                                            function (t) {
                                                                d.log(
                                                                    "Got this message from the websocket: " +
                                                                        t.data
                                                                ),
                                                                    C(
                                                                        JSON.parse(
                                                                            t.data
                                                                        )
                                                                    ),
                                                                    e(J.server);
                                                            }),
                                                        (J.server.onclose =
                                                            function (t) {
                                                                d.log(
                                                                    "Lost connection to the gateway (is it down?)" +
                                                                        JSON.stringify(
                                                                            t
                                                                        )
                                                                ),
                                                                    I(),
                                                                    e(J.server);
                                                            }),
                                                        (J.server.onerror =
                                                            function (e) {
                                                                d.error(
                                                                    "AfricasTalking Client Error: Error connecting to the Africastalking WebSockets server... " +
                                                                        JSON.stringify(
                                                                            e
                                                                        )
                                                                ),
                                                                    n(e);
                                                            });
                                                })
                                            );
                                        case 1:
                                        case "end":
                                            return e.stop();
                                    }
                            }, e);
                        })),
                        function () {
                            var t = this,
                                r = arguments;
                            return new Promise(function (n, i) {
                                var a = e.apply(t, r);
                                function o(e) {
                                    F(a, n, i, o, s, "next", e);
                                }
                                function s(e) {
                                    F(a, n, i, o, s, "throw", e);
                                }
                                o(void 0);
                            });
                        });
                return function (e, r) {
                    return t.apply(this, arguments);
                };
            })();
            function z(e) {
                if (
                    (d.log("Library initialized: " + e),
                    d.log(
                        "Using WebSockets to contact Africastalking: " +
                            e.server
                    ),
                    null === e.capabilityToken || void 0 === e.capabilityToken)
                )
                    return e.error("No capability token specified"), {};
                d.log({ gatewayCallbacks: e });
                var t = {
                        server: e.server,
                        capabilityToken: e.capabilityToken,
                    },
                    r = {
                        setHandle: e.setHandle,
                        emitEvent: e.emitEvent,
                        destroyed: e.destroyed,
                        error: e.error,
                        oncleanup: e.oncleanup,
                        onlocalstream: e.onlocalstream,
                        onmessage: e.onmessage,
                        onremotestream: e.onremotestream,
                        consentDialog: function () {},
                        mediaState: function () {},
                        webrtcState: function () {},
                        slowLink: function () {},
                        iceState: function () {},
                    };
                J(t, r)
                    .then(function (e) {
                        e.send(JSON.stringify({ command: "create" }));
                    })
                    .catch(function (e) {
                        d.log("websocket Error: " + JSON.stringify(e));
                    });
            }
            (z.noop = function () {}),
                (z.isWebrtcSupported = function () {
                    return (
                        void 0 !== window.RTCPeerConnection &&
                        null !== window.RTCPeerConnection &&
                        void 0 !== navigator.getUserMedia &&
                        null !== navigator.getUserMedia
                    );
                });
            var V = z,
                B = {},
                W = function (e) {
                    navigator.mediaDevices &&
                        navigator.mediaDevices.enumerateDevices &&
                        (navigator.enumerateDevices = function (e) {
                            navigator.mediaDevices.enumerateDevices().then(e);
                        });
                    var t = [],
                        r = "https:" === location.protocol,
                        n = !1;
                    (("undefined" != typeof MediaStreamTrack &&
                        "getSources" in MediaStreamTrack) ||
                        (navigator.mediaDevices &&
                            navigator.mediaDevices.enumerateDevices)) &&
                        (n = !0);
                    var i,
                        a = !1,
                        o = !1;
                    (i = function () {
                        (B = { audio: a, audioCap: o }),
                            d.log({ supportedDevices: B }),
                            e();
                    }),
                        d.log({
                            "finding supported devices":
                                navigator.enumerateDevices,
                            "some if statememt": navigator.mediaDevices,
                            navigator: navigator,
                        }),
                        n
                            ? (!navigator.enumerateDevices &&
                                  window.MediaStreamTrack &&
                                  window.MediaStreamTrack.getSources &&
                                  (navigator.enumerateDevices =
                                      window.MediaStreamTrack.getSources.bind(
                                          window.MediaStreamTrack
                                      )),
                              !navigator.enumerateDevices &&
                                  navigator.enumerateDevices &&
                                  (navigator.enumerateDevices =
                                      navigator.enumerateDevices.bind(
                                          navigator
                                      )),
                              navigator.enumerateDevices
                                  ? ((t = []),
                                    navigator.enumerateDevices(function (e) {
                                        e.forEach(function (e) {
                                            var n,
                                                i = {};
                                            for (var s in e) i[s] = e[s];
                                            "audio" === i.kind &&
                                                (i.kind = "audioinput"),
                                                t.forEach(function (e) {
                                                    e.id === i.id &&
                                                        e.kind === i.kind &&
                                                        (n = !0);
                                                }),
                                                n ||
                                                    (i.deviceId ||
                                                        (i.deviceId = i.id),
                                                    i.id || (i.id = i.deviceId),
                                                    i.label
                                                        ? "audioinput" !==
                                                              i.kind ||
                                                          o ||
                                                          (o = !0)
                                                        : ((i.label =
                                                              "Please invoke getUserMedia once."),
                                                          r ||
                                                              (i.label =
                                                                  "HTTPs is required to get label of this " +
                                                                  i.kind +
                                                                  " device.")),
                                                    "audioinput" === i.kind &&
                                                        (a = !0),
                                                    t.push(i));
                                        }),
                                            i && i();
                                    }))
                                  : i && i())
                            : d.log("cant enumerate devices");
                };
            function q(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    (n.enumerable = n.enumerable || !1),
                        (n.configurable = !0),
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n);
                }
            }
            function H(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
            }
            function K(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    (n.enumerable = n.enumerable || !1),
                        (n.configurable = !0),
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n);
                }
            }
            var Y,
                $,
                X,
                Q,
                Z,
                ee,
                te = new ((function () {
                    function e() {
                        !(function (e, t) {
                            if (!(e instanceof t))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        })(this, e),
                            (this.events = {});
                    }
                    var t, r, n;
                    return (
                        (t = e),
                        (r = [
                            {
                                key: "subscribe",
                                value: function (e, t) {
                                    var r = this;
                                    return (
                                        this.events[e] || (this.events[e] = []),
                                        this.events[e].push(t),
                                        function () {
                                            r.events[e] = r.events[e].filter(
                                                function (e) {
                                                    return t !== e;
                                                }
                                            );
                                        }
                                    );
                                },
                            },
                            {
                                key: "emit",
                                value: function (e, t) {
                                    var r = this.events[e];
                                    r &&
                                        r.forEach(function (e) {
                                            e.call(null, t);
                                        });
                                },
                            },
                            {
                                key: "unsubscribe",
                                value: function (e) {
                                    var t = this.events[e];
                                    return (
                                        this.events[e] || (this.events[e] = []),
                                        t && this.events.splice(t),
                                        this
                                    );
                                },
                            },
                            {
                                key: "unsubscribeAll",
                                value: function () {
                                    return (this.events = {}), this;
                                },
                            },
                        ]) && q(t.prototype, r),
                        n && q(t, n),
                        e
                    );
                })())(),
                re = !1,
                ne = (function () {
                    function e(t) {
                        var r =
                            arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : {};
                        H(this, e);
                        var n = r.iceServers,
                            i = void 0 === n ? [] : n,
                            a = r.sounds,
                            o = void 0 === a ? {} : a;
                        (this.token = t),
                            (this.initDone = !1),
                            this.iceServers,
                            (this.atwebsocketUrl =
                                "wss://webrtc.africastalking.com/connect"),
                            Array.isArray(i) &&
                                i.length > 0 &&
                                (this.iceServers = de(i));
                        var s = ce(o);
                        (Z = new Audio(s.ringing)),
                            (ee = new Audio(s.dialing)),
                            d.log({ ringing: Z, dialing: ee }),
                            d.log({ iceServers: this.iceServers }),
                            ie.bind(this)();
                    }
                    var t, r, n;
                    return (
                        (t = e),
                        (r = [
                            {
                                key: "on",
                                value: function (e, t) {
                                    te.subscribe(e, t);
                                },
                            },
                            {
                                key: "logout",
                                value: function () {
                                    Y &&
                                        Y.send({
                                            message: { request: "unregister" },
                                        });
                                },
                            },
                            {
                                key: "hold",
                                value: function () {
                                    Y &&
                                        Y.send({
                                            message: { request: "hold" },
                                        });
                                },
                            },
                            {
                                key: "unhold",
                                value: function () {
                                    Y &&
                                        Y.send({
                                            message: { request: "unhold" },
                                        });
                                },
                            },
                            {
                                key: "call",
                                value: function (e) {
                                    //ee.play();
                                    var t = this.iceServers;
                                    W(function () {
                                        Y.createOffer({
                                            iceServers: t,
                                            media: {
                                                audioSend: !0,
                                                audioRecv: !0,
                                            },
                                            success: function (t) {
                                                d.debug("Got SDP!"),
                                                    d.debug(t),
                                                    d.log({ to: e, jsep: t });
                                                var r = {
                                                    request: "call",
                                                    to: e,
                                                };
                                                Y.send({ message: r, jsep: t }),
                                                    (Q = e);
                                            },
                                            error: function (e) {
                                                d.error(
                                                    "AfricasTalking Client Error: ",
                                                    e
                                                );
                                            },
                                        });
                                    });
                                },
                            },
                            {
                                key: "answer",
                                value: function () {
                                    var e = this.iceServers;
                                    ($ = null),
                                        W(function () {
                                            Y.createAnswer({
                                                jsep: X,
                                                iceServers: e,
                                                media: { audio: !0 },
                                                success: function (e) {
                                                    d.debug(
                                                        "Got SDP! audio=true, video=" +
                                                            !0
                                                    ),
                                                        d.debug(e),
                                                        Y.send({
                                                            message: {
                                                                request:
                                                                    "accept",
                                                            },
                                                            jsep: e,
                                                        });
                                                },
                                                error: function (e) {
                                                    d.error(
                                                        "AfricasTalking Client Error: ",
                                                        e
                                                    ),
                                                        Y.send({
                                                            message: {
                                                                request:
                                                                    "decline",
                                                                code: 480,
                                                            },
                                                        });
                                                },
                                            });
                                        });
                                },
                            },
                            {
                                key: "dtmf",
                                value: function (e) {
                                    Y.dtmf({ dtmf: { tones: e } });
                                },
                            },
                            {
                                key: "muteAudio",
                                value: function () {
                                    return Y.muteAudio();
                                },
                            },
                            {
                                key: "unmuteAudio",
                                value: function () {
                                    return Y.unmuteAudio();
                                },
                            },
                            {
                                key: "getVolume",
                                value: function () {
                                    return Y.getVolume();
                                },
                            },
                            {
                                key: "isAudioMuted",
                                value: function () {
                                    return Y.isMuted();
                                },
                            },
                            {
                                key: "hangup",
                                value: function () {
                                    $
                                        ? oe()
                                        : (Y.send({
                                              message: { request: "hangup" },
                                          }),
                                          Y.hangup());
                                },
                            },
                            {
                                key: "getCounterpartNum",
                                value: function () {
                                    return Q;
                                },
                            },
                        ]) && K(t.prototype, r),
                        n && K(t, n),
                        e
                    );
                })();
            function ie() {
                var e = document.getElementById("remote-stream-audio");
                Y
                    ? ae()
                    : !0 !== this.initDone &&
                      (d.log("creating remoteStreamAudio", e, Z, ee),
                      e ||
                          (((e = document.createElement("audio")).id =
                              "remote-stream-audio"),
                          (e.autoplay = !0),
                          document.body.appendChild(e)),
                      (Z.loop = !0),
                      (ee.loop = !0),
                      (this.initDone = !0),
                      V.isWebrtcSupported()
                          ? new V({
                                server: this.atwebsocketUrl,
                                capabilityToken: this.token,
                                setHandle: function (e) {
                                    (Y = e),
                                        W(function () {
                                            ae();
                                        });
                                },
                                onmessage: function (e, t) {
                                    d.log(" ::: Got a message :::"),
                                        d.log(JSON.stringify(e));
                                    var r = e.error;
                                    if (null == r || null == r) {
                                        var n = e.result;
                                        if (
                                            (d.log(
                                                "This is the result " +
                                                    n.toString
                                            ),
                                            null != n &&
                                                void 0 !== n.event &&
                                                null !== n.event)
                                        ) {
                                            var i = n.event;
                                            switch (i) {
                                                case "registration_failed":
                                                    return (
                                                        d.log(
                                                            "Registration failed: " +
                                                                n.code +
                                                                " " +
                                                                n.reason
                                                        ),
                                                        void ae()
                                                    );
                                                case "registered":
                                                    d.log(
                                                        "Successfully registered as " +
                                                            n.username +
                                                            "!"
                                                    ),
                                                        re ||
                                                            ((re = !0),
                                                            te.emit("ready"));
                                                    break;
                                                case "unregistered":
                                                    d.log(
                                                        "Successfully unregistered as " +
                                                            n.username +
                                                            "!"
                                                    ),
                                                        re &&
                                                            ((re = !1),
                                                            te.emit(
                                                                "notready"
                                                            ));
                                                    break;
                                                case "calling":
                                                    d.log(
                                                        "Waiting for the peer to answer..."
                                                    ),
                                                        te.emit("calling");
                                                    break;
                                                case "incomingcall":
                                                    (Q = e.result.username
                                                        .split("@")[0]
                                                        .split(":")[1]),
                                                        ($ = !0),
                                                        Z.play(),
                                                        d.log(
                                                            "Incoming call from " +
                                                                n.username +
                                                                "!"
                                                        ),
                                                        (X = t),
                                                        te.emit(
                                                            "incomingcall",
                                                            { from: Q }
                                                        );
                                                    break;
                                                case "progress":
                                                    d.log(
                                                        "There's early media from " +
                                                            n.username +
                                                            ", wairing for the call!"
                                                    ),
                                                        null != t && se(t);
                                                    break;
                                                case "missed_call":
                                                    (Q = e.result.caller
                                                        .split("@")[0]
                                                        .split(":")[1]),
                                                        d.log(
                                                            "Missed call from " +
                                                                n.caller +
                                                                "!"
                                                        ),
                                                        te.emit("missedcall", {
                                                            from: Q,
                                                        });
                                                    break;
                                                case "accepted":
                                                    ee.pause(),
                                                        Z.pause(),
                                                        d.log(
                                                            n.username +
                                                                " accepted the call!"
                                                        ),
                                                        null != t && se(t),
                                                        te.emit("callaccepted");
                                                    break;
                                                case "hangup":
                                                    ($ = null),
                                                        ee.pause(),
                                                        Z.pause(),
                                                        d.log(
                                                            "Call hung up (" +
                                                                n.code +
                                                                " " +
                                                                n.reason +
                                                                ")!"
                                                        ),
                                                        Y.hangup(),
                                                        te.emit("hangup", {
                                                            code: n.code,
                                                            reason: n.reason,
                                                        });
                                                    break;
                                                case "decline":
                                                    ($ = null),
                                                        ee.pause(),
                                                        Z.pause(),
                                                        d.log("Call declined!"),
                                                        Y.hangup(),
                                                        te.emit("hangup");
                                                    break;
                                                default:
                                                    d.log(
                                                        "Received random json request " +
                                                            i.toString
                                                    );
                                            }
                                        }
                                    } else
                                        re
                                            ? (ee.pause(),
                                              Z.pause(),
                                              Y.hangup())
                                            : d.log(
                                                  "User is not registered" + r
                                              );
                                },
                                emitEvent: function (e) {
                                    te.emit(e);
                                },
                                onlocalstream: function (e) {
                                    d.log(" ::: Got a local stream :::"),
                                        d.log(JSON.stringify(e));
                                },
                                onremotestream: function (t) {
                                    d.debug(" ::: Got a remote stream :::"),
                                        d.debug(JSON.stringify(t));
                                    var r = t.getAudioTracks();
                                    !(function (e, t) {
                                        "chrome" === l.a.browserDetails.browser
                                            ? l.a.browserDetails.version >= 43
                                                ? (e.srcObject = t)
                                                : void 0 !== e.src
                                                ? (e.src =
                                                      URL.createObjectURL(t))
                                                : d.error(
                                                      "AfricasTalking Client Error: Error attaching media stream to element"
                                                  )
                                            : (e.srcObject = t);
                                    })(e, new MediaStream(r));
                                },
                                oncleanup: function () {
                                    d.log(
                                        " ::: Got a cleanup notification :::"
                                    );
                                },
                                error: function (e) {
                                    !1,
                                        (re = !1),
                                        d.error(
                                            "Africastalking Client Error: " + e
                                        ),
                                        te.unsubscribeAll();
                                },
                                destroyed: function () {
                                    !1, (re = !1), te.unsubscribeAll();
                                },
                            })
                          : d.error(
                                "AfricasTalking Client Error: No WebRTC support"
                            ));
            }
            var ae = function () {
                    if (Y) {
                        d.log({ "loggin in with handle in client": Y }),
                            Y.send({ message: { request: "register" } });
                    } else
                        d.error("Africastalking error: Unable to initialize");
                },
                oe = function () {
                    $ = null;
                    Y.send({ message: { request: "decline" } });
                },
                se = function (e) {
                    Y.handleRemoteJsep({
                        jsep: e,
                        error: function () {
                            Y.send({ message: { request: "hangup" } }),
                                Y.hangup();
                        },
                    });
                },
                ce = function (e) {
                    return {
                        dialing: e.dialing
                            ? e.dialing
                            : "https://res.cloudinary.com/at-voice/video/upload/v1558426588/AT-voice-client-sdk/dialing_g4tn6r.mp3",
                        ringing: e.ringing
                            ? e.ringing
                            : "https://res.cloudinary.com/at-voice/video/upload/v1558426103/AT-voice-client-sdk/ringing_au0d1x.mp3",
                    };
                },
                de = function (e) {
                    var t = [];
                    return (
                        e.forEach(function (e) {
                            if (
                                "string" == typeof e.urls &&
                                e.urls.startsWith("stun:")
                            )
                                t.push({ urls: e.urls });
                            else if (
                                "string" == typeof e.urls &&
                                (e.urls.startsWith("turn:") ||
                                    e.urls.startsWith("turns:"))
                            )
                                t.push({
                                    urls: e.urls,
                                    username: e.username,
                                    credential: e.credential,
                                });
                            else if (Array.isArray(e.urls)) {
                                var r = e.urls.filter(function (e) {
                                    return (
                                        "string" == typeof e &&
                                        (e.startsWith("turn:") ||
                                            e.startsWith("turns:"))
                                    );
                                });
                                r.length === e.urls.length
                                    ? t.push({
                                          urls: r,
                                          username: e.username,
                                          credential: e.credential,
                                      })
                                    : d.error(
                                          "AfricasTalking Client Error: Invalid iceServer param ".concat(
                                              JSON.stringify(e)
                                          )
                                      );
                            } else
                                d.error(
                                    "AfricasTalking Client Error: Invalid iceServer param ".concat(
                                        JSON.stringify(e)
                                    )
                                );
                        }),
                        t
                    );
                },
                ue = ne;
            t.default = { Client: ue };
        },
    ]).default;
});
