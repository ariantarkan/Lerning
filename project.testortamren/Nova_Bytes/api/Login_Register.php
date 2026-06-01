<?php
session_start();
$num1 = rand(1, 9);
$num2 = rand(1, 9);
$_SESSION['captcha'] = $num1 + $num2;
?>

<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Neon Auth – Persian Pro</title>
<link href="../fonts/Vazir-Bold.woff2" rel="stylesheet">

<style>
*{box-sizing:border-box;font-family:'Vazirmatn',sans-serif;margin:0;padding:0;}
body{
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:radial-gradient(circle at 20% 20%, #0f0f2a, #05060d);
  overflow:hidden;
  color:#fff;
  position:relative;
}

.random-code{
  position:absolute;
  font-size:12px;
  color:rgba(0,255,255,0.15); 
  pointer-events:none;
  user-select:none;
  animation:fadeOut 2s forwards;
}
@keyframes fadeOut{
  0%{opacity:1; transform:translateY(0);}
  100%{opacity:0; transform:translateY(-20px);}
}

.auth-box{
  position:relative;
  width:440px;
  min-height:540px;
  border-radius:30px;
  background:#0b0f1f; 
  overflow:hidden;
  z-index:1;
  box-shadow: 0 0 20px rgba(0,229,255,0.25);
  display: flex;
  flex-direction: column;
}

.neon-rail{
  pointer-events:none;
  position:absolute;
  inset:-2px;
  border-radius:32px;
  padding:2px;
  opacity:1;
  animation:railMove 3s linear infinite;
}

@keyframes railMove{
  from{transform:rotate(0deg)}
  to{transform:rotate(360deg)}
}

.form{
  padding:40px 28px;
  background:rgba(11,15,31,0.95);
  border-radius:20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form h2{
  text-align:center;
  margin-bottom:10px;
  letter-spacing:1px;
}

.mode-switch{
  text-align:center;
  font-size:13px;
  margin-bottom:18px;
  color:rgba(255,255,255,.55);
  cursor:pointer;
  transition:.35s;
}
.mode-switch:hover{color:#00e5ff}

.field{position:relative;margin:14px 0}
.field input{
  width:100%;
  padding:13px 14px;
  background:rgba(10,15,30,.85);
  border:1.2px solid rgba(120,200,255,.28);
  border-radius:14px;
  color:#fff;
  font-size:14px;
  outline:none;
  transition:.35s;
}
.field label{
  position:absolute;
  right:14px;top:50%;
  transform:translateY(-50%);
  font-size:13px;
  color:rgba(255,255,255,.55);
  pointer-events:none;
  transition:.35s;
}
.field input:focus+label,
.field input:not(:placeholder-shown)+label{
  top:-7px;
  font-size:11px;
  background:#0b0f1f;
  padding:0 6px;
  color:#7ee7ff;
}
.field input:focus{
  border-color:#00e5ff;
}

.submit{
  width:100%;
  padding:14px;
  margin-top:18px;
  border:none;
  border-radius:16px;
  background:linear-gradient(135deg,#00e5ff,#9c27ff);
  font-weight:700;
  font-size:16px;
  cursor:pointer;
  color:#000;
  transition:.4s;
  box-shadow:0 0 25px #00e5ff;
}
.submit:hover{
  transform:translateY(-2px) scale(1.05);
  box-shadow:0 0 50px #00e5ff, 0 0 20px #ff00ff;
}

.form-wrap{
  position:relative;
  flex: 1;
  display: flex;
}

.form-wrap::before{
  content:"";
  position:absolute;
  inset:-2px;
  border-radius:22px;
  pointer-events:none;
  background:
    conic-gradient(
      from 0deg,
      transparent 0deg 340deg,
      #ffd700 360deg
    );
  animation:spin 6s linear infinite;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite:exclude;
  -webkit-mask-composite:xor;
  padding:2px;
  filter:none;
  opacity:.9;
}

.forgot-password-wrap{
  text-align:center;
  margin-top:10px;
}

.forgot-password{
  font-weight:700;
  font-size:13px;
  color:rgba(255,255,255,0.55);
  cursor:pointer;
  transition:.4s;
  text-shadow: 0 0 2px #00e5ff, 0 0 4px #00e5ff;
}
.forgot-password:hover{
  color:#00e5ff;
  text-shadow: 0 0 8px #00e5ff, 0 0 15px #ff00ff, 0 0 20px #00e5ff;
  transform:scale(1.05);
}


@media screen and (max-width: 480px) {
    .auth-box {
        width: 90%; /* عرض بر اساس درصد تا از صفحه بیرون نزند */
        min-height: auto;
    }
    .form {
        padding: 30px 20px;
    }
    .form h2 {
        font-size: 1.5rem;
    }
    .mode-switch {
        font-size: 1rem;
    }
    .field label {
        font-size: 1rem;
    }
    .submit {
        font-size: 1.2rem;
    }
    .field input {
        height: 50px;
        font-size: 1rem;
    }
}

</style>
</head>

<body>

<div class="auth-box">
  <div class="form-wrap">
    <form class="form" action="auth.php" method="POST">
      <input type="hidden" name="action" id="formAction" value="register">
      <h2 id="formTitle">ثبت نام</h2>
      <div class="mode-switch" id="switchMode">ورود به سیستم</div>

      <div class="field" id="nameField">
        <input type="text" name="username" placeholder=" ">
        <label>نام کاربری</label>
      </div>

      <div class="field">
        <input type="text" name="email_or_phone" placeholder=" " required>
        <label>ایمیل یا شماره تلفن</label>
      </div>

      <div class="field">
        <input type="password" name="password" placeholder=" " required minlength="8">
        <label>رمز عبور (حداقل 8 حرف)</label>
      </div>

      <div class="field">
        <input type="number" name="captcha" placeholder=" " required>
        <label>حاصل $$<?php echo $num1 . ' + ' . $num2; ?>$$ ؟</label>
      </div>

      <button type="submit" class="submit" id="submitBtn">ثبت نام</button>
    </form>
  </div>
</div>

<script>
const switchMode = document.getElementById("switchMode");
const formTitle = document.getElementById("formTitle");
const nameField = document.getElementById("nameField");
const submitBtn = document.getElementById("submitBtn");
const formAction = document.getElementById("formAction");

let loginMode = false;

switchMode.onclick = (e) => {
    e.stopPropagation();
    loginMode = !loginMode;

    nameField.style.display = loginMode ? "none" : "block";
    if(loginMode) nameField.querySelector('input').removeAttribute('required');
    else nameField.querySelector('input').setAttribute('required', 'true');

    formTitle.innerText = loginMode ? "ورود به سیستم" : "ثبت نام";
    submitBtn.innerText = loginMode ? "ورود" : "ثبت نام";
    switchMode.innerText = loginMode ? "ساخت حساب جدید" : "ورود به سیستم";
    formAction.value = loginMode ? "login" : "register";
};

const inputs = document.querySelectorAll('.field input');
const body = document.body;

function createRandomCode(){
  const code = document.createElement('div');
  code.className = 'random-code';
  const chars = 'HTML<>/{}0123456789';
  code.innerText = Array.from({length:5}, ()=>chars[Math.floor(Math.random()*chars.length)]).join('');
  code.style.top = Math.random()*window.innerHeight + 'px';
  code.style.left = Math.random()*window.innerWidth + 'px';
  code.style.fontSize = (10 + Math.random()*8) + 'px';
  body.appendChild(code);
  setTimeout(()=>code.remove(),2000);
}

inputs.forEach(input=>{
  input.addEventListener('input', ()=>{ 
    createRandomCode();
  });
});
</script>

</body>
</html>
