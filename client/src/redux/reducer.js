import { GET_ANALYSIS,GET_USER_BYID ,GET_TICKETS_ANALISYS, GET_SPECIALITIES, FILTER_ANALYSIS, GET_DOCTORS, GET_PLANS, SELECT_PLAN, GET_FARMACY, DELETE_DOCTOR, DELETE_PATIENT, GET_DOCTOR_BYID, GET_PATIENT_BYID, GET_SELECTED_TICKETS , POST_SELECTED_TICKETS , DELETE_SELECTED_TICKETS, PUT_DOCTOR, GET_USER, PUT_USER, PUT_PATIENT, GET_CONFIRMED_TICKETS , POST_CONFIRMED_TICKETS , DELETE_CONFIRMED_TICKETS, RESET_CONFIRMED_TICKETS, LOGIN, LOGOUT_LOGIN, POST_COMMENT, GET_COMMENTS,SORT_DOCTORS,SORT_DOCTORS_BY_ID,SORT_DOCTORS_BY_SPECIALTY, GET_PATIENTS, SIGNUP , POST_PAYMENT_TYPE } from "./actions";

const initialState = {
    specialities: [],
    analysis: [],
    filteredAnalysis: [],
    doctors: [],
    patients: [],
    plans: [],
    selectedPlan: {},
    farmacies: [],
    doctor: [],
    patient: [],
    selectedTickets: {},
    confirmedTickets: [],
    comment: [],
    allUsers: [],
    user: {},
    userById: {},
    tickets: [],
    ticketsAnalisys: [],
    payment_type: ''
  };
  
 
  const reducer = (state = initialState, action) => {
    switch (action.type) {

      // cases ....
      case LOGIN:
        return {
          ...state,
          user: action.payload
        };

      case SIGNUP:
        return {
          ...state,
          user: action.payload
        };

      case LOGOUT_LOGIN:
        return {
          ...state,
          user: {}
        }

      case GET_SPECIALITIES:
        return{
          ...state,
          specialities: action.payload
        };
      
      case GET_ANALYSIS:
        return{
          ...state,
          analysis: action.payload
        };

      case FILTER_ANALYSIS:
        return{
          ...state,
          filteredAnalysis: action.payload === 'Todos'
                              ? []
                              : state.analysis.filter((item) => item.speciality === action.payload)
        };

      case GET_DOCTORS:
        return{
          ...state,
          doctors: action.payload,
        };

      case GET_PATIENTS:
        return{
          ...state,
          patients: action.payload,
        }

      case GET_PLANS:
          return{
            ...state, 
            plans: action.payload,
          };

      case SELECT_PLAN:
          return{
            ...state, 
            selectedPlan: action.payload,
          };

      case POST_PAYMENT_TYPE:
          return{
            ...state, 
            payment_type: action.payload,
          };

      case GET_FARMACY:
            return{
              ...state, 
              farmacies: action.payload,
            };

      case DELETE_DOCTOR:
              return{
                ...state,
                id: action.payload,
              };
      case DELETE_PATIENT:
                return{
                  ...state,
                  id: action.payload,
                };
      case GET_DOCTOR_BYID:
                return{
                  ...state,
                  doctor: action.payload,
                };


                case GET_USER_BYID:
                  return{
                    ...state,
                    userById: action.payload,
                  };

      case GET_PATIENT_BYID:
        return{
          ...state,
          patient: action.payload,
        };
      
      case GET_SELECTED_TICKETS:
        return{
          ...state,
          selectedTickets: action.payload
        };

      case POST_SELECTED_TICKETS:
        return{
          ...state,
          selectedTickets: action.payload
        };

      case DELETE_SELECTED_TICKETS:
        return{
          ...state,
          selectedTickets: action.payload
        };

      case GET_CONFIRMED_TICKETS:
        return{
          ...state,
          confirmedTickets: action.payload
        };

      case POST_CONFIRMED_TICKETS:
        return{
          ...state,
          confirmedTickets: [...state.confirmedTickets, action.payload]
        };

      case DELETE_CONFIRMED_TICKETS:
        return{
          ...state,
          confirmedTickets: [...state.confirmedTickets.filter((item) => (item.user === action.payload.user && item.id !== action.payload.id))]
        };

      case RESET_CONFIRMED_TICKETS:
      return{
        ...state,
        confirmedTickets: [...state.confirmedTickets.filter((item) => (item.user !== action.payload))]
      };

      case PUT_DOCTOR:
        return{
          ...state,
          doctor: action.payload,
        };
      case GET_USER:
        return{
          ...state,
          allUsers: action.payload,
        };
      
      case PUT_USER:
        return{
          ...state,
          allUsers: action.payload
        };

      case PUT_PATIENT:
        return{
          ...state,
          patient: action.payload,
        };

      case POST_COMMENT:
        return{
          ...state,
          comment: action.payload
        }

      case GET_COMMENTS :
        return{
          ...state,
          comment: action.payload,
        }; 

        case SORT_DOCTORS:
          const order = action.payload;
          const sortedDoctors = [...state.doctors]; // Crear una copia del estado actual de los doctores
          // Realizar la clasificación según el orden
          sortedDoctors.sort((a, b) => {
            const nombreA = a.full_name.toLowerCase();
            const nombreB = b.full_name.toLowerCase();
            if (nombreA < nombreB) {
              return order === "asc" ? -1 : 1;
            }
            if (nombreA > nombreB) {
              return order === "asc" ? 1 : -1;
            }
            return 0;
          });
    
          return {
            ...state,
            doctors: sortedDoctors
          };

          case SORT_DOCTORS_BY_ID: {
            const { payload: order } = action;
      
            // Copiar el array de doctores del estado actual
            const sortedDoctors = [...state.doctors];
      
            // Ordenar los doctores por ID según el orden especificado
            sortedDoctors.sort((a, b) => {
              if (order === "asc") {
                return a.id - b.id;
              } else if (order === "desc") {
                return b.id - a.id;
              }
            });
      
            // Retornar el nuevo estado con los doctores ordenados
            return { ...state, doctors: sortedDoctors };
          };

          case "SORT_DOCTORS_BY_SPECIALTY":
            // Obtener la especialidad ordenada
            const sortedSpecialties = [...state.doctors].sort((a, b) => {
              // Ordenar por la propiedad de especialidad en orden alfabético
              const specialtyA = a.specialities[0].speciality.toUpperCase();
              const specialtyB = b.specialities[0].speciality.toUpperCase();
              if (specialtyA < specialtyB) {
                return action.payload === "asc" ? -1 : 1;
              }
              if (specialtyA > specialtyB) {
                return action.payload === "asc" ? 1 : -1;
              }
              return 0;
            });

            return {
              ...state,
              doctors: sortedSpecialties,
            };


            case "GET_TICKETS":

            return{
              ...state,
              tickets: action.payload,
            }; 

      case GET_TICKETS_ANALISYS:
        return {
          ...state,
        ticketsAnalisys: action.payload,
        }
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default reducer;