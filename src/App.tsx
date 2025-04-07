import { useEffect, useState } from 'react';
import './App.css';
import AiChat from './widgets/Aichat';
export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: any;
        };
        ready?: () => void;
      };
    };
  }
}
const tg = window.Telegram?.WebApp;
function App() {
  const [user, setUser] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZWQzZmViNmNkYzNmOTg0ZDQ3MjUzMTNiMGNjMGE2MWZiNDM3ZTczYjU5NGViNmJjYmZmMmMxOGUyMzJjZDhkZGRhNmY2ZWRkNzBjMzAxNjAiLCJpYXQiOjE3NDI4OTg1ODguNDY4MTU2LCJuYmYiOjE3NDI4OTg1ODguNDY4MTU3LCJleHAiOjE3NDU0OTA1ODguNDYxMzExLCJzdWIiOiIxMDQ5MSIsInNjb3BlcyI6W119.RFAws4y26lsrS5249wWiQuvCLNi9kAMv_qI-j1TodmAWeQXQR61eG6Sh3sQ0msfpVYjfmcjMbjWMYtD4Hr4SKiPBgRaBvXXXkFQWJ5E9L7YwAwpeZ2bW7Nv8AWKQozSA6iqr7jo0B1hcL3Ehrk1_e7JXixcg1VpCxPkJYKBVBk1MRe9XmlsMhJyLwg2YQE4gXrh17DHcaFwCCNkyyUjvY6ScC2VfLFwLzdlOWSjKrA-3s0Q3kpl6lfQ_J3A6WgZppMx3sxN2zqTl3rQo4QM6U5UhA14D64nkLjWnU5LoqROFw_Q4T5vLcsyo0VBipGDN31nmnlyPfCCU2hpRKQipwZw-2DXUJvG_OrKjug8GzzJLrYqTMM5QAUtluBuVpNj0DODg2CujGTtb2RUQLh6ADYQNMu4v2vpaFeoqOVaNfA2p_1ywfL2UdZgzlrYsd2KTghmQxo6ZFV4JJh4J9yvaQOueko-2rap4oEi2tDn9oa2DIRCqGM1OImJZFjiwWqu1t-FwTwLGCPNcSI4Vvs7wxyKhWO5dOdOnQJrdyfFWKWo6uHQRZhIStHY6XhXZlFNBhUPfMq8kpZbQVSLUFtYwDr3QHcllPNrot1vmazmgwYyJNArWZ5T86duY7ZPljHvYAU4QGtTu5xgpZwPRYqvZWZjuiFosqDod6nBnFMEud_I'
  const uuid = 'c39887e7-eaaa-48a1-9143-ed44d4d85a8e'

  useEffect(() => {
    if (typeof tg?.ready === 'function') {
      tg.ready();
    }
  }, [])

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram WebApp
    if (tg) {
      // Получаем данные пользователя
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        setUser(userData);
      } else {
        console.warn('Данные пользователя недоступны');
      }
    } 
  }, []);

  useEffect(() => {
    const sendUserDataToBackend = async (userData: any) => {
      try {
        const response = await fetch(`https://api-staging.rct24.ru/telegram/auth/${userData.id}`, {
          method: 'GET',
          headers: {
            'AuthKey': 'MAHhsdf651LLna',
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ id: userData.id }), // Отправляем ID пользователя
        });

        if (!response.ok) {
          throw new Error('Ошибка при отправке данных на сервер');
        }

        const result = await response.json();
        setResult(result); // Сохраняем ответ сервера в состоянии
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        setResult({ error: 'Ошибка при отправке данных' });
      }
    };

    if (user) {
      sendUserDataToBackend(user);
    }
  }, [user]);

  return (
    <>
      <div>
        <AiChat uuid={uuid} token={token}/>
        {result && (
          <div>
            <h2>Ответ от сервера:</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        {user ? (
          <div>
            <p>Добро пожаловать, {user.first_name} {user.last_name}!</p>
            <p>Ваш username: @{user.username}</p>
            <p>Ваш ID: {user.id}</p>
          </div>
        ) : (
          <p>Загрузка данных пользователя...</p>
        )}
      </div>
    </>
  );
}

export default App;
