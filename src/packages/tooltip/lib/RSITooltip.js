import { functor, isDefined, GenericChartComponent } from "../../core";
import { format } from "d3-format";
import * as React from "react";
import { ToolTipText } from "./ToolTipText";
import { ToolTipTSpanLabel } from "./ToolTipTSpanLabel";
export class RSITooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.renderSVG = (moreProps) => {
      const {
        onClick,
        displayInit,
        fontFamily,
        fontSize,
        fontWeight,
        yAccessor,
        displayFormat,
        className,
        options,
        labelFill,
        labelFontWeight,
        textFill,
        displayValuesFor,
      } = this.props;
      const {
        chartConfig: { width, height },
      } = moreProps;
      const currentItem = displayValuesFor(this.props, moreProps);
      const rsi = isDefined(currentItem) && yAccessor(currentItem);
      const value = (rsi && displayFormat(rsi)) || displayInit;
      const { origin: originProp } = this.props;
      const origin = functor(originProp);
      const [x, y] = origin(width, height);
      const tooltipLabel = `RSI (${options.windowSize}): `;
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
            tooltipLabel
          ),
          React.createElement("tspan", { fill: textFill }, value)
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
RSITooltip.defaultProps = {
  displayFormat: format(".2f"),
  displayInit: "n/a",
  displayValuesFor: (_, props) => props.currentItem,
  origin: [0, 0],
  className: "react-financial-charts-tooltip",
};
//# sourceMappingURL=RSITooltip.js.map
