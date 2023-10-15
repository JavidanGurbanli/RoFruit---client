import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import "./Search.scss";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function Search() {
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const { t } = useTranslation(["header"]);
  const [search, setSearch] = useSearchParams();
  const searchText = search.get("query");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/products`)
      .then((response) => response.json())
      .then((data) => setAllProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, allProducts]);
  return (
    <div className="search_page">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.search")}</title>
        </Helmet>
        {filteredProducts.length === 0 ? (
          <p className="no-results_message">
            Axtarışınız üzrə saytda heç bir nəticə tapılmadı.
          </p>
        ) : (
          <ul className="productList">
            {filteredProducts.map((product) => (
              <SingleProduct key={product.id} product={product} icon="heart" />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
