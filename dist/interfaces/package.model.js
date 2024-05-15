"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageStatus = void 0;
var PackageStatus;
(function (PackageStatus) {
    PackageStatus["Delivered"] = "delivered";
    PackageStatus["InTransit"] = "in transit";
    PackageStatus["OutForDelivery"] = "out for delivery";
    PackageStatus["ReadyForPickup"] = "picked up";
    PackageStatus["Pending"] = "pending";
})(PackageStatus || (exports.PackageStatus = PackageStatus = {}));
