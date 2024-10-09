# Expo photo swipe

A simple Expojs app to sort your photo library on iOS/android

- list your picture by month and year, with filter options
- keep or delete photo by swiping (Tinder like)
- confirmation screen before deleting

## Tech notes

This is a project done in a self week-end hackaton for me, myself and I. It is based on one of my template [shared here](https://github.com/tilap/expo-minimal-boilerplate).

Swiping is only achieve with react-native components. I had to optimize the swiper to avoid to much re-renders and keep it smooth even with 1.000 photos.

## Screenshots

<a href="./__docs__/list.png"><img src="./__docs__/list.png" alt="Monthly presentation" width="120" height="240"></a>
<a href="./__docs__/options.png"><img src="./__docs__/options.png" alt="Options" width="120" height="240"></a>
<a href="./__docs__/keep.png"><img src="./__docs__/keep.png" alt="Monthly presentation" width="120" height="240"></a>
<a href="./__docs__/drop.png"><img src="./__docs__/drop.png" alt="Monthly presentation" width="120" height="240"></a>
<a href="./__docs__/confirm.png"><img src="./__docs__/confirm.png" alt="Monthly presentation" width="120" height="240"></a>

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
