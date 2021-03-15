import { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import logo from "./assets/images/alkymi_logo.svg"
import Row from './components/row';

function App({ rows, deletedRows, dispatch }) {
  const { fields, results } = rows;

  // using local state here, as I feel this should be "global" state
  const [checkedRows, setCheckedRows] = useState([]);
  const [showDeletedRows, setShowDeletedRows] = useState(false);

  // initializing rows from API call
  useEffect(() => {
    const initialize = async () => {
      try {
        // @TODO maybe move this into not locally served file?
        const res = await fetch('http://localhost:3001/data');
        const json = await res.json();

        dispatch({ type: 'SET_ROWS', payload: json });
      } catch {
        // @TODO handle errors
      }

    }

    initialize();
  }, []);

  const handleCheckedRow = (e, row) => {
    const checkedRowsCopy = [...checkedRows];
    const { uuid } = row;

    // if checked is false, remove row from "checkedRows" by UUID
    if (e.target.checked === false) {
      let filtered = checkedRowsCopy.filter(r => r.uuid !== uuid);
      setCheckedRows(filtered);
    } else {
      checkedRowsCopy.push(row);
      setCheckedRows(checkedRowsCopy);
    }
  }

  const restoreDeletedRows = () => {
    dispatch({ type: 'RESTORE_DELETED_ROWS' })
  }

  const handleDeleteRows = () => {
    // set "deleted rows" in redux state (for retrieving later)
    dispatch({ type: "SET_DELETED_ROWS", payload: checkedRows })

    // reset local checked state
    setCheckedRows([]);

    // NORMALLY, would make an API call here with an array (of either whole rows or UUIDs)
    // but in this instance, will handle all data management client-side

    // get UUIDs of deleted items
    let deletedUUIDs = [];
    checkedRows.forEach(cr => {
      deletedUUIDs.push(cr.uuid);
    })

    // remove the selected rows from primary list
    const resultsCopy = [...rows.results];

    const filteredResults = resultsCopy.filter(rc => {
      const { uuid } = rc;
      const isDeleted = deletedUUIDs.includes(uuid);

      // filter down results to contain results NOT included in deletedRows
      return !isDeleted
    })

    const updatedRows = {
      ...rows,
      results: filteredResults
    };

    dispatch({ type: 'SET_ROWS', payload: updatedRows })
  }

  return (
    <div>
      <header>
        <img src={logo} className="logo" alt="Alkymi logo" />
        <span className="header-title">Data Inbox</span>
      </header>

      <div className="container">
        <div className="d-flex justify-content-between ">
          <button
            onClick={handleDeleteRows}
            disabled={!checkedRows.length}
            className="btn btn-primary">
            Remove {checkedRows.length ? `${checkedRows.length} items` : ""}
          </button>
          {!!deletedRows.length && (
            <button onClick={() => setShowDeletedRows(!showDeletedRows)} className="btn btn-outline-primary">
              {showDeletedRows ? "Hide" : "Show"} deleted items {deletedRows.length ? `(${deletedRows.length})` : ""}
            </button>
          )}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date Created</th>
              { /* Making an extreme assumption that these keys from the server will always line up */}
              {fields && Object.keys(fields).map((k) => {
                return <th key={k}>{fields[k].name}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(results) && results.map((row) => <Row key={row.uuid} handleCheckedRow={handleCheckedRow} row={row} fields={fields} />)}
          </tbody>
        </table>

        {showDeletedRows && !!deletedRows.length && (
          <div className="card">
            <div className="card-body">
              <div className="card-title">Deleted items:</div>

              <ul className="list-group">
                {deletedRows.map(dr => (
                  <li className="list-group-item" key={dr.uuid}>{dr.name}</li>
                ))}
              </ul>
              <div className="restore-button d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-outline-primary" onClick={() => restoreDeletedRows()}>Restore</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rows: state.rows,
    deletedRows: state.deletedRows,
  }
}

export default connect(mapStateToProps)(App)