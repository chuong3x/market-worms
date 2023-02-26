import React from "react";
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

export class ToolTipTSpanLabel extends React.PureComponent {
  render() {
    const _a = this.props,
      { children } = _a,
      rest = __rest(_a, ["children"]);
    return React.createElement("tspan", Object.assign({}, rest), children);
  }
}
ToolTipTSpanLabel.defaultProps = {
  className: "react-financial-charts-tooltip-label",
  fill: "#4682B4",
};
//# sourceMappingURL=ToolTipTSpanLabel.js.map
