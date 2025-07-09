// @ts-nocheck
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    try {
        const { data, error } = await supabase
            .from('posts') // Asume que tienes una tabla 'posts'
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    try {
        const body = await request.json();
        const { title, content, user_id } = body; // Asegúrate de enviar user_id desde Flutter

        if (!title || !content || !user_id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('posts')
            .insert([{ title, content, user_id }]);

        if (error) {
            console.error('Error inserting post:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}