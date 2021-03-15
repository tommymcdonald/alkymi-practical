import React, { useState } from "react";
import { isValidDate } from "../../utils/utils";

type RowInputProps = {
  field: {
    name: string,
    text: string,
    type: "text" | "date"
    validation_error: string
  }
}

const RowInput = ({ field }: RowInputProps) => {
  // local state items
  const [value, setValue] = useState<string>(field.text);
  const [invalid, setInvalid] = useState<boolean>(false);

  const validateInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    // @TODO add on load (check for validity when the data renders as opposed to only on onChange)

    // Only checking date inputs for validity
    if (field.type === "date") {
      const isValid = isValidDate(value);

      if (!isValid) {
        setInvalid(true);
      } else {
        setInvalid(false);
      }

      setValue(value);
    }

    if (field.type !== "date") {
      setValue(evt.target.value)
    }
  }

  // not setting input type to "date", as an invalid date format doesn't show up in the datepicker,
  // appearing to be an empty value
  return (
    <>
      <input
        className={invalid ? "form-control is-invalid" : "form-control"}
        type={field.type === "date" ? "text" : field.type}
        value={value}
        onChange={validateInput}
      />
      {invalid && <p className="font-italic text-danger" style={{ fontSize: '.75em' }}>Date should be a in <span>YYYY-MM-DD</span> format.</p>}
    </>
  )
}

export default RowInput;