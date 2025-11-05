# React Native Profiles App

## Overview
This is a **3-page React Native app** built with **JavaScript** and **Redux Toolkit**.  
Users can **create, edit, and delete profiles** using a multi-step form.  
All profile data is stored in **Redux** (no backend required).

---

## Features
- Add new profiles using a **3-step form flow**
  - Page 1: Basic Info (Full Name, Email, Age)
  - Page 2: Address Info (City, State, Country)
  - Page 3: Summary & Submit
- View all profiles on the **Home screen**
- Edit or delete any saved profile
- JavaScript interfaces for type safety
- Form validation for required fields
- Navigation using **React Navigation Stack**
- Responsive design and dark-theme styling 

---

## Tech Stack
- **React Native CLI**  
- **JavaScript (JSX)**  
- **Redux Toolkit**  
- **React Navigation Stack**  
- **react-native-responsive-dimensions**  
- **AsyncStorage (optional)** 

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/BohraYogesh/Profile-App.git
   
Navigate to the project folder:

bash
Copy code
cd Profile-App

Install dependencies:

bash
Copy code
npm install
Run on Android:

bash
Copy code
npx react-native run-android
(Make sure an emulator or physical device is connected)

## Page Flow

### Page 1 – Basic Info
Fields: Full Name, Email, Age
Button: Next → Page 2
Data stored in Redux as draft profile

### Page 2 – Address Info
Fields: City, State, Country
Buttons: Back → Page 1, Next → Page 3
Updates draft profile in Redux

### Page 3 – Summary
Displays all collected data
Buttons: Submit → Save to Redux, Edit → Go Back

### Home Screen
Lists all saved profiles
Each item has Edit / Delete
+ Add Profile starts a new entry
If no profiles exist, shows “No Profile Data” message

## Redux Example
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


## Navigation Example

<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Page1" component={BasicInfoScreen} />
  <Stack.Screen name="Page2" component={AddressInfoScreen} />
  <Stack.Screen name="Page3" component={SummaryScreen} />
</Stack.Navigator>

## Form Validation Example

if (!fullName || !email || !age) {
  alert("Please fill all fields");
  return;
}

## Screenshots 
| Basic Info----------------------------- | Address Info----------------------------- | Summary----------------------------- | Home----------------------------- |
| ![Basic Info](./assets/screenshot1.png) | ![Address Info](./assets/screenshot2.png) | ![Summary](./assets/screenshot3.png) | ![Home](./assets/screenshot4.png) |

## Demo Video
Watch the demo video here: [Demo Link]([https://your-demo-link-here](https://drive.google.com/file/d/1w2NU6eiRmieR3_s6rx5VqvMeyUpevTvV/view?usp=sharing ))

## Learnings

Multi-step form implementation in React Native
Global state management with Redux Toolkit
Navigation & conditional rendering
Form validation and draft management
Responsive UI using react-native-responsive-dimensions

## Author
Yogesh Bohra
[yogeshbohra124@gmail.com](mailto:yogeshbohra124@gmail.com)
9352642793
[GitHub](https://github.com/BohraYogesh)
