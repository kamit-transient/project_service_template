"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUtil = exports.baseConstant = exports.checkAuthorization = exports.validationMiddleware = exports.expressAuthentication = exports.logger = exports.UnAuthenticatedException = exports.NotFoundException = exports.InternalServerException = exports.ForbiddenException = exports.EntityException = exports.BadRequestException = exports.AppHttpException = exports.AppException = exports.UuidIdSchema = void 0;
require("reflect-metadata");
var uuidResource_schema_1 = require("./types/schema/uuidResource.schema");
Object.defineProperty(exports, "UuidIdSchema", { enumerable: true, get: function () { return uuidResource_schema_1.UuidIdSchema; } });
var Exception_1 = require("./exceptions/Exception");
Object.defineProperty(exports, "AppException", { enumerable: true, get: function () { return Exception_1.AppException; } });
Object.defineProperty(exports, "AppHttpException", { enumerable: true, get: function () { return Exception_1.AppHttpException; } });
Object.defineProperty(exports, "BadRequestException", { enumerable: true, get: function () { return Exception_1.BadRequestException; } });
Object.defineProperty(exports, "EntityException", { enumerable: true, get: function () { return Exception_1.EntityException; } });
Object.defineProperty(exports, "ForbiddenException", { enumerable: true, get: function () { return Exception_1.ForbiddenException; } });
Object.defineProperty(exports, "InternalServerException", { enumerable: true, get: function () { return Exception_1.InternalServerException; } });
Object.defineProperty(exports, "NotFoundException", { enumerable: true, get: function () { return Exception_1.NotFoundException; } });
Object.defineProperty(exports, "UnAuthenticatedException", { enumerable: true, get: function () { return Exception_1.UnAuthenticatedException; } });
var logger_1 = require("./logger/logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_1.logger; } });
var auth_middleware_1 = require("./middlewares/auth.middleware");
Object.defineProperty(exports, "expressAuthentication", { enumerable: true, get: function () { return auth_middleware_1.expressAuthentication; } });
var validation_middleware_1 = require("./middlewares/validation.middleware");
Object.defineProperty(exports, "validationMiddleware", { enumerable: true, get: function () { return validation_middleware_1.validationMiddleware; } });
var authrisation_middleware_1 = require("./middlewares/authrisation.middleware");
Object.defineProperty(exports, "checkAuthorization", { enumerable: true, get: function () { return authrisation_middleware_1.checkAuthorization; } });
exports.baseConstant = __importStar(require("./utils/constant"));
exports.baseUtil = __importStar(require("./utils/util"));
console.log("Hello hi");
