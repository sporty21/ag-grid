var columnDefs = [
    // group cell renderer needed for expand / collapse icons
    {field: 'name', cellRenderer: 'agGroupCellRenderer'},
    {field: 'account'},
    {field: 'calls'},
    {field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'"}
];

var gridOptions = {
    columnDefs: columnDefs,
    masterDetail: true,
    embedFullWidthRows: true,
    defaultColDef: {
        width: 300
    },
    detailCellRendererParams: {
        detailGridOptions: {
            columnDefs: [
                {field: 'callId'},
                {field: 'direction'},
                {field: 'number'},
                {field: 'duration', valueFormatter: "x.toLocaleString() + 's'"},
                {field: 'switchCode'}
            ],
            onFirstDataRendered(params) {
                params.api.sizeColumnsToFit();
            }
        },
        getDetailRowData(params) {
            params.successCallback(params.data.callRecords);
        }
    },
    onFirstDataRendered(params) {
        // arbitrarily expand a row for presentational purposes
        setTimeout(function() { params.api.getDisplayedRowAtIndex(1).setExpanded(true); }, 0);
    }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    agGrid.simpleHttpRequest({url: 'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json'}).then(function (data) {
        gridOptions.api.setRowData(data);
    });
});