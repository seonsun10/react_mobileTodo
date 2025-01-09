const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [clientId, setClientId] = useState("");
    const [userName, setUserName] = useState("");
    const webSocket = useRef(null);

    useEffect(() => {
        webSocket.current = new WebSocket('ws://localhost:5174');
        
        webSocket.current.onopen = () => {
            console.log('WebSocket 연결!');
        };

        webSocket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [...prev, { sender: data.sender, text: data.text }]);
        };

        webSocket.current.onerror = (error) => {
            console.log(error);
        };

        webSocket.current.onclose = (event) => {
            console.log(event);
        };

        return () => {
            webSocket.current?.close();
        };
    }, []);

    const handleChangeName=(e)=>{
        setUserName(e.target.value);
    }

    const sendMessage = () => {
        if (webSocket.current.readyState === WebSocket.OPEN && inputMessage) {
            const message = JSON.stringify({ sender: userName, text: inputMessage });
            webSocket.current.send(message);
            setInputMessage("");
        }
    };

    return (
        <div>
            {!clientId && (
                <div>
                    <input
                        type="text"
                        value={userName}
                        onChange={handleChangeName}
                        placeholder="이름을 입력하세요"
                    />
                    <button onClick={() => userName && setClientId(userName)}>입력</button>
                </div>
            )}
            {clientId && (
                <div>
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="메시지를 입력하세요"
                    />
                    <button onClick={sendMessage}>전송</button>
                    
                    <div>
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.sender}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );