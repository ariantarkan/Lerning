    const btn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const s = localStorage.getItem('phoenix-theme');
    if (s) root.setAttribute('data-theme', s);
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('phoenix-theme', next);
    });

    // 1. پیدا کردن عناصر مورد نیاز از صفحه
    const counterDisplay = document.getElementById('counterDisplay');
    const incrementButton = document.getElementById('incrementButton');

    // 2. تعریف یک متغیر برای نگهداری مقدار شمارشگر
    // مقدار اولیه را 0 قرار می‌دهیم، همانطور که در صفحه نمایش داده می‌شود
    let count = 0;

    // 3. تنظیم کاری که با کلیک روی دکمه انجام شود
    incrementButton.addEventListener('click', function() {
      // 3.1. مقدار شمارشگر را یکی زیاد می‌کنیم
      count = count + 1; // یا کوتاه‌تر: count++;

      // 3.2. عدد جدید را در صفحه نمایش می‌دهیم
      counterDisplay.textContent = count;

      // (اختیاری) کمی افکت بصری برای عدد
      counterDisplay.style.transform = 'scale(1.1)';
      setTimeout(() => {
        counterDisplay.style.transform = 'scale(1)';
      }, 150); // بعد از 0.15 ثانیه به حالت عادی برگردد
    });