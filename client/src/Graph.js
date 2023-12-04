import Plotly from "plotly.js-finance-dist"
import createPlotlyComponent from "react-plotly.js/factory"

const Plot = createPlotlyComponent(Plotly)

function transposeData(data) {
    const transposedData = {}
    transposedData.codes = data.map((row) => { return row.code })
    return transposedData
}

function Graph(props) {
    console.log(props.data)
    let transposed = transposeData(props.data)
    return (
        <div>
            <Plot
                data={[{
                    x: transposed.codes, type: 'histogram', xbins: {
                        start: -0.5,
                        end: 100.5,
                        size: 1
                    }
                }]}
                style={{ height: "100%", width: "100%" }}
                useResizeHandler={true}
            // layout={{
            //     autosize: true,
            //     xaxis: {
            //         autorange: true,
            //         rangeslider: { range: [data_with_extras.time[0], data_with_extras.time[data_with_extras.time.length - 1]] },
            //         type: 'date'
            //     },
            //     yaxis: {
            //         autorange: true,
            //         type: 'linear'
            //     }
            // }}
            />
        </div>
    )
}

export default Graph