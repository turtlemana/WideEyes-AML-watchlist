# Wide Eyes


<!-- README TOP -->
<img width="350" height="100" align=center src="https://github.com/turtlemana/Riskweather/assets/75458741/0fa4ed57-f508-4d18-adae-86fe0b87e6b3"/>
<br />
<br />

**[Project Link]** : https://wideeyes.co.kr
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<br/>


<!-- ABOUT THE PROJECT -->
## About The Project

![binladen](https://github.com/turtlemana/Riskweather/assets/75458741/ad03334b-b1ad-460e-a33e-4053fc4e4c90)

**"Discover the Power of Knowledge with Our AML Watch List Platform**

In an ever-evolving world where security and transparency are paramount, the importance of a comprehensive Anti-Money Laundering (AML) Watch List cannot be overstated. Our platform uniquely combines the vital necessity of AML vigilance with a user-friendly interface designed for seamless navigation.

Gain easy access to essential data and stay ahead of the curve. Our meticulously curated AML Watch List illuminates the intricate network of international finance, ensuring you are always one step ahead in the battle against illicit financial activities.

With our platform, you're not just interacting with a database, you're harnessing a powerful tool for change. We offer a clear, streamlined user interface to help you navigate the complex web of information effortlessly. Our focus on clean design and intuitive function makes staying informed a breeze, rather than a chore.

Stay informed, stay vigilant, and most importantly, stay ahead with our AML Watch List platform. Experience the seamless integration of essential knowledge and state-of-the-art design now."
<br/>
<br/>
 WideEyes has a purpose which is **"Providing easy-detailed AML information for Financial Companies"**
<br/>

#### Full AML Datasets provided:
* **PEP-CURRENT, PEP-FORMER, PEP-LINKED** 
* **SANCTION_CURRENT, SANCTION-FORMER** 
* **Reputational Risk Exposure, Disqualified Director, Profile of Interest**
* **Regulatory Enforement list** 



<p align="right">(<a href="#riskweather">back to top</a>)</p>



### Built With

#### Frontend
 [![Next][Next.js]][Next-url]
 [![TypeScript][TypeScript]][TypeScript-url]

#### Backend
 [![Rust][Rust]][Rust-url]


<p align="right">(<a href="#riskweather">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### **Important!**

#### You many have no access to our database or api. If you want to contribute for our project, 
#### I would be more than welcome to get a contact from you.

#### Contact -> turtlemana124@gmail.com

<br/>


### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

* rust
  ```sh
  $ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

  ```

### Installation



1. Clone the repo
   ```sh
   git clone https://github.com/turtlemana/WideEyes-AML-watchlist
   ```
2. Frontend: Install NPM packages
   ```sh
   cd frontend
   npm install
   ```
3. Backend: build rust server
   ```sh
   cd backend
   cargo build
   ```
   
4. Create .env file, and get API KEYS
   
   Frontend
   ```js
   SERVER_URL=http://127.0.0.1:7878
   JWT_SECRET=****
   ```
   
   Backend
   ```js
   DATABASE_URL=mysql://*******
   JWT_SUB = *******
   JWT_SECRET = ****** 
   ```

<p align="right">(<a href="#riskweather">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### 1. Search
<br/>
<img src="https://github.com/turtlemana/Riskweather/assets/75458741/f631f959-a031-462b-82d1-f10155ae96f8"/>
<br/>
<br/>

***

<br/>

### 2. Search Result 
<br/>
<img src="https://github.com/turtlemana/Riskweather/assets/75458741/b28c174b-e5c8-4423-ac9b-048bfd7b9292"/>
<br/>
<br/>

***

<br/>


### 3. Profile Detail
<br/>
<img src="https://github.com/turtlemana/Riskweather/assets/75458741/b5f916c9-3ce5-4c2e-b16e-a5bcfa6999fa" />
<br/>
<br/>

***

<br/>


### 4. Associations
<br/>
<img src="https://github.com/turtlemana/Riskweather/assets/75458741/03d1e4df-fac1-4b83-9458-413eb9d74696" />
<br/>
<br/>

***

<br/>


### 5. Evidence
<br/>
<img src="https://github.com/turtlemana/Riskweather/assets/75458741/e35b1897-52b0-4f8d-916a-5a698ccbf0a4" />
<br/>
<br/>


<p align="right">(<a href="#riskweather">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [X] Add Individual Search
- [X] Add Business Search
- [X] Add POI, DD, Regulatory
- [ ] Add AML News
- [ ] Multi-language Support
    - [ ] Korean
    - [ ] Spanish
<br/>

 **Business Search Now Available!**
-----
<img src="https://github.com/turtlemana/Riskweather/assets/75458741/94cbf71b-530a-4446-8f58-8d7e0fe519ab"/>
<img src="https://github.com/turtlemana/Riskweather/assets/75458741/7fe1eca6-6097-4980-85bd-e427a0b8f6d3"/>
<img src="https://github.com/turtlemana/Riskweather/assets/75458741/c4a51387-ff60-47cf-873b-15c134dbf375"/>

<p align="right">(<a href="#riskweather">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make Wide Eyes better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to contact me first! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#riskweather">back to top</a>)</p>






<!-- CONTACT -->
## Contact

email - turtlemana124@gmail.com


<p align="right">(<a href="#riskweather">back to top</a>)</p>

<br/>
<br/>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white
[Next-url]: https://nextjs.org/
[Rust]: https://img.shields.io/badge/Rust-FFA500?style=flat-square&logo=Rust&logoColor=black
[Rust-url]: https://rustlang.org/
[TypeScript]:https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white
[TypeScript-url]:https://typescriptlang.org
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
