/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const EmployeesContext = createContext(null);

// --- Génération automatique de 1000 employés factices ---
function generateFakeEmployees(count = 1000) {
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];
  const states = ["CA", "NY", "TX", "FL", "WA", "IL", "AZ"];

  const employees = Array.from({ length: count }).map((_, i) => ({
    id: crypto.randomUUID?.() ?? String(Date.now() + i),
    firstName: `John${i}`,
    lastName: `Doe${i}`,
    dateOfBirth: `199${Math.floor(Math.random() * 10)}-0${(Math.random() * 9 + 1).toFixed(0)}-1${Math.floor(Math.random() * 9)}`,
    startDate: `202${Math.floor(Math.random() * 3)}-0${(Math.random() * 9 + 1).toFixed(0)}-2${Math.floor(Math.random() * 8)}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    street: `${Math.floor(Math.random() * 9999)} Main St`,
    city: `City${Math.floor(Math.random() * 100)}`,
    state: states[Math.floor(Math.random() * states.length)],
    zipCode: String(10000 + Math.floor(Math.random() * 90000)),
  }));

  return employees;
}

// --- Provider principal ---
export function EmployeesProvider({ children }) {
  // Initialisation avec 1000 employés mockés (en mémoire uniquement)
  const [employees, setEmployees] = useState(() => generateFakeEmployees(1000));

  // Actions simples pour manipuler les employés
  const addEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const editEmployee = (id, data) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  // Valeur du contexte (mémorisée pour éviter re-renders inutiles)
  const value = useMemo(
    () => ({
      employees,
      addEmployee,
      deleteEmployee,
      editEmployee,
    }),
    [employees]
  );

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
}

EmployeesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useEmployeesContext() {
  const ctx = useContext(EmployeesContext);
  if (ctx === null) throw new Error('useEmployeesContext must be used within EmployeesProvider');
  return ctx;
}
