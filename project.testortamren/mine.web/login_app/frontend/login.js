
document.getElementById('loginForm').addEventListener('submit', async (e)=>{
 e.preventDefault();
 const data={username:e.target.username.value,password:e.target.password.value};
 const res=await fetch('http://localhost:5000/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
 alert((await res.json()).message);
});

alert ("welcome  to mine | web")
let mahdi = 'kos nane harki bedozde'

console.log (mahdi)
