import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { Link, useNavigate } from "react-router-dom";

import { Explore } from "../Explore/Explore";
import searchIcon from "../../assets/images/icons/search.svg";

export const FormSearch = ({}) => {
  const { products } = useContext(ProductsContext);
  /*   const [search, setSearch] = useState("");

  useEffect(() => {
    const getGamesFilter = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/games?search=${search}`
      );
      const data = await response.json();
    };
    getGamesFilter();
  }, [search]); */

  /*  const SubmitForm = (e) => {
    const formData = new FormData(e.target);
    for (const search of formData.entries()) {
      console.log(search);
      useNavigate(`/shop?${search[0]}=${search[0]}`);
    }
    e.preventDefault();
  };
 */
  //! Variables de estado para el buscador
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  //! Alternar Estado de resultados
  const handleToggleResults = () => {
    setShowResults(!showResults);
  };

  //! Función para abrir la lista de productos
  const getGamesFilter = (query) => {
    setSearchQuery(query);

    if (!query) {
      return setFilteredProducts([]);
    }

    // Filtrar los productos basados en la query
    const gamesFilter = products.filter((game) =>
      game.title.toLowerCase().includes(query)
    );

    setFilteredProducts(gamesFilter);
  };

  const onCloseList = () => {
    setSearchQuery("");
    setFilteredProducts([]);
  };

  const displayedProducts = filteredProducts.slice(0, 3);

  const sliceTitle = (title) => {
    return title.length > 30 ? `${title.slice(0, 30)}...` : title;
  };

  /*   const SubmitForm = (e) => {
    useEffect(() => {
      const getGamesFilter = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API}/api/games?search=${searchQuery}`
        );
        const data = await response.json();
      };
      getGamesFilter();
    }, [searchQuery]);
  }; */

  return (
    <form /* onSubmit={SubmitForm} */ className="header__form">
      <div className="header__form-container">
        <div className="header__form-label">
          <input
            value={searchQuery}
            onFocus={handleToggleResults}
            onBlur={handleToggleResults}
            onChange={(e) => getGamesFilter(e.target.value.toLowerCase())}
            type="search"
            placeholder="Buscar en la tienda"
            name="search"
            id="search"
            className="header__form-input"
          />
          <img
            src={searchIcon}
            alt="Icono de búsqueda"
            className="header__form-icon"
          />
          <nav className="product-list">
            <ul className="product-list__items">
              {searchQuery &&
                displayedProducts.map(({ id, img, title }) => (
                  <li key={id} className="product-list__item">
                    <Link
                      to={`/detail/${id}`}
                      className="product-list__link"
                      onClick={onCloseList}
                    >
                      <img
                        src={`/images/products/${img}`}
                        alt={title}
                        className="product-list__image"
                      />
                      <span className="product-list__name">
                        {sliceTitle(title)}
                      </span>
                    </Link>
                  </li>
                ))}
              {(showResults || searchQuery) && (
                <li className="product-list__results">
                  <span className="product-list__name">
                    Resultados: {filteredProducts.length}
                  </span>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      {/* <Explore /> */}
    </form>
  );
};
