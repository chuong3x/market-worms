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

export class ToolTipText extends React.PureComponent {
  render() {
    const _a = this.props,
      { children } = _a,
      rest = __rest(_a, ["children"]);
    return React.createElement("text", Object.assign({}, rest), children);
  }
}
ToolTipText.defaultProps = {
  className: "react-financial-charts-tooltip",
  fontFamily: "-apple-system, system-ui, 'Helvetica Neue', Ubuntu, sans-serif",
  fontSize: 11,
};
//# sourceMappingURL=ToolTipText.js.map
