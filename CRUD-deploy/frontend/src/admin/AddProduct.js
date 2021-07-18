import React, { useState, useEffect } from "react";
import { createProduct } from "./apiAdmin";
import { getDropdowns } from "../core/apiCore";

const AddProduct = () => {
  const [values, setValues] = useState({
    section: "",
    sections: [],
    name: "",
    description: "",
    brand: "",
    brands: [],
    material: "",
    materials: [],
    color: "",
    colors: [],
    design: "",
    application: "",
    instruction: "",
    width: "",
    length: "",
    weight: "",
    repeatLength: "",
    rollLength: "",
    property: "",
    properties: [],
    style: "",
    photo: "",
    price: "",
    delivery: "",
    gst: "",
    discount: 0,
    loading: false,
    error: "",
    createdProduct: "",
    formData: "",
  });

  const {
    section,
    sections,
    name,
    description,
    brand,
    brands,
    material,
    materials,
    color,
    colors,
    design,
    application,
    instruction,
    width,
    length,
    weight,
    repeatLength,
    rollLength,
    property,
    properties,
    style,
    price,
    photo,
    delivery,
    gst,
    discount,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  useEffect(() => {
    getDropdowns().then((dropdowns) => {
      if (dropdowns.error) {
        setValues({ ...values, error: dropdowns.error });
      } else {
        setValues({
          ...values,
          sections: dropdowns.section,
          materials: dropdowns.material,
          colors: dropdowns.color,
          properties: dropdowns.property,
          brands: dropdowns.brand,
          formData: new FormData(),
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(photo);
        setValues({
          section: "",
          name: "",
          description: "",
          brand: "",
          material: "",
          color: "",
          design: "",
          application: "",
          instruction: "",
          width: "",
          length: "",
          weight: "",
          repeatLength: "",
          rollLength: "",
          property: "",
          style: "",
          photo: "",
          price: "",
          delivery: "",
          gst: "",
          discount: 0,
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <div className="col-md-4">
          {/* <div className="form-group">
            <label className="text-muted">Section</label>
            <input
              onChange={handleChange("section")}
              type="text"
              className="form-control"
              value={section}
              required
            />
          </div> */}

          <div className="form-group">
            <label className="text-muted">Section</label>
            {/* <input
              list="sections"
              className="col-12 form-control"
              placeholder="Select a section or type a new one"
              onChange={handleChange("section")}
            />
            <datalist id="sections">
              {sections &&
                sections.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
            </datalist> */}
            <select
              name="section"
              id="section"
              onChange={handleChange("section")}
              className="col-12 form-control"
            >
              <option value="Fabric">Fabrics</option>
              <option value="Wallpaper">Wallpapers</option>
              <option value="Sheer">Sheers</option>
              <option value="Tassel">Tassels</option>
              <option value="Made Ups">Made Ups</option>
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
              required
            />
          </div>

          {/* <div className="form-group">
            <label className="text-muted">Brand</label>
            <input
              onChange={handleChange("brand")}
              type="text"
              className="form-control"
              value={brand}
              required
            />
          </div> */}

          <div className="form-group">
            <label className="text-muted">Description</label>
            <input
              onChange={handleChange("description")}
              className="form-control"
              value={description}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Brand</label>
            <input
              list="brands"
              className="col-12 form-control"
              placeholder="Select a brand or type a new one"
              onChange={handleChange("brand")}
            />
            <datalist id="brands">
              {brands &&
                brands.map((b, i) => (
                  <option key={i} value={b}>
                    {b}
                  </option>
                ))}
            </datalist>
          </div>

          {/* <div className="form-group">
            <label className="text-muted">Material</label>
            <input
              onChange={handleChange("material")}
              type="text"
              className="form-control"
              value={material}
              required
            />
          </div> */}

          <div className="form-group">
            <label className="text-muted">Material</label>
            <input
              list="materials"
              className="col-12 form-control"
              placeholder="Select a material or type a new one"
              onChange={handleChange("material")}
            />
            <datalist id="materials">
              {materials &&
                materials.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
            </datalist>
          </div>

          {/* <div className="form-group">
            <label className="text-muted">Color</label>
            <input
              onChange={handleChange("color")}
              type="text"
              className="form-control"
              value={color}
              required
            />
          </div> */}

          <div className="form-group">
            <label className="text-muted">Color</label>
            <input
              list="colors"
              className="col-12 form-control"
              placeholder="Select a color or type a new one"
              onChange={handleChange("color")}
            />
            <datalist id="colors">
              {colors &&
                colors.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
            </datalist>
          </div>

          <div className="form-group">
            <label className="text-muted">Property</label>
            <input
              list="properties"
              className="col-12 form-control"
              placeholder="Enter multiple properties with a comma"
              onChange={handleChange("property")}
              multiple
              type="email"
              formNoValidate
            />
            <datalist id="properties">
              {properties &&
                properties.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
            </datalist>
          </div>

          {/* <div className="form-group">
            <label className="text-muted">Property</label>
            <select
              name="property[]"
              className="form-control"
              onChange={handleChange("property")}
              multiple
            >
              {properties &&
                properties.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
            </select>
          </div> */}
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label className="text-muted">Design</label>
            <input
              onChange={handleChange("design")}
              type="text"
              className="form-control"
              value={design}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Style</label>
            <input
              onChange={handleChange("style")}
              type="text"
              className="form-control"
              value={style}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Application</label>
            <input
              onChange={handleChange("application")}
              type="text"
              className="form-control"
              value={application}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Instruction</label>
            <input
              onChange={handleChange("instruction")}
              className="form-control"
              value={instruction}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Width (in cm)</label>
            <input
              onChange={handleChange("width")}
              type="number"
              className="form-control"
              value={width}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Length (in cm)</label>
            <input
              onChange={handleChange("length")}
              type="number"
              className="form-control"
              value={length}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Weight (in gm)</label>
            <input
              onChange={handleChange("weight")}
              type="number"
              className="form-control"
              value={weight}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label className="text-muted">Repeat Length (in inch)</label>
            <input
              onChange={handleChange("repeatLength")}
              type="number"
              className="form-control"
              value={repeatLength}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Roll Length (in cm)</label>
            <input
              onChange={handleChange("rollLength")}
              type="number"
              className="form-control"
              value={rollLength}
            />
          </div>

          {/* <div className="form-group">
            <label className="text-muted">Property</label>
            <input
              onChange={handleChange("property")}
              type="text"
              className="form-control"
              value={property}
            />
          </div> */}

          <div className="form-group">
            <label className="text-muted">Price (in INR)</label>
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              value={price}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Delivery Charges (in INR)</label>
            <input
              onChange={handleChange("delivery")}
              type="number"
              className="form-control"
              value={delivery}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">GST (in %)</label>
            <input
              onChange={handleChange("gst")}
              type="number"
              className="form-control"
              value={gst}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Discount (in %)</label>
            <input
              onChange={handleChange("discount")}
              type="number"
              className="form-control"
              value={discount}
              required
            />
          </div>
          <label className="text-muted">Product image</label>
          <div className="form-group">
            <label className="btn btn-primary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
              />
            </label>
          </div>
          <button
            className="btn btn-outline-primary btn-block"
            style={{ marginTop: "16px" }}
            type="submit"
          >
            Create Product
          </button>
        </div>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      {`${createdProduct} has been created`}
    </div>
  );

  const showLoading = () =>
    loading && <div className="alert alert-success">{`Loading...`}</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className="mt-1 mb-21">Create a product</h3>
          {showError()}
          {showSuccess()}
          {showLoading()}
          {newPostForm()}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
