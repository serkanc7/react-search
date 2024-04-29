import React, { useEffect, useState } from "react";
import AccordionListWithSearch from "../components/AccordionListWithSearch";
import { UserProps } from "../types/UserProps";

const Home: React.FC = () => {
  const [source, setSource] = useState<UserProps[]>([]);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setSource(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <main>
      <AccordionListWithSearch source={source} />
    </main>
  );
};

export default Home;
