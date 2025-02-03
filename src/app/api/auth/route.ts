import { NextResponse } from 'next/server';
import axios from 'axios';
import { createSession } from '@/common/lib/session';
import useLocalStorage from '@/common/hooks/useLocalStorage';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request): Promise<NextResponse> {
    const { name, contactEmail, phone, address, user } = await request.json();

    const requestData = {
        name,
        contactEmail,
        phone,
        address,
        user
    };

    try {
        const response = await axios.post(`${baseUrl}/clients/register`, requestData);

        const { accessToken, refreshToken, user } = response.data;

        createSession('accessToken', accessToken);
        createSession('refreshToken', refreshToken);

        const [storedValue, setUser] = useLocalStorage('user', null);
        setUser(user);
        // cookies().set('accessToken', accessToken, { httpOnly: true, secure: true });
        // cookies().set('refreshToken', refreshToken, { httpOnly: true, secure: true });
        // cookies().set('user', JSON.stringify(user), { httpOnly: true, secure: true });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
        } else {
            return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
        }
    }
}
