import React, { createContext, useContext } from 'react';
import portfolioDataDefault, { skillsCategories, learningInterests } from '../data/portfolioData';

const PortfolioContext = createContext(portfolioDataDefault);

export function PortfolioProvider({ children }) {
  // Pure static code-controlled provider: zero network delay, zero loading spinners
  return (
    <PortfolioContext.Provider value={portfolioDataDefault}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  return context || portfolioDataDefault;
}

export default PortfolioContext;
