import prisma from "../src/config/db.js";

async function main() {
  await prisma.meditation.createMany({
    data: [
      // --- ANGER ---
      { title: "Calming Anger 1", description: "Meditasi untuk meredakan amarah dan menenangkan pikiran.", mediaUrl: "https://youtu.be/jkZOJpZX7lc?si=hqpWYZterEhcOip7Z", duration: 5 },
      { title: "Breathing Through Anger", description: "Fokus pada pernapasan untuk mengelola emosi negatif.", mediaUrl: "https://youtu.be/ztTexqGQ0VI?si=lA6rJ7NG61tkKrgZ", duration: 6 },
      { title: "Let Go of Anger", description: "Belajar melepaskan kemarahan dan menemukan kedamaian batin.", mediaUrl: "https://youtu.be/uLCOnkLnJ-0?si=YPaito5IzWs3Hu7Z", duration: 5 },
      { title: "Release Negative Energy", description: "Melepaskan energi negatif melalui relaksasi mendalam.", mediaUrl: "https://youtu.be/bnL_u9WMzl8?si=8tyo_o5zynIxC6-g", duration: 5 },
      { title: "Find Inner Calm", description: "Temukan ketenangan di tengah gejolak emosi.", mediaUrl: "https://youtu.be/1xa9eyR9YwY?si=E9Kz91P7BdKqva8R", duration: 7 },
      { title: "Gentle Mind Reset", description: "Menenangkan pikiran dengan afirmasi lembut.", mediaUrl: "https://youtu.be/RVzIDLcGzYw?si=4Gev9kg3lEu5vQ-_", duration: 5 },
      { title: "Ease the Tension", description: "Hilangkan ketegangan dengan teknik pernapasan singkat.", mediaUrl: "https://youtu.be/oMLUcL__KI8?si=TshicA_4-7xyYeC8", duration: 8 },

      // --- JOY ---
      { title: "Cultivating Joy", description: "Rasakan kebahagiaan sederhana melalui meditasi positif.", mediaUrl: "https://youtu.be/BXD7Mn_Fz1o?si=dNwHNIlpgPcAQrSY", duration: 5 },
      { title: "Morning Gratitude", description: "Mulai hari dengan rasa syukur dan pikiran jernih.", mediaUrl: "https://youtu.be/C5L8Z3qA1DA?si=YUvcvs0UfYCRB7iz", duration: 5 },
      { title: "Joyful Awareness", description: "Bangkitkan semangat dan kesadaran diri yang bahagia.", mediaUrl: "https://youtu.be/j734gLbQFbU?si=gXKJNphl_Wd4i1qC", duration: 6 },
      { title: "Positive Vibration", description: "Meditasi ringan untuk memperkuat energi bahagia.", mediaUrl: "https://youtu.be/DrFlGzskDes?si=qM4sT_Z9cu8SwDaY", duration: 5 },
      { title: "Smile Within", description: "Temukan senyum dari dalam hati melalui pernapasan damai.", mediaUrl: "https://youtu.be/Y1hy5f69CRE?si=-g-rk4puP97iN7bJ", duration: 7 },
      { title: "Uplift Your Spirit", description: "Latihan singkat untuk menumbuhkan semangat hidup.", mediaUrl: "https://youtu.be/LDs7jglje_U?si=wuVralHO0q_Vdy-q", duration: 5 },
      { title: "Calm and Happy", description: "Gabungkan ketenangan dan kegembiraan dalam satu napas.", mediaUrl: "https://youtu.be/n9ja1Wqkp1U?si=9lNt8bCx3Ibn3e1z", duration: 6 },
      { title: "Joyful Reflection", description: "Nikmati momen bahagia dan lepaskan stres dengan lembut.", mediaUrl: "https://youtu.be/OjtcI3vWnpk?si=3XVDoY_o-UVEUf7h", duration: 5 },

      // --- SAD ---
      { title: "Healing Sadness", description: "Meditasi lembut untuk menyembuhkan hati yang sedih.", mediaUrl: "https://youtu.be/RVzIDLcGzYw?si=lkvs8YwgNuXBoFhQ", duration: 5 },
      { title: "Let It Flow", description: "Izinkan perasaan sedih mengalir tanpa penolakan.", mediaUrl: "https://youtu.be/ztTexqGQ0VI?si=RgwT_8f38674KxbY", duration: 6 },
      { title: "Acceptance Meditation", description: "Menerima kesedihan sebagai bagian dari perjalanan hidup.", mediaUrl: "https://youtu.be/c7bKMSeenuU?si=NC-WvJotbNBk2j1z", duration: 5 },
      { title: "Inner Peace", description: "Temukan kedamaian di tengah kesedihan yang mendalam.", mediaUrl: "https://youtu.be/kdvXOVBvtxc?si=eOf1YgrEohlOSAWF", duration: 8 },
      { title: "Soothing Reflection", description: "Menenangkan batin dengan refleksi diri yang lembut.", mediaUrl: "https://youtu.be/MR57rug8NsM?si=ymdhK9Fkjer-Zppr", duration: 5 },
      { title: "Calm After Tears", description: "Tenangkan diri setelah masa-masa penuh emosi.", mediaUrl: "https://youtu.be/PBI6XZt4VDg?si=jkUE1AsY0q_Ae5s8", duration: 7 },
      { title: "Breathe Through Pain", description: "Gunakan napas sebagai alat penyembuhan hati.", mediaUrl: "https://youtu.be/L1QOh-n-eus?si=CB_8BA1kN_1SP5Ms", duration: 5 },

      // --- FEAR ---
      { title: "Overcoming Fear", description: "Latih keberanian melalui kesadaran dan napas.", mediaUrl: "https://youtu.be/MR57rug8NsM?si=vIDSr9bqss8amVa7", duration: 5 },
      { title: "Facing the Unknown", description: "Hadapi ketakutan dengan tenang dan penuh kesadaran.", mediaUrl: "https://youtu.be/F5KfygRRtrg?si=Z6uoEEowJGBKVUfO", duration: 6 },
      { title: "Courage Within", description: "Temukan kekuatan batin untuk menghadapi rasa takut.", mediaUrl: "https://youtu.be/p7Rfz3M0hIo?si=iOwYjybrhqAi6E7h", duration: 5 },
      { title: "Stay Grounded", description: "Menjaga diri tetap stabil di tengah rasa khawatir.", mediaUrl: "https://youtu.be/ulsTTd0g4Wk?si=yY3jQO7V0EGeiZ2e", duration: 5 },
      { title: "Calm the Mind", description: "Relaksasi untuk menenangkan pikiran cemas.", mediaUrl: "https://youtu.be/pnYAmrybdfI?si=pi-DOc4RO6SGeu5l", duration: 5 },
      { title: "Brave Heart", description: "Bangkitkan keberanian dari dalam diri.", mediaUrl: "https://youtu.be/ytWkuPjZPvM?si=7_uK9ZUtut67xyqu", duration: 7 },
      { title: "Release Fear", description: "Belajar melepaskan ketakutan yang membelenggu pikiran.", mediaUrl: "https://youtu.be/IdUrixeWbis?si=rW-a3e0TDigDQOe1", duration: 5 },
      { title: "Silent Strength", description: "Temukan kekuatan melalui ketenangan dan kesadaran.", mediaUrl: "https://youtu.be/eVTP3us03Qg?si=zGBSER0DG488BAC0", duration: 6 },
    ],
  });

  console.log("✅ Seed meditation data inserted successfully!");
}

main()
  .catch((e) => console.error("❌ Error seeding meditation data:", e))
  .finally(async () => await prisma.$disconnect());
