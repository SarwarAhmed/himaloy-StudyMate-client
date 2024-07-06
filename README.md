# StudyMate [Live Preview](https://studymate-d87d7.web.app)
## Website Features

[Server Site Repo](https://github.com/SarwarAhmed/himaloy-StudyMate-server)

## Setup client site
### Step 1: Clone the repository
```
git clone https://github.com/SarwarAhmed/himaloy-StudyMate-client.git
```
or
```
gh repo clone SarwarAhmed/himaloy-StudyMate-client
```
### Step 2
```
cd himaloy-StudyMate-client
```

### Step 3
```
touch .env
```

### Step 4: Setup Firebase configuration `.env`
```
VITE_API_URL=localhot:3000

VITE_APIKEY=apiKey
VITE_AUTHDOMAIN=authDomain
VITE_PROJECTID=projectId
VITE_STORAGEBUCKET=storageBucket
VITE_MESSAGINGSENDERID=messagingSenderId
VITE_APPID=appId

VITE_IMGBB_API_KEY:imgbb api key (https://api.imgbb.com/)
```
### Step 5
```
npm install
npm run dev
```

## Setup Server site
```
git clone https://github.com/SarwarAhmed/himaloy-StudyMate-server.git
```
or
```
gh repo clone SarwarAhmed/himaloy-StudyMate-server
```

```
cd himaloy-StudyMate-server
```
Setup .env
```
DB_USER=MongoDB_username
DB_PASS=MongoDB_password
JWT_SECRET=secret_code (random hex code 64 bit or 32w bit)
```
```
npm install
npm run dev
```

- User-friendly interface: Our website provides a clean and intuitive interface.

- Responsive design: The website is designed to be responsive, ensuring that it looks great and functions well on different devices and screen sizes.

- Interactive elements: We have incorporated interactive elements such as forms, buttons, and sliders to enhance user engagement and interactivity.

- Unique Design: Our website stands out with its unique and visually appealing design, setting it apart from competitors.


- Login / Register: We have implemented a secure login and registration system, allowing users to create accounts and access personalized features.
  - Email and Password: Users can securely log in to their accounts using their email and password credentials.
  - Google Login: Users can also log in to their accounts using their Google credentials, providing a convenient and seamless login experience.





## npm package name which I have used:
React, Vite, AOS, React-Hook-Form, Swiper, Sweetalert and more.
- React: React for building the user interface
- Vite: Vite for the build tool and development server
- AOS: AOS is a JavaScript library that allows you to animate elements on scroll.
- React-Hook-Form: React Hook Form is a library for building forms in React
- Swiper: Swiper is a powerful and flexible JavaScript library for creating responsive and touch-enabled sliders and carousels.
Sweetalert:
- Sweetalert: Sweetalert is a JavaScript library for creating beautiful and customizable alert dialogs.
- And Tailwind CSS, Headless UI, HeroIcons and more.

### Screenshoots
# Home
![StudyMate](./public/studymatesc.png)
