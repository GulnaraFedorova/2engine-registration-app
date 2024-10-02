import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry, updateEntry, deleteEntry } from '../../redux/userSlice';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const entries = useSelector((state) => state.user.entries);
    const [editingId, setEditingId] = useState(null);

    // Загрузка данных пользователя из sessionStorage
    useEffect(() => {
        const storedData = sessionStorage.getItem('userData');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }

        // Загрузка записей из localStorage
        const storedEntries = localStorage.getItem('entries');
        if (storedEntries) {
            const parsedEntries = JSON.parse(storedEntries);
            parsedEntries.forEach((entry) => {
                dispatch(addEntry(entry)); // Добавляем записи в Redux store
            });
        }
    }, [dispatch]);

    // Сохранение записей в localStorage при их изменении
    useEffect(() => {
        localStorage.setItem('entries', JSON.stringify(entries));
    }, [entries]);

    const handleAddEntry = () => {
        const newEntry = {
            id: Date.now(),
            title,
            description,
        };
        dispatch(addEntry(newEntry));
        setTitle('');
        setDescription('');
    };

    const handleEditEntry = (entry) => {
        setTitle(entry.title);
        setDescription(entry.description);
        setEditingId(entry.id);
    };

    const handleUpdateEntry = () => {
        dispatch(updateEntry({ id: editingId, title, description }));
        setTitle('');
        setDescription('');
        setEditingId(null);
    };

    const handleDeleteEntry = (id) => {
        dispatch(deleteEntry(id));
    };

    return (
        <div className="profile">
            <div className="profile__info">
                <h1>Личный кабинет</h1>
                {userData ? (
                    <div>
                        <h2>Данные пользователя:</h2>
                        <p>Имя: {userData?.username}</p>
                        <p>Email: {userData?.email}</p>
                    </div>
                ) : (
                    <p className="error-message">Пользовательские данные не найдены. Пожалуйста, сначала зарегистрируйтесь</p>
                )}
            </div>
            <div className="profile__text">
                <div className="profile__entry">
                    <input
                        type="text"
                        placeholder="Название записи"
                        className="profile__input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Описание записи"
                        className="profile__input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        cols={50}
                        style={{ resize: 'none' }}
                    ></textarea>

                    {editingId ? (
                        <button onClick={handleUpdateEntry}>Редактировать запись</button>
                    ) : (
                        <button onClick={handleAddEntry}>Добавить запись</button>
                    )}
                </div>

                <div className="profile__form">
                    <h2>Записи пользователя:</h2>
                    <div className="profile__list">
                        {entries.length > 0 ? (
                            entries.map((entry) => (
                                <div className="profile__card"
                                    key={entry.id}>
                                    <h3>{entry.title}</h3>
                                    <p>{entry.description}</p>
                                    <div className="profile__button">
                                        <button onClick={() => handleEditEntry(entry)}>Редактировать</button>
                                        <button onClick={() => handleDeleteEntry(entry.id)}>Удалить запись</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Нет записей для отображения</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
