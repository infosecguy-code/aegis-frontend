import { useForm } from 'react-hook-form';
import { login } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
    const setAuth = useAuthStore((s) => s.setAuth);
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const res = await login(data.email, data.password);
            setAuth(res.user, res.token, res.must_change_password);
            navigate(res.must_change_password ? '/change-password' : '/dashboard');
        } catch (err) {
            alert('Login gagal');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Email" {...register('email')} />
            <input placeholder="Password" type="password" {...register('password')} />
            <button type="submit">Login</button>
        </form>
    );
}
