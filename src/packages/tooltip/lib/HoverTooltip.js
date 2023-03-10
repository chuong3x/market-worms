import { max, sum } from "d3-array";
import * as PropTypes from "prop-types";
import * as React from "react";
import { first, isDefined, GenericComponent, last } from "../../core";
const PADDING = 4;
const X = 8;
const Y = 8;
const roundRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};
const defaultBackgroundShapeCanvas = (props, { width, height }, ctx) => {
  const { toolTipFillStyle, toolTipStrokeStyle } = props;
  ctx.beginPath();
  roundRect(ctx, 0, 0, width, height, 4);
  if (toolTipFillStyle !== undefined) {
    ctx.fillStyle = toolTipFillStyle;
    ctx.shadowColor = "#898";
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  if (toolTipStrokeStyle !== undefined) {
    ctx.strokeStyle = toolTipStrokeStyle;
    ctx.stroke();
  }
};
const defaultTooltipCanvas = (props, content, ctx) => {
  var _a, _b;
  const { fontSize = 14, fontFamily, fontFill } = props;
  const startY = Y + fontSize * 0.9;
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  if (fontFill !== undefined) {
    ctx.fillStyle = fontFill;
  }
  ctx.textAlign = "left";
  ctx.fillText(content.x, X, startY);
  const maxLabel =
    (_a = max(content.y, (y) => ctx.measureText(y.label).width)) !== null &&
    _a !== void 0
      ? _a
      : 0;
  for (let i = 0; i < content.y.length; i++) {
    const y = content.y[i];
    const textY = (i + 1) * PADDING + startY + fontSize * (i + 1);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = (_b = y.stroke) !== null && _b !== void 0 ? _b : fontFill;
    ctx.fillText(y.label, X, textY);
    if (fontFill !== undefined) {
      ctx.fillStyle = fontFill;
    }
    ctx.fillText(y.value, X * 2 + maxLabel, textY);
  }
};
const drawOnCanvas = (ctx, props, context, pointer, height) => {
  const { margin, ratio } = context;
  const { backgroundShapeCanvas, tooltipCanvas, background } = props;
  const originX = 0.5 * ratio + margin.left;
  const originY = 0.5 * ratio + margin.top;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);
  ctx.translate(originX, originY);
  const { x, y, content, centerX, pointWidth, bgSize } = pointer;
  if (
    (background === null || background === void 0
      ? void 0
      : background.fillStyle) !== undefined
  ) {
    ctx.fillStyle = background.fillStyle;
  }
  ctx.beginPath();
  ctx.rect(centerX - pointWidth / 2, 0, pointWidth, height);
  ctx.fill();
  ctx.translate(x, y);
  backgroundShapeCanvas(props, bgSize, ctx);
  tooltipCanvas(props, content, ctx);
  ctx.restore();
};
const calculateTooltipSize = (props, content, ctx) => {
  const { fontFamily, fontSize = 12, fontFill } = props;
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  if (fontFill !== undefined) {
    ctx.fillStyle = fontFill;
  }
  ctx.textAlign = "left";
  const measureText = (str) => ({
    width: ctx.measureText(str).width,
    height: fontSize + PADDING,
  });
  const { width, height } = content.y
    .map(({ label, value }) => measureText(`${label}  ${value}`))
    // Sum all y and x sizes (begin with x label size)
    .reduce((res, size) => sumSizes(res, size), measureText(String(content.x)));
  return {
    width: width + 2 * X,
    height: height + 2 * Y,
  };
};
const sumSizes = (...sizes) => {
  return {
    width: Math.max(...sizes.map((size) => size.width)),
    height: sum(sizes, (d) => d.height),
  };
};
const normalizeX = (x, bgSize, pointWidth, width) => {
  return x < width / 2
    ? x + pointWidth / 2 + PADDING
    : x - bgSize.width - pointWidth / 2 - PADDING;
};
const normalizeY = (y, bgSize) => {
  return y - bgSize.height <= 0 ? y + PADDING : y - bgSize.height - PADDING;
};
const defaultOrigin = (props, moreProps, bgSize, pointWidth) => {
  const { chartId, yAccessor } = props;
  const { mouseXY, xAccessor, currentItem, xScale, chartConfig, width } =
    moreProps;
  let y = last(mouseXY);
  const xValue = xAccessor(currentItem);
  let x = Math.round(xScale(xValue));
  if (
    isDefined(chartId) &&
    isDefined(yAccessor) &&
    isDefined(chartConfig) &&
    isDefined(chartConfig.findIndex)
  ) {
    const yValue = yAccessor(currentItem);
    const chartIndex = chartConfig.findIndex((c) => c.id === chartId);
    y = Math.round(chartConfig[chartIndex].yScale(yValue));
  }
  x = normalizeX(x, bgSize, pointWidth, width);
  y = normalizeY(y, bgSize);
  return [x, y];
};
export class HoverTooltip extends React.Component {
  constructor() {
    super(...arguments);
    this.drawOnCanvas = (ctx, moreProps) => {
      const pointer = this.helper(ctx, moreProps);
      if (pointer === undefined) {
        return;
      }
      const { height } = moreProps;
      drawOnCanvas(ctx, this.props, this.context, pointer, height);
    };
    this.helper = (ctx, moreProps) => {
      const {
        show,
        xScale,
        currentItem,
        plotData,
        xAccessor,
        displayXAccessor,
      } = moreProps;
      const { origin = HoverTooltip.defaultProps.origin, tooltip } = this.props;
      if (!show || currentItem === undefined) {
        return;
      }
      const xValue = xAccessor(currentItem);
      if (xValue === undefined) {
        return;
      }
      const content = tooltip.content({
        currentItem,
        xAccessor: displayXAccessor,
      });
      const centerX = xScale(xValue);
      const pointWidth =
        Math.abs(
          xScale(xAccessor(last(plotData))) - xScale(xAccessor(first(plotData)))
        ) /
        (plotData.length - 1);
      const bgSize = calculateTooltipSize(this.props, content, ctx);
      const [x, y] = origin(this.props, moreProps, bgSize, pointWidth);
      return { x, y, content, centerX, pointWidth, bgSize };
    };
  }
  render() {
    return React.createElement(GenericComponent, {
      canvasDraw: this.drawOnCanvas,
      drawOn: ["mousemove", "pan"],
    });
  }
}
HoverTooltip.defaultProps = {
  background: {
    fillStyle: "rgba(33, 148, 243, 0.1)",
  },
  toolTipFillStyle: "rgba(250, 250, 250, 1)",
  toolTipStrokeStyle: "rgba(33, 148, 243)",
  tooltipCanvas: defaultTooltipCanvas,
  origin: defaultOrigin,
  backgroundShapeCanvas: defaultBackgroundShapeCanvas,
  fontFill: "#000000",
  fontFamily:
    "-apple-system, system-ui, Roboto, 'Helvetica Neue', Ubuntu, sans-serif",
  fontSize: 14,
};
HoverTooltip.contextTypes = {
  margin: PropTypes.object.isRequired,
  ratio: PropTypes.number.isRequired,
};
//# sourceMappingURL=HoverTooltip.js.map
