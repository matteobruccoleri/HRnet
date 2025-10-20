import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { employeesReducer, initialState } from './employeesReducer';

// --- Configuration de persistance ---
const STORAGE_KEY = 'employees';
const STORAGE_VERSION = 1;

// --- Contexts séparés ---
const EmployeesStateContext = createContext(null);
const EmployeesDispatchContext = createContext(null);

// --- Fonctions utilitaires ---
function safeParse(json) {
  try { return JSON.parse(json); } catch { return null; }
}

function validateEmployees(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((e) => e && typeof e === 'object' && typeof e.id === 'string');
}

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

// --- Initialisation depuis localStorage (ou génération par défaut) ---
function initFromStorage() {
  const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
  const parsed = raw ? safeParse(raw) : null;

  const ok = parsed && typeof parsed === 'object' && 'data' in parsed
    ? validateEmployees(parsed.data)
    : validateEmployees(parsed);

  // S'il n'y a aucun employé enregistré → on crée 1000 employés de test
  const employees = ok.length > 0 ? ok : generateFakeEmployees(1000);

  return { ...initialState, employees };
}

// --- Provider principal ---
export function EmployeesProvider({ children }) {
  const [state, dispatch] = useReducer(employeesReducer, initialState, initFromStorage);

  // Persistance locale
  useEffect(() => {
    try {
      const payload = { version: STORAGE_VERSION, data: state.employees };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore les erreurs JSON ou quota
    }
  }, [state.employees]);

  // Synchronisation multi-onglets
  useEffect(() => {
    function onStorage(e) {
      if (e.key !== STORAGE_KEY) return;
      const parsed = e.newValue ? safeParse(e.newValue) : null;
      const next = parsed && typeof parsed === 'object' && 'data' in parsed
        ? validateEmployees(parsed.data)
        : validateEmployees(parsed);

      const sameLength = next.length === state.employees.length;
      const sameIds =
        sameLength &&
        next.every((n, i) => n.id === state.employees[i]?.id);

      if (!sameIds) {
        dispatch({ type: 'REPLACE_ALL_EMPLOYEES', payload: next });
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.employees]);

  const stateValue = useMemo(() => state, [state]);

  return (
    <EmployeesStateContext.Provider value={stateValue}>
      <EmployeesDispatchContext.Provider value={dispatch}>
        {children}
      </EmployeesDispatchContext.Provider>
    </EmployeesStateContext.Provider>
  );
}

// --- Hooks ergonomiques ---
export function useEmployeesState() {
  const ctx = useContext(EmployeesStateContext);
  if (ctx === null) throw new Error('useEmployeesState must be used within EmployeesProvider');
  return ctx;
}

export function useEmployeesDispatch() {
  const ctx = useContext(EmployeesDispatchContext);
  if (ctx === null) throw new Error('useEmployeesDispatch must be used within EmployeesProvider');
  return ctx;
}

export function useEmployees() {
  return useEmployeesState().employees;
}
