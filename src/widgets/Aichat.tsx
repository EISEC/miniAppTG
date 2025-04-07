import { useEffect } from "react";

declare global {
    interface Window {
        JustWidgetRawParams?: {
            uuid: string;
            token: string;
        };
    }
}

interface AiChatProps {
    uuid: string;
    token: string;
}

const AiChat = ({ uuid, token }: AiChatProps) => {
    useEffect(() => {
        if (uuid) {
            const script = document.createElement('script');
            script.src =
                'https://bot.jaicp.com/chatwidget/JnfINUIF:feb6b75a49a015af590f0d247ac51d6e22532dfb/justwidget.js?force=true';
            script.async = true;
            document.body.appendChild(script);
            window.JustWidgetRawParams = {
                uuid: uuid,
                token: token
            };
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [uuid]);

    return null; // Этот компонент не рендерит UI, а просто добавляет скрипт
};

export default AiChat;
