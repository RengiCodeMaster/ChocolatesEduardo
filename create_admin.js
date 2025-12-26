
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mozasrkwzbukmxdzonxe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vemFzcmt3emJ1a214ZHpvbnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MjAxMjAsImV4cCI6MjA4MjI5NjEyMH0.RerrTA2Tz9QXsD-IH8mt67UbR6dCQuuQUNNiP_f_lzo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
    const email = 'juan99082005@gmail.com';
    const password = 'DonEduarteAdmin2025';

    console.log(`Creating user ${email}...`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Error creating user:', error.message);
    } else {
        console.log('User created successfully:', data.user?.id);
    }
}

createAdmin();
