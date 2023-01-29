const MatchDataAPI = async (inputs) => {
  const response = await fetch(`./data/${inputs.store.value}.json`);
  const customers = await response.json();
  const matchedResults = customers.filter((customer) => {
    const name = inputs.name.value;
    const phone = inputs.phone.value;
    const payment = inputs.payment.value;
    return (
      name === customer.name &&
      phone === customer.phone &&
      payment === customer.payment
    );
  });
  return matchedResults;
};

export default MatchDataAPI;
