import {
    LOG_ADMIN_IN, LOGIN_ADMIN,
    FETCH_USERS, FETCH_USER, UPDATE_USER, DELETE_USER,
    FETCH_DEPOSITS, UPDATE_DEPOSIT, DELETE_DEPOSIT,
    FETCH_WITHDRAWS, UPDATE_WITHDRAW, DELETE_WITHDRAW,
    FETCH_TRADES, UPDATE_TRADE, DELETE_TRADE, CREATE_TRADE,
    FETCH_PACKAGES, CREATE_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE,
    FETCH_INVESTMENTS, DELETE_INVESTMENT, UPDATE_INVESTMENT,
    UPDATE_ADMIN, FETCH_DEPOSIT_HANDLERS, DELETE_DEPOSIT_HANDLER, UPDATE_DEPOSIT_HANDLER, CREATE_DEPOSIT_HANDLER
} from "../action/userAppStorage";

const initialState = {
    adminToken: "",
    admin: null,
    color: {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',
    },
    usersList: [],
    depositsList: [],
    withdrawsList: [],
    tradesList: [],
    packagesList: [],
    investmentsList: [],
    depositHandlersList: []
};

export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        // AUTH
        case LOG_ADMIN_IN:
        case LOGIN_ADMIN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token
            };

        case UPDATE_ADMIN:
            return {
                ...state,
                admin: action.payload
            };

        // USERS
        case FETCH_USERS:
        case FETCH_USER:
            return {
                ...state,
                usersList: action.payload
            };

        case UPDATE_USER: {
            const updatedUser = action.payload;
            const newUserList = state.usersList.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            );
            return {
                ...state,
                usersList: newUserList
            };
        }

        case DELETE_USER: {
            const userId = action.payload;
            const newUserList = state.usersList.filter(user => user._id !== userId);
            return {
                ...state,
                usersList: newUserList
            };
        }

        // DEPOSITS
        case FETCH_DEPOSITS:
            return {
                ...state,
                depositsList: action.payload
            };

        case UPDATE_DEPOSIT: {
            const updatedDeposit = action.payload;
            const newDepositList = state.depositsList.map(deposit =>
                deposit._id === updatedDeposit._id ? updatedDeposit : deposit
            );
            return {
                ...state,
                depositsList: newDepositList
            };
        }

        case DELETE_DEPOSIT: {
            const depositId = action.payload;
            const newDepositList = state.depositsList.filter(dep => dep._id !== depositId);
            return {
                ...state,
                depositsList: newDepositList
            };
        }

        // WITHDRAWS
        case FETCH_WITHDRAWS:
            return {
                ...state,
                withdrawsList: action.payload
            };

        case UPDATE_WITHDRAW: {
            const updatedWithdraw = action.payload;
            const newWithdrawList = state.withdrawsList.map(withdraw =>
                withdraw._id === updatedWithdraw._id ? updatedWithdraw : withdraw
            );
            return {
                ...state,
                withdrawsList: newWithdrawList
            };
        }

        case DELETE_WITHDRAW: {
            const withdrawId = action.payload;
            const newWithdrawList = state.withdrawsList.filter(w => w._id !== withdrawId);
            return {
                ...state,
                withdrawsList: newWithdrawList
            };
        }

        // TRADES
        case FETCH_TRADES:
            return {
                ...state,
                tradesList: action.payload
            };

        case CREATE_TRADE:
            return {
                ...state,
                tradesList: [...state.tradesList, action.payload]
            };

        case UPDATE_TRADE: {
            const updatedTrade = action.payload;
            const newTradesList = state.tradesList.map(trade =>
                trade._id === updatedTrade._id ? updatedTrade : trade
            );
            return {
                ...state,
                tradesList: newTradesList
            };
        }

        case DELETE_TRADE: {
            const tradeId = action.payload;
            const newTradesList = state.tradesList.filter(t => t._id !== tradeId);
            return {
                ...state,
                tradesList: newTradesList
            };
        }

        // PACKAGES
        case FETCH_PACKAGES:
            return {
                ...state,
                packagesList: action.payload
            };

        case CREATE_PACKAGE:
            return {
                ...state,
                packagesList: [...state.packagesList, action.payload]
            };

        case UPDATE_PACKAGE: {
            const updatedPackage = action.payload;
            const newPackagesList = state.packagesList.map(pkg =>
                pkg._id === updatedPackage._id ? updatedPackage : pkg
            );
            return {
                ...state,
                packagesList: newPackagesList
            };
        }

        case DELETE_PACKAGE: {
            const packageId = action.payload;
            const newPackagesList = state.packagesList.filter(pkg => pkg._id !== packageId);
            return {
                ...state,
                packagesList: newPackagesList
            };
        }

        // INVESTMENTS
        case FETCH_INVESTMENTS:
            return {
                ...state,
                investmentsList: action.payload
            };

        case UPDATE_INVESTMENT: {
            const updatedInvestment = action.payload;
            const newInvestmentList = state.investmentsList.map(investment =>
                investment._id === updatedInvestment._id ? updatedInvestment : investment
            );
            return {
                ...state,
                investmentsList: newInvestmentList
            };
        }

        case DELETE_INVESTMENT: {
            const investmentId = action.payload;
            const newInvestmentList = state.investmentsList.filter(inv => inv._id !== investmentId);
            return {
                ...state,
                investmentsList: newInvestmentList
            };
        }

        // DEPOSIT HANDLERS
        case FETCH_DEPOSIT_HANDLERS:
            return {
                ...state,
                depositHandlersList: action.payload
            };

        case CREATE_DEPOSIT_HANDLER:
            return {
                ...state,
                depositHandlersList: [...state.depositHandlersList, action.payload]
            };

        case UPDATE_DEPOSIT_HANDLER: {
            const updatedHandler = action.payload;
            const newDepositHandlersList = state.depositHandlersList.map(handler =>
                handler._id === updatedHandler._id ? updatedHandler : handler
            );
            return {
                ...state,
                depositHandlersList: newDepositHandlersList
            };
        }

        case DELETE_DEPOSIT_HANDLER: {
            const handlerId = action.payload;
            const newDepositHandlersList = state.depositHandlersList.filter(handler => handler._id !== handlerId);
            return {
                ...state,
                depositHandlersList: newDepositHandlersList
            };
        }

        default:
            return state;
    }
};







