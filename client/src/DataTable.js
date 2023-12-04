import Button from 'react-bootstrap/esm/Button'
import Table from 'react-bootstrap/Table'

function DataTable(props) {
    const tableRows = props.data.map(row => {
        return (
            <tr key={row._id}>
                <td>{row.code}</td>
            </tr>
        )
    })
    tableRows.reverse()
    return (
        <div>
            <div className='d-flex justify-content-end mb-3'>
                <Button onClick={() => props.refreshHandler()}>Refresh Data</Button>
            </div>
            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
        </div>
    )
}

export default DataTable