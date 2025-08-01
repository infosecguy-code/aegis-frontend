import { useForm } from 'react-hook-form';
import { changePassword } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordPage() {
    const { register, handleSubmit, watch } = useForm();
    const setAuth = useAuthStore((s) => s.setAuth);
    const { user, token } = useAuthStore();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            await changePassword(data.oldPassword, data.newPassword);
            setAuth(user!, token!, false); // password changed
            navigate('/dashboard');
        } catch (err) {
            alert('Gagal mengganti password');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Password Lama" type="password" {...register('oldPassword')} />
            <input placeholder="Password Baru" type="password" {...register('newPassword')} />
            <input placeholder="Konfirmasi Password" type="password" {...register('confirmPassword')} />
            <button type="submit">Ganti Password</button>
        </form>
    );
}
