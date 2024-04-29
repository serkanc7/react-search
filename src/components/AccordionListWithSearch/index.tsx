import styles from "./style.module.css";

import React, { useState, useEffect, useRef } from "react";

import { UserProps } from "../../types/UserProps";

interface AccordionListWithSearchProps {
  source: UserProps[];
}

const AccordionListWithSearch: React.FC<AccordionListWithSearchProps> = ({
  source,
}) => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchTerms, setSearchTerms] = useState({
    username: "",
    name: "",
    email: "",
  });
  const [filteredSource, setFilteredSource] = useState<User[]>(source);
  const componentRef = useRef<{ getData: () => User[] | undefined }>();


  useEffect(() => {
    const filteredData = source.filter((item) => {
      return Object.keys(searchTerms).every((key) => {
        const itemValue = item[key as keyof User];
        if (typeof itemValue === "string") {
          return itemValue
            .toLowerCase()
            .includes(
              searchTerms[key as keyof typeof searchTerms].toLowerCase()
            );
        }
        return false;
      });
    });
    setFilteredSource(filteredData);
  }, [searchTerms, source]);

  useEffect(() => {
    componentRef.current = {
      getData: () => {
        return filteredSource;
      },
    };
  }, [filteredSource]);

  const handleAccordionButtonClick = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: keyof typeof searchTerms
  ) => {
    console.log(searchTerms);
    setSearchTerms({
      ...searchTerms,
      [property]: e.target.value,
    });
  };

  const handleMoveUp = (index: number) => {
    if (index > 0 && index < filteredSource.length) {
      const newFilteredSource = [...filteredSource];
      const temp = newFilteredSource[index];
      newFilteredSource[index] = newFilteredSource[index - 1];
      newFilteredSource[index - 1] = temp;
      setFilteredSource(newFilteredSource);
    }
  };

  const handleGetDataClick = () => {
    const data = componentRef.current?.getData();
    console.log("Alınan veri:", data);
  };

  return (
    <>
      <button onClick={handleGetDataClick}>Veriyi Al</button>
      <div className={styles.container} ref={componentRef}>
        <div className={styles.filter}>
          <h2>Filter</h2>
          <div className={styles.filter__inner}>
            <input
              type="text"
              placeholder="Username"
              value={searchTerms.username}
              onChange={(e) => handleInputChange(e, "username")}
            />
            <input
              type="text"
              placeholder="Name"
              value={searchTerms.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
            <input
              type="text"
              placeholder="Email"
              value={searchTerms.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content__headerWrapper}>
            <div className={styles.content__header}>
              <div className={styles.content__item}>Id</div>
              <div className={styles.content__item}>Username</div>
              <div className={styles.content__item}>Name</div>
              <div></div>
              <div></div>
            </div>
          </div>
          {filteredSource.map((item,index) => (
            <div key={item.id} className={styles.accordion}>
              <div className={styles.accordion__headerWrapper}>
                <div className={styles.accordion__header}>
                  <div className={styles.content__item}>{item.id}</div>
                  <div className={styles.content__item}>{item.username}</div>
                  <div className={styles.content__item}>{item.name}</div>
                  {index > 0 ? (
                    <div onClick={() => handleMoveUp(index)}>Up</div>
                  ) : <div></div>}
                  <div
                    className={
                      openId === item.id
                        ? styles.accordion__btn__1
                        : styles.accordion__btn__2
                    }
                    onClick={() => handleAccordionButtonClick(item.id)}
                  ></div>
                </div>
              </div>
              {openId === item.id && (
                <div className={styles.accordion__details}>
                  <h3>Detail:</h3>
                  <p>Email: {item.email}</p>
                  <p>Phone: {item.phone}</p>
                  <p>Website: {item.website}</p>
                  <p>
                    Address:
                    <br />
                    City:{item.address.city} Zip Code:{item.address.zipcode}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AccordionListWithSearch;
