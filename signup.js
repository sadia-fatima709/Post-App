const supabase_Url='https://jgpkmfeeelofjihiffpu.supabase.co'
const supabase_Key="sb_publishable_EAbUteAn_U5_RRTe9uJovg_gtpzlbKw"

import { supabase } from './signup'
const {createClient} = supabase
let client = createClient(supabase_Url,supabase_Key)
console.log(createClient,client);

const signupForm = document.getElementById('signupForm');
const signupBtn = document.getElementById('signupBtn');
const showLogin = document.getElementById('showLogin');
const messageDiv = document.getElementById('message');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

signupForm.addEventListener('submit', handleSignup);


function showMessage(text, type = 'error') {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

function setError(input, message) {
    input.classList.add('error');
    showMessage(message);
}

function clearError(input) {
    input.classList.remove('error');
}

async function handleSignup(e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
   if (!name || name.length < 2) {
        setError(nameInput, 'Name must be at least 2 characters');
        return;
    }

    if (!email || !password) {
        setError(emailInput || passwordInput, 'Please fill all fields');
        return;
    }
    
    if (password.length < 6) {
        setError(passwordInput, 'Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        setError(confirmPasswordInput, 'Passwords do not match');
        return;
    }
     
    clearError(nameInput);
    clearError(emailInput);
    clearError(passwordInput);
    clearError(confirmPasswordInput);
    
    signupBtn.disabled = true;
    signupBtn.textContent = 'Creating Account...';
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {full_name: name}
            }
        });
        
        if (error) throw error;
        
        showMessage('Login successful! Redirecting...', 'success');
      
                    
        signupForm.reset();
        
    } catch (error) {
        showMessage(error.message);
    } finally {
        signupBtn.disabled = false;
        signupBtn.textContent = 'Create Account';
    }
}

function toggleMode(e) {
    e.preventDefault();
    window.location.href = 'index.html'; 
}