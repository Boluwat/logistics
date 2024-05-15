"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserStoreModelToDTO = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapUserStoreModelToDTO = (user) => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.mobile,
});
exports.mapUserStoreModelToDTO = mapUserStoreModelToDTO;
