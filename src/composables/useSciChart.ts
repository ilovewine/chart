import type { StockQuote } from '@/types/Stockquote';
import {
  SciChartSurface,
  NumericAxis,
  FastLineRenderableSeries,
  XyDataSeries,
  EllipsePointMarker,
  SweepAnimation,
  SciChartJsNavyTheme,
  NumberRange,
  DateTimeNumericAxis,
} from 'scichart';

async function initSciChart(data: StockQuote[]) {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create('scichart-root', {
    theme: new SciChartJsNavyTheme(),
    title: 'Stockquotes',
    titleStyle: { fontSize: 22 },
  });

  const minDate = new Date();
  minDate.setHours(minDate.getHours() - 3);
  const maxDate = new Date();

  // Create an XAxis and YAxis with growBy padding
  const xAxisRange = new NumberRange(minDate.getTime() / 1000, maxDate.getTime() / 1000);
  const growBy = new NumberRange(0.1, 0.1);
  sciChartSurface.xAxes.add(
    new DateTimeNumericAxis(wasmContext, { axisTitle: 'Time', visibleRange: xAxisRange }),
  );
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { axisTitle: 'Growth', growBy }));

  // Create a line series with some initial data
  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      stroke: 'steelblue',
      strokeThickness: 3,
      dataSeries: new XyDataSeries(wasmContext, {
        xValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        yValues: [0, 0.0998, 0.1986, 0.2955, 0.3894, 0.4794, 0.5646, 0.6442, 0.7173, 0.7833],
      }),
      pointMarker: new EllipsePointMarker(wasmContext, { width: 11, height: 11, fill: '#fff' }),
      animation: new SweepAnimation({ duration: 300, fadeEffect: true }),
    }),
  );

  return sciChartSurface;
}

export default () => ({
  initSciChart,
});
