import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState<string>("all");
  const { category } = useParams();

  useEffect(() => {
    const lowercaseCategoryName = String(category).toLowerCase();
    setCategoryName(lowercaseCategoryName);
  }, [category]);

  return (
    <>
      <div>{categoryName}</div>
    </>
  );
};

export default CategoryPage;
