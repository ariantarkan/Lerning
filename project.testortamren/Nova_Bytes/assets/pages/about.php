
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>aboutteam</title>
    <link rel="stylesheet" href="../css/about.css" type="text/css">
    <link rel="icon" href="../img/nova.png">
</head>
<body dir="rtl">
    <a href="../../index.php" class="back-home-btn" title="بازگشت به سایت">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
</a>
    <section class="about-section">
  <div class="container">
    <h2>درباره ما</h2>
    <p>ما یک تیم توسعه وب حرفه‌ای هستیم که با تلفیق تخصص در فرانت‌اند و بک‌اند، به خلق محصولاتی با کیفیت و عملکرد بی‌نظیر می‌پردازیم. تمرکز اصلی ما بر ایجاد تجربه‌های کاربری برجسته و پیاده‌سازی ساختارهای پایدار و امن سمت سرور است.</p>
    <p>تیم ما متشکل از توسعه‌دهندگان فرانت‌اند ماهر با دانش به‌روز در زمینه فناوری‌های مدرن مانند React و Vue، و برنامه‌نویسان بک‌اند متخصص در Node.js و Django است. همکاری، نوآوری و مسئولیت‌پذیری اصول بنیادین فعالیت‌های ماست و تلاش می‌کنیم هر پروژه‌ای را با دقت و تعهد به سرانجام برسانیم.</p>
    
    <div class="tech-stack">
      <h3>تکنولوژی‌های مورد استفاده</h3>
      <ul>
        <li>Html</li>
        <li>Css</li>
        <li>Js</li>
        <li>Sql</li>
        <li>Php</li>
        <li>React</li>
        <li>Git</li>
      </ul>
    </div>
    
    <div style="text-align: center; width: 100%;">
      <h3 style="font-size: 1.8rem; margin-top: 40px; margin-bottom: 25px; font-weight: 600;">مدیران</h3>
      <div class="team-intro" id="team-members-list">

      </div>
    </div>


  </div>
</section>
<footer class="site-footer">
  <div class="footer-container">
      <div class="footer-brand">
          <img src="../img/nova.png" alt="Nova Bytes Logo" class="footer-logo">
          <span>Nova Bytes</span>
      </div>
      <div class="footer-actions">





<button class="btn btn-secondary" id="open-contact-modal">
    <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24">
        <path d="M2 4v16h20V4H2zm10 9L4 6h16l-8 7z"/>
    </svg>
    راه‌های ارتباطی
</button>

<button class="btn btn-secondary" id="open-projects-modal">
    <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
   خدمات های ما
</button>
      </div>
  </div>
</footer>

<div id="contact-modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h3>راه‌های ارتباطی</h3>

        <div class="modal-team-members" id="contacts-list">
            
        </div>
    </div>
</div>



<div id="projects-modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h3>خدمات های ما</h3>
        <div class="modal-team-members" id="projects-list">
            
        </div>
    </div>
</div>


<script src="../js/abiut.js?v=<?php echo time(); ?>"></script>
</body>

</html>