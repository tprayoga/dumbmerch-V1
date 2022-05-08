import React, { useEffect, useState } from 'react'
import { Button, Col } from "react-bootstrap";
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../config/api';

const Editproduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data

  // Fetching detail product data by id from database
  let { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data.products
  });

  // Fetching category data
  let { data: categoriesData, refetch: refetchCategories } = useQuery("categoriesCache", async () => {
    const response = await API.get("/categories");
    return response.data.categories;
  });

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      setForm({
        ...form,
        name: products.name,
        desc: products.desc,
        price: products.price,
        qty: products.qty,
      });
      setProduct(products);
    }

    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [products]);

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;
 
    if (checked == true) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      // Insert product data
      const response = await API.patch("/product/" + product.id, formData, config);
      console.log(response.data);

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);
  return (
<Col>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
      {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: '150px',
                    maxHeight: '150px',
                    objectFit: 'cover',
                  }}
                  alt="preview"
                />
              </div>
            )}
        <input onChange={handleChange} type="file" id="upload" name="image" hidden />
        <label className="file" for="upload">
          Upload File
        </label>
        <input
          className="input mt-4"
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={form?.name}
        ></input>
        <textarea
          className="input mt-4"
          name="desc"
          placeholder="Product Descriptions"
          onChange={handleChange}
          value={form?.desc}
        ></textarea>
        <input
          className="input mt-4"
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={form?.price}
        ></input>
        <input
          className="input mt-4"
          type="number"
          name="qty"
          placeholder="Stock"
          onChange={handleChange}
          value={form?.qty}
        ></input>
        <div className="d-grid gap-2 mt-4">
          <Button type="submit" variant="success" size="md">
            Add
          </Button>
        </div>
      </form>
    </Col>
  )
}

export default Editproduct
