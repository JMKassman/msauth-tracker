import Plotly from "plotly.js-finance-dist"
import createPlotlyComponent from "react-plotly.js/factory"

const Plot = createPlotlyComponent(Plotly)

function transposeData(data) {
    const transposedData = {}
    transposedData.codes = data.map((row) => { return row.code })
    return transposedData
}

function Graph(props) {
    let transposed = transposeData(props.data)
    let allCodes = []
    try {
        allCodes = props.allData[0].codes
    } catch (error) {
        allCodes = []
    }
    return (
        <div>
            <h2>Your Codes</h2>
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
            />
            <h2>All Codes</h2>
            <Plot
                data={[{
                    x: allCodes, type: 'histogram', xbins: {
                        start: -0.5,
                        end: 100.5,
                        size: 1
                    }
                }]}
                style={{ height: "100%", width: "100%" }}
                useResizeHandler={true}
            />
        </div>
    )
}

export default Graph