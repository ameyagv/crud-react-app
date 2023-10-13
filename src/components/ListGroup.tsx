function ListGroup() {
  const items = ["Mumbai", "Pune", "Chennai", "Hyderabad"];

  return (
    <>
      <h1>Hello</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
