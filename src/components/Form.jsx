import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import useNews from "../hooks/useNews";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
];
const Form = () => {
  const { category, handleChangeCategory } = useNews();

  return (
    <form>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          onChange={handleChangeCategory}
          value={category}
        >
          {CATEGORIES.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};

export default Form;
