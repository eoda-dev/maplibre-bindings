"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/pmtiles/dist/index.cjs
  var require_dist = __commonJS({
    "node_modules/pmtiles/dist/index.cjs"(exports, module) {
      "use strict";
      var __defProp = Object.defineProperty;
      var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __pow = Math.pow;
      var __export = (target, all) => {
        for (var name in all)
          __defProp(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
              __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
      var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = (value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          };
          var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
          step((generator = generator.apply(__this, __arguments)).next());
        });
      };
      var js_exports = {};
      __export(js_exports, {
        Compression: () => Compression,
        EtagMismatch: () => EtagMismatch,
        FetchSource: () => FetchSource,
        FileSource: () => FileSource,
        PMTiles: () => PMTiles,
        Protocol: () => Protocol,
        ResolvedValueCache: () => ResolvedValueCache,
        SharedPromiseCache: () => SharedPromiseCache,
        TileType: () => TileType,
        bytesToHeader: () => bytesToHeader,
        findTile: () => findTile,
        getUint64: () => getUint64,
        leafletRasterLayer: () => leafletRasterLayer,
        readVarint: () => readVarint,
        tileIdToZxy: () => tileIdToZxy,
        tileTypeExt: () => tileTypeExt,
        zxyToTileId: () => zxyToTileId
      });
      module.exports = __toCommonJS(js_exports);
      var u8 = Uint8Array;
      var u16 = Uint16Array;
      var i32 = Int32Array;
      var fleb = new u8([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        0,
        /* unused */
        0,
        0,
        /* impossible */
        0
      ]);
      var fdeb = new u8([
        0,
        0,
        0,
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
        11,
        11,
        12,
        12,
        13,
        13,
        /* unused */
        0,
        0
      ]);
      var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      var freb = function(eb, start) {
        var b = new u16(31);
        for (var i2 = 0; i2 < 31; ++i2) {
          b[i2] = start += 1 << eb[i2 - 1];
        }
        var r = new i32(b[30]);
        for (var i2 = 1; i2 < 30; ++i2) {
          for (var j = b[i2]; j < b[i2 + 1]; ++j) {
            r[j] = j - b[i2] << 5 | i2;
          }
        }
        return { b, r };
      };
      var _a = freb(fleb, 2);
      var fl = _a.b;
      var revfl = _a.r;
      fl[28] = 258, revfl[258] = 28;
      var _b = freb(fdeb, 0);
      var fd = _b.b;
      var revfd = _b.r;
      var rev = new u16(32768);
      for (i = 0; i < 32768; ++i) {
        x = (i & 43690) >> 1 | (i & 21845) << 1;
        x = (x & 52428) >> 2 | (x & 13107) << 2;
        x = (x & 61680) >> 4 | (x & 3855) << 4;
        rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
      }
      var x;
      var i;
      var hMap = function(cd, mb, r) {
        var s = cd.length;
        var i2 = 0;
        var l = new u16(mb);
        for (; i2 < s; ++i2) {
          if (cd[i2])
            ++l[cd[i2] - 1];
        }
        var le = new u16(mb);
        for (i2 = 1; i2 < mb; ++i2) {
          le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
        }
        var co;
        if (r) {
          co = new u16(1 << mb);
          var rvb = 15 - mb;
          for (i2 = 0; i2 < s; ++i2) {
            if (cd[i2]) {
              var sv = i2 << 4 | cd[i2];
              var r_1 = mb - cd[i2];
              var v = le[cd[i2] - 1]++ << r_1;
              for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
                co[rev[v] >> rvb] = sv;
              }
            }
          }
        } else {
          co = new u16(s);
          for (i2 = 0; i2 < s; ++i2) {
            if (cd[i2]) {
              co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
            }
          }
        }
        return co;
      };
      var flt = new u8(288);
      for (i = 0; i < 144; ++i)
        flt[i] = 8;
      var i;
      for (i = 144; i < 256; ++i)
        flt[i] = 9;
      var i;
      for (i = 256; i < 280; ++i)
        flt[i] = 7;
      var i;
      for (i = 280; i < 288; ++i)
        flt[i] = 8;
      var i;
      var fdt = new u8(32);
      for (i = 0; i < 32; ++i)
        fdt[i] = 5;
      var i;
      var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
      var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
      var max = function(a) {
        var m = a[0];
        for (var i2 = 1; i2 < a.length; ++i2) {
          if (a[i2] > m)
            m = a[i2];
        }
        return m;
      };
      var bits = function(d, p, m) {
        var o = p / 8 | 0;
        return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
      };
      var bits16 = function(d, p) {
        var o = p / 8 | 0;
        return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
      };
      var shft = function(p) {
        return (p + 7) / 8 | 0;
      };
      var slc = function(v, s, e) {
        if (s == null || s < 0)
          s = 0;
        if (e == null || e > v.length)
          e = v.length;
        var n = new u8(e - s);
        n.set(v.subarray(s, e));
        return n;
      };
      var ec = [
        "unexpected EOF",
        "invalid block type",
        "invalid length/literal",
        "invalid distance",
        "stream finished",
        "no stream handler",
        ,
        "no callback",
        "invalid UTF-8 data",
        "extra field too long",
        "date not in range 1980-2099",
        "filename too long",
        "stream finishing",
        "invalid zip data"
        // determined by unknown compression method
      ];
      var err = function(ind, msg, nt) {
        var e = new Error(msg || ec[ind]);
        e.code = ind;
        if (Error.captureStackTrace)
          Error.captureStackTrace(e, err);
        if (!nt)
          throw e;
        return e;
      };
      var inflt = function(dat, st, buf, dict) {
        var sl = dat.length, dl = dict ? dict.length : 0;
        if (!sl || st.f && !st.l)
          return buf || new u8(0);
        var noBuf = !buf || st.i != 2;
        var noSt = st.i;
        if (!buf)
          buf = new u8(sl * 3);
        var cbuf = function(l2) {
          var bl = buf.length;
          if (l2 > bl) {
            var nbuf = new u8(Math.max(bl * 2, l2));
            nbuf.set(buf);
            buf = nbuf;
          }
        };
        var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
        var tbts = sl * 8;
        do {
          if (!lm) {
            final = bits(dat, pos, 1);
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
              var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
              if (t > sl) {
                if (noSt)
                  err(0);
                break;
              }
              if (noBuf)
                cbuf(bt + l);
              buf.set(dat.subarray(s, t), bt);
              st.b = bt += l, st.p = pos = t * 8, st.f = final;
              continue;
            } else if (type == 1)
              lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
              var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
              var tl = hLit + bits(dat, pos + 5, 31) + 1;
              pos += 14;
              var ldt = new u8(tl);
              var clt = new u8(19);
              for (var i2 = 0; i2 < hcLen; ++i2) {
                clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
              }
              pos += hcLen * 3;
              var clb = max(clt), clbmsk = (1 << clb) - 1;
              var clm = hMap(clt, clb, 1);
              for (var i2 = 0; i2 < tl; ) {
                var r = clm[bits(dat, pos, clbmsk)];
                pos += r & 15;
                var s = r >> 4;
                if (s < 16) {
                  ldt[i2++] = s;
                } else {
                  var c = 0, n = 0;
                  if (s == 16)
                    n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
                  else if (s == 17)
                    n = 3 + bits(dat, pos, 7), pos += 3;
                  else if (s == 18)
                    n = 11 + bits(dat, pos, 127), pos += 7;
                  while (n--)
                    ldt[i2++] = c;
                }
              }
              var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
              lbt = max(lt);
              dbt = max(dt);
              lm = hMap(lt, lbt, 1);
              dm = hMap(dt, dbt, 1);
            } else
              err(1);
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
          }
          if (noBuf)
            cbuf(bt + 131072);
          var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
          var lpos = pos;
          for (; ; lpos = pos) {
            var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
            pos += c & 15;
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
            if (!c)
              err(2);
            if (sym < 256)
              buf[bt++] = sym;
            else if (sym == 256) {
              lpos = pos, lm = null;
              break;
            } else {
              var add = sym - 254;
              if (sym > 264) {
                var i2 = sym - 257, b = fleb[i2];
                add = bits(dat, pos, (1 << b) - 1) + fl[i2];
                pos += b;
              }
              var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
              if (!d)
                err(3);
              pos += d & 15;
              var dt = fd[dsym];
              if (dsym > 3) {
                var b = fdeb[dsym];
                dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
              }
              if (pos > tbts) {
                if (noSt)
                  err(0);
                break;
              }
              if (noBuf)
                cbuf(bt + 131072);
              var end = bt + add;
              if (bt < dt) {
                var shift2 = dl - dt, dend = Math.min(dt, end);
                if (shift2 + bt < 0)
                  err(3);
                for (; bt < dend; ++bt)
                  buf[bt] = dict[shift2 + bt];
              }
              for (; bt < end; bt += 4) {
                buf[bt] = buf[bt - dt];
                buf[bt + 1] = buf[bt + 1 - dt];
                buf[bt + 2] = buf[bt + 2 - dt];
                buf[bt + 3] = buf[bt + 3 - dt];
              }
              bt = end;
            }
          }
          st.l = lm, st.p = lpos, st.b = bt, st.f = final;
          if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
        } while (!final);
        return bt == buf.length ? buf : slc(buf, 0, bt);
      };
      var et = /* @__PURE__ */ new u8(0);
      var gzs = function(d) {
        if (d[0] != 31 || d[1] != 139 || d[2] != 8)
          err(6, "invalid gzip data");
        var flg = d[3];
        var st = 10;
        if (flg & 4)
          st += (d[10] | d[11] << 8) + 2;
        for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
          ;
        return st + (flg & 2);
      };
      var gzl = function(d) {
        var l = d.length;
        return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
      };
      var zls = function(d, dict) {
        if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31)
          err(6, "invalid zlib data");
        if ((d[1] >> 5 & 1) == +!dict)
          err(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
        return (d[1] >> 3 & 4) + 2;
      };
      function inflateSync(data, opts) {
        return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
      }
      function gunzipSync(data, opts) {
        var st = gzs(data);
        if (st + 8 > data.length)
          err(6, "invalid gzip data");
        return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
      }
      function unzlibSync(data, opts) {
        return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
      }
      function decompressSync(data, opts) {
        return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, opts) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, opts) : unzlibSync(data, opts);
      }
      var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
      var tds = 0;
      try {
        td.decode(et, { stream: true });
        tds = 1;
      } catch (e) {
      }
      var shift = (n, shift2) => {
        return n * __pow(2, shift2);
      };
      var unshift = (n, shift2) => {
        return Math.floor(n / __pow(2, shift2));
      };
      var getUint24 = (view, pos) => {
        return shift(view.getUint16(pos + 1, true), 8) + view.getUint8(pos);
      };
      var getUint48 = (view, pos) => {
        return shift(view.getUint32(pos + 2, true), 16) + view.getUint16(pos, true);
      };
      var compare = (tz, tx, ty, view, i2) => {
        if (tz !== view.getUint8(i2))
          return tz - view.getUint8(i2);
        const x2 = getUint24(view, i2 + 1);
        if (tx !== x2)
          return tx - x2;
        const y = getUint24(view, i2 + 4);
        if (ty !== y)
          return ty - y;
        return 0;
      };
      var queryLeafdir = (view, z, x2, y) => {
        const offsetLen = queryView(view, z | 128, x2, y);
        if (offsetLen) {
          return {
            z,
            x: x2,
            y,
            offset: offsetLen[0],
            length: offsetLen[1],
            isDir: true
          };
        }
        return null;
      };
      var queryTile = (view, z, x2, y) => {
        const offsetLen = queryView(view, z, x2, y);
        if (offsetLen) {
          return {
            z,
            x: x2,
            y,
            offset: offsetLen[0],
            length: offsetLen[1],
            isDir: false
          };
        }
        return null;
      };
      var queryView = (view, z, x2, y) => {
        let m = 0;
        let n = view.byteLength / 17 - 1;
        while (m <= n) {
          const k = n + m >> 1;
          const cmp = compare(z, x2, y, view, k * 17);
          if (cmp > 0) {
            m = k + 1;
          } else if (cmp < 0) {
            n = k - 1;
          } else {
            return [getUint48(view, k * 17 + 7), view.getUint32(k * 17 + 13, true)];
          }
        }
        return null;
      };
      var entrySort = (a, b) => {
        if (a.isDir && !b.isDir) {
          return 1;
        }
        if (!a.isDir && b.isDir) {
          return -1;
        }
        if (a.z !== b.z) {
          return a.z - b.z;
        }
        if (a.x !== b.x) {
          return a.x - b.x;
        }
        return a.y - b.y;
      };
      var parseEntry = (dataview, i2) => {
        const zRaw = dataview.getUint8(i2 * 17);
        const z = zRaw & 127;
        return {
          z,
          x: getUint24(dataview, i2 * 17 + 1),
          y: getUint24(dataview, i2 * 17 + 4),
          offset: getUint48(dataview, i2 * 17 + 7),
          length: dataview.getUint32(i2 * 17 + 13, true),
          isDir: zRaw >> 7 === 1
        };
      };
      var sortDir = (a) => {
        const entries = [];
        const view = new DataView(a);
        for (let i2 = 0; i2 < view.byteLength / 17; i2++) {
          entries.push(parseEntry(view, i2));
        }
        return createDirectory(entries);
      };
      var createDirectory = (entries) => {
        entries.sort(entrySort);
        const buffer = new ArrayBuffer(17 * entries.length);
        const arr = new Uint8Array(buffer);
        for (let i2 = 0; i2 < entries.length; i2++) {
          const entry = entries[i2];
          let z = entry.z;
          if (entry.isDir)
            z = z | 128;
          arr[i2 * 17] = z;
          arr[i2 * 17 + 1] = entry.x & 255;
          arr[i2 * 17 + 2] = entry.x >> 8 & 255;
          arr[i2 * 17 + 3] = entry.x >> 16 & 255;
          arr[i2 * 17 + 4] = entry.y & 255;
          arr[i2 * 17 + 5] = entry.y >> 8 & 255;
          arr[i2 * 17 + 6] = entry.y >> 16 & 255;
          arr[i2 * 17 + 7] = entry.offset & 255;
          arr[i2 * 17 + 8] = unshift(entry.offset, 8) & 255;
          arr[i2 * 17 + 9] = unshift(entry.offset, 16) & 255;
          arr[i2 * 17 + 10] = unshift(entry.offset, 24) & 255;
          arr[i2 * 17 + 11] = unshift(entry.offset, 32) & 255;
          arr[i2 * 17 + 12] = unshift(entry.offset, 48) & 255;
          arr[i2 * 17 + 13] = entry.length & 255;
          arr[i2 * 17 + 14] = entry.length >> 8 & 255;
          arr[i2 * 17 + 15] = entry.length >> 16 & 255;
          arr[i2 * 17 + 16] = entry.length >> 24 & 255;
        }
        return buffer;
      };
      var deriveLeaf = (view, tile) => {
        if (view.byteLength < 17)
          return null;
        const numEntries = view.byteLength / 17;
        const entry = parseEntry(view, numEntries - 1);
        if (entry.isDir) {
          const leafLevel = entry.z;
          const levelDiff = tile.z - leafLevel;
          const leafX = Math.trunc(tile.x / (1 << levelDiff));
          const leafY = Math.trunc(tile.y / (1 << levelDiff));
          return { z: leafLevel, x: leafX, y: leafY };
        }
        return null;
      };
      function getHeader(source) {
        return __async(this, null, function* () {
          const resp = yield source.getBytes(0, 512e3);
          const dataview = new DataView(resp.data);
          const jsonSize = dataview.getUint32(4, true);
          const rootEntries = dataview.getUint16(8, true);
          const dec = new TextDecoder("utf-8");
          const jsonMetadata = JSON.parse(
            dec.decode(new DataView(resp.data, 10, jsonSize))
          );
          let tileCompression = 0;
          if (jsonMetadata.compression === "gzip") {
            tileCompression = 2;
          }
          let minzoom = 0;
          if ("minzoom" in jsonMetadata) {
            minzoom = +jsonMetadata.minzoom;
          }
          let maxzoom = 0;
          if ("maxzoom" in jsonMetadata) {
            maxzoom = +jsonMetadata.maxzoom;
          }
          let centerLon = 0;
          let centerLat = 0;
          let centerZoom = 0;
          let minLon = -180;
          let minLat = -85;
          let maxLon = 180;
          let maxLat = 85;
          if (jsonMetadata.bounds) {
            const split = jsonMetadata.bounds.split(",");
            minLon = +split[0];
            minLat = +split[1];
            maxLon = +split[2];
            maxLat = +split[3];
          }
          if (jsonMetadata.center) {
            const split = jsonMetadata.center.split(",");
            centerLon = +split[0];
            centerLat = +split[1];
            centerZoom = +split[2];
          }
          const header = {
            specVersion: dataview.getUint16(2, true),
            rootDirectoryOffset: 10 + jsonSize,
            rootDirectoryLength: rootEntries * 17,
            jsonMetadataOffset: 10,
            jsonMetadataLength: jsonSize,
            leafDirectoryOffset: 0,
            leafDirectoryLength: void 0,
            tileDataOffset: 0,
            tileDataLength: void 0,
            numAddressedTiles: 0,
            numTileEntries: 0,
            numTileContents: 0,
            clustered: false,
            internalCompression: 1,
            tileCompression,
            tileType: 1,
            minZoom: minzoom,
            maxZoom: maxzoom,
            minLon,
            minLat,
            maxLon,
            maxLat,
            centerZoom,
            centerLon,
            centerLat,
            etag: resp.etag
          };
          return header;
        });
      }
      function getZxy(header, source, cache, z, x2, y, signal) {
        return __async(this, null, function* () {
          let rootDir = yield cache.getArrayBuffer(
            source,
            header.rootDirectoryOffset,
            header.rootDirectoryLength,
            header
          );
          if (header.specVersion === 1) {
            rootDir = sortDir(rootDir);
          }
          const entry = queryTile(new DataView(rootDir), z, x2, y);
          if (entry) {
            const resp = yield source.getBytes(entry.offset, entry.length, signal);
            let tileData = resp.data;
            const view = new DataView(tileData);
            if (view.getUint8(0) === 31 && view.getUint8(1) === 139) {
              tileData = decompressSync(new Uint8Array(tileData));
            }
            return {
              data: tileData
            };
          }
          const leafcoords = deriveLeaf(new DataView(rootDir), { z, x: x2, y });
          if (leafcoords) {
            const leafdirEntry = queryLeafdir(
              new DataView(rootDir),
              leafcoords.z,
              leafcoords.x,
              leafcoords.y
            );
            if (leafdirEntry) {
              let leafDir = yield cache.getArrayBuffer(
                source,
                leafdirEntry.offset,
                leafdirEntry.length,
                header
              );
              if (header.specVersion === 1) {
                leafDir = sortDir(leafDir);
              }
              const tileEntry = queryTile(new DataView(leafDir), z, x2, y);
              if (tileEntry) {
                const resp = yield source.getBytes(
                  tileEntry.offset,
                  tileEntry.length,
                  signal
                );
                let tileData = resp.data;
                const view = new DataView(tileData);
                if (view.getUint8(0) === 31 && view.getUint8(1) === 139) {
                  tileData = decompressSync(new Uint8Array(tileData));
                }
                return {
                  data: tileData
                };
              }
            }
          }
          return void 0;
        });
      }
      var v2_default = {
        getHeader,
        getZxy
      };
      var leafletRasterLayer = (source, options) => {
        let loaded = false;
        let mimeType = "";
        const cls = L.GridLayer.extend({
          createTile: (coord, done) => {
            const el = document.createElement("img");
            const controller = new AbortController();
            const signal = controller.signal;
            el.cancel = () => {
              controller.abort();
            };
            if (!loaded) {
              source.getHeader().then((header) => {
                if (header.tileType === 1) {
                  console.error(
                    "Error: archive contains MVT vector tiles, but leafletRasterLayer is for displaying raster tiles. See https://github.com/protomaps/PMTiles/tree/main/js for details."
                  );
                } else if (header.tileType === 2) {
                  mimeType = "image/png";
                } else if (header.tileType === 3) {
                  mimeType = "image/jpeg";
                } else if (header.tileType === 4) {
                  mimeType = "image/webp";
                } else if (header.tileType === 5) {
                  mimeType = "image/avif";
                }
              });
              loaded = true;
            }
            source.getZxy(coord.z, coord.x, coord.y, signal).then((arr) => {
              if (arr) {
                const blob = new Blob([arr.data], { type: mimeType });
                const imageUrl = window.URL.createObjectURL(blob);
                el.src = imageUrl;
                el.cancel = void 0;
                done(void 0, el);
              }
            }).catch((e) => {
              if (e.name !== "AbortError") {
                throw e;
              }
            });
            return el;
          },
          _removeTile: function(key) {
            const tile = this._tiles[key];
            if (!tile) {
              return;
            }
            if (tile.el.cancel)
              tile.el.cancel();
            tile.el.width = 0;
            tile.el.height = 0;
            tile.el.deleted = true;
            L.DomUtil.remove(tile.el);
            delete this._tiles[key];
            this.fire("tileunload", {
              tile: tile.el,
              coords: this._keyToTileCoords(key)
            });
          }
        });
        return new cls(options);
      };
      var v3compat = (v4) => (requestParameters, arg2) => {
        if (arg2 instanceof AbortController) {
          return v4(requestParameters, arg2);
        }
        const abortController = new AbortController();
        v4(requestParameters, abortController).then(
          (result) => {
            return arg2(
              void 0,
              result.data,
              result.cacheControl || "",
              result.expires || ""
            );
          },
          (err2) => {
            return arg2(err2);
          }
        ).catch((e) => {
          return arg2(e);
        });
        return { cancel: () => abortController.abort() };
      };
      var Protocol = class {
        /**
         * Initialize the MapLibre PMTiles protocol.
         *
         * * metadata: also load the metadata section of the PMTiles. required for some "inspect" functionality
         * and to automatically populate the map attribution. Requires an extra HTTP request.
         */
        constructor(options) {
          this.tilev4 = (params, abortController) => __async(this, null, function* () {
            if (params.type === "json") {
              const pmtilesUrl2 = params.url.substr(10);
              let instance2 = this.tiles.get(pmtilesUrl2);
              if (!instance2) {
                instance2 = new PMTiles(pmtilesUrl2);
                this.tiles.set(pmtilesUrl2, instance2);
              }
              if (this.metadata) {
                return {
                  data: yield instance2.getTileJson(params.url)
                };
              }
              const h = yield instance2.getHeader();
              return {
                data: {
                  tiles: [`${params.url}/{z}/{x}/{y}`],
                  minzoom: h.minZoom,
                  maxzoom: h.maxZoom,
                  bounds: [h.minLon, h.minLat, h.maxLon, h.maxLat]
                }
              };
            }
            const re = new RegExp(/pmtiles:\/\/(.+)\/(\d+)\/(\d+)\/(\d+)/);
            const result = params.url.match(re);
            if (!result) {
              throw new Error("Invalid PMTiles protocol URL");
            }
            const pmtilesUrl = result[1];
            let instance = this.tiles.get(pmtilesUrl);
            if (!instance) {
              instance = new PMTiles(pmtilesUrl);
              this.tiles.set(pmtilesUrl, instance);
            }
            const z = result[2];
            const x2 = result[3];
            const y = result[4];
            const header = yield instance.getHeader();
            const resp = yield instance == null ? void 0 : instance.getZxy(+z, +x2, +y, abortController.signal);
            if (resp) {
              return {
                data: new Uint8Array(resp.data),
                cacheControl: resp.cacheControl,
                expires: resp.expires
              };
            }
            if (header.tileType === 1) {
              return { data: new Uint8Array() };
            }
            return { data: null };
          });
          this.tile = v3compat(this.tilev4);
          this.tiles = /* @__PURE__ */ new Map();
          this.metadata = (options == null ? void 0 : options.metadata) || false;
        }
        /**
         * Add a {@link PMTiles} instance to the global protocol instance.
         *
         * For remote fetch sources, references in MapLibre styles like pmtiles://http://...
         * will resolve to the same instance if the URLs match.
         */
        add(p) {
          this.tiles.set(p.source.getKey(), p);
        }
        /**
         * Fetch a {@link PMTiles} instance by URL, for remote PMTiles instances.
         */
        get(url) {
          return this.tiles.get(url);
        }
      };
      function toNum(low, high) {
        return (high >>> 0) * 4294967296 + (low >>> 0);
      }
      function readVarintRemainder(l, p) {
        const buf = p.buf;
        let b = buf[p.pos++];
        let h = (b & 112) >> 4;
        if (b < 128)
          return toNum(l, h);
        b = buf[p.pos++];
        h |= (b & 127) << 3;
        if (b < 128)
          return toNum(l, h);
        b = buf[p.pos++];
        h |= (b & 127) << 10;
        if (b < 128)
          return toNum(l, h);
        b = buf[p.pos++];
        h |= (b & 127) << 17;
        if (b < 128)
          return toNum(l, h);
        b = buf[p.pos++];
        h |= (b & 127) << 24;
        if (b < 128)
          return toNum(l, h);
        b = buf[p.pos++];
        h |= (b & 1) << 31;
        if (b < 128)
          return toNum(l, h);
        throw new Error("Expected varint not more than 10 bytes");
      }
      function readVarint(p) {
        const buf = p.buf;
        let b = buf[p.pos++];
        let val = b & 127;
        if (b < 128)
          return val;
        b = buf[p.pos++];
        val |= (b & 127) << 7;
        if (b < 128)
          return val;
        b = buf[p.pos++];
        val |= (b & 127) << 14;
        if (b < 128)
          return val;
        b = buf[p.pos++];
        val |= (b & 127) << 21;
        if (b < 128)
          return val;
        b = buf[p.pos];
        val |= (b & 15) << 28;
        return readVarintRemainder(val, p);
      }
      function rotate(n, xy, rx, ry) {
        if (ry === 0) {
          if (rx === 1) {
            xy[0] = n - 1 - xy[0];
            xy[1] = n - 1 - xy[1];
          }
          const t = xy[0];
          xy[0] = xy[1];
          xy[1] = t;
        }
      }
      function idOnLevel(z, pos) {
        const n = __pow(2, z);
        let rx = pos;
        let ry = pos;
        let t = pos;
        const xy = [0, 0];
        let s = 1;
        while (s < n) {
          rx = 1 & t / 2;
          ry = 1 & (t ^ rx);
          rotate(s, xy, rx, ry);
          xy[0] += s * rx;
          xy[1] += s * ry;
          t = t / 4;
          s *= 2;
        }
        return [z, xy[0], xy[1]];
      }
      var tzValues = [
        0,
        1,
        5,
        21,
        85,
        341,
        1365,
        5461,
        21845,
        87381,
        349525,
        1398101,
        5592405,
        22369621,
        89478485,
        357913941,
        1431655765,
        5726623061,
        22906492245,
        91625968981,
        366503875925,
        1466015503701,
        5864062014805,
        23456248059221,
        93824992236885,
        375299968947541,
        1501199875790165
      ];
      function zxyToTileId(z, x2, y) {
        if (z > 26) {
          throw Error("Tile zoom level exceeds max safe number limit (26)");
        }
        if (x2 > __pow(2, z) - 1 || y > __pow(2, z) - 1) {
          throw Error("tile x/y outside zoom level bounds");
        }
        const acc = tzValues[z];
        const n = __pow(2, z);
        let rx = 0;
        let ry = 0;
        let d = 0;
        const xy = [x2, y];
        let s = n / 2;
        while (s > 0) {
          rx = (xy[0] & s) > 0 ? 1 : 0;
          ry = (xy[1] & s) > 0 ? 1 : 0;
          d += s * s * (3 * rx ^ ry);
          rotate(s, xy, rx, ry);
          s = s / 2;
        }
        return acc + d;
      }
      function tileIdToZxy(i2) {
        let acc = 0;
        const z = 0;
        for (let z2 = 0; z2 < 27; z2++) {
          const numTiles = (1 << z2) * (1 << z2);
          if (acc + numTiles > i2) {
            return idOnLevel(z2, i2 - acc);
          }
          acc += numTiles;
        }
        throw Error("Tile zoom level exceeds max safe number limit (26)");
      }
      var Compression = /* @__PURE__ */ ((Compression2) => {
        Compression2[Compression2["Unknown"] = 0] = "Unknown";
        Compression2[Compression2["None"] = 1] = "None";
        Compression2[Compression2["Gzip"] = 2] = "Gzip";
        Compression2[Compression2["Brotli"] = 3] = "Brotli";
        Compression2[Compression2["Zstd"] = 4] = "Zstd";
        return Compression2;
      })(Compression || {});
      function defaultDecompress(buf, compression) {
        return __async(this, null, function* () {
          if (compression === 1 || compression === 0) {
            return buf;
          }
          if (compression === 2) {
            if (typeof globalThis.DecompressionStream === "undefined") {
              return decompressSync(new Uint8Array(buf));
            }
            const stream = new Response(buf).body;
            if (!stream) {
              throw Error("Failed to read response stream");
            }
            const result = stream.pipeThrough(
              // biome-ignore lint: needed to detect DecompressionStream in browser+node+cloudflare workers
              new globalThis.DecompressionStream("gzip")
            );
            return new Response(result).arrayBuffer();
          }
          throw Error("Compression method not supported");
        });
      }
      var TileType = /* @__PURE__ */ ((TileType2) => {
        TileType2[TileType2["Unknown"] = 0] = "Unknown";
        TileType2[TileType2["Mvt"] = 1] = "Mvt";
        TileType2[TileType2["Png"] = 2] = "Png";
        TileType2[TileType2["Jpeg"] = 3] = "Jpeg";
        TileType2[TileType2["Webp"] = 4] = "Webp";
        TileType2[TileType2["Avif"] = 5] = "Avif";
        return TileType2;
      })(TileType || {});
      function tileTypeExt(t) {
        if (t === 1)
          return ".mvt";
        if (t === 2)
          return ".png";
        if (t === 3)
          return ".jpg";
        if (t === 4)
          return ".webp";
        if (t === 5)
          return ".avif";
        return "";
      }
      var HEADER_SIZE_BYTES = 127;
      function findTile(entries, tileId) {
        let m = 0;
        let n = entries.length - 1;
        while (m <= n) {
          const k = n + m >> 1;
          const cmp = tileId - entries[k].tileId;
          if (cmp > 0) {
            m = k + 1;
          } else if (cmp < 0) {
            n = k - 1;
          } else {
            return entries[k];
          }
        }
        if (n >= 0) {
          if (entries[n].runLength === 0) {
            return entries[n];
          }
          if (tileId - entries[n].tileId < entries[n].runLength) {
            return entries[n];
          }
        }
        return null;
      }
      var FileSource = class {
        constructor(file) {
          this.file = file;
        }
        getKey() {
          return this.file.name;
        }
        getBytes(offset, length) {
          return __async(this, null, function* () {
            const blob = this.file.slice(offset, offset + length);
            const a = yield blob.arrayBuffer();
            return { data: a };
          });
        }
      };
      var FetchSource = class {
        constructor(url, customHeaders = new Headers()) {
          this.url = url;
          this.customHeaders = customHeaders;
          this.mustReload = false;
          let userAgent = "";
          if ("navigator" in globalThis) {
            userAgent = globalThis.navigator.userAgent || "";
          }
          const isWindows = userAgent.indexOf("Windows") > -1;
          const isChromiumBased = /Chrome|Chromium|Edg|OPR|Brave/.test(userAgent);
          this.chromeWindowsNoCache = false;
          if (isWindows && isChromiumBased) {
            this.chromeWindowsNoCache = true;
          }
        }
        getKey() {
          return this.url;
        }
        /**
         * Mutate the custom [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) set for all requests to the remote archive.
         */
        setHeaders(customHeaders) {
          this.customHeaders = customHeaders;
        }
        getBytes(offset, length, passedSignal, etag) {
          return __async(this, null, function* () {
            let controller;
            let signal;
            if (passedSignal) {
              signal = passedSignal;
            } else {
              controller = new AbortController();
              signal = controller.signal;
            }
            const requestHeaders = new Headers(this.customHeaders);
            requestHeaders.set("range", `bytes=${offset}-${offset + length - 1}`);
            let cache;
            if (this.mustReload) {
              cache = "reload";
            } else if (this.chromeWindowsNoCache) {
              cache = "no-store";
            }
            let resp = yield fetch(this.url, {
              signal,
              cache,
              headers: requestHeaders
              //biome-ignore lint: "cache" is incompatible between cloudflare workers and browser
            });
            if (offset === 0 && resp.status === 416) {
              const contentRange = resp.headers.get("Content-Range");
              if (!contentRange || !contentRange.startsWith("bytes */")) {
                throw Error("Missing content-length on 416 response");
              }
              const actualLength = +contentRange.substr(8);
              resp = yield fetch(this.url, {
                signal,
                cache: "reload",
                headers: { range: `bytes=0-${actualLength - 1}` }
                //biome-ignore lint: "cache" is incompatible between cloudflare workers and browser
              });
            }
            let newEtag = resp.headers.get("Etag");
            if (newEtag == null ? void 0 : newEtag.startsWith("W/")) {
              newEtag = null;
            }
            if (resp.status === 416 || etag && newEtag && newEtag !== etag) {
              this.mustReload = true;
              throw new EtagMismatch(
                `Server returned non-matching ETag ${etag} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`
              );
            }
            if (resp.status >= 300) {
              throw Error(`Bad response code: ${resp.status}`);
            }
            const contentLength = resp.headers.get("Content-Length");
            if (resp.status === 200 && (!contentLength || +contentLength > length)) {
              if (controller)
                controller.abort();
              throw Error(
                "Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving."
              );
            }
            const a = yield resp.arrayBuffer();
            return {
              data: a,
              etag: newEtag || void 0,
              cacheControl: resp.headers.get("Cache-Control") || void 0,
              expires: resp.headers.get("Expires") || void 0
            };
          });
        }
      };
      function getUint64(v, offset) {
        const wh = v.getUint32(offset + 4, true);
        const wl = v.getUint32(offset + 0, true);
        return wh * __pow(2, 32) + wl;
      }
      function bytesToHeader(bytes, etag) {
        const v = new DataView(bytes);
        const specVersion = v.getUint8(7);
        if (specVersion > 3) {
          throw Error(
            `Archive is spec version ${specVersion} but this library supports up to spec version 3`
          );
        }
        return {
          specVersion,
          rootDirectoryOffset: getUint64(v, 8),
          rootDirectoryLength: getUint64(v, 16),
          jsonMetadataOffset: getUint64(v, 24),
          jsonMetadataLength: getUint64(v, 32),
          leafDirectoryOffset: getUint64(v, 40),
          leafDirectoryLength: getUint64(v, 48),
          tileDataOffset: getUint64(v, 56),
          tileDataLength: getUint64(v, 64),
          numAddressedTiles: getUint64(v, 72),
          numTileEntries: getUint64(v, 80),
          numTileContents: getUint64(v, 88),
          clustered: v.getUint8(96) === 1,
          internalCompression: v.getUint8(97),
          tileCompression: v.getUint8(98),
          tileType: v.getUint8(99),
          minZoom: v.getUint8(100),
          maxZoom: v.getUint8(101),
          minLon: v.getInt32(102, true) / 1e7,
          minLat: v.getInt32(106, true) / 1e7,
          maxLon: v.getInt32(110, true) / 1e7,
          maxLat: v.getInt32(114, true) / 1e7,
          centerZoom: v.getUint8(118),
          centerLon: v.getInt32(119, true) / 1e7,
          centerLat: v.getInt32(123, true) / 1e7,
          etag
        };
      }
      function deserializeIndex(buffer) {
        const p = { buf: new Uint8Array(buffer), pos: 0 };
        const numEntries = readVarint(p);
        const entries = [];
        let lastId = 0;
        for (let i2 = 0; i2 < numEntries; i2++) {
          const v = readVarint(p);
          entries.push({ tileId: lastId + v, offset: 0, length: 0, runLength: 1 });
          lastId += v;
        }
        for (let i2 = 0; i2 < numEntries; i2++) {
          entries[i2].runLength = readVarint(p);
        }
        for (let i2 = 0; i2 < numEntries; i2++) {
          entries[i2].length = readVarint(p);
        }
        for (let i2 = 0; i2 < numEntries; i2++) {
          const v = readVarint(p);
          if (v === 0 && i2 > 0) {
            entries[i2].offset = entries[i2 - 1].offset + entries[i2 - 1].length;
          } else {
            entries[i2].offset = v - 1;
          }
        }
        return entries;
      }
      function detectVersion(a) {
        const v = new DataView(a);
        if (v.getUint16(2, true) === 2) {
          console.warn(
            "PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"
          );
          return 2;
        }
        if (v.getUint16(2, true) === 1) {
          console.warn(
            "PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"
          );
          return 1;
        }
        return 3;
      }
      var EtagMismatch = class extends Error {
      };
      function getHeaderAndRoot(source, decompress) {
        return __async(this, null, function* () {
          const resp = yield source.getBytes(0, 16384);
          const v = new DataView(resp.data);
          if (v.getUint16(0, true) !== 19792) {
            throw new Error("Wrong magic number for PMTiles archive");
          }
          if (detectVersion(resp.data) < 3) {
            return [yield v2_default.getHeader(source)];
          }
          const headerData = resp.data.slice(0, HEADER_SIZE_BYTES);
          const header = bytesToHeader(headerData, resp.etag);
          const rootDirData = resp.data.slice(
            header.rootDirectoryOffset,
            header.rootDirectoryOffset + header.rootDirectoryLength
          );
          const dirKey = `${source.getKey()}|${header.etag || ""}|${header.rootDirectoryOffset}|${header.rootDirectoryLength}`;
          const rootDir = deserializeIndex(
            yield decompress(rootDirData, header.internalCompression)
          );
          return [header, [dirKey, rootDir.length, rootDir]];
        });
      }
      function getDirectory(source, decompress, offset, length, header) {
        return __async(this, null, function* () {
          const resp = yield source.getBytes(offset, length, void 0, header.etag);
          const data = yield decompress(resp.data, header.internalCompression);
          const directory = deserializeIndex(data);
          if (directory.length === 0) {
            throw new Error("Empty directory is invalid");
          }
          return directory;
        });
      }
      var ResolvedValueCache = class {
        constructor(maxCacheEntries = 100, prefetch = true, decompress = defaultDecompress) {
          this.cache = /* @__PURE__ */ new Map();
          this.maxCacheEntries = maxCacheEntries;
          this.counter = 1;
          this.decompress = decompress;
        }
        getHeader(source) {
          return __async(this, null, function* () {
            const cacheKey = source.getKey();
            const cacheValue = this.cache.get(cacheKey);
            if (cacheValue) {
              cacheValue.lastUsed = this.counter++;
              const data = cacheValue.data;
              return data;
            }
            const res = yield getHeaderAndRoot(source, this.decompress);
            if (res[1]) {
              this.cache.set(res[1][0], {
                lastUsed: this.counter++,
                data: res[1][2]
              });
            }
            this.cache.set(cacheKey, {
              lastUsed: this.counter++,
              data: res[0]
            });
            this.prune();
            return res[0];
          });
        }
        getDirectory(source, offset, length, header) {
          return __async(this, null, function* () {
            const cacheKey = `${source.getKey()}|${header.etag || ""}|${offset}|${length}`;
            const cacheValue = this.cache.get(cacheKey);
            if (cacheValue) {
              cacheValue.lastUsed = this.counter++;
              const data = cacheValue.data;
              return data;
            }
            const directory = yield getDirectory(
              source,
              this.decompress,
              offset,
              length,
              header
            );
            this.cache.set(cacheKey, {
              lastUsed: this.counter++,
              data: directory
            });
            this.prune();
            return directory;
          });
        }
        // for v2 backwards compatibility
        getArrayBuffer(source, offset, length, header) {
          return __async(this, null, function* () {
            const cacheKey = `${source.getKey()}|${header.etag || ""}|${offset}|${length}`;
            const cacheValue = this.cache.get(cacheKey);
            if (cacheValue) {
              cacheValue.lastUsed = this.counter++;
              const data = yield cacheValue.data;
              return data;
            }
            const resp = yield source.getBytes(offset, length, void 0, header.etag);
            this.cache.set(cacheKey, {
              lastUsed: this.counter++,
              data: resp.data
            });
            this.prune();
            return resp.data;
          });
        }
        prune() {
          if (this.cache.size > this.maxCacheEntries) {
            let minUsed = Infinity;
            let minKey = void 0;
            this.cache.forEach((cacheValue, key) => {
              if (cacheValue.lastUsed < minUsed) {
                minUsed = cacheValue.lastUsed;
                minKey = key;
              }
            });
            if (minKey) {
              this.cache.delete(minKey);
            }
          }
        }
        invalidate(source) {
          return __async(this, null, function* () {
            this.cache.delete(source.getKey());
          });
        }
      };
      var SharedPromiseCache = class {
        constructor(maxCacheEntries = 100, prefetch = true, decompress = defaultDecompress) {
          this.cache = /* @__PURE__ */ new Map();
          this.invalidations = /* @__PURE__ */ new Map();
          this.maxCacheEntries = maxCacheEntries;
          this.counter = 1;
          this.decompress = decompress;
        }
        getHeader(source) {
          return __async(this, null, function* () {
            const cacheKey = source.getKey();
            const cacheValue = this.cache.get(cacheKey);
            if (cacheValue) {
              cacheValue.lastUsed = this.counter++;
              const data = yield cacheValue.data;
              return data;
            }
            const p = new Promise((resolve, reject) => {
              getHeaderAndRoot(source, this.decompress).then((res) => {
                if (res[1]) {
                  this.cache.set(res[1][0], {
                    lastUsed: this.counter++,
                    data: Promise.resolve(res[1][2])
                  });
                }
                resolve(res[0]);
                this.prune();
              }).catch((e) => {
                reject(e);
              });
            });
            this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
            return p;
          });
        }
        getDirectory(source, offset, length, header) {
          return __async(this, null, function* () {
            const cacheKey = `${source.getKey()}|${header.etag || ""}|${offset}|${length}`;
            const cacheValue = this.cache.get(cacheKey);
            if (cacheValue) {
              cacheValue.lastUsed = this.counter++;
              const data = yield cacheValue.data;
              return data;
            }
            const p = new Promise((resolve, reject) => {
              getDirectory(source, this.decompress, offset, length, header).then((directory) => {
                resolve(directory);
                this.prune();
              }).catch((e) => {
                reject(e);
              });
            });
            this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
            return p;
          });
        }
        // for v2 backwards compatibility
        getArrayBuffer(source, offset, length, header) {
          return __async(this, null, function* () {
            const cacheKey = `${source.getKey()}|${header.etag || ""}|${offset}|${length}`;
            const cacheValue = this.cache.get(cacheKey);
            if (cacheValue) {
              cacheValue.lastUsed = this.counter++;
              const data = yield cacheValue.data;
              return data;
            }
            const p = new Promise((resolve, reject) => {
              source.getBytes(offset, length, void 0, header.etag).then((resp) => {
                resolve(resp.data);
                if (this.cache.has(cacheKey)) {
                }
                this.prune();
              }).catch((e) => {
                reject(e);
              });
            });
            this.cache.set(cacheKey, { lastUsed: this.counter++, data: p });
            return p;
          });
        }
        prune() {
          if (this.cache.size >= this.maxCacheEntries) {
            let minUsed = Infinity;
            let minKey = void 0;
            this.cache.forEach((cacheValue, key) => {
              if (cacheValue.lastUsed < minUsed) {
                minUsed = cacheValue.lastUsed;
                minKey = key;
              }
            });
            if (minKey) {
              this.cache.delete(minKey);
            }
          }
        }
        invalidate(source) {
          return __async(this, null, function* () {
            const key = source.getKey();
            if (this.invalidations.get(key)) {
              return yield this.invalidations.get(key);
            }
            this.cache.delete(source.getKey());
            const p = new Promise((resolve, reject) => {
              this.getHeader(source).then((h) => {
                resolve();
                this.invalidations.delete(key);
              }).catch((e) => {
                reject(e);
              });
            });
            this.invalidations.set(key, p);
          });
        }
      };
      var PMTiles = class {
        constructor(source, cache, decompress) {
          if (typeof source === "string") {
            this.source = new FetchSource(source);
          } else {
            this.source = source;
          }
          if (decompress) {
            this.decompress = decompress;
          } else {
            this.decompress = defaultDecompress;
          }
          if (cache) {
            this.cache = cache;
          } else {
            this.cache = new SharedPromiseCache();
          }
        }
        /**
         * Return the header of the archive,
         * including information such as tile type, min/max zoom, bounds, and summary statistics.
         */
        getHeader() {
          return __async(this, null, function* () {
            return yield this.cache.getHeader(this.source);
          });
        }
        /** @hidden */
        getZxyAttempt(z, x2, y, signal) {
          return __async(this, null, function* () {
            const tileId = zxyToTileId(z, x2, y);
            const header = yield this.cache.getHeader(this.source);
            if (header.specVersion < 3) {
              return v2_default.getZxy(header, this.source, this.cache, z, x2, y, signal);
            }
            if (z < header.minZoom || z > header.maxZoom) {
              return void 0;
            }
            let dO = header.rootDirectoryOffset;
            let dL = header.rootDirectoryLength;
            for (let depth = 0; depth <= 3; depth++) {
              const directory = yield this.cache.getDirectory(
                this.source,
                dO,
                dL,
                header
              );
              const entry = findTile(directory, tileId);
              if (entry) {
                if (entry.runLength > 0) {
                  const resp = yield this.source.getBytes(
                    header.tileDataOffset + entry.offset,
                    entry.length,
                    signal,
                    header.etag
                  );
                  return {
                    data: yield this.decompress(resp.data, header.tileCompression),
                    cacheControl: resp.cacheControl,
                    expires: resp.expires
                  };
                }
                dO = header.leafDirectoryOffset + entry.offset;
                dL = entry.length;
              } else {
                return void 0;
              }
            }
            throw Error("Maximum directory depth exceeded");
          });
        }
        /**
         * Primary method to get a single tile's bytes from an archive.
         *
         * Returns undefined if the tile does not exist in the archive.
         */
        getZxy(z, x2, y, signal) {
          return __async(this, null, function* () {
            try {
              return yield this.getZxyAttempt(z, x2, y, signal);
            } catch (e) {
              if (e instanceof EtagMismatch) {
                this.cache.invalidate(this.source);
                return yield this.getZxyAttempt(z, x2, y, signal);
              }
              throw e;
            }
          });
        }
        /** @hidden */
        getMetadataAttempt() {
          return __async(this, null, function* () {
            const header = yield this.cache.getHeader(this.source);
            const resp = yield this.source.getBytes(
              header.jsonMetadataOffset,
              header.jsonMetadataLength,
              void 0,
              header.etag
            );
            const decompressed = yield this.decompress(
              resp.data,
              header.internalCompression
            );
            const dec = new TextDecoder("utf-8");
            return JSON.parse(dec.decode(decompressed));
          });
        }
        /**
         * Return the arbitrary JSON metadata of the archive.
         */
        getMetadata() {
          return __async(this, null, function* () {
            try {
              return yield this.getMetadataAttempt();
            } catch (e) {
              if (e instanceof EtagMismatch) {
                this.cache.invalidate(this.source);
                return yield this.getMetadataAttempt();
              }
              throw e;
            }
          });
        }
        /**
         * Construct a [TileJSON](https://github.com/mapbox/tilejson-spec) object.
         *
         * baseTilesUrl is the desired tiles URL, excluding the suffix `/{z}/{x}/{y}.{ext}`.
         * For example, if the desired URL is `http://example.com/tileset/{z}/{x}/{y}.mvt`,
         * the baseTilesUrl should be `https://example.com/tileset`.
         */
        getTileJson(baseTilesUrl) {
          return __async(this, null, function* () {
            const header = yield this.getHeader();
            const metadata = yield this.getMetadata();
            const ext = tileTypeExt(header.tileType);
            return {
              tilejson: "3.0.0",
              scheme: "xyz",
              tiles: [`${baseTilesUrl}/{z}/{x}/{y}${ext}`],
              // biome-ignore lint: TileJSON spec
              vector_layers: metadata.vector_layers,
              attribution: metadata.attribution,
              description: metadata.description,
              name: metadata.name,
              version: metadata.version,
              bounds: [header.minLon, header.minLat, header.maxLon, header.maxLat],
              center: [header.centerLon, header.centerLat, header.centerZoom],
              minzoom: header.minZoom,
              maxzoom: header.maxZoom
            };
          });
        }
      };
    }
  });

  // node_modules/mustache/mustache.js
  var require_mustache = __commonJS({
    "node_modules/mustache/mustache.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.Mustache = factory());
      })(exports, function() {
        "use strict";
        var objectToString = Object.prototype.toString;
        var isArray = Array.isArray || function isArrayPolyfill(object) {
          return objectToString.call(object) === "[object Array]";
        };
        function isFunction(object) {
          return typeof object === "function";
        }
        function typeStr(obj) {
          return isArray(obj) ? "array" : typeof obj;
        }
        function escapeRegExp(string) {
          return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        }
        function hasProperty(obj, propName) {
          return obj != null && typeof obj === "object" && propName in obj;
        }
        function primitiveHasOwnProperty(primitive, propName) {
          return primitive != null && typeof primitive !== "object" && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
        }
        var regExpTest = RegExp.prototype.test;
        function testRegExp(re, string) {
          return regExpTest.call(re, string);
        }
        var nonSpaceRe = /\S/;
        function isWhitespace(string) {
          return !testRegExp(nonSpaceRe, string);
        }
        var entityMap = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#x2F;",
          "`": "&#x60;",
          "=": "&#x3D;"
        };
        function escapeHtml(string) {
          return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
            return entityMap[s];
          });
        }
        var whiteRe = /\s*/;
        var spaceRe = /\s+/;
        var equalsRe = /\s*=/;
        var curlyRe = /\s*\}/;
        var tagRe = /#|\^|\/|>|\{|&|=|!/;
        function parseTemplate(template, tags) {
          if (!template)
            return [];
          var lineHasNonSpace = false;
          var sections = [];
          var tokens = [];
          var spaces = [];
          var hasTag = false;
          var nonSpace = false;
          var indentation = "";
          var tagIndex = 0;
          function stripSpace() {
            if (hasTag && !nonSpace) {
              while (spaces.length)
                delete tokens[spaces.pop()];
            } else {
              spaces = [];
            }
            hasTag = false;
            nonSpace = false;
          }
          var openingTagRe, closingTagRe, closingCurlyRe;
          function compileTags(tagsToCompile) {
            if (typeof tagsToCompile === "string")
              tagsToCompile = tagsToCompile.split(spaceRe, 2);
            if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
              throw new Error("Invalid tags: " + tagsToCompile);
            openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
            closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
            closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
          }
          compileTags(tags || mustache.tags);
          var scanner = new Scanner(template);
          var start, type, value, chr, token, openSection;
          while (!scanner.eos()) {
            start = scanner.pos;
            value = scanner.scanUntil(openingTagRe);
            if (value) {
              for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                chr = value.charAt(i);
                if (isWhitespace(chr)) {
                  spaces.push(tokens.length);
                  indentation += chr;
                } else {
                  nonSpace = true;
                  lineHasNonSpace = true;
                  indentation += " ";
                }
                tokens.push(["text", chr, start, start + 1]);
                start += 1;
                if (chr === "\n") {
                  stripSpace();
                  indentation = "";
                  tagIndex = 0;
                  lineHasNonSpace = false;
                }
              }
            }
            if (!scanner.scan(openingTagRe))
              break;
            hasTag = true;
            type = scanner.scan(tagRe) || "name";
            scanner.scan(whiteRe);
            if (type === "=") {
              value = scanner.scanUntil(equalsRe);
              scanner.scan(equalsRe);
              scanner.scanUntil(closingTagRe);
            } else if (type === "{") {
              value = scanner.scanUntil(closingCurlyRe);
              scanner.scan(curlyRe);
              scanner.scanUntil(closingTagRe);
              type = "&";
            } else {
              value = scanner.scanUntil(closingTagRe);
            }
            if (!scanner.scan(closingTagRe))
              throw new Error("Unclosed tag at " + scanner.pos);
            if (type == ">") {
              token = [type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace];
            } else {
              token = [type, value, start, scanner.pos];
            }
            tagIndex++;
            tokens.push(token);
            if (type === "#" || type === "^") {
              sections.push(token);
            } else if (type === "/") {
              openSection = sections.pop();
              if (!openSection)
                throw new Error('Unopened section "' + value + '" at ' + start);
              if (openSection[1] !== value)
                throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
            } else if (type === "name" || type === "{" || type === "&") {
              nonSpace = true;
            } else if (type === "=") {
              compileTags(value);
            }
          }
          stripSpace();
          openSection = sections.pop();
          if (openSection)
            throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
          return nestTokens(squashTokens(tokens));
        }
        function squashTokens(tokens) {
          var squashedTokens = [];
          var token, lastToken;
          for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];
            if (token) {
              if (token[0] === "text" && lastToken && lastToken[0] === "text") {
                lastToken[1] += token[1];
                lastToken[3] = token[3];
              } else {
                squashedTokens.push(token);
                lastToken = token;
              }
            }
          }
          return squashedTokens;
        }
        function nestTokens(tokens) {
          var nestedTokens = [];
          var collector = nestedTokens;
          var sections = [];
          var token, section;
          for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];
            switch (token[0]) {
              case "#":
              case "^":
                collector.push(token);
                sections.push(token);
                collector = token[4] = [];
                break;
              case "/":
                section = sections.pop();
                section[5] = token[2];
                collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                break;
              default:
                collector.push(token);
            }
          }
          return nestedTokens;
        }
        function Scanner(string) {
          this.string = string;
          this.tail = string;
          this.pos = 0;
        }
        Scanner.prototype.eos = function eos() {
          return this.tail === "";
        };
        Scanner.prototype.scan = function scan(re) {
          var match = this.tail.match(re);
          if (!match || match.index !== 0)
            return "";
          var string = match[0];
          this.tail = this.tail.substring(string.length);
          this.pos += string.length;
          return string;
        };
        Scanner.prototype.scanUntil = function scanUntil(re) {
          var index = this.tail.search(re), match;
          switch (index) {
            case -1:
              match = this.tail;
              this.tail = "";
              break;
            case 0:
              match = "";
              break;
            default:
              match = this.tail.substring(0, index);
              this.tail = this.tail.substring(index);
          }
          this.pos += match.length;
          return match;
        };
        function Context(view, parentContext) {
          this.view = view;
          this.cache = { ".": this.view };
          this.parent = parentContext;
        }
        Context.prototype.push = function push(view) {
          return new Context(view, this);
        };
        Context.prototype.lookup = function lookup(name) {
          var cache = this.cache;
          var value;
          if (cache.hasOwnProperty(name)) {
            value = cache[name];
          } else {
            var context = this, intermediateValue, names, index, lookupHit = false;
            while (context) {
              if (name.indexOf(".") > 0) {
                intermediateValue = context.view;
                names = name.split(".");
                index = 0;
                while (intermediateValue != null && index < names.length) {
                  if (index === names.length - 1)
                    lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
                  intermediateValue = intermediateValue[names[index++]];
                }
              } else {
                intermediateValue = context.view[name];
                lookupHit = hasProperty(context.view, name);
              }
              if (lookupHit) {
                value = intermediateValue;
                break;
              }
              context = context.parent;
            }
            cache[name] = value;
          }
          if (isFunction(value))
            value = value.call(this.view);
          return value;
        };
        function Writer() {
          this.templateCache = {
            _cache: {},
            set: function set(key, value) {
              this._cache[key] = value;
            },
            get: function get(key) {
              return this._cache[key];
            },
            clear: function clear() {
              this._cache = {};
            }
          };
        }
        Writer.prototype.clearCache = function clearCache() {
          if (typeof this.templateCache !== "undefined") {
            this.templateCache.clear();
          }
        };
        Writer.prototype.parse = function parse(template, tags) {
          var cache = this.templateCache;
          var cacheKey = template + ":" + (tags || mustache.tags).join(":");
          var isCacheEnabled = typeof cache !== "undefined";
          var tokens = isCacheEnabled ? cache.get(cacheKey) : void 0;
          if (tokens == void 0) {
            tokens = parseTemplate(template, tags);
            isCacheEnabled && cache.set(cacheKey, tokens);
          }
          return tokens;
        };
        Writer.prototype.render = function render(template, view, partials, config) {
          var tags = this.getConfigTags(config);
          var tokens = this.parse(template, tags);
          var context = view instanceof Context ? view : new Context(view, void 0);
          return this.renderTokens(tokens, context, partials, template, config);
        };
        Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
          var buffer = "";
          var token, symbol, value;
          for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            value = void 0;
            token = tokens[i];
            symbol = token[0];
            if (symbol === "#")
              value = this.renderSection(token, context, partials, originalTemplate, config);
            else if (symbol === "^")
              value = this.renderInverted(token, context, partials, originalTemplate, config);
            else if (symbol === ">")
              value = this.renderPartial(token, context, partials, config);
            else if (symbol === "&")
              value = this.unescapedValue(token, context);
            else if (symbol === "name")
              value = this.escapedValue(token, context, config);
            else if (symbol === "text")
              value = this.rawValue(token);
            if (value !== void 0)
              buffer += value;
          }
          return buffer;
        };
        Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
          var self2 = this;
          var buffer = "";
          var value = context.lookup(token[1]);
          function subRender(template) {
            return self2.render(template, context, partials, config);
          }
          if (!value)
            return;
          if (isArray(value)) {
            for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
              buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
            }
          } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
            buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
          } else if (isFunction(value)) {
            if (typeof originalTemplate !== "string")
              throw new Error("Cannot use higher-order sections without the original template");
            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
            if (value != null)
              buffer += value;
          } else {
            buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
          }
          return buffer;
        };
        Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
          var value = context.lookup(token[1]);
          if (!value || isArray(value) && value.length === 0)
            return this.renderTokens(token[4], context, partials, originalTemplate, config);
        };
        Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
          var filteredIndentation = indentation.replace(/[^ \t]/g, "");
          var partialByNl = partial.split("\n");
          for (var i = 0; i < partialByNl.length; i++) {
            if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
              partialByNl[i] = filteredIndentation + partialByNl[i];
            }
          }
          return partialByNl.join("\n");
        };
        Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
          if (!partials)
            return;
          var tags = this.getConfigTags(config);
          var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
          if (value != null) {
            var lineHasNonSpace = token[6];
            var tagIndex = token[5];
            var indentation = token[4];
            var indentedValue = value;
            if (tagIndex == 0 && indentation) {
              indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
            }
            var tokens = this.parse(indentedValue, tags);
            return this.renderTokens(tokens, context, partials, indentedValue, config);
          }
        };
        Writer.prototype.unescapedValue = function unescapedValue(token, context) {
          var value = context.lookup(token[1]);
          if (value != null)
            return value;
        };
        Writer.prototype.escapedValue = function escapedValue(token, context, config) {
          var escape = this.getConfigEscape(config) || mustache.escape;
          var value = context.lookup(token[1]);
          if (value != null)
            return typeof value === "number" && escape === mustache.escape ? String(value) : escape(value);
        };
        Writer.prototype.rawValue = function rawValue(token) {
          return token[1];
        };
        Writer.prototype.getConfigTags = function getConfigTags(config) {
          if (isArray(config)) {
            return config;
          } else if (config && typeof config === "object") {
            return config.tags;
          } else {
            return void 0;
          }
        };
        Writer.prototype.getConfigEscape = function getConfigEscape(config) {
          if (config && typeof config === "object" && !isArray(config)) {
            return config.escape;
          } else {
            return void 0;
          }
        };
        var mustache = {
          name: "mustache.js",
          version: "4.2.0",
          tags: ["{{", "}}"],
          clearCache: void 0,
          escape: void 0,
          parse: void 0,
          render: void 0,
          Scanner: void 0,
          Context: void 0,
          Writer: void 0,
          /**
           * Allows a user to override the default caching strategy, by providing an
           * object with set, get and clear methods. This can also be used to disable
           * the cache by setting it to the literal `undefined`.
           */
          set templateCache(cache) {
            defaultWriter.templateCache = cache;
          },
          /**
           * Gets the default or overridden caching object from the default writer.
           */
          get templateCache() {
            return defaultWriter.templateCache;
          }
        };
        var defaultWriter = new Writer();
        mustache.clearCache = function clearCache() {
          return defaultWriter.clearCache();
        };
        mustache.parse = function parse(template, tags) {
          return defaultWriter.parse(template, tags);
        };
        mustache.render = function render(template, view, partials, config) {
          if (typeof template !== "string") {
            throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first argument for mustache#render(template, view, partials)');
          }
          return defaultWriter.render(template, view, partials, config);
        };
        mustache.escape = escapeHtml;
        mustache.Scanner = Scanner;
        mustache.Context = Context;
        mustache.Writer = Writer;
        return mustache;
      });
    }
  });

  // built/utils.js
  var require_utils = __commonJS({
    "built/utils.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getTextFromFeature = getTextFromFeature;
      exports.getDeckTooltip = getDeckTooltip;
      exports.getDeckMapLibrePopupTooltip = getDeckMapLibrePopupTooltip;
      exports.getViewState = getViewState;
      var mustache_1 = __importDefault(require_mustache());
      function getTextFromFeature(feature, property, template) {
        if (template !== null) {
          return mustache_1.default.render(template, feature.properties);
        }
        if (property === null) {
          const text = Object.keys(feature.properties).map((key) => `${key}: ${feature.properties[key]}`).join("</br>");
          return text;
        }
        return feature.properties[property];
      }
      function getDeckTooltip(template) {
        const style = {
          background: "white",
          color: "black",
          "border-radius": "3px"
        };
        return ({ layer, object }) => {
          if (object) {
            const template_ = typeof template === "object" ? template[layer.id] : template;
            return template_ && { html: mustache_1.default.render(template_, object), style };
          }
          return null;
        };
      }
      function getDeckMapLibrePopupTooltip(map, tooltip) {
        const popup = new maplibregl.Popup({
          closeOnClick: false,
          closeButton: false
        });
        map.on("mouseout", (e) => popup.remove());
        return ({ coordinate, object }) => {
          if (object) {
            popup.setHTML(mustache_1.default.render(tooltip, object)).setLngLat(coordinate);
            popup.addTo(map);
          } else
            popup.remove();
        };
      }
      function getViewState(map) {
        return {
          center: map.getCenter(),
          zoom: map.getZoom(),
          bounds: map.getBounds(),
          bearing: map.getBearing(),
          pitch: map.getPitch()
        };
      }
    }
  });

  // built/pywidget.js
  var require_pywidget = __commonJS({
    "built/pywidget.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var pmtiles_1 = require_dist();
      var protocol = new pmtiles_1.Protocol();
      maplibregl.addProtocol("pmtiles", protocol.tile);
      var utils_1 = require_utils();
      function getJSONConverter() {
        if (typeof deck === "undefined") {
          return;
        }
        const configuration = new deck.JSONConfiguration({ classes: deck });
        return new deck.JSONConverter({ configuration });
      }
      if (typeof MapboxDraw !== "undefined") {
        MapboxDraw.constants.classes.CONTROL_BASE = "maplibregl-ctrl";
        MapboxDraw.constants.classes.CONTROL_PREFIX = "maplibregl-ctrl-";
        MapboxDraw.constants.classes.CONTROL_GROUP = "maplibregl-ctrl-group";
      }
      var MapWidget = class {
        constructor(mapOptions) {
          this._id = mapOptions.container;
          this._map = new maplibregl.Map(mapOptions);
          this._map.on("mouseover", () => {
            this._map.getCanvas().style.cursor = "pointer";
          });
          this._map.on("mouseout", () => {
            this._map.getCanvas().style.cursor = "";
          });
          this._JSONConverter = getJSONConverter();
        }
        getMap() {
          return this._map;
        }
        applyMapMethod(name, params) {
          this._map[name](...params);
        }
        addControl(type, options, position) {
          this._map.addControl(new maplibregl[type](options), position);
        }
        addMarker({ lngLat, popup, options }) {
          const marker = new maplibregl.Marker(options).setLngLat(lngLat);
          if (popup) {
            const popup_ = new maplibregl.Popup(popup.options).setHTML(popup.text);
            marker.setPopup(popup_);
          }
          marker.addTo(this._map);
        }
        addLayer(layer, beforeId) {
          this._map.addLayer(layer, beforeId);
          if (typeof Shiny !== "undefined") {
            this._map.on("click", layer.id, (e) => {
              console.log(e, e.features[0]);
              const inputName = `${this._id}_feature_clicked`;
              const feature = {
                props: e.features[0].properties,
                layer_id: layer.id
              };
              console.log(inputName, feature);
              Shiny.onInputChange(inputName, feature);
            });
          }
        }
        addPopup(layerId, property = null, template = null) {
          const popupOptions = {
            closeButton: false
          };
          const popup = new maplibregl.Popup(popupOptions);
          this._map.on("click", layerId, (e) => {
            const feature = e.features[0];
            const text = (0, utils_1.getTextFromFeature)(feature, property, template);
            popup.setLngLat(e.lngLat).setHTML(text).addTo(this._map);
          });
        }
        addTooltip(layerId, property = null, template = null) {
          const popupOptions = {
            closeButton: false,
            closeOnClick: false
          };
          const popup = new maplibregl.Popup(popupOptions);
          this._map.on("mousemove", layerId, (e) => {
            const feature = e.features[0];
            const text = (0, utils_1.getTextFromFeature)(feature, property, template);
            popup.setLngLat(e.lngLat).setHTML(text).addTo(this._map);
          });
          this._map.on("mouseleave", layerId, () => {
            popup.remove();
          });
        }
        setSourceData(sourceId, data) {
          this._map.getSource(sourceId).setData(data);
        }
        addDeckOverlay(deckLayers, tooltip = null) {
          if (typeof this._JSONConverter === "undefined") {
            console.log("deck or JSONConverter is undefined");
            return;
          }
          const layers = this._convertDeckLayers(deckLayers, tooltip);
          this._deckOverlay = new deck.MapboxOverlay({
            interleaved: true,
            layers
            // getTooltip: tooltip ? getDeckTooltip(tooltip) : null,
          });
          this._map.addControl(this._deckOverlay);
        }
        _convertDeckLayers(deckLayers, tooltip = null) {
          return deckLayers.map((deckLayer) => {
            const tooltip_ = tooltip && typeof tooltip === "object" ? tooltip[deckLayer.id] : tooltip;
            const getTooltip = (0, utils_1.getDeckMapLibrePopupTooltip)(this._map, tooltip_);
            deckLayer.onHover = ({ layer, coordinate, object }) => {
              if (tooltip_)
                getTooltip({ coordinate, object });
              if (typeof Shiny !== "undefined") {
                const inputName = `${this._id}_layer_${deckLayer.id}`;
                Shiny.onInputChange(inputName, object);
              }
            };
            return this._JSONConverter.convert(deckLayer);
          });
        }
        setDeckLayers(deckLayers, tooltip = null) {
          console.log("Updating Deck.GL layers");
          const layers = this._convertDeckLayers(deckLayers, tooltip);
          this._deckOverlay.setProps({ layers });
        }
        addMapboxDraw(options, position, geojson = null) {
          const draw = new MapboxDraw(options);
          this._map.addControl(draw, position);
          if (geojson)
            draw.add(geojson);
          if (typeof Shiny !== "undefined") {
            this._map.on("draw.selectionchange", (e) => {
              const inputName = `${this._id}_draw_features_selected`;
              const object = { features: e.features, random: Math.random() };
              console.log(inputName, object);
              Shiny.onInputChange(inputName, object);
            });
            this._map.on("draw.create", (e) => {
              const inputName = `${this._id}_draw_features_created`;
              Shiny.onInputChange(inputName, { features: e.features });
            });
            this._map.on("draw.delete", (e) => {
              const inputName = `${this._id}_draw_features_deleted`;
              Shiny.onInputChange(inputName, { features: e.features });
            });
            this._map.on("draw.update", (e) => {
              const inputName = `${this._id}_draw_features_updated`;
              Shiny.onInputChange(inputName, { features: e.features });
            });
          }
        }
        render(calls) {
          calls.forEach(([name, params]) => {
            if ([
              "addLayer",
              "addPopup",
              "addTooltip",
              "addMarker",
              "addPopup",
              "addControl",
              "setSourceData",
              "addDeckOverlay",
              "setDeckLayers",
              "addMapboxDraw"
            ].includes(name)) {
              console.log("Custom method", name, params);
              this[name](...params);
              return;
            }
            console.log("Map method", name);
            this.applyMapMethod(name, params);
          });
        }
      };
      exports.default = MapWidget;
    }
  });

  // built/index-py.js
  var require_index_py = __commonJS({
    "built/index-py.js"(exports) {
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var pywidget_1 = __importDefault(require_pywidget());
      var utils_1 = require_utils();
      var version = "0.2.7";
      console.log("py-maplibregl-bindings", version);
      if (typeof Shiny === "undefined") {
        window.pymaplibregl = function({ mapOptions, calls }) {
          const id = "pymaplibregl";
          const container = document.getElementById(id);
          const mapWidget = new pywidget_1.default(Object.assign({ container: container === null || container === void 0 ? void 0 : container.id }, mapOptions));
          const map = mapWidget.getMap();
          map.on("load", () => {
            mapWidget.render(calls);
          });
        };
      }
      if (typeof Shiny !== "undefined") {
        class MapLibreGLOutputBinding extends Shiny.OutputBinding {
          find(scope) {
            return scope.find(".shiny-maplibregl-output");
          }
          renderValue(el, payload) {
            console.log("id:", el.id, "payload:", payload);
            const pyMapLibreGL = window._maplibreWidget = new pywidget_1.default(Object.assign({ container: el.id }, payload.mapData.mapOptions));
            const map = pyMapLibreGL.getMap();
            map.on("load", () => {
              pyMapLibreGL.render(payload.mapData.calls);
            });
            map.on("click", (e) => {
              const inputName = `${el.id}_clicked`;
              const data = { coords: e.lngLat, point: e.point };
              Shiny.onInputChange(inputName, data);
            });
            for (const event of ["load", "zoomend", "moveend"]) {
              map.on(event, (e) => {
                const inputName = `${el.id}_view_state`;
                Shiny.onInputChange(inputName, (0, utils_1.getViewState)(map));
              });
            }
            const messageHandlerName = `pymaplibregl-${el.id}`;
            console.log(messageHandlerName);
            Shiny.addCustomMessageHandler(messageHandlerName, ({ id, calls }) => {
              console.log(id, calls);
              pyMapLibreGL.render(calls);
            });
          }
        }
        Shiny.outputBindings.register(new MapLibreGLOutputBinding(), "shiny-maplibregl-output");
      }
    }
  });
  require_index_py();
})();
/*! Bundled license information:

mustache/mustache.js:
  (*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   *)
*/
