import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
//dimport { setUserData } from '../../redux/userSlice';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = (data) => {
        console.log(data);
        // Сохранение данных пользователя в Redux store
        sessionStorage.setItem('userData', JSON.stringify(data));
        // Перенаправление на страницу профиля
        router.push('/profile');
    };

    return (
        <div className="register">
            <form onSubmit={handleSubmit(onSubmit)} className="register__form">
                <h1>Регистрация</h1>
                {/* Поле для имени пользователя */}
                <input 
                    {...register('username', { required: true })}
                    className="register__input"
                    placeholder="Имя пользователя" />
                {errors.username && <p className="error-message">Это поле обязательно к заполнению</p>}

                {/* Поле для Email */}
                <input
                    {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    })}
                    className="register__input"
                    placeholder="Email"
                />
                {errors.email && <p className="error-message">Пожалуйста, введите действительный адрес электронной почты</p>}

                {/* Поле для пароля */}
                <input
                    type="password"
                    {...register('password', { required: true, minLength: 6 })}
                    className="register__input"
                    placeholder="Пароль"
                />
                {errors.password && <p className="error-message">Пароль должен содержать минимум 6 символов</p>}

                {/* Кнопка для отправки формы */}
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
}
