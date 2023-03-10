import { GenericChartComponent, last } from "../../core";
import { format } from "d3-format";
import * as React from "react";
import { SingleTooltip } from "./SingleTooltip";
import { ToolTipText } from "./ToolTipText";
export class GroupTooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.getPosition = (moreProps) => {
      const { position } = this.props;
      const { height, width } = moreProps.chartConfig;
      const dx = 20;
      const dy = 40;
      let textAnchor;
      let xyPos = null;
      if (position !== undefined) {
        switch (position) {
          case "topRight":
            xyPos = [width - dx, null];
            textAnchor = "end";
            break;
          case "bottomLeft":
            xyPos = [null, height - dy];
            break;
          case "bottomRight":
            xyPos = [width - dx, height - dy];
            textAnchor = "end";
            break;
          default:
            xyPos = [null, null];
        }
      } else {
        xyPos = [null, null];
      }
      return { xyPos, textAnchor };
    };
    this.renderSVG = (moreProps) => {
      var _a;
      const { chartId, fullData } = moreProps;
      const {
        className,
        displayInit = GroupTooltip.defaultProps.displayInit,
        displayValuesFor,
        onClick,
        width = 60,
        verticalSize = 13,
        fontFamily,
        fontSize,
        fontWeight,
        layout,
        origin,
        displayFormat,
        options,
      } = this.props;
      const currentItem =
        (_a = displayValuesFor(this.props, moreProps)) !== null && _a !== void 0
          ? _a
          : last(fullData);
      const { xyPos, textAnchor } = this.getPosition(moreProps);
      const xPos = xyPos != null && xyPos[0] != null ? xyPos[0] : origin[0];
      const yPos = xyPos != null && xyPos[1] != null ? xyPos[1] : origin[1];
      const singleTooltip = options.map((each, idx) => {
        const yValue = currentItem && each.yAccessor(currentItem);
        const yDisplayValue = yValue ? displayFormat(yValue) : displayInit;
        const orig = () => {
          if (layout === "horizontal" || layout === "horizontalRows") {
            return [width * idx, 0];
          }
          if (layout === "vertical") {
            return [0, verticalSize * idx];
          }
          if (layout === "verticalRows") {
            return [0, verticalSize * 2.3 * idx];
          }
          return [0, 0];
        };
        return React.createElement(SingleTooltip, {
          key: idx,
          layout: layout,
          origin: orig(),
          yLabel: each.yLabel,
          yValue: yDisplayValue,
          options: each,
          forChart: chartId,
          onClick: onClick,
          fontFamily: fontFamily,
          fontSize: fontSize,
          labelFill: each.labelFill,
          valueFill: each.valueFill,
          withShape: each.withShape,
        });
      });
      return React.createElement(
        "g",
        {
          transform: `translate(${xPos}, ${yPos})`,
          className: className,
          textAnchor: textAnchor,
        },
        layout === "horizontalInline"
          ? React.createElement(
              ToolTipText,
              {
                x: 0,
                y: 0,
                fontFamily: fontFamily,
                fontSize: fontSize,
                fontWeight: fontWeight,
              },
              singleTooltip
            )
          : singleTooltip
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
GroupTooltip.defaultProps = {
  className:
    "react-financial-charts-tooltip react-financial-charts-group-tooltip",
  layout: "horizontal",
  displayFormat: format(".2f"),
  displayInit: "",
  displayValuesFor: (_, props) => props.currentItem,
  origin: [0, 0],
  width: 60,
  verticalSize: 13,
};
//# sourceMappingURL=GroupTooltip.js.map
