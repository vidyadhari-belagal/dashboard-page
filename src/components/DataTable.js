import React from "react";

const DataTable = ({ data, highlight }) => {
    console.log("heigtlight",highlight)

  return (
    <table>

      <thead>

        <tr>
          <th>Source</th>
          <th>Category</th>
          <th>Date</th>
          <th>Value</th>
        </tr>

      </thead>

      <tbody>

        {data.map((item, index) => (

          <DataRow
            key={item.id}
            item={item}
            previous={data[index - 1]}
            highlight={highlight}
          />

        ))}

      </tbody>

    </table>
  );
};


const DataRow = React.memo(({ item, previous,highlight }) => {

  let alert = false;

  if (
    highlight &&
    previous &&
    item.category === "Inflation"
  ) {
    const change =
      ((item.value - previous.value) / previous.value) * 100;

    if (change > 5) {
      alert = true;
    }
  }

  return (
    <tr className={alert ? "highlight" : ""}>
      <td>{item.source}</td>
      <td>{item.category}</td>
      <td>{item.timestamp.toLocaleString()}</td>
      <td>{item.value.toLocaleString()}</td>
    </tr>
  );
});


export default DataTable;