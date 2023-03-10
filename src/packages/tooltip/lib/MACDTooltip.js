import { functor, GenericChartComponent, last } from "../../core";
import { format } from "d3-format";
import * as React from "react";
import { ToolTipText } from "./ToolTipText";
import { ToolTipTSpanLabel } from "./ToolTipTSpanLabel";
export class MACDTooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.renderSVG = (moreProps) => {
      var _a;
      const {
        onClick,
        displayInit,
        fontFamily,
        fontSize,
        fontWeight,
        displayValuesFor,
        displayFormat,
        className,
        yAccessor,
        options,
        origin: originProp,
        appearance,
        labelFill,
        labelFontWeight,
      } = this.props;
      const {
        chartConfig: { width, height },
        fullData,
      } = moreProps;
      const currentItem =
        (_a = displayValuesFor(this.props, moreProps)) !== null && _a !== void 0
          ? _a
          : last(fullData);
      const macdValue = currentItem && yAccessor(currentItem);
      const macd =
        ((macdValue === null || macdValue === void 0
          ? void 0
          : macdValue.macd) &&
          displayFormat(macdValue.macd)) ||
        displayInit;
      const signal =
        ((macdValue === null || macdValue === void 0
          ? void 0
          : macdValue.signal) &&
          displayFormat(macdValue.signal)) ||
        displayInit;
      const divergence =
        ((macdValue === null || macdValue === void 0
          ? void 0
          : macdValue.divergence) &&
          displayFormat(macdValue.divergence)) ||
        displayInit;
      const origin = functor(originProp);
      const [x, y] = origin(width, height);
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
            { fill: labelFill, fontWeight: labelFontWeight },
            "MACD ("
          ),
          React.createElement(
            "tspan",
            { fill: appearance.strokeStyle.macd },
            options.slow
          ),
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight },
            ",",
            " "
          ),
          React.createElement(
            "tspan",
            { fill: appearance.strokeStyle.macd },
            options.fast
          ),
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight },
            "):",
            " "
          ),
          React.createElement(
            "tspan",
            { fill: appearance.strokeStyle.macd },
            macd
          ),
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight },
            " ",
            "Signal ("
          ),
          React.createElement(
            "tspan",
            { fill: appearance.strokeStyle.signal },
            options.signal
          ),
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight },
            "):",
            " "
          ),
          React.createElement(
            "tspan",
            { fill: appearance.strokeStyle.signal },
            signal
          ),
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight },
            " ",
            "Divergence:",
            " "
          ),
          React.createElement(
            "tspan",
            { fill: appearance.fillStyle.divergence },
            divergence
          )
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
MACDTooltip.defaultProps = {
  className: "react-financial-charts-tooltip",
  displayFormat: format(".2f"),
  displayInit: "n/a",
  displayValuesFor: (_, props) => props.currentItem,
  origin: [0, 0],
};
//# sourceMappingURL=MACDTooltip.js.map
