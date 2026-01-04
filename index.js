
const supabase_Url='https://jgpkmfeeelofjihiffpu.supabase.co'
const supabase_Key="sb_publishable_EAbUteAn_U5_RRTe9uJovg_gtpzlbKw"




import{ supabase } from './supabaseClient'

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const showSignup = document.getElementById('showSignup');
const messageDiv = document.getElementById('message');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

let isLoginMode = true;

loginForm.addEventListener('submit', handleAuth);


function showMessage(text, type = 'error') {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

async function handleAuth(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
        showMessage('Please fill all fields');
        return;
    }
    
    loginBtn.disabled = true;
    loginBtn.textContent = 'processing...';
    
    try {
            const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
})


            if (error) throw error;
            
            showMessage('Check your email to confirm account!', 'success');
           
            setTimeout(() => {
                window.location.href = 'Signup.html'; // Create this next
            }, 1500);
        }  catch (error) {
        showMessage(error.message);
        } finally {
          loginBtn.disabled = false;
         loginBtn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';
             }       
            }