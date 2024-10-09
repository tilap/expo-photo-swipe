# Expo photo swipe

A simple Expojs app to sort your photo library on iOS/android

- list your picture by month and year, with filter options
- keep or delete photo by swiping (Tinder like)
- confirmation screen before deleting

## Tech notes

This is a project done in a self week-end hackaton for me, myself and I. It is based on one of my template [shared here](https://github.com/tilap/expo-minimal-boilerplate).

Swiping is only achieve with react-native components. I had to optimize the swiper to avoid to much re-renders and keep it smooth even with 1.000 photos.

## Screenshots

<a href="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/list.PNG?raw=true"><img src="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/list.PNG?raw=true" alt="Monthly presentation" width="120" height="240"></a>
<a href="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/options.PNG?raw=true"><img src="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/options.PNG?raw=true" alt="Options" width="120" height="240"></a>
<a href="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/keep.PNG?raw=true"><img src="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/keep.PNG?raw=true" alt="Monthly presentation" width="120" height="240"></a>
<a href="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/drop.PNG?raw=true"><img src="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/drop.PNG?raw=true" alt="Monthly presentation" width="120" height="240"></a>
<a href="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/confirm.PNG?raw=true"><img src="https://github.com/tilap/expo-photo-swipe/blob/main/__docs__/confirm.PNG?raw=true" alt="Monthly presentation" width="120" height="240"></a>

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc` or `package.json`)
- Yarn (version specified in `package.json`)

### Installation

Clone the repository:

```sh
git clone https://github.com/tilap/expo-photo-swipe.git
```

Install dependencies:

```sh
yarn install
```

Start the development server:

```sh
yarn start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
