// État + reducer 100% fonctionnels, testables (IDs stables)

export const initialState = {
  employees: [], // [{ id, firstName, lastName, dateOfBirth, startDate, department, street, city, state, zipCode }]
};

export function employeesReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE': {
      // payload: employee complet avec id unique
      return { ...state, employees: [...state.employees, action.payload] };
    }

    case 'DELETE_EMPLOYEE': {
      // payload: id
      return { ...state, employees: state.employees.filter((e) => e.id !== action.payload) };
    }

    case 'EDIT_EMPLOYEE': {
      // payload: { id, data: Partial<Employee> }
      const { id, data } = action.payload;
      return {
        ...state,
        employees: state.employees.map((e) => (e.id === id ? { ...e, ...data } : e)),
      };
    }

    case 'REPLACE_ALL_EMPLOYEES': {
      // payload: Employee[]
      return { ...state, employees: Array.isArray(action.payload) ? action.payload : [] };
    }

    default:
      return state;
  }
}
