import prisma from "../src/config/db.js";


const getRandomDuration = () => Math.floor(Math.random() * (10 - 5 + 1)) + 5;

async function main() {
console.log('🌱 Starting database seed...');
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Meditation", "Video", "News" RESTART IDENTITY CASCADE;
  `);

  await prisma.meditation.createMany({
    data: [
      // --- ANGER ---
    {
    title: 'Calming Anger Meditation 1',
    description: 'Guided meditation to calm anger and bring inner peace.',
    mediaUrl: 'https://youtu.be/jkZOJpZX7lc?si=hqpWYZterEhcOip7',
    thumbnailUrl: 'https://img.youtube.com/vi/jkZOJpZX7lc/sddefault.jpg',
    duration: getRandomDuration(),
    },
    {
    title: 'Release Anger via Breath',
    description: 'Use breathing techniques to release pent-up anger.',
    mediaUrl: 'https://youtu.be/ztTexqGQ0VI?si=lA6rJ7NG61tkKrgZ',
    thumbnailUrl: 'https://img.youtube.com/vi/ztTexqGQ0VI/sddefault.jpg',
    duration: getRandomDuration(),
    },
    {
    title: 'Transforming Anger to Awareness',
    description: 'Observe anger and turn it into mindful awareness.',
    mediaUrl: 'https://youtu.be/uLCOnkLnJ-0?si=YPaito5IzWs3Hu7Z',
    thumbnailUrl: 'https://img.youtube.com/vi/uLCOnkLnJ-0/sddefault.jpg',
    duration: getRandomDuration(),
    },
    {
    title: 'Deep Calm Amid Anger',
    description: 'Find calm in the midst of frustration or anger.',
    mediaUrl: 'https://youtu.be/uLCOnkLnJ-0?si=YPaito5IzWs3Hu7Z',
    thumbnailUrl: 'https://img.youtube.com/vi/uLCOnkLnJ-0/sddefault.jpg',
    duration: getRandomDuration(),
    },
    {
    title: 'Soothing Anger Release',
    description: 'Gently let go of anger through guided visualization.',
    mediaUrl: 'https://youtu.be/bnL_u9WMzl8?si=8tyo_o5zynIxC6-g',
    thumbnailUrl: 'https://img.youtube.com/vi/bnL_u9WMzl8/sddefault.jpg',
    duration: getRandomDuration(),
    },
    {
    title: 'Calm Down from Anger',
    description: 'A guided path to cool down emotionally.',
    mediaUrl: 'https://youtu.be/1xa9eyR9YwY?si=E9Kz91P7BdKqva8R',
    thumbnailUrl: 'https://img.youtube.com/vi/1xa9eyR9YwY/sddefault.jpg',
    duration: getRandomDuration(),
    },
    {
    title: 'Peace in Anger',
    description: 'Find peace when anger arises.',
    mediaUrl: 'https://youtu.be/RVzIDLcGzYw?si=4Gev9kg3lEu5vQ-_',
    thumbnailUrl: 'https://img.youtube.com/vi/RVzIDLcGzYw/sddefault.jpg',
    duration: getRandomDuration(),
    },
    {
    title: 'Healing from Anger',
    description: 'Heal the heart and release resentment.',
    mediaUrl: 'https://youtu.be/oMLUcL__KI8?si=TshicA_4-7xyYeC8',
    thumbnailUrl: 'https://img.youtube.com/vi/oMLUcL__KI8/sddefault.jpg',
    duration: getRandomDuration(),
    },
    {
    title: 'Release Anger Again',
    description: 'Another guided session to release anger fully.',
    mediaUrl: 'https://youtu.be/ztTexqGQ0VI?si=ksqr834q_PmuEV-x',
    thumbnailUrl: 'https://img.youtube.com/vi/ztTexqGQ0VI/sddefault.jpg',
    duration: getRandomDuration(),
    },
      // --- JOY ---
    {
    title: 'Joyful Morning Meditation',
    description: 'Mulai hari dengan sukacita dan hati yang penuh syukur.',
    mediaUrl: 'https://youtu.be/BXD7Mn_Fz1o?si=dNwHNIlpgPcAQrSY',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/BXD7Mn_Fz1o/hqdefault.jpg',
    },
    {
    title: 'Inner Happiness Meditation',
    description: 'Menghubungkan diri dengan kebahagiaan dari dalam.',
    mediaUrl: 'https://youtu.be/C5L8Z3qA1DA?si=YUvcvs0UfYCRB7iz',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/C5L8Z3qA1DA/hqdefault.jpg',
    },
    {
    title: 'Smile from Within',
    description: 'Membawa senyuman batin melalui pernapasan penuh syukur.',
    mediaUrl: 'https://youtu.be/j734gLbQFbU?si=gXKJNphl_Wd4i1qC',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/j734gLbQFbU/hqdefault.jpg',
    },
    {
    title: 'Uplift Your Spirit',
    description: 'Mengangkat suasana hati dengan energi positif.',
    mediaUrl: 'https://youtu.be/DrFlGzskDes?si=qM4sT_Z9cu8SwDaY',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/DrFlGzskDes/hqdefault.jpg',
    },
    {
    title: 'Gratitude Joy Meditation',
    description: 'Membangun kebahagiaan melalui rasa syukur.',
    mediaUrl: 'https://youtu.be/Y1hy5f69CRE?si=-g-rk4puP97iN7bJ',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/Y1hy5f69CRE/hqdefault.jpg',
    },
    {
    title: 'Inner Light Meditation',
    description: 'Menyalakan cahaya sukacita dari dalam diri.',
    mediaUrl: 'https://youtu.be/LDs7jglje_U?si=wuVralHO0q_Vdy-q',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/LDs7jglje_U/hqdefault.jpg',
    },
    {
    title: 'Joy Flow Meditation',
    description: 'Mengalir dengan kegembiraan natural hati.',
    mediaUrl: 'https://youtu.be/n9ja1Wqkp1U?si=9lNt8bCx3Ibn3e1z',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/n9ja1Wqkp1U/hqdefault.jpg',
    },
    {
    title: 'Radiant Happiness',
    description: 'Rasakan kebahagiaan yang memancar dalam diri.',
    mediaUrl: 'https://youtu.be/OjtcI3vWnpk?si=3XVDoY_o-UVEUf7h',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/OjtcI3vWnpk/hqdefault.jpg',
    },

    // sad
    {
    title: 'Healing Sadness',
    description: 'Menenangkan hati dan mengizinkan kesedihan hadir dengan belas kasih.',
    mediaUrl: 'https://youtu.be/RVzIDLcGzYw?si=lkvs8YwgNuXBoFhQ',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/RVzIDLcGzYw/hqdefault.jpg',
    },
    {
    title: 'Sadness Awareness',
    description: 'Membangun kesadaran atas kesedihan tanpa menghakimi.',
    mediaUrl: 'https://youtu.be/ztTexqGQ0VI?si=RgwT_8f38674KxbY',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/ztTexqGQ0VI/hqdefault.jpg',
    },
    {
    title: 'Comfort in Grief',
    description: 'Memberi kenyamanan dalam masa berduka dan kehilangan.',
    mediaUrl: 'https://youtu.be/c7bKMSeenuU?si=NC-WvJotbNBk2j1z',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/c7bKMSeenuU/hqdefault.jpg',
    },
    {
    title: 'Letting Go of Pain',
    description: 'Melatih diri untuk melepaskan luka dan beban emosional.',
    mediaUrl: 'https://youtu.be/kdvXOVBvtxc?si=eOf1YgrEohlOSAWF',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/kdvXOVBvtxc/hqdefault.jpg',
    },
    {
    title: 'Meditation for Healing',
    description: 'Menyembuhkan perasaan luka melalui penerimaan penuh.',
    mediaUrl: 'https://youtu.be/MR57rug8NsM?si=ymdhK9Fkjer-Zppr',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/MR57rug8NsM/hqdefault.jpg',
    },
    {
    title: 'Tears of Release',
    description: 'Membiarkan air mata sebagai bagian dari penyembuhan hati.',
    mediaUrl: 'https://youtu.be/PBI6XZt4VDg?si=jkUE1AsY0q_Ae5s8',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/PBI6XZt4VDg/hqdefault.jpg',
    },
    {
    title: 'Strength Through Sadness',
    description: 'Menemukan kekuatan meskipun dalam kesedihan.',
    mediaUrl: 'https://youtu.be/L1QOh-n-eus?si=CB_8BA1kN_1SP5Ms',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/L1QOh-n-eus/hqdefault.jpg',
    },
    {
    title: 'Soothe a Broken Heart',
    description: 'Menawarkan ketenangan saat hati terluka.',
    mediaUrl: 'https://youtu.be/5f6OQPQSxek?si=EHv4mem7MZQPcrKj',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/5f6OQPQSxek/hqdefault.jpg',
    },
    {
    title: 'Release Sadness Deeply',
    description: 'Melepaskan kesedihan yang terpendam lewat kesadaran batin.',
    mediaUrl: 'https://youtu.be/qImOarY0TwY?si=vmSyAboAyRooUFUl',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/qImOarY0TwY/hqdefault.jpg',
    },
    {
    title: 'Embrace the Sadness',
    description: 'Menerima kesedihan sebagai bagian dari pengalaman hidup.',
    mediaUrl: 'https://youtu.be/QMISP4M4GQo?si=XqkJPs-Y6yHTyBhZ',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/QMISP4M4GQo/hqdefault.jpg',
    },
    {
    title: 'Sad Heart Meditation',
    description: 'Menemani hati yang sedih dengan kelembutan dan perhatian.',
    mediaUrl: 'https://youtu.be/t6-3HQFaIBA?si=83BratjkC3iuFxHn',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/t6-3HQFaIBA/hqdefault.jpg',
    },
    {
    title: 'Gentle Grief',
    description: 'Perjalanan lembut melalui proses kesedihan dan penerimaan.',
    mediaUrl: 'https://youtu.be/7WnZisfYMsE?si=jIm8rrnx2cQ29-64',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/7WnZisfYMsE/hqdefault.jpg',
    },
    {
    title: 'Release Through Compassion',
    description: 'Melepaskan kesedihan dengan belas kasih pada diri sendiri.',
    mediaUrl: 'https://youtu.be/RmsS2s63zNM?si=Q7D3XRBAmBl0HI2D',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/RmsS2s63zNM/hqdefault.jpg',
    },
    {
    title: 'Sadness to Serenity',
    description: 'Melangkah dari kesedihan menuju ketenangan batin.',
    mediaUrl: 'https://youtu.be/v7ZJBRza2VA?si=ibYyGdEUamzfEo6S',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/v7ZJBRza2VA/hqdefault.jpg',
    },
    {
    title: 'Healing Tears Meditation',
    description: 'Mengubah air mata menjadi sumber kesembuhan.',
    mediaUrl: 'https://youtu.be/dJWTJt--FTI?si=diZUL-l2YugGBw5Z',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/dJWTJt--FTI/hqdefault.jpg',
    },
          
      // --- FEAR ---
     {
    title: 'Overcoming Fear Meditation',
    description: 'Menemukan keberanian dan ketenangan di tengah rasa takut.',
    mediaUrl: 'https://youtu.be/MR57rug8NsM?si=vIDSr9bqss8amVa7',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/MR57rug8NsM/hqdefault.jpg',
    },
    {
    title: 'Calm Anxiety & Fear',
    description: 'Teknik untuk menenangkan kecemasan dan rasa takut.',
    mediaUrl: 'https://youtu.be/F5KfygRRtrg?si=Z6uoEEowJGBKVUfO',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/F5KfygRRtrg/hqdefault.jpg',
    },
    {
    title: 'Face Your Fear with Compassion',
    description: 'Menghadapi ketakutan dengan belas kasih pada diri sendiri.',
    mediaUrl: 'https://youtu.be/p7Rfz3M0hIo?si=iOwYjybrhqAi6E7h',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/p7Rfz3M0hIo/hqdefault.jpg',
    },
    {
    title: 'Release Fear & Tension',
    description: 'Melepaskan ketegangan yang terkait dengan ketakutan.',
    mediaUrl: 'https://youtu.be/RVzIDLcGzYw?si=_LL_knCmvTEp2uqi',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/RVzIDLcGzYw/hqdefault.jpg',
    },
    {
    title: 'Grounding from Fear',
    description: 'Menjadi berakar saat rasa takut muncul.',
    mediaUrl: 'https://youtu.be/ulsTTd0g4Wk?si=yY3jQO7V0EGeiZ2e',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/ulsTTd0g4Wk/hqdefault.jpg',
    },
    {
    title: 'Breath Through Fear',
    description: 'Menggunakan napas sebagai jangkar saat merasa takut.',
    mediaUrl: 'https://youtu.be/pnYAmrybdfI?si=pi-DOc4RO6SGeu5l',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/pnYAmrybdfI/hqdefault.jpg',
    },
    {
    title: 'Letting Go of Fear',
    description: 'Melepaskan ketakutan yang membebani jiwa.',
    mediaUrl: 'https://youtu.be/kdvXOVBvtxc?si=ivDMJBEiUd1wdNVx',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/kdvXOVBvtxc/hqdefault.jpg',
    },
    {
    title: 'Fear Release Meditation',
    description: 'Meditasi untuk meredakan rasa takut dan cemas.',
    mediaUrl: 'https://youtu.be/ytWkuPjZPvM?si=7_uK9ZUtut67xyqu',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/ytWkuPjZPvM/hqdefault.jpg',
    },
    {
    title: 'Inner Strength Against Fear',
    description: 'Menguatkan diri menghadapi ketidakpastian.',
    mediaUrl: 'https://youtu.be/IdUrixeWbis?si=rW-a3e0TDigDQOe1',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/IdUrixeWbis/hqdefault.jpg',
    },
    {
    title: 'Calm in Uncertainty',
    description: 'Menemukan ketenangan saat keadaan tak pasti dan menakutkan.',
    mediaUrl: 'https://youtu.be/eVTP3us03Qg?si=zGBSER0DG488BAC0',
    duration: getRandomDuration(),
    thumbnailUrl: 'https://img.youtube.com/vi/eVTP3us03Qg/hqdefault.jpg',
    },
    ],

  });

  await prisma.news.createMany({
    data: [
    {
        title: "Pentingnya Istirahat Mental di Tengah Tekanan Pekerjaan",
        description: "Belajar mengenali tanda-tanda kelelahan emosional agar tidak berujung burnout.",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
        content: "Kelelahan emosional bisa muncul tanpa disadari ketika tekanan pekerjaan datang bertubi-tubi. Penting untuk memberi waktu bagi diri sendiri untuk beristirahat dan melakukan kegiatan yang menenangkan seperti berjalan santai atau meditasi."
    },
    {
        title: "Meditasi 10 Menit Setiap Hari Bisa Ubah Hidupmu",
        description: "Penelitian menunjukkan meditasi singkat dapat menurunkan tingkat stres secara signifikan.",
        imageUrl: "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=1000&q=80",
        content: "Dengan meditasi 10 menit setiap hari, sistem saraf menjadi lebih stabil dan tubuh mampu beradaptasi terhadap stres dengan lebih baik. Kuncinya adalah konsistensi dan kesadaran dalam setiap napas."
    },
    {
        title: "Cara Menghadapi Overthinking dengan Teknik Grounding",
        description: "Overthinking sering kali memperburuk kecemasan, namun bisa diatasi dengan langkah sederhana.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
        content: "Teknik grounding membantu mengembalikan fokus ke saat ini. Coba sebutkan lima hal yang kamu lihat, empat hal yang kamu rasakan, dan tiga hal yang kamu dengar. Ini membantu menenangkan pikiran yang berputar."
    },
    {
        title: "Mengapa Curhat dengan Teman Bisa Jadi Terapi Efektif",
        description: "Berbicara dengan orang lain bukan tanda lemah, justru bentuk kekuatan emosional.",
        imageUrl: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1000&q=80",
        content: "Membuka diri kepada teman yang dipercaya membantu mengurangi beban pikiran dan memberi perspektif baru terhadap masalah yang dihadapi. Curhat bukan hanya tentang mengeluh, tapi juga proses penyembuhan diri."
    },
    {
        title: "Dampak Media Sosial terhadap Kesehatan Mental Remaja",
        description: "Remaja rentan mengalami tekanan sosial akibat ekspektasi di media sosial.",
        imageUrl: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1000&q=80",
        content: "Penggunaan media sosial yang berlebihan bisa memicu rasa cemas, iri, dan rendah diri. Mengatur waktu penggunaan dan mengikuti akun yang inspiratif bisa membantu menjaga keseimbangan emosional."
    },
    {
        title: "Tidur Berkualitas, Kunci Kesehatan Mental yang Sering Terlupakan",
        description: "Kurang tidur dapat memengaruhi suasana hati dan kemampuan fokus seseorang.",
        imageUrl: "https://images.unsplash.com/photo-1526925539332-aa3b66e35444?auto=format&fit=crop&w=1000&q=80",
        content: "Tidur cukup selama 7–9 jam setiap malam membantu otak memproses emosi dengan lebih baik. Hindari gadget sebelum tidur untuk meningkatkan kualitas istirahatmu."
    },
    {
        title: "Mengenal Self-Compassion: Belas Kasih terhadap Diri Sendiri",
        description: "Belajar memaafkan diri adalah langkah awal menuju ketenangan batin.",
        imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80",
        content: "Self-compassion berarti memperlakukan diri sendiri seperti kita memperlakukan sahabat yang sedang kesulitan — dengan empati, bukan kritik. Ini membantu meningkatkan harga diri dan kebahagiaan jangka panjang."
    },
    {
        title: "Musik Sebagai Terapi Emosional di Saat Sulit",
        description: "Mendengarkan musik terbukti dapat menurunkan stres dan meningkatkan suasana hati.",
        imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
        content: "Musik dengan tempo lambat membantu menurunkan detak jantung dan tekanan darah, sehingga tubuh menjadi lebih rileks. Cobalah playlist musik ambient atau lo-fi untuk menenangkan diri."
    },
    {
        title: "Menulis Jurnal Setiap Hari untuk Mengenal Diri Lebih Dalam",
        description: "Menulis bisa jadi bentuk refleksi yang kuat untuk memahami emosi sendiri.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
        content: "Melalui jurnal, seseorang dapat menuangkan pikiran tanpa takut dihakimi. Ini membantu mengidentifikasi pola emosi dan memberikan kejelasan terhadap perasaan yang selama ini terpendam."
    },
    {
        title: "Menemukan Kedamaian Lewat Alam",
        description: "Berada di alam terbuka membantu menyeimbangkan kesehatan fisik dan mental.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
        content: "Berjalan di taman atau mendaki gunung dapat mengaktifkan hormon endorfin dan menurunkan kadar kortisol (hormon stres). Alam membantu kita merasa terhubung kembali dengan kehidupan yang lebih besar."
    },

        {
            title: "Kekuatan Rasa Syukur dalam Kesehatan Mental",
            description: "Bersyukur dapat meningkatkan kebahagiaan dan mengurangi gejala depresi.",
            imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
            content: "Menulis tiga hal yang disyukuri setiap hari membantu otak berfokus pada hal positif. Ini bukan sekadar kebiasaan, tapi bentuk terapi kognitif yang efektif dalam memperbaiki kesejahteraan emosional."
        },
        {
            title: "Detoks Digital: Menjauh dari Layar untuk Menjaga Pikiran Sehat",
            description: "Paparan layar berlebih dapat mengganggu fokus dan kesehatan mental.",
            imageUrl: "https://images.unsplash.com/photo-1496674205429-924b32acd421?auto=format&fit=crop&w=1000&q=80",
            content: "Cobalah detoks digital selama satu hari tanpa media sosial. Gunakan waktu itu untuk berjalan di alam, membaca buku, atau sekadar diam bersama diri sendiri. Efeknya bisa sangat menenangkan."
        },
        {
            title: "Membangun Batas Sehat dalam Hubungan",
            description: "Menetapkan batas bukan berarti egois, tapi tanda menghargai diri sendiri.",
            imageUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1000&q=80",
            content: "Batas yang sehat menjaga keseimbangan emosional dan mencegah kelelahan sosial. Belajar berkata 'tidak' dengan lembut adalah bagian dari mencintai diri sendiri tanpa rasa bersalah."
        },
        {
            title: "Berjalan Kaki Sebagai Bentuk Meditasi Aktif",
            description: "Meditasi tidak selalu harus duduk diam — berjalan pun bisa menjadi latihan kesadaran.",
            imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80",
            content: "Saat berjalan, fokuslah pada langkah dan napasmu. Rasakan setiap gerakan kaki, suara di sekitar, dan angin yang menyentuh kulit. Ini membantu menurunkan stres dan meningkatkan kehadiran diri."
        },
        {
        title: "Mengenal Self-Compassion: Belas Kasih terhadap Diri Sendiri",
        description: "Belajar memaafkan diri adalah langkah awal menuju ketenangan batin.",
        imageUrl: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1000&q=80",
        content: "Self-compassion berarti memperlakukan diri sendiri seperti kita memperlakukan sahabat yang sedang kesulitan — dengan empati, bukan kritik. Ini membantu meningkatkan harga diri dan kebahagiaan jangka panjang."
        },
        {
        title: "Musik Sebagai Terapi Emosional di Saat Sulit",
        description: "Mendengarkan musik terbukti dapat menurunkan stres dan meningkatkan suasana hati.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
        content: "Musik dengan tempo lambat membantu menurunkan detak jantung dan tekanan darah, sehingga tubuh menjadi lebih rileks. Cobalah playlist musik ambient atau lo-fi untuk menenangkan diri."
        },
        {
        title: "Menulis Jurnal Setiap Hari untuk Mengenal Diri Lebih Dalam",
        description: "Menulis bisa jadi bentuk refleksi yang kuat untuk memahami emosi sendiri.",
        imageUrl: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1000&q=80",
        content: "Melalui jurnal, seseorang dapat menuangkan pikiran tanpa takut dihakimi. Ini membantu mengidentifikasi pola emosi dan memberikan kejelasan terhadap perasaan yang selama ini terpendam."
        },
        {
        title: "Menemukan Kedamaian Lewat Alam",
        description: "Berada di alam terbuka membantu menyeimbangkan kesehatan fisik dan mental.",
        imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80",
        content: "Berjalan di taman atau mendaki gunung dapat mengaktifkan hormon endorfin dan menurunkan kadar kortisol (hormon stres). Alam membantu kita merasa terhubung kembali dengan kehidupan yang lebih besar."
        }
    ]
  })

  await prisma.video.createMany({
    data: [
        {
            title: "Understanding Anxiety and How to Cope",
            description: "Video edukatif tentang mengenali tanda-tanda kecemasan dan cara mengelolanya dalam kehidupan sehari-hari.",
            videoUrl: "https://www.youtube.com/watch?v=WWloIAQpMcQ",
        },
        {
            title: "How to Be Kind to Yourself | The Science of Self-Compassion",
            description: "Membahas pentingnya self-compassion dan bagaimana mengurangi self-criticism untuk kesehatan mental yang lebih baik.",
            videoUrl: "https://www.youtube.com/watch?v=IvtZBUSplr4",
        },
        {
            title: "The Power of Mindfulness",
            description: "Panduan singkat untuk memulai praktik mindfulness dan manfaatnya terhadap stres dan kesejahteraan mental.",
            videoUrl: "https://www.youtube.com/watch?v=wfDTp2GogaQ",
        },
        {
            title: "Overcoming Depression: Small Steps to Big Change",
            description: "Cara menghadapi depresi dengan langkah-langkah kecil yang konsisten dan membangun kebiasaan sehat.",
            videoUrl: "https://www.youtube.com/watch?v=z-IR48Mb3W0",
        },
        {
            title: "The Importance of Sleep for Mental Health",
            description: "Penjelasan ilmiah tentang bagaimana kualitas tidur memengaruhi suasana hati dan stabilitas emosi.",
            videoUrl: "https://www.youtube.com/watch?v=gedoSfZvBgE",
        },
        {
            title: "Dealing with Burnout | Tips from a Psychologist",
            description: "Cara mengenali gejala burnout dan langkah-langkah untuk memulihkan energi mental dan emosional.",
            videoUrl: "https://www.youtube.com/watch?v=RcGyVTAoXEU",
        },
        {
            title: "Building Confidence and Self-Esteem",
            description: "Video motivasi dan teknik praktis untuk meningkatkan rasa percaya diri dan menghargai diri sendiri.",
            videoUrl: "https://www.youtube.com/watch?v=8SOQduoLgRw",
        },
        {
            title: "Meditation for Stress Relief (10 Minutes Guided)",
            description: "Meditasi terpandu singkat untuk meredakan stres dan menenangkan pikiran.",
            videoUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
        },
  {
    title: "The Science of Happiness | TED",
    description: "Penjelasan menarik dari psikolog tentang bagaimana otak kita membentuk rasa bahagia dan bagaimana meningkatkannya.",
    videoUrl: "https://www.youtube.com/watch?v=GXy__kBVq1M",
  },
  {
    title: "Why You Feel Lonely and How to Fix It",
    description: "Membahas akar penyebab kesepian modern dan strategi untuk membangun koneksi sosial yang sehat.",
    videoUrl: "https://www.youtube.com/watch?v=n3Xv_g3g-mA",
  },
  {
    title: "How Exercise Improves Mental Health",
    description: "Menjelaskan bagaimana aktivitas fisik dapat membantu mengurangi depresi dan kecemasan.",
    videoUrl: "https://www.youtube.com/watch?v=BHY0FxzoKZE",
  },
  {
    title: "Breathing Techniques to Calm Your Mind",
    description: "Teknik pernapasan sederhana yang dapat menenangkan pikiran dan mengurangi stres secara instan.",
    videoUrl: "https://www.youtube.com/watch?v=aNXKjGFUlMs",
  }
    ],
  })

  console.log("✅ Seed meditation data inserted successfully!");
}

main()
  .catch((e) => console.error("❌ Error seeding meditation data:", e))
  .finally(async () => await prisma.$disconnect());
