const ctx = document.getElementById("myChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
    datasets: [
      {
        label: "میزان فروش (فرضی)",
        data: [12, 19, 15, 25, 22, 30],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  },
});
