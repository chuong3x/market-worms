import { functor, GenericChartComponent, last } from "../../core";
import { format } from "d3-format";
import * as React from "react";
import { ToolTipText } from "./ToolTipText";
import { ToolTipTSpanLabel } from "./ToolTipTSpanLabel";
export class BollingerBandTooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.renderSVG = (moreProps) => {
      var _a;
      const {
        onClick,
        displayFormat,
        yAccessor = BollingerBandTooltip.defaultProps.yAccessor,
        options,
        origin: originProp,
        textFill,
        labelFill,
        labelFontWeight,
        className,
        displayValuesFor = BollingerBandTooltip.defaultProps.displayValuesFor,
        displayInit,
        fontFamily,
        fontSize,
        fontWeight,
      } = this.props;
      const {
        chartConfig: { width, height },
        fullData,
      } = moreProps;
      const currentItem =
        (_a = displayValuesFor(this.props, moreProps)) !== null && _a !== void 0
          ? _a
          : last(fullData);
      let top = displayInit;
      let middle = displayInit;
      let bottom = displayInit;
      if (currentItem !== undefined) {
        const item = yAccessor(currentItem);
        if (item !== undefined) {
          top = displayFormat(item.top);
          middle = displayFormat(item.middle);
          bottom = displayFormat(item.bottom);
        }
      }
      const origin = functor(originProp);
      const [x, y] = origin(width, height);
      const { sourcePath, windowSize, multiplier, movingAverageType } = options;
      const tooltipLabel = `BB(${sourcePath}, ${windowSize}, ${multiplier}, ${movingAverageType}): `;
      const tooltipValue = `${top}, ${middle}, ${bottom}`;
      return React.createElement(
        "g",
        {
          transform: `translate(${x}, ${y})`,
          className: className,
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
          React.createElement("tspan", { fill: textFill }, tooltipValue)
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
BollingerBandTooltip.defaultProps = {
  className:
    "react-financial-charts-tooltip react-financial-charts-bollingerband-tooltip",
  displayFormat: format(".2f"),
  displayValuesFor: (_, props) => props.currentItem,
  displayInit: "n/a",
  origin: [8, 8],
  yAccessor: (data) => data.bb,
};
//# sourceMappingURL=BollingerBandTooltip.js.map
