export const jsonConversion = (data) => {
  return data.map((item) => {
    let date;

    if (typeof item.timestamp === "number") {
      date = new Date(item.timestamp * 1000);
    } else {
      date = new Date(item.timestamp);
    }

    let value = item.value;

    if (typeof value === "string") {
      value = value.replace("$", "");

      if (value.includes("B")) {
        value = parseFloat(value) * 1000000000;
      } else if (value.includes("M")) {
        value = parseFloat(value) * 1000000;
      } else {
        value = parseFloat(value);
      }
    }

    return {
      ...item,
      timestamp: date,
      value
    };
  });
};