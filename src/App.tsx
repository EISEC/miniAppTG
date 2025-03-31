import { useEffect, useState } from 'react';
import './App.css';
export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
          };
        };
      };
    };
  }
}

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram WebApp
    const tg = window.Telegram?.WebApp;
    if (tg) {
      // Получаем данные пользователя
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        setUser(userData);
        console.log('Данные пользователя:', userData);
      } else {
        console.warn('Данные пользователя недоступны');
      }
    } else {
      console.error('Telegram WebApp не инициализирован');
    }
  }, []);

  useEffect(() => {
    const sendUserDataToBackend = async (userData: any) => {
      try {
        const response = await fetch('https://api-staging.rct24.ru/telegram/auth/', {
          method: 'POST',
          headers: {
            'AuthKey': 'MAHhsdf651LLna',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData.id),
        });

        if (!response.ok) {
          throw new Error('Ошибка при отправке данных на сервер');
        }

        const result = await response.json();
        console.log('Ответ от сервера:', result);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    if (user) {
      sendUserDataToBackend(user);
    }
  }, [user]);

  return (
    <>
      <div>
        <h1>Авторизация через Telegram</h1>
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
