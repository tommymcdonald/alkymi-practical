import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/utils";
import RowInput from "../row-input";


type RowType = {
  uuid: string,
  created: string,
  name: string,
  data: {},

}

type RowProps = {
  row: RowType,
  fields: {
    name: string, 
    type: "text" | "date"
  },
  handleCheckedRow: (e: React.ChangeEvent<HTMLInputElement>, row: RowType) => {}
}

const Row = ({ row, fields, handleCheckedRow }: RowProps) => {
  const [inputs, setInputs] = useState([]);

  // create and set inputs on init of Row component
  // merging fields and results 
  useEffect(() => {
    if (row.data) {
      // container for newly created fields
      let allInputs: [] = [];

      // iterate over data items in 'results' object from API response
      Object.keys(row.data).forEach((d, i) => {
        // @ts-ignore for time's sake
        const fieldItem = fields[i];
        // @ts-ignore for time's sake
        const dataItem = row.data[d];

        // getting all items necessary for an input field in a single object
        const singleField: any = {
          ...dataItem,
          ...fieldItem,
        }

        // @ts-ignore
        allInputs.push(singleField);
      })

      setInputs(allInputs);
    }
  }, [])

  return (
    <tr key={row.uuid}>
      <td>
        <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckedRow(e, row)} />
      </td>
      <td>{row.name}</td>
      <td>{formatDate(row.created)}</td>
      { /* Continuing the extreme assumption here */}
      {inputs.map((input, idx) => {
        return (
          <td key={idx}>
            <RowInput field={input} />
          </td>
        )
      })}
    </tr>
  )
}

export default Row;