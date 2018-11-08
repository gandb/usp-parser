"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PieBase = /** @class */ (function () {
    function PieBase() {
        this.slices = new Array();
        this.currentPorcent = 0;
    }
    PieBase.prototype.draw = function () { };
    return PieBase;
}());
var PieDOM = /** @class */ (function (_super) {
    __extends(PieDOM, _super);
    function PieDOM(path, backgroundColor) {
        var _this = _super.call(this) || this;
        _this.elementDOMSVG = null;
        _this.path = path;
        _this.elementDOMSVG = document.querySelector(path);
        if (_this.elementDOMSVG == null) {
            throw new Error("SVG DOM Path [" + path + "] is incorret");
        }
        var oldStyle = _this.elementDOMSVG.getAttribute("style");
        _this.elementDOMSVG.setAttribute("style", "background-color:rgba(" + backgroundColor.r + ", " + backgroundColor.g + ", " + backgroundColor.b + "," + backgroundColor.a + ");" + oldStyle);
        return _this;
    }
    PieDOM.prototype.draw = function () { };
    return PieDOM;
}(PieBase));
var SlicePieBase = /** @class */ (function () {
    function SlicePieBase(parent, index, color, percent) {
        this.index = 0;
        this.parent = parent;
        this.index = index;
        this.color = color;
        this.percent = percent;
    }
    return SlicePieBase;
}());
var SliceDegradee = /** @class */ (function (_super) {
    __extends(SliceDegradee, _super);
    function SliceDegradee(parent, index, color, elementDOMSVG) {
        var _this = _super.call(this, parent, index, color, 0.01) || this;
        if (elementDOMSVG == null) {
            throw new Error("SVGElement is null");
        }
        _this.elementDOMSVG = elementDOMSVG;
        return _this;
    }
    SliceDegradee.prototype.getCoordinatesForPercent = function (percent) {
        var x = Math.cos(2 * Math.PI * percent);
        var y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };
    SliceDegradee.prototype.draw = function () {
        // destructuring assignment sets the two variables at once
        var _a = this.getCoordinatesForPercent(this.parent.currentPorcent), startX = _a[0], startY = _a[1];
        // each slice starts where the last slice ended, so keep a cumulative percent
        this.parent.currentPorcent += this.percent;
        var _b = this.getCoordinatesForPercent(this.parent.currentPorcent), endX = _b[0], endY = _b[1];
        // if the slice is more than 50%, take the large arc (the long way around)
        var largeArcFlag = this.percent > .5 ? 1 : 0;
        // create an array and join it just for code readability
        var pathData = [
            "M " + startX + " " + startY,
            "A 1 1 0 " + largeArcFlag + " 1 " + endX + " " + endY,
            "L 0 0",
        ].join(' ');
        // create a <path> and append it to the <svg> element
        var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', pathData);
        pathEl.setAttribute('fill', this.color);
        this.elementDOMSVG.appendChild(pathEl);
    };
    return SliceDegradee;
}(SlicePieBase));
var PieStatic = /** @class */ (function (_super) {
    __extends(PieStatic, _super);
    function PieStatic(path, color, background, percent) {
        var _this = _super.call(this, path, background) || this;
        for (var index = 0; index < percent; index++) {
            var alpha = (index + 1) / 100;
            var item = new SliceDegradee(_this, index, "rgba(" + color.r + ", " + color.g + ", " + color.b + "," + alpha + ")", _this.elementDOMSVG);
            _this.slices.push(item);
        }
        return _this;
    }
    PieStatic.prototype.draw = function () {
        this.slices.forEach(function (slice) { return slice.draw(); });
    };
    return PieStatic;
}(PieDOM));
var PieSucess = /** @class */ (function (_super) {
    __extends(PieSucess, _super);
    function PieSucess(path, backgroundColor) {
        return _super.call(this, path, { r: 30, g: 144, b: 255 }, (backgroundColor) ? backgroundColor : { r: 255, g: 255, b: 255, a: 1 }, 100) || this;
    }
    return PieSucess;
}(PieStatic));
var PieFaill = /** @class */ (function (_super) {
    __extends(PieFaill, _super);
    function PieFaill(path, backgroundColor) {
        return _super.call(this, path, { r: 231, g: 76, b: 60 }, (backgroundColor) ? backgroundColor : { r: 255, g: 255, b: 255, a: 1 }, 100) || this;
    }
    return PieFaill;
}(PieStatic));
