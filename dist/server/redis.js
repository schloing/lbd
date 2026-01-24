"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pub = exports.sub = void 0;
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.updateUser = updateUser;
exports.incrementUser = incrementUser;
exports.getUsersWithinRanks = getUsersWithinRanks;
var ioredis_1 = require("ioredis");
var board_1 = require("../client/board");
var client;
var DEV_REDIS = '127.0.0.1:6379';
var getRedis = function () { return new ioredis_1.Redis(import.meta.env.DEV ? DEV_REDIS : import.meta.env.PROD_REDIS); };
doCreateClient();
function doCreateClient() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!client)
                client = getRedis();
            if (!exports.pub)
                exports.pub = getRedis();
            if (!exports.sub)
                exports.sub = getRedis();
            enableRedisPersistence(client).catch(function (err) {
                var _a;
                console.warn('could not enable redis persistence:', (_a = err.message) !== null && _a !== void 0 ? _a : err);
            });
            return [2 /*return*/];
        });
    });
}
function enableRedisPersistence(redis) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, redis.config('SET', 'appendonly', 'yes')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, redis.config('SET', 'appendfsync', 'everysec')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, redis.config('SET', 'save', '900 1 300 10 60 10000')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, redis.bgsave()];
                case 4:
                    _a.sent();
                    console.info('AOF + snapshotting');
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    throw err_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function addUser(user, score, board) {
    return __awaiter(this, void 0, void 0, function () {
        var added;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.zadd(board, 'NX', score, JSON.stringify(user))];
                case 1:
                    added = _a.sent();
                    if (added > 0) {
                        exports.pub.publish(board, JSON.stringify({
                            operation: board_1.BoardOperation.AddPlayer,
                            user: { user: user, score: score }
                        }));
                    }
                    return [2 /*return*/, added > 0];
            }
        });
    });
}
function removeUser(user, board) {
    return __awaiter(this, void 0, void 0, function () {
        var removed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.zrem(board, JSON.stringify(user))];
                case 1:
                    removed = _a.sent();
                    if (removed > 0) {
                        exports.pub.publish(board, JSON.stringify({
                            operation: board_1.BoardOperation.RemovePlayer,
                            user: { user: user, score: 0 }
                        }));
                    }
                    return [2 /*return*/, removed > 0];
            }
        });
    });
}
function updateUser(user, score, board) {
    return __awaiter(this, void 0, void 0, function () {
        var updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.zadd(board, 'XX', 'CH', score, JSON.stringify(user))];
                case 1:
                    updated = _a.sent();
                    if (updated > 0) {
                        exports.pub.publish(board, JSON.stringify({
                            operation: board_1.BoardOperation.UpdatePlayer,
                            user: { user: user, score: score }
                        }));
                    }
                    return [2 /*return*/, updated > 0];
            }
        });
    });
}
function incrementUser(user, board, change) {
    return __awaiter(this, void 0, void 0, function () {
        var updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.zadd(board, 'XX', 'CH', change, user)];
                case 1:
                    updated = _a.sent();
                    return [2 /*return*/, updated > 0];
            }
        });
    });
}
function getUsersWithinRanks(board, start, stop) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (start > stop)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, client.zrange(board, start, stop, 'REV', 'WITHSCORES')];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, users];
            }
        });
    });
}
