import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
  draftProfile: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setDraft: (state, action) => {
      state.draftProfile = { ...state.draftProfile, ...action.payload };
    },

    addProfile: (state) => {
      const draft = state.draftProfile;

      if (
        !draft.fullName ||
        !draft.email ||
        !draft.age ||
        !draft.city ||
        !draft.state ||
        !draft.country
      ) {
        return;
      }

      if (draft.id) {
        // Edit existing profile
        state.profiles = state.profiles.map((p) =>
          p.id === draft.id ? { ...p, ...draft } : p
        );
      } else {
        // Add new profile
        const newProfile = {
          id: String(Date.now()),
          fullName: draft.fullName,
          email: draft.email,
          age: draft.age,
          city: draft.city,
          state: draft.state,
          country: draft.country,
        };
        state.profiles.push(newProfile);
      }

      state.draftProfile = {}; // Reset draft
    },

    deleteProfile: (state, action) => {
      state.profiles = state.profiles.filter((p) => p.id !== action.payload);
    },

    editProfile: (state, action) => {
      state.profiles = state.profiles.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },

    setEditDraft: (state, action) => {
      state.draftProfile = action.payload;
    },
  },
});

export const {
  setDraft,
  addProfile,
  deleteProfile,
  editProfile,
  setEditDraft,
} = profileSlice.actions;

export default profileSlice.reducer;
