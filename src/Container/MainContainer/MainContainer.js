const MainContainer = ({ children }) => {
  return (
    <section className="flex  items-center justify-start mx-auto max-w-3xl p-5">
      {children}
    </section>
  );
};

export default MainContainer;
