import type { StockQuote } from '@/types/Stockquote';
import {
  SciChartSurface,
  NumericAxis,
  FastLineRenderableSeries,
  XyDataSeries,
  EllipsePointMarker,
  SweepAnimation,
  NumberRange,
  DateTimeNumericAxis,
  ZoomPanModifier,
  ZoomExtentsModifier,
  MouseWheelZoomModifier,
  FastColumnRenderableSeries,
  EAutoRange,
} from 'scichart';
import { appTheme } from 'scichart-example-dependencies';
import useChartData from './useChartData';

async function initSciChart(data: StockQuote[]) {
  const { dtArray, priceArray, amountArray } = useChartData(data);
  const { sciChartSurface, wasmContext } = await SciChartSurface.create('scichart-root', {
    theme: appTheme.SciChartJsTheme,
    title: 'Stockquotes',
    titleStyle: { fontSize: 22 },
  });

  // set XAxis
  const minDate = dtArray[0];
  const maxDate = dtArray[dtArray.length - 1];

  // Create an XAxis and YAxis with growBy padding
  const xAxisRange = new NumberRange(minDate, maxDate);
  const growBy = new NumberRange(0.1, 0.1);
  sciChartSurface.xAxes.add(
    new DateTimeNumericAxis(wasmContext, { axisTitle: 'Time', visibleRange: xAxisRange }),
  );
  sciChartSurface.yAxes.add(
    new NumericAxis(wasmContext, { axisTitle: 'Growth', growBy, autoRange: EAutoRange.Once }),
  );

  sciChartSurface.renderableSeries.add(
    new FastColumnRenderableSeries(wasmContext, {
      stroke: appTheme.VividTeal,
      strokeThickness: 1,
      dataSeries: new XyDataSeries(wasmContext, {
        xValues: dtArray,
        yValues: amountArray,
      }),
      animation: new SweepAnimation({ duration: 300, fadeEffect: true }),
    }),
  );

  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      stroke: appTheme.VividRed,
      strokeThickness: 3,
      dataSeries: new XyDataSeries(wasmContext, {
        xValues: dtArray,
        yValues: priceArray,
      }),
      pointMarker: new EllipsePointMarker(wasmContext, {
        width: 5,
        height: 5,
        fill: appTheme.VividRed,
      }),
      animation: new SweepAnimation({ duration: 300, fadeEffect: true }),
    }),
  );

  sciChartSurface.chartModifiers.add(new ZoomPanModifier());
  sciChartSurface.chartModifiers.add(new ZoomExtentsModifier());
  sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier());

  return sciChartSurface;
}

export default () => ({
  initSciChart,
});
