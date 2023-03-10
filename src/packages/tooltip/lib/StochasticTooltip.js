import { functor, GenericChartComponent } from "../../core";
import { format } from "d3-format";
import * as React from "react";
import { ToolTipText } from "./ToolTipText";
import { ToolTipTSpanLabel } from "./ToolTipTSpanLabel";
export class StochasticTooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.renderSVG = (moreProps) => {
      var _a, _b, _c;
      const {
        onClick,
        fontFamily,
        fontSize,
        fontWeight,
        yAccessor,
        displayFormat,
        origin: originProp,
        label,
        className,
        displayInit,
        displayValuesFor = StochasticTooltip.defaultProps.displayValuesFor,
        options,
        appearance,
        labelFill,
      } = this.props;
      const {
        chartConfig: { width, height },
        fullData,
      } = moreProps;
      const currentItem =
        (_a = displayValuesFor(this.props, moreProps)) !== null && _a !== void 0
          ? _a
          : fullData[fullData.length - 1];
      const stochastic = currentItem && yAccessor(currentItem);
      const K =
        (_b =
          (stochastic === null || stochastic === void 0
            ? void 0
            : stochastic.K) && displayFormat(stochastic.K)) !== null &&
        _b !== void 0
          ? _b
          : displayInit;
      const D =
        (_c =
          (stochastic === null || stochastic === void 0
            ? void 0
            : stochastic.D) && displayFormat(stochastic.D)) !== null &&
        _c !== void 0
          ? _c
          : displayInit;
      const origin = functor(originProp);
      const [x, y] = origin(width, height);
      const { stroke } = appearance;
      return React.createElement(
        "g",
        {
          className: className,
          transform: `translate(${x}, ${y})`,
          onClick: onClick,
        },
        React.createElement(
          ToolTipText,
          {
            x: 0,
            y: 0,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
          },
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill },
            `${label} %K(`
          ),
          React.createElement(
            "tspan",
            { fill: stroke.kLine },
            `${options.windowSize}, ${options.kWindowSize}`
          ),
          React.createElement(ToolTipTSpanLabel, { fill: labelFill }, "): "),
          React.createElement("tspan", { fill: stroke.kLine }, K),
          React.createElement(ToolTipTSpanLabel, { fill: labelFill }, " %D ("),
          React.createElement(
            "tspan",
            { fill: stroke.dLine },
            options.dWindowSize
          ),
          React.createElement(ToolTipTSpanLabel, { fill: labelFill }, "): "),
          React.createElement("tspan", { fill: stroke.dLine }, D)
        )
      );
    };
  }
  render() {
    return React.createElement(GenericChartComponent, {
      clip: false,
      svgDraw: this.renderSVG,
      drawOn: ["mousemove"],
    });
  }
}
StochasticTooltip.defaultProps = {
  className: "react-financial-charts-tooltip",
  displayFormat: format(".2f"),
  displayInit: "n/a",
  displayValuesFor: (_, props) => props.currentItem,
  label: "STO",
  origin: [0, 0],
};
//# sourceMappingURL=StochasticTooltip.js.map
