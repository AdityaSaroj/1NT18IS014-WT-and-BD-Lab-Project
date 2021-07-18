import React, { useEffect, useState } from "react";
import { getFilterValues } from "../api/apiCore";

const Checkboxes = ({ name, value, onChange }) => {
  const [values, setValues] = useState({
    brand: [],
    design: [],
    material: [],
    application: [],
    property: [],
  });

  // const { brand, design, material, application, property } = values;

  const loadFilterValues = () => {
    getFilterValues().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          brand: data.brand,
          design: data.design,
          material: data.material,
          application: data.application,
          property: data.property,
        });
      }
    });
  };

  useEffect(() => {
    loadFilterValues();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e, name) => {
    let choices = values[name];
    // console.log(choices);
    let selected = value;
    choices.forEach((c) => {
      if (c === e.target.value) {
        if (e.target.checked) {
          // console.log("Checked" + c);
          selected.push(c);
        } else {
          let index = selected.indexOf(c);
          if (index > -1) {
            selected.splice(index, 1);
          }
        }
      }
    });
    // console.log(selected);
    onChange(selected);
  };

  return (
    <div>
      {values[name].map((v, i) => {
        return (
          <div className="group" key={i}>
            <input
              type="checkbox"
              id={v}
              name={v}
              value={v}
              onChange={(e) => handleChange(e, name)}
            />
            <label htmlFor={v}>{v}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Checkboxes;
