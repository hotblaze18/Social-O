import { SIGN_IN, SIGN_OUT } from "./types";

const defaultUserState = {
    username: '',
    email: '',
    profileImage: '',
    isLoggedIn: false,
}

const userModule = {
    state: () => ({
        user: {
            ...defaultUserState        
        }
    }),
    mutations: {
        [SIGN_IN] (state, payload) {
            state.user = {...state.user, ...payload.user}
        },
        [SIGN_OUT] (state) {
            state.user = defaultUserState;
        }
    },
}

export default userModule;