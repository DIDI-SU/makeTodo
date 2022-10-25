import React, { createContext, useState } from "react";

const LoadingContext = createContext(null);

const LoadingProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editedId, setEditedId] = useState(0);

  return (
    <LoadingContext.Provider
      value={{ error, setError, loading, setLoading, editedId, setEditedId }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
