import React, { useState } from 'react'
import data from "./data"
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_TableHeadCellFilterContainer,
} from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter,faXmark } from '@fortawesome/free-solid-svg-icons';
import "./New.css"


function Table() {
  //should be memoized or stable

  const [showPanel, setShowPanel] = useState(false);
  const [showHide, setShowHide] = useState(false);

  const togglePanel = () => {
      setShowPanel(!showPanel);
  };
  const toggleShowHide = () => {
      setShowHide(!showHide);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Id',
        size: 150,
        enableGrouping: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
        enableGrouping: false,
      },
      {
        accessorKey: 'category', //normal accessorKey
        header: 'Category',
        size: 200,
      },
      {
        accessorKey: 'subcategory',
        header: 'Subcategory',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 150,
        enableGrouping: false,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        size: 150,
        enableGrouping: false,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive', // default (or between)
        muiFilterSliderProps: {
          marks: true,
          max: 200, //custom max (as opposed to faceted max)
          min: 0, //custom min (as opposed to faceted min)
          step: 5,
          valueLabelFormat: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
        },
        size: 150,
        enableGrouping: false,
      },
      {
        accessorKey: 'sale_price',
        header: 'Sale Price',
        size: 150,
        enableGrouping: false,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
    paginationDisplayMode: 'pages',
    enableGrouping: true,
  });

  // return <MaterialReactTable table={table} />;
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="navbar-left">
        
        </div>
        <div className="navbar-right">
          <button className="btn btn-outline-light" onClick={togglePanel}>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </nav>
      {showPanel && (
        <div className="side-panel">
          <button className="btn btn-outline-dark" onClick={togglePanel}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {table.getLeafHeaders().map((header) => (
            <div className='container'>
              < MRT_TableHeadCellFilterContainer
                key={header.id}
                header={header}
                table={table}
                in
              />
            </div>
          ))}

        </div>
      )}

      <MaterialReactTable table={table} />
    </div>
  )
}

export default Table