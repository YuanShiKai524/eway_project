const MatchDataAPI = async (inputs) => {
  const response = await fetch(`./data/${inputs.store.value}.json`);
  const customers = await response.json();
  const matchedResults = customers.filter((customer) => {
    const name = inputs.name.value;
    const phone = inputs.name.value;
    const payment = inputs.name.value;
    const { CName, CPhone, CPayment } = customer;
    return name === CName && phone === CPhone && payment === CPayment;
  });
  return matchedResults;
};

export default MatchDataAPI;
