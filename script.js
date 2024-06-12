// Прокручування до потрібного контейнера при натисканні на кнопки меню
document.querySelectorAll('.menu-bar a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Дані новин у форматі JSON
const newsData = [
    {
        "title": "Google’s broken link to the web",
        "image": "https://www.platformer.news/content/images/size/w2000/2024/05/_ETB2653.jpg",
        "text": "When Sundar Pichai took the stage at Google I/O on Tuesday morning, he said that the rise of generative artificial intelligence would provide new opportunities: for creators, developers, startups, and for everyone. Two hours later, after the sun rising over the Shoreline Amphitheatre sent audience members in the cheap seats scurrying to vanishingly few spots in the shade, the opportunities on offer did not seem entirely clear. Aside from the opening act, the TikTok DJ Marc Rebillet, no creator, developer, or startup took the stage. Instead, a handful of celebrities appeared in brief videos, with Wyclef Jean enthusing over AI music tools and Donald Glover experimenting with AI filmmaking. To the extent there was an obvious opportunity, it was to use Google’s products, covering a bewildering array of tasks, from homework to shopping to moving to celebrating an anniversary."
    },
    {
        "title": "OpenAI's ChatGPT facing widespread outage across web and smartphone apps",
        "image": "https://bsmedia.business-standard.com/_media/bs/img/article/2023-09/21/full/1695261098-3927.jpg?im=FitAndFill=(826,465)",
        "text": "OpenAI’s AI chatbot ChatGPT is reportedly facing global outages. According to news reports, many ChatGPT users have reported that they are facing trouble in generating responses from the AI chatbot. ChatGPT is reportedly taking in prompts but is unable to respond to queries. Additionally, some users are even facing issues where the page becomes unresponsive after prompting the chat bot. According to Downdetector, a platform outage monitoring platform, reports of users facing issues with OpenAI have spiked up since 1PM on June 4. As per the platform, 81 per cent of reported issues are related to ChatGPT while 14 per cent users are facing trouble with the OpenAI website and only five per cent with the smartphone app."
    },
    {
        "title": "Google’s New Search Engine Is Bad News for the Web Economy",
        "image": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iER_V1sUtXhA/v1/1400x933.jpg",
        "text": "For more than two decades, a simple handshake has shaped how people find information online. It works like this: Websites allow Google’s web crawler to index their content so it can appear in search results. The websites get traffic, and Google gets to be Google — one of the most valuable companies on Earth, on account of organizing all this information, putting ads alongside it and building lucrative tools on top of it all. But what happens when one half of that bargain disappears? That was on my mind Tuesday when Google unveiled “AI Overviews” at its annual developers’ conference. It’s an unassuming name for a hugely significant update to its search engine, one that — if it works as intended — could significantly reduce the amount of traffic that websites receive. AI Overviews builds on something Google has been doing for a while but takes it significantly further. Many will be familiar with what happens when they search for a celebrity’s name. Before the “organic” list of search results, the user is presented with a fact panel that pulls in information from sources — typically Wikipedia — to provide basic information without needing to visit the website containing the source material. Soon, AI Overviews will step in for a far broader array of uses. On stage, head of Google Search Liz Reid described how information on movies, travel, books “and more” will be served. A video demo showed a person asking Google “Why does my candle burn unevenly?” and is quickly shown a paragraph’s long explanation and solution. No more clicks needed."
    },
];

// Функція для відображення новин
function displayNews() {
    const newsList = document.getElementById('news-list');

    // Очистити список новин перед додаванням нових
    newsList.innerHTML = '';

    // Додати кожну новину до списку
    newsData.forEach((news, index) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const image = document.createElement('img');
        image.src = news.image;
        image.alt = news.title;
        newsItem.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = news.title;
        newsItem.appendChild(title);

        const text = document.createElement('p');
        text.textContent = news.text.substring(0, 150) + '...'; // Початково обмежуємо текст до певної довжини
        newsItem.appendChild(text);

        // Додати кнопку "Read more"
        const readMore = document.createElement('button');
        readMore.textContent = 'Read more';
        readMore.classList.add('read-more');
        readMore.addEventListener('click', () => {
            text.textContent = news.text; // Показати весь текст
            readMore.style.display = 'none'; // Приховати кнопку "Read more"
            readLess.style.display = 'inline-block'; // Показати кнопку "Read less"
        });
        newsItem.appendChild(readMore);

        // Додати кнопку "Read less"
        const readLess = document.createElement('button');
        readLess.textContent = 'Read less';
        readLess.classList.add('read-less');
        readLess.style.display = 'none'; // Початково прихована
        readLess.addEventListener('click', () => {
            text.textContent = news.text.substring(0, 150) + '...'; // Знову обмежити текст
            readMore.style.display = 'inline-block'; // Показати кнопку "Read more"
            readLess.style.display = 'none'; // Приховати кнопку "Read less"
        });
        newsItem.appendChild(readLess);

        newsList.appendChild(newsItem);
    });
}

