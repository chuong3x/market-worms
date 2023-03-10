import {
  functor,
  identity,
  GenericChartComponent,
  noop,
  last,
} from "../../core";
import { format } from "d3-format";
import * as React from "react";
import { ToolTipText } from "./ToolTipText";
import { ToolTipTSpanLabel } from "./ToolTipTSpanLabel";
export class SingleValueTooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.renderSVG = (moreProps) => {
      var _a;
      const {
        onClick,
        fontFamily,
        fontSize,
        fontWeight,
        labelFill,
        labelFontWeight,
        valueFill,
        className,
        displayValuesFor = SingleValueTooltip.defaultProps.displayValuesFor,
        origin: originProp,
        xDisplayFormat = SingleValueTooltip.defaultProps.xDisplayFormat,
        yDisplayFormat = SingleValueTooltip.defaultProps.yDisplayFormat,
        xLabel,
        yLabel,
        xAccessor = SingleValueTooltip.defaultProps.xAccessor,
        yAccessor = SingleValueTooltip.defaultProps.yAccessor,
        xInitDisplay,
        yInitDisplay,
      } = this.props;
      const {
        chartConfig: { width, height },
        fullData,
      } = moreProps;
      const currentItem =
        (_a = displayValuesFor(this.props, moreProps)) !== null && _a !== void 0
          ? _a
          : last(fullData);
      let xDisplayValue = xInitDisplay;
      let yDisplayValue = yInitDisplay;
      if (currentItem !== undefined) {
        const xItem = xAccessor(currentItem);
        if (xItem !== undefined) {
          xDisplayValue = xDisplayFormat(xItem);
        }
        const yItem = yAccessor(currentItem);
        if (yItem !== undefined) {
          yDisplayValue = yDisplayFormat(yItem);
        }
      }
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
          xLabel
            ? React.createElement(
                ToolTipTSpanLabel,
                { x: 0, dy: "5", fill: labelFill },
                `${xLabel}: `
              )
            : null,
          xLabel
            ? React.createElement(
                "tspan",
                { fill: valueFill },
                `${xDisplayValue} `
              )
            : null,
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight },
            `${yLabel} `
          ),
          React.createElement("tspan", { fill: valueFill }, yDisplayValue)
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
SingleValueTooltip.defaultProps = {
  className: "react-financial-charts-tooltip",
  displayValuesFor: (_, props) => props.currentItem,
  labelFill: "#4682B4",
  origin: [0, 0],
  valueFill: "#000000",
  xAccessor: noop,
  xDisplayFormat: identity,
  xInitDisplay: "n/a",
  yAccessor: identity,
  yDisplayFormat: format(".2f"),
  yInitDisplay: "n/a",
};
//# sourceMappingURL=SingleValueTooltip.js.map
