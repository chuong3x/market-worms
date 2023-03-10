import { functor, GenericChartComponent, last } from "../../core";
import { format } from "d3-format";
import * as React from "react";
import { ToolTipText } from "./ToolTipText";
import { ToolTipTSpanLabel } from "./ToolTipTSpanLabel";
export class SingleMAToolTip extends React.Component {
  constructor() {
    super(...arguments);
    this.onClick = (event) => {
      const { onClick, forChart, options } = this.props;
      if (onClick !== undefined) {
        onClick(event, Object.assign({ chartId: forChart }, options));
      }
    };
  }
  render() {
    const {
      color,
      displayName,
      fontSize,
      fontFamily,
      fontWeight,
      textFill,
      labelFill,
      labelFontWeight,
      value,
    } = this.props;
    const translate =
      "translate(" + this.props.origin[0] + ", " + this.props.origin[1] + ")";
    return React.createElement(
      "g",
      { transform: translate },
      React.createElement("line", {
        x1: 0,
        y1: 2,
        x2: 0,
        y2: 28,
        stroke: color,
        strokeWidth: 4,
      }),
      React.createElement(
        ToolTipText,
        {
          x: 5,
          y: 11,
          fontFamily: fontFamily,
          fontSize: fontSize,
          fontWeight: fontWeight,
        },
        React.createElement(
          ToolTipTSpanLabel,
          { fill: labelFill, fontWeight: labelFontWeight },
          displayName
        ),
        React.createElement("tspan", { x: 5, dy: 15, fill: textFill }, value)
      ),
      React.createElement("rect", {
        x: 0,
        y: 0,
        width: 55,
        height: 30,
        onClick: this.onClick,
        fill: "none",
        stroke: "none",
      })
    );
  }
}
// tslint:disable-next-line: max-classes-per-file
export class MovingAverageTooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.renderSVG = (moreProps) => {
      var _a;
      const {
        chartId,
        chartConfig,
        chartConfig: { height },
        fullData,
      } = moreProps;
      const {
        className,
        displayInit = MovingAverageTooltip.defaultProps.displayInit,
        onClick,
        width = 65,
        fontFamily,
        fontSize,
        fontWeight,
        textFill,
        labelFill,
        origin: originProp,
        displayFormat,
        displayValuesFor = MovingAverageTooltip.defaultProps.displayValuesFor,
        options,
      } = this.props;
      const currentItem =
        (_a = displayValuesFor(this.props, moreProps)) !== null && _a !== void 0
          ? _a
          : last(fullData);
      const config = chartConfig;
      const origin = functor(originProp);
      const [x, y] = origin(width, height);
      const [ox, oy] = config.origin;
      return React.createElement(
        "g",
        { transform: `translate(${ox + x}, ${oy + y})`, className: className },
        options.map((each, idx) => {
          const yValue = currentItem && each.yAccessor(currentItem);
          const tooltipLabel = `${each.type} (${each.windowSize})`;
          const yDisplayValue = yValue ? displayFormat(yValue) : displayInit;
          return React.createElement(SingleMAToolTip, {
            key: idx,
            origin: [width * idx, 0],
            color: each.stroke,
            displayName: tooltipLabel,
            value: yDisplayValue,
            options: each,
            forChart: chartId,
            onClick: onClick,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
            textFill: textFill,
            labelFill: labelFill,
          });
        })
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
MovingAverageTooltip.defaultProps = {
  className:
    "react-financial-charts-tooltip react-financial-charts-moving-average-tooltip",
  displayFormat: format(".2f"),
  displayInit: "n/a",
  displayValuesFor: (_, props) => props.currentItem,
  origin: [0, 10],
  width: 65,
};
//# sourceMappingURL=MovingAverageTooltip.js.map
