import { functor, GenericChartComponent, last } from "../../core";
import { format } from "d3-format";
import * as React from "react";
import { ToolTipText } from "./ToolTipText";
import { ToolTipTSpanLabel } from "./ToolTipTSpanLabel";
const displayTextsDefault = {
  o: "O: ",
  h: " H: ",
  l: " L: ",
  c: " C: ",
  na: "n/a",
};
export class OHLCTooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.renderSVG = (moreProps) => {
      var _a;
      const {
        accessor,
        changeFormat = OHLCTooltip.defaultProps.changeFormat,
        className,
        displayTexts = OHLCTooltip.defaultProps.displayTexts,
        displayValuesFor = OHLCTooltip.defaultProps.displayValuesFor,
        fontFamily,
        fontSize,
        fontWeight,
        labelFill,
        labelFontWeight,
        ohlcFormat = OHLCTooltip.defaultProps.ohlcFormat,
        onClick,
        percentFormat = OHLCTooltip.defaultProps.percentFormat,
        textFill,
      } = this.props;
      const {
        chartConfig: { width, height },
        fullData,
      } = moreProps;
      const currentItem =
        (_a = displayValuesFor(this.props, moreProps)) !== null && _a !== void 0
          ? _a
          : last(fullData);
      let open = displayTexts.na;
      let high = displayTexts.na;
      let low = displayTexts.na;
      let close = displayTexts.na;
      let change = displayTexts.na;
      if (currentItem !== undefined && accessor !== undefined) {
        const item = accessor(currentItem);
        if (item !== undefined) {
          open = ohlcFormat(item.open);
          high = ohlcFormat(item.high);
          low = ohlcFormat(item.low);
          close = ohlcFormat(item.close);
          change = `${changeFormat(item.close - item.open)} (${percentFormat(
            (item.close - item.open) / item.open
          )})`;
        }
      }
      const { origin: originProp } = this.props;
      const [x, y] = functor(originProp)(width, height);
      const valueFill = functor(textFill)(currentItem);
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
            { fill: labelFill, fontWeight: labelFontWeight, key: "label_O" },
            displayTexts.o
          ),
          React.createElement(
            "tspan",
            { key: "value_O", fill: valueFill },
            open
          ),
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight, key: "label_H" },
            displayTexts.h
          ),
          React.createElement(
            "tspan",
            { key: "value_H", fill: valueFill },
            high
          ),
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight, key: "label_L" },
            displayTexts.l
          ),
          React.createElement(
            "tspan",
            { key: "value_L", fill: valueFill },
            low
          ),
          React.createElement(
            ToolTipTSpanLabel,
            { fill: labelFill, fontWeight: labelFontWeight, key: "label_C" },
            displayTexts.c
          ),
          React.createElement(
            "tspan",
            { key: "value_C", fill: valueFill },
            close
          ),
          React.createElement(
            "tspan",
            { key: "value_Change", fill: valueFill },
            ` ${change}`
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
OHLCTooltip.defaultProps = {
  accessor: (d) => d,
  changeFormat: format("+.2f"),
  className: "react-financial-charts-tooltip-hover",
  displayTexts: displayTextsDefault,
  displayValuesFor: (_, props) => props.currentItem,
  fontFamily: "-apple-system, system-ui, 'Helvetica Neue', Ubuntu, sans-serif",
  ohlcFormat: format(".2f"),
  origin: [0, 0],
  percentFormat: format("+.2%"),
};
//# sourceMappingURL=OHLCTooltip.js.map