// Виклик функції для відображення новин при завантаженні сторінки
document.addEventListener('DOMContentLoaded', displayNews);

document.addEventListener('DOMContentLoaded', function () {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginBtn = document.querySelector('.login');
    const closeBtns = document.querySelectorAll('.close');
    const showRegisterLink = document.getElementById('showRegister');

    // Ініціалізація модальних вікон
    loginBtn.onclick = function() {
        loginModal.style.display = 'block';
    }

    closeBtns.forEach(btn => {
        btn.onclick = function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        } else if (event.target == registerModal) {
            registerModal.style.display = 'none';
        }
    }

    showRegisterLink.onclick = function(event) {
        event.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    }

    // Функція для зберігання користувачів у локальному сховищі
    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Функція для перевірки автентифікації користувача
    function authenticateUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.username === username && user.password === password);
    }

    // Функція для оновлення кнопки "Login"
    function updateLoginButton(username) {
        if (username.length > 6) {
            username = username.substring(0, 5) + '...';
        }
        loginBtn.textContent = username;
        loginBtn.style.backgroundColor = '#4CAF50';
        loginBtn.style.border = '1px solid #4CAF50';
    }
    
// Перевірка перед відправкою форми контактів
document.getElementById('contactForm').onsubmit = function(event) {
    event.preventDefault(); // Зупинити стандартну поведінку форми
    const currentUser = document.querySelector('.login').textContent;
    const contactName = document.getElementById('contactName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const contactMessage = document.getElementById('contactMessage').value;

    if (currentUser !== 'Login') {
        // Перевірка, чи всі поля заповнені
        if (contactName && contactEmail && contactMessage) {
            showPopup('Message sent successfully!');
            // Очищення форми після успішної відправки
            document.getElementById('contactForm').reset();
            // Додатково можна додати логіку для надсилання даних форми на сервер тут
        } else {
            showPopup('Please fill out all fields.');
        }
    } else {
        showPopup('You need to log in to send a message.');
    }
};

// Функція для показу спливаючого повідомлення
function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = 1;
        setTimeout(() => {
            popup.style.opacity = 0;
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);
        }, 2000);
    }, 10);
}

// Ініціалізація спливаючого елемента (додаємо в HTML)
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.padding = '15px 30px';
    popup.style.backgroundColor = '#333';
    popup.style.color = '#fff';
    popup.style.borderRadius = '4px';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s';
    popup.style.zIndex = '1000';
    document.body.appendChild(popup);
});



    // Реєстрація користувача
    document.getElementById('registerForm').onsubmit = function(event) {
        event.preventDefault();
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        saveUser({ username, password });
        showPopup('Registered successfully!');
        registerModal.style.display = 'none';
        updateLoginButton(username);
    }

    // Авторизація користувача
    document.getElementById('loginForm').onsubmit = function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const user = authenticateUser(username, password);
        if (user) {
            showPopup('Logged in successfully!');
            loginModal.style.display = 'none';
            updateLoginButton(username);
        } else {
            showPopup('Invalid username or password');
        }
    }
});

// Перевірка перед відправкою форми контактів
document.getElementById('contactForm').onsubmit = function(event) {
    event.preventDefault();
    const currentUser = document.querySelector('.login').textContent;
    if (currentUser !== 'Login') {
        showPopup('Message sent successfully!');
    } else {
        showPopup('You need to log in to send a message.');
    }
};

// Отримуємо елементи модальних вікон
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// Отримуємо кнопку "Login" з меню
const loginButton = document.querySelector('.login');

// Отримуємо елементи для закриття модальних вікон
const closeLogin = document.querySelector('#loginModal .close');
const closeRegister = document.querySelector('#registerModal .close');

// Приховуємо модальні вікна при завантаженні сторінки
loginModal.style.display = 'none';
registerModal.style.display = 'none';

// Відкриття модального вікна "Login" при кліку на кнопку "Login" в меню
loginButton.addEventListener('click', function() {
    loginModal.style.display = 'block';
});

// Закриття модальних вікон при кліці на хрестик (close)
closeLogin.addEventListener('click', function() {
    loginModal.style.display = 'none';
});

closeRegister.addEventListener('click', function() {
    registerModal.style.display = 'none';
});

// Відображення модального вікна "Register" при кліку на посилання "Register here"
document.getElementById('showRegister').addEventListener('click', function(event) {
    event.preventDefault();
    registerModal.style.display = 'block';
});
