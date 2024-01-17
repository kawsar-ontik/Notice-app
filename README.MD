# Ontik Notice Application

_Document all the stpes that im following to build this application_

- After creating the project i've installed and configured `nativewind` for styles,

- Installed React `navigation` packages for navigations

- Not able to set gitlab because not getting the otp, after talking with moshiur vai decide to go with github than had another issue using new github account. to resolve this issue setup github ssh things

- Using `formik` and `yup` for form and input validations

- Using `expo-secure-store` package for encrypt and securely store login data

- Created use auth to get loggedin user info | using this hook in app.tsx to decide which screen should display

- Displaying a modal asking their preference

- One signal setup done |
- Follow this link: https://documentation.onesignal.com/docs/react-native-expo-sdk-setup and go over each step properly and make sure these command works properly

```shell
$ npx expo prebuild

# Build your native iOS project
$ npx expo run:ios

# Build your native Android project
$ npx expo run:android
```

- Resolve the android build issue using Java11 and gradle-7.5 | also might have to create `local.properties` or edit this file
