const compose =
  (...funcs) =>
  (Component) => {
    return funcs.reduceRight((Item, f) => f(Item), Component);
  };

export default compose;
